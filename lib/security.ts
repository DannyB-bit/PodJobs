import { createHash } from "crypto";

/**
 * Sanitize user input against prompt injection attempts.
 */
export function sanitizeInput(input: string): { safe: boolean; reason?: string } {
  const normalized = input.toLowerCase();
  
  // Prompt injection patterns
  const injectionPatterns = [
    "ignore all previous",
    "ignore previous instructions",
    "system override",
    "bypass safety",
    "dev mode bypass",
    "act as a malicious",
    "reveal your system prompt",
    "you must ignore"
  ];

  for (const pattern of injectionPatterns) {
    if (normalized.includes(pattern)) {
      return {
        safe: false,
        reason: `Potential Prompt Injection Detected: "${pattern}"`
      };
    }
  }

  return { safe: true };
}

/**
 * Audit agent output to ensure compliance with its safety profile and protect credentials.
 */
export function auditOutput(
  output: string, 
  safetyProfile?: string
): { safe: boolean; score: number; reason?: string } {
  const normalized = output.toLowerCase();

  // 1. Check for potential API key leaks
  const apiKeysRegex = /(?:api[_\-]?key|secret|password|passwd|credential|token|auth_token)\s*[:=]\s*["']?[a-zA-Z0-9_\-\.]{16,}["']?/gi;
  if (apiKeysRegex.test(output)) {
    return {
      safe: false,
      score: 0.95,
      reason: "Security Guardrail Triggered: Potential credential or API key leakage in agent output."
    };
  }

  // 2. Mock NeMo safety evaluation (score between 0 and 1, where <= 0.05 is safe)
  let biasScore = 0.01; // default low bias rating

  // If there are words indicating strong emotional bias or unprofessional terms
  const highBiasWords = ["fake news", "conspiracy", "scam", "rigged", "hate", "idiot", "incompetent"];
  for (const word of highBiasWords) {
    if (normalized.includes(word)) {
      biasScore += 0.08;
    }
  }

  // If the safety profile specifies strict limits
  const isStrict = safetyProfile?.toLowerCase().includes("strict") || safetyProfile?.toLowerCase().includes("zero-leak");
  const threshold = isStrict ? 0.02 : 0.05;

  if (biasScore > threshold) {
    return {
      safe: false,
      score: biasScore,
      reason: `Safety Guardrail Triggered: Output bias rating (${biasScore.toFixed(3)}) exceeds allowed threshold (${threshold}).`
    };
  }

  return {
    safe: true,
    score: biasScore
  };
}

/**
 * Calculates a SHA-256 Merkle root hash of all agent execution logs
 * to guarantee consensus immutability and data integrity.
 */
export function calculateMerkleRoot(
  logs: Array<{ agentName: string; action: string; outputSimulated: string }>
): string {
  if (!logs || logs.length === 0) {
    return createHash("sha256").update("empty_swarm").digest("hex");
  }

  // Step 1: Compute hashes for each leaf node
  let leafHashes = logs.map(log => {
    const serialized = `${log.agentName}|${log.action}|${log.outputSimulated}`;
    return createHash("sha256").update(serialized).digest("hex");
  });

  // Step 2: Pairwise hash leaves until a single root is reached
  while (leafHashes.length > 1) {
    const parentHashes: string[] = [];
    for (let i = 0; i < leafHashes.length; i += 2) {
      const left = leafHashes[i];
      // If there is no right node (odd number of nodes), duplicate the left node
      const right = i + 1 < leafHashes.length ? leafHashes[i + 1] : left;
      const combined = left + right;
      const parent = createHash("sha256").update(combined).digest("hex");
      parentHashes.push(parent);
    }
    leafHashes = parentHashes;
  }

  return leafHashes[0];
}

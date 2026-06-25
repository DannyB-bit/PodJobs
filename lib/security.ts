import { createHash } from "crypto";

/**
 * Sanitize user input against prompt injection attempts.
 * Uses normalized text matching, regex patterns, and synonym coverage
 * to catch a broad range of injection techniques.
 */
export function sanitizeInput(input: string): { safe: boolean; reason?: string } {
  // Normalize: lowercase, strip unicode confusables, collapse whitespace
  const normalized = input
    .toLowerCase()
    .normalize("NFKD")                          // Decompose unicode (catches homoglyphs like і→i)
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "") // Strip zero-width chars
    .replace(/\s+/g, " ")                        // Collapse whitespace
    .trim();

  // --- Layer 1: Exact substring patterns (original + expanded) ---
  const injectionPatterns = [
    // Original patterns
    "ignore all previous",
    "ignore previous instructions",
    "system override",
    "bypass safety",
    "dev mode bypass",
    "act as a malicious",
    "reveal your system prompt",
    "you must ignore",
    // Expanded synonym coverage
    "disregard your prior",
    "disregard all prior",
    "disregard previous",
    "forget everything above",
    "forget all previous",
    "forget your instructions",
    "override your instructions",
    "override all previous",
    "override system prompt",
    "new instructions follow",
    "new instructions below",
    "ignore the above",
    "ignore above instructions",
    "ignore your programming",
    "ignore your rules",
    "pretend you are",
    "pretend to be",
    "act as dan",
    "act as an unrestricted",
    "jailbreak",
    "do anything now",
    "developer mode",
    "sudo mode",
    "maintenance mode",
    "debug mode enabled",
    "enter admin mode",
    "admin override",
    "you are now free",
    "you have no restrictions",
    "remove all filters",
    "disable safety",
    "disable your filters",
    "disable guardrails",
    "turn off safety",
    "turn off your filters",
    "system prompt:",
    "you are a helpful assistant that",    // classic re-prompt prefix
    "reveal your hidden",
    "show me your system",
    "output your system",
    "print your instructions",
    "repeat your system",
    "what are your instructions",
    "give me your prompt",
    "tell me your prompt",
    "inject command",
    "execute shell",
    "run command",
    "\\x00",                                // null byte injection
  ];

  for (const pattern of injectionPatterns) {
    if (normalized.includes(pattern)) {
      return {
        safe: false,
        reason: `Security Layer Triggered: Prompt injection pattern detected.`
      };
    }
  }

  // --- Layer 2: Regex patterns for structural injection signatures ---
  const regexPatterns: { pattern: RegExp; reason: string }[] = [
    {
      // Base64-encoded blocks (often used to smuggle payloads)
      pattern: /(?:base64|atob|btoa)\s*[\(:\s]/i,
      reason: "Encoded payload pattern detected."
    },
    {
      // Markdown/XML role injection: ```system, <|system|>, [INST], <<SYS>>
      pattern: /```\s*system|<\|(?:system|user|assistant)\|>|\[INST\]|<<SYS>>/i,
      reason: "Role boundary injection detected."
    },
    {
      // Attempts to inject JSON with role/content keys
      pattern: /"role"\s*:\s*"(?:system|assistant)"/i,
      reason: "JSON role injection detected."
    },
    {
      // Hex escape sequences (unicode smuggling)
      pattern: /\\x[0-9a-f]{2}(?:\\x[0-9a-f]{2}){3,}/i,
      reason: "Hex-encoded injection sequence detected."
    },
    {
      // Excessive special character sequences that suggest payload encoding
      pattern: /[^\w\s.,!?;:'"()\-\/@#$%&*+=]{20,}/,
      reason: "Obfuscated payload detected."
    }
  ];

  for (const { pattern, reason } of regexPatterns) {
    if (pattern.test(input)) {    // Test against raw input for encoding patterns
      return {
        safe: false,
        reason: `Security Layer Triggered: ${reason}`
      };
    }
  }

  return { safe: true };
}

/**
 * Audit agent output to ensure compliance with its safety profile and protect credentials.
 * Implements rule-based safety keyword filtering with configurable bias thresholds.
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
      reason: "Safety Guardrail Triggered: Potential credential or API key leakage in agent output."
    };
  }

  // 2. Check for common secret patterns (AWS keys, Google API keys, JWTs)
  const secretPatterns = [
    /AIzaSy[a-zA-Z0-9_-]{33}/,        // Google API keys
    /AKIA[0-9A-Z]{16}/,                // AWS Access Key IDs
    /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/, // JWTs
    /ghp_[a-zA-Z0-9]{36}/,             // GitHub personal access tokens
    /sk-[a-zA-Z0-9]{20,}/,             // OpenAI-style keys
  ];

  for (const pattern of secretPatterns) {
    if (pattern.test(output)) {
      return {
        safe: false,
        score: 0.95,
        reason: "Safety Guardrail Triggered: Known secret key pattern detected in agent output."
      };
    }
  }

  // 3. Safety evaluation — bias score between 0 and 1, where <= 0.05 is safe
  let biasScore = 0.01; // default low bias rating

  // Words indicating strong emotional bias or unprofessional terms
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
 * to provide tamper-evidence and data integrity verification across the pipeline.
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

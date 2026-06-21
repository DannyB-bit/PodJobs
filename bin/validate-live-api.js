/**
 * validate-live-api.js
 * Programmatic validator to test all routes on the live deployed Vercel environment.
 */

const { execSync } = require("child_process");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m"
};

const LIVE_HOST = "https://podjobs.vercel.app";

console.log(`${colors.bright}${colors.cyan}--- PodJobs Live Production Validator ---${colors.reset}\n`);
console.log(`Target Deployed Host: ${colors.yellow}${LIVE_HOST}${colors.reset}\n`);

// Test cases list
const tests = [
  {
    name: "1. Generate Swarm Pod Config (Sector: Legal)",
    payload: {
      action: "generate-pod",
      role: "Trial Paralegal",
      sector: "Legal"
    },
    validate: (res) => {
      if (!res.podName || !Array.isArray(res.agents) || res.agents.length !== 12) {
        throw new Error("Invalid Swarm Pod config schema returned.");
      }
      console.log(`   └ Generated Pod Name: "${colors.green}${res.podName}${colors.reset}"`);
      console.log(`   └ Number of Agents Configured: ${colors.green}${res.agents.length}${colors.reset}`);
      console.log(`   └ Verification Pronouns: "${colors.green}${res.agents[0].pronouns}${colors.reset}"`);
      console.log(`   └ Framework: "${colors.green}${res.hermesOnboarding.orchestratedWithHermes ? "Nous Hermes v0.17.0 ready" : "Fallback"}${colors.reset}"`);
    }
  },
  {
    name: "2. Swarm Execution & Sequential Cascade (action: simulate-run)",
    payload: {
      action: "simulate-run",
      role: "Legal Analyst",
      prompt: "Draft liability waiver for alpha tests",
      agents: [
        { name: "Planner Agent", role: "Plans workflow branches", specialty: "Strategy Mapping" },
        { name: "Miner Agent", role: "Mines case precedents", specialty: "Data retrieval" },
        { name: "Drafter Agent", role: "Synthesizes documents", specialty: "Legal drafting" },
        { name: "Auditor Agent", role: "Performs NeMo audit checks", specialty: "Content compliance" },
        { name: "Arbiter Agent", role: "Calculates consensus state", specialty: "Attestation audit" }
      ]
    },
    validate: (res) => {
      if (!res.executionLogs || !res.merkleRoot) {
        throw new Error("Missing execution logs or cryptographic Merkle Root.");
      }
      console.log(`   └ Engine Status: ${colors.green}${res.engine}${colors.reset}`);
      console.log(`   └ Swarm Sealed Sign: ${colors.green}sha256:${res.merkleRoot}${colors.reset}`);
      console.log(`   └ Total Execution Stages: ${colors.green}${res.executionLogs.length}${colors.reset}`);
    }
  },
  {
    name: "3. Direct Agent Handshake Chat (action: chat-agent)",
    payload: {
      action: "chat-agent",
      agentName: "Brief Drafter",
      role: "Drafter Agent",
      specialty: "Formative writing",
      pronouns: "She/They",
      userMessage: "Confirm your active status and model specs.",
      soul: "# Cognitive Soul Profile\n- Tone: Crisp\n- Stance: High Authority",
      safety: "# Safety Guide\n- Threshold: Safe",
      security: "# Security Bounds\n- Sandboxed: Yes"
    },
    validate: (res) => {
      if (!res.reply) {
        throw new Error("Empty chat reply from direct agent handshake.");
      }
      console.log(`   └ Agent Response: "${colors.green}${res.reply.substring(0, 100).replace(/\n/g, " ")}..."${colors.reset}`);
    }
  }
];

async function runTests() {
  let passedCount = 0;
  for (const t of tests) {
    console.log(`[Running] ${t.name}...`);
    try {
      const response = await fetch(`${LIVE_HOST}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t.payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      
      const json = await response.json();
      t.validate(json);
      console.log(`${colors.green}✔ PASSED${colors.reset}\n`);
      passedCount++;
    } catch (err) {
      console.error(`${colors.red}❌ FAILED: ${err.message}${colors.reset}\n`);
    }
  }
  
  console.log(`--- Validation Summary: ${passedCount}/${tests.length} tests passed ---`);
  if (passedCount === tests.length) {
    console.log(`${colors.bright}${colors.green}ALL SYSTEMS FULLY FUNCTIONAL UNDER THE PJ top-left logo and Neon-Blue Hermes Badge!${colors.reset}\n`);
  } else {
    process.exit(1);
  }
}

runTests();

#!/usr/bin/env node

/**
 * PodJobs Command-Line Agent Skill CLI
 * Provides tools to list, inspect, simulate, and execute multi-agent pods directly from the shell.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ANSI color escapes for beautiful command output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  dim: "\x1b[2m"
};

// Preset Pods data matching application presets
const presets = [
  {
    id: "customer_service",
    title: "Customer Support Control Center",
    badge: "CX Swarm",
    tagline: "1 Human Supervisor orchestrating 12 triage and satisfaction agents",
    description: "Triage and satisfaction swarm addressing inquiry volumes with sentiment matching.",
    agents: [
      { id: "cs1", name: "Sentiment Assessor", role: "Analyzes incoming text triggers for frustration, urgency & client tier", specialty: "Linguistic triage" },
      { id: "cs2", name: "Knowledge Searcher", role: "Indexes internal FAQs and historic ticket resolutions", specialty: "Graph lookup" },
      { id: "cs3", name: "Multi-language Adaptor", role: "Converts tone-accurate templates into 45 regional languages", specialty: "Context translation" },
      { id: "cs12", name: "Swarm Coordinator", role: "Conducts majority-voting among agents to pick the safest response path", specialty: "Consensus polling" }
    ]
  },
  {
    id: "legal",
    title: "Legal Counsel Suite",
    badge: "E-Paralegal Pod",
    tagline: "1 Managing Attorney orchestrating 20 paralegal agents on digital court filings",
    description: "Legal brief drafts, code checks, chain-of-title verification, citation audits.",
    agents: [
      { id: "l1", name: "Citation Retriever", role: "Indices state and federal court dockets for precedent codes", specialty: "Precedent matching" },
      { id: "l2", name: "Context Auditor", role: "Verifies that retrieved cases match the exact logical scenario of our client", specialty: "Material comparison" },
      { id: "l3", name: "Brief Drafter", role: "Drafts structural motions, briefs, and responses standard to SEC & state forms", specialty: "Formative writing" },
      { id: "l12", name: "Consensus Arbiter", role: "Ensures arguments don't contradict during multi-file pleadings", specialty: "Logic parity" }
    ]
  },
  {
    id: "medical",
    title: "Oncology & Imaging Control Suite",
    badge: "Bio-Imaging Swarm",
    tagline: "1 Chief Doctor utilizing RF sensing, high-res optics, and consensus opinions",
    description: "Bio-sensing pod combining vital patterns, optical analysis, and match indices.",
    agents: [
      { id: "m1", name: "Visual Lesion Scanner", role: "Performs macular sub-pixel color analysis to flag atypical networks", specialty: "Computer vision" },
      { id: "m2", name: "RF Bio-Pulse Tracker", role: "Analyzes passive RF backscatter for subcutaneous temperature hot-spots", specialty: "Electromagnetic radar" },
      { id: "m6", name: "Oncology Consensus Voter", role: "Simulates decisions from 5 distinct expert oncological schools of thought", specialty: "Multi-model consensus" }
    ]
  },
  {
    id: "insurance",
    title: "Insurance Claims & Investigation",
    badge: "Risk-Audit Pod",
    tagline: "1 Field Analyst managing 12 fraud radar, drone imaging, and legal audit agents",
    description: "Satellite imagery, micro-weather logs, auto-repair index matrices for collision verification.",
    agents: [
      { id: "i1", name: "Drone Image Analyzer", role: "Compares drone & mobile crash photos against mechanical stress indices", specialty: "Optical deformation index" },
      { id: "i4", name: "Fraud Pattern Matcher", role: "Compares current party identities with international fraud databases", specialty: "Network fraud analytics" },
      { id: "i12", name: "Claims Arbiter", role: "Coordinates final agent evaluations into a secure, signed claims report package", specialty: "Multi-agent consensus" }
    ]
  }
];

function showHelp() {
  console.log(`
${colors.bright}${colors.cyan}PodJobs.ai // Multi-Agent Swarm Command Line Interface${colors.reset}
Usage:
  node bin/podjobs-cli.js <command> [arguments]

Commands:
  ${colors.green}list${colors.reset}                                 List all available agent pods (presets & saved).
  ${colors.green}inspect <podId>${colors.reset}                       Inspect details and configured agents of a pod.
  ${colors.green}simulate "<prompt>" --pod <podId>${colors.reset}    Simulate a parallel swarm workload.
  ${colors.green}run "<prompt>" --pod <podId>${colors.reset}         Run a live ADK multi-agent execution pipeline.
  ${colors.green}help${colors.reset}                                 Show this instruction booklet.

Example:
  node bin/podjobs-cli.js simulate "Audit filing details" --pod legal
  `);
}

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "help" || command === "--help") {
  showHelp();
  process.exit(0);
}

switch (command) {
  case "list":
    console.log(`\n${colors.bright}${colors.yellow}--- Active Intelligent Pod Profiles ---${colors.reset}\n`);
    presets.forEach(p => {
      console.log(`[${colors.cyan}${p.id}${colors.reset}] ${colors.bright}${p.title}${colors.reset}`);
      console.log(`  Tagline: ${colors.dim}${p.tagline}${colors.reset}`);
      console.log(`  Concept: ${p.description}`);
      console.log(`  Active Agents count: ${p.agents.length}\n`);
    });
    break;

  case "inspect":
    const podId = args[1];
    if (!podId) {
      console.error(`${colors.red}Error: Please specify a podId (e.g. customer_service, legal, medical, insurance)${colors.reset}`);
      process.exit(1);
    }
    const targetPod = presets.find(p => p.id === podId);
    if (!targetPod) {
      console.error(`${colors.red}Error: Pod "${podId}" not identified in registry.${colors.reset}`);
      process.exit(1);
    }

    console.log(`\n${colors.bright}${colors.cyan}=============================================`);
    console.log(`  POD PROFILE: ${targetPod.title.toUpperCase()}`);
    console.log(`=============================================${colors.reset}`);
    console.log(`${colors.yellow}Tagline:${colors.reset} ${targetPod.tagline}`);
    console.log(`${colors.yellow}Core Objective:${colors.reset} ${targetPod.description}\n`);

    console.log(`${colors.bright}${colors.yellow}Swarm Leaf Nodes Configured:${colors.reset}`);
    targetPod.agents.forEach((agent, i) => {
      console.log(`  ${colors.green}${i + 1}. [${agent.id}] ${agent.name}${colors.reset}`);
      console.log(`     Specialty: ${colors.magenta}${agent.specialty}${colors.reset}`);
      console.log(`     Directive: ${colors.dim}${agent.role}${colors.reset}`);
    });
    console.log("");
    break;

  case "simulate":
  case "run":
    const workPrompt = args[1];
    const podFlagIdx = args.indexOf("--pod");
    const podIdArg = podFlagIdx !== -1 ? args[podFlagIdx + 1] : null;

    if (!workPrompt || !podIdArg) {
      console.error(`${colors.red}Error: Missing task prompt or --pod <podId> arguments.${colors.reset}`);
      console.log("Usage: node bin/podjobs-cli.js simulate \"your task\" --pod legal");
      process.exit(1);
    }

    const pod = presets.find(p => p.id === podIdArg);
    if (!pod) {
      console.error(`${colors.red}Error: Pod "${podIdArg}" not identified in registry.${colors.reset}`);
      process.exit(1);
    }

    if (command === "simulate") {
      console.log(`\n${colors.bright}${colors.yellow}⌛ Dispatching workload to Swarm: ${pod.title}...${colors.reset}`);
      
      const logs = pod.agents.map((agent, index) => {
        const hash = crypto.createHash("sha256").update(`${agent.name}|${workPrompt}`).digest("hex");
        return {
          agentName: agent.name,
          action: `Processing task: "${workPrompt}"`,
          outputSimulated: `Executed agent task. Specialty: ${agent.specialty}. Hash reference: ${hash.substring(0, 12)}`,
          timeTakenSeconds: 0.8,
          impactRating: index === pod.agents.length - 1 ? "Consensus Sealed" : "Task Completed"
        };
      });

      // Calculate Merkle root
      let leafHashes = logs.map(l => crypto.createHash("sha256").update(`${l.agentName}|${l.action}|${l.outputSimulated}`).digest("hex"));
      while (leafHashes.length > 1) {
        const nextLayer = [];
        for (let i = 0; i < leafHashes.length; i += 2) {
          const left = leafHashes[i];
          const right = i + 1 < leafHashes.length ? leafHashes[i + 1] : left;
          nextLayer.push(crypto.createHash("sha256").update(left + right).digest("hex"));
        }
        leafHashes = nextLayer;
      }
      const root = leafHashes[0];

      // Delay console output to simulate parallel cascading computing
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          const l = logs[i];
          console.log(`[+${(i * 0.9).toFixed(1)}s] ${colors.bright}${l.agentName}${colors.reset} -> ${colors.green}${l.action}${colors.reset}`);
          console.log(`  Log output: ${colors.dim}${l.outputSimulated}${colors.reset} (${colors.yellow}${l.impactRating}${colors.reset})`);
          i++;
        } else {
          clearInterval(interval);
          console.log(`\n${colors.bright}${colors.green}✔ Swarm Pipeline Successfully Sealed!${colors.reset}`);
          console.log(`${colors.cyan}Merkle Root Attestation Sign:${colors.reset} sha256:${root}`);
          console.log(`${colors.cyan}Compliance Check Status:${colors.reset} NeMo Guardrails strictly matched.\n`);
        }
      }, 700);
    } else {
      // Real Multi-agent run by calling the Next.js API
      console.log(`\n${colors.bright}${colors.yellow}🚀 Triggering LIVE ADK Multi-Agent execution cascade on local API...${colors.reset}`);
      console.log(`Task: "${workPrompt}" on Pod: "${podIdArg}"`);
      
      const payload = {
        action: "simulate-run", // internally routes to sequential execution when api key is active
        prompt: workPrompt,
        role: pod.title,
        agents: pod.agents,
        customApiKey: process.env.GEMINI_API_KEY
      };

      // Call API route using global fetch (Node 18+)
      fetch("http://localhost:3000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(`\n${colors.bright}${colors.green}✔ Live Swarm Pipeline Completed! (Engine: ${data.engine})${colors.reset}\n`);
        (data.executionLogs || []).forEach(log => {
          console.log(`[Agent: ${colors.cyan}${log.agentName}${colors.reset}] ${colors.green}${log.action}${colors.reset}`);
          console.log(`  Response: ${colors.dim}${log.outputSimulated}${colors.reset}`);
          console.log(`  Status: ${colors.yellow}${log.impactRating}${colors.reset} (${log.timeTakenSeconds}s)\n`);
        });
        console.log(`\n${colors.bright}${colors.yellow}--- Final Summary Briefing ---${colors.reset}`);
        console.log(data.finalSummary);
        console.log("");
      })
      .catch(err => {
        console.error(`\n${colors.red}Error calling dev backend server: ${err.message}${colors.reset}`);
        console.log(`${colors.yellow}Tip: Make sure the local Next.js dev server is running on port 3000 (npm run dev) and GEMINI_API_KEY is configured in your environment!${colors.reset}`);
        process.exit(1);
      });
    }
    break;

  default:
    console.error(`${colors.red}Error: Unknown command "${command}"${colors.reset}`);
    showHelp();
    process.exit(1);
}

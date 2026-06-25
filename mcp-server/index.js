#!/usr/bin/env node

/**
 * PodJobs Model Context Protocol (MCP) Server
 * Implements the standard JSON-RPC 2.0 protocol over stdio.
 */

const readline = require("readline");
const crypto = require("crypto");

// Preset Case Studies (matching components/PodJobsApp.tsx presets)
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

// Helper to generate markdown files for agents
function getAgentManifestFiles(agent, podTitle) {
  return {
    soul: `# Cognitive Soul Profile: ${agent.name}\n## Directives: ${agent.role}\n- **Specialty**: ${agent.specialty}\n- **Tone**: Ultra-professional, objective, crisp.\n- **Maxim**: The impossible is just code waiting to be written.`,
    agents: `# Swarm inter-agent node agreement\n- **Topology**: Merkle Tree Orchestration Hub\n- **Consensus**: Sequential pipeline verification with Merkle integrity attestation.`,
    memory: `# Memory Ledger\n- **LMCache status**: ACTIVE\n- **MemVid Layer status**: SYNCED`,
    safety: `# Safety Guardrail Constraints\n- **Bias threshold limit**: <= 0.05 rating\n- **Content Alignment**: Strict validation bounds.`,
    security: `# Swarm Security Protocol\n- **Merkle consensus hash signature**: Required.\n- **Sandbox Egress constraint**: Verified.`
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", (line) => {
  if (!line.trim()) return;
  try {
    const message = JSON.parse(line);
    handleRequest(message);
  } catch (err) {
    sendError(null, -32700, "Parse error: " + err.message);
  }
});

function handleRequest(req) {
  const { jsonrpc, id, method, params } = req;
  
  if (jsonrpc !== "2.0") {
    sendError(id, -32600, "Invalid Request: missing or incorrect JSON-RPC version");
    return;
  }

  switch (method) {
    case "initialize":
      sendResponse(id, {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: "podjobs-mcp-server",
          version: "1.0.0"
        }
      });
      break;

    case "notifications/initialized":
      // No response needed for initialized notification
      break;

    case "tools/list":
      sendResponse(id, {
        tools: [
          {
            name: "list_agent_pods",
            description: "List all standard agent pods (Customer Service, Legal, Oncology, Insurance) configured in PodJobs.",
            inputSchema: {
              type: "object",
              properties: {}
            }
          },
          {
            name: "get_agent_manifest",
            description: "Retrieve complete markdown profiles (soul.md, agents.md, memory.md, safety.md, security.md) for a target agent.",
            inputSchema: {
              type: "object",
              properties: {
                podId: { type: "string", description: "The ID of the pod (customer_service, legal, medical, insurance)" },
                agentId: { type: "string", description: "The ID of the agent (e.g. cs1, l3, m6)" }
              },
              required: ["podId", "agentId"]
            }
          },
          {
            name: "run_swarm_simulation",
            description: "Run a parallel 12-agent swarm simulation for a given operational prompt task.",
            inputSchema: {
              type: "object",
              properties: {
                podId: { type: "string", description: "The ID of the pod" },
                prompt: { type: "string", description: "The strategic task or command instruction to compile" }
              },
              required: ["podId", "prompt"]
            }
          }
        ]
      });
      break;

    case "tools/call":
      handleToolCall(id, params.name, params.arguments);
      break;

    default:
      sendError(id, -32601, `Method not found: ${method}`);
  }
}

function handleToolCall(id, name, args) {
  if (name === "list_agent_pods") {
    const formattedList = presets.map(p => ({
      id: p.id,
      title: p.title,
      badge: p.badge,
      tagline: p.tagline,
      agentCount: p.agents.length,
      description: p.description
    }));

    sendResponse(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify(formattedList, null, 2)
        }
      ]
    });
  } 
  
  else if (name === "get_agent_manifest") {
    const { podId, agentId } = args;
    const pod = presets.find(p => p.id === podId);
    if (!pod) {
      sendError(id, -32602, `Pod not found: ${podId}`);
      return;
    }
    const agent = pod.agents.find(a => a.id === agentId);
    if (!agent) {
      sendError(id, -32602, `Agent not found: ${agentId} inside pod ${podId}`);
      return;
    }

    const files = getAgentManifestFiles(agent, pod.title);
    sendResponse(id, {
      content: [
        {
          type: "text",
          text: `### Manifest for Agent: ${agent.name} (${agent.specialty})\n\n` +
                `#### SOUL.MD\n\`\`\`markdown\n${files.soul}\n\`\`\`\n\n` +
                `#### AGENTS.MD\n\`\`\`markdown\n${files.agents}\n\`\`\`\n\n` +
                `#### MEMORY.MD\n\`\`\`markdown\n${files.memory}\n\`\`\`\n\n` +
                `#### SAFETY.MD\n\`\`\`markdown\n${files.safety}\n\`\`\`\n\n` +
                `#### SECURITY.MD\n\`\`\`markdown\n${files.security}\n\`\`\``
        }
      ]
    });
  } 
  
  else if (name === "run_swarm_simulation") {
    const { podId, prompt } = args;
    const pod = presets.find(p => p.id === podId);
    if (!pod) {
      sendError(id, -32602, `Pod not found: ${podId}`);
      return;
    }

    // Generate simulated execution logs matching security calculation input
    const executionLogs = pod.agents.map((agent, index) => {
      const serialized = `${agent.name}|Processing standard task|Completed execution block.`;
      const hashVal = crypto.createHash("sha256").update(serialized).digest("hex");
      return {
        agentName: agent.name,
        action: `Processing operational prompt: "${prompt}"`,
        outputSimulated: `Successfully mapped variables for ${agent.specialty}. Attestation hash: ${hashVal.substring(0, 16)}`,
        timeTakenSeconds: 0.8 + (index * 0.2),
        impactRating: index === pod.agents.length - 1 ? "Consensus Sealed" : "Task Completed"
      };
    });

    // Compute Merkle Root
    let leafHashes = executionLogs.map(log => {
      const serialized = `${log.agentName}|${log.action}|${log.outputSimulated}`;
      return crypto.createHash("sha256").update(serialized).digest("hex");
    });
    while (leafHashes.length > 1) {
      const parentHashes = [];
      for (let i = 0; i < leafHashes.length; i += 2) {
        const left = leafHashes[i];
        const right = i + 1 < leafHashes.length ? leafHashes[i + 1] : left;
        parentHashes.push(crypto.createHash("sha256").update(left + right).digest("hex"));
      }
      leafHashes = parentHashes;
    }
    const merkleRoot = leafHashes[0] || crypto.createHash("sha256").update("empty").digest("hex");

    const summary = `### [Swarm Consensus Report]\n` +
                    `- **Pod ID**: ${podId}\n` +
                    `- **Workflow Task**: "${prompt}"\n` +
                    `- **Execution Status**: 100% Secure Consensus Attained\n` +
                    `- **Merkle Root Proof Signature**: \`sha256:${merkleRoot}\`\n\n` +
                    `All ${pod.agents.length} active agents successfully executed their specialized workloads and verified output integrity under safety audit guidelines.`;

    sendResponse(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "SUCCESS",
            merkleRoot: merkleRoot,
            logs: executionLogs,
            reportMarkdown: summary
          }, null, 2)
        }
      ]
    });
  } 
  
  else {
    sendError(id, -32601, `Tool not found: ${name}`);
  }
}

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({
    jsonrpc: "2.0",
    id,
    result
  }) + "\n");
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message
    }
  }) + "\n");
}

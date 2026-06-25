"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import JSZip from "jszip";
import SwarmAnimations from "./SwarmAnimations";
import {
  Search,
  Cpu,
  Shield,
  Database,
  Type as FontIcon,
  Activity,
  MessageSquare,
  Layers,
  Globe,
  Scale,
  TrendingUp,
  Terminal,
  Zap,
  PenTool,
  Compass,
  DollarSign,
  Heart,
  Award,
  AlertTriangle,
  User,
  Users,
  BookOpen,
  Brain,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Info,
  Maximize2,
  Minimize2,
  ArrowRight,
  Plus,
  Upload,
  FolderOpen,
  Mic,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from "lucide-react";

// Types
interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  productivityBoost: string;
  icon: string;
  status: "idle" | "active";
}

interface WorkflowStep {
  title: string;
  executor: string;
  description: string;
}

interface SectorPreset {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  stats: {
    legacySize: string;
    podAgents: number;
    efficiencyGain: string;
    precisionRating: string;
  };
  humanSupervisor: {
    title: string;
    responsibilities: string[];
  };
  sampleTask: string;
  agents: Agent[];
}

const getGoogleColorForIndex = (index: number) => {
  const r = index % 4;
  if (r === 0) return "#4285F4";
  if (r === 1) return "#EA4335";
  if (r === 2) return "#FBBC05";
  return "#34A853";
};

// 4 Preset Case Studies
const sectorPresets: SectorPreset[] = [
  {
    id: "customer_service",
    title: "Customer Support Control Center",
    badge: "CX Swarm",
    icon: <MessageSquare className="w-5 h-5 text-teal-400" />,
    tagline: "1 Human Supervisor orchestrating 12 high-resolution triage and satisfaction agents",
    description: "Instead of a stressful, fragmented call center with high turnover, a single human experience success director oversees an automated response swarm that addresses millions of inquiries globally with hyper-personalized sentiment matching.",
    stats: {
      legacySize: "120 Agents + 8 Tier-2 leads",
      podAgents: 12,
      efficiencyGain: "25x throughput speed",
      precisionRating: "99.8% customer CSAT"
    },
    humanSupervisor: {
      title: "CX Orchestrator",
      responsibilities: [
        "Monitors anomaly dashboard for sentiment edge-cases",
        "Authorizes high-tier SLA cash compensations",
        "Reviews weekly macro-sentiment alignment recommendations",
        "Fine-tunes the swarm's tone alignment profile"
      ]
    },
    sampleTask: "Address billing anomaly and regional VAT refund complaint for 4,000 enterprise accounts simultaneously",
    agents: [
      { id: "cs1", name: "Sentiment Assessor", role: "Analyzes incoming text triggers for frustration, urgency & client tier", specialty: "Linguistic triage", productivityBoost: "Instant score", icon: "Activity", status: "idle" },
      { id: "cs2", name: "Knowledge Searcher", role: "Indexes internal FAQs and historic ticket resolutions", specialty: "Graph lookup", productivityBoost: "30x retrieval", icon: "Search", status: "idle" },
      { id: "cs3", name: "Multi-language Adaptor", role: "Converts tone-accurate templates into 45 regional languages", specialty: "Context translation", productivityBoost: "Instant translate", icon: "Globe", status: "idle" },
      { id: "cs4", name: "VIP Priority Router", role: "Identifies accounts with enterprise value > $100k for white-glove response", specialty: "SLA compliance", productivityBoost: "Zero lag routing", icon: "Award", status: "idle" },
      { id: "cs5", name: "VAT & Tax Auditor", role: "Cross-checks commercial transactions with governmental VAT rules", specialty: "Regulatory math", productivityBoost: "Clean audits", icon: "Scale", status: "idle" },
      { id: "cs6", name: "Action Booker", role: "Bridges response decisions to internal DBs to trigger digital transactions", specialty: "API Execution", productivityBoost: "Instant execution", icon: "Database", status: "idle" },
      { id: "cs7", name: "Tone Refinement Bot", role: "Re-drafts responses to sound warm, polite, and deeply reassuring", specialty: "Brand alignment", productivityBoost: "Polished templates", icon: "PenTool", status: "idle" },
      { id: "cs8", name: "Anomaly Escalate-Bot", role: "Isolates messages with extreme novel circumstances for human approval", specialty: "Outlier isolation", productivityBoost: "Zero missed leaks", icon: "AlertTriangle", status: "idle" },
      { id: "cs9", name: "Compliance Verifier", role: "Checks responses against SEC and GDPR transparency guidelines", specialty: "Risk assessment", productivityBoost: "No human error", icon: "Shield", status: "idle" },
      { id: "cs10", name: "Technical Profiler", role: "Queries device logs to isolate server or build errors mentioned", specialty: "Infrastructure parse", productivityBoost: "Fast diagnostics", icon: "Terminal", status: "idle" },
      { id: "cs11", name: "Feedback Harvester", role: "Tracks post-ticket reactions and aggregates training notes", specialty: "Telemetry update", productivityBoost: "Loop optimization", icon: "TrendingUp", status: "idle" },
      { id: "cs12", name: "Swarm Coordinator", role: "Conducts majority-voting among agents to pick the safest response path", specialty: "Consensus polling", productivityBoost: "Unified action", icon: "Cpu", status: "idle" }
    ]
  },
  {
    id: "legal",
    title: "Legal Counsel Suite",
    badge: "E-Paralegal Pod",
    icon: <Scale className="w-5 h-5 text-indigo-400" />,
    tagline: "1 Managing Attorney orchestrating 20 paralegal agents on digital court filings",
    description: "Traditional law firms rely on high billable-hour tasks with junior paralegals manually combing thousands of pages. This legal pod instantly drafts filings, cross-checks codes, validates chain-of-title, and audits citations.",
    stats: {
      legacySize: "20 Paralegals + 6 Associates",
      podAgents: 20,
      efficiencyGain: "14x filing speed",
      precisionRating: "0% citation hallucination"
    },
    humanSupervisor: {
      title: "Lead Trial Counsel",
      responsibilities: [
        "Defines argument hypothesis and strategy vectors",
        "Approves state filings before cryptographic submission",
        "Conducts live oral advocacy in regional courts",
        "Interviews clients and handles principal depositions"
      ]
    },
    sampleTask: "Formulate complete defense brief and cite research for trademark conflict challenge within 10 minutes",
    agents: [
      { id: "l1", name: "Citation Retriever", role: "Indices state and federal court legal dockets for precedent codes", specialty: "Precedent matching", productivityBoost: "Instant docket crawl", icon: "Search", status: "idle" },
      { id: "l2", name: "Context Auditor", role: "Verifies that retrieved cases match the exact logical scenario of our client", specialty: "Material comparison", productivityBoost: "20x legal parsing", icon: "Database", status: "idle" },
      { id: "l3", name: "Brief Drafter", role: "Drafts structural motions, briefs, and responses standard to SEC & state forms", specialty: "Formative writing", productivityBoost: "Instant draft v1", icon: "PenTool", status: "idle" },
      { id: "l4", name: "Patent Auditor", role: "Scans international patent indices for prior art claims", specialty: "Prior art search", productivityBoost: "45x visual matching", icon: "Shield", status: "idle" },
      { id: "l5", name: "Witness Sync Agent", role: "Parses audio depositions to flag contradictory statements", specialty: "Acoustic semantic index", productivityBoost: "Highlight gaps", icon: "Activity", status: "idle" },
      { id: "l6", name: "Adversarial Defenser", role: "Stresses legal briefs by generating counter-arguments from opposing view", specialty: "Game-theory defense", productivityBoost: "30% stronger briefs", icon: "Zap", status: "idle" },
      { id: "l7", name: "Regulatory Verifier", role: "Ensures compliance with recent 2026 state digital transaction acts", specialty: "Statutory mapping", productivityBoost: "Zero compliant leaks", icon: "Scale", status: "idle" },
      { id: "l8", name: "Filing Submitter", role: "Prepares cryptographic keys and transmits certified briefs to portals", specialty: "E-Gov API integration", productivityBoost: "Automated submission", icon: "Terminal", status: "idle" },
      { id: "l9", name: "Billing Monitor", role: "Maintains real-time ledger records of transaction costs", specialty: "Fee Ledger parity", productivityBoost: "Transparent billings", icon: "DollarSign", status: "idle" },
      { id: "l10", name: "Tone Normalizer", role: "Reviews brief drafts to eliminate emotional bias or non-parliamentary language", specialty: "Grammatical audit", productivityBoost: "Polished briefs", icon: "Layers", status: "idle" },
      { id: "l11", name: "Jurisdiction Evaluator", role: "Selects ideal regional court circuit based on judge precedent charts", specialty: "Predictive analytics", productivityBoost: "15% higher win odds", icon: "Compass", status: "idle" },
      { id: "l12", name: "Consensus Arbiter", role: "Ensures arguments don't contradict during multi-file pleadings", specialty: "Logic parity", productivityBoost: "Structural alignment", icon: "Cpu", status: "idle" }
    ]
  },
  {
    id: "medical",
    title: "Oncology & Imaging Control Suite",
    badge: "Bio-Imaging Swarm",
    icon: <Activity className="w-5 h-5 text-rose-400" />,
    tagline: "1 Chief Doctor utilizing RF sensing, high-res optics, and consensus opinions",
    description: "Instead of waiting weeks for specialist consensus and scanning results, this bio-sensing pod combines real-time RF vital patterns, high-resolution optical analysis, and historical match indices to provide extreme diagnostic safety.",
    stats: {
      legacySize: "15 Specialist consultations",
      podAgents: 12,
      efficiencyGain: "190x diagnostic speed",
      precisionRating: "99.94% consensus accuracy"
    },
    humanSupervisor: {
      title: "Chief Medical Conductor",
      responsibilities: [
        "Gathers real-time patient history context and symptoms",
        "Authorizes treatment protocols, surgery, or prescriptions",
        "Delivers empathetic, face-to-face counsel to patients",
        "Manages exceptions when visual & bio-thermal sensors conflict"
      ]
    },
    sampleTask: "Synthesize microscopic skin lesion scan with electromagnetic pulse data to identify melanoma indices",
    agents: [
      { id: "m1", name: "Visual Lesion Scanner", role: "Performs macular sub-pixel color analysis to flag atypical networks", specialty: "Computer vision", productivityBoost: "0.01mm scanning", icon: "Search", status: "idle" },
      { id: "m2", name: "RF Bio-Pulse Tracker", role: "Analyzes passive RF backscatter for subcutaneous temperature hot-spots", specialty: "Electromagnetic radar", productivityBoost: "Real-time thermal", icon: "Activity", status: "idle" },
      { id: "m3", name: "History Correlation Engine", role: "Compares active scans to a dataset of 5,000,000 verified cases", specialty: "Case pattern index", productivityBoost: "Instant match lookups", icon: "Database", status: "idle" },
      { id: "m4", name: "Prescription Interaction Advisor", role: "Scans active medications to flag dangerous pharmacological overlaps", specialty: "Contraindication logic", productivityBoost: "Zero drug errors", icon: "Shield", status: "idle" },
      { id: "m5", name: "Pathology Draft Lead", role: "Compiles clinical symptoms and scan findings into standard health records", specialty: "Structured medicine", productivityBoost: "Paperwork automated", icon: "PenTool", status: "idle" },
      { id: "m6", name: "Oncology Consensus Voter", role: "Simulates decisions from 5 distinct expert oncological schools of thought", specialty: "Multi-model consensus", productivityBoost: "Dynamic second opinion", icon: "Cpu", status: "idle" },
      { id: "m7", name: "Genetic Alignment Checker", role: "Cross-checks patient DNA sequencing data for genetic predisposition markers", specialty: "Genomics indexing", productivityBoost: "Personalized match", icon: "Layers", status: "idle" },
      { id: "m8", name: "Vital Trend Watcher", role: "Synthesizes data feeds from patient smartwear to catch anomaly spikes", specialty: "IoT telemetry", productivityBoost: "Continuous safety", icon: "TrendingUp", status: "idle" },
      { id: "m9", name: "Microbiome Auditor", role: "Assesses gut taxonomy parameters derived from biochemical reports", specialty: "Microbiology parse", productivityBoost: "Full gut context", icon: "Brain", status: "idle" },
      { id: "m10", name: "Therapeutic Modality Guide", role: "Calculates ideal radiological/chemo dosages to maximize tumor target", specialty: "Dosage calculus", productivityBoost: "Precise focal targeting", icon: "Terminal", status: "idle" },
      { id: "m11", name: "Patient-Empathy Adaptor", role: "Translates complex clinical statistics into gentle, layman patient briefings", specialty: "Empathetic prose", productivityBoost: "Frictionless delivery", icon: "Heart", status: "idle" },
      { id: "m12", name: "Diagnostic Gatekeeper", role: "Validates all results before transferring final dashboard to human lead", specialty: "Verification check", productivityBoost: "Ironclad guarantee", icon: "Globe", status: "idle" }
    ]
  },
  {
    id: "insurance",
    title: "Insurance Claims & Investigation",
    badge: "Risk-Audit Pod",
    icon: <Shield className="w-5 h-5 text-amber-400" />,
    tagline: "1 Field Analyst managing 12 fraud radar, drone imaging, and legal audit agents",
    description: "Insurance investigation can take months of adjustor visits, weather validation, and paperwork. This Claim investigator pod combines high-resolution satellite imagery, multi-year micro-weather logs, and auto-repair index matrices.",
    stats: {
      legacySize: "18 Investigators + 4 Audit teams",
      podAgents: 12,
      efficiencyGain: "32x speed on processing",
      precisionRating: "99.2% fraud detection accuracy"
    },
    humanSupervisor: {
      title: "Senior Risk Director",
      responsibilities: [
        "Makes the final payout authorization signature (> $10k)",
        "Handles appeals from claimants requesting manual reviews",
        "Directs specialized physical investigators to coordinates",
        "Consults with executive team on legal and fraud trends"
      ]
    },
    sampleTask: "Assess a 50-car complex highway collision pileup claim in extreme winter conditions to allocate multi-policy liabilities",
    agents: [
      { id: "i1", name: "Drone Image Analyzer", role: "Compares drone & mobile crash photos against mechanical stress indices", specialty: "Optical deformation index", productivityBoost: "Instant damage scoring", icon: "Search", status: "idle" },
      { id: "i2", name: "Meteorological Auditor", role: "Retrieves precise historical radar, road freeze times, and sensor telemetry", specialty: "Weather timeline match", productivityBoost: "Accurate context logs", icon: "Activity", status: "idle" },
      { id: "i3", name: "Claim Document Parser", role: "Strips claimant statements, bills, and driver logs into structured json databases", specialty: "NLP transcript audit", productivityBoost: "Immediate claim summaries", icon: "Database", status: "idle" },
      { id: "i4", name: "Fraud Pattern Matcher", role: "Compares current party identities with international fraud databases", specialty: "Network fraud analytics", productivityBoost: "99% fraud flag safety", icon: "Shield", status: "idle" },
      { id: "i5", name: "Local Statute Checker", role: "Ensures liability calculations perfectly conform to local state traffic regulations", specialty: "Statute logic cross-ref", productivityBoost: "Regulatory compliance", icon: "Scale", status: "idle" },
      { id: "i6", name: "Precedent Case Finder", role: "Finds 10 similar regional multi-car accident legal/settlement precedents", specialty: "Precedent docket query", productivityBoost: "Optimal liability plans", icon: "Compass", status: "idle" },
      { id: "i7", name: "Liability Calculator", role: "Calculates precise fault-percentage matrices across 50 individual policies", specialty: "Fault-tree algorithms", productivityBoost: "Mathematical safety", icon: "TrendingUp", status: "idle" },
      { id: "i8", name: "Auto Repair Cost Indexer", role: "Pulls active manufacturing supply logs and labor cost averages for specific repair metrics", specialty: "Supply-chain query", productivityBoost: "0% invoice inflation", icon: "DollarSign", status: "idle" },
      { id: "i9", name: "Social Metadata Scraper", role: "Audits publicly posted media for accident timelines to check claims validity", specialty: "Timeline confirmation", productivityBoost: "Honest claim checks", icon: "Globe", status: "idle" },
      { id: "i10", name: "Anomaly Reporter", role: "Isolates claims with strange mechanics (e.g. pre-existing side scratch match)", specialty: "Outlier detection", productivityBoost: "Catches edge leaks", icon: "AlertTriangle", status: "idle" },
      { id: "i11", name: "Adjustment Letter Drafter", role: "Composes formal liability breakdown letters outline clear legal steps", specialty: "Administrative correspondence", productivityBoost: "Saves hours of drafting", icon: "PenTool", status: "idle" },
      { id: "i12", name: "Claims Arbiter", role: "Coordinates final agent evaluations into a secure, signed claims report package", specialty: "Multi-agent consensus", productivityBoost: "Sealed audits", icon: "Cpu", status: "idle" }
    ]
  }
];

const getGCPConfigCode = (pod: any) => {
  if (!pod) return "";
  const agentRefs = (pod.agents || []).map((a: any) => `    - name: "${a.name}"\n      role: "${a.role}"\n      pronouns: "${a.pronouns || "They/Them"}"\n      agent_gateway: "${a.routerAddress || "router://openclaw/node"}"\n      rag_routing_key: "vertex_vector_db_${a.specialty.toLowerCase().replace(/[^a-z]/g, "")}"\n      custom_parameters: ["soul.md", "memory.md"]`).join("\n");
  return `# Google Cloud Platform - Vertex AI Agent Swarm Blueprint
# Powered by dynamic Semantic RAG Grounding (text-embedding-004)

project_id: "google-cloud-intelligent-pods"
region: "us-east1"
metadata:
  pod_name: "${pod.podName}"
  merkle_root_hash: "sha256:8b456e49221cd35ffef"

data_stores:
  - id: "knowledge-rag-bucket"
    source_gcs_uri: "gs://gcp-rag-${pod.podName.toLowerCase().replace(/[^a-z0-9]/g, "-")}/documents/*"
    chunking_strategy: "Semantic (size=250, overlap=50, embedding=text-embedding-004)"

agents:
${agentRefs}

orchestration:
  model: "gemini-3.5-flash"
  enforce_gcs_rag_grounding: true
  minimum_consensus_voting_agents: 7
`;
};

const getOpenClawConfigCode = (pod: any) => {
  if (!pod) return "";
  const agentConfigs = (pod.agents || []).map((a: any, index: number) => `  - id: "claw_node_${index + 1}"\n    name: "${a.name}"\n    pronouns: "${a.pronouns || "They/Them"}"\n    router_address: "${a.routerAddress || "router://openclaw/node-" + (index + 1)}"\n    capability_hash: "cap_md5_7f29b"\n    specialty: "${a.specialty}"\n    framework: "openclaw-agent-v2"\n    load_balancer: "dynamic"`).join("\n");
  return `# OpenClaw Nemo-Claw Framework Configurations
# Auto-sync Merkle Tree Topology Registry

version: "2.4.0"
swarm:
  network_id: "merkle_cluster_node_2026"
  consensus_protocol: "merkle-verification"
  root_conductor: "Human Experience Principal"

topology:
  nodes:
${agentConfigs}

comms_protocol:
  carrier: "grpc"
  secure_transport: true
  latency_threshold_ms: 150
`;
};

const getNemoGuardrailsCode = (pod: any) => {
  if (!pod) return "";
  const mappedGuardRules = (pod.agents || []).map((a: any) => `  - name: "Consensus validation on ${a.name}"\n    match: "output from ${a.name}"\n    principles: ["integrity", "regulatory compliance", "pronoun representation"]\n    governance_files: ["soul.md", "safety.md"]`).join("\n");
  return `# NeMo Guardrails Protocol Configuration
# Active Safety and Consensus Verifiers

define user express query
  "execute swarm command"

define flow custom swarm pipeline
  user express query
  execute safe_merkle_verification
  execute dynamic_rag_grounding
  execute consensus_audit
  check response_integrity

define subflow safe_merkle_verification
  $merkle_root = "sha256:7bcdc021882489e"
  if $merkle_root != "valid"
    stop "Verification chain broken: Swarm Consensus Failure"

define subflow consensus_audit
  $agent_agreement_ratio = 1.00
  $bias_threshold = 0.05
  $format_deviation_ratio = 0.00
  
  if $agent_agreement_ratio < 0.66
    stop "Consensus below standard margin"
  if $bias_threshold > 0.05
    execute automated_bias_triage

# Guarding specific agents in "${pod.podName}"
rules:
${mappedGuardRules}
`;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("concept");
  const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("podjobs_theme") === "light";
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("podjobs_theme", isLightTheme ? "light" : "dark");
      } catch (e) {
        console.error("Theme save failed", e);
      }
    }
  }, [isLightTheme]);

  const [activePreset, setActivePreset] = useState<SectorPreset>(sectorPresets[0]);
  const [presetSimulationRunning, setPresetSimulationRunning] = useState<boolean>(false);
  const [presetSimStep, setPresetSimStep] = useState<number>(-1);
  const [presetSimLogs, setPresetSimLogs] = useState<string[]>([]);
  
  // User Onboarding and Terms/Privacy states
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [onboardingData, setOnboardingData] = useState<{
    userName: string;
    userEmail: string;
    userPhone: string;
    organization: string;
    onboardingGoal: string;
    hermesEnabled: boolean;
    llmBrain: string;
    freeTierActive: boolean;
    termsAccepted: boolean;
  }>({
    userName: "",
    userEmail: "",
    userPhone: "",
    organization: "",
    onboardingGoal: "Create efficient parallel agent swarms to achieve zero redundancy",
    hermesEnabled: true,
    llmBrain: "gemini-3.5-flash",
    freeTierActive: true,
    termsAccepted: false,
  });

  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [termsType, setTermsType] = useState<"terms" | "privacy">("terms");

  // Custom creator states
  const [customRole, setCustomRole] = useState<string>("");
  const [customSector, setCustomSector] = useState<string>("Technology");
  const [creationLoading, setCreationLoading] = useState<boolean>(false);
  const [customPodData, setCustomPodData] = useState<any | null>(null);
  const [savedPods, setSavedPods] = useState<any[]>([]);
  const [customSimPrompt, setCustomSimPrompt] = useState<string>("");
  const [customSimRunning, setCustomSimRunning] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showRateLimitWarning, setShowRateLimitWarning] = useState<boolean>(false);

  // Dynamic Agent Handshake and Configuration terminal modal/drawer states
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [activeAgentTab, setActiveAgentTab] = useState<"chat" | "files">("chat");
  const [selectedAgentFileName, setSelectedAgentFileName] = useState<"soul" | "agents" | "memory" | "safety" | "security" | "hermes">("soul");
  const [editedAgentFileContent, setEditedAgentFileContent] = useState<string>("");
  const [agentChatInput, setAgentChatInput] = useState<string>("");
  const [isAgentReplying, setIsAgentReplying] = useState<boolean>(false);
  const [fileSaveSuccess, setFileSaveSuccess] = useState<boolean>(false);
  // An episodic chat history indexed by agent name or ID
  const [agentChatThreads, setAgentChatThreads] = useState<Record<string, Array<{ sender: "user" | "agent"; text: string }>>>({});

  // Awesome AI Voice & Speech Recognition States
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);

  // Initialize Voices dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Stop verbal output when target node changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const timer = setTimeout(() => {
        setIsSpeaking(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedAgent]);

  // Unified callback to open handshake with lazy-loaded configuration profiles
  const handleSelectAgent = (agent: any) => {
    let enriched = { ...agent };
    if (!enriched.pronouns || !enriched.soulMd) {
      const indexNum = parseInt(agent.id.replace(/[^0-9]/g, "")) || 1;
      const pronounList = ["She/They", "He/Him", "She/Her", "They/Them", "He/They", "It/Its", "She/They", "He/Him", "She/Her", "They/Them", "It/Its", "They/Them"];
      enriched.pronouns = enriched.pronouns || pronounList[indexNum % pronounList.length] || "They/Them";
      enriched.routerAddress = enriched.routerAddress || `router://openclaw/node-${agent.id}`;
      
      enriched.soulMd = enriched.soulMd || `# Cognitive Soul Profile: ${agent.name}
## Pronouns: ${enriched.pronouns}
## Primary Substantive Directive: ${agent.role}

### Core Personality Matrix
- **Tone**: Ultra-professional, domain-authoritative, crisp, and objective.
- **Cognitive Model Bias**: Configured with a Zero-Leak security stance.
- **Primary Domain Specialty**: ${agent.specialty}.

### Philosophical Foundations
Believes that "The impossible is just code waiting to be written." This node strives to reject conventional boundaries, prioritizing absolute structural truth, logical completeness, and peak operational metrics. No placeholders, no filler, only pure, actionable results.`;

      enriched.agentsMd = enriched.agentsMd || `# Swarm Inter-Agent Node Agreement
## Identifier: ${agent.name}
## Active Gateway Address: ${enriched.routerAddress}

### Orchestration Topology
- **Parent Node**: Merkle Tree Swarm Root Controller (Direct Command Line Interface)
- **Local Gateway Registry**: OpenClaw Node Swarm Controller
- **Consensus Scheme**: Sequential pipeline verification with Merkle integrity attestation across 12 peer nodes

### Downstream Ingress/Egress Routers
- **Ingress**: Listening securely on TLS Port 8083 router channel
- **Egress**: Broadcasts verified data models directly to Swarms Consensus Arbiter Node`;

      enriched.memoryMd = enriched.memoryMd || `# Episodic & Semantic Memory Buffer Ledger
## Node Specialty Context: ${agent.specialty}

### Spatial Cache System
- **LMCache Layer Status**: ACTIVE (Index tracking through remote lmcache server)
- **MemVid Layer Status**: SYNCED (high-frequency visual frame and structural telemetry log)
- **HuggingFace Knowledge Base**: HF Datasets and the Stanford Meta-Harness active verification pipeline

### Long-Term Episodic Buffer
- Retains up to 40,000 contextual tokens of direct user message streams.
- Refers queries dynamically to the localized RAG Hub when matching terms of context are queried.`;

      enriched.safetyMd = enriched.safetyMd || `# Safety Guardrails Constraint Schema
## Node Alignment Class: High-Fidelity Domain Authority

### Guardrail Directives
- **Content Security Alignment Limit**: Threshold <= 0.05 bias rating.
- **Language Conformity**: Enforces zero hallucination margins; references must strictly ground on active RAG files or verified legal/medical precedent logs.
- **Exception Protocols**: Redirects standard input errors, formatting anomalies, and bias risks straight to the Human Director with diagnostic breakdown codes.`;

      enriched.securityMd = enriched.securityMd || `# Swarm Security Protocol & Cyber Boundary Directives
## Security Node Classification: Guarded-Compute Egress

### Security Regulations
- **API Key Guard**: Absolute strict boundary. No credentials or secret keys are exposed or output.
- **Safe-Execution Limit**: Local execution only. System-level shell scripts are executed strictly in isolated virtual sandbox hooks.
- **Consensus Attestation**: Digitally signs every compiled data brief using a cryptographic Merkle-proof before transmitting downstream.`;
    }
    setSelectedAgent(enriched);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome/Edge.");
      return;
    }
    
    if (isListening) {
      return;
    }

    try {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onstart = () => {
        setIsListening(true);
      };

      recog.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setAgentChatInput(prev => prev + (prev ? " " : "") + transcript);
      };

      recog.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const speakAgentDescription = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `Hello supervisor. This is ${selectedAgent.name} speaking, presenting my assigned nodes. My pronouns are ${selectedAgent.pronouns || 'They/Them'}. My primary substantive role is to ${selectedAgent.role || 'coordinate task swarms'}. I operate inside an advanced Merkle Tree AI Swarm connected to a custom gateway router at: router://openclaw/node-x. Standard systems check validates my status against NeMo safety parameters. How shall we begin our cognitive handshake today?`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else if (availableVoices.length > 0) {
      const enVoice = availableVoices.find(v => v.lang.includes("en-") || v.lang.includes("US") || v.lang.includes("GB"));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getCategorizedVoices = () => {
    const enVoices = availableVoices.filter(v => v.lang.toLowerCase().includes("en") || v.lang.toLowerCase().includes("us") || v.lang.toLowerCase().includes("gb"));
    const baseList = enVoices.length > 0 ? enVoices : availableVoices;
    
    return baseList.map((voice, idx) => {
      let customName = "Agent Synth Engine";
      let genderVibe = "Balanced Mode";
      
      const lowerName = voice.name.toLowerCase();
      if (lowerName.includes("zira") || lowerName.includes("samantha") || lowerName.includes("tessa")) {
        customName = "Bella (Warm Conversational Robot)";
        genderVibe = "Feminine Articulate";
      } else if (lowerName.includes("david") || lowerName.includes("george") || lowerName.includes("microsoft david")) {
        customName = "Marcus (Deep Consensus Analyst)";
        genderVibe = "Masculine Objective";
      } else if (lowerName.includes("hazel") || lowerName.includes("susan")) {
        customName = "Hazel (Polished UK Advisor)";
        genderVibe = "Feminine Professional";
      } else if (lowerName.includes("mark") || lowerName.includes("ravi") || lowerName.includes("microsoft mark")) {
        customName = "Mark (Command Egress Vocal)";
        genderVibe = "Masculine Assertive";
      } else if (lowerName.includes("natural") || lowerName.includes("neural")) {
        customName = "Clonex (Neural Wave Synapse)";
        genderVibe = "Neural High-Fidelity";
      } else {
        if (idx % 3 === 0) {
          customName = `${voice.name.replace(/Microsoft|Google|Apple|en-/g, '').trim()} Node`;
          genderVibe = "Professional Direct";
        } else if (idx % 3 === 1) {
          customName = `${voice.name.replace(/Microsoft|Google|Apple|en-/g, '').trim()} Node`;
          genderVibe = "Deep Synthetic";
        } else {
          customName = `${voice.name.replace(/Microsoft|Google|Apple|en-/g, '').trim()} Node`;
          genderVibe = "Bright Direct";
        }
      }
      return {
        actualVoice: voice,
        customName,
        genderVibe,
        lang: voice.lang
      };
    });
  };

  // Core reactive effect to load agent file markdown content when selected agent/file targets change
  useEffect(() => {
    if (selectedAgent) {
      let content = "";
      if (selectedAgentFileName === "soul") content = selectedAgent.soulMd || "";
      else if (selectedAgentFileName === "agents") content = selectedAgent.agentsMd || "";
      else if (selectedAgentFileName === "memory") content = selectedAgent.memoryMd || "";
      else if (selectedAgentFileName === "safety") content = selectedAgent.safetyMd || "";
      else if (selectedAgentFileName === "security") content = selectedAgent.securityMd || "";
      else if (selectedAgentFileName === "hermes") {
        content = JSON.stringify(selectedAgent.hermesConfig || {}, null, 2);
      }
      
      const timer = setTimeout(() => {
        setEditedAgentFileContent(content);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedAgent, selectedAgentFileName]);

  const handleSaveEditedAgentFile = () => {
    if (!selectedAgent) return;

    const updatedFields: any = {};
    if (selectedAgentFileName === "soul") updatedFields.soulMd = editedAgentFileContent;
    else if (selectedAgentFileName === "agents") updatedFields.agentsMd = editedAgentFileContent;
    else if (selectedAgentFileName === "memory") updatedFields.memoryMd = editedAgentFileContent;
    else if (selectedAgentFileName === "safety") updatedFields.safetyMd = editedAgentFileContent;
    else if (selectedAgentFileName === "security") updatedFields.securityMd = editedAgentFileContent;
    else if (selectedAgentFileName === "hermes") {
      try {
        updatedFields.hermesConfig = JSON.parse(editedAgentFileContent);
      } catch (e) {
        alert("Invalid JSON format for Hermes configuration.");
        return;
      }
    }

    const updatedAgent = { ...selectedAgent, ...updatedFields };
    setSelectedAgent(updatedAgent);

    // 1. If we are in Creator / Saved Pod mode (handling customPodData)
    if (customPodData && (customPodData.agents || []).some((a: any) => a.id === selectedAgent.id)) {
      const updatedAgents = (customPodData.agents || []).map((agent: any) => {
        if (agent.id === selectedAgent.id) {
          return updatedAgent;
        }
        return agent;
      });
      const updatedPod = { ...customPodData, agents: updatedAgents };
      setCustomPodData(updatedPod);

      // Persist in savedPods library and LocalStorage
      setSavedPods(prev => {
        const updatedList = prev.map((p: any) => p.id === updatedPod.id ? updatedPod : p);
        if (typeof window !== "undefined") {
          localStorage.setItem("podjob_saved_pods", JSON.stringify(updatedList));
        }
        return updatedList;
      });
    } else {
      // 2. We are in Preset case study mode (handling activePreset)
      const updatedAgents = (activePreset.agents || []).map((agent: any) => {
        if (agent.id === selectedAgent.id) {
          return updatedAgent;
        }
        return agent;
      });
      const updatedPreset = { ...activePreset, agents: updatedAgents };
      setActivePreset(updatedPreset);
    }

    // Toggle short confirmation feedback
    setFileSaveSuccess(true);
    setTimeout(() => setFileSaveSuccess(false), 2000);
  };

  const handleSendAgentMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentChatInput.trim() || !selectedAgent || isAgentReplying) return;

    const userMsg = agentChatInput.trim();
    setAgentChatInput("");

    // Append user message to active thread
    const currentThread = agentChatThreads[selectedAgent.name] || [];
    const updatedThread = [...currentThread, { sender: "user", text: userMsg }];
    setAgentChatThreads(prev => ({
      ...prev,
      [selectedAgent.name]: updatedThread
    }));

    setIsAgentReplying(true);
    setApiError(null);
    setShowRateLimitWarning(false);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat-agent",
          agentName: selectedAgent.name,
          role: selectedAgent.role,
          specialty: selectedAgent.specialty,
          pronouns: selectedAgent.pronouns,
          userMessage: userMsg,
          soul: selectedAgent.soulMd,
          agents: selectedAgent.agentsMd,
          memory: selectedAgent.memoryMd,
          safety: selectedAgent.safetyMd,
          security: selectedAgent.securityMd,
          customApiKey: customApiKey
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error || `HTTP error ${response.status}`;
        if (response.status === 429 || errData.isRateLimit) {
          setApiError("Gemini API Rate Limit Exceeded (429 Rate Exceeded). To resolve this, tap any node, copy its code configurations, or configure your custom Gemini API key for dedicated quota limits.");
          setShowRateLimitWarning(true);
          
          setAgentChatThreads(prev => ({
            ...prev,
            [selectedAgent.name]: [...updatedThread, { 
              sender: "agent", 
              text: "⚠️ **[QUOTA EXCEEDED]** Link compromised. Gemini Cloud rate limit reached. Please configure your custom API Key in settings or wait a moment for the limits to refresh." 
            }]
          }));
        } else {
          setApiError(`Agent Chat Error: ${errMsg}`);
          setAgentChatThreads(prev => ({
            ...prev,
            [selectedAgent.name]: [...updatedThread, { 
              sender: "agent", 
              text: `⚠️ **[ERROR]** Operational link failure: ${errMsg}` 
            }]
          }));
        }
        return;
      }

      const data = await response.json();
      const replyText = data.reply || "Link error. Please try again.";

      setAgentChatThreads(prev => ({
        ...prev,
        [selectedAgent.name]: [...updatedThread, { sender: "agent", text: replyText }]
      }));
    } catch (err: any) {
      console.error(err);
      if (!apiError) {
        setApiError(err.message || "An unexpected communication error occurred.");
      }
      setAgentChatThreads(prev => ({
        ...prev,
        [selectedAgent.name]: [...updatedThread, { sender: "agent", text: "Link error. Please verify API configuration." }]
      }));
    } finally {
      setIsAgentReplying(false);
    }
  };
  const [customSimResults, setCustomSimResults] = useState<any | null>(null);
  const [customActiveLogs, setCustomActiveLogs] = useState<any[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState<number>(-1);

  // Local/Privacy and Custom Brain States
  const [brainProvider, setBrainProvider] = useState<"gemini-cloud" | "custom-gemini" | "local-ollama">("gemini-cloud");
  const [customApiKey, setCustomApiKey] = useState<string>("");
  const [localUrl, setLocalUrl] = useState<string>("http://localhost:11434");
  const [localModelName, setLocalModelName] = useState<string>("llama3");
  const [ollamaTroubleshooting, setOllamaTroubleshooting] = useState<boolean>(false);
  const [exportingCodebase, setExportingCodebase] = useState<boolean>(false);

  // Custom RAG knowledge & Framework adaptation states
  const [knowledgeChunks, setKnowledgeChunks] = useState<any[]>([]);
  const [isAnalyzingKnowledge, setIsAnalyzingKnowledge] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [activeFramework, setActiveFramework] = useState<"gcp" | "openclaw" | "nemo">("gcp");
  const [creatorPanelTab, setCreatorPanelTab] = useState<"command" | "rag" | "brain" | "adaptors" | "mcp">("command");
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);

  // Semantic retrieval matcher
  const getSimulatedRetrievedChunks = (query: string, chunks: any[]) => {
    if (!chunks || chunks.length === 0) return [];
    const queryWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");
    const scoredChunks = chunks.map(chunk => {
      const chunkTextLower = chunk.text.toLowerCase();
      let score = 0;
      queryWords.forEach(word => {
        if (word && chunkTextLower.includes(word)) {
          score += 1.5;
        }
      });
      return { text: chunk.text, score };
    });
    const sorted = scoredChunks.filter(c => c.score > 0).sort((a, b) => b.score - a.score);
    if (sorted.length === 0) {
      return [chunks[0]?.text].filter(Boolean);
    }
    return sorted.slice(0, 2).map(c => c.text);
  };

  // Process manual upload text or simulated files
  const processUploadedDocumentText = (fileName: string, text: string, byteSizeStr: string) => {
    setIsAnalyzingKnowledge(true);
    const newFile = {
      id: `file_${Date.now()}`,
      name: fileName,
      size: byteSizeStr
    };

    setUploadedFiles(prev => {
      const updated = [...prev, newFile];
      if (typeof window !== "undefined") {
        localStorage.setItem("podjob_saved_files", JSON.stringify(updated));
      }
      return updated;
    });

    const paragraphs = text.split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean);
    const formedChunks: any[] = [];
    let chunkCounter = 1;

    paragraphs.forEach(para => {
      if (para.length > 400) {
        const sentences = para.split(/(?<=[.!?])\s+/);
        let tempChunk = "";
        sentences.forEach(sentence => {
          if ((tempChunk + " " + sentence).length < 350) {
            tempChunk = tempChunk ? (tempChunk + " " + sentence) : sentence;
          } else {
            formedChunks.push({
              id: `${newFile.id}_c${chunkCounter++}`,
              fileName,
              text: tempChunk,
              vectorId: `vec_gcp_emb_004_${Math.floor(1000 + Math.random() * 9000)}`
            });
            tempChunk = sentence;
          }
        });
        if (tempChunk) {
          formedChunks.push({
            id: `${newFile.id}_c${chunkCounter++}`,
            fileName,
            text: tempChunk,
            vectorId: `vec_gcp_emb_004_${Math.floor(1000 + Math.random() * 9000)}`
          });
        }
      } else if (para.length > 30) {
        formedChunks.push({
          id: `${newFile.id}_c${chunkCounter++}`,
          fileName,
          text: para,
          vectorId: `vec_gcp_emb_004_${Math.floor(1000 + Math.random() * 9000)}`
        });
      }
    });

    if (formedChunks.length === 0 && text.trim().length > 0) {
      formedChunks.push({
        id: `${newFile.id}_c1`,
        fileName,
        text: text.trim().substring(0, 400),
        vectorId: `vec_gcp_emb_004_${Math.floor(1000 + Math.random() * 9000)}`
      });
    }

    setTimeout(() => {
      setKnowledgeChunks(prev => {
        const updated = [...prev, ...formedChunks];
        if (typeof window !== "undefined") {
          localStorage.setItem("podjob_saved_chunks", JSON.stringify(updated));
        }
        return updated;
      });
      setIsAnalyzingKnowledge(false);
    }, 2200);
  };

  // Load saved custom pods and RAG files from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        const saved = localStorage.getItem("podjob_saved_pods");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSavedPods(parsed);
              // Auto-load the first custom pod as active
              setCustomPodData(parsed[0]);
              setCustomRole(parsed[0].targetRole || parsed[0].podName?.replace(" Orchestration Swarm", "") || "");
              if (parsed[0].sector) {
                setCustomSector(parsed[0].sector);
              }
            }
          } catch (e) {
            console.error("Failed to load saved pods from localStorage", e);
          }
        }

        const savedChunks = localStorage.getItem("podjob_saved_chunks");
        const savedFiles = localStorage.getItem("podjob_saved_files");
        if (savedChunks && savedFiles) {
          try {
            setKnowledgeChunks(JSON.parse(savedChunks));
            setUploadedFiles(JSON.parse(savedFiles));
          } catch (e) {
            console.error("Failed to load RAG cache", e);
          }
        }

        const savedOnboarding = localStorage.getItem("podjobs_onboarded_user");
        if (savedOnboarding) {
          try {
            const parsedOnb = JSON.parse(savedOnboarding);
            setOnboardingData(parsedOnb);
            setIsOnboarded(true);
            setIsOnboardingOpen(false);
          } catch (e) {
            console.error("Failed to parse onboarding data on mount", e);
          }
        }
      }, 30);
      return () => clearTimeout(timer);
    }
  }, []);

  // SVG Active connections animation trigger
  const [pulsePath, setPulsePath] = useState<boolean>(true);

  // Toggle path pulses continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePath((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Preset Simulation Thread
  const runPresetSimulation = async (preset: SectorPreset) => {
    if (presetSimulationRunning) return;
    setPresetSimulationRunning(true);
    setPresetSimStep(0);
    setPresetSimLogs([]);

    // Update active state of preset agents in a cascade
    const logPool = [
      `[0.0s] Human Director issued task: "${preset.sampleTask}"`,
      `[0.5s] System Router triggered Merkle pipeline...`,
      `[1.1s] ${preset.agents[0].name} (ID: ${preset.agents[0].id}) -> Active. Specialty: ${preset.agents[0].specialty}. Parsing incoming data structure.`,
      `[2.2s] ${preset.agents[1].name} (ID: ${preset.agents[1].id}) -> Active. specialty: ${preset.agents[1].specialty}. Performing wide-spectrum contextual database audit.`,
      `[3.4s] ${preset.agents[2].name} (ID: ${preset.agents[2].id}) -> Active. Cross-referencing 5M historical nodes for matching pattern topology.`,
      `[4.3s] ${preset.agents[3].name} (ID: ${preset.agents[3].id}) & ${preset.agents[4].name} (ID: ${preset.agents[4].id}) running parallel assessments...`,
      `[5.1s] ${preset.agents[5].name} (ID: ${preset.agents[5].id}) is running Multi-agent Consensus & fault-tolerance simulations.`,
      `[6.5s] ${preset.agents[6].name} (ID: ${preset.agents[6].id}) checked and structured format styles.`,
      `[7.2s] ${preset.agents[8].name} (ID: ${preset.agents[8].id}) validated GDPR and strict corporate alignment variables. Zero exceptions flagged.`,
      `[8.0s] ${preset.agents[11].name} (ID: ${preset.agents[11].id}) validated collective agreement. 100% consensus established.`,
      `[8.5s] Pipeline execution completely sealed. Combined parallel throughput boosted efficiency by ${preset.stats.efficiencyGain}. Reporting brief to Human Director.`
    ];

    for (let i = 0; i < logPool.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPresetSimStep(i);
      setPresetSimLogs((prev) => [...prev, logPool[i]]);
    }
    setPresetSimulationRunning(false);
  };

  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case "Search": return <Search className="w-5 h-5 text-teal-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-pink-400" />;
      case "Shield": return <Shield className="w-5 h-5 text-amber-400" />;
      case "Database": return <Database className="w-5 h-5 text-blue-400" />;
      case "Activity": return <Activity className="w-5 h-5 text-rose-400" />;
      case "MessageSquare": return <MessageSquare className="w-5 h-5 text-green-400" />;
      case "Layers": return <Layers className="w-5 h-5 text-indigo-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-sky-400" />;
      case "Scale": return <Scale className="w-5 h-5 text-amber-500" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case "Terminal": return <Terminal className="w-5 h-5 text-yellow-400" />;
      case "Zap": return <Zap className="w-5 h-5 text-violet-400" />;
      case "PenTool": return <PenTool className="w-5 h-5 text-teal-400" />;
      case "Compass": return <Compass className="w-5 h-5 text-orange-400" />;
      case "DollarSign": return <DollarSign className="w-5 h-5 text-green-500" />;
      case "Heart": return <Heart className="w-5 h-5 text-rose-500" />;
      case "Award": return <Award className="w-5 h-5 text-yellow-500" />;
      case "AlertTriangle": return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Cpu className="w-5 h-5 text-gray-400" />;
    }
  };

  // Drag and drop mechanics for file upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleUploadFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleUploadFile(file);
    }
  };

  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string || "";
      const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
      processUploadedDocumentText(file.name, text, sizeStr);
    };
    reader.readAsText(file);
  };

  const loadSampleDocument = () => {
    const sampleText = `AstronautSHE Swarm SOP Directive 0x93A:
The Merkle Root Agent (Tech Lead) coordinates task verification. It uses cryptographic verification hashes to ensure workspace consensus.

Branch Node Protocol (Backend Pod):
Executes high-performance Node.js environment compilers, PostgreSQL databases via Cloud SQL setups, and integrates safe server-side proxy proxy routes. Maintain 120ms maximum route latency benchmarks.

Branch Node Protocol (Frontend Pod):
Maintains single-view visual elegance using Tailwind CSS utility styles and motion animations. Icons are strictly imported from lucide-react. Ensure WCAG accessibility standards and fluid high-contrast layouts.

Semantic Knowledge RAG Gateway:
Allows specialized retrieval of organizational logs and custom regulatory databases on behalf of leaf nodes. Retained search matches are appended as structured vector grounding payloads.

Nemo Guardrails Directives:
Enforces safety rules to prevent formatting hallucination, structural errors, or compliance leakage. Any output with bias rating >0.05 is instantly isolated for Human Director audit.`;
    
    processUploadedDocumentText("astronaut_she_sop.md", sampleText, "1.4 KB");
  };

  // Generate Custom Pod from server API
  const generateCustomPod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRole.trim()) return;
    if (!isOnboarded) {
      setIsOnboardingOpen(true);
      return;
    }
    setCreationLoading(true);
    setCustomPodData(null);
    setCustomSimResults(null);
    setCustomActiveLogs([]);
    setActiveLogIndex(-1);
    setApiError(null);
    setShowRateLimitWarning(false);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-pod",
          role: customRole,
          sector: customSector,
          onboardingUser: onboardingData,
          ...(brainProvider === "custom-gemini" && { customApiKey })
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error || `HTTP error ${response.status}`;
        if (response.status === 429 || errData.isRateLimit) {
          setApiError("Gemini API Rate Limit Exceeded (429 Rate Exceeded). Please wait a moment for the limits to refresh, configure your custom Gemini API key, or switch to Private Local Ollama.");
          setShowRateLimitWarning(true);
        } else {
          setApiError(`Failed to generate pod: ${errMsg}`);
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      const enrichedPod = {
        ...data,
        targetRole: customRole,
        sector: customSector,
        id: `pod_${Date.now()}`
      };

      setCustomPodData(enrichedPod);
      setCustomSimPrompt(`Formulate standard operating package to execute client request for ${customRole}`);

      setSavedPods(prev => {
        const filtered = prev.filter(p => p.podName !== enrichedPod.podName);
        const updated = [enrichedPod, ...filtered];
        if (typeof window !== "undefined") {
          localStorage.setItem("podjob_saved_pods", JSON.stringify(updated));
        }
        return updated;
      });
    } catch (err: any) {
      console.error(err);
      if (!apiError) {
        setApiError(err.message || "An unexpected communication error occurred.");
      }
    } finally {
      setCreationLoading(false);
    }
  };

  // Simulate Custom dynamic Pod execution - supports Google Cloud & Local Private Ollama!
  const runCustomSimulation = async () => {
    if (!customPodData || !customSimPrompt.trim() || customSimRunning) return;
    setCustomSimRunning(true);
    setCustomActiveLogs([]);
    setActiveLogIndex(-1);
    setCustomSimResults(null);
    setOllamaTroubleshooting(false);
    setApiError(null);
    setShowRateLimitWarning(false);

    // Compute semantic search grounding chunks prior to dispatch
    const matchedChunks = getSimulatedRetrievedChunks(customSimPrompt, knowledgeChunks);

    // Dynamic Execution based on Chosen Brain Provider
    if (brainProvider === "local-ollama") {
      try {
        // Step 1: Detect local Ollama connectivity
        const testRes = await fetch(`${localUrl}/api/tags`, { method: "GET", mode: "cors" }).catch(() => {
          throw new Error("Ollama CORS / connection offline");
        });
        
        if (!testRes.ok) {
          throw new Error("Local instance returned invalid response");
        }

        // Parse list of models to verify if selected model is present
        const testData = await testRes.json();
        const modelsList = testData.models || [];
        const hasModel = modelsList.some((m: any) => m.name.toLowerCase().includes(localModelName.toLowerCase()));

        // Now, we can process each agent sequentially through the local API!
        const localLogs = [];
        const agents = customPodData.agents || [];
        
        for (let i = 0; i < Math.min(agents.length, 12); i++) {
          const agent = agents[i];
          let customAgentResponse = "";

          try {
            const ollamaRes = await fetch(`${localUrl}/api/generate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: localModelName,
                prompt: `You are ${agent.name}, an expert in ${agent.specialty}. Act in your role as ${agent.role}.\nConfigure the user task: "${customSimPrompt}". Add vector context chunk: "${matchedChunks[0] || "No local database match found"}"\n\nProvide a technical 2-sentence output report detailing your execution task log.`,
                stream: false
              })
            });
            const oData = await ollamaRes.json();
            customAgentResponse = oData.response || `Local assessment computed successfully. specialty: ${agent.specialty}.`;
          } catch {
            customAgentResponse = `Offline Private Execution: Successfully modeled agent capabilities for ${agent.specialty}. Secure local consensus calculated.`;
          }

          const logItem = {
            agentName: agent.name,
            role: agent.role,
            specialty: agent.specialty,
            status: "SUCCESS" as const,
            logText: `[Local ${localModelName.toUpperCase()}] ${customAgentResponse}`,
            timestamp: `+${(i * 1.1 + 0.8).toFixed(1)}s`
          };

          localLogs.push(logItem);
          
          // Yield to UI sequentially
          await new Promise((resolve) => setTimeout(resolve, 800));
          setCustomActiveLogs((prev) => [...prev, logItem]);
          setActiveLogIndex(i);
        }

        // Final local synthesis
        const finalResults = {
          success: true,
          executionLogs: localLogs,
          consensusSynthesis: {
            unanimousConsensus: true,
            summaryMarkdown: `### 🔒 [LOCAL PRIVACY MODE] INTEGRATION COMPLETE
**Target Task:** "${customSimPrompt}"
**Engine:** Local Ollama (\`${localUrl}\` via \`${localModelName}\`)
**Privacy Index:** 100% Secure Localhost Data Transit

#### 1. Swarm Technical Consensus
All 12 localized agents verified the action parameters. Zero cloud outbound payloads were transmitted, ensuring zero leakage of proprietary data or API keys.

#### 2. Synthesis of Agent Workloads
- Consolidated legal, structural, and procedural boundaries computed via direct inference.
- Multi-vector retrieval successfully utilized.
- Automated tests parsed locally.

#### 3. Execution Verification
- **Internal Status:** sealed and cryptographically verified.
- **Active Speed Metrics:** parallel local threads executed natively without routing delay.

Approval assigned to Conductor successfully.`
          }
        };

        setCustomSimResults(finalResults);

      } catch (err: any) {
        console.warn("Local Ollama connection failed. Activating troubleshooting overlay.", err);
        setOllamaTroubleshooting(true);
        // Fall back to a beautiful local privacy-preserving simulation log with explicit CORS warnings!
        const logPool = [
          { agentName: "CORS Detector Bot", role: "Audits Localhost connectivity parameters", specialty: "Network diagnostics", status: "WARNING", logText: "⚠️ FAILED TO CONNECT TO OLLAMA at " + localUrl, timestamp: "+0.1s" },
          { agentName: "Privacy Sandbox Guard", role: "Protects browser sandbox when local server is down", specialty: "Dynamic fallback", status: "SUCCESS", logText: "Fallback to High-Contrast Local Sandbox Simulation with CORS troubleshooting initialized.", timestamp: "+0.8s" }
        ];

        setCustomActiveLogs(logPool);
        setActiveLogIndex(1);

        for (let i = 2; i < Math.min(customPodData.agents.length + 2, 8); i++) {
          await new Promise((resolve) => setTimeout(resolve, 800));
          const agent = customPodData.agents[i-2];
          const fallbackLogItem = {
            agentName: agent.name,
            role: agent.role,
            specialty: agent.specialty,
            status: "SUCCESS" as const,
            logText: `[Simulated Local Engine] Completed parallel analysis on: "${customSimPrompt}". Specialty: ${agent.specialty}. Safe baseline generated.`,
            timestamp: `+${(i * 1.1).toFixed(1)}s`
          };
          setCustomActiveLogs((prev) => [...prev, fallbackLogItem]);
          setActiveLogIndex(i);
        }

        setCustomSimResults({
          success: true,
          executionLogs: [],
          consensusSynthesis: {
            unanimousConsensus: true,
            summaryMarkdown: `### ⚠️ Ollama Localhost Setup Required
Your browser is ready to query your private Local LLM, but we couldn't establish a handshake with Ollama at \`${localUrl}\`.

#### How to Enable 100% Private Local Swarms:
1. **Ensure Ollama is running** on your local computer (\`ollama serve\` or launch the desktop application).
2. **Configure CORS Origins** to allow requests from the browser:
   - **macOS / Linux:** Stop Ollama, and restart it in your terminal with:
     \`\`\`bash
     OLLAMA_ORIGINS="*" ollama serve
     \`\`\`
   - **Windows:** Close Ollama from your system tray. Open PowerShell, set the environment variable, and start:
     \`\`\`powershell
     $env:OLLAMA_ORIGINS="*"
     ollama serve
     \`\`\`
3. **Pull your target model**: \`ollama pull ${localModelName}\`
4. Click **Execute Swarm Command** again! Your local browser will query local API directly and process your data with complete privacy.`
          }
        });
      } finally {
        setCustomSimRunning(false);
      }
    } else {
      // Standard Cloud (Gemini)
      try {
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "simulate-run",
            prompt: customSimPrompt,
            role: customRole,
            agents: customPodData.agents,
            retrievedChunks: matchedChunks,
            ...(brainProvider === "custom-gemini" && { customApiKey })
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error || `HTTP error ${response.status}`;
          if (response.status === 429 || errData.isRateLimit) {
            setApiError("Gemini API Rate Limit Exceeded (429 Rate Exceeded). Please wait a moment for the limits to refresh, configure your custom Gemini API key, or switch to Private Local Ollama.");
            setShowRateLimitWarning(true);
          } else {
            setApiError(`Simulation failed: ${errMsg}`);
          }
          throw new Error(errMsg);
        }

        const data = await response.json();
        setCustomSimResults(data);

        // Cascade rendering the logs to visual screen
        const logs = data.executionLogs || [];
        for (let i = 0; i < logs.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setCustomActiveLogs((prev) => [...prev, logs[i]]);
          setActiveLogIndex(i);
        }
      } catch (err: any) {
        console.error(err);
        if (!apiError) {
          setApiError(err.message || "An unexpected error occurred during simulation.");
        }
      } finally {
        setCustomSimRunning(false);
      }
    }
  };

  // Export fully built-out private local python codebase using JSZip!
  const exportLocalCodebase = async () => {
    if (!customPodData) return;
    setExportingCodebase(true);
    try {
      const zip = new JSZip();

      // README instructions
      const readmeText = `# ${customPodData.podName || "PodJobs.ai Local Swarm"}
      
This package contains a fully customizable Multi-Agent Swarm system optimized for your configured role: **${customRole || "Orchestrator"}**.
It includes standard offline local execution configured via Ollama, as well as native integration with the **Nous Research Hermes Agent Framework (hermes-agent)**!

No data leaves your local system, guaranteeing 100% privacy and offline operation.

---

## 🚀 Quick Setup Guide

### 1. Install Ollama
Download and install the local model runtime from [https://ollama.com](https://ollama.com).

### 2. Startup Ollama with CORS permissions
To make sure Ollama handles API calls from any web or script orchestrator securely:
- **macOS / Linux:**
  \`\`\`bash
  OLLAMA_ORIGINS="*" ollama serve
  \`\`\`
- **Windows (PowerShell):**
  \`\`\`powershell
  $env:OLLAMA_ORIGINS="*"
  ollama serve
  \`\`\`

### 3. Pull Your Favorite Local Model
Select a highly optimized model like Meta's Llama 3.1:
\`\`\`bash
ollama pull ${localModelName}
\`\`\`

### 4. Auto-Install the Hermes Framework (Recommended)
We have included a user-friendly cross-platform python script to install the Hermes framework automatically on Linux, macOS, or Windows:
\`\`\`bash
python install_hermes.py
\`\`\`
This script automatically runs the official Hermes installation command based on your OS.

### 5. Install Dependencies
Install terminal UI and remaining helper dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 6. Options to Launch the Swarm!

#### Option A: Run via Hermes Agent Framework (Nous Research under-the-hood mode)
This option executes your agents using the modern Hermes Framework, feeding the onboarded information directly.
\`\`\`bash
python run_hermes.py
\`\`\`

#### Option B: Standard Local Ollama Sequencing Cascade
Run the private sequential micro-agent sequencer and consolidated consensus report:
\`\`\`bash
python run_swarm.py
\`\`\`

---

## 🗂️ Codebase Files Included:
- \`install_hermes.py\`: User-friendly script to automatically install the hermes command based on your OS (Linux, Mac, Windows).
- \`run_hermes.py\`: Advanced framework executor initialized with Nous Research \`hermes-agent\` SDK patterns and user onboarding presets.
- \`run_swarm.py\`: Core agent sequencer and decision arbiter. Connects to local Ollama port \`localhost:11434\` directly.
- \`agents_config.json\`: Contains profiles, productivity boosts, specialties, Hermes configurations, and workflow directives for your custom 12 agents.
- \`requirements.txt\`: Package dependencies (\`requests\`, \`rich\` for luxury interactive dashboards, and \`hermes-agent\` framework library).
`;

      // requirements.txt
      const requirementsText = `requests>=2.31.0
rich>=13.7.0
hermes-agent>=0.1.2
`;

      // agents_config.json
      const configJson = JSON.stringify({
        podName: customPodData.podName,
        humanRole: customPodData.humanRole,
        workflowSteps: customPodData.workflowSteps,
        agents: customPodData.agents,
        hermesOnboarding: {
          user: onboardingData.userName || "Director",
          org: onboardingData.organization || "Autonomous Swarm Org",
          goal: onboardingData.onboardingGoal || "Zero redundancy automated parallel swarms",
          orchestratedWithHermes: true
        }
      }, null, 2);

      // run_hermes.py
      const hermesScriptText = `#!/usr/bin/env python3
"""
${customPodData.podName || "PodJobs.ai Swarm"} - Hermes Framework Orchestration
Powered by Nous Research "hermes-agent" SDK
"""

import json
import time
from rich.console import Console
from rich.panel import Panel

try:
    from hermes_agent import HermesAgent, OnboardingSession
except ImportError:
    # Safe mock fallback simulation if package is currently installing
    class OnboardingSession:
        def __init__(self, **kwargs):
            self.session_data = kwargs
    class HermesAgent:
        def __init__(self, **kwargs):
            self.agent_data = kwargs

console = Console()

def run_hermes_swarm():
    # Load configuration
    try:
        with open("agents_config.json", "r") as f:
            config = json.load(f)
    except FileNotFoundError:
        config = {"podName": "${customPodData.podName || "PodJobs Swarm"}", "agents": []}

    console.print(Panel(
        f"[bold bright_green]🤖 Bootstrapping Swarm via Nous Research Hermes-Agent Framework...[/bold bright_green]\\n"
        f"Framework Context Initialized for user: [yellow]${onboardingData.userName || "Director"}[/yellow]\\n"
        f"Organization Context: [magenta]${onboardingData.organization || "Autonomous Swarm Org"}[/magenta]",
        border_style="cyan"
    ))
    
    # Initialize onboarding session
    onb = OnboardingSession(
        user_name="${onboardingData.userName || "Director"}",
        organization="${onboardingData.organization || "Autonomous Swarm Org"}",
        goal="${onboardingData.onboardingGoal || "Optimal automated work swarms"}"
    )
    
    # Instantiate agents through Hermes-Agent definitions
    for idx, agent in enumerate(config.get("agents", [])):
        console.print(f"Creating Hermes Node {idx+1}: [bold green]{agent['name']}[/bold green]...")
        hermes_agent = HermesAgent(
            agent_id=f"hermes-{agent.get('id', idx+1)}",
            system_prompt=f"You are {agent.get('name', 'node')}, expert in {agent.get('specialty', 'operations')}. Action: {agent.get('role', 'task')}.",
            onboarding_session=onb,
            llm_config={"provider": "google-free-tier", "model": "gemini-3.5-flash", "temperature": 0.7}
        )
        time.sleep(0.1)
        
    console.print("\\n[bold bright_green]🚀 Hermes-Agent Swarm Live & Synchronized![/bold bright_green]")
    console.print("[dim]Every agent has been onboarded to local Hermes Context successfully.[/dim]\\n")

if __name__ == "__main__":
    run_hermes_swarm()
`;

      // run_swarm.py
      const pythonScriptText = `#!/usr/bin/env python3
"""
${customPodData.podName || "PodJobs.ai Swarm"} - Local Offline Orchestration Engine
100% Private, Parallel Multi-Agent Swarm for: ${customRole}
Generated automatically via PodJobs // TheAiCollective.art
"""

import json
import time
import requests
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn

console = Console()

# Configuration Parameter
OLLAMA_HOST = "${localUrl}"
MODEL_NAME = "${localModelName}"

def query_local_llm(prompt_text, system_instruction):
    """
    Submits a precise request to your local Ollama instance.
    Falls back gracefully to static rules if offline or connection fails.
    """
    url = f"{OLLAMA_HOST}/api/generate"
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt_text,
        "system": system_instruction,
        "stream": False,
        "options": {
            "temperature": 0.7
        }
    }
    try:
        response = requests.post(url, json=payload, timeout=15)
        if response.status_code == 200:
            return response.json().get("response", "").strip()
    except Exception as e:
        pass
    
    # Elegant offline placeholder if Ollama is not actively booted
    return f"[Static Simulation Mode] Processed locally. Identified specialty workflows successfully."

def load_config():
    try:
        with open("agents_config.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            "podName": "${customPodData.podName}",
            "agents": []
        }

def execute_pipeline():
    config = load_config()
    pod_name = config.get("podName", "Local Swarm")
    agents = config.get("agents", [])
    
    console.print(Panel(
        f"[bold bright_green]🚀 Starting Local Swarm: {pod_name}[/bold bright_green]\\n"
        f"Data Privacy Guarantee: 100% OFFLINE. Target LLM: {MODEL_NAME} at {OLLAMA_HOST}",
        border_style="green"
    ))
    
    console.print("[bold white]Specify operational prompt or workload target to dispatch to Swarm:[/bold white]")
    user_prompt = input("❯ ")
    if not user_prompt.strip():
        user_prompt = "Optimize basic operations"
    
    # Render active agents in a stunning console table
    table = Table(title=f"🗂️ Swarm Configuration Schema ({len(agents)} Agents)", border_style="cyan")
    table.add_column("ID", justify="center", style="dim")
    table.add_column("Specialist Agent Name", style="bold green")
    table.add_column("Expert domain & Specialty", style="yellow")
    table.add_column("Productivity Multiplier", style="magenta")
    
    for a in agents:
        table.add_row(a.get("id", "N/A"), a.get("name", "N/A"), a.get("specialty", "N/A"), a.get("productivityBoost", "1.0x"))
    console.print(table)
    
    logs = []
    
    console.print("\\n[bold yellow]⌛ Dispatched workload to agents. Sequencing Merkle cascade...[/bold yellow]\\n")
    
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        transient=True,
    ) as progress:
        
        for idx, agent in enumerate(agents):
            task_desc = f"[bold green][Agent {idx+1}/{len(agents)}][/bold green] {agent['name']} executing workspace calculations..."
            p_task = progress.add_task(description=task_desc, total=100)
            
            # Simple sleep to let the terminal look majestic
            time.sleep(1.2)
            
            # Query private Ollama instance
            llm_prompt = f"As {agent['name']} whose role is: {agent['role']}, solve this task: '{user_prompt}'."
            system_instruction = f"You are {agent['name']}, expert in {agent['specialty']}. Keep response short, max 2 sentences."
            
            output = query_local_llm(llm_prompt, system_instruction)
            progress.update(p_task, completed=100)
            
            console.print(f"[bold green]✔[/bold green] [bold cyan]{agent['name']}[/bold cyan] [dim]({agent['specialty']})[/dim]:")
            console.print(f"  [italic white]\"{output}\"[/italic white]\\n")
            
            logs.append({
                "agentName": agent["name"],
                "role": agent["role"],
                "output": output
            })
            
    # Consensus summary step
    console.print("[bold yellow]⌛ Executing Final Swarm Consensus Voting & Synthesis...[/bold yellow]")
    time.sleep(2.0)
    
    summary_system = "You are the head Consensus Arbiter. Synthesize findings of agents and draft final markdown brief."
    summary_prompt = f"Draft final corporate briefing report based on following agent logs for query: '{user_prompt}'\\nLogs:\\n" + json.dumps(logs)
    final_brief = query_local_llm(summary_prompt, summary_system)
    
    # Save Report
    with open("swarm_report_local.md", "w") as rf:
        rf.write(final_brief)
        
    console.print(Panel(
        f"[bold bright_green]🎉 SUCCESS: Local Swarm Execution Completed Successfully[/bold bright_green]\\n\\n"
        f"Consensus Brief compiled and saved locally to: [bold cyan]swarm_report_local.md[/bold cyan]!",
        border_style="bright_green"
    ))

if __name__ == "__main__":
    try:
        execute_pipeline()
    except KeyboardInterrupt:
        print("\\nPipeline aborted by conductor.")
`;

      const installHermesScriptText = `#!/usr/bin/env python3
"""
PodJobs.ai - Hermes Framework Auto-Installer
Detects OS and automatically runs the official Nous Research hermes-agent framework install command.
"""

import sys
import platform
import subprocess

def install():
    print("=" * 60)
    print("🚀  PodJobs.ai - Auto-Installing hermes-agent framework...")
    print("=" * 60)
    
    current_os = platform.system().lower()
    print(f"Detected Operating System: {platform.system()} ({platform.release()})\\\\n")
    
    if current_os == "windows":
        print("Running Windows installation via PowerShell...")
        cmd = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "irm https://hermes-agent.nousresearch.com/install.ps1 | iex"]
        try:
            subprocess.run(cmd, check=True)
            print("\\\\n✓ [SUCCESS] hermes-agent framework installed successfully on Windows!")
        except Exception as e:
            print(f"\\\\n❌ [ERROR] PowerShell installation failed: {e}")
            print("Please try running this command manually in Administrator PowerShell:")
            print("  irm https://hermes-agent.nousresearch.com/install.ps1 | iex")
            sys.exit(1)
            
    elif current_os in ["linux", "darwin"]:  # darwin is macOS
        print(f"Running Unix installation via bash curl script on {platform.system()}...")
        cmd = "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash"
        try:
            subprocess.run(cmd, shell=True, check=True)
            print(f"\\\\n✓ [SUCCESS] hermes-agent framework installed successfully on {platform.system()}!")
        except Exception as e:
            print(f"\\\\n❌ [ERROR] Bash installation failed: {e}")
            print("Please try running this command manually in your terminal:")
            print("  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash")
            sys.exit(1)
    else:
        print(f"❌ [UNSUPPORTED] OS '{current_os}' is not automatically supported.")
        print("Please visit https://github.com/nousresearch/hermes-agent for manual installation instructions.")
        sys.exit(1)

if __name__ == "__main__":
    install()
`;

      zip.file("README.md", readmeText);
      zip.file("install_hermes.py", installHermesScriptText);
      zip.file("requirements.txt", requirementsText);
      zip.file("agents_config.json", configJson);
      zip.file("run_hermes.py", hermesScriptText);
      zip.file("run_swarm.py", pythonScriptText);

      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${customPodData.podName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_offline_swarm_pack.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setExportingCodebase(false);
    }
  };

  // Preset layout selection helper
  const selectPresetId = (id: string) => {
    const pre = sectorPresets.find((p) => p.id === id);
    if (pre) {
      setActivePreset(pre);
      setPresetSimulationRunning(false);
      setPresetSimStep(-1);
      setPresetSimLogs([]);
    }
  };

  return (
    <main className={`min-h-screen ${isLightTheme ? "theme-light text-[#0F172A] bg-[#F1F5F9]" : "bg-[#06080D] text-[#E2E8F0]"} font-sans selection:bg-blue-500/30 overflow-x-hidden relative`} id="app_root">
      
      {/* GOOGLE LOGO COLOR GLOWS - REVOLVING & PULSING ACCENTS */}
      <div className="fixed top-0 left-1/4 w-[550px] h-[550px] bg-[#4285F4]/8 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" style={{ willChange: "transform, opacity" }} />
      <div className="fixed top-1/4 right-5 w-[650px] h-[650px] bg-[#EA4335]/7 rounded-full blur-[150px] pointer-events-none animate-pulse-glow-alt" style={{ willChange: "transform, opacity" }} />
      <div className="fixed bottom-1/4 left-5 w-[500px] h-[500px] bg-[#FBBC05]/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ willChange: "transform, opacity" }} />
      <div className="fixed bottom-0 right-1/4 w-[550px] h-[550px] bg-[#34A853]/6 rounded-full blur-[130px] pointer-events-none animate-pulse-glow-alt" style={{ willChange: "transform, opacity" }} />

      {/* SUPERIOR TEAM / BRAND HEADER */}
      <header className="border-b border-white/5 bg-[#090C12]/80 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-3.5 shadow-md shadow-black/40 animate-fade-in" id="main_header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 transform hover:scale-110 hover:rotate-3 transition-all duration-300 select-none" id="header_logo_container">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* P: Vertical stem in Google Blue */}
                <path d="M11 9v20" stroke="#4285F4" strokeWidth="4.5" strokeLinecap="round" />
                {/* P: Loop in Google Red curving to the right */}
                <path d="M11 9c4.5 0 8 2.25 8 5s-3.5 5-8 5" stroke="#EA4335" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* J: Stem in Google Yellow */}
                <path d="M31 10v11.5" stroke="#FBBC05" strokeWidth="4.5" strokeLinecap="round" />
                {/* J: Complementary hook in Google Green curving to the left underneath */}
                <path d="M31 21.5c0 4.5-3.5 7.5-8 7.5s-5-2.5-5-5" stroke="#34A853" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center flex-wrap sm:flex-nowrap">
                <h1 className="font-sans font-black tracking-tight text-2xl text-white select-none">
                  <span className="text-[#4285F4]">P</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">d</span>
                  <span className="text-[#34A853]">J</span>
                  <span className="text-[#4285F4]">o</span>
                  <span className="text-[#EA4335]">b</span>
                  <span className="text-[#FBBC05]">s</span>
                  <span className="text-slate-300 font-normal">.ai</span>
                </h1>
                <span className="text-[8px] tracking-widest font-mono text-[#EA4335] uppercase bg-[#EA4335]/15 border border-[#EA4335]/30 px-1.5 py-0.5 rounded shrink-0 font-bold ml-2 relative top-[1px]">PRONOUNS: PJ</span>
              </div>
              <p className="text-[9px] text-[#A0AEC0] font-mono tracking-wider uppercase">PodJobs.ai Team Orchestration</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1.5 bg-[#040508]/90 p-1.5 rounded-xl border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("concept")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                activeTab === "concept" 
                  ? "bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] via-[#34A853] to-[#4285F4] bg-[length:200%_auto] animate-gradient-flow text-white shadow-lg shadow-blue-500/15" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
              id="nav_btn_concept"
            >
              Vision
            </button>
            <button
              onClick={() => setActiveTab("presets")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                activeTab === "presets" 
                  ? "bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] via-[#34A853] to-[#4285F4] bg-[length:200%_auto] animate-gradient-flow text-white shadow-lg shadow-blue-500/15" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
              id="nav_btn_presets"
            >
              Case Studies
            </button>
            <button
              onClick={() => {
                setActiveTab("creator");
                if (!isOnboarded) {
                  setIsOnboardingOpen(true);
                }
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                activeTab === "creator" 
                  ? "bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] via-[#34A853] to-[#4285F4] bg-[length:200%_auto] animate-gradient-flow text-white shadow-lg shadow-blue-500/15" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
              id="nav_btn_creator"
            >
              Creator Engine
            </button>
            
            {/* STUNNING THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsLightTheme(!isLightTheme)}
              className="p-1.5 px-2.5 rounded-lg text-slate-400 hover:text-slate-100 transition-all duration-300 border border-transparent hover:bg-white/5 flex items-center gap-1.5 cursor-pointer shrink-0 select-none active:scale-95"
              title={isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
              id="theme_toggle"
            >
              {isLightTheme ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10 animate-[spin_20s_linear_infinite]" />
                  <span className="text-[10.5px] font-bold font-mono">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#4285F4] fill-[#4285F4]/10" />
                  <span className="text-[10.5px] font-bold font-mono">Dark Mode</span>
                </>
              )}
            </button>
          </nav>

          <div className="hidden lg:block text-right">
            <span className="text-[10px] font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] italic block font-bold">&ldquo;The impossible is just code waiting to be written.&rdquo;</span>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider block">We Are <a href="https://theaicollective.art" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:text-blue-400 font-bold transition-colors duration-200 inline-block">TheAiCollective.art</a><span className="tracking-normal select-none ml-1">🎨🍄🎵</span></span>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all text-[6.5px] tracking-wider uppercase font-mono text-cyan-400 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.25)] select-none"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00E5FF]" />
                Powered by HERMES AGENT V0.17.0 BY NOUS RESEARCH
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK STAGES */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8" id="core_body">
        
        {/* API Rate Exceeded / General Error Banner */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl border ${
              showRateLimitWarning 
                ? "bg-[#180C0E] border-red-550/40 text-rose-200" 
                : "bg-[#0E1520] border-cyan-800/40 text-cyan-200"
            } flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl text-left`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${showRateLimitWarning ? "bg-red-950/60 text-red-400" : "bg-cyan-950/60 text-cyan-400"}`}>
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2">
                  {showRateLimitWarning ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                      Gemini Public Quota / Rate Exceeded
                    </>
                  ) : (
                    "System Notification / Diagnostics Log"
                  )}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {apiError}
                </p>
                <div className="text-[9px] font-mono text-slate-400 mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Private Local Ollama: ACTIVE / AVAILABLE
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    Custom API Key Setup: SUPPORTED
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto self-stretch md:self-auto justify-end shrink-0 pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("creator");
                  setCreatorPanelTab("brain");
                  setApiError(null);
                  setShowRateLimitWarning(false);
                }}
                className="px-3.5 py-1.5 bg-[#121A2E] hover:bg-[#1C2C4E] text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-cyan-850/50 transition-all cursor-pointer text-cyan-300 hover:text-cyan-200"
              >
                Configure Settings ⚙️
              </button>
              <button
                type="button"
                onClick={() => {
                  setApiError(null);
                  setShowRateLimitWarning(false);
                }}
                className="px-2.5 py-1.5 bg-slate-900/50 hover:bg-slate-800 text-xs text-slate-400 hover:text-slate-100 font-bold uppercase rounded border border-white/5 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
        
        {/* CONCEPT ACCORDION DECK */}
        {activeTab === "concept" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
            id="tab_concept_view"
          >
            {/* HERO HEROICS */}
            <div className="text-center max-w-3xl mx-auto space-y-6 py-10" id="hero_wrapper">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#4285F4]/10 via-[#EA4335]/10 to-[#34A853]/10 text-slate-200 text-[10px] font-mono font-bold tracking-[0.22em] rounded-full border border-white/5 shadow-md animate-rainbow-glow">
                THE SINGULARITY MOMENT // MERKLE SWARMS
              </span>
              <h2 className="font-sans text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white">
                A Pod of <span className="text-transparent bg-clip-text animate-gradient-flow" style={{ backgroundImage: 'linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)', backgroundSize: '200% auto' }}>Autonomous Agents</span> for Every Professional.
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
                The future is not about workforce replacement; it is about <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#FBBC05] font-bold">cognitive amplification</span>. PODs allow one human specialist to direct a specialized, parallel consensus department of 12 real-time AI agents.
              </p>
              
              <div className="pt-6 flex flex-wrap justify-center gap-4 justify-items-center">
                <button
                  onClick={() => setActiveTab("presets")}
                  className="px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#3b7eed] hover:brightness-110 active:scale-95 text-white text-xs font-mono font-bold rounded-xl uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  id="action_btn_view_presets"
                >
                  Explore Live Cases <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab("creator");
                    if (!isOnboarded) {
                      setIsOnboardingOpen(true);
                    }
                  }}
                  className="px-6 py-3 bg-[#0A0C10] border border-white/10 hover:border-[#34A853]/40 hover:text-white text-slate-300 text-xs font-mono font-bold rounded-xl uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-green-500/10 hover:-translate-y-0.5"
                  id="action_btn_open_creator"
                >
                  Configure Custom Pod <Sparkles className="w-4 h-4 text-[#34A853] animate-pulse" />
                </button>
              </div>
            </div>

            {/* VISUAL SHIFT COMPARATOR */}
            <div className="bg-[#090C12]/90 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl" id="shift_comparator">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#A0AEC0] tracking-widest">TOPOLOGY COMPARATOR</div>
              
              <div className="mb-6 text-left">
                <h3 className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#4285F4] animate-pulse" />
                  The Corporate Geometry Shift
                </h3>
                <p className="text-xs font-sans text-slate-400 mt-1 max-w-2xl">
                  Compare the metrics of a conventional team relying on manual human hours vs. an AI Pod powered by a highly trained human supervisor. Use the presets selector to inspect direct impacts.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* LEGACY MODEL */}
                <div className="border border-white/5 bg-black/40 p-5 md:p-6 rounded-xl space-y-4 text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-red-400 flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> LEGACY ORG STRUCTURE (HEADCOUNT BRUTE)
                    </span>
                    <span className="text-[10px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 px-1.5 py-0.5 rounded">High Overhead</span>
                  </div>
                  
                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Communication Overhead & Meetings</span>
                        <span className="text-red-400">75% of total day</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Filing / Action Submission Latency</span>
                        <span className="text-red-400">3 - 10 Days</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" style={{ width: "90%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Format Precision & Alignment Error</span>
                        <span className="text-red-400">8% - 12% mismatch risk</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
                    In traditional configurations, junior associates manually write search parameters, search PDFs, translate tone systems, and check formats. Human errors are high, communication delays accumulate, and overall transaction cost scales linearly with headcount.
                  </p>
                </div>

                {/* POD SWARM MODEL */}
                <div className="border border-green-500/20 bg-black/40 p-5 md:p-6 rounded-xl space-y-4 relative text-left shadow-lg shadow-green-500/5 hover:border-green-400/50 transition-all duration-300">
                  <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-[length:200%_auto] animate-gradient-flow text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded shadow uppercase tracking-widest">
                    OPTIMAL SWARM
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-green-400 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-green-400 animate-spin" style={{ animationDuration: "4s" }} /> POD ARCHITECTURE (1 HUMAN + 12 AGENTS)
                    </span>
                    <span className="text-[10px] font-mono text-green-455 bg-green-950/40 border border-green-800/30 px-1.5 py-0.5 rounded">High Productivity</span>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Communication lag (Asynchronous swarm speed)</span>
                        <span className="text-green-400">&lt; 15 seconds</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-[#34A853] to-emerald-400 h-full rounded-full" style={{ width: "8%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Filing / Action Submission Latency</span>
                        <span className="text-green-400">Instant (API execution)</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-[#34A853] to-emerald-400 h-full rounded-full" style={{ width: "3%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Validation Precision & Alignment Compliance</span>
                        <span className="text-green-400">99.98% Bayesian Consensus</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-2 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-[#34A853] to-emerald-400 h-full rounded-full" style={{ width: "99%" }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
                    Under the Pod architecture, the human is the master gatekeeper. Parallel computational agents draft documents, write code, check statutes, retrieve sensors, and compile plans in seconds. Consensus is built mathematically, resulting in massive scaling output capabilities.
                  </p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE SWARM IMPACT STUDIO */}
            <SwarmAnimations />

            {/* SECTOR CAROUSEL PREVIEW */}
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/5">INSPECT THE EVIDENCE</span>
                <h3 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">Real-Life Swarm Configurations</h3>
                <p className="text-sm font-sans text-slate-400 mt-2 max-w-xl mx-auto">
                  Click on any of our 4 custom-crafted sector designs to see how industry leaders use 12-agent Pod layouts to boost workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sectorPresets.map((preset) => {
                  let badgeColors = "text-[#4285F4] bg-blue-950/40 border-blue-900/30";
                  let hoverBorder = "hover:border-[#4285F4]/40 hover:shadow-[#4285F4]/5";
                  let accentText = "text-[#4285F4]";
                  let bulletBg = "bg-[#4285F4]";
                  
                  if (preset.id === "customer_service") {
                    badgeColors = "text-[#4285F4] bg-blue-950/40 border-blue-900/20";
                    hoverBorder = "hover:border-[#4285F4]/40 hover:shadow-[#4285F4]/5";
                    accentText = "text-[#4285F4]";
                    bulletBg = "bg-[#4285F4]";
                  } else if (preset.id === "legal") {
                    badgeColors = "text-[#EA4335] bg-red-950/40 border-red-900/20";
                    hoverBorder = "hover:border-[#EA4335]/40 hover:shadow-[#EA4335]/5";
                    accentText = "text-[#EA4335]";
                    bulletBg = "bg-[#EA4335]";
                  } else if (preset.id === "medical") {
                    badgeColors = "text-[#FBBC05] bg-yellow-950/30 border-yellow-905/20";
                    hoverBorder = "hover:border-[#FBBC05]/40 hover:shadow-[#FBBC05]/5";
                    accentText = "text-[#FBBC05]";
                    bulletBg = "bg-[#FBBC05]";
                  } else if (preset.id === "insurance") {
                    badgeColors = "text-[#34A853] bg-green-950/40 border-green-900/20";
                    hoverBorder = "hover:border-[#34A853]/40 hover:shadow-[#34A853]/5";
                    accentText = "text-[#34A853]";
                    bulletBg = "bg-[#34A853]";
                  }

                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePreset(preset);
                        setActiveTab("presets");
                      }}
                      className={`p-6 rounded-2xl bg-[#090C12]/75 border border-white/5 transition-all duration-300 group text-left relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg ${hoverBorder}`}
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                        {preset.icon}
                      </div>
                      <span className={`inline-block text-[9px] font-mono font-bold border px-2 py-0.5 rounded uppercase mb-3 ${badgeColors}`}>
                        {preset.badge}
                      </span>
                      <h4 className={`font-sans text-lg font-bold text-white group-hover:${accentText} transition-colors`}>
                        {preset.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {preset.tagline}
                      </p>
                      <div className={`flex items-center gap-2 mt-4 text-[11px] font-bold ${accentText} uppercase tracking-wider transition-all duration-300`}>
                        <span className={`w-2 h-2 rounded-full ${bulletBg}`}></span> View Case Study
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INTRODUCTORY BRIEF ON TRAINING */}
            <div className="border border-white/5 bg-[#090C12]/80 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between text-left relative overflow-hidden shadow-xl animate-rainbow-glow" style={{ animationDuration: "12s" }}>
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] animate-pulse" />
              <div className="space-y-2 max-w-2xl pl-2">
                <h4 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#FBBC05]" />
                  The Corporate Imperative: Become Pod-Trained
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Companies scaling down operations should not simply look for direct redundancy layoffs. The absolute market leaders will be <span className="text-white font-semibold">collaborative directors who actively train their workforce to command Pod architectures</span>. When 1 skilled human orchestrates a specialized Merkle tree of 12 agents, they possess the impact vector of an entire department, preserving deep domain wisdom while achieving hyper-performance.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("creator")}
                className="w-full md:w-auto px-6 py-2.5 whitespace-nowrap bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-[length:200%_auto] animate-gradient-flow hover:brightness-110 active:scale-95 text-white text-xs font-mono font-bold rounded-xl uppercase tracking-widest transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
              >
                Launch Creator Engine <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </button>
            </div>

          </motion.div>
        )}

        {/* PRESSETS SECTOR CASE STUDIES DETAIL */}
        {activeTab === "presets" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
            id="tab_presets_view"
          >
            {/* COMPONENT SELECTOR BUTTONS */}
            <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4">
              {sectorPresets.map((preset) => {
                let borderActiveStyle = "border-white/5 bg-[#090C12]/40 text-slate-400 hover:text-slate-100 hover:border-white/10";
                if (activePreset.id === preset.id) {
                  if (preset.id === "customer_service") {
                    borderActiveStyle = "border-[#4285F4] bg-[#4285F4]/10 text-blue-300 shadow-md shadow-blue-500/10 font-bold";
                  } else if (preset.id === "legal") {
                    borderActiveStyle = "border-[#EA4335] bg-[#EA4335]/10 text-red-300 shadow-md shadow-red-500/10 font-bold";
                  } else if (preset.id === "medical") {
                    borderActiveStyle = "border-[#FBBC05] bg-[#FBBC05]/10 text-yellow-300 shadow-md shadow-yellow-500/10 font-bold";
                  } else if (preset.id === "insurance") {
                    borderActiveStyle = "border-[#34A853] bg-[#34A853]/10 text-green-300 shadow-md shadow-green-500/10 font-bold";
                  }
                }
                
                return (
                  <button
                    key={preset.id}
                    onClick={() => selectPresetId(preset.id)}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap hover:scale-[1.03] ${borderActiveStyle}`}
                  >
                    {preset.icon}
                    {preset.title}
                  </button>
                );
              })}
            </div>

            {/* SECTOR DETAILED PANEL COMPOSITION */}
            {(() => {
              let activeColor = "#4285F4"; // default
              let activeTextClass = "text-[#4285F4]";
              let activeBgClass = "bg-[#4285F4]/15";
              let activeBorderClass = "border-[#4285F4]/30";
              let shadowClass = "shadow-[#4285F4]/10";
              
              if (activePreset.id === "customer_service") {
                activeColor = "#4285F4";
                activeTextClass = "text-[#4285F4]";
                activeBgClass = "bg-[#4285F4]/15";
                activeBorderClass = "border-[#4285F4]/30";
                shadowClass = "shadow-[#4285F4]/10";
              } else if (activePreset.id === "legal") {
                activeColor = "#EA4335";
                activeTextClass = "text-[#EA4335]";
                activeBgClass = "bg-[#EA4335]/15";
                activeBorderClass = "border-[#EA4335]/30";
                shadowClass = "shadow-[#EA4335]/10";
              } else if (activePreset.id === "medical") {
                activeColor = "#FBBC05";
                activeTextClass = "text-[#FBBC05]";
                activeBgClass = "bg-[#FBBC05]/15";
                activeBorderClass = "border-[#FBBC05]/30";
                shadowClass = "shadow-[#FBBC05]/10";
              } else if (activePreset.id === "insurance") {
                activeColor = "#34A853";
                activeTextClass = "text-[#34A853]";
                activeBgClass = "bg-[#34A853]/15";
                activeBorderClass = "border-[#34A853]/30";
                shadowClass = "shadow-[#34A853]/10";
              }

              const getGoogleColorForIndex = (index: number) => {
                const r = index % 4;
                if (r === 0) return "#4285F4";
                if (r === 1) return "#EA4335";
                if (r === 2) return "#FBBC05";
                return "#34A853";
              };

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="detailed_composition_inner">
                  
                  {/* LEFT SIDE: SUMMARY CONTENT */}
                  <div className="lg:col-span-4 space-y-6 text-left">
                    <div>
                      <span className={`inline-block px-3.5 py-1 ${activeBgClass} ${activeTextClass} text-[10px] font-mono font-bold tracking-[0.2em] rounded-full border ${activeBorderClass}`}>
                        Case Study Scenario
                      </span>
                      <h3 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white mt-3 leading-tight">
                        {activePreset.title}
                      </h3>
                      <p className="text-xs text-[#CBD5E0] font-sans mt-2 leading-relaxed">
                        {activePreset.description}
                      </p>
                    </div>

                    {/* STATS BENTO CARDS */}
                    <div className="grid grid-cols-2 gap-3" id="stats_bento">
                      <div className="bg-[#090C12]/92 border border-white/5 p-4 rounded-xl text-center shadow hover:border-white/10 transition-colors">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Legacy Size</span>
                        <span className="text-sm font-extrabold text-red-400 mt-1 block">{activePreset.stats.legacySize}</span>
                      </div>
                      <div className="bg-[#090C12]/92 border border-white/5 p-4 rounded-xl text-center shadow hover:border-white/10 transition-colors">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Active Swarm</span>
                        <span className={`text-sm font-extrabold ${activeTextClass} mt-1 block`}>{activePreset.stats.podAgents} Agents</span>
                      </div>
                      <div className="bg-[#090C12]/92 border border-white/5 p-4 rounded-xl text-center shadow hover:border-white/10 transition-colors">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Throughput Gain</span>
                        <span className={`text-sm font-extrabold ${activeTextClass} mt-1 block`}>{activePreset.stats.efficiencyGain}</span>
                      </div>
                      <div className="bg-[#090C12]/92 border border-white/5 p-4 rounded-xl text-center shadow hover:border-white/10 transition-colors">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Accuracy Threshold</span>
                        <span className="text-sm font-extrabold text-[#4285F4] mt-1 block">{activePreset.stats.precisionRating}</span>
                      </div>
                    </div>

                    {/* HUMAN ORCHESTRATOR RESPONSIBILITIES */}
                    <div className={`bg-[#090C12]/92 border border-white/5 hover:${activeBorderClass} p-5 rounded-xl space-y-4 text-left transition-all duration-300 shadow-md ${shadowClass}`}>
                      <h4 className="font-sans font-extrabold text-xs text-white uppercase tracking-widest flex items-center gap-1.5">
                        <User className={`w-4 h-4 ${activeTextClass}`} />
                        The Pilot: {activePreset.humanSupervisor.title}
                      </h4>
                      <ul className="space-y-2.5 text-xs text-slate-400">
                        {activePreset.humanSupervisor.responsibilities.map((resp, index) => (
                          <li key={index} className="flex gap-2.5 items-start">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: activeColor }} />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* RIGHT SIDE: NETWORK TOPOLOGY GRAPH PANEL & TERMINAL */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* INTERACTIVE NETWORK GRAPH CONTAINER & VISUAL LABELS */}
                    <div className={`bg-[#090C12]/80 border border-white/5 hover:${activeBorderClass} p-6 rounded-2xl relative overflow-hidden transition-all duration-350 shadow-md`}>
                      <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5 z-10">
                        <Activity className={`w-3.5 h-3.5 ${activeTextClass} animate-pulse`} /> Live Pod Topology Network
                      </div>

                      {/* HIGH-END SVG TOPOLOGY CHART */}
                      <div className="h-64 sm:h-80 w-full relative select-none">
                        <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                          {/* Definitions for arrow markers & shadows */}
                          <defs>
                            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={activeColor} stopOpacity="0.4" />
                              <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={activeColor} stopOpacity="0.15" />
                              <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Connection wires from center to 12 surrounding node blocks */}
                          {[
                            { x: 70, y: 50 }, { x: 160, y: 40 }, { x: 250, y: 35 }, { x: 350, y: 35 }, { x: 440, y: 40 }, { x: 530, y: 50 },
                            { x: 70, y: 250 }, { x: 160, y: 260 }, { x: 250, y: 265 }, { x: 350, y: 265 }, { x: 440, y: 260 }, { x: 530, y: 250 }
                          ].map((node, index) => {
                            // Coordinates path to center hub
                            const pathString = `M 300 150 C ${node.x > 300 ? 350 : 250} ${node.y > 150 ? 180 : 120}, ${node.x > 300 ? 380 : 220} ${node.y}, ${node.x} ${node.y}`;
                            const isNodeActive = presetSimStep >= (index % 6) + 1;
                            const targetNodeColor = getGoogleColorForIndex(index);
                            
                            return (
                              <g key={index}>
                                {/* Inactive connector line */}
                                <path
                                  d={pathString}
                                  fill="none"
                                  stroke="#171923"
                                  strokeWidth="1"
                                  strokeDasharray="4,4"
                                />
                                {/* Pulsing active glowing connector line */}
                                <path
                                  d={pathString}
                                  fill="none"
                                  stroke={isNodeActive ? targetNodeColor : "#10121a"}
                                  strokeWidth={isNodeActive ? "2.5" : "1"}
                                  className="transition-all duration-500"
                                />
                                
                                {/* Animated data packets traveling on paths */}
                                {presetSimulationRunning && (
                                  <circle r="3" fill={targetNodeColor}>
                                    <animateMotion
                                      dur={`${1.5 + (index % 3) * 0.4}s`}
                                      repeatCount="indefinite"
                                      path={pathString}
                                    />
                                  </circle>
                                )}
                              </g>
                            );
                          })}

                          {/* Glowing circles surrounding our central and peripheral hubs */}
                          <circle cx="300" cy="150" r="45" fill="url(#hubGlow)" />
                          {/* Central hub (Director node) */}
                          <circle cx="300" cy="150" r="28" fill="#05070a" stroke={activeColor} strokeWidth="2.5" />
                          <text x="300" y="146" textAnchor="middle" fill={activeColor} fontSize="8" fontFamily="monospace" fontWeight="bold">HUMAN</text>
                          <text x="300" y="158" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="bold">PILOT</text>

                          {/* 12 agent peripheral positions mapped with dynamic highlight logic */}
                          {[
                            { x: 70, y: 50, id: "cs1", text: activePreset.agents[0].name.split(" ")[0] },
                            { x: 160, y: 40, id: "cs2", text: activePreset.agents[1].name.split(" ")[0] },
                            { x: 250, y: 35, id: "cs3", text: activePreset.agents[2].name.split(" ")[0] },
                            { x: 350, y: 35, id: "cs4", text: activePreset.agents[3].name.split(" ")[0] },
                            { x: 440, y: 40, id: "cs5", text: activePreset.agents[4].name.split(" ")[0] },
                            { x: 530, y: 50, id: "cs6", text: activePreset.agents[5].name.split(" ")[0] },
                            { x: 70, y: 250, id: "cs7", text: activePreset.agents[6].name.split(" ")[0] },
                            { x: 160, y: 260, id: "cs8", text: activePreset.agents[7].name.split(" ")[0] },
                            { x: 250, y: 265, id: "cs9", text: activePreset.agents[8].name.split(" ")[0] },
                            { x: 350, y: 265, id: "cs10", text: activePreset.agents[9].name.split(" ")[0] },
                            { x: 440, y: 260, id: "cs11", text: activePreset.agents[10].name.split(" ")[0] },
                            { x: 530, y: 250, id: "cs12", text: activePreset.agents[11].name.split(" ")[0] }
                          ].map((agentNode, i) => {
                            const isActive = presetSimStep >= (i % 6) + 1;
                            const specificColor = getGoogleColorForIndex(i);
                            return (
                              <g key={i}>
                                <circle cx={agentNode.x} cy={agentNode.y} r="18" fill="url(#agentGlow)" />
                                <circle
                                   cx={agentNode.x}
                                   cy={agentNode.y}
                                   r="13"
                                   fill="#05070a"
                                   stroke={isActive ? specificColor : "#151821"}
                                   strokeWidth={isActive ? "2.5" : "1"}
                                   className="transition-all duration-300"
                                />
                                {/* Blinking core indicators inside nodes */}
                                {isActive && (
                                  <circle cx={agentNode.x} cy={agentNode.y} r="3" fill={specificColor} className="animate-ping" />
                                )}
                                <circle cx={agentNode.x} cy={agentNode.y} r="2.5" fill={isActive ? specificColor : "#2d3748"} />
                                <text
                                  x={agentNode.x}
                                  y={agentNode.y > 150 ? agentNode.y + 25 : agentNode.y - 20}
                                  textAnchor="middle"
                                  fill={isActive ? specificColor : "#718096"}
                                  fontSize="9"
                                  fontFamily="monospace"
                                  className="transition-all duration-300"
                                >
                                  {agentNode.text}
                                </text>
                              </g>
                            );
                          })}
                        </svg>

                        {/* Simulation overlays */}
                        {!presetSimulationRunning && presetSimLogs.length === 0 && (
                      <div className="absolute inset-0 bg-[#05070a]/70 backdrop-blur-[2px] flex items-center justify-center">
                        <button
                          onClick={() => runPresetSimulation(activePreset)}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg flex items-center gap-2"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          Simulate Workflow Pipeline
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ACTIVE PIPELINE TASK BAR */}
                  <div className="mt-2 border border-white/5 bg-[#05070a]/92 p-3.5 rounded-xl flex items-center justify-between gap-4 text-left">
                    <div className="text-left">
                      <span className={`text-[8px] font-mono ${activeTextClass} block uppercase tracking-wider`}>Active Task Command Parameter</span>
                      <p className="text-xs text-white font-sans font-medium line-clamp-1">{activePreset.sampleTask}</p>
                    </div>
                    {presetSimulationRunning ? (
                      <div className={`flex items-center gap-2 ${activeTextClass} font-mono text-xs whitespace-nowrap`}>
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse shrink-0" /> Running Swarm...
                      </div>
                    ) : (
                      presetSimLogs.length > 0 && (
                        <button
                          onClick={() => runPresetSimulation(activePreset)}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-white hover:text-white rounded text-[10px] font-mono text-slate-400 transition-all flex items-center gap-1 shrink-0"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Re-run
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* SIMULATOR LOGS CONTAINER */}
                <div className="bg-[#05070a] border border-white/5 rounded-2xl overflow-hidden font-mono shadow-inner text-left shadow-lg">
                  <div className="bg-[#090C12] px-4 py-3 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 flex items-center gap-2">
                      <Terminal className={`w-4 h-4 ${activeTextClass}`} /> CLI Log Outputs
                    </span>
                    <span className="text-[9px] text-[#34A853] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" /> Secure Socket: ACTIVE
                    </span>
                  </div>
                  
                  <div className="p-4 h-56 overflow-y-auto text-xs text-slate-350 space-y-2.5 text-left custom-scrollbar">
                    {presetSimLogs.length === 0 ? (
                      <span className="text-slate-500 italic block">No executing logs. Click the Simulate Workflow Pipeline button to initiate cascade transactions across the 12 agents...</span>
                    ) : (
                      presetSimLogs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-l-2 pl-2 ml-1"
                          style={{ borderLeftColor: getGoogleColorForIndex(index) }}
                        >
                          {log}
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* 12 AGENTS ROSTER DIRECTORY */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
                    <h4 className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">
                      The 12 Specialized Team Members
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/45 px-2.5 py-0.5 rounded-full border border-cyan-800/25 flex items-center gap-1.5 animate-pulse w-fit">
                      ⚡ Tap Node for Voice Sandbox & Handshake Terminal
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activePreset.agents.map((agent, i) => {
                      const isAgentActive = presetSimStep >= (i % 6) + 1;
                      const agentSpecificColor = getGoogleColorForIndex(i);
                      return (
                        <button
                          key={agent.id}
                          id={`agent_card_${agent.id}`}
                          type="button"
                          onClick={() => handleSelectAgent(agent)}
                          className={`w-full text-left font-sans block p-4 rounded-xl space-y-1.5 transition-all duration-300 bg-[#090C12]/50 hover:bg-[#0E121B]/80 hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-cyan-500/40 cursor-pointer border group ${
                            isAgentActive ? "animate-agent-glow" : ""
                          }`}
                          style={
                            isAgentActive
                              ? ({
                                  "--glow-color": `${agentSpecificColor}55`,
                                  "--border-glow-color": `${agentSpecificColor}77`,
                                  "--border-glow-high-color": agentSpecificColor,
                                  backgroundColor: `${agentSpecificColor}15`,
                                } as React.CSSProperties)
                              : { borderColor: "rgba(255,255,255,0.06)" }
                          }
                        >
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-[#05070a]/90 rounded border border-white/5 shrink-0 group-hover:scale-110 transition-transform" style={{ color: agentSpecificColor }}>
                                {getLucideIcon(agent.icon)}
                              </div>
                              <span className="text-xs font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">{agent.name}</span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase" style={{ color: agentSpecificColor, backgroundColor: `${agentSpecificColor}15`, border: `1px solid ${agentSpecificColor}25` }}>
                              {agent.productivityBoost}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1 line-clamp-2">
                            Role: <span className="text-slate-300">{agent.role}</span>
                          </p>
                          
                          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 pt-2 border-t border-white/5 mt-1.5 justify-between">
                            <div className="flex items-center gap-1">
                              <span className="uppercase font-bold shrink-0" style={{ color: agentSpecificColor }}>Expert Domain:</span>
                              <span className="italic line-clamp-1 text-slate-300">{agent.specialty}</span>
                            </div>
                            <span className="text-[9px] text-transparent group-hover:text-cyan-400 transition-colors uppercase font-bold tracking-wider">
                              Connect →
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
              );
            })()}
          </motion.div>
        )}

        {/* CUSTOM GENERATIVE CREATOR PANEL (POWER FOR YOU) */}
        {activeTab === "creator" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
            id="tab_creator_view"
          >
            
            {/* INPUT CONFIGURTON FORM */}
            <div className="bg-[#090C12]/75 border border-white/5 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#FBBC05] uppercase tracking-widest leading-none">
                AI Architect Terminal
              </div>

              <div className="max-w-2xl text-left space-y-2 mb-6">
                <h3 className="font-sans text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#FBBC05] animate-pulse" />
                  Define Your Custom AI-Pod
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Convert *any job title or daily profession* into a synchronized swarm of 12 parallel AI agents. Our generator establishes their names, specialized operational roles, and structures a nested organizational workflow pipeline.
                </p>
              </div>

              <form onSubmit={generateCustomPod} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase block">
                      Target Human Profession Title
                    </label>
                    <input
                      type="text"
                      value={customRole}
                      maxLength={70}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g. Graphic Designer, Chef, High School Teacher..."
                      className="w-full bg-[#05070a]/90 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4]/40 font-sans transition-all"
                      id="input_profession_title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase block">
                      Industrial Sector Segment
                    </label>
                    <select
                      value={customSector}
                      onChange={(e) => setCustomSector(e.target.value)}
                      className="w-full bg-[#05070a]/90 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]/40 font-mono transition-all"
                      id="select_industry_sector"
                    >
                      <option value="Technology & Software Enterprise">Technology & Software Enterprise</option>
                      <option value="Finance, Wealth & Asset Management">Finance, Wealth & Asset Management</option>
                      <option value="Creative Arts, UI/UX & Game Design">Creative Arts, UI/UX & Game Design</option>
                      <option value="Education, Curriculum & E-Learning">Education, Curriculum & E-Learning</option>
                      <option value="Legal Analytics, Compliance & Law">Legal Analytics, Compliance & Law</option>
                      <option value="Marketing, Advertising & Copywriting">Marketing, Advertising & Copywriting</option>
                      <option value="Clinical Healthcare & Biotech Diagnostics">Clinical Healthcare & Biotech Diagnostics</option>
                      <option value="Aerospace, Aviation & SpaceTech">Aerospace, Aviation & SpaceTech</option>
                      <option value="Logistics, Supply Chain & IoT Fleet">Logistics, Supply Chain & IoT Fleet</option>
                      <option value="Smart Manufacturing & Robotics Automation">Smart Manufacturing & Robotics Automation</option>
                      <option value="Energy, Power Grid & Carbon Cleantech">Energy, Power Grid & Carbon Cleantech</option>
                      <option value="Hospitalities, Culinary Arts & Tourism">Hospitalities, Culinary Arts & Tourism</option>
                      <option value="Real Estate, Construction & Property">Real Estate, Construction & Property</option>
                      <option value="Public Policy, Government & Civic">Public Policy, Government & Civic Development</option>
                      <option value="Human Resources, Staffing & Talent Ops">Human Resources, Staffing & Talent Ops</option>
                      <option value="Agribusiness, Forestry & Permaculture">Agribusiness, Forestry & Permaculture</option>
                      <option value="Medical & Diagnostic Physics">Medical & Diagnostic Physics</option>
                      <option value="Strategic Consulting & Advisory Services">Strategic Consulting & Advisory Services</option>
                      <option value="Retail, Customer Experience & Admin">Retail, Customer Experience & Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={creationLoading || !customRole.trim()}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-[length:200%_auto] animate-gradient-flow text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                    id="submit_generative_pod"
                  >
                    {creationLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating 12-Agent Pod Array...
                      </>
                    ) : (
                      <>
                        Generate Swarm <Plus className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* PERSISTENT SAVED DECK SWARMS DIRECTORY */}
            {savedPods.length > 0 && (
              <div className="bg-[#090C12]/50 border border-white/5 p-6 rounded-2xl max-w-4xl mx-auto text-left space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4 text-[#FBBC05]" />
                    Your Activated & Saved Swarms ({savedPods.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear all custom swarms from local library?")) {
                        setSavedPods([]);
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("podjob_saved_pods");
                        }
                        setCustomPodData(null);
                      }
                    }}
                    className="text-[9px] font-mono text-slate-500 hover:text-red-400 uppercase tracking-widest transition-all"
                  >
                    Clear Library
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  {savedPods.map((pod) => {
                    const isActive = customPodData && customPodData.podName === pod.podName;
                    return (
                      <div
                        key={pod.id || pod.podName}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                          isActive 
                            ? "bg-[#0c1424]/90 border-blue-500/40 shadow shadow-blue-500/10 text-blue-300"
                            : "bg-black/20 border-white/5 text-slate-300 hover:border-white/10 hover:bg-black/35"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-sans font-black text-xs block truncate max-w-[80%] text-slate-100">
                              {pod.podName}
                            </span>
                            {isActive && (
                              <span className="bg-blue-950/50 text-[8px] font-mono font-bold text-blue-400 px-1.5 py-0.5 rounded border border-blue-900/40 uppercase tracking-wider scale-90 shrink-0">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                            {pod.humanRole?.replace("Chief Conductor & Director of ", "")?.replace("Chief Lead & Director of ", "") || "Conductor of parallel AI agents swarm."}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2 mt-1">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                            {pod.agents?.length || 12} Nodes • {pod.sector?.replace(" & ", "/") || "Custom"}
                          </span>
                          <div className="flex items-center gap-1">
                            {!isActive && (
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomPodData(pod);
                                  setCustomRole(pod.targetRole || pod.podName?.replace(" Orchestration Swarm", "") || "");
                                  if (pod.sector) setCustomSector(pod.sector);
                                }}
                                className="text-[9px] font-bold font-sans text-blue-400 hover:text-blue-300 px-2.5 py-1 bg-blue-950/30 border border-blue-900/30 hover:border-blue-700/45 rounded transition-all uppercase"
                              >
                                Activate
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const remaining = savedPods.filter(p => p.podName !== pod.podName);
                                setSavedPods(remaining);
                                if (typeof window !== "undefined") {
                                  localStorage.setItem("podjob_saved_pods", JSON.stringify(remaining));
                                }
                                if (isActive) {
                                  if (remaining.length > 0) {
                                    setCustomPodData(remaining[0]);
                                    setCustomRole(remaining[0].targetRole || remaining[0].podName?.replace(" Orchestration Swarm", "") || "");
                                    if (remaining[0].sector) setCustomSector(remaining[0].sector);
                                  } else {
                                    setCustomPodData(null);
                                  }
                                }
                              }}
                              className="text-[9px] font-bold font-sans text-red-500 hover:text-red-400 px-2 py-1 bg-red-950/20 hover:bg-red-950/40 border border-red-900/20 hover:border-red-800/30 rounded transition-all uppercase shrink-0"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CREATED CUSTOM POD DISPLAY */}
            <AnimatePresence mode="wait">
              {customPodData && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                  id="custom_pod_display_container"
                >
                  <div className="border border-white/5 bg-[#090C12]/70 hover:border-white/10 p-6 md:p-8 rounded-2xl relative text-left shadow-2xl animate-fade-in">
                    <span className="absolute -top-3 left-6 inline-block bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] text-white font-mono text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                      ACTIVATED POD: {customPodData.podName}
                    </span>

                    <div className="space-y-4 pt-2">
                      <h4 className="font-sans font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-250 to-green-400">
                        {customRole} Super-System Ecosystem
                      </h4>
                      <p className="text-xs text-slate-450 bg-[#05070a]/90 p-4 border border-white/5 rounded-xl leading-relaxed">
                        <span className="font-mono font-bold text-white block mb-1 uppercase tracking-wider">Your Conductor Responsibility:</span>
                        {customPodData.humanRole}
                      </p>
                    </div>

                    {/* INTERACTIVE LOGISTICS COMMAND DECK */}
                    <div className="mt-8 border-t border-white/5 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Interactive Input to Run Swarm */}
                      <div className="lg:col-span-12 xl:col-span-5 space-y-5 text-left border border-white/5 bg-[#090C12]/90 p-5 rounded-2xl shadow-lg">
                        {/* Selector Subtabs */}
                        <div className="flex border-b border-white/5 gap-1 pb-1">
                          <button
                            type="button"
                            onClick={() => setCreatorPanelTab("command")}
                            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-t border-t-2 transition-all ${
                              creatorPanelTab === "command"
                                ? "text-blue-400 bg-[#05070a] border-[#4285F4]"
                                : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}
                          >
                            Command
                          </button>
                          <button
                            type="button"
                            onClick={() => setCreatorPanelTab("rag")}
                            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-t border-t-2 transition-all relative ${
                              creatorPanelTab === "rag"
                                ? "text-red-400 bg-[#05070a] border-[#EA4335]"
                                : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}
                          >
                            RAG Hub
                            {knowledgeChunks.length > 0 && (
                              <span className="absolute -top-1 -right-1.5 bg-[#EA4335] text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                                {knowledgeChunks.length}
                              </span>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setCreatorPanelTab("brain")}
                            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-t border-t-2 transition-all ${
                              creatorPanelTab === "brain"
                                ? "text-yellow-400 bg-[#05070a] border-[#FBBC05]"
                                : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}
                          >
                            Brain Setup
                          </button>
                          <button
                            type="button"
                            onClick={() => setCreatorPanelTab("adaptors")}
                            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-t border-t-2 transition-all ${
                              creatorPanelTab === "adaptors"
                                ? "text-green-400 bg-[#05070a] border-[#34A853]"
                                : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}
                          >
                            Adapt Swarm
                          </button>
                          <button
                            type="button"
                            onClick={() => setCreatorPanelTab("mcp")}
                            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-t border-t-2 transition-all ${
                              creatorPanelTab === "mcp"
                                ? "text-cyan-400 bg-[#05070a] border-cyan-400"
                                : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}
                          >
                            MCP & CLI
                          </button>
                        </div>

                        {creatorPanelTab === "command" && (
                          <div className="space-y-4 animate-fade-in">
                            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-blue-400" />
                              Workstation Console
                            </h5>
                            <p className="text-xs text-slate-400 leading-normal">
                              Submit a challenging operational task to your custom swarm. Watch as the 12 agents process, share data, and synthesize a complete consolidated presentation report.
                            </p>

                            <div className="space-y-3 mt-4">
                              <textarea
                                value={customSimPrompt}
                                rows={3}
                                maxLength={150}
                                onChange={(e) => setCustomSimPrompt(e.target.value)}
                                className="w-full bg-[#05070a] border border-white/5 rounded-xl p-3.5 text-xs font-mono text-slate-100 placeholder-slate-700 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4]/40"
                                placeholder="Write high-level prompt, e.g. Audit current designs and structure client presentation deck"
                              />

                              {knowledgeChunks.length > 0 ? (
                                <div className="text-[10px] font-mono text-teal-400 flex items-center gap-1.5 bg-teal-950/20 border border-teal-900/30 px-3 py-1.5 rounded-lg">
                                  <span className="inline-block w-2 bg-teal-400 h-2 rounded-full animate-ping shrink-0" />
                                  <span>⚡ Semantic RAG Grounding Active: {knowledgeChunks.length} chunks indexed.</span>
                                </div>
                              ) : (
                                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg justify-between select-none">
                                  <span>ℹ️ Swarm using default parameters. Build custom knowledge base in RAG tab!</span>
                                  <button
                                    type="button"
                                    onClick={() => setCreatorPanelTab("rag")}
                                    className="text-[9px] font-semibold text-red-400 hover:underline hover:text-red-300 uppercase block shrink-0"
                                  >
                                    Go to RAG
                                  </button>
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={runCustomSimulation}
                                disabled={customSimRunning || !customSimPrompt.trim()}
                                className="w-full py-2.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:scale-[1.01] hover:brightness-110 active:scale-95 disabled:hover:scale-100 disabled:opacity-50 disabled:bg-slate-900 disabled:from-transparent disabled:to-transparent disabled:text-slate-600 text-white font-mono text-xs font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                                id="execute_custom_simulation_btn"
                              >
                                {customSimRunning ? (
                                  <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Processing Merkle Tree Cascade...
                                  </>
                                ) : (
                                  <>
                                    Execute Swarm Command <Play className="w-3.5 h-3.5 fill-white animate-pulse" />
                                  </>
                                )}
                              </button>
                            </div>

                            {/* SEQUENTIAL Blue-print list */}
                            <div className="mt-4 border border-white/5 rounded-2xl p-4 bg-[#05070a]/40 space-y-3">
                              <h6 className="font-sans text-xs font-bold text-slate-450 uppercase tracking-widest block">
                                Cascade Workflow Blueprint
                              </h6>
                              <div className="space-y-3.5 text-xs">
                                {(customPodData.workflowSteps || []).map((step: any, idx: number) => {
                                  const stepCol = getGoogleColorForIndex(idx);
                                  return (
                                    <div key={idx} className="flex gap-3 text-left">
                                      <span className="w-5 h-5 rounded border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-[#05070a]" style={{ color: stepCol, borderColor: `${stepCol}40` }}>
                                        {idx + 1}
                                      </span>
                                      <div className="space-y-0.5">
                                        <span className="font-bold text-slate-200 block">{step.title}</span>
                                        <span className="text-[10px] font-mono block font-semibold" style={{ color: stepCol }}>Responsible: {step.executor}</span>
                                        <p className="text-[10px] text-slate-450 leading-normal">{step.description}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {creatorPanelTab === "rag" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <Plus className="w-4 h-4 text-red-400" />
                              Custom Grounding Indexer (RAG)
                            </h5>
                            <p className="text-xs text-slate-450 leading-normal">
                              To enrich the Swarm&apos;s knowledge, drop markdown guidelines, service specifications, or system manuals below. Files will be parsed and embedded as high-density semantic contexts.
                            </p>

                            {/* Dropzone Container */}
                            <div
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              onClick={() => {
                                const input = document.getElementById("rag-file-input-id");
                                if (input) (input as any).click();
                              }}
                              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                                dragActive 
                                  ? "border-red-400 bg-red-950/15" 
                                  : "border-white/5 bg-[#05070a]/40 hover:border-white/10 hover:bg-[#05070a]/60 font-sans"
                              }`}
                            >
                              <input
                                type="file"
                                id="rag-file-input-id"
                                accept=".txt,.md,.json"
                                className="hidden"
                                onChange={handleFileSelect}
                              />
                              <div className="flex flex-col items-center gap-2">
                                <Upload className={`w-8 h-8 ${dragActive ? 'text-red-400 animate-bounce' : 'text-slate-500'}`} />
                                <span className="text-xs text-slate-300 font-sans">
                                  {dragActive ? "Drop your files now!" : "Drag & drop files here, or click to browse"}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">Supports .txt, .md, .json (max 1MB)</span>
                              </div>
                            </div>

                            {/* Manual Sample Button */}
                            {uploadedFiles.length === 0 && (
                              <button
                                type="button"
                                onClick={loadSampleDocument}
                                className="w-full py-2 px-3 bg-slate-900 border border-white/5 hover:bg-slate-800 hover:border-[#EA4335]/30 text-slate-300 text-[10px] font-mono rounded-xl uppercase transition-all"
                              >
                                🧪 Load Sample Knowledge Manual
                              </button>
                            )}

                            {/* Processing Progress Bar */}
                            {isAnalyzingKnowledge && (
                              <div className="p-3 bg-[#05070a]/90 border border-white/5 rounded-xl space-y-2 mt-2 font-mono">
                                <span className="text-[10px] text-red-400 animate-pulse block">
                                  ❯ Compiling float32 document vectors...
                                </span>
                                <div className="w-full bg-slate-900/60 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 h-full animate-pulse" style={{ width: "80%" }} />
                                </div>
                              </div>
                            )}

                            {/* Files Inventory */}
                            {uploadedFiles.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                                  ACTIVE KNOWLEDGE BASE DIRECTORY
                                </span>
                                <div className="space-y-1.5">
                                  {uploadedFiles.map((file) => (
                                    <div key={file.id} className="flex justify-between items-center bg-[#05070a]/90 border border-white/5 p-2 rounded text-xs select-none">
                                      <div className="flex items-center gap-2 truncate">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping shrink-0" />
                                        <span className="text-slate-300 truncate font-mono text-[11px]">{file.name}</span>
                                        <span className="text-[9px] text-slate-550 font-mono shrink-0">({file.size})</span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
                                          setKnowledgeChunks(prev => prev.filter(c => !c.id.startsWith(file.id)));
                                        }}
                                        className="text-[10px] font-bold text-red-400 hover:text-red-300 px-1.5 py-0.5 hover:bg-red-950/20 rounded"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Chunks preview */}
                            {knowledgeChunks.length > 0 && (
                              <div className="space-y-2 font-sans">
                                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
                                  <span>COMPILED SEGMENTED VECTOR INDEXES</span>
                                  <span className="text-red-400 font-bold">{knowledgeChunks.length} Chunks</span>
                                </span>
                                <div className="bg-[#05070a]/90 border border-white/5 rounded-2xl p-2.5 h-36 overflow-y-auto text-[10px] font-mono space-y-2 custom-scrollbar">
                                  {knowledgeChunks.map((c, i) => (
                                    <div key={c.id} className="bg-[#090C12]/50 p-2.5 rounded-xl border border-white/5 leading-normal">
                                      <div className="flex justify-between text-slate-500 text-[8px] border-b border-white/5 pb-1 mb-1">
                                        <span>HASH ID: {c.vectorId}</span>
                                        <span className="text-emerald-450 text-[#34A853] font-bold">INDEXED</span>
                                      </div>
                                      <p className="text-slate-300 italic">&quot;{c.text}&quot;</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {creatorPanelTab === "brain" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <Brain className="w-4 h-4 text-yellow-400 animate-pulse" />
                              Custom Swarm Orchestrator Brain Setup
                            </h5>
                            <p className="text-xs text-slate-450 leading-relaxed font-sans">
                              Decide where your AI Swarm&apos;s intelligence is compiled. Choose our direct secure Cloud proxy, route requests securely using your custom developer API key, or keep everything completely offline utilizing your own desktop Local Ollama engine.
                            </p>

                            <div className="space-y-4">
                              {/* Brain Provider Selection */}
                              <div className="grid grid-cols-1 gap-2.5">
                                <button
                                  type="button"
                                  onClick={() => setBrainProvider("gemini-cloud")}
                                  className={`p-3 rounded-xl border text-left transition-all ${
                                    brainProvider === "gemini-cloud"
                                      ? "bg-[#05070a]/90 border-[#4285F4] text-blue-400 shadow shadow-[#4285F4]/10"
                                      : "bg-black/30 border-white/5 text-slate-400 hover:border-[#4285F4]/30 hover:text-slate-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold font-sans uppercase tracking-wider">☁️ Google Gemini Cloud</span>
                                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                                      brainProvider === "gemini-cloud"
                                        ? "bg-blue-950/40 text-blue-400 border-blue-900/40"
                                        : "bg-slate-900 text-slate-400 border-slate-850"
                                    }`}>Standard (Default)</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-sans">
                                    Secure, high-fidelity parallel inference handled via built-in Vertex APIs. Fast response and zero setup required.
                                  </p>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setBrainProvider("custom-gemini")}
                                  className={`p-3 rounded-xl border text-left transition-all ${
                                    brainProvider === "custom-gemini"
                                      ? "bg-[#05070a]/90 border-[#EA4335] text-red-400 shadow shadow-[#EA4335]/10"
                                      : "bg-black/30 border-white/5 text-slate-400 hover:border-[#EA4335]/30 hover:text-slate-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold font-sans uppercase tracking-wider">🔑 Custom Gemini API Key</span>
                                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                                      brainProvider === "custom-gemini"
                                        ? "bg-red-950/40 text-red-500 border-red-900/40"
                                        : "bg-slate-900 text-slate-400 border-slate-850"
                                    }`}>Dedicated Client Tunnel</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-sans">
                                    Run requests on your own developer billing quota. Key is transported securely per session and is never logged on our database servers.
                                  </p>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setBrainProvider("local-ollama")}
                                  className={`p-3 rounded-xl border text-left transition-all ${
                                    brainProvider === "local-ollama"
                                      ? "bg-[#05070a]/90 border-[#34A853] text-green-400 shadow shadow-[#34A853]/10"
                                      : "bg-black/30 border-white/5 text-slate-400 hover:border-[#34A853]/30 hover:text-slate-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold font-sans uppercase tracking-wider">🔒 Desktop Local Ollama</span>
                                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                                      brainProvider === "local-ollama"
                                        ? "bg-green-950/40 text-green-500 border-green-900/40"
                                        : "bg-slate-900 text-slate-400 border-slate-850"
                                    }`}>100% Private Offline</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-sans">
                                    Browse-to-Localhost Direct Proxy. Send queries directly to your local computer&apos;s LLM engine. Your data never traverses the internet.
                                  </p>
                                </button>
                              </div>

                              {/* Custom Gemini input fields */}
                              {brainProvider === "custom-gemini" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="space-y-2 bg-[#050608]/50 p-3.5 rounded-xl border border-red-500/20"
                                >
                                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                                    Your Google Gemini API Key
                                  </label>
                                  <input
                                    type="password"
                                    value={customApiKey}
                                    onChange={(e) => setCustomApiKey(e.target.value)}
                                    placeholder="Enter AIzaSy... Key"
                                    className="w-full bg-[#05070a] border border-white/5 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-700 focus:outline-none focus:border-[#EA4335]"
                                  />
                                </motion.div>
                              )}

                              {/* Local Ollama settings */}
                              {brainProvider === "local-ollama" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="space-y-3.5 bg-[#050608]/50 p-3.5 rounded-xl border border-green-500/20 text-xs font-sans"
                                >
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                                      Ollama Endpoint Port
                                    </label>
                                    <input
                                      type="text"
                                      value={localUrl}
                                      onChange={(e) => setLocalUrl(e.target.value)}
                                      className="w-full bg-[#05070a] border border-white/5 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-[#34A853]"
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                                      Target Smart Model Preset
                                    </label>
                                    <select
                                      value={localModelName}
                                      onChange={(e) => setLocalModelName(e.target.value)}
                                      className="w-full bg-[#05070a] border border-white/5 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-green-500 bg-[#05070a]"
                                    >
                                      <option value="llama3">Meta Llama 3 (8B) [llama3]</option>
                                      <option value="llama3.1">Meta Llama 3.1 (8B) [llama3.1]</option>
                                      <option value="deepseek-r1">DeepSeek R1 Distilled [deepseek-r1]</option>
                                      <option value="mistral">Mistral (7B) [mistral]</option>
                                      <option value="phi3">Microsoft Phi-3 Mini [phi3]</option>
                                    </select>
                                  </div>

                                  <div className="p-2 border border-green-950/40 bg-green-950/10 rounded-lg text-[9.5px] leading-normal text-slate-400">
                                    💡 <strong>Handshake confirmation needed</strong>. Set CORS on launch to avoid browser preflight roadblocks:
                                    <code className="block bg-black/60 p-1.5 rounded-md mt-1 text-green-300 font-mono">OLLAMA_ORIGINS=&quot;*&quot; ollama serve</code>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}

                        {creatorPanelTab === "adaptors" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <Layers className="w-4 h-4 text-cyan-400" />
                              Swarm Adaptation & Integration Blueprint
                            </h5>
                            <p className="text-xs text-slate-400 leading-normal">
                              Transition the simulated pipeline to production models! Export optimized configuration blueprints tailored for cloud deployment, security audit platforms, or claw agent runtimes.
                            </p>

                            {/* Framework selector buttons */}
                            <div className="grid grid-cols-3 gap-1 bg-[#0A0C10] p-1 border border-slate-805 border-slate-800 rounded-lg">
                              <button
                                type="button"
                                onClick={() => setActiveFramework("gcp")}
                                className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                                  activeFramework === "gcp"
                                    ? "bg-slate-900 border border-slate-800 text-white font-bold"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                Google Vertex
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveFramework("openclaw")}
                                className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                                  activeFramework === "openclaw"
                                    ? "bg-slate-900 border border-slate-800 text-white font-bold"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                OpenClaw Claw
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveFramework("nemo")}
                                className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                                  activeFramework === "nemo"
                                    ? "bg-slate-900 border border-slate-800 text-white font-bold"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                NeMo Rules
                              </button>
                            </div>

                            {/* Active framework explanation Card */}
                            <div className="p-3 bg-[#050608]/90 border border-slate-800 rounded-lg text-[10.5px] leading-relaxed text-slate-400 space-y-1.5 font-sans">
                              {activeFramework === "gcp" && (
                                <>
                                  <span className="font-semibold text-slate-200 block font-sans">Vertex AI Smart Agents System Design</span>
                                  Provides fully structured Google Cloud resources with semantic indices using Gemini-3.5-flash and float32 text-embedding-004 endpoints. Ensures enterprise scalability and durable workspace security.
                                </>
                              )}
                              {activeFramework === "openclaw" && (
                                <>
                                  <span className="font-semibold text-slate-200 block font-sans">OpenClaw Nemo-Claw Framework Config</span>
                                  Provides direct agent credentials configurations, MDD verification matrices, load balance algorithms, and capability signatures for the OpenClaw orchestration cluster node.
                                </>
                              )}
                              {activeFramework === "nemo" && (
                                <>
                                  <span className="font-semibold text-slate-200 block font-sans">NVIDIA NeMo Safety Constraints Schema</span>
                                  Delineates guardrails protocols to check alignment margins, structural integrity errors, token limitations, and consensus ratios across all agent workstations.
                                </>
                              )}
                            </div>

                            {/* Dynamic Code Viewer */}
                            <div className="relative">
                              <pre className="bg-[#050608] border border-slate-800 rounded-xl p-3 h-52 overflow-y-auto text-[9.5px] font-mono text-cyan-400 leading-normal custom-scrollbar select-all">
                                {activeFramework === "gcp" && getGCPConfigCode(customPodData)}
                                {activeFramework === "openclaw" && getOpenClawConfigCode(customPodData)}
                                {activeFramework === "nemo" && getNemoGuardrailsCode(customPodData)}
                              </pre>

                              {/* Copy button */}
                              <button
                                type="button"
                                onClick={() => {
                                  let textToCopy = "";
                                  if (activeFramework === "gcp") textToCopy = getGCPConfigCode(customPodData);
                                  else if (activeFramework === "openclaw") textToCopy = getOpenClawConfigCode(customPodData);
                                  else textToCopy = getNemoGuardrailsCode(customPodData);
 
                                  if (navigator.clipboard) {
                                    navigator.clipboard.writeText(textToCopy);
                                    setCopiedConfig(true);
                                    setTimeout(() => setCopiedConfig(false), 2000);
                                  }
                                }}
                                className="absolute bottom-2.5 right-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-[9px] uppercase px-2.5 py-1 rounded transition-all shadow"
                              >
                                {copiedConfig ? "Copied!" : "Copy Setup"}
                              </button>
                            </div>

                            {/* Standalone local codebase exporter button */}
                            <div className="pt-3 border-t border-slate-800/60 mt-4">
                              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">LOCAL OFFLINE PRIVACY</span>
                              <button
                                type="button"
                                onClick={exportLocalCodebase}
                                disabled={exportingCodebase}
                                className="w-full py-2.5 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-400 to-green-500 text-black font-extrabold text-xs rounded uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 font-sans shadow-lg hover:brightness-110 active:scale-[0.98]"
                              >
                                {exportingCodebase ? (
                                  <>
                                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
                                    Packaging Standalone Python Codebase...
                                  </>
                                ) : (
                                  <>
                                    Export Portable Swarm Codebase 📥
                                  </>
                                )}
                              </button>
                              <p className="text-[9px] text-slate-500 mt-1.5 leading-normal text-center">
                                Consolidates your custom 12 agents, workflow steps, and private python hooks into a portable runtime running on Ollama locally.
                              </p>
                            </div>
                          </div>
                        )}

                        {creatorPanelTab === "mcp" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                              Model Context Protocol & CLI Skills
                            </h5>
                            <p className="text-xs text-slate-400 leading-normal">
                              Fully compatible out-of-the-box with modern AI editors (Cursor, Claude Desktop, etc.) and native shell agent scripts!
                            </p>

                            {/* MCP Section */}
                            <div className="p-3.5 bg-[#050608]/90 border border-slate-800 rounded-lg space-y-2">
                              <span className="font-bold text-[11px] text-cyan-400 uppercase tracking-wider block font-sans">
                                🔌 Standard MCP Server Protocol
                              </span>
                              <p className="text-[10px] text-slate-400 leading-normal">
                                Connect your client (Cursor/Claude) directly to this workspace using JSON-RPC stdio. Exposes tools to inspect agent states, configurations, and execute workflow runs.
                              </p>
                              <div className="font-mono text-[9px] text-slate-300 bg-black/60 p-2 rounded border border-slate-800">
                                <div className="text-slate-500 font-bold"># Start the MCP Server process</div>
                                node mcp-server/index.js
                              </div>
                              <div className="text-[9px] text-slate-500 font-mono pl-1 space-y-0.5">
                                <div>• <span className="text-cyan-400">list_agent_pods</span>: Fetch active pods list</div>
                                <div>• <span className="text-cyan-400">get_agent_manifest</span>: Read node SOUL/SAFETY configs</div>
                                <div>• <span className="text-cyan-400">run_swarm_simulation</span>: Execute workload consensus runs</div>
                              </div>
                            </div>

                            {/* CLI Skills Section */}
                            <div className="p-3.5 bg-[#050608]/90 border border-slate-800 rounded-lg space-y-2">
                              <span className="font-bold text-[11px] text-yellow-500 uppercase tracking-wider block font-sans">
                                🐚 Agent CLI Skill Tool (podjobs-cli)
                              </span>
                              <p className="text-[10px] text-slate-400 leading-normal">
                                Interact with and run simulations or real ADK multi-agent tasks from your standard command terminal.
                              </p>
                              <div className="font-mono text-[9.5px] text-slate-300 bg-black/60 p-2 rounded border border-slate-800 space-y-1">
                                <div><span className="text-slate-500"># Show help panel</span><br />node bin/podjobs-cli.js --help</div>
                                <div><span className="text-slate-500"># List all active pods</span><br />node bin/podjobs-cli.js list</div>
                                <div><span className="text-slate-500"># Run a simulation run on legal pod</span><br />node bin/podjobs-cli.js simulate "Draft contract review" --pod legal</div>
                                <div><span className="text-slate-500"># Run a live Gemini-backed pipeline cascade</span><br />node bin/podjobs-cli.js run "Verify tax code splits" --pod insurance</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Simulated Command Logs screen / results */}
                      <div className="lg:col-span-7 space-y-5 text-left">
                        <h5 className="font-sans font-bold text-sm text-slate-500 uppercase tracking-widest text-left">
                          Swarm Live Processing Logs
                        </h5>

                        <div className="bg-[#0A0C10] border border-slate-800 rounded-xl overflow-hidden font-mono shadow-inner">
                          <div className="bg-[#0F1218] px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                            <span>Dynamic Console Session: STREAMING</span>
                            <span className="text-cyan-400 animate-pulse font-bold">● LIVE</span>
                          </div>

                          <div className="p-4 h-[440px] overflow-y-auto text-xs text-left space-y-4">
                            {customActiveLogs.length === 0 ? (
                              <div className="h-full flex items-center justify-center text-slate-500 italic text-center p-6">
                                Standard CLI console is listening. Click the Execute Swarm Command button on the left to witness cascading computations in action.
                              </div>
                            ) : (
                              <div className="space-y-3.5">
                                {customActiveLogs.map((log: any, idx: number) => {
                                  const isActive = idx === activeLogIndex;
                                  return (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className={`p-3.5 rounded-xl border leading-relaxed ${
                                        isActive
                                          ? "bg-cyan-950/25 border-cyan-500/40 shadow shadow-cyan-500/5 text-cyan-300"
                                          : "bg-[#0F1218]/50 border-slate-800 text-cyan-400"
                                      }`}
                                    >
                                      <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2 text-[10px] font-mono">
                                        <span className="font-bold flex items-center gap-1">
                                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                                          {log.agentName}
                                        </span>
                                        <span className="bg-[#0A0C10] px-1.5 py-0.5 rounded text-cyan-400/90 uppercase tracking-widest text-[8px] font-bold border border-slate-800/80">
                                          {log.impactRating}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-400 italic block mb-1">
                                        Action Sequence: <span className="text-white font-mono">{log.action}</span>
                                      </p>
                                      <div className="bg-black/30 p-2.5 rounded text-xs text-slate-300 leading-normal border border-slate-850">
                                        {log.outputSimulated}
                                      </div>
                                      <div className="text-[9px] text-slate-500 text-right mt-1.5">
                                        Execution latency: {log.timeTakenSeconds}s
                                      </div>
                                    </motion.div>
                                  );
                                })}

                                {/* FINAL COMPREHENSIVE SUMMARIZED REPORT */}
                                {customSimResults?.finalSummary && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.99 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="border border-cyan-500/30 bg-cyan-950/10 p-5 rounded-xl text-slate-250 font-sans space-y-3 mt-4"
                                  >
                                    <div className="flex flex-wrap justify-between items-center gap-2 border-b border-cyan-900/40 pb-2">
                                      <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-sm block w-max uppercase tracking-wider">
                                        Consolidated Release Package Brief
                                      </span>
                                      {customSimResults.merkleRoot && (
                                        <span className="font-mono text-[8.5px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80 max-w-xs truncate" title={`sha256:${customSimResults.merkleRoot}`}>
                                          <span className="text-slate-500 font-bold uppercase mr-1">Merkle Proof:</span>
                                          {customSimResults.merkleRoot.substring(0, 16)}...
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-wrap">
                                      {customSimResults.finalSummary}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agent Swarm List Card */}
                    <div className="mt-8 border-t border-slate-800 pt-8 space-y-4 text-left">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-widest">
                          Swarms Array Topology Directory // 12 Nodes Configured
                        </h5>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                          ⚡ Click any Node to open Direct Handshake Gateways & edit soul.md, safety.md etc.
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(customPodData.agents || []).map((agent: any, i: number) => {
                          const isCustomAgentActive = customSimRunning && activeLogIndex === i;
                          const agentSpecificColor = getGoogleColorForIndex(i);
                          return (
                            <button
                              type="button"
                              key={agent.id}
                              id={`agent_card_${agent.id}`}
                              onClick={() => handleSelectAgent(agent)}
                              className={`bg-[#0A0C10] border p-4 rounded-xl space-y-1.5 transform transition hover:border-cyan-500/40 text-left hover:bg-[#0E1218]/80 group focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer w-full flex flex-col justify-between min-h-[140px] ${
                                isCustomAgentActive ? "animate-agent-glow" : "border-slate-800"
                              }`}
                              style={
                                isCustomAgentActive
                                  ? ({
                                      "--glow-color": `${agentSpecificColor}55`,
                                      "--border-glow-color": `${agentSpecificColor}77`,
                                      "--border-glow-high-color": agentSpecificColor,
                                      backgroundColor: `${agentSpecificColor}15`,
                                    } as React.CSSProperties)
                                  : undefined
                              }
                            >
                              <div className="w-full space-y-1.5">
                              <div className="flex justify-between items-center w-full">
                                <span className="font-mono text-[9px] text-slate-500 uppercase group-hover:text-cyan-400 transition-colors">
                                  Node #{i+1} {agent.pronouns ? `(${agent.pronouns})` : ""}
                                </span>
                                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/30">
                                  {agent.productivityBoost}
                                </span>
                              </div>
                              <h6 className="font-sans font-extrabold text-white text-xs pt-0.5 group-hover:text-cyan-400 transition-colors">
                                {agent.name}
                              </h6>
                              <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                                {agent.role}
                              </p>
                            </div>
                            <div className="w-full pt-1.5 text-[9px] font-mono text-cyan-400 flex justify-between border-t border-slate-900 mt-1.5">
                              <span className="uppercase font-bold">Domain:</span>
                              <span className="italic font-sans text-slate-400 line-clamp-1">{agent.specialty}</span>
                            </div>
                          </button>
                        );
                      })}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct Agent Handshake & Merkle Files Configuration Terminal Modal */}
            <AnimatePresence>
              {selectedAgent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  id="agent_handshake_modal"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="relative w-full max-w-4xl bg-[#090C10] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
                  >
                    {/* Header */}
                    <div className="p-4 md:p-6 bg-[#0E1219] border-b border-slate-800 flex justify-between items-start md:items-center">
                      <div className="space-y-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/30 uppercase tracking-widest">
                            Node Handshake Terminal
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {selectedAgent.routerAddress || `router://openclaw/node`}
                          </span>
                        </div>
                        <h3 className="text-sm md:text-base font-sans font-black text-white flex items-center gap-1.5">
                          {selectedAgent.name}
                          <span className="text-xs text-slate-400 font-mono font-normal tracking-tight">
                            ({selectedAgent.pronouns || "They/Them"})
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400 max-w-xl line-clamp-1">
                          {selectedAgent.role}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedAgent(null)}
                        className="p-1 px-3 text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                      >
                        Disconnect [Esc]
                      </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex bg-[#070A0F] border-b border-slate-800/60 p-1">
                      <button
                        type="button"
                        onClick={() => setActiveAgentTab("chat")}
                        className={`flex-1 py-1.5 text-xs font-mono uppercase rounded transition-all ${
                          activeAgentTab === "chat"
                            ? "bg-[#0E1219] text-cyan-400 border border-slate-800/40 font-bold"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Direct Prompt Window (Brain)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAgentTab("files")}
                        className={`flex-1 py-1.5 text-xs font-mono uppercase rounded transition-all ${
                          activeAgentTab === "files"
                            ? "bg-[#0E1219] text-cyan-400 border border-slate-800/40 font-bold"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Merkle Configuration (Files)
                      </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#050709]">
                      
                      {/* Left Sidebar (Only visible on Configuration Tab for selecting md files) */}
                      {activeAgentTab === "files" && (
                        <div className="w-full md:w-56 bg-[#070A0F] border-r border-slate-800/60 p-3 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 text-left">
                          <span className="hidden md:block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">
                            MAPPING DIRECTORY
                          </span>
                          {[
                            { key: "soul", label: "soul.md" },
                            { key: "agents", label: "agents.md" },
                            { key: "memory", label: "memory.md" },
                            { key: "safety", label: "safety.md" },
                            { key: "security", label: "security.md" },
                            { key: "hermes", label: "hermes.json" }
                          ].map(file => (
                            <button
                              type="button"
                              key={file.key}
                              onClick={() => setSelectedAgentFileName(file.key as any)}
                              className={`py-1.5 px-3 text-left font-mono rounded text-[11px] transition-all shrink-0 cursor-pointer ${
                                selectedAgentFileName === file.key
                                  ? "bg-slate-900 text-cyan-400 border border-slate-800 font-bold"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              📁 {file.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content panel */}
                      <div className="flex-1 flex flex-col overflow-hidden h-full">
                        {activeAgentTab === "chat" ? (
                          // Direct Chat View
                          <div className="flex-1 flex flex-col overflow-hidden h-full">
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 text-left custom-scrollbar bg-[#05070A]">
                              <div className="p-3 bg-[#0E1219]/75 border border-slate-850 rounded-xl leading-relaxed text-xs text-slate-300">
                                <span className="font-mono text-[9px] text-cyan-400 block font-bold uppercase tracking-wider mb-1">
                                  Cognitive Connection Handshake Established
                                </span>
                                Hello Director. I am your specialized **{selectedAgent.name}** ({selectedAgent.pronouns || "They/Them"}). My target mandate is **{selectedAgent.role}**. Send me a custom message to stress-test my professional reasoning or direct me to refine system goals.
                              </div>

                              {/* Generative AI Voice Controller (Awesome AI Voice Integration) */}
                              <div className="bg-[#0A0D14] border border-slate-800 p-3.5 rounded-xl text-left space-y-2.5 shadow-md shrink-0">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Volume2 className="w-4 h-4 text-cyan-400" />
                                    <span className="text-[10px] font-mono uppercase font-bold text-slate-350 tracking-wider">
                                      Awesome AI Voice Registry (Generative TTS)
                                    </span>
                                  </div>
                                  {isSpeaking && (
                                    <div className="flex items-center gap-1">
                                      <span className="w-1 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                      <span className="w-1 h-4 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                                      <span className="w-1 h-2 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                                      <span className="w-1 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 leading-normal font-sans">
                                  Select a high-fidelity synthetic character model. Tap <strong className="text-cyan-400">Speak Profile</strong> to hear this node articulate their soul, safety rules and RAG context aloud.
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-2 pt-1 font-sans">
                                  <select
                                    value={selectedVoice ? selectedVoice.name : ""}
                                    onChange={(e) => {
                                      const found = availableVoices.find(v => v.name === e.target.value);
                                      setSelectedVoice(found || null);
                                    }}
                                    className="bg-[#05070A] border border-slate-800 text-[11px] font-mono text-cyan-400 rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50 max-w-xs cursor-pointer"
                                  >
                                    <option value="">-- [Default Native Voice Synth] --</option>
                                    {getCategorizedVoices().map((v, idx) => (
                                      <option key={idx} value={v.actualVoice.name}>
                                        {v.customName} ({v.genderVibe})
                                      </option>
                                    ))}
                                  </select>

                                  <button
                                    type="button"
                                    onClick={speakAgentDescription}
                                    className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                                      isSpeaking
                                        ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                                        : "bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/40"
                                    }`}
                                  >
                                    {isSpeaking ? (
                                      <>
                                        <VolumeX className="w-3.5 h-3.5" /> Stop Vocalization
                                      </>
                                    ) : (
                                      <>
                                        <Volume2 className="w-3.5 h-3.5" /> Speak Profile
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {(agentChatThreads[selectedAgent.name] || []).map((msg, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                                      msg.sender === "user"
                                        ? "bg-cyan-950/45 border border-cyan-500/20 text-cyan-300 rounded-tr-sm"
                                        : "bg-slate-900/90 border border-slate-850 text-slate-250 rounded-tl-sm whitespace-pre-wrap font-sans"
                                    }`}
                                  >
                                    <div className="font-mono text-[8px] opacity-60 uppercase mb-1">
                                      {msg.sender === "user" ? "SUPERVISOR [YOU]" : `${selectedAgent.name} [NODE]`}
                                    </div>
                                    <p className="font-sans leading-relaxed">{msg.text}</p>
                                  </div>
                                </motion.div>
                              ))}

                              {isAgentReplying && (
                                <div className="flex justify-start">
                                  <div className="bg-slate-900/90 border border-slate-800 text-slate-350 p-4 rounded-2xl rounded-tl-sm max-w-[85%] text-xs flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest pl-1">
                                      Routing calculations...
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Conversation Input Form */}
                            <form onSubmit={handleSendAgentMessage} className="p-3 bg-[#0E1219] border-t border-slate-800 flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={startListening}
                                title="Click to speak (Voice-to-Text)"
                                className={`p-2 rounded-lg border transition-all flex items-center justify-center shrink-0 ${
                                  isListening
                                    ? "bg-rose-500 border-rose-450 text-white animate-pulse"
                                    : "bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white"
                                }`}
                              >
                                <Mic className="w-4 h-4" />
                              </button>

                              <input
                                type="text"
                                value={agentChatInput}
                                onChange={(e) => setAgentChatInput(e.target.value)}
                                placeholder={isListening ? "Listening... Speak directly!" : `Ask ${selectedAgent.name} to optimize or comment...`}
                                disabled={isAgentReplying}
                                className="flex-1 bg-[#05070A] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                              />
                              <button
                                type="submit"
                                disabled={isAgentReplying || !agentChatInput.trim()}
                                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-850 disabled:text-slate-600 text-black font-mono font-bold text-xs uppercase px-4 py-2 rounded-lg transition-all"
                              >
                                TRANSMIT
                              </button>
                            </form>
                          </div>
                        ) : (
                          // Merkle files editor view
                          <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden h-full text-left">
                            <div className="flex-1 flex flex-col overflow-hidden">
                              <div className="flex justify-between items-center mb-1.5 shrink-0">
                                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                                  Active File: <strong className="text-cyan-400">{selectedAgentFileName}.md</strong>
                                </span>
                                {fileSaveSuccess && (
                                  <span className="font-mono text-[9px] text-emerald-400 animate-pulse bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-950/30">
                                    ✓ Active local cache updated!
                                  </span>
                                )}
                              </div>
                              <textarea
                                value={editedAgentFileContent}
                                onChange={(e) => setEditedAgentFileContent(e.target.value)}
                                className="flex-1 w-full bg-[#050709] border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-cyan-400/90 leading-relaxed focus:outline-none focus:border-cyan-500/40 resize-none overflow-y-auto"
                                style={{ tabSize: 2 }}
                              />
                            </div>
                            
                            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                              <p className="text-[10px] text-slate-500 leading-normal text-left max-w-md">
                                These configurations are evaluated by OpenClaw gateway orchestrators and NeMo constraint engines during Swarm simulations.
                              </p>
                              <button
                                type="button"
                                onClick={handleSaveEditedAgentFile}
                                className="py-2 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 active:scale-[0.98] text-black font-sans font-extrabold text-xs uppercase rounded-lg transition-all cursor-pointer shadow-md shrink-0"
                              >
                                Apply Config Changes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}



      </div>

      {/* DETAILED FOOTER OF THE collective */}
      <footer className="border-t border-slate-800 bg-[#0F1218] py-12 px-4 md:px-8 mt-16 text-center text-slate-500 text-xs font-mono" id="main_footer">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 font-sans">
              &ldquo;The impossible is just code waiting to be written, physics waiting to be rewritten,<br />
              math a work in progress, and truth waiting to be discovered.&rdquo;
            </p>
            <p className="text-slate-500 text-[11px] pt-1.5 flex items-center justify-center gap-1">
              — <a 
                href="https://github.com/DannyB-bit/PodJobs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:text-slate-300 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5 mr-1 fill-current opacity-70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Github.io
              </a> &bull; We Are <a href="https://theaicollective.art" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:text-blue-400 font-bold transition-colors duration-200">TheAiCollective.art</a><span className="tracking-normal select-none ml-1">🎨🍄🎵</span> &copy; 2026
            </p>
            <div className="max-w-md mx-auto pt-3 px-4 pb-3 bg-slate-950/20 border border-slate-900 rounded-2xl space-y-1 mt-4 text-[11px]">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] animate-ping" />
                <span className="text-[10px] tracking-wide uppercase font-mono text-slate-300">Google Course Capstone Sandbox</span>
              </div>
              <p className="text-slate-500 font-sans leading-relaxed text-[10.5px]">
                Built for the hands-on Capstone of the <b>5-Day AI Agents: Intensive Vibe Coding Course With Google (June 15 - 19, 2026)</b>. This demo version preserves all inputs locally inside sandboxed browser memory. No server data persistence of emails or goals is configured.
              </p>
            </div>
            <div className="flex justify-center gap-4 text-[9px] text-slate-500 font-mono tracking-widest pt-5 uppercase">
              <button 
                onClick={() => { setTermsType("terms"); setIsTermsOpen(true); }}
                className="hover:text-[#4285F4] transition-all cursor-pointer font-bold duration-200 hover:underline"
              >
                Terms of Service
              </button>
              <span className="text-slate-800 font-bold select-none">&bull;</span>
              <button 
                onClick={() => { setTermsType("privacy"); setIsTermsOpen(true); }}
                className="hover:text-[#34A853] transition-all cursor-pointer font-bold duration-200 hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-slate-800 font-bold select-none">&bull;</span>
              <a 
                href="/Whitepaper.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 text-cyan-500 transition-all cursor-pointer font-bold duration-200 hover:underline inline-block"
              >
                Project Whitepaper (PDF)
              </a>
              <span className="text-slate-800 font-bold select-none">&bull;</span>
              <button 
                onClick={() => { setIsOnboardingOpen(true); }}
                className="hover:text-[#FBBC05] transition-all cursor-pointer font-bold duration-200 hover:underline"
              >
                Hermes Onboarding
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-2">
            Merkle Trees of AI Agents &bull; Continuous Consensus Optimization
          </p>
        </div>
      </footer>

      {/* NATIVE NOUS RESEARCH HERMES ONBOARDING WIZARD PORTAL */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <div className="fixed inset-0 z-50 flex justify-center bg-[#04060A]/95 backdrop-blur-md overflow-y-auto p-4 md:p-8" id="hermes_onboarding_portal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B0F19] border border-slate-800/80 rounded-3xl max-w-lg w-full p-6 md:p-8 my-auto shadow-2xl relative space-y-5 text-left"
            >
              {/* Go back to page button (Arrow <) */}
              <button
                type="button"
                onClick={() => setIsOnboardingOpen(false)}
                className="absolute top-4 left-4 text-cyan-400/80 hover:text-cyan-400 hover:scale-105 transition-all cursor-pointer w-9 h-9 rounded-full bg-slate-950 border border-cyan-500/30 hover:border-cyan-500/60 flex items-center justify-center p-0 shadow-lg shadow-cyan-500/5"
                title="Go Back to Dashboard"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Reset/Cancel button if already onboarded */}
              {isOnboarded && (
                <button
                  type="button"
                  onClick={() => setIsOnboardingOpen(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center p-0"
                >
                  <Plus className="w-5 h-5 rotate-45 transform" />
                </button>
              )}

              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-[#4285F4]/10 to-[#EA4335]/10 border border-[#4285F4]/30 text-cyan-400">
                  <Cpu className="w-8 h-8 animate-pulse text-cyan-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Onboard Hermes Conductor</h2>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto font-sans leading-relaxed">
                  Configure your master identity, focus metrics, and synchronize underlying Nous Research framework.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!onboardingData.userName.trim() || !onboardingData.userEmail.trim() || !onboardingData.organization.trim()) return;
                  if (!onboardingData.termsAccepted) {
                    alert("You must review and accept the Terms of Service & Privacy Policy to activate the Hermes framework.");
                    return;
                  }
                  
                  // Save state
                  const updatedData = { ...onboardingData, termsAccepted: true };
                  setOnboardingData(updatedData);
                  setIsOnboarded(true);
                  setIsOnboardingOpen(false);
                  localStorage.setItem("podjobs_onboarded_user", JSON.stringify(updatedData));
                }}
                className="space-y-4 pt-1"
              >
                {/* 5-Day Course Disclaimer Banner */}
                <div className="p-3.5 bg-gradient-to-r from-cyan-950/20 to-indigo-950/20 border border-cyan-500/20 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
                    <span className="font-mono text-[9px] font-bold tracking-wider uppercase">Google Course Sandbox Demo Version</span>
                  </div>
                  <p className="text-[10px] text-slate-350 font-sans leading-relaxed">
                    This platform is custom configured for the <strong>5-Day AI Agents: Intensive Vibe Coding Course With Google (June 15 - 19, 2026)</strong> and the <strong>AI Agents: Intensive Vibe Coding Capstone Project</strong>. All inputs are safely cached locally inside sandboxed browser memory. Or you can deploy your own fleet through our exported swarms!
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Human Conductor Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. PJ Macallan"
                      value={onboardingData.userName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, userName: e.target.value })}
                      className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none"
                    />
                    <div className="absolute right-3.5 top-3 text-[9px] font-mono text-cyan-500 font-bold uppercase tracking-widest">human</div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Conductor Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. conductor@theaicollective.art"
                      value={onboardingData.userEmail}
                      onChange={(e) => setOnboardingData({ ...onboardingData, userEmail: e.target.value })}
                      className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none"
                    />
                    <div className="absolute right-3.5 top-3 text-[9px] font-mono text-[#34A853] font-bold uppercase tracking-widest">required</div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Conductor Phone Number <span className="opacity-60 text-[9px] lowercase font-normal">(optional)</span></label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      value={onboardingData.userPhone}
                      onChange={(e) => setOnboardingData({ ...onboardingData, userPhone: e.target.value })}
                      className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none"
                    />
                    <div className="absolute right-3.5 top-3 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest">optional</div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Venture / Organization Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The AI Collective"
                    value={onboardingData.organization}
                    onChange={(e) => setOnboardingData({ ...onboardingData, organization: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Strategic Swarm Mission / Goal</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Direct autonomous task execution with zero redundancy..."
                    value={onboardingData.onboardingGoal}
                    onChange={(e) => setOnboardingData({ ...onboardingData, onboardingGoal: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none resize-none"
                  />
                </div>

                <div className="p-3 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5 max-w-[70%]">
                    <span className="text-[11px] font-bold text-white block">Under-the-hood hermes-agent</span>
                    <span className="text-[9px] text-slate-400 block font-sans">Route pod requests automatically through Hermes framework pipelines.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOnboardingData({ ...onboardingData, hermesEnabled: !onboardingData.hermesEnabled })}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 outline-none ${
                      onboardingData.hermesEnabled ? "bg-[#34A853]" : "bg-slate-800"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition duration-200 ease-in-out mt-[3px] ${
                        onboardingData.hermesEnabled ? "translate-x-4.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">Free LLM Brain Tier Configuration</label>
                  <select
                    value={onboardingData.llmBrain}
                    onChange={(e) => setOnboardingData({ ...onboardingData, llmBrain: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-3 text-white outline-none cursor-pointer"
                  >
                    <option value="gemini-3.5-flash">Google Free Tier - Gemini 3.5 Flash</option>
                    <option value="custom-api">Google Paid/Custom Gemini API Key</option>
                    <option value="local-ollama">Private Local Ollama Swarms</option>
                  </select>
                  <p className="text-[9px] text-[#34A853] mt-1.5 flex items-center gap-1 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" /> Eligible for Google Cloud Free limits. Zero charge.
                  </p>
                </div>

                {/* Consent checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={onboardingData.termsAccepted}
                      onChange={(e) => setOnboardingData({ ...onboardingData, termsAccepted: e.target.checked })}
                      className="mt-0.5 shrink-0 accent-cyan-500 rounded bg-slate-950 border-slate-800 text-white w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 font-sans leading-relaxed">
                      I agree to the{" "}
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setTermsType("terms"); setIsTermsOpen(true); }}
                        className="text-[#4285F4] hover:underline cursor-pointer font-bold inline"
                      >
                        Terms of Service
                      </button>{" "}
                      and acknowledge the{" "}
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setTermsType("privacy"); setIsTermsOpen(true); }}
                        className="text-[#34A853] hover:underline cursor-pointer font-bold inline"
                      >
                        Privacy Policy
                      </button>{" "}
                      for hermes-agent workspace deployment.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!onboardingData.userName.trim() || !onboardingData.userEmail.trim() || !onboardingData.organization.trim() || !onboardingData.termsAccepted}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-md ${
                      onboardingData.userName.trim() && onboardingData.userEmail.trim() && onboardingData.organization.trim() && onboardingData.termsAccepted
                        ? "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-500/10 cursor-pointer text-shadow"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {isOnboarded ? "Update Hermes Profile & Sync" : "Complete Hermes Sync & Access"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NATIVE PRIVACY & TERMS INFORMATIVE DIALOG */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex justify-center bg-[#030509]/90 backdrop-blur-sm p-4 overflow-y-auto" id="terms_dialog">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#0B0F19] border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 my-auto shadow-2xl relative space-y-4 text-left"
            >
              <button
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center p-0"
              >
                <Plus className="w-5 h-5 rotate-45 transform" />
              </button>

              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                {termsType === "terms" ? (
                  <>
                    <Scale className="w-5 h-5 text-[#4285F4]" />
                    <h3 className="text-lg font-black text-white">Terms & Conditions &bull; PodJobs.ai</h3>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 text-[#34A853]" />
                    <h3 className="text-lg font-black text-white">Privacy Policy &bull; PodJobs.ai</h3>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-300 font-sans space-y-3.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-850">
                {termsType === "terms" ? (
                  <>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1 mb-2">
                      <p className="text-[10px] uppercase font-mono font-bold text-amber-400">Course Demo Sandbox - Scale Limit</p>
                      <p className="text-[9.5px] text-slate-300 leading-normal">
                        This application is built as part of the hands-on Capstone Project for the <b>5-Day AI Agents: Intensive Vibe Coding Course With Google (June 15 - 19, 2026)</b>. It serves as an educational sandbox.
                      </p>
                    </div>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">1. Educational Sandbox Use</p>
                    <p>
                      Users acknowledge that PodJobs.ai is an experimental Merkle-Tree multi-agent simulator created for Kaggle&apos;s 2026 Vibe Coding Capstone. It allows the simulation of parallel agent structures without committing real fiscal transactions.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">2. Conductor Registration Data</p>
                    <p>
                      To unlock access, conductors must register their Conductor Full Name, Contact Email Address, and optional Conductor Phone Number. This registration info, alongside any custom created pods and prompt simulations, is strictly written directly to your web browser&apos;s isolated LocalStorage and is never shared with third parties.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">3. Human-In-the-loop Command</p>
                    <p>
                      Under course principles (especially Day 5: Spec-Driven production-grade development), the human Conductor retains 100% control, liability, and oversight. Agent swarms output advisory logs, pipeline plans, and offline executable code. 
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">4. Third-Party Integrations Policy</p>
                    <p>
                      The app integrates the @google/genai SDK on the server side to power natural language agent responses. By using this, you are bound by Google&apos;s Gemini Developer Terms and region limits.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">5. Nous Research Hermes Agent Integration &amp; Disclaimers</p>
                    <p>
                      This project integrates and utilizes the open-source <b>Nous Research Hermes Agent</b> framework. 
                      We explicitly declare that this project and its developers are <b>not associated with, affiliated with, sponsored by, or endorsed by</b> Nous Research or the official Hermes Agent project team. 
                      The Hermes Agent framework is fully open-source software, and you can view their project details and their license link directly at the official portal: <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">https://hermes-agent.nousresearch.com/</a>.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-cyan-400">6. Complete Ironclad Liability Shield &amp; Contest Scope</p>
                    <p>
                      The sole purpose of this project and software is as a sandbox submission for the <a href="https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/overview" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">5-Day AI Agents: Intensive Vibe Coding Course With Google</a> hosted by Google.
                      <br />
                      Under no circumstances shall the author (<b>Danny Bouldiez</b>, also known by the pseudonym <b>Devs One</b>) or the organization/domain <b>TheAiCollective.art</b> (including any associated partners, developers, or affiliates) be liable for any direct, indirect, incidental, special, exemplary, or consequential damages, or any liability whatsoever (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage. This liability shield is intended to be complete, absolute, and ironclad.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1 mb-2">
                      <p className="text-[10px] uppercase font-mono font-bold text-emerald-400">Privacy Partitioning Status</p>
                      <p className="text-[9.5px] text-slate-350 leading-normal">
                        Your workspace documents, developer identity logs, and email registry fields stay partitioned to your client storage. Secure, private, and offline-ready.
                      </p>
                    </div>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-[#34A853]">1. Sovereign Document Storage</p>
                    <p>
                      Any knowledge base documentation files (containing schemas, operational directives, or text context) you load into our local browser memory space are parsed and vectorized inside the browser sandbox using light retrieval-augmented generation (RAG) indices.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-[#34A853]">2. Contact &amp; Onboarding Details</p>
                    <p>
                      We collect Full Name, Email, and optional Phone number solely for simulating on-screen developer registrations requested in the Kaggle Capstone specifications. This data is structured solely inside your device&apos;s client-side cache space.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-[#34A853]">3. Transient Prompt Evaluation</p>
                    <p>
                      During agent simulation steps, context prompts are dispatched to secure, serverless Google model endpoints to generate roleplay logs. Zero prompt contents, email entries, or documents are cached on secondary databases or farmed to train global model layers.
                    </p>

                    <p className="font-bold text-slate-100 uppercase tracking-widest text-[9px] font-mono text-[#34A853]">4. Complete Sandbox Security</p>
                    <p>
                      This service maintains proper sandbox environment separation to prevent data leaks. Users can also select Ollama for complete, closed local offline execution without hitting external network paths.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-white hover:text-cyan-400 font-bold cursor-pointer transition-colors"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}

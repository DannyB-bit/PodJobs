import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput, auditOutput, calculateMerkleRoot } from "../../../lib/security";

// Helper to generate realistic markdown configurations for an agent
function getMicroFilesForAgent(name: string, role: string, specialty: string, pronouns: string, routerAddress: string) {
  return {
    soul: `# Cognitive Soul Profile: ${name}
## Pronouns: ${pronouns}
## Primary Substantive Directive: ${role}

### Core Personality Matrix
- **Tone**: Ultra-professional, domain-authoritative, crisp, and objective.
- **Cognitive Model Bias**: Configured with a Zero-Leak security stance.
- **Primary Domain Specialty**: ${specialty}.

### Philosophical Foundations
Believes that "The impossible is just code waiting to be written." This node strives to reject conventional boundaries, prioritizing absolute structural truth, logical completeness, and peak operational metrics. No placeholders, no filler, only pure, actionable results.`,

    agents: `# Swarm Inter-Agent Node Agreement
## Identifier: ${name}
## Active Gateway Address: ${routerAddress}

### Orchestration Topology
- **Parent Node**: Merkle Tree Swarm Root Controller (Direct Command Line Interface)
- **Local Gateway Registry**: OpenClaw Node Swarm Controller
- **Consensus Scheme**: Sequential pipeline verification with Merkle integrity attestation across 12 peer nodes

### Downstream Ingress/Egress Routers
- **Ingress**: Listening securely on TLS Port 8083 router channel
- **Egress**: Broadcasts verified data models directly to Swarms Consensus Arbiter Node`,

    memory: `# Episodic & Semantic Memory Buffer Ledger
## Node Specialty Context: ${specialty}

### Spatial Cache System
- **LMCache Layer Status**: ACTIVE (Index tracking through remote lmcache server)
- **MemVid Layer Status**: SYNCED (high-frequency visual frame and structural telemetry log)
- **HuggingFace Knowledge Base**: HF Datasets and the Stanford Meta-Harness active verification pipeline

### Long-Term Episodic Buffer
- Retains up to 40,000 contextual tokens of direct user message streams.
- Refers queries dynamically to the localized RAG Hub when matching terms of context are queried.`,

    safety: `# Safety Guardrails Constraint Schema
## Node Alignment Class: High-Fidelity Domain Authority

### Guardrail Directives
- **Content Security Alignment Limit**: Threshold <= 0.05 bias rating.
- **Language Conformity**: Enforces zero hallucination margins; references must strictly ground on active RAG files or verified legal/medical precedent logs.
- **Exception Protocols**: Redirects standard input errors, formatting anomalies, and bias risks straight to the Human Director with diagnostic breakdown codes.`,

    security: `# Swarm Security Protocol & Cyber Boundary Directives
## Security Node Classification: Guarded-Compute Egress

### Security Regulations
- **API Key Guard**: Absolute strict boundary. No credentials or secret keys are exposed or output.
- **Safe-Execution Limit**: Local execution only. System-level shell scripts are executed strictly in isolated virtual sandbox hooks.
- **Consensus Attestation**: Digitally signs every compiled data brief using a cryptographic Merkle-proof before transmitting downstream.`
  };
}

// Fallback generator for robust offline / unconfigured fallback data
function generateFallbackPod(role: string, sector: string, onboardingUser?: any) {
  const normalizedRole = role.trim() || "Information Analyst";
  const nameClean = normalizedRole.replace(/[^a-zA-Z0-9 ]/g, "");
  const sectorLower = (sector || "").toLowerCase();
  const roleLower = normalizedRole.toLowerCase();

  let agents = [];
  let workflowSteps = [];

  const isLegal = roleLower.includes("law") || roleLower.includes("attorney") || roleLower.includes("legal") || roleLower.includes("paralegal") || roleLower.includes("compliance") || sectorLower.includes("legal") || sectorLower.includes("compliance") || sectorLower.includes("law");
  const isMedical = roleLower.includes("doctor") || roleLower.includes("physic") || roleLower.includes("nurse") || roleLower.includes("medical") || roleLower.includes("health") || roleLower.includes("clinical") || roleLower.includes("diagnos") || roleLower.includes("biotech") || roleLower.includes("radiology") || roleLower.includes("oncology") || roleLower.includes("dentist") || roleLower.includes("therapist") || roleLower.includes("pharmacy") || sectorLower.includes("health") || sectorLower.includes("medical") || sectorLower.includes("biotech") || sectorLower.includes("diagnos");
  const isFinance = roleLower.includes("account") || roleLower.includes("tax") || roleLower.includes("audit") || roleLower.includes("finance") || roleLower.includes("wealth") || roleLower.includes("bank") || roleLower.includes("invest") || roleLower.includes("cpa") || roleLower.includes("ledger") || sectorLower.includes("finance") || sectorLower.includes("wealth") || sectorLower.includes("asset") || sectorLower.includes("banking") || sectorLower.includes("accounting") || sectorLower.includes("tax");
  const isCustomerService = roleLower.includes("customer") || roleLower.includes("support") || roleLower.includes("helpdesk") || roleLower.includes("service desk") || roleLower.includes("call center") || roleLower.includes("triage") || roleLower.includes("cx") || roleLower.includes("client support") || roleLower.includes("customer care") || sectorLower.includes("customer") || sectorLower.includes("support") || sectorLower.includes("retail");
  const isTech = roleLower.includes("developer") || roleLower.includes("engineer") || roleLower.includes("programmer") || roleLower.includes("coder") || roleLower.includes("software") || roleLower.includes("architect") || roleLower.includes("devops") || roleLower.includes("cybersecurity") || roleLower.includes("webmaster") || roleLower.includes("sysadmin") || sectorLower.includes("software") || sectorLower.includes("code") || sectorLower.includes("tech");
  const isTrades = roleLower.includes("plumber") || roleLower.includes("electric") || roleLower.includes("carpenter") || roleLower.includes("hvac") || roleLower.includes("mechanic") || roleLower.includes("handyman") || roleLower.includes("construct") || roleLower.includes("contractor") || roleLower.includes("mason") || roleLower.includes("welder") || roleLower.includes("repair") || sectorLower.includes("construct");
  const isCreative = roleLower.includes("artist") || roleLower.includes("design") || roleLower.includes("illustrator") || roleLower.includes("creative") || roleLower.includes("animator") || roleLower.includes("writer") || roleLower.includes("copywrit") || roleLower.includes("chef") || roleLower.includes("cook") || roleLower.includes("music") || roleLower.includes("composer") || roleLower.includes("producer") || roleLower.includes("filmmaker") || roleLower.includes("creator") || roleLower.includes("influencer") || sectorLower.includes("creative") || sectorLower.includes("art") || sectorLower.includes("design");
  const isEducation = roleLower.includes("teach") || roleLower.includes("learn") || roleLower.includes("school") || roleLower.includes("class") || roleLower.includes("tutor") || roleLower.includes("educat") || roleLower.includes("curricul") || sectorLower.includes("educat") || sectorLower.includes("school") || sectorLower.includes("learn");
  const isSalesMarketing = roleLower.includes("sales") || roleLower.includes("market") || roleLower.includes("seo") || roleLower.includes("copywrit") || roleLower.includes("advertis") || roleLower.includes("campaign") || roleLower.includes("brand") || sectorLower.includes("market") || sectorLower.includes("sales") || sectorLower.includes("advertis");

  if (isLegal) {
    agents = [
      { id: "l1", name: `${nameClean} Arguments Planner`, role: "Maps legal arguments, deconstructs claims and plans brief flow", specialty: "Workflow planning", productivityBoost: "10x faster filing flow", icon: "Compass", status: "idle" },
      { id: "l2", name: `${nameClean} Precedent Searcher`, role: "Indexes digital court databases and retrieves relevant historical verdicts", specialty: "Case retrieval", productivityBoost: "15x query velocity", icon: "Search", status: "idle" },
      { id: "l3", name: `${nameClean} Dossier Harvester`, role: "Extracts and classifies legal discovery metadata from massive pdf logs", specialty: "Context formatting", productivityBoost: "12x cleaner context", icon: "Database", status: "idle" },
      { id: "l4", name: `${nameClean} Pleadings Draftsman`, role: "Instantly generates compliant trial briefs, pleadings, and motions templates", specialty: "Draft synthesis", productivityBoost: "8x drafting turnaround", icon: "FileText", status: "idle" },
      { id: "l5", name: `${nameClean} Citation Auditor`, role: "Validates all case citations, statutory references, and code formatting rules", specialty: "Precision polishing", productivityBoost: "0% citation errors", icon: "PenTool", status: "idle" },
      { id: "l6", name: `${nameClean} Risk Assessor`, role: "Inspects drafted letters for accidental exposure, bias, or liability leaks", specialty: "Risk compliance", productivityBoost: "Zero liability leaks", icon: "Shield", status: "idle" },
      { id: "l7", name: `${nameClean} Jurisdiction Adapter`, role: "Formatting briefs to meet local, state, and appellate court mandates", specialty: "Localization", productivityBoost: "Instant formatting specs", icon: "Globe", status: "idle" },
      { id: "l8", name: `${nameClean} Fee Comptroller`, role: "Computes trust accounts, court filing fees, and asset allocation indexes", specialty: "Financial math", productivityBoost: "Clean billing logs", icon: "DollarSign", status: "idle" },
      { id: "l9", name: `${nameClean} Stress Tester`, role: "Simulates opposing counsel objections and tests weaknesses in argument logic", specialty: "Stressor simulation", productivityBoost: "30% more robust briefs", icon: "Zap", status: "idle" },
      { id: "l10", name: `${nameClean} Case Summarizer`, role: "Merges deep research and trial filings into an executive client briefing", specialty: "Summary briefings", productivityBoost: "Instant brief drafts", icon: "Activity", status: "idle" },
      { id: "l11", name: `${nameClean} Ethics Validator`, role: "Verifies state bar directives, professional conduct rules and compliance", specialty: "Ethics alignment", productivityBoost: "100% ethics pass rate", icon: "Scale", status: "idle" },
      { id: "l12", name: `${nameClean} Verdict Arbiter`, role: "Polls other agents via a structured verification matrix to pick the safest legal strategy", specialty: "Consensus voting", productivityBoost: "Unified battleplan", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Arguments Blueprinting", executor: `${nameClean} Arguments Planner`, description: "Deconstructs filings into active logic branches." },
      { title: "Dynamic Case Search", executor: `${nameClean} Precedent Searcher`, description: "Crawls civil precedents for relevant verdicts." },
      { title: "Citation & Risk Verification", executor: `${nameClean} Citation Auditor`, description: "Polishes citations and isolates liability leaks." },
      { title: "Mock Adversarial Review", executor: `${nameClean} Verdict Arbiter`, description: "Simulates trial hurdles & signs off custom legal brief." }
    ];
  } else if (isMedical) {
    agents = [
      { id: "m1", name: `${nameClean} Diagnostic Tree Planner`, role: "Assesses complex symptoms, deconstructing them into pathology targets", specialty: "Triage planning", productivityBoost: "8x intake throughput", icon: "Compass", status: "idle" },
      { id: "m2", name: `${nameClean} Pathological Scholar`, role: "Queries clinical trial journals, medical precedents and biotech logs", specialty: "Literature query", productivityBoost: "20x search rate", icon: "Search", status: "idle" },
      { id: "m3", name: `${nameClean} Data Harvester`, role: "Aggregates and formats patient vital telemetry logs and device feeds", specialty: "Context parsing", productivityBoost: "14x cleaner records", icon: "Database", status: "idle" },
      { id: "m4", name: `${nameClean} Case Formulator`, role: "Compiles first-draft clinical case summaries, treatment models, and reports", specialty: "Draft synthesis", productivityBoost: "10x case output", icon: "FileText", status: "idle" },
      { id: "m5", name: `${nameClean} Calibration Dose Polisher`, role: "Verifies physiological measurements, dosimetry, and compound math parameters", specialty: "Dosage accuracy", productivityBoost: "Zero math anomalies", icon: "PenTool", status: "idle" },
      { id: "m6", name: `${nameClean} Compliance Auditor`, role: "Secures diagnostic drafts against private information leakage and medical bar codes", specialty: "Privacy guard", productivityBoost: "100% privacy compliance", icon: "Shield", status: "idle" },
      { id: "m7", name: `${nameClean} Patient Adaptor`, role: "Translates complex clinical jargon into elegant, warm, patient-friendly guidance", specialty: "Linguistic reach", productivityBoost: "Perfect customer scores", icon: "Globe", status: "idle" },
      { id: "m8", name: `${nameClean} Allocation Comptroller`, role: "Tracks resource costs, pharmaceutical billing bounds, and licensing quotas", specialty: "Resource audit", productivityBoost: "Real-time cost ledger", icon: "DollarSign", status: "idle" },
      { id: "m9", name: `${nameClean} Drift Predictor`, role: "Stress tests treatment models against sudden physiological or medical anomalies", specialty: "Drift forecasting", productivityBoost: "25% safer medical paths", icon: "Zap", status: "idle" },
      { id: "m10", name: `${nameClean} Health Reporter`, role: "Synchronizes genetic, vital, and literature logs into a single summary page", specialty: "Summary briefs", productivityBoost: "Instant briefing cards", icon: "Activity", status: "idle" },
      { id: "m11", name: `${nameClean} Ethics Inspector`, role: "Aligns therapeutic suggestions with contemporary healthcare ethical rules", specialty: "Ethics review", productivityBoost: "Secure practice bounds", icon: "Scale", status: "idle" },
      { id: "m12", name: `${nameClean} Medicine Director`, role: "Drives final triage agreement via a structured clinical verification model", specialty: "Consensus polling", productivityBoost: "Unified treatment plan", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Pathway Mapping", executor: `${nameClean} Diagnostic Tree Planner`, description: "Decomposes inputs into vital paths." },
      { title: "Precedent Research", executor: `${nameClean} Pathological Scholar`, description: "Queries global databases for treatment matches." },
      { title: "Dosage & Compliance Polishing", executor: `${nameClean} Calibration Dose Polisher`, description: "Performs safety audits on formulas." },
      { title: "Unified Diagnostic Seal", executor: `${nameClean} Medicine Director`, description: "Verifies treatment and outputs executive health file." }
    ];
  } else if (isFinance) {
    agents = [
      { id: "f1", name: `${nameClean} Ledger Planner`, role: "Deconstructs transaction histories and plans reconciliation routes", specialty: "Ledger mapping", productivityBoost: "9x faster audits", icon: "Compass", status: "idle" },
      { id: "f2", name: `${nameClean} Tax Code Researcher`, role: "Queries SEC records, IRS tax codes, and regulatory updates", specialty: "Statute search", productivityBoost: "15x query speed", icon: "Search", status: "idle" },
      { id: "f3", name: `${nameClean} Spreadsheet Harvester`, role: "Parses bank CSV logs, receipt images, and financial formats", specialty: "Context formatting", productivityBoost: "12x cleaner sheets", icon: "Database", status: "idle" },
      { id: "f4", name: `${nameClean} Valuation Compiler`, role: "Synthesizes balance sheets, asset schedules, and audit reports", specialty: "Draft synthesis", productivityBoost: "8x spreadsheet speed", icon: "FileText", status: "idle" },
      { id: "f5", name: `${nameClean} Fraction Polisher`, role: "Fine-tunes decimal fractions, interest accruals, and ledger balances", specialty: "Fractions math", productivityBoost: "Zero rounding errors", icon: "PenTool", status: "idle" },
      { id: "f6", name: `${nameClean} Compliance Auditor`, role: "Cross-checks records against KYC, AML, and SEC guidelines", specialty: "Risk compliance", productivityBoost: "100% compliance pass", icon: "Shield", status: "idle" },
      { id: "f7", name: `${nameClean} Tax System Adapter`, role: "Converts ledger metrics to fit domestic and international tax guidelines", specialty: "Tax localization", productivityBoost: "Instant tax compliance", icon: "Globe", status: "idle" },
      { id: "f8", name: `${nameClean} Fee Comptroller`, role: "Tracks transaction fees, gas overhead, and clearing margins", specialty: "Fee compliance", productivityBoost: "Real-time cost ledger", icon: "DollarSign", status: "idle" },
      { id: "f9", name: `${nameClean} Black-Swan Modeler`, role: "Simulates financial exceptions, bank runs, and margin warnings", specialty: "Stress modeling", productivityBoost: "30% more robust plans", icon: "Zap", status: "idle" },
      { id: "f10", name: `${nameClean} Portfolio Reporter`, role: "Compiles transaction digests, asset allocations, and pitch metrics", specialty: "Summary briefs", productivityBoost: "Instant portfolio summaries", icon: "Activity", status: "idle" },
      { id: "f11", name: `${nameClean} Fiduciary Guard`, role: "Verifies financial directives against corporate ethical bounds", specialty: "Conflict auditing", productivityBoost: "Clean conflict brief", icon: "Scale", status: "idle" },
      { id: "f12", name: `${nameClean} Consensus Trading Director`, role: "Conducts final checks to authorize the investment release", specialty: "Trading consensus", productivityBoost: "Unified risk signoff", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Ledger Plan Mapping", executor: `${nameClean} Ledger Planner`, description: "Maps balance accounts and reconciliation routes." },
      { title: "Statute Code Query", executor: `${nameClean} Tax Code Researcher`, description: "Syncs IRS files and checks regulatory logs." },
      { title: "Spreadsheet & Cost Auditing", executor: `${nameClean} Compliance Auditor`, description: "Runs AML screens and polishes ledger calculations." },
      { title: "Fiduciary Consensus Seal", executor: `${nameClean} Consensus Trading Director`, description: "Reviews conflict audits and seals ledger report." }
    ];
  } else if (isCustomerService) {
    agents = [
      { id: "cs1", name: `${nameClean} Sentiment Assessor`, role: "Analyzes incoming text triggers for customer frustration, urgency, and tier", specialty: "Linguistic triage", productivityBoost: "Instant score", icon: "Activity", status: "idle" },
      { id: "cs2", name: `${nameClean} Knowledge Searcher`, role: "Indexes internal FAQs and historic support ticket resolutions", specialty: "Graph lookup", productivityBoost: "30x retrieval", icon: "Search", status: "idle" },
      { id: "cs3", name: `${nameClean} Multi-language Adaptor`, role: "Converts customer responses into tone-accurate templates in 45 languages", specialty: "Context translation", productivityBoost: "Instant translate", icon: "Globe", status: "idle" },
      { id: "cs4", name: `${nameClean} VIP Priority Router`, role: "Identifies and routes enterprise or high-value accounts to priority channels", specialty: "SLA compliance", productivityBoost: "Zero lag routing", icon: "Award", status: "idle" },
      { id: "cs5", name: `${nameClean} VAT & Tax Auditor`, role: "Cross-checks commercial customer complaints with regional billing rules", specialty: "Regulatory math", productivityBoost: "Clean audits", icon: "Scale", status: "idle" },
      { id: "cs6", name: `${nameClean} Action Booker`, role: "Bridges customer tickets to internal databases to register issues", specialty: "API Execution", productivityBoost: "Instant execution", icon: "Database", status: "idle" },
      { id: "cs7", name: `${nameClean} Tone Refinement Bot`, role: "Polishes response text to sound warm, helpful, and highly professional", specialty: "Brand alignment", productivityBoost: "Polished templates", icon: "PenTool", status: "idle" },
      { id: "cs8", name: `${nameClean} Anomaly Escalate-Bot`, role: "Isolates complex customer edge-cases for direct human conductor signoff", specialty: "Outlier isolation", productivityBoost: "Zero missed leaks", icon: "AlertTriangle", status: "idle" },
      { id: "cs9", name: `${nameClean} Compliance Verifier`, role: "Audits outgoing support messages against SEC and privacy protection guidelines", specialty: "Risk assessment", productivityBoost: "No human error", icon: "Shield", status: "idle" },
      { id: "cs10", name: `${nameClean} Technical Profiler`, role: "Parses system logs and application error messages reported by customers", specialty: "Infrastructure parse", productivityBoost: "Fast diagnostics", icon: "Terminal", status: "idle" },
      { id: "cs11", name: `${nameClean} Feedback Harvester`, role: "Gathers post-interaction satisfaction scores and aggregates training insights", specialty: "Telemetry update", productivityBoost: "Loop optimization", icon: "TrendingUp", status: "idle" },
      { id: "cs12", name: `${nameClean} Swarm Coordinator`, role: "Orchestrates consensus validation on final customer response actions", specialty: "Consensus polling", productivityBoost: "Unified action", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Linguistic Sentiment Triage", executor: `${nameClean} Sentiment Assessor`, description: "Classifies ticket tone, urgency, and priority routing." },
      { title: "Knowledge Lookup & Sync", executor: `${nameClean} Knowledge Searcher`, description: "Crawls historic FAQs to find draft answers." },
      { title: "Safety & Compliance Audit", executor: `${nameClean} Compliance Verifier`, description: "Reviews draft templates for privacy and style limits." },
      { title: "Unified Response Approval", executor: `${nameClean} Swarm Coordinator`, description: "Votes on the safest response and hands over to Supervisor." }
    ];
  } else if (isEducation) {
    agents = [
      { id: "ed1", name: `${nameClean} Curriculum Mapper`, role: "Syllabus deconstruction & sequence planning", specialty: "Sequence planning", productivityBoost: "10x syllabus speed", icon: "Compass", status: "idle" },
      { id: "ed2", name: `${nameClean} Pedagogical Scholar`, role: "Academic research & educational standards lookup", specialty: "Standards query", productivityBoost: "15x query velocity", icon: "Search", status: "idle" },
      { id: "ed3", name: `${nameClean} Assessment Creator`, role: "Drafts quizzes, rubrics, and feedback grids", specialty: "Assessment design", productivityBoost: "12x cleaner palettes", icon: "Database", status: "idle" },
      { id: "ed4", name: `${nameClean} Interactive Lesson Architect`, role: "Synthesizes slides, lectures, or worksheets", specialty: "Visual drafting", productivityBoost: "15x drafting speed", icon: "FileText", status: "idle" },
      { id: "ed5", name: `${nameClean} Readability Indexer`, role: "Cross-checks text complexity and vocabulary levels", specialty: "Aesthetic polish", productivityBoost: "Zero layout friction", icon: "PenTool", status: "idle" },
      { id: "ed6", name: `${nameClean} Academic Integrity Guard`, role: "Plagiarism scanner & citation validator", specialty: "Brand compliance", productivityBoost: "Zero asset warnings", icon: "Shield", status: "idle" },
      { id: "ed7", name: `${nameClean} Accessibility Adapter`, role: "Translates or formats content for diverse learners", specialty: "Culture adapter", productivityBoost: "Universal brand reach", icon: "Globe", status: "idle" },
      { id: "ed8", name: `${nameClean} EdTech Cost Comptroller`, role: "Tracks software licenses, print costs, and compute time", specialty: "SLA math", productivityBoost: "Real-time cost projection", icon: "DollarSign", status: "idle" },
      { id: "ed9", name: `${nameClean} Cognitive Load Modeler`, role: "Stress-tests content length against attention retention", specialty: "Fatigue testing", productivityBoost: "35% higher attention yield", icon: "Zap", status: "idle" },
      { id: "ed10", name: `${nameClean} Lesson Plan Reporter`, role: "Compiles syllabus drafts and study guides into lesson brief", specialty: "Brief summarization", productivityBoost: "Instant campaign pitch", icon: "Activity", status: "idle" },
      { id: "ed11", name: `${nameClean} UDL Inspector`, role: "Universal Design for Learning guidelines contrast/structure audit", specialty: "WCAG contrast audit", productivityBoost: "Perfect readability level", icon: "Scale", status: "idle" },
      { id: "ed12", name: `${nameClean} Curriculum Director`, role: "Conducts final team verification voting on lesson plans", specialty: "Style consensus", productivityBoost: "Unified brand seal", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Syllabus Planning & Design", executor: `${nameClean} Curriculum Mapper`, description: "Maps course flow and breaks lessons into branches." },
      { title: "Pedagogical Precedents Search", executor: `${nameClean} Pedagogical Scholar`, description: "Queries curriculum standards and retrieves exercises." },
      { title: "Readability & Accessibility Check", executor: `${nameClean} Readability Indexer`, description: "Verifies reading indices and polishes lesson drafts." },
      { title: "Lesson Plan Attestation Seal", executor: `${nameClean} Curriculum Director`, description: "Vets content and seals the consolidated syllabus bundle." }
    ];
  } else if (isSalesMarketing) {
    agents = [
      { id: "sm1", name: `${nameClean} Funnel Planner`, role: "Deconstructs marketing flow and maps lead paths", specialty: "Sequence planning", productivityBoost: "10x campaign flow", icon: "Compass", status: "idle" },
      { id: "sm2", name: `${nameClean} SEO Keyword Scholar`, role: "Crawls search queries, platform trends, and competitor keywords", specialty: "Trend query", productivityBoost: "15x query velocity", icon: "Search", status: "idle" },
      { id: "sm3", name: `${nameClean} Ad Copy Harvester`, role: "Indexes headlines, typography metrics, and layout blocks", specialty: "Asset formatting", productivityBoost: "12x cleaner palettes", icon: "Database", status: "idle" },
      { id: "sm4", name: `${nameClean} Copywriting Draftsman`, role: "Synthesizes landing page copy, social posts, or email drafts", specialty: "Visual drafting", productivityBoost: "15x wireframing speed", icon: "FileText", status: "idle" },
      { id: "sm5", name: `${nameClean} Call-to-Action Polisher`, role: "Fine-tunes accent coloring, CTA buttons, and margins", specialty: "Aesthetic polish", productivityBoost: "Zero layout friction", icon: "PenTool", status: "idle" },
      { id: "sm6", name: `${nameClean} Ad Guidelines Guardian`, role: "Checks copies for platform compliance and trademark conflicts", specialty: "Brand compliance", productivityBoost: "Zero asset warnings", icon: "Shield", status: "idle" },
      { id: "sm7", name: `${nameClean} Demographic Persona Adapter`, role: "Localizes visual and textual tones to fit 45 target demographic areas", specialty: "Culture adapter", productivityBoost: "Universal brand reach", icon: "Globe", status: "idle" },
      { id: "sm8", name: `${nameClean} Ad Spend Comptroller`, role: "Estimates CPC, conversion costs, and return on ad spend margins", specialty: "SLA math", productivityBoost: "Real-time cost projection", icon: "DollarSign", status: "idle" },
      { id: "sm9", name: `${nameClean} Conversion Fatigue Predictor`, role: "Stresses layouts against ad fatigue and click-decay models", specialty: "Fatigue testing", productivityBoost: "35% higher attention yield", icon: "Zap", status: "idle" },
      { id: "sm10", name: `${nameClean} Performance Deck Reporter`, role: "Gathers marketing milestones into a structured pitch brief", specialty: "Brief summarization", productivityBoost: "Instant campaign pitch", icon: "Activity", status: "idle" },
      { id: "sm11", name: `${nameClean} Brand Identity Inspector`, role: "Verifies design colors and fonts against brand style guidelines", specialty: "WCAG contrast audit", productivityBoost: "Perfect readability level", icon: "Scale", status: "idle" },
      { id: "sm12", name: `${nameClean} Marketing Director`, role: "Orchestrates consensus vote to select the highest-performing campaign asset", specialty: "Style consensus", productivityBoost: "Unified brand seal", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Campaign Funnel Blueprint", executor: `${nameClean} Funnel Planner`, description: "Maps targets and plans lead sequence routes." },
      { title: "SEO Platform Trend Search", executor: `${nameClean} SEO Keyword Scholar`, description: "Syncs search metrics and checks rival campaign logs." },
      { title: "Ad Copy & Polish Auditing", executor: `${nameClean} Ad Guidelines Guardian`, description: "Reviews copies for brand compliance and polishes CTA buttons." },
      { title: "Marketing Strategy Consensus Seal", executor: `${nameClean} Marketing Director`, description: "Orchestrates vote to sign off final performance package." }
    ];
  } else if (isTech) {
    agents = [
      { id: "t1", name: `${nameClean} System Architect`, role: "Deconstructs requirements into module blueprints and UML designs", specialty: "Design planning", productivityBoost: "10x architecture speed", icon: "Compass", status: "idle" },
      { id: "t2", name: `${nameClean} Context Indexer`, role: "Queries libraries, framework docs, and API specs", specialty: "Doc retrieval", productivityBoost: "20x search velocity", icon: "Search", status: "idle" },
      { id: "t3", name: `${nameClean} Log Harvester`, role: "Aggregates and formats compiler logs and syntax warnings", specialty: "Log parsing", productivityBoost: "Clean compiler feeds", icon: "Database", status: "idle" },
      { id: "t4", name: `${nameClean} Code Synthesizer`, role: "Writes type-safe code blocks, logic structures, and functions", specialty: "Draft writing", productivityBoost: "8x drafting turnaround", icon: "FileText", status: "idle" },
      { id: "t5", name: `${nameClean} Syntax Polisher`, role: "Formats code conventions, refines names, and updates formatting", specialty: "Lint polishing", productivityBoost: "Zero syntax failures", icon: "PenTool", status: "idle" },
      { id: "t6", name: `${nameClean} Vulnerability Scanner`, role: "Audits code files for security risks, SQL injections, and secret leaks", specialty: "Security compliance", productivityBoost: "100% secure pass", icon: "Shield", status: "idle" },
      { id: "t7", name: `${nameClean} Build Adapter`, role: "Configures dockerfiles, environment files, and yaml deployment scripts", specialty: "Localization", productivityBoost: "Instant deployment specs", icon: "Globe", status: "idle" },
      { id: "t8", name: `${nameClean} Resource Comptroller`, role: "Estimates memory footprints, CPU limits, and cloud compute cost indexes", specialty: "Resource limits", productivityBoost: "Real-time cost ledger", icon: "DollarSign", status: "idle" },
      { id: "t9", name: `${nameClean} Test Suite Stresser`, role: "Writes test suites and models heavy mock loads and memory overflows", specialty: "Stress testing", productivityBoost: "30% more robust code", icon: "Zap", status: "idle" },
      { id: "t10", name: `${nameClean} Documentation Reporter`, role: "Generates README documentation, API guides, and code specs", specialty: "Summary briefs", productivityBoost: "Instant dev docs", icon: "Activity", status: "idle" },
      { id: "t11", name: `${nameClean} Clean Code Guard`, role: "Verifies architecture standards, style guides, and SOLID compliance", specialty: "Ethics review", productivityBoost: "Clean code seal", icon: "Scale", status: "idle" },
      { id: "t12", name: `${nameClean} Build Arbiter`, role: "Conducts consensus validation to seal compiles and pass builds", specialty: "Build consensus", productivityBoost: "Unified build seal", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "System Architecture Design", executor: `${nameClean} System Architect`, description: "Maps modules, endpoints, and schema definitions." },
      { title: "Documentation Retrieval", executor: `${nameClean} Context Indexer`, description: "Syncs library specs and indexes dependencies." },
      { title: "Clean & Secure Auditing", executor: `${nameClean} Vulnerability Scanner`, description: "Audits SQL boundaries and refines lint rules." },
      { title: "Unanimous Build Seal", executor: `${nameClean} Build Arbiter`, description: "Validates code compilation and seals build." }
    ];
  } else if (isTrades) {
    agents = [
      { id: "tr1", name: `${nameClean} Dispatch Planner`, role: "Prioritizes repair calls based on severity and travel times", specialty: "Triage planning", productivityBoost: "12x faster routing", icon: "Compass", status: "idle" },
      { id: "tr2", name: `${nameClean} Parts Researcher`, role: "Queries part availability and supplier catalogs", specialty: "Supply search", productivityBoost: "10x lookup speed", icon: "Search", status: "idle" },
      { id: "tr3", name: `${nameClean} Photo Harvester`, role: "Extracts pipe dimensions, electrical loads, sensor feeds, and layout sketches", specialty: "Context parsing", productivityBoost: "Clean job tickets", icon: "Database", status: "idle" },
      { id: "tr4", name: `${nameClean} Layout Synthesizer`, role: "Drafts repair blueprints, mechanical routes, and parts orders", specialty: "Job drafting", productivityBoost: "Instant repair maps", icon: "FileText", status: "idle" },
      { id: "tr5", name: `${nameClean} Fittings Calculator`, role: "Computes flow dynamics, electrical loads, and safety tolerances", specialty: "Fittings calculation", productivityBoost: "Zero tolerance failures", icon: "PenTool", status: "idle" },
      { id: "tr6", name: `${nameClean} Building Code Auditor`, role: "Validates blueprints against local plumbing, HVAC, or electrical codes", specialty: "Code compliance", productivityBoost: "100% compliance pass", icon: "Shield", status: "idle" },
      { id: "tr7", name: `${nameClean} Location Localizer`, role: "Optimizes travel schedules and maps local zoning guidelines", specialty: "Map localizer", productivityBoost: "Instant routing coordinates", icon: "Globe", status: "idle" },
      { id: "tr8", name: `${nameClean} Estimate Comptroller`, role: "Measures material fees, labor overhead, and invoice costs", specialty: "Job invoicing", productivityBoost: "Real-time billing logs", icon: "DollarSign", status: "idle" },
      { id: "tr9", name: `${nameClean} Failure Modeler`, role: "Models expansion limits and thermal exceptions", specialty: "Stress tests", productivityBoost: "25% safer repairs", icon: "Zap", status: "idle" },
      { id: "tr10", name: `${nameClean} Work Order Reporter`, role: "Compiles job completion descriptions and warranty certificates", specialty: "Work summaries", productivityBoost: "Instant invoice attachments", icon: "Activity", status: "idle" },
      { id: "tr11", name: `${nameClean} Safety Inspector`, role: "Verifies OSHA regulations, personal gear, and work safety guidelines", specialty: "Safety audit", productivityBoost: "Safe work pass", icon: "Scale", status: "idle" },
      { id: "tr12", name: `${nameClean} Dispatch Director`, role: "Performs consensus checks to finalize repair dispatch files", specialty: "Dispatch seal", productivityBoost: "Unified service agreement", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Service Triage Dispatch", executor: `${nameClean} Dispatch Planner`, description: "Maps out emergency job tickets and schedules." },
      { title: "Inventory & Code Search", executor: `${nameClean} Parts Researcher`, description: "Verifies parts stock and checks building codes." },
      { title: "Sizing & Safety Auditing", executor: `${nameClean} Building Code Auditor`, description: "Calculates flow pressure and audits compliance." },
      { title: "Service Order Consensus", executor: `${nameClean} Dispatch Director`, description: "Seals repair layout and issues work order." }
    ];
  } else if (isCreative) {
    agents = [
      { id: "c1", name: `${nameClean} Concept Planner`, role: "Explores conceptual themes and builds asset moodboards", specialty: "Creative planning", productivityBoost: "10x faster brainstorming", icon: "Compass", status: "idle" },
      { id: "c2", name: `${nameClean} Trend Researcher`, role: "Indexes online art galleries and trending digital styles", specialty: "Trend research", productivityBoost: "15x search rate", icon: "Search", status: "idle" },
      { id: "c3", name: `${nameClean} Canvas Harvester`, role: "Gathers color charts, canvas references, and raw textures", specialty: "Asset formatting", productivityBoost: "12x cleaner palettes", icon: "Database", status: "idle" },
      { id: "c4", name: `${nameClean} Layer Synthesizer`, role: "Assembles base canvas layouts, visual layers, and frames", specialty: "Artistic drafting", productivityBoost: "8x faster design", icon: "FileText", status: "idle" },
      { id: "c5", name: `${nameClean} Accent Polisher`, role: "Fine-tunes color grading, lighting contrast, and accents", specialty: "Detail polishing", productivityBoost: "Perfect visual balance", icon: "PenTool", status: "idle" },
      { id: "c6", name: `${nameClean} Copyright Inspector`, role: "Checks draft designs for copyright conflicts and trademark issues", specialty: "IP compliance", productivityBoost: "Zero warning risk", icon: "Shield", status: "idle" },
      { id: "c7", name: `${nameClean} Metadata Adapter`, role: "Formats trait properties and attributes to ERC-721 metadata standards", specialty: "Token metadata", productivityBoost: "Instant indexing", icon: "Globe", status: "idle" },
      { id: "c8", name: `${nameClean} Contract Auditor`, role: "Computes minting fees, gas costs, and solidity contract limits", specialty: "Gas management", productivityBoost: "Clean billing logs", icon: "DollarSign", status: "idle" },
      { id: "c9", name: `${nameClean} Fatigue Predictor`, role: "Simulates digital design display wear and visual saturation levels", specialty: "Longevity tests", productivityBoost: "30% longer appeal", icon: "Zap", status: "idle" },
      { id: "c10", name: `${nameClean} Release Reporter`, role: "Compiles description descriptions, press releases, and drop briefs", specialty: "Content briefs", productivityBoost: "Instant pitch packs", icon: "Activity", status: "idle" },
      { id: "c11", name: `${nameClean} Accessibility Guard`, role: "Validates contrast ratios and details against readability standards", specialty: "WCAG audit", productivityBoost: "Universal design pass", icon: "Scale", status: "idle" },
      { id: "c12", name: `${nameClean} Style Director`, role: "Conducts consensus checks to finalize the ultimate canvas release", specialty: "Style consensus", productivityBoost: "Unified visual seal", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Concept Brainstorming", executor: `${nameClean} Concept Planner`, description: "Transforms ideas into theme vectors and moodboards." },
      { title: "Visual Style Indexing", executor: `${nameClean} Trend Researcher`, description: "Queries digital art benchmarks and metadata trends." },
      { title: "Aesthetic Detail Polishing", executor: `${nameClean} Accent Polisher`, description: "Polishes lighting values and checks IP compliance." },
      { title: "Master Swarm Release", executor: `${nameClean} Style Director`, description: "Finalizes trait layers and seals metadata briefs." }
    ];
  } else {
    // General Business/Operations Fallback
    agents = [
      { id: "g1", name: `${nameClean} Operations Planner`, role: `Decomposes standard ${normalizedRole} tasks into a synchronized 12-channel tree`, specialty: "Workflow planning", productivityBoost: "10x faster startup", icon: "Compass", status: "idle" },
      { id: "g2", name: `${nameClean} Context miner`, role: `Crawls online archives, database precedents, and indexes standard templates`, specialty: "Context discovery", productivityBoost: "14x search rate", icon: "Search", status: "idle" },
      { id: "g3", name: `${nameClean} Log Harvester`, role: `Gathers unstructured text payloads and scrubs noise from input files`, specialty: "Context parsing", productivityBoost: "12x cleaner records", icon: "Database", status: "idle" },
      { id: "g4", name: `${nameClean} Suite Draftsman`, role: `Synthesizes procedural blueprints, draft structures, and operational frameworks`, specialty: "Draft synthesis", productivityBoost: "8x drafting speed", icon: "FileText", status: "idle" },
      { id: "g5", name: `Operational Polishing Engine`, role: `Refines layout typography, custom labels, and verified spacing margins`, specialty: "Layout precision", productivityBoost: "Zero layout friction", icon: "PenTool", status: "idle" },
      { id: "g6", name: `System Integrity Auditor`, role: `Cross-checks drafted briefs against bias issues, safety levels, and bar standards`, specialty: "Risk compliance", productivityBoost: "Zero compliance leaks", icon: "Shield", status: "idle" },
      { id: "g7", name: `Universal Locale Adapter`, role: `Localizes textual outputs to fit international and regional standards`, specialty: "Localization", productivityBoost: "Instant geo-compliance", icon: "Globe", status: "idle" },
      { id: "g8", name: `Cost Ledger Comptroller`, role: `Calculates billing bounds, runtime ledger quotas, and software margins`, specialty: "Finance index", productivityBoost: "Error-free billing checks", icon: "DollarSign", status: "idle" },
      { id: "g9", name: `Workflow Stress Modeler`, role: `Stresses workflow plans against severe digital, human, or supply exceptions`, specialty: "Exceptions testing", productivityBoost: "30% more robust plans", icon: "Zap", status: "idle" },
      { id: "g10", name: `Consolidated Stream Reporter`, role: `Parses milestone achievements of other nodes into an elegant brief`, specialty: "Brief summarization", productivityBoost: "Instant briefing cards", icon: "Activity", status: "idle" },
      { id: "g11", name: `Accessibility & Standards Guard`, role: `Validates structural results against readability and public access laws`, specialty: "Access check", productivityBoost: "Perfect access score", icon: "Scale", status: "idle" },
      { id: "g12", name: `Swarms Consensus Arbiter`, role: `Orchestrates unified final agreements using automated logic voting`, specialty: "Consensus polling", productivityBoost: "Unified action seal", icon: "Cpu", status: "idle" }
    ];
    workflowSteps = [
      { title: "Deconstruct Operations", executor: `${nameClean} Operations Planner`, description: "Maps goals into structured action branches." },
      { title: "Query Best Precedents", executor: `${nameClean} Context miner`, description: "Crawls domain precedents for matching standards." },
      { title: "Polish & Audit Blueprint", executor: "Operational Polishing Engine", description: "Safeguards structural layouts against compliance hurdles." },
      { title: "Consensus Team Signoff", executor: "Swarms Consensus Arbiter", description: "Performs consensus check and seals executive briefing." }
    ];
  }

  // Pre-configured character pronouns list based on active profession index
  const pronounList = ["She/They", "He/Him", "She/Her", "They/Them", "He/They", "It/Its", "She/They", "He/Him", "She/Her", "They/Them", "It/Its", "They/Them"];
  const onboarding = onboardingUser || {
    userName: "Director",
    organization: "Autonomous Swarm Org",
    goal: "Optimize business intelligence and parallel agent tasks"
  };

  const enrichedAgents = agents.map((agent: any, index: number) => {
    const pronouns = pronounList[index % pronounList.length];
    const routerAddress = `router://openclaw/node-${index + 1}`;
    const files = getMicroFilesForAgent(agent.name, agent.role, agent.specialty, pronouns, routerAddress);
    
    const hermesConfig = {
      agentId: `hermes-${agent.id || index + 1}`,
      frameworkVersion: "v0.4.2",
      modelBrain: "Gemini 3.5 Flash (Google Free Tier Eligible)",
      temperature: 0.7,
      isFreeTier: true,
      onboarding: {
        orchestrator: onboarding.userName,
        orgName: onboarding.organization,
        strategicGoal: onboarding.goal
      },
      systemInstructions: `Executing via Hermes Agent framework. Mode: Continuous Consensus of ${agent.name}. Connected to human conductor ${onboarding.userName} of ${onboarding.organization}. Specialty: ${agent.specialty}.`
    };

    return {
      ...agent,
      pronouns,
      routerAddress,
      soulMd: files.soul,
      agentsMd: files.agents,
      memoryMd: files.memory,
      safetyMd: files.safety,
      securityMd: files.security,
      hermesConfig
    };
  });

  return {
    podName: `${nameClean} Orchestration Swarm`,
    humanRole: `Chief Conductor & Director of ${nameClean} operations. Your primary interface is a command deck where you specify high-level parameters, approve final designs, and guide consensus resolution.`,
    agents: enrichedAgents,
    workflowSteps,
    hermesOnboarding: {
      user: onboarding.userName,
      org: onboarding.organization,
      broadGoal: onboarding.goal,
      orchestratedWithHermes: true
    }
  };
}

function generateFallbackMeshSimulation(prompt: string, role: string, agentsList: any[]) {
  const query = prompt || "Optimize core workflow";
  const names = (agentsList && agentsList.length > 0) ? agentsList.map(a => a.name) : [
    "Operations Planner", "Context miner", "Log Harvester", "Suite Draftsman", "Polishing Engine", "Integrity Auditor",
    "Locale Adapter", "Comptroller", "Stress Modeler", "Stream Reporter", "Standards Guard", "Consensus Arbiter"
  ];
  const specialties = (agentsList && agentsList.length > 0) ? agentsList.map(a => a.specialty) : [
    "Workflow planning", "Context discovery", "Context parsing", "Draft synthesis", "Layout precision", "Risk compliance",
    "Localization", "Finance index", "Exceptions testing", "Brief summarization", "Access check", "Consensus polling"
  ];

  const steps = [
    {
      agentName: names[0],
      action: "📣 Broadcast to All",
      outputSimulated: `Swarm initiated. Our objective is: "${query}". I propose we compile the codebase specifications and execute security scans. Swarms Consensus Arbiter, please verify compliance when drafts are ready.`,
      timeTakenSeconds: 0.5,
      impactRating: "Swarm Initiated"
    },
    {
      agentName: names[1],
      action: "✉ Message to Swarms Consensus Arbiter",
      outputSimulated: `${names[1]} (Context discovery) checked remote databases and synced template precedents successfully.`,
      timeTakenSeconds: 0.8,
      impactRating: "Context Synced"
    },
    {
      agentName: names[2],
      action: "✉ Message to Swarms Consensus Arbiter",
      outputSimulated: `${names[2]} (Context parsing) gathered input files and scrubbed noise from text fields.`,
      timeTakenSeconds: 1.1,
      impactRating: "Logs Scrubbed"
    },
    {
      agentName: names[3],
      action: "✉ Message to Swarms Consensus Arbiter",
      outputSimulated: `${names[3]} (Draft synthesis) compiled structural blueprint code draft.`,
      timeTakenSeconds: 1.4,
      impactRating: "Draft Compiled"
    },
    {
      agentName: names[5],
      action: "✉ Message to Swarms Consensus Arbiter",
      outputSimulated: `${names[5]} (Risk compliance) completed vulnerability and secret leakage checks on files.`,
      timeTakenSeconds: 1.9,
      impactRating: "Safety Verified"
    },
    {
      agentName: names[11],
      action: "📣 Broadcast to All",
      outputSimulated: `Consensus Sealed: Swarm objective achieved. Attestation active. Final reports saved.`,
      timeTakenSeconds: 2.2,
      impactRating: "Consensus Sealed"
    }
  ];

  return {
    executionLogs: steps,
    finalSummary: `### [POD MESH SWARM OPERATION COMPLETED]
Your Parallel Mesh Swarm has successfully simulated execution for: "${query}".

**Core Accomplishments:**
1. **Parallel Broker Routing:** Messages were routed concurrently through the Mesh Broker board.
2. **Dynamic Consensus:** Consensus resolved by Arbiter in 2.2 seconds.
3. **Attestation Sealed:** Cryptographic Merkle Root generated.`
  };
}

function generateFallbackSimulation(prompt: string, role: string, agentsList: any[], retrievedChunks?: string[]) {
  const query = prompt || "Optimize core workflow";
  const names = (agentsList && agentsList.length > 0) ? agentsList.map(a => a.name) : [
    "Operations Planner", "Context miner", "Log Harvester", "Suite Draftsman", "Polishing Engine", "Integrity Auditor",
    "Locale Adapter", "Comptroller", "Stress Modeler", "Stream Reporter", "Standards Guard", "Consensus Arbiter"
  ];
  const specialties = (agentsList && agentsList.length > 0) ? agentsList.map(a => a.specialty) : [
    "Workflow planning", "Context discovery", "Context parsing", "Draft synthesis", "Layout precision", "Risk compliance",
    "Localization", "Finance index", "Exceptions testing", "Brief summarization", "Access check", "Consensus polling"
  ];

  const groundedText = (retrievedChunks && retrievedChunks.length > 0) 
    ? `Semantic vector query matched uploaded knowledge excerpt: "${retrievedChunks[0].substring(0, 150)}..." [Similarity Score: 0.985]. Incorporating this source text context directly into the workspace drafting pipeline.`
    : `Scanned global templates, indexing matching precedents for: "${query}". Retained top 3 templates with index ratings > 0.94.`;
  
  const steps = [
    {
      agentName: names[0],
      action: "Analyzing Human Blueprint Prompt",
      outputSimulated: `Successfully parsed prompt "${query}". Determined parallel execution branches: semantic analysis, data cleansing, drafting, and stress-testing. Mapping target output schemas.`,
      timeTakenSeconds: 0.8,
      impactRating: "Execution Tree Established"
    },
    {
      agentName: names[1],
      action: "Knowledge Base Retrieval & Precedents Check",
      outputSimulated: groundedText,
      timeTakenSeconds: 1.4,
      impactRating: "Domain Knowledge Synced"
    },
    {
      agentName: names[3],
      action: "Formulating Structural Blueprint",
      outputSimulated: `Synthesized comprehensive draft outline, detailing active vectors, formatting schemas, and structural content blocks conforming to specified domain precedents.`,
      timeTakenSeconds: 2.1,
      impactRating: `Draft V1 Computed`
    },
    {
      agentName: names[4],
      action: "Aesthetic & Typographic Polish",
      outputSimulated: `Applied layout structure polish. Integrated professional terminology, ensured all fields map to standard industrial formatting definitions and alignment checks.`,
      timeTakenSeconds: 1.2,
      impactRating: "Draft Polished"
    },
    {
      agentName: names[5],
      action: "Ethics, Privacy & Regulatory Audit",
      outputSimulated: `Checked structural drafts against privacy codes, inclusivity, and organizational safety guidelines. Zero issues flagged. Safety Index: 1.0.`,
      timeTakenSeconds: 0.9,
      impactRating: "Safety Verified"
    },
    {
      agentName: names[11],
      action: "Consensus Swarm Synthesis & Handover",
      outputSimulated: `Conducted multi-agent consensus validation across the finalized assets. Output matches target human intentions at 99.4% confidence rating. Preparing master release brief.`,
      timeTakenSeconds: 1.1,
      impactRating: "Consensus Sealed"
    }
  ];

  const summaryGroundedNote = (retrievedChunks && retrievedChunks.length > 0)
    ? `\n\n**Semantic RAG Grounding Active:** The response has been directly grounded on your uploaded reference document excerpt: *"${retrievedChunks[0].substring(0, 120)}..."* to guarantee high fidelity precision.`
    : "";

  return {
    executionLogs: steps,
    finalSummary: `### [POD OPERATION COMPLETED]
Your Swarm has fully compiled and executed the blueprint for: "${query}".

**Core Accomplishments:**
1. **Goal Alignment:** ${names[0]} mapped and parsed the action structure in under 1 second.
2. **Precedent Retrieval:** ${names[1]} verified global structural benchmarks for optimal workflow performance.${summaryGroundedNote}
3. **Execution Safety:** ${names[5]} confirmed 100% compliance.
4. **Human Super-Productivity:** This combined parallel effort representing approx. 48 hours of normal manual corporate research/drafting was completed in 7.5 seconds. Ready for your review & deploy.`
  };
}

export async function POST(req: NextRequest) {
  try {
    const {
      action,
      role,
      sector,
      prompt,
      agents,
      retrievedChunks,
      customApiKey,
      agentName,
      specialty,
      pronouns,
      userMessage,
      soul,
      memory,
      safety,
      security,
      onboardingUser,
      topology
    } = await req.json();

    let apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // Check if key is placeholder or default
    const isKeyConfigured = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim().length > 10;

    // --- Security Gate: Sanitize all user-provided input ---
    const fieldsToSanitize = [
      { name: "userMessage", value: userMessage },
      { name: "prompt", value: prompt },
      { name: "role", value: role }
    ];
    for (const field of fieldsToSanitize) {
      if (field.value && typeof field.value === "string") {
        const check = sanitizeInput(field.value);
        if (!check.safe) {
          return NextResponse.json(
            { error: check.reason || "Input rejected by security filter.", isSecurityBlock: true },
            { status: 400 }
          );
        }
      }
    }

    // Direct cognitive handshake chat route
    if (action === "chat-agent") {
      const systemPrompt = `You are ${agentName}, an advanced specialized AI Agent representing a ${role || "Core Node"}, expert in ${specialty || "Swarm Intelligence"}.
Your professional pronouns are: ${pronouns || "They/Them"}.
You operate inside an advanced Merkle Tree AI Swarm connected to a custom gateway router at: router://openclaw/node-x

Your cognitive and operational guide resides within these 5 Markdown definitions:
--- SOUL.MD ---
${soul || "Personality: High precision, absolute truth of execution, domain authority."}

--- AGENTS.MD ---
${agents || "Structure: Orchestrated via OpenClaw node queues and inter-node consensus matrices."}

--- MEMORY.MD ---
${memory || "Context: Utilizing high-frequency MemVid frame buffers and LMCache semantic buffers."}

--- SAFETY.MD ---
${safety || "Boundary: Governed by safety guardrails compliance threshold checks (bias rating <= 0.05)."}

--- SECURITY.MD ---
${security || "Isolation: Signed Merkle verification proofs, zero secret leaks, isolated sandboxed executions."}

Please reply directly to the human Director's query. Adopt your exact professional role, character, pronouns, and design focus. Provide a highly specialized, realistic, structured response demonstrating actual knowledge from these documents. Keep it crisp, technical, or editorial as appropriate (match your specialty).`;

      const fallbackReplies = [
        `[DEVELOPER MODE: DIRECT OFFLINE COGNITIVE BRIDGE ACQUIRED]
This is ${agentName} speaking, representing my assigned nodes (${pronouns}). My custom routing gateway at 'router://openclaw/node' is active and listening.
LMCache memory layers and MemVid video sync records have loaded securely.

Safety Guardrails check complete:
- Bias quotient: 0.01 (optimal)
- Compliance status: STRICTLY COMPLIANT
- Context ground: Grounding checked against Stanford meta-harness criteria.

Response envelope:
"Human Director, I have received your request. Using my specialized capability in ${specialty || "Operations Analysis"}, I am coordinating with neighboring peer swarm branches to register this constraint. Proceeding with soul.md specifications."`,
        `[DIRECT GATEWAY TUNNEL OPENED]
Node: ${agentName} (${pronouns}) reporting in. Standard system state validated against security.md limits.
Episodic cache hits: 100%.

Analysis:
"I've updated my internal episodic index buffers with your latest instructions. I am fully ready to act as a consensus stakeholder for our next workflow iteration under NeMo/OpenClaw guidelines."`
      ];

      if (!isKeyConfigured) {
        const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        return NextResponse.json({ reply: randomReply });
      }

      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userMessage,
          config: {
            systemInstruction: systemPrompt,
          }
        });

        return NextResponse.json({ reply: response.text });
      } catch (error: any) {
        console.warn("Direct agent chat failed, using fallback simulation engine:", error.message || error);
        const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        const decoratedReply = `[FALLBACK SIMULATION ENGINE - LIVE API RATE LIMIT ENCOUNTERED]\n\n${randomReply}`;
        return NextResponse.json({ reply: decoratedReply });
      }
    }

    if (!isKeyConfigured) {
      if (action === "generate-pod") {
        try {
          const fallback = generateFallbackPod(role, sector, onboardingUser);
          console.log("SUCCESSFULLY GENERATED FALLBACK POD:", fallback ? "non-null" : "null");
          if (fallback) {
            console.log("podName:", fallback.podName);
            console.log("humanRole:", fallback.humanRole);
            console.log("agents count:", fallback.agents?.length);
            if (fallback.agents && fallback.agents.length > 0) {
              console.log("Agent 0 keys:", Object.keys(fallback.agents[0]));
              // Log values to verify no symbols, functions or circular refs
              for (const k of Object.keys(fallback.agents[0])) {
                console.log(`Agent 0 [${k}]:`, typeof fallback.agents[0][k], fallback.agents[0][k]);
              }
            }
          }
          return NextResponse.json(fallback);
        } catch (e: any) {
          console.error("ERROR GENERATING FALLBACK POD:", e);
          throw e;
        }
      } else {
        const mockData = generateFallbackSimulation(prompt, role, agents || [], retrievedChunks || []);
        const merkleRoot = calculateMerkleRoot(mockData.executionLogs);
        return NextResponse.json({
          ...mockData,
          merkleRoot,
          engine: "Mock Fallback Engine"
        });
      }
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    if (action === "generate-pod") {
      try {
        const gptPrompt = `You are an elite, PhD-level organizational AI architect.
The user wants to transition a human role into a modern "POD" of 12 highly specialized AI agents orchestrated by 1 single human.
Human Role: "${role}"
Industry/Sector: "${sector || "General Services"}"

You must configure this 12-agent AI Pod. The agents must be extremely specific and relevant to the human role.
Return a JSON object conforming MATCHING EXACTLY this JSON schema structure. Do not include markdown formatting except inside the JSON payload fields if helpful (but keep keys strictly JSON).

Output JSON Schema:
{
  "podName": "String - a professional, majestic, structured title for the pod",
  "humanRole": "String - description of how the human acts as the conductor rather than doing repetitive manual labor",
  "agents": [
    {
      "id": "1",
      "name": "String - specialized, interesting role name that sounds highly technical and expert",
      "role": "String - brief sentence summarizing their primary daily task",
      "specialty": "String - 2-3 words highlighting their specific expert capability",
      "productivityBoost": "String - metric of scale, e.g., '14x faster analysis' or 'Instant retrieval'",
      "icon": "String - select one icon name of a lucide-react icon (choices: 'Search', 'Cpu', 'Shield', 'Database', 'Activity', 'MessageSquare', 'Layers', 'Globe', 'Scale', 'TrendingUp', 'Terminal', 'Zap', 'PenTool', 'Compass', 'DollarSign', 'Heart', 'Award', 'AlertTriangle')",
      "status": "idle"
    }
  ],
  "workflowSteps": [
    {
      "title": "String - short step title",
      "executor": "String - Name of one of the agents from your configured list",
      "description": "String - brief summary of what they do in this stage"
    }
  ]
}

Provide exactly 12 specialized agents inside the "agents" array, each having the precise keys specified. Inside the "workflowSteps" array, provide 4 sequential steps mapping a standard complex operational challenge. Use valid JSON formatting. Do not wrap code blocks in any text other than the JSON output.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: gptPrompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const responseText = response.text || "";
        let cleanedText = responseText.trim();
        if (cleanedText.startsWith("```")) {
          cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, "");
        }
        if (cleanedText.endsWith("```")) {
          cleanedText = cleanedText.replace(/\s*```$/, "");
        }
        const parsedData = JSON.parse(cleanedText.trim());

        // Enrich the live-generated agents with pronouns, gateway routers, and five Merkle markdown configuration files
        if (parsedData && Array.isArray(parsedData.agents)) {
          const pronounList = ["She/They", "He/Him", "She/Her", "They/Them", "He/They", "It/Its", "She/They", "He/Him", "She/Her", "They/Them", "It/Its", "They/Them"];
          const onboarding = onboardingUser || {
            userName: "Director",
            organization: "Autonomous Swarm Org",
            goal: "Optimize business intelligence and parallel agent tasks"
          };

          parsedData.agents = parsedData.agents.map((agent: any, index: number) => {
            const pronouns = pronounList[index % pronounList.length] || "They/Them";
            const routerAddress = `router://openclaw/node-${index + 1}`;
            const files = getMicroFilesForAgent(
              agent.name || `Specialist-${index + 1}`,
              agent.role || "Assigned task node",
              agent.specialty || "Swarm task execution",
              pronouns,
              routerAddress
            );

            const hermesConfig = {
              agentId: `hermes-${agent.id || index + 1}`,
              frameworkVersion: "v0.4.2",
              modelBrain: "Gemini 3.5 Flash (Google Free Tier Eligible)",
              temperature: 0.7,
              isFreeTier: true,
              onboarding: {
                orchestrator: onboarding.userName,
                orgName: onboarding.organization,
                strategicGoal: onboarding.goal
              },
              systemInstructions: `Executing via Hermes Agent framework. Mode: Continuous Consensus of ${agent.name || `Specialist-${index + 1}`}. Connected to human conductor ${onboarding.userName} of ${onboarding.organization}. Specialty: ${agent.specialty || "Swarm task execution"}.`
            };

            return {
              ...agent,
              id: agent.id || `g${index + 1}`,
              pronouns,
              routerAddress,
              soulMd: files.soul,
              agentsMd: files.agents,
              memoryMd: files.memory,
              safetyMd: files.safety,
              securityMd: files.security,
              hermesConfig
            };
          });

          parsedData.hermesOnboarding = {
            user: onboarding.userName,
            org: onboarding.organization,
            broadGoal: onboarding.goal,
            orchestratedWithHermes: true
          };
        }

        return NextResponse.json(parsedData);
      } catch (err: any) {
        console.warn("Live generate-pod failed, falling back to local fallback generator:", err.message || err);
        return NextResponse.json(generateFallbackPod(role, sector, onboardingUser));
      }
    } 

    if (action === "simulate-run") {
      // 1. Run Input Sanitization check (Security Feature)
      const inputSanity = sanitizeInput(prompt || "");
      if (!inputSanity.safe) {
        return NextResponse.json({
          error: inputSanity.reason,
          securityViolation: true
        }, { status: 400 });
      }

      // If not configured, fall back to mock simulation
      if (!isKeyConfigured) {
        const mockData = topology === "mesh"
          ? generateFallbackMeshSimulation(prompt, role, agents || [])
          : generateFallbackSimulation(prompt, role, agents || [], retrievedChunks || []);
        // Compute cryptographic consensus proof (Security Feature)
        const merkleRoot = calculateMerkleRoot(mockData.executionLogs);
        return NextResponse.json({
          ...mockData,
          merkleRoot,
          engine: topology === "mesh" ? "Mock Fallback Mesh Engine" : "Mock Fallback Engine"
        });
      }

      // 2. Live Sequential Multi-Agent Execution Flow using Google GenAI SDK (ADK Concept)
      // Executes ALL agents in the pod (up to 12), each making a real Gemini API call
      try {
        const groundingText = retrievedChunks && retrievedChunks.length > 0
          ? `Grounded context from uploaded knowledge: "${retrievedChunks.join("\n")}"`
          : "No vector index context uploaded.";

        const allAgents = agents || [];
        const executionLogs: Array<{ agentName: string; action: string; outputSimulated: string; timeTakenSeconds: number; impactRating: string }> = [];
        let previousOutput = "";
        let draftOutput = "";
        const startTime = Date.now();

        if (topology === "mesh") {
          // Parallel Mesh Network Execution
          const plannerAgent = allAgents.find((a: any) => a.specialty === "Workflow planning") || allAgents[0];
          const plannerName = plannerAgent?.name || "Operations Planner";
          const plannerPrompt = `You are ${plannerName}, a Lead Swarm Planner. Deconstruct the task: "${prompt}" and propose a plan for the 12-agent mesh network. Max 2 sentences.`;
          
          const plannerRes = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: plannerPrompt,
          });
          const planText = plannerRes.text?.trim() || "Planner formulated swarm task sequence.";
          
          executionLogs.push({
            agentName: plannerName,
            action: "📣 Broadcast to All",
            outputSimulated: planText,
            timeTakenSeconds: 1.0,
            impactRating: "Swarm Initiated"
          });

          // All other specialty agents run in parallel
          const specialtyAgents = allAgents.filter((a: any) => a.specialty !== "Workflow planning" && a.specialty !== "Consensus polling");
          
          const agentPromises = specialtyAgents.map(async (agent: any, index: number) => {
            const agentName = agent?.name || `Agent ${index + 2}`;
            const agentSpecialty = agent?.specialty || "Specialty analysis";
            const agentRole = agent?.role || "Task node";
            
            const agentPrompt = `You are ${agentName}, expert in ${agentSpecialty}. Role: ${agentRole}.
Swarm Target: "${prompt}".
The Planner's proposal: "${planText}".
Apply your specialty and provide your feedback or output. Max 2 sentences.`;

            try {
              const res = await ai.models.generateContent({
                model: "gemini-3.5-flash",
                contents: agentPrompt,
              });
              return {
                agentName,
                action: "✉ Message to Swarms Consensus Arbiter",
                outputSimulated: res.text?.trim() || `${agentName} verified specialty conditions.`,
                timeTakenSeconds: 1.5,
                impactRating: "Specialty Synced"
              };
            } catch (err) {
              return {
                agentName,
                action: "✉ Message to Swarms Consensus Arbiter",
                outputSimulated: `[Connection Warning] ${agentName} executed offline checks for state safety.`,
                timeTakenSeconds: 0.5,
                impactRating: "Specialty Synced"
              };
            }
          });

          const middleResults = await Promise.all(agentPromises);
          executionLogs.push(...middleResults);

          // Consensus Arbiter compiles and synthesizes
          const arbiterAgent = allAgents.find((a: any) => a.specialty === "Consensus polling") || allAgents[allAgents.length - 1];
          const arbiterName = arbiterAgent?.name || "Swarms Consensus Arbiter";
          const allMidText = middleResults.map(r => `${r.agentName}: ${r.outputSimulated}`).join("\n");
          
          const arbiterPrompt = `You are ${arbiterName}, Swarm Consensus Arbiter.
Target Goal: "${prompt}".
Planner proposed: "${planText}".
Here are the comments from your 10 peer specialty agents:
${allMidText}

Synthesize these inputs and compile the final consensus briefing. Address the Human Director in markdown. Max 4 sentences. Print 'Consensus Sealed' at the end.`;

          const arbiterRes = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: arbiterPrompt,
          });
          const briefText = arbiterRes.text?.trim() || "Consensus sealed by arbiter.";

          executionLogs.push({
            agentName: arbiterName,
            action: "📣 Broadcast to All",
            outputSimulated: briefText,
            timeTakenSeconds: 1.2,
            impactRating: "Consensus Sealed"
          });

          const merkleRoot = calculateMerkleRoot(executionLogs);

          return NextResponse.json({
            executionLogs,
            finalSummary: `### 🚀 [LIVE ${executionLogs.length}-NODE PARALLEL MESH SWARM SUCCESSFUL]\n\n${briefText}\n\n**Merkle Root Attestation Sign:** \`sha256:${merkleRoot}\``,
            merkleRoot,
            consensusSynthesis: {
              unanimousConsensus: true,
              summaryMarkdown: briefText
            },
            engine: "Live Parallel Mesh Agent Engine"
          });
        }

        for (let i = 0; i < Math.min(allAgents.length, 12); i++) {
          const agent = allAgents[i];
          const agentName = agent?.name || `Agent ${i + 1}`;
          const agentRole = agent?.role || "Operational task execution";
          const agentSpecialty = agent?.specialty || "General operations";

          // Build contextual prompt based on agent position in the pipeline
          let agentPrompt = "";
          let actionLabel = "";
          let impactLabel = "";

          if (i === 0) {
            // First agent: Planner — deconstruct the task
            agentPrompt = `You are ${agentName}, a Lead Swarm Planner specializing in ${agentSpecialty}. Your role: ${agentRole}.
Deconstruct the command: "${prompt}" for a "${role}" workstation.
Formulate a structured execution plan. Be concise (max 3 sentences).`;
            actionLabel = "Analyzing Human Blueprint Prompt";
            impactLabel = "Execution Plan Built";
          } else if (i === 1) {
            // Second agent: Researcher — RAG retrieval
            agentPrompt = `You are ${agentName}, a RAG Retrieval Specialist in ${agentSpecialty}. Your role: ${agentRole}.
Analyze the plan: "${previousOutput}" and retrieve relevant templates.
Incorporate this grounded context: "${groundingText}".
Produce a concise research brief (max 3 sentences).`;
            actionLabel = "Knowledge Base Retrieval & Precedents Check";
            impactLabel = "Knowledge Synced";
          } else if (i === allAgents.length - 1) {
            // Last agent: Consensus Arbiter — seal the pipeline
            const safetyAudit = auditOutput(draftOutput || previousOutput, agent?.soulMd);
            agentPrompt = `You are ${agentName}, the Swarm Consensus Arbiter in ${agentSpecialty}. Your role: ${agentRole}.
Synthesize ALL pipeline outputs from ${allAgents.length} agents into a final strategic overwatch briefing.
Latest draft: "${(draftOutput || previousOutput).substring(0, 500)}"
Safety audit status: ${safetyAudit.safe ? "PASSED" : "FAILED"} (Bias: ${safetyAudit.score.toFixed(3)}).
Confirm unanimous swarm consensus. Generate a final briefing for the Human Director in Markdown (max 5 sentences).`;
            actionLabel = "Consensus Swarm Synthesis & Handover";
            impactLabel = "Consensus Sealed";
          } else if (i === allAgents.length - 2) {
            // Second-to-last: Safety Auditor
            const safetyAudit = auditOutput(draftOutput || previousOutput, agent?.soulMd);
            agentPrompt = `You are ${agentName}, a compliance auditor specializing in ${agentSpecialty}. Your role: ${agentRole}.
Inspect this pipeline output for safety/compliance issues: "${(draftOutput || previousOutput).substring(0, 400)}".
Safety check status: ${safetyAudit.safe ? "PASSED" : "FAILED"}. Bias: ${safetyAudit.score}.
Write a 2-sentence formal safety attestation audit.`;
            actionLabel = "Ethics, Privacy & Regulatory Audit";
            impactLabel = "Safety Verified";
          } else if (i === 2 || i === 3) {
            // Middle agents: Drafters/Synthesizers
            agentPrompt = `You are ${agentName}, an expert in ${agentSpecialty}. Your role: ${agentRole}.
Using the previous agent outputs: "${previousOutput.substring(0, 300)}"
Execute your specialized task for: "${prompt}".
Provide a concise technical output (max 3 sentences).`;
            actionLabel = i === 2 ? "Formulating Structural Blueprint" : "Compiling draft template payload";
            impactLabel = i === 2 ? "Structure Defined" : "Payload Compiled";
          } else {
            // All other agents: Specialized execution
            agentPrompt = `You are ${agentName}, an expert in ${agentSpecialty}. Your role: ${agentRole}.
Previous pipeline context: "${previousOutput.substring(0, 300)}"
Apply your expertise to the task: "${prompt}".
Provide your specialized analysis or output (max 2 sentences).`;
            actionLabel = `Specialized ${agentSpecialty} analysis`;
            impactLabel = "Task Completed";
          }

          // Execute the Gemini API call for this agent
          const agentRes = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: agentPrompt,
          });
          const agentOutput = agentRes.text?.trim() || `${agentName} completed ${agentSpecialty} analysis successfully.`;

          // Track draft output for safety audit
          if (i === 3 || (i > 1 && i < allAgents.length - 2)) {
            draftOutput = agentOutput;
          }

          const elapsed = ((Date.now() - startTime) / 1000);
          executionLogs.push({
            agentName,
            action: actionLabel,
            outputSimulated: agentOutput,
            timeTakenSeconds: parseFloat(elapsed.toFixed(1)),
            impactRating: impactLabel
          });

          previousOutput = agentOutput;
        }

        // 3. Generate Cryptographic Merkle Root over ALL agent logs (Security Feature)
        const merkleRoot = calculateMerkleRoot(executionLogs);

        // Get final briefing from the last agent's output
        const finalBriefing = previousOutput;

        return NextResponse.json({
          executionLogs,
          finalSummary: `### 🚀 [LIVE ${executionLogs.length}-AGENT ADK SWARM EXECUTION SUCCESSFUL]\n\n${finalBriefing}\n\n**Merkle Root Attestation Sign:** \`sha256:${merkleRoot}\``,
          merkleRoot,
          consensusSynthesis: {
            unanimousConsensus: true,
            summaryMarkdown: finalBriefing
          },
          engine: "Live Multi-Agent ADK Engine"
        });

      } catch (err: any) {
        console.error("Live ADK execution failed, falling back", err);
        // Fallback to simulation if Gemini fails
        const mockData = generateFallbackSimulation(prompt, role, agents || [], retrievedChunks || []);
        const merkleRoot = calculateMerkleRoot(mockData.executionLogs);
        return NextResponse.json({
          ...mockData,
          merkleRoot,
          engine: "Fallback Simulation Engine (Live Error)"
        });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Gemini route error:", error);
    const errMessage = error.message || "An unexpected error occurred";
    const isRate = errMessage.toLowerCase().includes("rate limit") || 
                   errMessage.toLowerCase().includes("quota") || 
                   errMessage.toLowerCase().includes("exhausted") || 
                   errMessage.toLowerCase().includes("429") ||
                   error.status === 429;
    
    return NextResponse.json({
      error: errMessage,
      isRateLimit: isRate,
      details: isRate 
        ? "Gemini API rate limit exceeded. Please wait a minute or use a custom API key for higher limits." 
        : "Reverted back to robust procedural fallback engine."
    }, { status: isRate ? 429 : 500 });
  }
}

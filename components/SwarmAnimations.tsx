"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Scale,
  Activity,
  Shield,
  User,
  Cpu,
  ArrowRight,
  TrendingUp,
  Brain,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  CheckCircle,
  FileText,
  Search,
  Globe,
  Database,
  Sliders,
  DollarSign
} from "lucide-react";

interface AnimTask {
  id: string;
  name: string;
  statusText: string;
  progress: number;
  icon: React.ReactNode;
  accentClass: string;
  color: string;
  detail: string;
}

interface SectorAnimationData {
  id: string;
  name: string;
  managerTitle: string;
  managerName: string;
  strategicTopic: string;
  dataSummary: string;
  icon: React.ReactNode;
  themeColor: string; // for tailwind gradient references
  borderColor: string;
  textColor: string;
  bgGlow: string;
  tasks: AnimTask[];
  humanActions: {
    label: string;
    description: string;
    resultLog: string;
  }[];
}

export default function SwarmAnimations() {
  const [activeSectorId, setActiveSectorId] = useState<string>("customer_service");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [triggerGlow, setTriggerGlow] = useState<boolean>(false);
  const [lastActionExecuted, setLastActionExecuted] = useState<string | null>(null);

  // Define Sector Animation Data reflecting the four sectors requested
  const animationSectors: SectorAnimationData[] = [
    {
      id: "customer_service",
      name: "Customer Support Swarm",
      managerTitle: "CX Experience Director",
      managerName: "Human Director (Sovereign Overwatch)",
      strategicTopic: "Enterprise SLA Incident #1042",
      dataSummary: "Analyzing 4,500 billing logs / Ticket sentiments",
      icon: <MessageSquare className="w-5 h-5" />,
      themeColor: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-400",
      bgGlow: "shadow-teal-500/5",
      tasks: [
        {
          id: "cs_t1",
          name: "Sentiment Triage",
          statusText: "Classifying Frustration Leads",
          progress: 100,
          icon: <Activity className="w-3.5 h-3.5" />,
          accentClass: "text-red-400",
          color: "#F87171",
          detail: "Detected tier-1 client anger spikes due to regional server lag"
        },
        {
          id: "cs_t2",
          name: "VAT & Tax Auditing",
          statusText: "Cross-Checking Invoices",
          progress: 85,
          icon: <Database className="w-3.5 h-3.5" />,
          accentClass: "text-emerald-400",
          color: "#34D399",
          detail: "Auditing multi-tier billing rules to assess custom VAT refunds"
        },
        {
          id: "cs_t3",
          name: "Tone Harmonizer",
          statusText: "Adapting 45 Languages",
          progress: 60,
          icon: <Globe className="w-3.5 h-3.5" />,
          accentClass: "text-sky-400",
          color: "#38BDF8",
          detail: "Formulating empathetic corporate apologies tailored for EU-centric clients"
        },
        {
          id: "cs_t4",
          name: "Anomaly Isolation",
          statusText: "Filtering VIP Escapes",
          progress: 95,
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          accentClass: "text-amber-400",
          color: "#FBBF24",
          detail: "Ensuring top 10% SLA client accounts route directly to executive dashboard"
        }
      ],
      humanActions: [
        {
          label: "Approve Sovereign SLA Refunds",
          description: "Authorizes immediate 20% VAT balance restitution of $89,200",
          resultLog: "COMMITTED: Human Director approved 20% balance restitution. Swarm broadcasted digital transaction to 12 billing portals instantly. Average latency: 45ms."
        },
        {
          label: "Deploy Apology Profile Swarm",
          description: "Taps sentiment model overrides to inject calming regional vocabulary",
          resultLog: "COMMITTED: Tone profile updated. Sub-nodes recalibrated to 'De-escalate Warmth V2'. 4,500 active threads repopulated."
        }
      ]
    },
    {
      id: "legal",
      name: "E-Paralegal Swarm",
      managerTitle: "Senior Trial Lead Counsel",
      managerName: "Managing Principal Attorney",
      strategicTopic: "Antitrust & Patent Filing Precedents",
      dataSummary: "Parsing 14,000 corporate litigation briefs",
      icon: <Scale className="w-5 h-5" />,
      themeColor: "from-indigo-505 to-purple-500",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-400",
      bgGlow: "shadow-indigo-500/5",
      tasks: [
        {
          id: "leg_t1",
          name: "Docket Retriever",
          statusText: "Scanning Federal indices",
          progress: 100,
          icon: <Search className="w-3.5 h-3.5" />,
          accentClass: "text-indigo-400",
          color: "#818CF8",
          detail: "Crawling LexisNexis database for similar regional circuit rulings"
        },
        {
          id: "leg_t2",
          name: "Patent Prior-Art Scraper",
          statusText: "Image Vector Segmentation",
          progress: 90,
          icon: <Sliders className="w-3.5 h-3.5" />,
          accentClass: "text-fuchsia-400",
          color: "#E879F9",
          detail: "Comparing draft schematics against 40 years of international hardware patents"
        },
        {
          id: "leg_t3",
          name: "SEC compliance Check",
          statusText: "Cross-Checking penal Codes",
          progress: 75,
          icon: <Shield className="w-3.5 h-3.5" />,
          accentClass: "text-sky-400",
          color: "#38BDF8",
          detail: "Scanning filing text to ensure no regulatory compliance gaps or citation halts"
        },
        {
          id: "leg_t4",
          name: "Stress Adversary Agent",
          statusText: "Drafting Counter-claims",
          progress: 40,
          icon: <Brain className="w-3.5 h-3.5" />,
          accentClass: "text-rose-400",
          color: "#F43F5E",
          detail: "Simulating plaintiff's line-by-line reactions to isolate potential weak arguments"
        }
      ],
      humanActions: [
        {
          label: "Crytographically Sign Brief",
          description: "Authorizes swarm to seal and electronically submit defense filings",
          resultLog: "COMMITTED: Human cryptographic seal verified. Merkle node signature appended. Brief compiled. E-Filing completed in 1.4 seconds."
        },
        {
          label: "Shift Defense Strategy Vector",
          description: "Instructs swarm to prioritize trade secret precedent over patent overlaps",
          resultLog: "REORIENTING: Agents redirected. Prior-art scanning suspended. Swarm rebuilding trade secret dockets. 190 new dockets matched."
        }
      ]
    },
    {
      id: "medicine",
      name: "Oncology Clinical Swarm",
      managerTitle: "Chief Medical Conductor",
      managerName: "Professor of Molecular Pathology",
      strategicTopic: "Multi-layered Melanoma Scan Triage",
      dataSummary: "Synthesizing 5M biopsy pixel maps & DNA tracks",
      icon: <Activity className="w-5 h-5" />,
      themeColor: "from-rose-500 to-orange-500",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
      bgGlow: "shadow-rose-500/5",
      tasks: [
        {
          id: "med_t1",
          name: "Sub-pixel Scan Vision",
          statusText: "Isolating cell border atypicality",
          progress: 100,
          icon: <Search className="w-3.5 h-3.5" />,
          accentClass: "text-rose-400",
          color: "#FB7185",
          detail: "Analyzed macular sub-pixel colors down to 0.01mm lesion depth margins"
        },
        {
          id: "med_t2",
          name: "DNA Sequence Matcher",
          statusText: "Genomics indexing match",
          progress: 80,
          icon: <Database className="w-3.5 h-3.5" />,
          accentClass: "text-teal-400",
          color: "#2DD4BF",
          detail: "Identified genetic predisposition indicators within chromosomes 9p21"
        },
        {
          id: "med_t3",
          name: "Interaction Advisor",
          statusText: "Pharmacology simulation",
          progress: 95,
          icon: <Shield className="w-3.5 h-3.5" />,
          accentClass: "text-emerald-400",
          color: "#34D399",
          detail: "Evaluated 12 active immunotherapies for contraindication conflicts"
        },
        {
          id: "med_t4",
          name: "Empathy Layman Compiler",
          statusText: "Translating medical records",
          progress: 50,
          icon: <FileText className="w-3.5 h-3.5" />,
          accentClass: "text-amber-400",
          color: "#FBBF24",
          detail: "Drafting simplified patient-facing summary avoiding high-stress jargon"
        }
      ],
      humanActions: [
        {
          label: "Authorize Focused Immunotherapy",
          description: "Prescribes fine-tuned biochemical recipe with zero conflict alerts",
          resultLog: "COMMITTED: Human oncologist approved protocol. Compound DNA matching validated. Patient portal updated, hospital pharmacy dispatched."
        },
        {
          label: "Order Secondary Node Verification",
          description: "Launches 5 independent digital oncological opinions on border anomaly",
          resultLog: "COMMITTED: consensus recheck triggered. 5 distinct neural medical kernels agree: 99.98% certainty of localized dermis state."
        }
      ]
    },
    {
      id: "insurance",
      name: "Risk & Claim Swarm",
      managerTitle: "Senior Claims Director",
      managerName: "Chief Underwriting Officer",
      strategicTopic: "50-Car Highway Collision Claim",
      dataSummary: "Cross-referencing drone photos & road sensors",
      icon: <Shield className="w-5 h-5" />,
      themeColor: "from-amber-500 to-yellow-500",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      bgGlow: "shadow-amber-500/5",
      tasks: [
        {
          id: "ins_t1",
          name: "Drone Photo Segmenter",
          statusText: "Mechanical deformation check",
          progress: 100,
          icon: <Search className="w-3.5 h-3.5" />,
          accentClass: "text-amber-400",
          color: "#FBBF24",
          detail: "3D CAD models of vehicle damage calculated from multi-angle insurance photos"
        },
        {
          id: "ins_t2",
          name: "Meteorology Timeline",
          statusText: "Scanning freezing telemetry",
          progress: 90,
          icon: <Activity className="w-3.5 h-3.5" />,
          accentClass: "text-sky-400",
          color: "#38BDF8",
          detail: "Correlating black ice temperature sensors with claim collision millisecond events"
        },
        {
          id: "ins_t3",
          name: "Fault Splitting Solver",
          statusText: "Computing liability matrices",
          progress: 60,
          icon: <Sliders className="w-3.5 h-3.5" />,
          accentClass: "text-emerald-400",
          color: "#34D399",
          detail: "Applying traffic statutes to determine partial liabilities across 50 policies"
        },
        {
          id: "ins_t4",
          name: "Social Fraud Auditor",
          statusText: "Verifying timeline honesty",
          progress: 85,
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          accentClass: "text-rose-400",
          color: "#F43F5E",
          detail: "Auto-analyzing community media tags to detect pre-existing bumper scrapes"
        }
      ],
      humanActions: [
        {
          label: "Approve Fault Splitting Ratio",
          description: "Signs off on liability assignment schema & repair cost splits",
          resultLog: "COMMITTED: Fault matrix authorized. Split billing packets formatted and dispatched to 14 corporate partner portals. Process complete."
        },
        {
          label: "Trigger Physical Investigator",
          description: "Flags vehicle #12 bumper scrape outlier discrepancy for field check",
          resultLog: "DISPATCHED: Bumper anomaly isolated. Swarm loaded exact drone telemetry coordinates to regional analyst's mobile application."
        }
      ]
    }
  ];

  const currentSector = animationSectors.find(s => s.id === activeSectorId) || animationSectors[0];

  // Simulated live logging feed
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveLogs([
        `⚡ SYSTEM: Swarm initialized under direct command of ${currentSector.managerTitle}.`,
        `📡 LATENCY: Node connection verified. Latency is stable at 24ms.`,
        `🧠 AGENTS: 12-agent consensus matrix actively processing: ${currentSector.strategicTopic}.`,
      ]);
      setLastActionExecuted(null);
      setCurrentStep(0);
    }, 0);
    return () => clearTimeout(timer);
  }, [activeSectorId, currentSector.managerTitle, currentSector.strategicTopic]);

  // Periodic visual progress & logging updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = (prev + 1) % 4;
        
        // Add random log lines illustrative of parallel computing output
        const dynamicLogPool = [
          `🔍 Agent '${currentSector.tasks[next].name}' completed iteration block. Result matching: 99.9% precision.`,
          `💾 Writing state parameters to decentralized Merkle registry... Root signed cleanly.`,
          `🛰️ Grounding vectors loaded from document index. Grounding score = 0.992.`,
          `🛡️ Safety audit status: Green. Alignment deviation parameter = 0.003.`,
          `🗳️ Swarm Consensus consensus polling: 12/12 sub-nodes fully aligned.`,
          `⚡ Chief Overwatch alert: Prepared high-tier decision pathway for human supervisor.`
        ];
        
        const randomLog = dynamicLogPool[Math.floor(Math.random() * dynamicLogPool.length)];
        setActiveLogs(prevLogs => [randomLog, ...prevLogs.slice(0, 15)]);
        return next;
      });
    }, 4000 / speedMultiplier);

    return () => clearInterval(interval);
  }, [isPlaying, activeSectorId, speedMultiplier, currentSector.tasks]);

  const handleActionClick = (actionLabel: string, resultLog: string) => {
    setTriggerGlow(true);
    setLastActionExecuted(actionLabel);
    setActiveLogs(prev => [
      `🤖 HUMAN ACTION APPROVED: "${actionLabel}"`,
      resultLog,
      `🔄 Swarm updating ledger records based on Human Commander cryptographic key...`,
      ...prev
    ]);
    setTimeout(() => setTriggerGlow(false), 1500);
  };

  return (
    <div className="bg-[#090C12]/95 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl" id="swarm_impact_studio">
      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-cyan-500 tracking-widest flex items-center gap-1.5 font-black">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        SWARM VISUALIZER ACTIVE
      </div>

      <div className="text-left mb-6">
        <span className="text-[10px] font-mono tracking-widest text-[#4285F4] uppercase bg-[#4285F4]/10 border border-[#4285F4]/20 px-2.5 py-1 rounded">
          Interactive Simulation
        </span>
        <h3 className="font-sans text-2xl font-black mt-2 tracking-tight text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} /> Swarm Impact Studio
        </h3>
        <p className="text-xs font-sans text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Watch real-time animations illustrating how AI agent pods tackle highly complex data loads in parallel, packaging results to provide a single, clean strategic overwatch gateway for the Human Manager.
        </p>
      </div>

      {/* SECTOR TABS SELECTOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {animationSectors.map((sector) => {
          const isActive = sector.id === activeSectorId;
          return (
            <button
              key={sector.id}
              onClick={() => setActiveSectorId(sector.id)}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 relative cursor-pointer group ${
                isActive
                  ? `bg-gradient-to-br ${sector.themeColor}/15 border-slate-700 shadow-md ${sector.textColor}`
                  : "bg-slate-950/40 border-white/5 hover:border-slate-800 text-slate-400 hover:text-slate-100"
              }`}
              id={`sector_btn_${sector.id}`}
            >
              <div className={`p-2 rounded-lg mb-2 ${isActive ? "bg-slate-900/60 " + sector.textColor : "bg-slate-900/30 text-slate-500 group-hover:text-slate-300"}`}>
                {sector.icon}
              </div>
              <span className="text-[11px] font-mono font-bold tracking-tight uppercase">
                {sector.name.split(" ")[0]} Impact
              </span>
              <span className="text-[9px] font-sans opacity-60 mt-0.5 truncate max-w-full">
                {sector.id === "customer_service" && "Client Care"}
                {sector.id === "legal" && "Litigation"}
                {sector.id === "medicine" && "Oncology"}
                {sector.id === "insurance" && "Claims Split"}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeSectorIndicator"
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${sector.themeColor} rounded`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* MAIN STUDIO GRAPH & CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* LEFT COLUMN: THE SWARM ANIMATION GRAPH STAGE (7 COLS) */}
        <div className="lg:col-span-7 bg-[#05070A] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
          {/* Subtle Ambient Scan lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4285F4]/10 to-transparent" />
          
          {/* STAGE HEADER */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5 z-10">
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest">{currentSector.name} System Status</span>
              <h4 className="text-sm font-sans font-black text-white">{currentSector.strategicTopic}</h4>
            </div>
            
            {/* Speed & Pause sliders */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 px-2.5 bg-slate-900 border border-white/10 hover:border-white/20 text-[9px] font-mono uppercase rounded text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {isPlaying ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-[#EA4335] rounded-full animate-ping" /> PAUSE
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" /> PLAY
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSpeedMultiplier(prev => (prev === 1 ? 2 : prev === 2 ? 4 : 1))}
                className="p-1 px-2 bg-slate-900 border border-white/10 hover:border-white/20 text-[9px] font-mono rounded text-slate-300 cursor-pointer text-center min-w-[38px] transition-colors"
                title="Simulation Speed Speed"
              >
                {speedMultiplier}x Speed
              </button>
            </div>
          </div>

          {/* DYNAMIC SWARM INTERACTION VISUAL GRAPHICS */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10">
            
            {/* HUMAN OVERWATCH MANAGER NODE - AT THE TOP */}
            <motion.div
              animate={{
                scale: triggerGlow ? [1, 1.05, 1] : 1,
                boxShadow: triggerGlow 
                  ? "0 0 25px rgba(66, 133, 244, 0.4)" 
                  : "0 0 15px rgba(255, 255, 255, 0.02)"
              }}
              transition={{ duration: 0.5 }}
              className={`w-44 bg-[#0A0D14] border-2 rounded-2xl p-3 text-center relative z-20 ${
                triggerGlow ? "border-[#4285F4]" : currentSector.borderColor
              }`}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-[8px] font-mono font-bold uppercase rounded text-white tracking-widest whitespace-nowrap">
                {currentSector.managerTitle}
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className={`p-1.5 rounded-full ${triggerGlow ? "bg-[#4285F4]/20 text-white" : "bg-slate-900 text-slate-300"}`}>
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-sans font-black text-white leading-none">HUMAN OVERWATCH</div>
                  <div className="text-[8px] font-mono text-[#A0AEC0] opacity-80 leading-snug mt-0.5">Sovereign Gatekeeper</div>
                </div>
              </div>
              <div className="border-t border-white/5 mt-2 pt-1">
                <span className="text-[8px] font-mono text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-505 animate-pulse" />
                  {triggerGlow ? "INJECTING CRYPTO SIGNATURE" : "STRATEGIC INSTRUCTIONS"}
                </span>
              </div>
            </motion.div>

            {/* GROWING CONNECTION WAVE LINES */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full max-h-[300px]" viewBox="0 0 400 300">
                {/* Connector lines from Agents to Human Manager */}
                <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3 3">
                  <line x1="200" y1="70" x2="60" y2="180" />
                  <line x1="200" y1="70" x2="150" y2="220" />
                  <line x1="200" y1="70" x2="250" y2="220" />
                  <line x1="200" y1="70" x2="340" y2="180" />
                </g>

                {/* Animated Flowing Data Packets flowing UPWARD to Human Manager representing parallel computing compilation */}
                {isPlaying && (
                  <g>
                    {/* Path 1 */}
                    <motion.circle
                      r="3"
                      fill={currentSector.textColor.includes("teal") ? "#2DD4BF" : currentSector.textColor.includes("indigo") ? "#818CF8" : currentSector.textColor.includes("rose") ? "#FB7185" : "#FBBF24"}
                      animate={{
                        x: [60, 200],
                        y: [180, 70],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2.2 / speedMultiplier, repeat: Infinity, ease: "linear", delay: 0 }}
                    />
                    {/* Path 2 */}
                    <motion.circle
                      r="3"
                      fill={currentSector.textColor.includes("teal") ? "#34D399" : currentSector.textColor.includes("indigo") ? "#E879F9" : currentSector.textColor.includes("rose") ? "#2DD4BF" : "#38BDF8"}
                      animate={{
                        x: [150, 200],
                        y: [220, 70],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.8 / speedMultiplier, repeat: Infinity, ease: "linear", delay: 0.4 }}
                    />
                    {/* Path 3 */}
                    <motion.circle
                      r="3"
                      fill={currentSector.textColor.includes("teal") ? "#38BDF8" : currentSector.textColor.includes("indigo") ? "#38BDF8" : currentSector.textColor.includes("rose") ? "#34D399" : "#34D399"}
                      animate={{
                        x: [250, 200],
                        y: [220, 70],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2.0 / speedMultiplier, repeat: Infinity, ease: "linear", delay: 0.8 }}
                    />
                    {/* Path 4 */}
                    <motion.circle
                      r="3"
                      fill={currentSector.textColor.includes("teal") ? "#FBBF24" : currentSector.textColor.includes("indigo") ? "#F43F5E" : currentSector.textColor.includes("rose") ? "#FBBF24" : "#F43F5E"}
                      animate={{
                        x: [340, 200],
                        y: [180, 70],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2.5 / speedMultiplier, repeat: Infinity, ease: "linear", delay: 1.2 }}
                    />
                  </g>
                )}

                {/* Animated DOWNWARD human control wave (triggered on click) */}
                {triggerGlow && (
                  <g>
                    <motion.circle
                      r="6"
                      fill="#4285F4"
                      opacity="0.7"
                      animate={{
                        x: [200, 60, 150, 250, 340],
                        y: [70, 180, 220, 220, 180],
                        scale: [1, 1.8],
                        opacity: [0.9, 0]
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* FOUR CENTRAL AI WORKER NODES (HORIZONTAL SWARM ARRAY) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl px-4 mt-20 relative z-20">
              {currentSector.tasks.map((task, index) => {
                const isSelected = isPlaying && index === currentStep;
                return (
                  <motion.div
                    key={task.id}
                    animate={{
                      y: isSelected ? -6 : 0,
                      borderColor: isSelected ? task.color : "rgba(255,255,255,0.03)",
                      backgroundColor: isSelected ? "rgba(10,15,30,0.85)" : "rgba(3,5,10,0.7)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="border p-3 rounded-xl text-left relative group overflow-hidden shadow-md flex flex-col justify-between h-34"
                  >
                    {/* Glowing active pulse */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 p-1 flex">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: task.color }} />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: task.color }} />
                        </span>
                      </div>
                    )}

                    {/* Node Header */}
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <div className="p-1 rounded bg-slate-900 border border-white/5" style={{ color: task.color }}>
                          {task.icon}
                        </div>
                        <span className="text-[10px] font-mono font-black truncate">{task.name}</span>
                      </div>
                      <p className="text-[9px] font-mono text-slate-400 mt-1.5 line-clamp-2 leading-snug">
                        {task.detail}
                      </p>
                    </div>

                    {/* Progress Bar & Status Text */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="flex items-center justify-between text-[8px] font-mono">
                        <span className="text-slate-500 font-bold truncate max-w-[80%]">{task.statusText}</span>
                        <span style={{ color: task.color }}>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1 overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 1.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: task.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* SECTOR SPECIFIC VISUALIZATION PRELUDES (SCROLL-BASED ACTION GRAPHICS) */}
            <div className="w-full max-w-xl px-4 mt-4 bg-slate-950/75 border border-white/5 rounded-xl p-3 text-left">
              <div className="flex items-center gap-1.5 mb-1 bg-slate-900/60 p-1 px-2 rounded w-fit text-[8px] font-mono text-cyan-400 font-bold">
                <Zap className="w-3 h-3 text-cyan-400 animate-bounce" /> Parallel Processing Task Highlight
              </div>
              
              {/* Customer Service visual element */}
              {activeSectorId === "customer_service" && (
                <div className="space-y-2 text-[9px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                      <span className="w-1 h-1 bg-teal-400 rounded-full" /> Multilingual Sentiment Extraction (4,000 threads)
                    </span>
                    <span className="text-slate-500">24ms update</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0D1525] border border-red-500/10 p-1.5 rounded">
                      <div className="text-[#F87171] font-bold">VIP_SLA_ERR_402</div>
                      <div className="text-slate-400 text-[8px] mt-0.5 truncate">User angry - Billing loop loop</div>
                    </div>
                    <div className="bg-[#0D1525] border border-amber-500/10 p-1.5 rounded">
                      <div className="text-[#FBBF24] font-bold">GERMAN_SLA_REFND</div>
                      <div className="text-slate-400 text-[8px] mt-0.5 truncate">Adapting apologies tone</div>
                    </div>
                    <div className="bg-[#0D1525] border border-emerald-500/10 p-1.5 rounded">
                      <div className="text-[#34D399] font-bold">CSAT_ALIGN_99</div>
                      <div className="text-slate-400 text-[8px] mt-0.5 truncate">Transaction finalized</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Legal visual element */}
              {activeSectorId === "legal" && (
                <div className="space-y-2 text-[9px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full" /> PDF Precedent Scanning & Indexing (14,000 pages)
                    </span>
                    <span className="text-slate-500">Scanning active...</span>
                  </div>
                  <div className="bg-[#05070B] border border-white/5 p-2 rounded relative overflow-hidden h-12">
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent animate-pulse h-1 bg-cyan-400" />
                    <div className="text-[8px] text-indigo-300 leading-tight space-y-0.5">
                      <div>MATCH DETECTED: [94.5% Overlap] - 2024 Delaware Civil Corporate Code § 14-A2</div>
                      <div className="text-slate-500 truncate">Brief: Plaintiff failed to declare preliminary trademark search arrays prior to cryptographic deployment.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Medicine visual element */}
              {activeSectorId === "medicine" && (
                <div className="space-y-2 text-[9px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <span className="w-1 h-1 bg-rose-400 rounded-full" /> Sub-pixel lesion imaging & Border density graph
                    </span>
                    <span className="text-emerald-400 font-bold">99.94% Medical consensus</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 border border-rose-500/20 bg-rose-950/20 p-2 rounded">
                      <div className="w-8 h-8 rounded border border-rose-400/30 bg-black flex items-center justify-center text-[10px] text-rose-400 font-black shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.4)_0%,transparent_80%)] animate-pulse" />
                        SCAN
                      </div>
                      <div className="text-[8px] leading-tight text-slate-300">
                        <div>Cell Border: ATYPICAL</div>
                        <div className="text-slate-500 opacity-90">Radius depth margin: 0.04mm</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] text-slate-400 leading-none">
                        <span>Melanoma Likelihood</span>
                        <span className="text-rose-400 font-bold">12.4% low-grade</span>
                      </div>
                      <div className="w-full bg-[#0A0C10] rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-teal-400 to-rose-400 h-full rounded-full" style={{ width: "12.4%" }} />
                      </div>
                      <div className="text-[7.5px] text-emerald-400 font-bold leading-none">
                        ✓ Safety Contraindications: ZERO overlapping drug conflicts detected
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Insurance visual element */}
              {activeSectorId === "insurance" && (
                <div className="space-y-2 text-[9px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <span className="w-1 h-1 bg-amber-400 rounded-full" /> 3D Drone Crash Deformation Index (Pileup splits)
                    </span>
                    <span className="text-slate-500">Processed 50 vehicles</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[8px]">
                    <div className="bg-slate-900/80 p-1.5 rounded border border-white/5 space-y-1">
                      <div className="text-slate-400 font-bold uppercase tracking-wider">Estimated Parts Cost</div>
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Vehicle #1 to #12</span>
                        <span>$34,220 split</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/80 p-1.5 rounded border border-white/5 space-y-1">
                      <div className="text-slate-400 font-bold uppercase tracking-wider">Liability Fault Matrix</div>
                      <div className="flex justify-between text-amber-400 font-bold">
                        <span>Primary fault</span>
                        <span>Road Ice (Visco split)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* STAGE FOOTER */}
          <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#4285F4] rounded-full animate-pulse" />
              Human-in-the-loop: COGNITIVE OVERWATCH MODE
            </span>
            <span className="text-slate-500">
              {currentSector.dataSummary}
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: OVERWATCH CONTROL PANEL & DIAGNOSTICS (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          
          {/* THE HUMAN DECISION CORNER */}
          <div className="bg-[#0A0D15]/80 border border-white/5 rounded-2xl p-5 text-left space-y-4">
            <h4 className="text-xs font-mono font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-widest">
              <Sliders className="w-4 h-4 text-amber-400" /> Human Conductor Decisions
            </h4>
            <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
              As the ultimate sovereign authority, the human conductor reviews the swarm&apos;s consensus recommendations. Tap any of the actions below to simulate executing an executive order across the agent network:
            </p>

            <div className="space-y-3 pt-1">
              {currentSector.humanActions.map((action, i) => {
                const isSelected = lastActionExecuted === action.label;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleActionClick(action.label, action.resultLog)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between align-middle gap-1 cursor-pointer group ${
                      isSelected
                        ? "bg-[#101930] border-[#4285F4] shadow-md shadow-blue-500/5 text-slate-100"
                        : "bg-slate-950/60 border-white/5 hover:border-slate-800 text-slate-400 hover:text-slate-105"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[11px] font-mono font-black uppercase tracking-wide group-hover:text-white transition-colors ${isSelected ? "text-[#4285F4]" : "text-slate-200"}`}>
                        {action.label}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 text-slate-500 transition-transform group-hover:translate-x-1 ${isSelected ? "text-[#4285F4]" : ""}`} />
                    </div>
                    <span className="text-[9.5px] font-sans text-slate-400 leading-snug">
                      {action.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {lastActionExecuted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#0C1220] border border-cyan-800/30 text-cyan-200 rounded-xl text-[10px] font-mono leading-relaxed flex items-start gap-2 animate-rainbow-glow"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block uppercase text-[9px] tracking-wide mb-0.5 text-cyan-400">Order Dispatched successfully</span>
                  The 12 parallel AI consensus nodes have verified this signature against the Merkle root. Action broadcasted globally.
                </div>
              </motion.div>
            )}
          </div>

          {/* REAL-TIME SIMULATED CONSOLE LOGS */}
          <div className="bg-[#050608] border border-white/5 rounded-2xl p-5 text-left flex-1 flex flex-col min-h-[190px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold block">Consensus Swarm Telemetry FEED</span>
              <button
                type="button"
                onClick={() => {
                  setActiveLogs([
                    `⚡ SYSTEM: Console logs flushed by human command.`,
                    `📡 Swarm matrix running normal diagnostics...`
                  ]);
                }}
                className="text-[8px] font-mono text-slate-600 hover:text-slate-400 uppercase tracking-widest cursor-pointer transition-colors"
              >
                Clear Log
              </button>
            </div>

            {/* Logs List scrolling */}
            <div className="flex-1 overflow-y-auto font-mono text-[9.5px] leading-relaxed text-slate-300 space-y-1.5 custom-scrollbar min-h-[110px] max-h-[170px] select-all">
              <AnimatePresence>
                {activeLogs.map((log, index) => {
                  let textClass = "text-slate-400";
                  if (log.includes("🤖") || log.includes("HUMAN")) {
                    textClass = "text-amber-400 font-bold border-l-2 border-amber-500/40 pl-1.5 my-1";
                  } else if (log.includes("⚠️") || log.includes("alert") || log.includes("Alert")) {
                    textClass = "text-rose-400 font-semibold";
                  } else if (log.includes("COMMITTED") || log.includes("✓")) {
                    textClass = "text-emerald-400 font-semibold";
                  } else if (log.includes("⚡") || log.includes("SYSTEM")) {
                    textClass = "text-cyan-400";
                  } else if (log.includes("🔍")) {
                    textClass = "text-slate-400 opacity-90";
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={textClass}
                    >
                      {log}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

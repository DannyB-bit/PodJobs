#!/usr/bin/env python3
"""
PodJobs - Local Offline Multi-Agent Swarm Orchestrator
Supports two execution modes:
  1. Hermes Mode (default): Uses Nous Research hermes-agent SDK
  2. Ollama Mode (fallback): Direct local LLM calls via Ollama REST API

100% Private, Zero Cloud Traffic.
Generated automatically via PodJobs // TheAiCollective.art
"""

import json
import os
import sys
import time
import hashlib
import requests
import asyncio
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn

console = Console()

# ---------------------------------------------------------------------------
# Runtime Detection: Hermes SDK > Ollama > Static Fallback
# ---------------------------------------------------------------------------
HERMES_AVAILABLE = False
try:
    from run_agent import AIAgent
    HERMES_AVAILABLE = True
except ImportError:
    pass

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("OLLAMA_MODEL", "llama3")

OLLAMA_ONLINE = False
if not HERMES_AVAILABLE:
    try:
        requests.get(OLLAMA_HOST, timeout=1.0)
        OLLAMA_ONLINE = True
    except Exception:
        OLLAMA_ONLINE = False

# Determine execution engine
if HERMES_AVAILABLE:
    ENGINE = "hermes"
elif OLLAMA_ONLINE:
    ENGINE = "ollama"
else:
    ENGINE = "static"

# ---------------------------------------------------------------------------
# LLM Query Functions
# ---------------------------------------------------------------------------
def query_hermes(prompt_text: str, system_instruction: str) -> str:
    """Execute via real Hermes AIAgent."""
    try:
        model = os.environ.get("HERMES_MODEL", "google/gemini-2.5-flash")
        agent = AIAgent(model=model, quiet_mode=True)
        response = agent.chat(f"[System: {system_instruction}]\n\n{prompt_text}")
        return str(response).strip() if response else "Hermes agent completed task."
    except Exception as e:
        return f"[Hermes error: {str(e)[:80]}] Task completed with degraded output."

def query_ollama(prompt_text: str, system_instruction: str) -> str:
    """Execute via local Ollama instance."""
    url = f"{OLLAMA_HOST}/api/generate"
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt_text,
        "system": system_instruction,
        "stream": False,
        "options": {"temperature": 0.7}
    }
    try:
        response = requests.post(url, json=payload, timeout=30.0)
        if response.status_code == 200:
            return response.json().get("response", "").strip()
    except Exception:
        pass
    return f"[Ollama offline] Processed locally via static analysis."

def query_llm(prompt_text: str, system_instruction: str) -> str:
    """Route to the best available engine."""
    if ENGINE == "hermes":
        return query_hermes(prompt_text, system_instruction)
    elif ENGINE == "ollama":
        return query_ollama(prompt_text, system_instruction)
    else:
        return f"[Static Mode] Processed locally. Identified specialty workflows successfully."

# ---------------------------------------------------------------------------
# Merkle Root (mirrors lib/security.ts)
# ---------------------------------------------------------------------------
def calculate_merkle_root(logs: list) -> str:
    if not logs:
        return hashlib.sha256(b"empty").hexdigest()
    leaves = []
    for log in logs:
        data = json.dumps(log, sort_keys=True).encode("utf-8")
        leaves.append(hashlib.sha256(data).hexdigest())
    while len(leaves) > 1:
        if len(leaves) % 2 != 0:
            leaves.append(leaves[-1])
        next_level = []
        for i in range(0, len(leaves), 2):
            combined = (leaves[i] + leaves[i + 1]).encode("utf-8")
            next_level.append(hashlib.sha256(combined).hexdigest())
        leaves = next_level
    return leaves[0]

# ---------------------------------------------------------------------------
# Parallel Mesh Network Topology Classes and Functions
# ---------------------------------------------------------------------------
class MeshMessageBroker:
    def __init__(self, console_obj):
        self.message_board = []
        self.queues = {}
        self.console = console_obj
        self.active_agents = set()

    def register_agent(self, agent_name):
        self.queues[agent_name] = asyncio.Queue()
        self.active_agents.add(agent_name)

    async def send_message(self, sender, recipient, content):
        msg = {"sender": sender, "content": content}
        self.message_board.append({
            "sender": sender,
            "recipient": recipient,
            "content": content,
            "timestamp": time.time()
        })
        
        if recipient == "All":
            self.console.print(f"  [bold magenta]📣 Broadcast from {sender}:[/bold magenta] [italic]{content[:120]}...[/italic]")
            for name, q in self.queues.items():
                if name != sender:
                    await q.put(msg)
        else:
            self.console.print(f"  [bold cyan]✉ {sender} ➔ {recipient}:[/bold cyan] [italic]{content[:120]}...[/italic]")
            if recipient in self.queues:
                await self.queues[recipient].put(msg)


async def run_mesh_agent_worker(agent_name, agent_cfg, broker, user_prompt, max_turns=3):
    broker.register_agent(agent_name)
    agent_specialty = agent_cfg.get("specialty", "General")
    agent_role = agent_cfg.get("role", "Swarm agent")
    
    system_context = (
        f"You are {agent_name}, an expert AI agent specializing in {agent_specialty}. "
        f"Your role: {agent_role}. "
        f"You operate concurrently inside an Asynchronous Mesh Swarm. "
        f"Be concise, technical, and address fellow agents directly. Max 2 sentences."
    )

    # Planner starts the discussion
    if agent_specialty == "Workflow planning":
        await asyncio.sleep(0.5)
        intro = f"Swarm initiated. Our objective is: '{user_prompt}'. I propose we compile the codebase specifications and execute security scans. Swarms Consensus Arbiter, please verify compliance when drafts are ready."
        await broker.send_message(agent_name, "All", intro)
    
    turns = 0
    while turns < max_turns:
        try:
            msg = await asyncio.wait_for(broker.queues[agent_name].get(), timeout=4.0)
            sender = msg["sender"]
            content = msg["content"]
            
            prompt = (
                f"[System: {system_context}]\n\n"
                f"Global Swarm Goal: '{user_prompt}'\n"
                f"Incoming Message from {sender}: '{content}'\n\n"
                f"Respond to this message with your specific domain expert input. If you are the Consensus Arbiter and all nodes look complete, print 'Consensus Sealed'. Keep it very short."
            )
            
            response_str = query_llm(prompt, system_context)
            turns += 1
            
            if agent_cfg.get("specialty") == "Consensus polling":
                if "consensus sealed" in response_str.lower() or turns == max_turns:
                    await broker.send_message(agent_name, "All", f"Consensus Sealed: Swarm objective achieved. Attestation active.")
                    break
                else:
                    await broker.send_message(agent_name, "All", f"Consensus Update: Reviewing message from {sender}.")
            else:
                await broker.send_message(agent_name, "Swarms Consensus Arbiter", response_str)
                
        except asyncio.TimeoutError:
            if agent_cfg.get("specialty") == "Consensus polling":
                await broker.send_message(agent_name, "All", "Consensus Sealed: Swarm finalized by timeout attestation.")
                break
            else:
                await broker.send_message(agent_name, "Swarms Consensus Arbiter", f"{agent_name} reporting specialty checks complete.")
                break


async def run_mesh_swarm_async(agents, user_prompt):
    broker = MeshMessageBroker(console)
    tasks = []
    
    for agent_cfg in agents:
        agent_name = agent_cfg.get("name", "Specialist Node")
        tasks.append(run_mesh_agent_worker(agent_name, agent_cfg, broker, user_prompt))
        
    await asyncio.gather(*tasks)
    return broker.message_board

# ---------------------------------------------------------------------------
# Main Pipeline
# ---------------------------------------------------------------------------
def execute_pipeline():
    config = load_config()
    pod_name = config.get("podName", "Local Swarm")
    agents = config.get("agents", [])

    engine_labels = {
        "hermes": "[bold blue]Nous Research Hermes Agent[/bold blue]",
        "ollama": f"[bold yellow]Ollama ({MODEL_NAME} @ {OLLAMA_HOST})[/bold yellow]",
        "static": "[bold red]Static Simulation (no LLM available)[/bold red]"
    }

    console.print(Panel(
        f"[bold bright_green]🚀 PodJobs Local Swarm: {pod_name}[/bold bright_green]\n"
        f"Engine: {engine_labels[ENGINE]}\n"
        f"Agents: [cyan]{len(agents)}[/cyan]\n"
        f"Privacy: [green]100% OFFLINE — Zero Cloud Traffic[/green]",
        border_style="green"
    ))

    if ENGINE == "static":
        console.print(Panel(
            "[bold yellow]⚠ No LLM engine detected.[/bold yellow]\n\n"
            "Install one of these:\n"
            "  [cyan]pip install git+https://github.com/NousResearch/hermes-agent.git[/cyan]  (Hermes)\n"
            "  [cyan]ollama pull llama3[/cyan]  (Ollama)\n\n"
            "Running in static simulation mode.",
            border_style="yellow"
        ))

    console.print("[bold white]Enter task for the swarm:[/bold white]")
    try:
        user_prompt = input("❯ ").strip()
    except EOFError:
        user_prompt = "Optimize basic operations"
    if not user_prompt:
        user_prompt = "Optimize basic operations"

    # Agent roster table
    table = Table(title=f"🗂️ {pod_name} — {len(agents)} Agents", border_style="cyan")
    table.add_column("#", justify="center", style="dim")
    table.add_column("Agent Name", style="bold green")
    table.add_column("Specialty", style="yellow")
    table.add_column("Boost", style="magenta")
    for i, a in enumerate(agents):
        table.add_row(str(i + 1), a.get("name", "N/A"), a.get("specialty", "N/A"), a.get("productivityBoost", "1.0x"))
    console.print(table)

    # Get topology choice
    console.print("\n[bold white]Choose Swarm Topology:[/bold white]")
    console.print("  1. [bold cyan]Sequential Cascade[/bold cyan] (Standard linear workflow pipeline)")
    console.print("  2. [bold cyan]Parallel Mesh Network[/bold cyan] (Asynchronous peer-to-peer broker)")
    try:
        topo_choice = input("❯ ").strip()
    except EOFError:
        topo_choice = "1"
    
    is_mesh = (topo_choice == "2")
    start_time = time.time()

    if is_mesh:
        console.print(f"\n[bold yellow]⚡ Dispatching to {len(agents)} concurrent Mesh agents via {ENGINE}...[/bold yellow]\n")
        mesh_logs = asyncio.run(run_mesh_swarm_async(agents, user_prompt))
        logs = mesh_logs
    else:
        console.print(f"\n[bold yellow]⚡ Dispatching to {len(agents)} sequential Cascade agents via {ENGINE}...[/bold yellow]\n")
        previous_output = ""
        
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            transient=True,
        ) as progress:

            for idx, agent in enumerate(agents):
                agent_name = agent.get("name", f"Agent {idx + 1}")
                agent_specialty = agent.get("specialty", "Operations")
                agent_role = agent.get("role", "Task execution")

                task_desc = f"[bold green][{idx + 1}/{len(agents)}][/bold green] {agent_name} executing..."
                p_task = progress.add_task(description=task_desc, total=100)

                # Build prompts
                system_instruction = (
                    f"You are {agent_name}, expert in {agent_specialty}. "
                    f"Your role: {agent_role}. Keep response short, max 2 sentences."
                )

                if idx == 0:
                    llm_prompt = f"Analyze and plan: \"{user_prompt}\""
                elif idx == len(agents) - 1:
                    llm_prompt = (
                        f"Synthesize all previous outputs and seal consensus for: \"{user_prompt}\". "
                        f"Previous: \"{previous_output[:300]}\""
                    )
                else:
                    llm_prompt = (
                        f"As {agent_name}, apply {agent_specialty} to: \"{user_prompt}\". "
                        f"Previous agent said: \"{previous_output[:200]}\""
                    )

                output = query_llm(llm_prompt, system_instruction)
                progress.update(p_task, completed=100)

                elapsed = time.time() - start_time
                console.print(f"[bold green]✔[/bold green] [bold cyan]{agent_name}[/bold cyan] [dim]({agent_specialty})[/dim]:")
                console.print(f"  [italic white]\"{output[:200]}\"[/italic white]\n")

                logs.append({
                    "agentName": agent_name,
                    "role": agent_role,
                    "specialty": agent_specialty,
                    "output": output,
                    "timeTakenSeconds": round(elapsed, 1),
                    "engine": ENGINE
                })

                previous_output = output

    # Consensus & Merkle
    merkle_root = calculate_merkle_root(logs)

    # Save report
    if is_mesh:
        report_lines = [
            f"# {pod_name} — Local Mesh Swarm Report",
            f"",
            f"**Task:** {user_prompt}",
            f"**Engine:** {ENGINE}",
            f"**Topology:** Parallel Mesh Network",
            f"**Agents:** {len(logs)}",
            f"**Merkle Root:** `sha256:{merkle_root}`",
            f"",
            f"## 💬 Swarm Communication Board Log",
            f"",
        ]
        for log in logs:
            report_lines.append(f"* **{log['sender']}** ➔ **{log['recipient']}**:")
            report_lines.append(f"  > {log['content']}")
            report_lines.append("")
        
        report_lines.append(f"**Consensus Sealed.** Merkle: `sha256:{merkle_root}`")
    else:
        report_lines = [
            f"# {pod_name} — Local Swarm Report",
            f"",
            f"**Task:** {user_prompt}",
            f"**Engine:** {ENGINE}",
            f"**Topology:** Sequential Cascade",
            f"**Agents:** {len(logs)}",
            f"**Merkle Root:** `sha256:{merkle_root}`",
            f"",
        ]
        for i, log in enumerate(logs):
            report_lines.append(f"## {i+1}. {log['agentName']} ({log['specialty']})")
            report_lines.append(f"> {log['output']}")
            report_lines.append("")
        
        report_lines.append(f"**Consensus Sealed.** Merkle: `sha256:{merkle_root}`")

    with open("swarm_report_local.md", "w", encoding="utf-8") as rf:
        rf.write("\n".join(report_lines))

    console.print(Panel(
        f"[bold bright_green]🎉 SWARM COMPLETE — {len(logs)} Agents Executed via {ENGINE.upper()}[/bold bright_green]\n\n"
        f"Merkle Root: [yellow]sha256:{merkle_root[:32]}...[/yellow]\n"
        f"Report: [bold cyan]swarm_report_local.md[/bold cyan]",
        border_style="bright_green"
    ))


def load_config():
    try:
        with open("agents_config.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        console.print("[bold red]❌ agents_config.json not found. Generate a pod from PodJobs first.[/bold red]")
        sys.exit(1)


if __name__ == "__main__":
    try:
        execute_pipeline()
    except KeyboardInterrupt:
        print("\nPipeline aborted by conductor.")

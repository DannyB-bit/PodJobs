# Aegis Trial Synthesis & Biotech Execution Pod
      
This package contains a fully customizable Multi-Agent Swarm system optimized for your configured role: **Clinical Trial Specialist**.
It includes standard offline local execution configured via Ollama, as well as native integration with the **Nous Research Hermes Agent Framework (hermes-agent)**!

No data leaves your local system, guaranteeing 100% privacy and offline operation.

---

## 🚀 Quick Setup Guide

### 1. Install Ollama
Download and install the local model runtime from [https://ollama.com](https://ollama.com).

### 2. Startup Ollama with CORS permissions
To make sure Ollama handles API calls from any web or script orchestrator securely:
- **macOS / Linux:**
  ```bash
  OLLAMA_ORIGINS="*" ollama serve
  ```
- **Windows (PowerShell):**
  ```powershell
  $env:OLLAMA_ORIGINS="*"
  ollama serve
  ```

### 3. Pull Your Favorite Local Model
Select a highly optimized model like Meta's Llama 3.1:
```bash
ollama pull llama3
```

### 4. Auto-Install the Hermes Framework (Recommended)
We have included a user-friendly cross-platform python script to install the Hermes framework automatically on Linux, macOS, or Windows:
```bash
python install_hermes.py
```
This script automatically runs the official Hermes installation command based on your OS.

### 5. Install Dependencies
Install terminal UI and remaining helper dependencies:
```bash
pip install -r requirements.txt
```

### 6. Options to Launch the Swarm!

#### Option A: Run via Hermes Agent Framework (Nous Research under-the-hood mode)
This option executes your agents using the modern Hermes Framework, feeding the onboarded information directly.
```bash
python run_hermes.py
```

#### Option B: Standard Local Ollama Sequencing Cascade
Run the private sequential micro-agent sequencer and consolidated consensus report:
```bash
python run_swarm.py
```

---

## 🗂️ Codebase Files Included:
- `install_hermes.py`: User-friendly script to automatically install the hermes command based on your OS (Linux, Mac, Windows).
- `run_hermes.py`: Advanced framework executor initialized with Nous Research `hermes-agent` SDK patterns and user onboarding presets.
- `run_swarm.py`: Core agent sequencer and decision arbiter. Connects to local Ollama port `localhost:11434` directly.
- `agents_config.json`: Contains profiles, productivity boosts, specialties, Hermes configurations, and workflow directives for your custom 12 agents.
- `requirements.txt`: Package dependencies (`requests`, `rich` for luxury interactive dashboards, and `hermes-agent` framework library).

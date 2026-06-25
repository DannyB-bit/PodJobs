#!/usr/bin/env python3
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
    print(f"Detected Operating System: {platform.system()} ({platform.release()})\\n")
    
    if current_os == "windows":
        print("Running Windows installation via PowerShell...")
        cmd = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "irm https://hermes-agent.nousresearch.com/install.ps1 | iex"]
        try:
            subprocess.run(cmd, check=True)
            print("\\n✓ [SUCCESS] hermes-agent framework installed successfully on Windows!")
        except Exception as e:
            print(f"\\n❌ [ERROR] PowerShell installation failed: {e}")
            print("Please try running this command manually in Administrator PowerShell:")
            print("  irm https://hermes-agent.nousresearch.com/install.ps1 | iex")
            sys.exit(1)
            
    elif current_os in ["linux", "darwin"]:  # darwin is macOS
        print(f"Running Unix installation via bash curl script on {platform.system()}...")
        cmd = "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash"
        try:
            subprocess.run(cmd, shell=True, check=True)
            print(f"\\n✓ [SUCCESS] hermes-agent framework installed successfully on {platform.system()}!")
        except Exception as e:
            print(f"\\n❌ [ERROR] Bash installation failed: {e}")
            print("Please try running this command manually in your terminal:")
            print("  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash")
            sys.exit(1)
    else:
        print(f"❌ [UNSUPPORTED] OS '{current_os}' is not automatically supported.")
        print("Please visit https://github.com/nousresearch/hermes-agent for manual installation instructions.")
        sys.exit(1)

if __name__ == "__main__":
    install()

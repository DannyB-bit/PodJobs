import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_scene4_cli():
    print("Initializing Playwright and launching browser for Scene 4 CLI Demo...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed chromium browser
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_scene4"
        )
        
        page = context.new_page()
        
        # Resolve absolute path to the local html file
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = f"file:///{current_dir.replace('\\', '/')}/public/real_cli_simulator.html"
        
        print(f"Opening local CLI simulator: {file_path}")
        page.goto(file_path)
        
        # Wait 24 seconds for the typing and printing sequence to complete fully
        print("Waiting for terminal commands to execute (24 seconds)...")
        page.wait_for_timeout(24000)
        
        print("Closing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_scene4/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene4_cli_walkthrough.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_scene4/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_scene4")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_scene4_cli()

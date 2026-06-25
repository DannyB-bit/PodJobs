import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_github_whitepaper():
    print("Initializing Playwright and launching browser for GitHub/Whitepaper Walkthrough...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed chromium browser
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_github"
        )
        
        page = context.new_page()
        
        # 1. Main GitHub Repository Walkthrough
        repo_url = "https://github.com/DannyB-bit/PodJobs"
        print(f"Navigating to GitHub repository: {repo_url}")
        page.goto(repo_url)
        page.wait_for_timeout(4000)
        
        print("Scrolling through main repository page and README...")
        for i in range(40):
            page.evaluate(f"window.scrollBy(0, 30)")
            time.sleep(0.12)
        page.wait_for_timeout(2000)
        
        # 2. Whitepaper.md Walkthrough
        whitepaper_url = "https://github.com/DannyB-bit/PodJobs/blob/main/Whitepaper.md"
        print(f"Navigating to Whitepaper documentation: {whitepaper_url}")
        page.goto(whitepaper_url)
        page.wait_for_timeout(3000)
        
        print("Scrolling through Whitepaper sections...")
        for i in range(40):
            page.evaluate(f"window.scrollBy(0, 30)")
            time.sleep(0.12)
        page.wait_for_timeout(2000)
        
        # 3. AUDIT.md Walkthrough
        audit_url = "https://github.com/DannyB-bit/PodJobs/blob/main/AUDIT.md"
        print(f"Navigating to AUDIT verification report: {audit_url}")
        page.goto(audit_url)
        page.wait_for_timeout(3000)
        
        print("Scrolling through AUDIT certification files...")
        for i in range(40):
            page.evaluate(f"window.scrollBy(0, 35)")
            time.sleep(0.12)
        page.wait_for_timeout(2000)
        
        print("Closing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_github/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene4_github_whitepaper_walkthrough.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_github/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_github")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_github_whitepaper()

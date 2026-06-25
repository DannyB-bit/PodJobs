import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_scene3_creator():
    print("Initializing Playwright and launching browser for Scene 3 Swarm Creator...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed chromium browser
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_scene3"
        )
        
        page = context.new_page()
        
        # Navigate to the live Vercel application
        url = "https://podjobs.vercel.app"
        print(f"Navigating to {url}...")
        page.goto(url)
        page.wait_for_timeout(4000)
        
        print("Switching to Creator Engine tab...")
        page.click("#nav_btn_creator")
        page.wait_for_timeout(3000)
        
        # Onboarding overlay sequence
        if page.is_visible("#hermes_onboarding_portal"):
            print("Onboarding portal detected. Entering human conductor credentials...")
            page.fill('input[placeholder="e.g. PJ Macallan"]', "Danny Bouldiez")
            page.wait_for_timeout(600)
            page.fill('input[placeholder="e.g. conductor@theaicollective.art"]', "devsone@theaicollective.art")
            page.wait_for_timeout(600)
            page.fill('input[placeholder="e.g. The AI Collective"]', "The AI Collective")
            page.wait_for_timeout(600)
            page.fill('textarea[placeholder="e.g. Direct autonomous task execution with zero redundancy..."]', "Reclaim work autonomy with edge multi-agent swarms.")
            page.wait_for_timeout(600)
            
            print("Accepting terms and activating Hermes sync...")
            page.check('input[type="checkbox"]')
            page.wait_for_timeout(600)
            page.click('text="Complete Hermes Sync & Access"')
            page.wait_for_timeout(3000)
        
        print("Filling in custom profession details...")
        page.fill("#input_profession_title", "Clinical Trial Specialist")
        page.select_option("#select_industry_sector", "Clinical Healthcare & Biotech Diagnostics")
        page.wait_for_timeout(1000)
        
        print("Clicking Generate Swarm button...")
        page.click("#submit_generative_pod")
        
        print("Waiting for generative pod creation (6 seconds)...")
        page.wait_for_timeout(6000)
        
        print("Switching to Adapt Swarm sub-tab...")
        page.click("text=Adapt Swarm")
        page.wait_for_timeout(2000)
        
        print("Downloading local offline swarm package...")
        with page.expect_download() as download_info:
            page.click("text=Export Portable Swarm Codebase")
            
        download = download_info.value
        download_path = os.path.join("assets", download.suggested_filename)
        download.save_as(download_path)
        print(f"Zip download success! Saved local package to: {download_path}")
        
        page.wait_for_timeout(3000)
        
        print("Closing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_scene3/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene3_creator_download.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_scene3/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_scene3")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_scene3_creator()

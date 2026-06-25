import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_webapp_demo():
    print("Initializing Playwright and launching browser for Web App Demo...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed chromium browser
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_webapp"
        )
        
        page = context.new_page()
        
        # Navigate to the live Vercel application
        url = "https://podjobs.vercel.app"
        print(f"Navigating to {url}...")
        page.goto(url)
        page.wait_for_timeout(4000)
        
        # --- SCENE 2: SWARM CASCADE DEMO ---
        print("Switching to Presets tab...")
        page.click("#nav_btn_presets")
        page.wait_for_timeout(2000)
        
        print("Selecting Legal Counsel Suite preset...")
        page.get_by_role("button", name="Legal Counsel Suite").click()
        page.wait_for_timeout(2000)
        
        print("Triggering Swarm Cascade Simulation...")
        page.click("text=Simulate Workflow Pipeline")
        
        print("Waiting for swarm execution logs to cascade (16 seconds)...")
        page.wait_for_timeout(16000)
        
        print("Scrolling down to inspect cryptographic signatures and safety logs...")
        # Scroll down smoothly to show CLI log outputs and Merkle Root
        for i in range(30):
            page.evaluate(f"window.scrollBy(0, 20)")
            time.sleep(0.1)
            
        page.wait_for_timeout(3000)
        
        # Scroll back up to prepare for Creator Engine
        print("Scrolling back to top...")
        for i in range(30):
            page.evaluate(f"window.scrollBy(0, -20)")
            time.sleep(0.1)
            
        page.wait_for_timeout(1000)
        
        # --- SCENE 3: CREATOR ENGINE & DOWNLOAD ---
        print("Switching to Creator Engine tab...")
        page.click("#nav_btn_creator")
        page.wait_for_timeout(3000)
        
        # Check if the onboarding overlay popped up and fill in details to onboard
        if page.is_visible("#hermes_onboarding_portal"):
            print("Onboarding portal detected. Entering human conductor credentials...")
            page.fill('input[placeholder="e.g. PJ Macallan"]', "Danny Bouldiez")
            page.wait_for_timeout(500)
            page.fill('input[placeholder="e.g. conductor@theaicollective.art"]', "devsone@theaicollective.art")
            page.wait_for_timeout(500)
            page.fill('input[placeholder="e.g. The AI Collective"]', "The AI Collective")
            page.wait_for_timeout(500)
            page.fill('textarea[placeholder="e.g. Direct autonomous task execution with zero redundancy..."]', "Reclaim work autonomy with edge multi-agent swarms.")
            page.wait_for_timeout(500)
            
            print("Accepting terms and activating Hermes sync...")
            page.check('input[type="checkbox"]')
            page.wait_for_timeout(500)
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
        
        try:
            print("Switching to Adapt Swarm sub-tab...")
            page.click("text=Adapt Swarm", timeout=15000)
            page.wait_for_timeout(2000)
            
            print("Downloading local offline swarm package...")
            # Since clicking this triggers a zip download, wait for download event
            with page.expect_download() as download_info:
                page.click("text=Export Portable Swarm Codebase")
                
            download = download_info.value
            download_path = os.path.join("assets", download.suggested_filename)
            download.save_as(download_path)
            print(f"Zip download success! Saved local package to: {download_path}")
            
            page.wait_for_timeout(3000)
        except Exception as e:
            print(f"Playwright error during Creator tab navigation: {str(e)}")
            page.screenshot(path="assets/error_screenshot.png")
            print("Saved error screenshot to assets/error_screenshot.png")
            raise e
        
        print("Closing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_webapp/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene2_webapp_walkthrough.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_webapp/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_webapp")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_webapp_demo()

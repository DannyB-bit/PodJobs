import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_scene1():
    print("Initializing Playwright and launching browser...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed so you can watch it scroll, or headless for clean background runs
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos"
        )
        
        page = context.new_page()
        
        # Define URLs to browse
        targets = [
            {
                "url": "https://www.google.com/search?q=Challenger+Gray+Christmas+May+2026+layoff+report+AI",
                "label": "1. Challenger Gray May 2026 AI Layoff Report"
            },
            {
                "url": "https://www.google.com/search?q=Coinbase+single+person+pods+layoffs+Brian+Armstrong",
                "label": "2. Coinbase AI-Native Pods Restructuring"
            },
            {
                "url": "https://www.google.com/search?q=Block+layoffs+Jack+Dorsey+Goose+AI+agent",
                "label": "3. Block Inc. Layoffs and Goose Swarm Framework"
            }
        ]
        
        for idx, target in enumerate(targets):
            print(f"\nNavigating to {target['label']}...")
            page.goto(target["url"])
            
            # Wait for search results or page body to load
            page.wait_for_timeout(3000)
            
            # Smoothly scroll down
            print("Scrolling down smoothly to read the report...")
            scroll_steps = 30
            for i in range(scroll_steps):
                # Calculate scroll position
                y_offset = (i + 1) * 70
                page.evaluate(f"window.scrollTo(0, {y_offset})")
                time.sleep(0.15)
                
            page.wait_for_timeout(2000)
            
        print("\nClosing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene1_layoffs_walkthrough.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_scene1()

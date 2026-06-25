import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_scene1_part2():
    print("Initializing Playwright and launching browser for Scene 1 Part 2...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        # Launch headed chromium browser
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_part2"
        )
        
        page = context.new_page()
        
        # Define the two live article target URLs
        targets = [
            {
                "url": "https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-us-labor-market",
                "label": "1. Goldman Sachs: How Will AI Affect the US Labor Market"
            },
            {
                "url": "https://www.cbsnews.com/news/ai-layoffs-job-cuts-challenger-report-april-2026/",
                "label": "2. CBS News: AI Layoffs Job Cuts Challenger Report"
            }
        ]
        
        for idx, target in enumerate(targets):
            print(f"\nNavigating to {target['label']}...")
            try:
                page.goto(target["url"], timeout=30000)
                # Wait for page elements to settle
                page.wait_for_timeout(3000)
                
                # Smooth slow scroll over 18 seconds
                print("Scrolling down slowly to simulate reading...")
                scroll_steps = 60
                for i in range(scroll_steps):
                    y_offset = (i + 1) * 45
                    page.evaluate(f"window.scrollTo(0, {y_offset})")
                    time.sleep(0.25)
                    
                page.wait_for_timeout(2000)
            except Exception as e:
                print(f"Error loading {target['label']}: {str(e)}")
                # If network timeout or block, wait so the video segment still has length
                page.wait_for_timeout(10000)
            
        print("\nClosing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_part2/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene1_part2_reports.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_part2/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_part2")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_scene1_part2()

import os
import time
import glob
from playwright.sync_api import sync_playwright

def record_whitepaper_part2():
    print("Initializing Playwright and launching browser for PDF Whitepaper Walkthrough Part 2 (Pages 5-10)...")
    os.makedirs("assets", exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        
        # Setup context with 1920x1080 viewport and video recording enabled
        print("Starting screen recording (1920x1080)...")
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir="assets/temp_videos_pdf_part2"
        )
        
        page = context.new_page()
        
        # Resolve absolute path to the local PDF file, starting directly at Page 5
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        pdf_path = f"file:///{current_dir.replace('\\', '/')}/public/Whitepaper.pdf#page=5&view=Fit"
        
        print(f"Opening PDF document: {pdf_path}")
        page.goto(pdf_path)
        
        # Wait 5 seconds for the PDF viewer to load fully and render page 5
        page.wait_for_timeout(5000)
        
        # Click at the center of the page to focus the PDF reader plugin
        print("Focusing PDF reader...")
        page.mouse.click(960, 540)
        page.wait_for_timeout(1000)
        
        # Scroll sequence from Page 5 to Page 10
        # Total recording time will be exactly 45 seconds (45000 ms) in the browser context.
        print("Reading Page 5...")
        page.wait_for_timeout(5000)
        
        for page_num in range(6, 11):
            print(f"Scrolling to Page {page_num}...")
            page.keyboard.press("PageDown")
            page.wait_for_timeout(1000) # Wait for page change stabilization
            
            print(f"Reading Page {page_num}...")
            if page_num == 9:
                # Slows down at page 9
                page.wait_for_timeout(8000)
            elif page_num == 10:
                # Really slow into page 10, letting the recording run out
                page.wait_for_timeout(15000)
            else:
                page.wait_for_timeout(5000)
                
        print("Closing browser and saving video file...")
        context.close()
        browser.close()
        
        # Locate the recorded video file and rename it
        video_files = glob.glob("assets/temp_videos_pdf_part2/*.webm")
        if video_files:
            latest_video = max(video_files, key=os.path.getctime)
            dest_path = "assets/scene6_part2_whitepaper.webm"
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(latest_video, dest_path)
            print(f"\nSuccess! High-definition video saved to: {dest_path}")
            
            # Clean up temp folder
            for f in glob.glob("assets/temp_videos_pdf_part2/*"):
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.rmdir("assets/temp_videos_pdf_part2")
            except:
                pass
        else:
            print("\nError: Could not locate recorded video file.")

if __name__ == "__main__":
    record_whitepaper_part2()

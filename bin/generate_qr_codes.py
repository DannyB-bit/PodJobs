import qrcode
from PIL import Image, ImageDraw

def generate_qr_with_logo(link_url, logo_path, output_path):
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(link_url)
    qr.make(fit=True)

    # Create base QR image
    qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGBA')
    qr_w, qr_h = qr_img.size

    # Load logo
    logo = Image.open(logo_path)
    
    # Enforce identical square sizing (22% of the QR code width)
    target_size = int(qr_w * 0.22)
    logo = logo.resize((target_size, target_size), Image.Resampling.LANCZOS)
    
    # Draw a solid white circle in the center of the QR code to create a clean white backdrop
    draw = ImageDraw.Draw(qr_img)
    center_x, center_y = qr_w // 2, qr_h // 2
    r = target_size // 2 + 5  # slightly larger radius than the logo to form a border margin
    draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], fill="white")
    
    # Calculate position to center the logo
    pos_x = center_x - target_size // 2
    pos_y = center_y - target_size // 2
    
    # Paste logo in center with alpha mask if transparency is available
    if logo.mode == 'RGBA':
        qr_img.paste(logo, (pos_x, pos_y), logo)
    else:
        # Convert non-alpha images to RGBA to preserve quality/pasting transparency
        logo = logo.convert('RGBA')
        qr_img.paste(logo, (pos_x, pos_y), logo)
        
    qr_img.save(output_path)
    print(f"Generated QR code at {output_path} with clean white center linking to {link_url}")

if __name__ == "__main__":
    generate_qr_with_logo("https://github.com/DannyB-bit/PodJobs", "assets/github_logo.png", "assets/github_qr.png")
    generate_qr_with_logo("https://podjobs.vercel.app/", "assets/vercel_logo.png", "assets/vercel_qr.png")

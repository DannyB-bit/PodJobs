import os
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        if self._pageNumber == 1:
            self.saveState()
            # Draw solid background matching the dark gradient of the PJ logo
            self.setFillColor(colors.HexColor("#08090C"))
            self.rect(0, 0, 612, 792, fill=True, stroke=False)
            if os.path.exists("assets/pj_logo.jpg"):
                # Center square image vertically (y = (792 - 612) / 2 = 90)
                self.drawImage("assets/pj_logo.jpg", 0, 90, width=612, height=612)
            
            # --- Movie Poster Style Additions ---
            # 1. Top Title (PROJECT:)
            self.setFillColor(colors.HexColor("#94A3B8")) # slate-400
            self.setFont("Helvetica-Bold", 16)
            self.drawCentredString(306, 736, "P  R  O  J  E  C  T  :")
            
            # 2. Bottom Movie Rating Box (RATED PJ FOR: POD JOBS)
            box_w = 260
            box_h = 44
            box_x = 306 - (box_w / 2) # 176
            box_y = 25
            
            # Draw rating box border (white, thin)
            self.setStrokeColor(colors.white)
            self.setLineWidth(1.2)
            self.rect(box_x, box_y, box_w, box_h, fill=False, stroke=True)
            
            # Draw vertical divider line inside rating box
            div_x = box_x + 85
            self.line(div_x, box_y, div_x, box_y + box_h)
            
            # Left rating text
            self.setFillColor(colors.white)
            self.setFont("Helvetica-Bold", 8)
            self.drawCentredString(box_x + 42.5, box_y + 28, "RATED")
            self.setFont("Helvetica-Bold", 18)
            self.drawCentredString(box_x + 42.5, box_y + 8, "PJ")
            
            # Right explanation text
            self.setFont("Helvetica-Bold", 7.5)
            self.drawString(box_x + 95, box_y + 28, "FOR: POD JOBS")
            self.setFont("Helvetica", 6.5)
            self.drawString(box_x + 95, box_y + 18, "DYNAMIC MULTI-AGENT SWARMS")
            self.drawString(box_x + 95, box_y + 8, "UNDER HUMAN SUPERVISION")
            # ------------------------------------
            
            self.restoreState()
            return
        
        if self._pageNumber == page_count:
            self.saveState()
            # Draw solid pure black background for the AI Collective logo
            self.setFillColor(colors.HexColor("#000000"))
            self.rect(0, 0, 612, 792, fill=True, stroke=False)
            
            img_w = 500
            img_h = 500
            img_x = 306 - (img_w / 2)
            img_y = 146
            if os.path.exists("assets/theaicollective_glow.jpg"):
                # Center square image vertically
                self.drawImage("assets/theaicollective_glow.jpg", img_x, img_y, width=img_w, height=img_h)
            self.restoreState()
            return
        
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header
        self.drawString(54, 750, "PROJECT PJ: A COGNITIVE AMPLIFIER FOR PROFESSIONAL SWARMS")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)
        
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_text)
        self.drawString(54, 40, "Kaggle Capstone // Devs One (Danny Bouldiez) // TheAiCollective.art")
        self.line(54, 52, 558, 52)
        self.restoreState()

def draw_horizontal_line(color_hex='#CBD5E1', width=150, thickness=1):
    t = Table([['']], colWidths=[width], rowHeights=[thickness])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(color_hex)),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    t.hAlign = 'CENTER'
    return t

def parse_markdown_to_flowables(filepath, styles):
    flowables = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by blocks or lines
    lines = content.split('\n')
    
    in_code_block = False
    code_lines = []
    
    in_table = False
    table_rows = []
    
    for line in lines:
        stripped = line.strip()
        
        # Custom pagebreak handling
        if stripped == '<pagebreak/>' or stripped == '---pagebreak---':
            flowables.append(PageBreak())
            continue

        # Custom QR Codes row layout
        if stripped == '[QR_CODES_ROW]':
            qr_w = 90
            qr_h = 90
            github_path = "assets/github_qr.png"
            vercel_path = "assets/vercel_qr.png"
            nft_path = "assets/nft_qr.png"
            
            if os.path.exists(github_path) and os.path.exists(vercel_path) and os.path.exists(nft_path):
                github_img = Image(github_path, width=qr_w, height=qr_h)
                vercel_img = Image(vercel_path, width=qr_w, height=qr_h)
                nft_img = Image(nft_path, width=qr_w, height=qr_h)
                
                github_img.hAlign = 'CENTER'
                vercel_img.hAlign = 'CENTER'
                nft_img.hAlign = 'CENTER'
                
                github_label = Paragraph("<font face='Helvetica-Bold' size='8' color='#0F172A'>GitHub: DannyB-bit/PodJobs</font>", styles['MetadataCentred'])
                vercel_label = Paragraph("<font face='Helvetica-Bold' size='8' color='#0F172A'>Live Website: podjobs.vercel.app</font>", styles['MetadataCentred'])
                nft_label = Paragraph("<font face='Helvetica-Bold' size='8' color='#0F172A'>On-Chain Walkthrough NFT</font>", styles['MetadataCentred'])
                
                t_data = [
                    [github_img, vercel_img, nft_img],
                    [github_label, vercel_label, nft_label]
                ]
                t = Table(t_data, colWidths=[168, 168, 168])
                t.setStyle(TableStyle([
                    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
                    ('TOPPADDING', (0,0), (-1,-1), 2),
                ]))
                flowables.append(Spacer(1, 10))
                flowables.append(t)
                flowables.append(Spacer(1, 10))
            continue

        # Custom DNA ASCII art handling
        if stripped == "🧬 H U M A N 🧬":
            ascii_art = (
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT<br/>"
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGGG&nbsp;&nbsp;GGGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTTT&nbsp;&nbsp;&nbsp;TTTT<br/>"
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGGGGGGGGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCCCCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTTTT&nbsp;&nbsp;TTTT<br/>"
                "AAAAAAAAAAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGGGGGGGGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCC&nbsp;&nbsp;CCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;T&nbsp;&nbsp;TTTT<br/>"
                "AAAAAAAAAAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;GG&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCCCCCCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;T&nbsp;TTTT<br/>"
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCCCCCCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;TTTTT<br/>"
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;TTTTTTTTTTTT&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCC&nbsp;&nbsp;CCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT<br/>"
                "AAAA&nbsp;&nbsp;&nbsp;&nbsp;AAAA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTTTTTTTT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;GGGG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CCCC&nbsp;&nbsp;CCCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TTTT&nbsp;&nbsp;&nbsp;&nbsp;TTTT"
            )
            flowables.append(Spacer(1, 10))
            flowables.append(Paragraph(ascii_art, styles['HumanDnaStyle']))
            flowables.append(Spacer(1, 10))
            continue

        # Custom horizontal rule handling
        if stripped == '---' or stripped == '___':
            flowables.append(Spacer(1, 10))
            flowables.append(draw_horizontal_line(color_hex='#CBD5E1', width=150, thickness=0.8))
            flowables.append(Spacer(1, 12))
            continue
        
        # 1. Code Block Handling
        if stripped.startswith('```'):
            if in_code_block:
                # End of code block, create flowable
                code_text = "\n".join(code_lines)
                code_text_escaped = code_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                p_code = Paragraph(f"<font face='Courier' size='7'>{code_text_escaped.replace('\n', '<br/>')}</font>", styles['CodeBlock'])
                flowables.append(p_code)
                flowables.append(Spacer(1, 10))
                in_code_block = False
                code_lines = []
            else:
                in_code_block = True
            continue
            
        if in_code_block:
            code_lines.append(line)
            continue

        # 2. Table Handling
        if stripped.startswith('|'):
            in_table = True
            # Skip separator line (e.g. | :--- | :--- |)
            if re.match(r'^\|\s*[:\-|\s]+$', stripped):
                continue
            # Parse row cells
            cells = [c.strip() for c in stripped.split('|')[1:-1]]
            # Convert markdown formatting in cells
            formatted_cells = []
            for cell in cells:
                cell_fmt = format_inline(cell)
                p_cell = Paragraph(cell_fmt, styles['TableCell'])
                formatted_cells.append(p_cell)
            table_rows.append(formatted_cells)
            continue
        elif in_table:
            # Table ended, compile it
            if table_rows:
                col_widths = [120, 384] # fits our 504 pt width
                t = Table(table_rows, colWidths=col_widths)
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
                    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                    ('VALIGN', (0,0), (-1,-1), 'TOP'),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 8),
                    ('TOPPADDING', (0,0), (-1,-1), 8),
                    ('LEFTPADDING', (0,0), (-1,-1), 8),
                    ('RIGHTPADDING', (0,0), (-1,-1), 8),
                    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
                    ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F8FAFC')),
                ]))
                flowables.append(t)
                flowables.append(Spacer(1, 12))
            in_table = False
            table_rows = []

        if not stripped:
            continue

        # 3. Image Handling
        if stripped.startswith('![') and '](' in stripped:
            img_path = stripped.split('](')[1].split(')')[0]
            if os.path.exists(img_path):
                # Check for logo and assign proportional dimensions to avoid distortion
                if "google_logo" in img_path:
                    img = Image(img_path, width=319, height=110)
                    img.hAlign = 'CENTER'
                    flowables.append(Spacer(1, 25))  # push down Google logo slightly to group with disclaimers
                    flowables.append(img)
                    flowables.append(Spacer(1, 15))
                elif "kaggle_logo" in img_path:
                    img = Image(img_path, width=286, height=110)
                    img.hAlign = 'CENTER'
                    flowables.append(Spacer(1, 25))  # push down Kaggle logo
                    flowables.append(img)
                    flowables.append(Spacer(1, 15))
                elif "pj_logo" in img_path:
                    img = Image(img_path, width=200, height=200)
                    img.hAlign = 'CENTER'
                    flowables.append(Spacer(1, 15))
                    flowables.append(img)
                    flowables.append(Spacer(1, 15))
                elif "human_dna_microscope" in img_path:
                    img = Image(img_path, width=220, height=220)
                    img.hAlign = 'CENTER'
                    flowables.append(Spacer(1, 10))
                    flowables.append(img)
                    flowables.append(Spacer(1, 10))
                else:
                    img = Image(img_path, width=150, height=150)
                    img.hAlign = 'CENTER'
                    flowables.append(Spacer(1, 8))
                    flowables.append(img)
                    flowables.append(Spacer(1, 8))
            continue

        # 4. Header Handling
        if stripped.startswith('# '):
            # Page Title
            text = format_inline(stripped[2:])
            if text == "WE ARE":
                flowables.append(Spacer(1, 15))  # push it down slightly
                flowables.append(Paragraph(text, styles['WeAreStyle']))
            elif text == "I AM":
                flowables.append(Paragraph(text, styles['IAmStyle']))
            else:
                flowables.append(Paragraph(text, styles['WhitepaperTitle']))
            flowables.append(Spacer(1, 15))
        elif stripped.startswith('## '):
            text = format_inline(stripped[3:])
            if "Attestation" in text:
                flowables.append(Spacer(1, 30))  # push it to the top/middle of page 8 nicely
                flowables.append(Paragraph(text, styles['AttestationHeaderStyle']))
            else:
                flowables.append(Paragraph(text, styles['Heading1Custom']))
            flowables.append(Spacer(1, 8))
        elif stripped.startswith('### '):
            text = format_inline(stripped[4:])
            if "Kaggle 5-Day" in text:
                transformed_text = (
                    "<font face='Helvetica-Bold' size='11' color='#0F172A'>"
                    "KAGGLE 5-DAY INTENSIVE: AI AGENTS CAPSTONE PROJECT"
                    "</font><br/>"
                    "<font face='Times-Italic' size='9.5' color='#475569'>"
                    "June 15 - 19, 2026  •  Hosted by Google"
                    "</font>"
                )
                flowables.append(Paragraph(transformed_text, styles['KaggleHeaderStyle']))
            else:
                flowables.append(Paragraph(text, styles['Heading2Custom']))
            flowables.append(Spacer(1, 6))
        elif stripped.startswith('> '):
            # Blockquote
            text = format_inline(stripped[2:])
            if "Special thanks" in text or "educational and entertainment" in text:
                if "Special thanks" in text:
                    flowables.append(Spacer(1, 60)) # push the entire Page 9 layout group down
                flowables.append(Paragraph(text, styles['DisclaimerStyle']))
            else:
                flowables.append(Paragraph(text, styles['BlockquoteCustom']))
            flowables.append(Spacer(1, 8))
        elif stripped.startswith('* ') or stripped.startswith('- '):
            # Bullet items
            text = format_inline(stripped[2:])
            flowables.append(Paragraph(f"&bull; {text}", styles['BulletCustom']))
            flowables.append(Spacer(1, 4))
        else:
            # Paragraph
            text = format_inline(stripped)
            if "Architect &amp; Author" in text or "Platform:" in text or "Build Status:" in text:
                flowables.append(Paragraph(text, styles['MetadataCentred']))
            elif "H U M A N" in text and "D N A" in text:
                flowables.append(Paragraph(text, styles['HumanCaptionStyle']))
            else:
                flowables.append(Paragraph(text, styles['BodyCustom']))
            flowables.append(Spacer(1, 8))

    return flowables

def format_inline(text):
    # Escape standard XML characters
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    # Bold **text** -> <b>text</b>
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    
    # Italic *text* -> <i>text</i>
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    
    # Code `code` -> <font face="Courier">code</font>
    text = re.sub(r'`(.*?)`', r"<font face='Courier' size='8' color='#0F172A'><b>\1</b></font>", text)
    
    return text

def main():
    os.makedirs('public', exist_ok=True)
    pdf_path = "public/Whitepaper.pdf"
    
    # Setup document geometry (0.75" margins)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )

    styles = getSampleStyleSheet()
    
    # Custom stylesheet
    styles.add(ParagraphStyle(
        name='WhitepaperTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        spaceBefore=20,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='WeAreStyle',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        spaceBefore=20,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='IAmStyle',
        fontName='Times-BoldItalic',
        fontSize=40,
        leading=46,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        spaceBefore=15,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='HumanDnaStyle',
        fontName='Courier-Bold',
        fontSize=6.5,
        leading=8.5,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        spaceBefore=15,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='HumanCaptionStyle',
        fontName='Courier-Bold',
        fontSize=8.0,
        leading=10,
        textColor=colors.HexColor('#475569'),
        alignment=TA_CENTER,
        spaceBefore=5,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='Heading1Custom',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        name='Heading2Custom',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#475569'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        alignment=TA_JUSTIFY,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        name='MetadataCentred',
        fontName='Helvetica',
        fontSize=9.0,
        leading=13,
        textColor=colors.HexColor('#475569'),
        alignment=TA_CENTER,
        spaceAfter=5
    ))

    styles.add(ParagraphStyle(
        name='KaggleHeaderStyle',
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        spaceBefore=10,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='AttestationHeaderStyle',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=colors.HexColor('#1E293B'),
        alignment=TA_CENTER,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='DisclaimerStyle',
        fontName='Helvetica-Oblique',
        fontSize=11.0,
        leading=15.5,
        textColor=colors.HexColor('#1E293B'),
        alignment=TA_CENTER,
        leftIndent=36,
        rightMargin=36,
        spaceBefore=4,
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='BlockquoteCustom',
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0F172A'),
        alignment=TA_CENTER,
        leftIndent=24,
        rightMargin=24,
        spaceBefore=8,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        name='CodeBlock',
        fontName='Courier',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#0F172A'),
        backColor=colors.HexColor('#F8FAFC'),
        borderColor=colors.HexColor('#E2E8F0'),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=6,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#334155')
    ))

    # STORY ASSEMBLY
    story = []
    
    # Page 1: Front Cover full-page PJ Logo image (handled in NumberedCanvas)
    story.append(PageBreak())
    
    # Pages 2 to N-1: Parse and add all whitepaper sections from Whitepaper.md
    whitepaper_flowables = parse_markdown_to_flowables("Whitepaper.md", styles)
    story.extend(whitepaper_flowables)
    
    # Page N: Back Cover full-page AI Collective Glow image (handled in NumberedCanvas)
    story.append(PageBreak())
    story.append(Spacer(1, 1))
            
    # Build Document using NumberedCanvas for header/footer page numbers
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF Generation complete: public/Whitepaper.pdf")

if __name__ == "__main__":
    main()

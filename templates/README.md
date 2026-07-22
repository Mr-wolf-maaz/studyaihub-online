# Templates README

Templates for studyaihub-online — Usage & export instructions

Overview
- This folder contains ready-to-use HTML templates:
  - cv-modern.html
  - cv-minimal.html
  - cv-creative.html
  - cv-professional.html
  - presentation-modern.html
  - presentation-portfolio.html
- Each template includes client-side buttons to download PDF and to download the HTML file.
- Fonts and accents used:
  - Inter (body), Poppins / Montserrat (headings), Merriweather (serif headings for professional CV)
  - Primary accents: Indigo #4F46E5, Coral #FF6B6B, Teal #06B6D4

How users can download or export PDFs (recommended)

1. In-browser (quickest)
   - Open the template file in a browser (Raw file or hosted page).
   - Use the on-page “Download PDF” button (client-side export) or use Print → Save as PDF.
   - Use the “Download HTML” button to save a standalone HTML file.

2. Server/CLI (batch or higher-quality PDFs)
   - Headless Chrome / Puppeteer (recommended for consistent results)
     - Example Node script (save as render.js):
       const puppeteer = require('puppeteer');
       (async () => {
         const browser = await puppeteer.launch();
         const page = await browser.newPage();
         await page.goto('https://raw.githubusercontent.com/Mr-wolf-maaz/studyaihub-online/main/templates/cv-minimal.html', {waitUntil: 'networkidle0'});
         await page.pdf({path: 'cv-minimal.pdf', format: 'A4', printBackground: true});
         await browser.close();
       })();
     - Run: node render.js
   - Headless Chrome CLI (if chrome/chromium available)
     - chrome --headless --disable-gpu --print-to-pdf=out.pdf "https://raw.githubusercontent.com/Mr-wolf-maaz/studyaihub-online/main/templates/cv-minimal.html"
   - wkhtmltopdf (good for simple HTML)
     - wkhtmltopdf https://raw.githubusercontent.com/Mr-wolf-maaz/studyaihub-online/main/templates/cv-minimal.html cv-minimal.pdf
   - pandoc (convert to DOCX or other text formats)
     - pandoc cv-minimal.html -o cv-minimal.docx

Notes on print quality and fonts
- For highest fidelity, use a headless browser (Puppeteer / Chrome) because it supports modern CSS and web fonts.
- If fonts are blocked/offline, PDFs will use fallback fonts; consider bundling fonts or self-hosting when generating server-side.
- All templates include @media print rules to remove UI chrome and output each slide/card cleanly onto PDF pages.

Accessibility & print
- Templates were created with readable font sizes and accessible color contrasts.
- Print-optimized rules are included to hide non-essential UI (buttons, nav) when printing.

Small troubleshooting
- If the PDF output is missing web fonts, ensure network access to Google Fonts or embed fonts locally.
- If images do not appear in PDF, use absolute URLs or host the images where the headless renderer can access them.

License & attribution
- These templates are provided under the repository’s existing license. If none is present, use them freely but please include attribution: “Templates by studyaihub-online”.

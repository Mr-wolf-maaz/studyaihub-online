# Templates Index

This directory contains CV and presentation templates (editable Markdown) added to help users quickly pick and download a template for CVs or presentations.

Folders added:
- templates/cv-creator/ — Markdown CV templates (modern, professional, minimal).
- templates/presentation-maker/ — Presentation templates in Markdown (pitch, academic, portfolio).
- templates/docx/ — generated DOCX files for each CV template (real binary .docx generated in-browser on export; files here are samples). If you want perfectly styled docx files, provide Office files or request custom designs.
- templates/pptx/ — generated PPTX files for each presentation template (samples/outlines). The site now supports exporting .pptx from Markdown using pptxgenjs on the client.

How to use:
- Open any .md file in the templates/ path to view and edit the template.
- On the /templates page you can preview and export templates to DOCX, PPTX, and PDF (client-side conversions).
- To provide your own .docx/.pptx files, replace the files in templates/docx/ or templates/pptx/ with valid Office files (same filenames) and update templates/data.json if needed.

If you'd like server-side generation (convert Markdown to Office files on the server), I can add API endpoints and install server tooling.

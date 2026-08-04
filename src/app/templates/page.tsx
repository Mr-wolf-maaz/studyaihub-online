"use client";

import React, { useEffect, useState, useRef } from "react";
import marked from "marked";
import PptxGenJS from "pptxgenjs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Template = {
  id: string;
  type: "cv" | "presentation";
  title: string;
  md: string;
  docx?: string;
  pptx?: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const previewRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/templates/data.json");
        const data = await res.json();
        setTemplates(data);

        // fetch markdown previews
        const previewMap: Record<string, string> = {};
        await Promise.all(
          data.map(async (t: Template) => {
            try {
              const r = await fetch(t.md);
              const text = await r.text();
              previewMap[t.id] = text;
            } catch {
              previewMap[t.id] = "Preview not available";
            }
          })
        );
        setPreviews(previewMap);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  function renderMarkdown(md: string) {
    try {
      return { __html: marked.parse(md) };
    } catch {
      return { __html: md };
    }
  }

  async function downloadPptx(t: Template) {
    try {
      const r = await fetch(t.md);
      const md = await r.text();
      const slides = md.split(/^-{3,}$/m).map((s) => s.trim()).filter(Boolean);
      const pptx = new PptxGenJS();
      slides.forEach((s) => {
        const slide = pptx.addSlide();
        slide.addText(s.replace(/\n/g, "\n"), { x: 0.5, y: 0.5, w: "90%", h: "80%", fontSize: 18 });
      });
      await pptx.writeFile({ fileName: `${t.id}.pptx` });
    } catch (e) {
      console.error("pptx error", e);
      alert("Failed to generate PPTX in browser.");
    }
  }

  async function downloadDocx(t: Template) {
    try {
      const r = await fetch(t.md);
      const md = await r.text();
      const lines = md.split(/\n+/).map((l) => l.trim()).filter(Boolean);
      const doc = new Document({
        sections: [
          {
            children: lines.map((l) => new Paragraph({ children: [new TextRun(l)] })),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${t.id}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("docx error", e);
      alert("Failed to generate DOCX in browser.");
    }
  }

  async function downloadPdf(t: Template) {
    try {
      const container = previewRefs.current[t.id];
      if (!container) {
        alert("Preview not available for PDF export");
        return;
      }
      const canvas = await html2canvas(container as HTMLElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${t.id}.pdf`);
    } catch (e) {
      console.error("pdf error", e);
      alert("Failed to generate PDF in browser.");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Templates</h1>
      <p className="text-slate-600 mb-8">Browse CVs and presentation templates. View the rendered preview or export to DOCX / PPTX / PDF.</p>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">All Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((t) => (
            <article key={t.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{t.title}</h3>
                <div className="text-sm text-slate-500">{t.type.toUpperCase()}</div>
              </div>

              <div className="mt-3 mb-3">
                <div
                  ref={(el) => (previewRefs.current[t.id] = el)}
                  className="preview-content border p-3 rounded bg-slate-50 h-56 overflow-auto"
                  dangerouslySetInnerHTML={renderMarkdown(previews[t.id] || "")}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <a href={t.md} target="_blank" rel="noreferrer" className="inline-block px-3 py-2 bg-indigo-600 text-white rounded">View Source</a>
                <button onClick={() => downloadDocx(t)} className="px-3 py-2 bg-slate-100 text-slate-700 rounded">Export .docx</button>
                <button onClick={() => downloadPptx(t)} className="px-3 py-2 bg-slate-100 text-slate-700 rounded">Export .pptx</button>
                <button onClick={() => downloadPdf(t)} className="px-3 py-2 bg-slate-100 text-slate-700 rounded">Export .pdf</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

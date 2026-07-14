"use client";

import { useState, useRef, useCallback } from "react";
import {
  Presentation, Download, Plus, Trash2, Type, Palette,
  Eye, Pencil, ChevronLeft, ChevronRight, Image, Layers, Sparkles,
} from "lucide-react";

interface Slide {
  id: string; title: string; content: string;
  layout: "title" | "content" | "two-column" | "image-focus" | "quote" | "blank";
  notes: string; imageUrl: string;
}

interface PresData {
  title: string; author: string; theme: string;
  slides: Slide[];
}

const themes = [
  { id: "student", name: "Student", desc: "Notebook & education", icon: "📚", color: "from-blue-500 to-cyan-500", headerBg: "linear-gradient(135deg, #3b82f6, #06b6d4)", accent: "#3b82f6" },
  { id: "business", name: "Business", desc: "Charts & corporate", icon: "📊", color: "from-slate-700 to-slate-900", headerBg: "linear-gradient(135deg, #1e293b, #334155)", accent: "#64748b" },
  { id: "tech", name: "Tech", desc: "Circuits & code", icon: "💻", color: "from-green-500 to-emerald-700", headerBg: "linear-gradient(135deg, #059669, #064e3b)", accent: "#10b981" },
  { id: "realestate", name: "Real Estate", desc: "Properties & buildings", icon: "🏠", color: "from-amber-500 to-orange-700", headerBg: "linear-gradient(135deg, #d97706, #92400e)", accent: "#f59e0b" },
  { id: "creative", name: "Creative", desc: "Bold & artistic", icon: "🎨", color: "from-pink-500 to-purple-700", headerBg: "linear-gradient(135deg, #ec4899, #7c3aed)", accent: "#ec4899" },
  { id: "minimal", name: "Minimal", desc: "Clean & simple", icon: "✨", color: "from-slate-100 to-white", headerBg: "linear-gradient(135deg, #f1f5f9, #e2e8f0)", accent: "#334155" },
];

const layoutOptions = [
  { id: "title" as const, name: "Title Slide", icon: Type },
  { id: "content" as const, name: "Content", icon: Layers },
  { id: "two-column" as const, name: "Two Column", icon: Layers },
  { id: "image-focus" as const, name: "Image Focus", icon: Image },
  { id: "quote" as const, name: "Quote", icon: Sparkles },
  { id: "blank" as const, name: "Blank", icon: Type },
];

const defaultSlides: Slide[] = [
  { id: "1", title: "Welcome to Your Presentation", content: "A comprehensive guide to success", layout: "title", notes: "", imageUrl: "" },
  { id: "2", title: "Key Points", content: "• First important point\n• Second important point\n• Third important point\n• Fourth important point", layout: "content", notes: "Discuss each point", imageUrl: "" },
  { id: "3", title: "Our Vision", content: "Left column content\n\n• Point A\n• Point B", layout: "two-column", notes: "", imageUrl: "" },
  { id: "4", title: "Inspiration", content: "The only way to do great work is to love what you do.", layout: "quote", notes: "Steve Jobs quote", imageUrl: "" },
];

/* ─── Themed Slide Decorations ─── */
function StudentDecorations() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.08 }}>
      <div style={{ position: "absolute", top: "10%", right: "5%", fontSize: "80px" }}>📚</div>
      <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: "60px" }}>🎓</div>
      <div style={{ position: "absolute", top: "50%", right: "15%", fontSize: "40px" }}>✏️</div>
      <div style={{ position: "absolute", bottom: "5%", right: "10%", fontSize: "50px" }}>📖</div>
      {/* Ruled lines */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: "5%", right: "5%", top: `${8 + i * 4.5}%`, borderBottom: "1px solid #3b82f6", opacity: 0.3 }} />
      ))}
    </div>
  );
}

function BusinessDecorations() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.06 }}>
      {/* Bar chart */}
      <div style={{ position: "absolute", bottom: "15%", right: "8%", display: "flex", alignItems: "flex-end", gap: "8px" }}>
        {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
          <div key={i} style={{ width: "12px", height: `${h}px`, background: "#64748b", borderRadius: "3px 3px 0 0" }} />
        ))}
      </div>
      {/* Pie chart */}
      <div style={{ position: "absolute", top: "10%", right: "6%", width: "80px", height: "80px", borderRadius: "50%", border: "8px solid #94a3b8", borderTopColor: "#475569", borderRightColor: "#64748b" }} />
      {/* Line graph */}
      <svg style={{ position: "absolute", bottom: "12%", left: "5%", width: "150px", height: "60px", opacity: 0.5 }}>
        <polyline points="0,50 25,35 50,40 75,20 100,25 125,10 150,15" fill="none" stroke="#64748b" strokeWidth="2" />
      </svg>
      <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: "40px" }}>📈</div>
    </div>
  );
}

function TechDecorations() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.07 }}>
      {/* Circuit lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1="10%" y1="20%" x2="40%" y2="20%" stroke="#10b981" strokeWidth="1" />
        <line x1="40%" y1="20%" x2="40%" y2="50%" stroke="#10b981" strokeWidth="1" />
        <line x1="40%" y1="50%" x2="70%" y2="50%" stroke="#10b981" strokeWidth="1" />
        <line x1="70%" y1="50%" x2="70%" y2="80%" stroke="#10b981" strokeWidth="1" />
        <line x1="60%" y1="10%" x2="90%" y2="10%" stroke="#10b981" strokeWidth="1" />
        <line x1="90%" y1="10%" x2="90%" y2="40%" stroke="#10b981" strokeWidth="1" />
        <circle cx="40%" cy="20%" r="3" fill="#10b981" /><circle cx="70%" cy="50%" r="3" fill="#10b981" />
        <circle cx="90%" cy="10%" r="3" fill="#10b981" />
      </svg>
      <div style={{ position: "absolute", top: "8%", right: "8%", fontSize: "60px" }}>💻</div>
      <div style={{ position: "absolute", bottom: "8%", left: "5%", fontSize: "50px" }}>🖥️</div>
      <div style={{ position: "absolute", top: "40%", left: "3%", fontSize: "35px" }}>⌨️</div>
      <div style={{ position: "absolute", bottom: "20%", right: "5%", fontSize: "40px" }}>🔧</div>
      {/* Code snippet background */}
      <div style={{ position: "absolute", top: "15%", left: "5%", fontFamily: "monospace", fontSize: "10px", color: "#10b981", lineHeight: "1.6" }}>
        &lt;div className=&quot;app&quot;&gt;<br />&nbsp;&nbsp;&lt;Header /&gt;<br />&nbsp;&nbsp;&lt;Main /&gt;<br />&lt;/div&gt;
      </div>
    </div>
  );
}

function RealEstateDecorations() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.07 }}>
      <div style={{ position: "absolute", top: "8%", right: "8%", fontSize: "70px" }}>🏠</div>
      <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: "60px" }}>🏢</div>
      <div style={{ position: "absolute", top: "35%", right: "5%", fontSize: "50px" }}>🏗️</div>
      <div style={{ position: "absolute", bottom: "5%", right: "15%", fontSize: "40px" }}>🔑</div>
      {/* Building silhouette */}
      <svg style={{ position: "absolute", bottom: 0, left: "10%", width: "200px", height: "100px", opacity: 0.5 }}>
        <rect x="10" y="30" width="30" height="70" fill="#92400e" rx="2" />
        <rect x="50" y="10" width="40" height="90" fill="#92400e" rx="2" />
        <rect x="100" y="40" width="25" height="60" fill="#92400e" rx="2" />
        <rect x="135" y="20" width="35" height="80" fill="#92400e" rx="2" />
      </svg>
    </div>
  );
}

function CreativeDecorations() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.08 }}>
      <div style={{ position: "absolute", top: "5%", right: "10%", width: "120px", height: "120px", borderRadius: "50%", background: "linear-gradient(135deg, #f472b6, #a78bfa)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #fb923c, #f472b6)" }} />
      <div style={{ position: "absolute", top: "50%", right: "5%", width: "50px", height: "50px", transform: "rotate(45deg)", background: "linear-gradient(135deg, #c084fc, #60a5fa)" }} />
      <div style={{ position: "absolute", top: "15%", left: "8%", fontSize: "40px" }}>🎨</div>
      <div style={{ position: "absolute", bottom: "20%", right: "20%", fontSize: "35px" }}>✨</div>
    </div>
  );
}

function MinimalDecorations() {
  return null;
}

const decorationMap: Record<string, React.ComponentType> = {
  student: StudentDecorations,
  business: BusinessDecorations,
  tech: TechDecorations,
  realestate: RealEstateDecorations,
  creative: CreativeDecorations,
  minimal: MinimalDecorations,
};

/* ─── Slide Renderer ─── */
function renderSlideContent(s: Slide, themeId: string) {
  const theme = themes.find((t) => t.id === themeId)!;
  const Decor = decorationMap[themeId];
  const isDark = themeId !== "minimal";
  const textColor = isDark ? "#ffffff" : "#1e293b";
  const subtextColor = isDark ? "rgba(255,255,255,0.8)" : "#64748b";

  const slideStyle: React.CSSProperties = {
    width: "960px", height: "540px", position: "relative",
    background: theme.headerBg, color: textColor, fontFamily: "system-ui, sans-serif",
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px",
    overflow: "hidden",
  };

  // data-slide attribute is used for PDF capture

  const contentMap: Record<string, React.ReactNode> = {
    title: (
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px" }}>{s.title}</h1>
        <p style={{ fontSize: "18px", color: subtextColor }}>{s.content}</p>
        {s.imageUrl && <img src={s.imageUrl} alt="" style={{ maxWidth: "200px", maxHeight: "120px", objectFit: "cover", borderRadius: "8px", marginTop: "16px", marginLeft: "auto", marginRight: "auto" }} />}
      </div>
    ),
    content: (
      <div style={{ width: "100%", textAlign: "left", zIndex: 1 }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>{s.title}</h2>
        <div style={{ fontSize: "16px", color: subtextColor, whiteSpace: "pre-line", lineHeight: "1.8" }}>{s.content}</div>
        {s.imageUrl && <img src={s.imageUrl} alt="" style={{ maxWidth: "300px", maxHeight: "160px", objectFit: "cover", borderRadius: "8px", marginTop: "16px" }} />}
      </div>
    ),
    "two-column": (
      <div style={{ width: "100%", zIndex: 1 }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>{s.title}</h2>
        <div style={{ display: "flex", gap: "24px" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "16px", fontSize: "14px", color: subtextColor, whiteSpace: "pre-line" }}>{s.content}</div>
          <div style={{ flex: 1 }}>
            {s.imageUrl ? (
              <img src={s.imageUrl} alt="" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            ) : (
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "16px", fontSize: "14px", color: subtextColor }}>
                <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                  <li>Key insight one</li><li>Key insight two</li><li>Key insight three</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    "image-focus": (
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "32px", zIndex: 1 }}>
        <div style={{ flex: 1 }}>
          {s.imageUrl ? (
            <img src={s.imageUrl} alt="" style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "12px" }} />
          ) : (
            <div style={{ width: "100%", height: "280px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🖼️</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>{s.title}</h2>
          <p style={{ fontSize: "15px", color: subtextColor, lineHeight: "1.7" }}>{s.content}</p>
        </div>
      </div>
    ),
    quote: (
      <div style={{ textAlign: "center", maxWidth: "640px", zIndex: 1 }}>
        <p style={{ fontSize: "24px", fontStyle: "italic", color: subtextColor, marginBottom: "16px" }}>&ldquo;{s.content}&rdquo;</p>
        <p style={{ fontSize: "14px", fontWeight: "600", opacity: 0.6 }}>— {s.title}</p>
      </div>
    ),
    blank: (
      <div style={{ width: "100%", textAlign: "left", zIndex: 1 }}>
        {s.title && <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>{s.title}</h2>}
        <div style={{ fontSize: "16px", color: subtextColor, whiteSpace: "pre-line", lineHeight: "1.8" }}>{s.content}</div>
        {s.imageUrl && <img src={s.imageUrl} alt="" style={{ maxWidth: "400px", maxHeight: "240px", objectFit: "cover", borderRadius: "8px", marginTop: "16px" }} />}
      </div>
    ),
  };

  return (
    <div style={slideStyle} data-slide="true">
      <Decor />
      {contentMap[s.layout] || contentMap.content}
    </div>
  );
}

export default function PresentationMakerPage() {
  const [data, setData] = useState<PresData>({
    title: "My Presentation", author: "Student", theme: "student", slides: defaultSlides,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const slide = data.slides[currentSlide];

  const updateSlide = (field: keyof Slide, value: string) => {
    setData((d) => ({ ...d, slides: d.slides.map((s, i) => (i === currentSlide ? { ...s, [field]: value } : s)) }));
  };
  const updateSlideLayout = (layout: Slide["layout"]) => {
    setData((d) => ({ ...d, slides: d.slides.map((s, i) => (i === currentSlide ? { ...s, layout } : s)) }));
  };

  const addSlide = () => {
    const newSlide: Slide = { id: crypto.randomUUID(), title: "New Slide", content: "Slide content here", layout: "content", notes: "", imageUrl: "" };
    setData((d) => { const slides = [...d.slides]; slides.splice(currentSlide + 1, 0, newSlide); return { ...d, slides }; });
    setCurrentSlide((c) => c + 1);
  };
  const removeSlide = () => {
    if (data.slides.length <= 1) return;
    setData((d) => ({ ...d, slides: d.slides.filter((_, i) => i !== currentSlide) }));
    setCurrentSlide((c) => Math.min(c, data.slides.length - 2));
  };
  const moveSlide = (dir: -1 | 1) => {
    const newIdx = currentSlide + dir;
    if (newIdx < 0 || newIdx >= data.slides.length) return;
    setData((d) => { const slides = [...d.slides]; [slides[currentSlide], slides[newIdx]] = [slides[newIdx], slides[currentSlide]]; return { ...d, slides }; });
    setCurrentSlide(newIdx);
  };

  const downloadPDF = useCallback(async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < data.slides.length; i++) {
        setCurrentSlide(i);
        // Wait for React to re-render the capture element with the new slide
        await new Promise(r => setTimeout(r, 600));

        const el = captureRef.current;
        if (!el) continue;

        // Clone the element and put it ON SCREEN so html2canvas can capture it
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.left = "0";
        clone.style.top = "0";
        clone.style.zIndex = "-1";
        clone.style.opacity = "1";
        clone.style.pointerEvents = "none";
        document.body.appendChild(clone);

        await new Promise(r => setTimeout(r, 200));

        const canvas = await html2canvas(clone, {
          scale: 2,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          width: 960,
          height: 540,
        });

        // Remove the clone immediately
        document.body.removeChild(clone);

        const imgData = canvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      }

      pdf.save(`${data.title.replace(/\s+/g, "_")}_Presentation.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF download failed. Please try the PPT option.");
    }
    setDownloading(false);
  }, [data]);

  const downloadPPT = useCallback(async () => {
    setDownloading(true);
    try {
      const PptxGenJS = (await import("pptxgenjs")).default;
      const pptx = new PptxGenJS();
      pptx.layout = "LAYOUT_WIDE";
      pptx.author = data.author;
      pptx.title = data.title;
      const themeColors: Record<string, string> = { student: "3B82F6", business: "1E293B", tech: "059669", realestate: "D97706", creative: "EC4899", minimal: "F1F5F9" };
      const textColors: Record<string, string> = { student: "FFFFFF", business: "FFFFFF", tech: "FFFFFF", realestate: "FFFFFF", creative: "FFFFFF", minimal: "1E293B" };
      const bgColor = themeColors[data.theme] || "3B82F6";
      const txtColor = textColors[data.theme] || "FFFFFF";

      data.slides.forEach((s) => {
        const sl = pptx.addSlide();
        sl.background = { fill: bgColor };
        if (s.layout === "title") {
          sl.addText(s.title, { x: 0.5, y: 1.5, w: "90%", h: 2, fontSize: 36, bold: true, color: txtColor, align: "center" });
          sl.addText(s.content, { x: 1, y: 3.5, w: "80%", h: 1, fontSize: 18, color: txtColor + "CC", align: "center" });
        } else if (s.layout === "quote") {
          sl.addText(`"${s.content}"`, { x: 1, y: 1.5, w: "80%", h: 3, fontSize: 28, italic: true, color: txtColor, align: "center", valign: "middle" });
          sl.addText(`— ${s.title}`, { x: 1, y: 4.5, w: "80%", h: 0.8, fontSize: 16, color: txtColor + "99", align: "center" });
        } else {
          sl.addText(s.title, { x: 0.5, y: 0.3, w: "90%", h: 1, fontSize: 28, bold: true, color: txtColor });
          sl.addText(s.content, { x: 0.5, y: 1.3, w: "90%", h: 4.5, fontSize: 16, color: txtColor + "DD", lineSpacingMultiple: 1.5 });
        }
        if (s.imageUrl) {
          sl.addImage({ path: s.imageUrl, x: 5, y: 1.5, w: 4, h: 3 });
        }
      });
      await pptx.writeFile({ fileName: `${data.title.replace(/\s+/g, "_")}_Presentation.pptx` });
    } catch (err) { console.error(err); alert("PPT generation failed."); }
    setDownloading(false);
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hidden capture area — always in DOM for PDF capture */}
      <div style={{ position: "fixed", left: "-10000px", top: 0, zIndex: -9999, opacity: 1, pointerEvents: "none" }}>
        <div ref={captureRef}>
          {renderSlideContent(slide, data.theme)}
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Presentation className="text-purple-600" size={28} /> Presentation Maker</h1>
            <p className="text-sm text-slate-500 mt-1">Create stunning presentations with themed designs</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setView(view === "edit" ? "preview" : "edit")} className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
              {view === "edit" ? <><Eye size={16} /> Present</> : <><Pencil size={16} /> Edit</>}
            </button>
            <button onClick={downloadPDF} disabled={downloading} className="flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50">
              <Download size={16} /> {downloading ? "..." : "PDF"}
            </button>
            <button onClick={downloadPPT} disabled={downloading} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50">
              <Download size={16} /> {downloading ? "..." : "PPT"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left: Controls */}
        <div className={`lg:w-1/3 ${view === "preview" ? "hidden lg:block" : ""}`}>
          {/* Slide thumbnails */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Slides ({data.slides.length})</h3>
              <button onClick={addSlide} className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-700"><Plus size={14} /> Add</button>
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {data.slides.map((s, i) => (
                <button key={s.id} onClick={() => setCurrentSlide(i)}
                  className={`w-full text-left p-2 rounded-lg border-2 transition text-xs ${i === currentSlide ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400 w-5">{i + 1}</span>
                    <div className={`flex-1 h-10 rounded ${themes.find((t) => t.id === data.theme)?.color || ""} flex items-center justify-center text-xs px-2 truncate text-white`}>
                      {s.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Palette size={16} className="text-purple-600" /> Presentation Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button key={t.id} onClick={() => setData((d) => ({ ...d, theme: t.id }))}
                  className={`p-3 rounded-xl border-2 transition text-center ${data.theme === t.id ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className={`w-full h-4 rounded bg-gradient-to-r ${t.color} mb-1`} />
                  <p className="text-xs font-medium">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
            <h3 className="font-bold text-sm mb-3">Slide Layout</h3>
            <div className="grid grid-cols-3 gap-2">
              {layoutOptions.map((l) => (
                <button key={l.id} onClick={() => updateSlideLayout(l.id)}
                  className={`p-2 rounded-lg border-2 transition text-center ${slide.layout === l.id ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <l.icon size={16} className="mx-auto mb-1" />
                  <span className="text-xs">{l.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slide editor */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-bold text-sm mb-3">Edit Slide {currentSlide + 1}</h3>
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Title</label><input value={slide.title} onChange={(e) => updateSlide("title", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Content</label><textarea value={slide.content} onChange={(e) => updateSlide("content", e.target.value)} rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Image URL</label><input value={slide.imageUrl} onChange={(e) => updateSlide("imageUrl", e.target.value)} placeholder="https://example.com/image.jpg" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                {slide.imageUrl && <img src={slide.imageUrl} alt="Preview" className="mt-2 max-h-24 rounded-lg object-cover" />}
              </div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Speaker Notes</label><textarea value={slide.notes} onChange={(e) => updateSlide("notes", e.target.value)} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" /></div>
              <div className="flex gap-2">
                <button onClick={() => moveSlide(-1)} disabled={currentSlide === 0} className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-30"><ChevronLeft size={16} /></button>
                <button onClick={() => moveSlide(1)} disabled={currentSlide === data.slides.length - 1} className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-30"><ChevronRight size={16} /></button>
                <button onClick={addSlide} className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"><Plus size={14} /> Add</button>
                <button onClick={removeSlide} disabled={data.slides.length <= 1} className="flex items-center gap-1 px-3 py-2 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50 disabled:opacity-30"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </div>

          {/* Presentation info */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mt-4">
            <h3 className="font-bold text-sm mb-3">Presentation Info</h3>
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Title</label><input value={data.title} onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Author</label><input value={data.author} onChange={(e) => setData((d) => ({ ...d, author: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className={`lg:w-2/3 ${view === "edit" ? "hidden lg:block" : ""}`}>
          <div className="sticky top-20">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
              <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-200">
                <span className="text-sm font-medium text-slate-600">Slide {currentSlide + 1} of {data.slides.length}</span>
                <span className="text-xs text-slate-400">{themes.find((t) => t.id === data.theme)?.name} · {slide.layout}</span>
              </div>
              <div className="p-6 overflow-auto" ref={previewRef}>
                <div className="origin-top-left" style={{ transform: "scale(0.6)", transformOrigin: "top left" }}>
                  {renderSlideContent(slide, data.theme)}
                </div>
              </div>
              {slide.notes && <div className="border-t border-slate-200 bg-yellow-50 px-4 py-2"><p className="text-xs text-slate-500"><strong>Notes:</strong> {slide.notes}</p></div>}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0} className="p-2 bg-white border border-slate-300 rounded-full shadow hover:bg-slate-50 disabled:opacity-30"><ChevronLeft size={20} /></button>
              {data.slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition ${i === currentSlide ? "bg-purple-600 scale-125" : "bg-slate-300 hover:bg-slate-400"}`} />))}
              <button onClick={() => setCurrentSlide(Math.min(data.slides.length - 1, currentSlide + 1))} disabled={currentSlide === data.slides.length - 1} className="p-2 bg-white border border-slate-300 rounded-full shadow hover:bg-slate-50 disabled:opacity-30"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

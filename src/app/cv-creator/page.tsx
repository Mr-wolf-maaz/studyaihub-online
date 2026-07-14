"use client";

import { useState, useRef, useCallback } from "react";
import {
  FileText, Download, Eye, Pencil, Plus, Trash2, Check,
  Briefcase, GraduationCap, User, Sparkles,
} from "lucide-react";

interface PersonalInfo {
  fullName: string; email: string; phone: string; address: string;
  summary: string; website: string; linkedin: string;
}
interface Experience {
  id: string; company: string; position: string; startDate: string;
  endDate: string; current: boolean; description: string;
}
interface Education {
  id: string; institution: string; degree: string; field: string;
  startDate: string; endDate: string; gpa: string;
}
interface CVData {
  personal: PersonalInfo; experiences: Experience[];
  education: Education[]; skills: string[];
}

const emptyExp = (): Experience => ({
  id: crypto.randomUUID(), company: "", position: "",
  startDate: "", endDate: "", current: false, description: "",
});
const emptyEdu = (): Education => ({
  id: crypto.randomUUID(), institution: "", degree: "",
  field: "", startDate: "", endDate: "", gpa: "",
});

const defaultCV: CVData = {
  personal: {
    fullName: "John Smith", email: "john.smith@email.com",
    phone: "+1 (555) 123-4567", address: "New York, NY",
    summary: "Experienced software developer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies.",
    website: "johnsmith.dev", linkedin: "linkedin.com/in/johnsmith",
  },
  experiences: [
    { id: "1", company: "Tech Corp", position: "Senior Developer", startDate: "2021-01", endDate: "", current: true, description: "Led a team of 5 developers building cloud-native applications. Implemented CI/CD pipelines reducing deployment time by 60%." },
    { id: "2", company: "StartupXYZ", position: "Full Stack Developer", startDate: "2019-06", endDate: "2020-12", current: false, description: "Developed web applications using React and Node.js. Designed RESTful APIs serving 100K+ daily requests." },
  ],
  education: [
    { id: "1", institution: "State University", degree: "Bachelor of Science", field: "Computer Science", startDate: "2015-09", endDate: "2019-05", gpa: "3.8" },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
};

const templates = [
  { id: "professional", name: "Professional", desc: "Clean corporate style", color: "from-blue-600 to-blue-800" },
  { id: "modern", name: "Modern", desc: "Contemporary two-column", color: "from-indigo-500 to-purple-600" },
  { id: "creative", name: "Creative", desc: "Bold & colorful", color: "from-pink-500 to-orange-500" },
  { id: "minimal", name: "Minimal", desc: "Simple & elegant", color: "from-slate-600 to-slate-800" },
  { id: "ats", name: "ATS Optimized", desc: "Parser-friendly format", color: "from-emerald-600 to-green-700" },
];

/* ─── Template Components ─── */
function ProfessionalTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-800 p-8 font-serif" style={{ fontSize: "11px", lineHeight: "1.5", width: "794px", minHeight: "1123px" }}>
      <header className="border-b-2 border-blue-800 pb-4 mb-4">
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e3a5f" }}>{data.personal.fullName}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px", color: "#64748b" }}>
          <span>{data.personal.email}</span><span>{data.personal.phone}</span><span>{data.personal.address}</span>
          {data.personal.website && <span>{data.personal.website}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </header>
      {data.personal.summary && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Professional Summary</h2>
          <p style={{ color: "#334155" }}>{data.personal.summary}</p>
        </section>
      )}
      {data.experiences.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Work Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><p style={{ fontWeight: "bold" }}>{exp.position}</p><p style={{ color: "#64748b" }}>{exp.company}</p></div>
                <p style={{ color: "#94a3b8" }}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
              </div>
              <p style={{ marginTop: "4px", color: "#334155" }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
      {data.education.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><p style={{ fontWeight: "bold" }}>{edu.degree} in {edu.field}</p><p style={{ color: "#64748b" }}>{edu.institution}</p></div>
                <p style={{ color: "#94a3b8" }}>{edu.startDate} — {edu.endDate}</p>
              </div>
              {edu.gpa && <p style={{ color: "#64748b" }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}
      {data.skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Skills</h2>
          <p style={{ color: "#334155" }}>{data.skills.join("  •  ")}</p>
        </section>
      )}
    </div>
  );
}

function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-800 font-sans" style={{ fontSize: "11px", lineHeight: "1.5", width: "794px", minHeight: "1123px", display: "flex" }}>
      <div style={{ width: "33%", background: "linear-gradient(to bottom, #4f46e5, #7c3aed)", color: "white", padding: "24px" }}>
        <div style={{ width: "64px", height: "64px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold", margin: "0 auto 16px" }}>
          {data.personal.fullName.split(" ").map((n) => n[0]).join("")}
        </div>
        <h1 style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}>{data.personal.fullName}</h1>
        <div style={{ fontSize: "11px", color: "#c7d2fe", lineHeight: "2" }}>
          <p>📧 {data.personal.email}</p><p>📱 {data.personal.phone}</p><p>📍 {data.personal.address}</p>
          {data.personal.website && <p>🌐 {data.personal.website}</p>}
          {data.personal.linkedin && <p>💼 {data.personal.linkedin}</p>}
        </div>
        {data.skills.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "4px" }}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.skills.map((s) => <span key={s} style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px", fontSize: "10px" }}>{s}</span>)}
            </div>
          </div>
        )}
      </div>
      <div style={{ width: "67%", padding: "24px" }}>
        {data.personal.summary && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>About Me</h2><p style={{ color: "#334155" }}>{data.personal.summary}</p></section>)}
        {data.experiences.length > 0 && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Experience</h2>{data.experiences.map((exp) => (<div key={exp.id} style={{ marginBottom: "12px", borderLeft: "2px solid #c7d2fe", paddingLeft: "12px" }}><p style={{ fontWeight: "bold" }}>{exp.position}</p><p style={{ color: "#4f46e5" }}>{exp.company} · {exp.startDate} — {exp.current ? "Present" : exp.endDate}</p><p style={{ marginTop: "4px", color: "#475569" }}>{exp.description}</p></div>))}</section>)}
        {data.education.length > 0 && (<section><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Education</h2>{data.education.map((edu) => (<div key={edu.id} style={{ marginBottom: "8px", borderLeft: "2px solid #c7d2fe", paddingLeft: "12px" }}><p style={{ fontWeight: "bold" }}>{edu.degree} in {edu.field}</p><p style={{ color: "#4f46e5" }}>{edu.institution}</p><p style={{ color: "#94a3b8" }}>{edu.startDate} — {edu.endDate}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p></div>))}</section>)}
      </div>
    </div>
  );
}

function CreativeTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-800 font-sans" style={{ fontSize: "11px", lineHeight: "1.5", width: "794px", minHeight: "1123px" }}>
      <header style={{ background: "linear-gradient(to right, #ec4899, #f97316)", color: "white", padding: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800" }}>{data.personal.fullName}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px", color: "#fce7f3" }}>
          <span>{data.personal.email}</span><span>|</span><span>{data.personal.phone}</span><span>|</span><span>{data.personal.address}</span>
        </div>
      </header>
      <div style={{ padding: "32px" }}>
        {data.personal.summary && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>✦ Summary</h2><p style={{ color: "#334155" }}>{data.personal.summary}</p></section>)}
        {data.experiences.length > 0 && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>✦ Experience</h2>{data.experiences.map((exp) => (<div key={exp.id} style={{ marginBottom: "16px", background: "linear-gradient(to right, #fdf2f8, #fff7ed)", borderRadius: "8px", padding: "16px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><p style={{ fontWeight: "bold", fontSize: "14px" }}>{exp.position}</p><span style={{ color: "#ec4899", fontWeight: "500" }}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span></div><p style={{ color: "#ec4899", fontWeight: "500" }}>{exp.company}</p><p style={{ marginTop: "4px", color: "#475569" }}>{exp.description}</p></div>))}</section>)}
        {data.education.length > 0 && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>✦ Education</h2>{data.education.map((edu) => (<div key={edu.id} style={{ marginBottom: "8px" }}><p style={{ fontWeight: "bold" }}>{edu.degree} in {edu.field}</p><p style={{ color: "#64748b" }}>{edu.institution} · {edu.startDate} — {edu.endDate}</p></div>))}</section>)}
        {data.skills.length > 0 && (<section><h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>✦ Skills</h2><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{data.skills.map((s) => <span key={s} style={{ background: "linear-gradient(to right, #ec4899, #f97316)", color: "white", padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: "500" }}>{s}</span>)}</div></section>)}
      </div>
    </div>
  );
}

function MinimalTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-800 font-sans" style={{ fontSize: "11px", lineHeight: "1.6", width: "794px", minHeight: "1123px", padding: "32px" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "300", letterSpacing: "0.02em" }}>{data.personal.fullName}</h1>
        <div style={{ marginTop: "8px", color: "#94a3b8", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <span>{data.personal.email}</span><span>·</span><span>{data.personal.phone}</span><span>·</span><span>{data.personal.address}</span>
        </div>
      </header>
      {data.personal.summary && (<section style={{ marginBottom: "20px" }}><p style={{ color: "#64748b", fontStyle: "italic" }}>{data.personal.summary}</p></section>)}
      {data.experiences.length > 0 && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em", color: "#94a3b8", marginBottom: "12px" }}>Experience</h2>{data.experiences.map((exp) => (<div key={exp.id} style={{ marginBottom: "16px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><p style={{ fontWeight: "500" }}>{exp.position} <span style={{ color: "#94a3b8" }}>at</span> {exp.company}</p><p style={{ color: "#94a3b8" }}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p></div><p style={{ marginTop: "4px", color: "#475569" }}>{exp.description}</p></div>))}</section>)}
      {data.education.length > 0 && (<section style={{ marginBottom: "20px" }}><h2 style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em", color: "#94a3b8", marginBottom: "12px" }}>Education</h2>{data.education.map((edu) => (<div key={edu.id} style={{ marginBottom: "8px" }}><p style={{ fontWeight: "500" }}>{edu.degree} in {edu.field}</p><p style={{ color: "#64748b" }}>{edu.institution} · {edu.startDate} — {edu.endDate}</p></div>))}</section>)}
      {data.skills.length > 0 && (<section><h2 style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em", color: "#94a3b8", marginBottom: "12px" }}>Skills</h2><p style={{ color: "#475569" }}>{data.skills.join(" / ")}</p></section>)}
    </div>
  );
}

function ATSTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-black font-sans" style={{ fontSize: "12px", lineHeight: "1.5", width: "794px", minHeight: "1123px", padding: "32px" }}>
      <header style={{ marginBottom: "12px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{data.personal.fullName}</h1>
        <p style={{ marginTop: "4px" }}>{data.personal.email} | {data.personal.phone} | {data.personal.address}{data.personal.website ? ` | ${data.personal.website}` : ""}{data.personal.linkedin ? ` | ${data.personal.linkedin}` : ""}</p>
      </header>
      <hr style={{ border: "1px solid black", marginBottom: "12px" }} />
      {data.personal.summary && (<section style={{ marginBottom: "12px" }}><h2 style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "13px", marginBottom: "4px" }}>Professional Summary</h2><p>{data.personal.summary}</p></section>)}
      {data.experiences.length > 0 && (<section style={{ marginBottom: "12px" }}><h2 style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "13px", marginBottom: "4px" }}>Professional Experience</h2>{data.experiences.map((exp) => (<div key={exp.id} style={{ marginBottom: "8px" }}><p style={{ fontWeight: "bold" }}>{exp.position}, {exp.company}</p><p style={{ fontStyle: "italic" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p><ul style={{ marginLeft: "16px", listStyle: "disc" }}>{exp.description.split(". ").filter(Boolean).map((d, i) => <li key={i}>{d.replace(/\.$/, "")}</li>)}</ul></div>))}</section>)}
      {data.education.length > 0 && (<section style={{ marginBottom: "12px" }}><h2 style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "13px", marginBottom: "4px" }}>Education</h2>{data.education.map((edu) => (<div key={edu.id} style={{ marginBottom: "4px" }}><p style={{ fontWeight: "bold" }}>{edu.degree} in {edu.field}, {edu.institution}</p><p>{edu.startDate} - {edu.endDate}{edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</p></div>))}</section>)}
      {data.skills.length > 0 && (<section><h2 style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "13px", marginBottom: "4px" }}>Technical Skills</h2><p>{data.skills.join(", ")}</p></section>)}
    </div>
  );
}

const templateMap: Record<string, React.ComponentType<{ data: CVData }>> = {
  professional: ProfessionalTemplate, modern: ModernTemplate,
  creative: CreativeTemplate, minimal: MinimalTemplate, ats: ATSTemplate,
};

export default function CVCreatorPage() {
  const [data, setData] = useState<CVData>(defaultCV);
  const [template, setTemplate] = useState("professional");
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePersonal = (field: keyof PersonalInfo, value: string) => {
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
  };
  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setData((d) => ({ ...d, experiences: d.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
  };
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setData((d) => ({ ...d, education: d.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
  };
  const addExperience = () => setData((d) => ({ ...d, experiences: [...d.experiences, emptyExp()] }));
  const removeExperience = (id: string) => setData((d) => ({ ...d, experiences: d.experiences.filter((e) => e.id !== id) }));
  const addEducation = () => setData((d) => ({ ...d, education: [...d.education, emptyEdu()] }));
  const removeEducation = (id: string) => setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  const [skillInput, setSkillInput] = useState("");
  const addSkill = () => { if (skillInput.trim()) { setData((d) => ({ ...d, skills: [...d.skills, skillInput.trim()] })); setSkillInput(""); } };
  const removeSkill = (i: number) => setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  const downloadPDF = useCallback(async () => {
    setDownloading(true);
    try {
      const jsPDF = (await import("jspdf")).default;
      const pdf = new jsPDF("p", "mm", "a4");
      const W = 210, H = 297, M = 20;
      const p = data.personal;
      const cw = W - M * 2;

      // Helper: wrapped text, returns height used
      const wt = (txt: string, x: number, y: number, fs: number, maxW: number, color: [number,number,number], style: string, align?: "left"|"center") => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(fs);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(txt, maxW);
        pdf.text(lines, align === "center" ? W / 2 : x, y, align ? { align } : undefined);
        return lines.length * fs * 0.4;
      };

      if (template === "professional") {
        // Blue header band
        pdf.setFillColor(30, 58, 95);
        pdf.rect(0, 0, W, 38, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(22);
        pdf.text(p.fullName, M, 16);
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(9);
        pdf.text([p.email, p.phone, p.address, p.website || "", p.linkedin || ""].filter(Boolean).join("  |  "), M, 28);
        let y = 48;
        if (p.summary) { wt("PROFESSIONAL SUMMARY", M, y, 11, cw, [30,58,95], "bold"); y += 5; y += wt(p.summary, M, y, 9.5, cw, [51,65,85], "normal"); y += 7; }
        if (data.experiences.length > 0) { wt("WORK EXPERIENCE", M, y, 11, cw, [30,58,95], "bold"); y += 5;
          for (const e of data.experiences) { wt(e.position + "  —  " + e.company, M, y, 10, cw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(100,116,139);
            pdf.text(e.startDate + " — " + (e.current ? "Present" : e.endDate), M, y); y += 4;
            y += wt(e.description, M, y, 9, cw, [51,65,85], "normal"); y += 5; }
        }
        if (data.education.length > 0) { wt("EDUCATION", M, y, 11, cw, [30,58,95], "bold"); y += 5;
          for (const e of data.education) { wt(e.degree + " in " + e.field, M, y, 10, cw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(100,116,139);
            pdf.text(e.institution + "  |  " + e.startDate + " — " + e.endDate + (e.gpa ? "  |  GPA: " + e.gpa : ""), M, y); y += 5; }
        }
        if (data.skills.length > 0) { y += 3; wt("SKILLS", M, y, 11, cw, [30,58,95], "bold"); y += 5; wt(data.skills.join("  •  "), M, y, 9.5, cw, [51,65,85], "normal"); }
      } else if (template === "modern") {
        // Two-column: left sidebar
        const sw = 68, cx = sw + 6, ciw = W - cx - M;
        pdf.setFillColor(79, 70, 229);
        pdf.rect(0, 0, sw, H, "F");
        pdf.setTextColor(255,255,255);
        // Initials circle
        pdf.setFillColor(255,255,255); pdf.circle(sw/2, 30, 14, "F");
        pdf.setTextColor(79,70,229); pdf.setFont("helvetica","bold"); pdf.setFontSize(16);
        pdf.text(p.fullName.split(" ").map(n=>n[0]).join(""), sw/2, 33, {align:"center"});
        pdf.setTextColor(255,255,255);
        pdf.setFont("helvetica","bold"); pdf.setFontSize(13);
        pdf.text(p.fullName, sw/2, 54, {align:"center"});
        pdf.setFont("helvetica","normal"); pdf.setFontSize(8);
        let sy = 66;
        [p.email, p.phone, p.address, p.website, p.linkedin].filter(Boolean).forEach(v => { pdf.text(v, sw/2, sy, {align:"center"}); sy += 5; });
        // Skills on sidebar
        if (data.skills.length > 0) { sy += 8; pdf.setFont("helvetica","bold"); pdf.setFontSize(9);
          pdf.text("SKILLS", sw/2, sy, {align:"center"}); sy += 6; pdf.setFont("helvetica","normal"); pdf.setFontSize(8);
          data.skills.forEach(s => { pdf.text("• " + s, 8, sy); sy += 4.5; });
        }
        // Main content
        let y = M;
        if (p.summary) { wt("About Me", cx, y, 12, ciw, [79,70,229], "bold"); y += 6; y += wt(p.summary, cx, y, 9, ciw, [51,65,85], "normal"); y += 8; }
        if (data.experiences.length > 0) { wt("Experience", cx, y, 12, ciw, [79,70,229], "bold"); y += 6;
          for (const e of data.experiences) { wt(e.position, cx, y, 10, ciw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(79,70,229);
            pdf.text(e.company + " · " + e.startDate + " — " + (e.current?"Present":e.endDate), cx, y); y += 4;
            y += wt(e.description, cx, y, 9, ciw, [51,65,85], "normal"); y += 6; }
        }
        if (data.education.length > 0) { wt("Education", cx, y, 12, ciw, [79,70,229], "bold"); y += 6;
          for (const e of data.education) { wt(e.degree + " in " + e.field, cx, y, 10, ciw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(79,70,229);
            pdf.text(e.institution + " · " + e.startDate + " — " + e.endDate, cx, y); y += 5; }
        }
      } else if (template === "creative") {
        // Gradient header band
        pdf.setFillColor(236,72,153);
        pdf.rect(0, 0, W, 36, "F");
        pdf.setTextColor(255,255,255);
        pdf.setFont("helvetica","bold"); pdf.setFontSize(22);
        pdf.text(p.fullName, M, 16);
        pdf.setFont("helvetica","normal"); pdf.setFontSize(9);
        pdf.text([p.email, p.phone, p.address].join("  |  "), M, 27);
        let y = 48;
        if (p.summary) { pdf.setFillColor(252,231,243); pdf.roundedRect(M-4, y-4, cw+8, wt(p.summary, M+1, y, 9.5, cw-2, [51,65,85], "normal")+8, 3, 3, "F");
          wt("✦ Summary", M, y, 11, cw, [236,72,153], "bold"); y += 5; y += wt(p.summary, M, y, 9.5, cw, [51,65,85], "normal"); y += 8; }
        if (data.experiences.length > 0) { wt("✦ Experience", M, y, 11, cw, [236,72,153], "bold"); y += 5;
          for (const e of data.experiences) { pdf.setFillColor(252,231,243); pdf.roundedRect(M-4, y-4, cw+8, 22, 3, 3, "F");
            wt(e.position + "  —  " + e.company, M, y, 10, cw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(236,72,153);
            pdf.text(e.startDate + " — " + (e.current?"Present":e.endDate), M, y); y += 4;
            y += wt(e.description, M, y, 9, cw, [51,65,85], "normal"); y += 6; }
        }
        if (data.education.length > 0) { wt("✦ Education", M, y, 11, cw, [236,72,153], "bold"); y += 5;
          for (const e of data.education) { wt(e.degree + " in " + e.field, M, y, 10, cw, [30,41,59], "bold"); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.setTextColor(100,116,139);
            pdf.text(e.institution + "  |  " + e.startDate + " — " + e.endDate, M, y); y += 5; }
        }
        if (data.skills.length > 0) { y += 3; wt("✦ Skills", M, y, 11, cw, [236,72,153], "bold"); y += 5;
          data.skills.forEach(s => { pdf.setFillColor(236,72,153); pdf.roundedRect(M, y-3, pdf.getTextWidth(s)+10, 6, 3, 3, "F");
            pdf.setTextColor(255,255,255); pdf.setFont("helvetica","normal"); pdf.setFontSize(8); pdf.text(s, M+5, y+1); y += 8; });
        }
      } else if (template === "minimal") {
        pdf.setTextColor(51,65,85);
        pdf.setFont("helvetica","normal"); pdf.setFontSize(26);
        pdf.text(p.fullName, M, 24);
        pdf.setFontSize(9); pdf.setTextColor(148,163,184);
        pdf.text([p.email, p.phone, p.address].join("  ·  "), M, 32);
        let y = 44;
        if (p.summary) { pdf.setFont("helvetica","italic"); pdf.setFontSize(10); pdf.setTextColor(100,116,139);
          const lines = pdf.splitTextToSize(p.summary, cw); pdf.text(lines, M, y); y += lines.length * 4.5 + 8; }
        if (data.experiences.length > 0) { pdf.setFontSize(9); pdf.setTextColor(148,163,184); pdf.text("E X P E R I E N C E", M, y); y += 5;
          for (const e of data.experiences) { pdf.setTextColor(30,41,59); pdf.setFont("helvetica","normal"); pdf.setFontSize(10);
            pdf.text(e.position + "  at  " + e.company, M, y); y += 4;
            pdf.setTextColor(148,163,184); pdf.setFontSize(8); pdf.text(e.startDate + " — " + (e.current?"Present":e.endDate), M, y); y += 4;
            pdf.setTextColor(71,85,105); pdf.setFontSize(9); const dl = pdf.splitTextToSize(e.description, cw); pdf.text(dl, M, y); y += dl.length * 4 + 5; }
        }
        if (data.education.length > 0) { pdf.setFontSize(9); pdf.setTextColor(148,163,184); pdf.text("E D U C A T I O N", M, y); y += 5;
          for (const e of data.education) { pdf.setTextColor(30,41,59); pdf.setFontSize(10); pdf.text(e.degree + " in " + e.field, M, y); y += 4;
            pdf.setTextColor(100,116,139); pdf.setFontSize(8); pdf.text(e.institution + "  ·  " + e.startDate + " — " + e.endDate, M, y); y += 5; }
        }
        if (data.skills.length > 0) { y += 3; pdf.setFontSize(9); pdf.setTextColor(148,163,184); pdf.text("S K I L L S", M, y); y += 5;
          pdf.setTextColor(71,85,105); pdf.setFontSize(9.5); pdf.text(data.skills.join("  /  "), M, y); }
      } else {
        // ATS
        pdf.setTextColor(0,0,0);
        pdf.setFont("helvetica","bold"); pdf.setFontSize(18);
        pdf.text(p.fullName, M, 18);
        pdf.setFont("helvetica","normal"); pdf.setFontSize(9);
        pdf.text([p.email, p.phone, p.address].filter(Boolean).join("  |  "), M, 24);
        pdf.setDrawColor(0); pdf.setLineWidth(0.5); pdf.line(M, 28, W-M, 28);
        let y = 36;
        if (p.summary) { pdf.setFont("helvetica","bold"); pdf.setFontSize(11); pdf.text("PROFESSIONAL SUMMARY", M, y); y += 5;
          pdf.setFont("helvetica","normal"); pdf.setFontSize(9.5); const l = pdf.splitTextToSize(p.summary, cw); pdf.text(l, M, y); y += l.length * 4 + 5; }
        if (data.experiences.length > 0) { pdf.setFont("helvetica","bold"); pdf.setFontSize(11); pdf.text("PROFESSIONAL EXPERIENCE", M, y); y += 5;
          for (const e of data.experiences) { pdf.setFont("helvetica","bold"); pdf.setFontSize(10); pdf.text(e.position + ", " + e.company, M, y); y += 4;
            pdf.setFont("helvetica","italic"); pdf.setFontSize(9); pdf.text(e.startDate + " - " + (e.current?"Present":e.endDate), M, y); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(9); const dl = pdf.splitTextToSize(e.description, cw); pdf.text(dl, M, y); y += dl.length * 3.8 + 4; }
        }
        if (data.education.length > 0) { pdf.setFont("helvetica","bold"); pdf.setFontSize(11); pdf.text("EDUCATION", M, y); y += 5;
          for (const e of data.education) { pdf.setFont("helvetica","bold"); pdf.setFontSize(10); pdf.text(e.degree + " in " + e.field + ", " + e.institution, M, y); y += 4;
            pdf.setFont("helvetica","normal"); pdf.setFontSize(9); pdf.text(e.startDate + " - " + e.endDate + (e.gpa ? "  |  GPA: " + e.gpa : ""), M, y); y += 5; }
        }
        if (data.skills.length > 0) { pdf.setFont("helvetica","bold"); pdf.setFontSize(11); pdf.text("TECHNICAL SKILLS", M, y); y += 5;
          pdf.setFont("helvetica","normal"); pdf.setFontSize(9.5); pdf.text(data.skills.join(", "), M, y); }
      }

      pdf.save(`${p.fullName.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF download failed. Please try again.");
    }
    setDownloading(false);
  }, [data, template]);

  const downloadHTML = useCallback(() => {
    const contentEl = captureRef.current as HTMLElement | null;
    if (!contentEl) return;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${data.personal.fullName} - CV</title><style>body{margin:0;font-family:sans-serif;}</style></head><body>${contentEl.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${data.personal.fullName.replace(/\s+/g, "_")}_CV.html`; a.click(); URL.revokeObjectURL(url);
  }, [data.personal.fullName]);

  const downloadTXT = useCallback(() => {
    const txt = `${data.personal.fullName}\n${data.personal.email} | ${data.personal.phone} | ${data.personal.address}\n\nPROFESSIONAL SUMMARY\n${data.personal.summary}\n\nWORK EXPERIENCE\n${data.experiences.map((e) => `${e.position} at ${e.company}\n${e.startDate} - ${e.current ? "Present" : e.endDate}\n${e.description}`).join("\n\n")}\n\nEDUCATION\n${data.education.map((e) => `${e.degree} in ${e.field}, ${e.institution}\n${e.startDate} - ${e.endDate}${e.gpa ? ` | GPA: ${e.gpa}` : ""}`).join("\n\n")}\n\nSKILLS\n${data.skills.join(", ")}`;
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${data.personal.fullName.replace(/\s+/g, "_")}_CV.txt`; a.click(); URL.revokeObjectURL(url);
  }, [data]);

  const TemplateComponent = templateMap[template];
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hidden render area — ALWAYS in DOM, never display:none, used for PDF capture */}
      <div style={{ position: "fixed", left: "-10000px", top: 0, zIndex: -9999, opacity: 1, pointerEvents: "none" }}>
        <div ref={captureRef}>
          <TemplateComponent data={data} />
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-indigo-600" size={28} /> CV Creator</h1>
            <p className="text-sm text-slate-500 mt-1">Create a professional CV with our easy-to-use builder</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setView(view === "edit" ? "preview" : "edit")}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
              {view === "edit" ? <><Eye size={16} /> Preview</> : <><Pencil size={16} /> Edit</>}
            </button>
            <button onClick={downloadPDF} disabled={downloading}
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50">
              <Download size={16} /> {downloading ? "Generating..." : "PDF"}
            </button>
            <button onClick={downloadHTML}
              className="flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
              <Download size={16} /> HTML
            </button>
            <button onClick={downloadTXT}
              className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
              <Download size={16} /> TXT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left: Editor */}
        <div className={`lg:w-1/2 ${view === "preview" ? "hidden lg:block" : ""}`}>
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> Choose Template</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {templates.map((t) => (
                  <button key={t.id} onClick={() => setTemplate(t.id)}
                    className={`text-left p-3 rounded-xl border-2 transition ${template === t.id ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.color} mb-2`} />
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.desc}</p>
                    {template === t.id && <div className="mt-1 flex items-center gap-1 text-xs text-indigo-600 font-medium"><Check size={12} /> Selected</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><User size={18} className="text-indigo-600" /> Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label><input value={data.personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Email</label><input value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Phone</label><input value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Address</label><input value={data.personal.address} onChange={(e) => updatePersonal("address", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Website</label><input value={data.personal.website} onChange={(e) => updatePersonal("website", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">LinkedIn</label><input value={data.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Professional Summary</label><textarea value={data.personal.summary} onChange={(e) => updatePersonal("summary", e.target.value)} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" /></div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> Work Experience</h2>
                <button onClick={addExperience} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700"><Plus size={16} /> Add</button>
              </div>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="border border-slate-200 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-slate-500">#{data.experiences.indexOf(exp) + 1}</span>
                    <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Position</label><input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Company</label><input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label><input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">End Date</label><input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} disabled={exp.current} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100" /></div>
                    <div className="sm:col-span-2 flex items-center gap-2"><input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /><label className="text-sm text-slate-600">Currently working here</label></div>
                    <div className="sm:col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Description</label><textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" /></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg flex items-center gap-2"><GraduationCap size={18} className="text-indigo-600" /> Education</h2>
                <button onClick={addEducation} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700"><Plus size={16} /> Add</button>
              </div>
              {data.education.map((edu) => (
                <div key={edu.id} className="border border-slate-200 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-slate-500">#{data.education.indexOf(edu) + 1}</span>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Institution</label><input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Degree</label><input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Field of Study</label><input value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">GPA</label><input value={edu.gpa} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label><input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-xs font-medium text-slate-600 mb-1">End Date</label><input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><Sparkles size={18} className="text-indigo-600" /> Skills</h2>
              <div className="flex gap-2 mb-3">
                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Type a skill and press Enter" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button onClick={addSkill} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">{data.skills.map((skill, i) => <span key={i} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">{skill}<button onClick={() => removeSkill(i)} className="hover:text-red-500"><Trash2 size={12} /></button></span>)}</div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className={`lg:w-1/2 ${view === "edit" ? "hidden lg:block" : ""}`}>
          <div className="sticky top-20">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
              <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-200">
                <span className="text-sm font-medium text-slate-600">Live Preview</span>
                <span className="text-xs text-slate-400">{templates.find((t) => t.id === template)?.name} Template</span>
              </div>
              <div className="overflow-auto p-4" style={{ maxHeight: "80vh" }}>
                <div ref={previewRef} className="origin-top-left" style={{ transform: "scale(0.55)", transformOrigin: "top left" }}>
                  <TemplateComponent data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

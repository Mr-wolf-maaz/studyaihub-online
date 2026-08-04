import Link from "next/link";

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function Page() {
  const manifestUrl = "https://raw.githubusercontent.com/Mr-wolf-maaz/studyaihub-online/main/templates/data.json";
  const templates = (await fetchJSON(manifestUrl)) || [];

  // For previews, fetch the markdown and take the first 300 chars
  const previews = await Promise.all(
    templates.map(async (t: any) => {
      try {
        const mdRes = await fetch(t.md, { cache: "no-store" });
        if (!mdRes.ok) return { id: t.id, preview: null };
        const text = await mdRes.text();
        return { id: t.id, preview: text.slice(0, 400) + (text.length > 400 ? "..." : "") };
      } catch {
        return { id: t.id, preview: null };
      }
    })
  );

  const previewMap = Object.fromEntries(previews.map((p: any) => [p.id, p.preview]));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Templates</h1>
      <p className="text-slate-600 mb-8">Browse CVs and presentation templates. View the Markdown preview or download placeholders (DOCX/PPTX). Replace placeholders with real Office files if desired.</p>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">CV Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.filter((t: any) => t.type === "cv").map((t: any) => (
            <article key={t.id} className="p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-3">Preview (Markdown)</p>
              <pre className="text-xs bg-slate-50 p-3 rounded h-40 overflow-auto text-slate-700">{previewMap[t.id] || "Preview not available"}</pre>
              <div className="mt-3 flex gap-2">
                <Link href={t.md} className="inline-block px-3 py-2 bg-indigo-600 text-white rounded">View Source</Link>
                <a href={t.docx} className="inline-block px-3 py-2 bg-slate-100 text-slate-700 rounded">Download .docx</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-10 mb-4">Presentation Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.filter((t: any) => t.type === "presentation").map((t: any) => (
            <article key={t.id} className="p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-3">Preview (Markdown)</p>
              <pre className="text-xs bg-slate-50 p-3 rounded h-40 overflow-auto text-slate-700">{previewMap[t.id] || "Preview not available"}</pre>
              <div className="mt-3 flex gap-2">
                <Link href={t.md} className="inline-block px-3 py-2 bg-indigo-600 text-white rounded">View Source</Link>
                <a href={t.pptx} className="inline-block px-3 py-2 bg-slate-100 text-slate-700 rounded">Download .pptx</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

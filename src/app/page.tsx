import Link from "next/link";
import { FileText, Presentation, Keyboard, BookOpen, ArrowRight, Star, Users, Zap, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Star size={14} /> Free Student Tools
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            All-in-One Toolkit for
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
              Students & Professionals
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
            Create stunning CVs, build powerful presentations, learn typing in multiple languages, and stay updated with our educational blog.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/cv-creator"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition shadow-lg shadow-indigo-700/20"
            >
              <FileText size={20} /> Create Your CV
            </Link>
            <Link
              href="/presentation-maker"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/25 transition"
            >
              <Presentation size={20} /> Make Presentation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "5+", l: "CV Templates" },
            { n: "4+", l: "Presentation Styles" },
            { n: "3", l: "Typing Languages" },
            { n: "100%", l: "Free to Use" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-extrabold text-indigo-600">{s.n}</p>
              <p className="text-sm text-slate-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Powerful Tools</h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
          Everything you need to succeed in your academic and professional journey.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FileText,
              title: "CV Creator",
              desc: "Build professional CVs with multiple templates including ATS-optimized formats. Download as PDF.",
              href: "/cv-creator",
              color: "from-blue-500 to-indigo-600",
              features: ["5+ Templates", "ATS-Friendly", "PDF Download", "Live Preview"],
            },
            {
              icon: Presentation,
              title: "Presentation Maker",
              desc: "Create stunning presentations with beautiful templates and designs. Export as PDF or PPT.",
              href: "/presentation-maker",
              color: "from-purple-500 to-pink-600",
              features: ["4+ Designs", "Slide Editor", "PDF & PPT Export", "Custom Styles"],
            },
            {
              icon: Keyboard,
              title: "Typing Learner",
              desc: "Learn and practice typing in English, Urdu, and Hindi with real-time feedback and progress tracking.",
              href: "/typing-learner",
              color: "from-emerald-500 to-teal-600",
              features: ["3 Languages", "Real-time Feedback", "WPM Tracking", "Difficulty Levels"],
            },
            {
              icon: BookOpen,
              title: "Blog & Resources",
              desc: "Read educational articles and tips about career development, productivity, and skill building.",
              href: "/blog",
              color: "from-orange-500 to-red-600",
              features: ["Career Tips", "Productivity", "How-to Guides", "Weekly Updates"],
            },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <tool.icon size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{tool.desc}</p>
              <ul className="space-y-1 mb-4">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                    <Zap size={12} className="text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                Get Started <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StudyAIHub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Fast & Easy", desc: "Create professional documents in minutes with our intuitive interfaces and pre-built templates." },
              { icon: Users, title: "For Everyone", desc: "Whether you're a student, job seeker, or working professional — our tools adapt to your needs." },
              { icon: Shield, title: "Privacy First", desc: "Your data stays in your browser. We don't store your personal information on our servers." },
            ].map((w) => (
              <div key={w.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <w.icon size={28} className="text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{w.title}</h3>
                <p className="text-sm text-slate-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Jump right in and start creating. No sign-up required — all tools are completely free.
        </p>
        <Link
          href="/cv-creator"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
        >
          Start Creating <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

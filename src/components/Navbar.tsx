"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, FileText, Presentation, Keyboard, BookOpen, Home } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cv-creator", label: "CV Creator", icon: FileText },
    { href: "/presentation-maker", label: "Presentation Maker", icon: Presentation },
    { href: "/typing-learner", label: "Typing Learner", icon: Keyboard },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:text-indigo-700 transition">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">S</span>
          </div>
          StudyAIHub
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
            >
              <l.icon size={16} />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

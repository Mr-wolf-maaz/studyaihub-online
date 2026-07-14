import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "StudyAIHub - CV Creator, Presentation Maker, Typing Learner & Blog",
    template: "%s | StudyAIHub",
  },
  description:
    "All-in-one student toolkit: Create professional CVs with ATS-friendly templates, build stunning presentations, learn typing in English/Urdu/Hindi, and read educational blogs.",
  keywords: [
    "CV creator", "resume builder", "ATS resume", "presentation maker",
    "typing learner", "typing practice", "Urdu typing", "Hindi typing",
    "student tools", "blog", "StudyAIHub",
  ],
  openGraph: {
    title: "StudyAIHub - All-in-One Student Toolkit",
    description:
      "Create CVs, presentations, learn typing, and more. Free tools for students and professionals.",
    type: "website",
    siteName: "StudyAIHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyAIHub - All-in-One Student Toolkit",
    description:
      "Create CVs, presentations, learn typing, and more. Free tools for students and professionals.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://studyaihub.com" />
        {/* Google Search Console verification: replace YOUR_TOKEN with the code Google gives you */}
        <meta name="google-site-verification" content="YOUR_TOKEN" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-900 text-slate-400 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} StudyAIHub. All rights reserved.</p>
            <p className="mt-1">CV Creator · Presentation Maker · Typing Learner · Blog</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

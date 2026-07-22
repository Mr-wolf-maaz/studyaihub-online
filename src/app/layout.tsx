import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "KvdeXxUFjuUzTXeK0qj-y_JV0yPiJdctn6NY8hVjZRY",
  },
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
        <link rel="canonical" href="https://studyaihub.online" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="google-site-verification" content="KvdeXxUFjuUzTXeK0qj-y_JV0yPiJdctn6NY8hVjZRY" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-900 text-slate-400 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/cv-creator" className="hover:text-indigo-400 transition">CV Creator</Link></li>
                  <li><Link href="/presentation-maker" className="hover:text-indigo-400 transition">Presentation Maker</Link></li>
                  <li><Link href="/typing-learner" className="hover:text-indigo-400 transition">Typing Learner</Link></li>
                  <li><Link href="/blog" className="hover:text-indigo-400 transition">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about-us" className="hover:text-indigo-400 transition">About Us</Link></li>
                  <li><Link href="/contact-us" className="hover:text-indigo-400 transition">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy-policy" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className="hover:text-indigo-400 transition">Terms & Conditions</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-indigo-400 transition">Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="mailto:support@studyaihub.online" className="hover:text-indigo-400 transition">Support Email</a></li>
                  <li><a href="mailto:info@studyaihub.online" className="hover:text-indigo-400 transition">General Inquiry</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} StudyAIHub. All rights reserved.</p>
              <p className="mt-2">CV Creator · Presentation Maker · Typing Learner · Blog</p>
            </div>
          </div>
        </footer>
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-9KRV3JG20J"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-9KRV3JG20J');
  `}
</Script>
      </body>
    </html>
  );
}

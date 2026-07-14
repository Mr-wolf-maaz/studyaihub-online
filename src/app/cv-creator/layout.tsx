import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Creator - Build Professional Resumes with ATS-Friendly Templates",
  description: "Create stunning CVs and resumes with our free CV builder. Choose from 5+ templates including ATS-optimized formats. Download as PDF. No sign-up required.",
  keywords: ["CV creator", "resume builder", "ATS resume", "ATS-friendly CV", "professional resume", "CV templates", "resume templates", "free CV maker", "PDF resume"],
};

export default function CVCreatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentation Maker - Create Stunning Presentations with Templates",
  description: "Build beautiful presentations with our free presentation maker. Choose from multiple themes and layouts. Export as PDF or PPT. Perfect for students and professionals.",
  keywords: ["presentation maker", "slideshow creator", "PPT maker", "free presentation tool", "presentation templates", "PowerPoint alternative", "student presentation"],
};

export default function PresentationMakerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

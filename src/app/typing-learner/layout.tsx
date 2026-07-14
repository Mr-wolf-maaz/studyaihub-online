import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Learner - Learn Typing in English, Urdu & Hindi",
  description: "Learn and practice typing in English, Urdu, and Hindi. Improve your WPM and accuracy with our interactive typing tool. Multiple difficulty levels. Free and easy to use.",
  keywords: ["typing learner", "typing practice", "learn typing", "Urdu typing", "Hindi typing", "typing speed", "WPM test", "typing tutor", "keyboard practice"],
};

export default function TypingLearnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

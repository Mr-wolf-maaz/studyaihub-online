import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about StudyAIHub - our mission to provide free, comprehensive tools for students and professionals.",
  openGraph: {
    title: "About Us | StudyAIHub",
    description:
      "Learn more about StudyAIHub - our mission to provide free, comprehensive tools for students and professionals.",
  },
};

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">About StudyAIHub</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          StudyAIHub is dedicated to empowering students and professionals by providing
          free, innovative tools to enhance productivity and learning. We believe that
          access to quality tools should not be limited by cost, which is why all our
          services are completely free.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">CV Creator</h3>
            <p className="text-slate-700">
              Build professional, ATS-friendly resumes with our intuitive CV creator tool.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Presentation Maker</h3>
            <p className="text-slate-700">
              Create stunning presentations quickly and easily without complex design skills.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Typing Learner</h3>
            <p className="text-slate-700">
              Improve your typing speed and accuracy in multiple languages including English,
              Urdu, and Hindi.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Educational Blog</h3>
            <p className="text-slate-700">
              Access insightful articles and resources to expand your knowledge and skills.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why Choose StudyAIHub?</h2>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-1">✓</span>
            <span>Free access to all tools with no hidden charges</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-1">✓</span>
            <span>User-friendly interface designed for everyone</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-1">✓</span>
            <span>Support for multiple languages</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-1">✓</span>
            <span>Continuously updated with new features</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-1">✓</span>
            <span>Professional-grade tools trusted by students worldwide</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Vision</h2>
        <p className="text-slate-700 leading-relaxed">
          We envision a world where every student and professional has access to quality tools
          that help them succeed. By breaking down barriers to educational and professional
          resources, we aim to contribute to a more informed and skilled global community.
        </p>
      </section>
    </div>
  );
}

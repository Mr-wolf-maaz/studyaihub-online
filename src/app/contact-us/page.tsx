import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with StudyAIHub. We'd love to hear from you. Contact us with your feedback, inquiries, or support needs.",
  openGraph: {
    title: "Contact Us | StudyAIHub",
    description:
      "Get in touch with StudyAIHub. We'd love to hear from you.",
  },
};

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Get in Touch</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            We'd love to hear from you! Whether you have questions, feedback, or need support,
            feel free to reach out to us through any of the following channels.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Email</h3>
              <a
                href="mailto:contact@studyaihub.online"
                className="text-indigo-600 hover:text-indigo-700 transition"
              >
                contact@studyaihub.online
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Support</h3>
              <a
                href="mailto:support@studyaihub.online"
                className="text-indigo-600 hover:text-indigo-700 transition"
              >
                support@studyaihub.online
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">General Inquiries</h3>
              <a
                href="mailto:info@studyaihub.online"
                className="text-indigo-600 hover:text-indigo-700 transition"
              >
                info@studyaihub.online
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Is StudyAIHub free?</h3>
              <p className="text-slate-700 text-sm">
                Yes! All our tools and services are completely free to use.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Do I need to sign up?</h3>
              <p className="text-slate-700 text-sm">
                Most tools can be used without signup. Some advanced features may require
                registration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Which languages do you support?</h3>
              <p className="text-slate-700 text-sm">
                We support English, Urdu, and Hindi in our typing learner tool, with more
                languages coming soon.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">How can I report a bug?</h3>
              <p className="text-slate-700 text-sm">
                Please email us at support@studyaihub.online with details about the issue.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Response Time</h2>
        <p className="text-slate-700">
          We strive to respond to all inquiries within 24-48 hours. For urgent support matters,
          please email us directly with "URGENT" in the subject line.
        </p>
      </div>
    </div>
  );
}

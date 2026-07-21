import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read StudyAIHub's privacy policy to understand how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | StudyAIHub",
    description:
      "Read StudyAIHub's privacy policy to understand how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
      <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
          <p>
            StudyAIHub ("we," "us," "our," or "Company") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">2.1 Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name and email address</li>
                <li>Account information</li>
                <li>Contact information</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">2.2 Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Device information (type, model, operating system)</li>
                <li>Browser information</li>
                <li>IP address</li>
                <li>Pages visited and time spent</li>
                <li>Referring/exit pages</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. How We Use Your Information</h2>
          <p className="mb-3">We use collected information for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Providing and improving our services</li>
            <li>Personalizing your experience</li>
            <li>Processing transactions</li>
            <li>Sending administrative information</li>
            <li>Responding to inquiries and support requests</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Ensuring security and preventing fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction. However,
            no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience. You can control cookie
            preferences through your browser settings. Some features may not function properly if cookies
            are disabled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices of other sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect information
            from children under 13. If we become aware of such collection, we will take steps to delete
            such information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Policy Changes</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page
            with an updated "Last updated" date. Your continued use of our services constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2">
            Email: <a href="mailto:privacy@studyaihub.online" className="text-indigo-600 hover:text-indigo-700">
              privacy@studyaihub.online
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

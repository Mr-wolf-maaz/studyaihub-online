import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read StudyAIHub's disclaimer to understand important limitations and caveats regarding the use of our services.",
  openGraph: {
    title: "Disclaimer | StudyAIHub",
    description:
      "Read StudyAIHub's disclaimer to understand important limitations and caveats regarding the use of our services.",
  },
};

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Disclaimer</h1>
      <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. General Disclaimer</h2>
          <p>
            The information and materials provided by StudyAIHub are provided on an "as-is" basis without any
            warranties or representations of any kind, either express or implied. We make no warranty that the
            materials on our website are free from errors or omissions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. No Professional Advice</h2>
          <p>
            The content provided by StudyAIHub should not be considered as professional advice. While we strive to
            provide accurate and helpful information, we do not provide legal, financial, medical, or other
            professional advice. Always consult with qualified professionals for advice specific to your situation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. CV Creator Disclaimer</h2>
          <p className="mb-3">
            The CV Creator tool is provided as a utility to help format your resume. Please note:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>While our templates are designed to be ATS-compatible, we cannot guarantee acceptance</li>
            <li>Always review your CV for accuracy and completeness before submission</li>
            <li>Different companies may have different ATS systems with varying compatibility</li>
            <li>Professional review is recommended before submitting to employers</li>
            <li>We are not responsible for hiring decisions or application rejections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Presentation Maker Disclaimer</h2>
          <p className="mb-3">
            The Presentation Maker tool is provided for creating presentations. Please note:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>We do not guarantee compatibility with all software and devices</li>
            <li>Complex animations and features may not work across all platforms</li>
            <li>We recommend testing presentations on target devices before presentation</li>
            <li>Content responsibility lies entirely with the user</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Typing Learner Disclaimer</h2>
          <p className="mb-3">
            The Typing Learner tool is for educational purposes. Please note:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Typing speed improvements depend on consistent practice</li>
            <li>Results may vary based on individual factors</li>
            <li>We do not guarantee certification or official typing test results</li>
            <li>Language support accuracy may vary for different keyboard layouts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Blog Content Disclaimer</h2>
          <p>
            Blog content is provided for informational purposes only. The views and opinions expressed in our blog
            are those of the authors and do not necessarily reflect the official policy or position of StudyAIHub.
            We do not guarantee the accuracy or timeliness of blog content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Third-Party Content</h2>
          <p>
            StudyAIHub may contain links to third-party websites and resources. We are not responsible for the
            accuracy, legality, or appropriateness of any third-party content. Access to such sites is at your
            own risk and subject to their terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Service Availability</h2>
          <p className="mb-3">
            StudyAIHub does not guarantee continuous, uninterrupted service. We may experience:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Scheduled maintenance and updates</li>
            <li>Technical difficulties or service interruptions</li>
            <li>Data loss or corruption</li>
            <li>Feature changes or discontinuation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Liability Limitation</h2>
          <p>
            To the fullest extent permitted by law, StudyAIHub and its owners, employees, and agents shall not be
            liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
            revenue, data, or use, arising out of or related to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. User Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and password and for
            restricting access to your computer or device. You agree to accept responsibility for all activities that
            occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">11. Modification of Disclaimer</h2>
          <p>
            StudyAIHub reserves the right to modify this disclaimer at any time. Your continued use of the Service
            constitutes your acceptance of the modified disclaimer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about this disclaimer, please contact us at:
          </p>
          <p className="mt-2">
            Email: <a href="mailto:info@studyaihub.online" className="text-indigo-600 hover:text-indigo-700">
              info@studyaihub.online
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

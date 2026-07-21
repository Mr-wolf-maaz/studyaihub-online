import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read StudyAIHub's terms and conditions to understand the legal agreement governing your use of our services.",
  openGraph: {
    title: "Terms and Conditions | StudyAIHub",
    description:
      "Read StudyAIHub's terms and conditions to understand the legal agreement governing your use of our services.",
  },
};

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms and Conditions</h1>
      <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using StudyAIHub ("the Service"), you agree to be bound by these Terms
            and Conditions. If you do not agree with any part of these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Use License</h2>
          <p className="mb-3">
            Permission is granted to temporarily download one copy of the materials (information or software)
            on StudyAIHub for personal, non-commercial transitory viewing only. This is the grant of a license,
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials</li>
            <li>Using the materials for any illegal purpose or in violation of any laws</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Disclaimer</h2>
          <p>
            The materials on StudyAIHub are provided on an 'as is' basis. StudyAIHub makes no warranties,
            expressed or implied, and hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
            or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Limitations</h2>
          <p>
            In no event shall StudyAIHub or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on StudyAIHub.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on StudyAIHub could include technical, typographical, or photographic errors.
            StudyAIHub does not warrant that any of the materials on its website are accurate, complete, or current.
            StudyAIHub may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Materials and Content</h2>
          <p>
            StudyAIHub has not reviewed all of the sites linked to its website and is not responsible for the contents
            of any such linked site. The inclusion of any link does not imply endorsement by StudyAIHub of the site.
            Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Modifications</h2>
          <p>
            StudyAIHub may revise these terms of service for its website at any time without notice. By using this
            website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
            in which StudyAIHub operates, and you irrevocably submit to the exclusive jurisdiction of the courts in
            that location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. User Conduct</h2>
          <p className="mb-3">You agree not to use the Service:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>In any way that violates any applicable law or regulation</li>
            <li>To transmit any harmful or malicious code</li>
            <li>To harass or cause harm to others</li>
            <li>To infringe upon intellectual property rights</li>
            <li>To engage in any form of abuse or misconduct</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Termination</h2>
          <p>
            StudyAIHub may terminate or suspend your access to the Service at any time, without prior notice or
            liability, for any reason, including if you breach the Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">11. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="mt-2">
            Email: <a href="mailto:legal@studyaihub.online" className="text-indigo-600 hover:text-indigo-700">
              legal@studyaihub.online
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

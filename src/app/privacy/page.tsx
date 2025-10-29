"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-fuchsia-400">
          Privacy Policy
        </h1>

        <div className="bg-slate-800 bg-opacity-50 p-8 rounded-xl border border-teal-500 border-opacity-20 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              Coji Universe ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our neurodivergent and chronic illness management platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Account information (email, preferred name, age, location)</li>
              <li>Health tracking data (energy levels, feelings, sleep, pain scores)</li>
              <li>Task and calendar information</li>
              <li>Health data (menstrual cycles, appointments, medications)</li>
              <li>Financial notes and budget information</li>
              <li>Journal entries and personal reflections</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalise your experience and provide tailored recommendations</li>
              <li>Analyse trends and patterns in your health and energy data</li>
              <li>Communicate with you about updates and features</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Data Storage and Security</h2>
            <p className="text-slate-300 leading-relaxed">
              Your data is stored securely using Supabase, a trusted database provider with enterprise-grade security. We use encryption, secure authentication, and row-level security policies to protect your information. Your data belongs to you, and we will never sell or share it with third parties without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We integrate with the following third-party services:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Google Calendar:</strong> If you choose to connect your Google Calendar, we access your calendar events and can add tasks to your calendar. We only access the calendar data you explicitly authorise.</li>
              <li><strong>Microsoft Outlook:</strong> Similar to Google Calendar, we only access Outlook calendar data with your permission.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-3">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Your Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Access, update, or delete your personal information</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for data processing</li>
              <li>Request deletion of your account and all associated data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will permanently delete your data within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Coji Universe is designed for users aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:privacy@cojiuniverse.com" className="text-teal-400 hover:text-teal-300 underline">privacy@cojiuniverse.com</a>
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Last Updated: 28 October 2025
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-600 hover:to-fuchsia-600 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Coji Universe
          </a>
        </div>
      </div>
    </div>
  );
}

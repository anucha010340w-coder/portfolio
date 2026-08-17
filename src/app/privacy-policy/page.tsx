export const metadata = {
  title: "Privacy Policy | AW Dev",
  description: "Privacy Policy for AW Dev Facebook Auto-Post application",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-slate-600">Last updated: August 17, 2026</p>

      <section className="space-y-4 text-slate-700">
        <p>
          This Privacy Policy describes how AW Dev (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
          collects, uses, and protects your information when you use our Facebook auto-posting service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect only the information necessary to provide our auto-posting service, including:
          Facebook Page access tokens, Page IDs, and generated post content. We do not collect personal
          user data or Facebook user profiles.
        </p>

        <h2 className="mt-6 text-xl font-semibold">2. How We Use Your Information</h2>
        <p>
          The collected information is used solely to publish content to your designated Facebook Page
          and to display post statistics within our dashboard.
        </p>

        <h2 className="mt-6 text-xl font-semibold">3. Data Security</h2>
        <p>
          We store access tokens and sensitive credentials in secure environment variables. We do not
          share your information with third parties.
        </p>

        <h2 className="mt-6 text-xl font-semibold">4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:anucha010340w@gmail.com" className="text-blue-600 hover:underline">
            anucha010340w@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}

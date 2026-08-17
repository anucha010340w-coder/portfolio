export const metadata = {
  title: "Terms of Service | AW Dev",
  description: "Terms of Service for AW Dev Facebook Auto-Post application",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-slate-600">Last updated: August 17, 2026</p>

      <section className="space-y-4 text-slate-700">
        <p>
          By using the AW Dev Facebook auto-posting service (&ldquo;Service&rdquo;), you agree to these
          Terms of Service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">1. Use of Service</h2>
        <p>
          The Service allows authorized administrators to publish and manage content on Facebook Pages
          they own or manage. You may only use the Service with Pages where you have sufficient admin
          permissions.
        </p>

        <h2 className="mt-6 text-xl font-semibold">2. User Responsibilities</h2>
        <p>
          You are responsible for all content posted through the Service. You agree not to use the
          Service to post spam, illegal content, or content that violates Facebook&rsquo;s Community
          Standards.
        </p>

        <h2 className="mt-6 text-xl font-semibold">3. Termination</h2>
        <p>
          We may suspend or terminate access to the Service if we believe you are violating these terms
          or Facebook&rsquo;s Platform Policies.
        </p>

        <h2 className="mt-6 text-xl font-semibold">4. Contact</h2>
        <p>
          For questions about these terms, contact{" "}
          <a href="mailto:anucha010340w@gmail.com" className="text-blue-600 hover:underline">
            anucha010340w@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}

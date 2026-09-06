import HealthPanel from "@/components/HealthPanel";

export default function Health() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <p className="text-sm text-clay">System</p>
      <h1 className="mt-4 font-display text-3xl italic text-forest md:text-4xl">
        Health check
      </h1>
      <p className="mt-4 max-w-prose text-sm text-forest/70 md:text-base">
        This page calls <code>/api/health</code> on load and renders the
        response, confirming the deployment can serve both static pages and
        live data.
      </p>
      <HealthPanel />
    </section>
  );
}

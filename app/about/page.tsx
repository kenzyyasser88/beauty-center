export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p className="text-sm text-clay">About Aura</p>
          <h1 className="mt-4 font-display text-3xl italic leading-tight text-forest md:text-4xl">
            A small studio, four therapists, no rush.
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-forest/75 md:text-lg">
            Aura opened in 2021 with two treatment rooms and one idea: every
            appointment should start with a real conversation about your
            skin, your hair, or whatever's tight in your shoulders that week
            — not a fixed package.
          </p>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-forest/75 md:text-lg">
            We keep the schedule light on purpose. No appointment is stacked
            back-to-back with the next, so your therapist isn't watching the
            clock.
          </p>
        </div>

        <dl className="flex flex-col gap-8 border-t border-forest/15 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <div>
            <dt className="text-sm text-clay">Team</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              4 therapists, 1 stylist, 1 nail technician
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Rooms</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              3 treatment rooms, 1 styling chair
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Products</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              Fragrance-free lines available on request
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Location</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              14 Nour El Din St, Giza
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

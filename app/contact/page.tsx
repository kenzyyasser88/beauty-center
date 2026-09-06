export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p className="text-sm text-clay">Find us</p>
          <h1 className="mt-4 font-display text-3xl italic leading-tight text-forest md:text-4xl">
            Visit or call ahead.
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-forest/75 md:text-lg">
            Walk-ins are welcome for nails and blow-dries when a chair is
            free. For facials and massage, booking ahead means you won't
            wait.
          </p>
        </div>

        <dl className="flex flex-col gap-8 border-t border-forest/15 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <div>
            <dt className="text-sm text-clay">Address</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              14 Nour El Din St, Giza
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Phone</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              +20 10 1234 5678
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Email</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              hello@aurabeauty.example
            </dd>
          </div>
          <div>
            <dt className="text-sm text-clay">Hours</dt>
            <dd className="mt-1 font-display text-lg italic text-forest">
              Sat–Thu 10:00–20:00, Fri 14:00–20:00
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

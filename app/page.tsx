import Link from "next/link";

const highlights = [
  {
    title: "Signature facial",
    body: "A 60-minute treatment built around your skin's actual needs, not a fixed routine.",
  },
  {
    title: "Deep tissue massage",
    body: "Slow, targeted work for shoulders and lower back held tight from desk hours.",
  },
  {
    title: "Gel manicure",
    body: "Shaped, strengthened, and finished in a colour that holds for three weeks.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-10 md:pb-24 md:pt-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm text-clay">Skin, hair &amp; body</p>
          <h1 className="mt-4 max-w-lg font-display text-4xl italic leading-[1.15] text-forest md:text-5xl">
            Care that fits your skin, not a fixed menu.
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-forest/75 md:text-lg">
            Aura is a small studio in Giza offering facials, massage, hair,
            and nail care. Every appointment starts with five minutes of
            actually talking about what you need.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="rounded-full bg-forest px-6 py-3 text-sm text-cream transition-colors hover:bg-moss"
            >
              Book an appointment
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-forest/20 px-6 py-3 text-sm text-forest transition-colors hover:border-forest/40"
            >
              See full menu
            </Link>
          </div>
        </div>

        <div className="animate-reveal flex flex-col justify-center gap-1 rounded-2xl border border-forest/10 bg-white/40 p-8">
          <p className="text-sm text-clay">Today</p>
          <p className="mt-2 font-display text-2xl italic text-forest">
            Open 10:00–20:00
          </p>
          <p className="mt-4 text-sm text-forest/70">
            Next available facial slot
          </p>
          <p className="font-display text-xl italic text-forest">
            2:30 PM
          </p>
          <Link
            href="/booking"
            className="mt-6 text-sm text-forest underline decoration-blush decoration-2 underline-offset-4"
          >
            Reserve this slot
          </Link>
        </div>
      </section>

      <section className="border-t border-forest/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-md font-display text-2xl italic text-forest md:text-3xl">
            What people come in for
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {highlights.map((item) => (
              <div key={item.title} className="border-t border-forest/15 pt-6">
                <p className="font-display text-lg italic text-forest">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-forest/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

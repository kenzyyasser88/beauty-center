const categories = [
  {
    name: "Facials",
    items: [
      { name: "Signature facial", duration: "60 min", price: "EGP 950" },
      { name: "Deep cleanse", duration: "45 min", price: "EGP 700" },
      { name: "Brightening treatment", duration: "50 min", price: "EGP 1,050" },
    ],
  },
  {
    name: "Massage",
    items: [
      { name: "Deep tissue", duration: "60 min", price: "EGP 1,100" },
      { name: "Relaxation massage", duration: "60 min", price: "EGP 900" },
      { name: "Back, neck & shoulders", duration: "30 min", price: "EGP 550" },
    ],
  },
  {
    name: "Hair",
    items: [
      { name: "Cut & style", duration: "45 min", price: "EGP 500" },
      { name: "Colour & gloss", duration: "120 min", price: "EGP 1,800" },
      { name: "Keratin treatment", duration: "150 min", price: "EGP 2,400" },
    ],
  },
  {
    name: "Nails",
    items: [
      { name: "Gel manicure", duration: "45 min", price: "EGP 450" },
      { name: "Classic pedicure", duration: "50 min", price: "EGP 500" },
      { name: "Gel manicure + pedicure", duration: "90 min", price: "EGP 850" },
    ],
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
      <p className="text-sm text-clay">Full menu</p>
      <h1 className="mt-4 font-display text-3xl italic text-forest md:text-4xl">
        Services &amp; pricing
      </h1>
      <p className="mt-4 max-w-prose text-sm text-forest/70 md:text-base">
        Prices are a starting point — your therapist will confirm anything
        that changes based on hair length, skin condition, or add-ons,
        before starting.
      </p>

      <div className="mt-14 flex flex-col gap-14">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h2 className="font-display text-xl italic text-forest">
              {cat.name}
            </h2>
            <ul className="mt-5 flex flex-col gap-4 border-t border-forest/15 pt-5">
              {cat.items.map((item) => (
                <li key={item.name} className="flex items-baseline">
                  <span className="text-forest">{item.name}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="whitespace-nowrap text-sm text-forest/60">
                    {item.duration}
                  </span>
                  <span className="ml-4 whitespace-nowrap text-forest">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

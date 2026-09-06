export default function Footer() {
  return (
    <footer className="border-t border-forest/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-forest/70 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="font-display italic text-forest">Aura Beauty Center</p>
          <p className="mt-1">14 Nour El Din St, Giza</p>
        </div>
        <div>
          <p className="text-forest">Hours</p>
          <p className="mt-1">Sat–Thu, 10:00–20:00</p>
          <p>Fri, 14:00–20:00</p>
        </div>
        <div>
          <p className="text-forest">Contact</p>
          <p className="mt-1">+20 10 1234 5678</p>
          <p>hello@aurabeauty.example</p>
        </div>
      </div>
    </footer>
  );
}

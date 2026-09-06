"use client";

import { useMemo, useState } from "react";

const services = [
  "Signature facial",
  "Deep cleanse",
  "Brightening treatment",
  "Deep tissue massage",
  "Relaxation massage",
  "Cut & style",
  "Colour & gloss",
  "Gel manicure",
  "Classic pedicure",
];

const timeSlots = [
  "10:00",
  "11:00",
  "12:30",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
];

function todayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const min = useMemo(() => todayISO(), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !date || !time) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="mt-10 rounded-2xl border border-forest/15 bg-white/40 p-8">
        <p className="text-sm text-clay">Request received</p>
        <p className="mt-2 font-display text-xl italic text-forest">
          {service}
        </p>
        <p className="mt-1 text-sm text-forest/70">
          {date} at {time} · under {name}
        </p>
        <p className="mt-4 text-sm text-forest/70">
          We'll call {phone} to confirm. If we can't reach you within a day,
          the slot may be released.
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="mt-6 text-sm text-forest underline decoration-blush decoration-2 underline-offset-4"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-forest/70">Full name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-forest/70">Phone number</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-forest/70">Service</span>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
        >
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-forest/70">Date</span>
          <input
            type="date"
            required
            min={min}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-forest/70">Time</span>
          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
          >
            <option value="" disabled>
              Choose a time
            </option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-forest/70">Notes (optional)</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Allergies, preferences, first time here…"
          className="resize-none rounded-lg border border-forest/20 bg-white/50 px-4 py-2.5 text-forest outline-none transition-colors focus:border-clay"
        />
      </label>

      <button
        type="submit"
        className="mt-2 self-start rounded-full bg-forest px-6 py-3 text-sm text-cream transition-colors hover:bg-moss"
      >
        Request appointment
      </button>
    </form>
  );
}

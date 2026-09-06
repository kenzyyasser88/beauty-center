import BookingForm from "@/components/BookingForm";

export default function Booking() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <p className="text-sm text-clay">Reserve a slot</p>
      <h1 className="mt-4 font-display text-3xl italic text-forest md:text-4xl">
        Book an appointment
      </h1>
      <p className="mt-4 max-w-prose text-sm text-forest/70 md:text-base">
        Pick a service, date, and time. We'll confirm by phone within a few
        hours — this holds your slot but isn't final until we call.
      </p>

      <BookingForm />
    </section>
  );
}

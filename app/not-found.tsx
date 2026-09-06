import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24 md:px-10 md:py-32">
      <p className="text-sm text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl italic text-forest md:text-4xl">
        We don't have that page booked in.
      </h1>
      <p className="mt-4 max-w-prose text-sm text-forest/70 md:text-base">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-forest px-6 py-3 text-sm text-cream transition-colors hover:bg-moss"
      >
        Back to home
      </Link>
    </section>
  );
}

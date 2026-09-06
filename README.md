# Aura Beauty Center

A booking site for a beauty center — facials, massage, hair, and nails.
Built for assignment FE-05 (Foundations: scaffold, Tailwind, Vercel
deploy, health check).

## Screens

- `/` — home / hero with today's next available slot
- `/services` — full menu with categories and prices
- `/booking` — working appointment request form (client-side, no backend)
- `/about` — about the studio
- `/contact` — address, phone, hours
- `/health` — fetches `/api/health` and renders the response

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Framework preset: Next.js (auto-detected). Leave build settings default.
4. No environment variables are required to build (see `.env.example` for
   the structure if you add any later — never commit a real `.env.local`).
5. Deploy. Every push to the repo now builds a new preview URL
   automatically.
6. Copy the preview URL into the assignment submission box, along with
   the repo link.

## Notes

- The booking form validates required fields and shows a confirmation
  screen, but doesn't persist anywhere yet — wiring it to a real backend
  (a database, or a service like Cal.com/Calendly) is the natural next
  step once this scaffold is deployed.
- Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS. No external
  UI libraries or images, so there's nothing to license or break.

# Aura Beauty Center

A beauty center website with service information, appointment requests, and an AI-powered chat assistant.

Originally built for assignment FE-05 (Foundations: scaffold, Tailwind, Vercel deploy, and health check), then extended with FE-07 Generative UI and server-side AI tool calling.

## Screens and Routes

- `/` — Home page with hero section and next available slot.
- `/services` — Service menu with categories and prices.
- `/booking` — Appointment request form with client-side validation.
- `/about` — Information about the beauty center.
- `/contact` — Contact information and the Ask Aura AI assistant.
- `/health` — Health-check page.
- `/api/chat` — Server-side AI chat endpoint with tool calling.

## FE-07: Generative UI

The Ask Aura assistant uses a server-side tool named `recommendService` to check service availability and return recommendations.

### Tool Contract

**Tool name:** `recommendService`

**Purpose:** Check whether a requested beauty service is available at Aura Beauty Center. If available, return its details. Otherwise, return a clear unavailable result.

**Input schema:**

| Field | Type | Description |
|---|---|---|
| `category` | `string` | The requested beauty service category. |

**Supported categories:**

- `facial`
- `massage`
- `nails`

### Return Shape

For an available service:

```ts
{
  available: true;
  serviceName: string;
  description: string;
  duration: string;
  category: string;
}
```

Example:

```json
{
  "available": true,
  "serviceName": "Signature Facial",
  "description": "A facial treatment designed around the customer's skincare needs.",
  "duration": "60 minutes",
  "category": "facial"
}
```

For an unavailable service:

```ts
{
  available: false;
  requestedCategory: string;
  message: string;
}
```

Example:

```json
{
  "available": false,
  "requestedCategory": "hair coloring",
  "message": "This service is not currently available at Aura Beauty Center."
}
```

**Error behavior:** Unsupported categories return an `available: false` result rather than throwing an exception. This allows the assistant to explain that the requested service is unavailable and suggest supported alternatives. Unexpected tool execution failures are handled separately by the chat UI.

### Tool UI States

The chat interface distinguishes these tool lifecycle states:

- `input-streaming` — The tool input is being prepared.
- `input-available` — The input is available and the tool is ready to execute.
- `output-available` — The tool returned a result, which is rendered as either a service recommendation card or an unavailable-service card.
- `output-error` — Tool execution failed and an error message is displayed.

After receiving the tool result, the assistant can also provide a natural-language response to the customer.

## Run Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify the production build:

```bash
npm run build
```

## Environment Variables

The AI chat uses a Gemini API key configured on the server.

Set `GEMINI_API_KEY` in your local `.env.local` file and configure the same variable in your deployment provider's environment settings.

**Never commit `.env.local` or expose a real API key in source code or screenshots.**

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the Next.js framework preset and default build settings.
4. Add `GEMINI_API_KEY` in the project's environment variables.
5. Deploy and test the live chat.
6. Submit the preview URL and repository link.

## Notes

- The booking form validates required fields and displays a confirmation screen, but it does not persist appointments to a backend.
- The recommendation tool currently supports facial, massage, and nails categories.
- Stack: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, AI SDK, Google Gemini, and Zod.

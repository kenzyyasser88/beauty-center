import { AI_CONFIG, CHAT_CONFIG } from '@/lib/ai/config';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages?.[messages.length - 1];

    const text =
      lastMessage?.parts
        ?.filter((part: any) => part.type === 'text')
        ?.map((part: any) => part.text)
        ?.join(' ')
        ?.toLowerCase() || '';

    let reply =
      'Thanks for contacting Aura Beauty Center! How can we help you today?';

    if (
      text.includes('service') ||
      text.includes('services') ||
      text.includes('offer')
    ) {
      reply =
        'Aura Beauty Center offers nails, blow-dries, facials, and massage services.';
    } else if (
      text.includes('hour') ||
      text.includes('open') ||
      text.includes('close')
    ) {
      reply =
        'We are open Saturday to Thursday from 10:00 to 20:00, and Friday from 14:00 to 20:00.';
    } else if (
      text.includes('address') ||
      text.includes('location') ||
      text.includes('where')
    ) {
      reply = 'You can find us at 14 Nour El Din St, Giza.';
    } else if (
      text.includes('book') ||
      text.includes('appointment')
    ) {
      reply =
        'For facials and massage, we recommend booking ahead. You can contact Aura Beauty Center to arrange an appointment.';
    } else if (
      text.includes('nail') ||
      text.includes('nails')
    ) {
      reply =
        'We offer nail services, and walk-ins are welcome when a chair is available.';
    } else if (
      text.includes('facial') ||
      text.includes('massage') ||
      text.includes('blow')
    ) {
      reply =
        'We offer facials, massage, and blow-dry services. For facials and massage, booking ahead is recommended.';
    }

    const safeReply = reply.slice(0, CHAT_CONFIG.maxResponseLength);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (const word of safeReply.split(' ')) {
            controller.enqueue(
              encoder.encode(word + ' ')
            );

            await new Promise((resolve) =>
              setTimeout(resolve, 80)
            );
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('CHAT ERROR:', error);

    return Response.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
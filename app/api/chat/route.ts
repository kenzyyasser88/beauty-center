import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG, CHAT_CONFIG } from '@/lib/ai/config';

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: AI_CONFIG.model,
      systemInstruction: AI_CONFIG.systemPrompt,
    });

    const history = messages
      .slice(0, -1)
      .map((message: any) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [
          {
            text:
              message.parts
                ?.filter((part: any) => part.type === 'text')
                ?.map((part: any) => part.text)
                ?.join(' ') || '',
          },
        ],
      }));

    const lastMessage = messages[messages.length - 1];

    const userText =
      lastMessage?.parts
        ?.filter((part: any) => part.type === 'text')
        ?.map((part: any) => part.text)
        ?.join(' ') || '';

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessageStream(userText);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let totalText = '';

          for await (const chunk of result.stream) {
            const text = chunk.text();

            if (!text) continue;

            totalText += text;

            if (
              totalText.length >
              CHAT_CONFIG.maxResponseLength
            ) {
              const remaining =
                CHAT_CONFIG.maxResponseLength -
                (totalText.length - text.length);

              controller.enqueue(
                encoder.encode(text.slice(0, remaining))
              );

              break;
            }

            controller.enqueue(
              encoder.encode(text)
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

import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import { AI_CONFIG } from '@/lib/ai/config';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const recommendServiceSchema = z.object({
  category: z
    .string()
    .describe(
      'The beauty service category the customer wants, such as facial, massage, nails, or another requested service.',
    ),
});

const services = {
  facial: {
    serviceName: 'Signature Facial',
    description:
      "A facial treatment designed around the customer's skincare needs.",
    duration: '60 minutes',
    category: 'facial',
  },
  massage: {
    serviceName: 'Deep Tissue Massage',
    description:
      'A targeted massage focused on areas that feel tense or tight.',
    duration: '60 minutes',
    category: 'massage',
  },
  nails: {
    serviceName: 'Gel Manicure',
    description:
      'A manicure with shaped nails and a long-lasting gel finish.',
    duration: '60 minutes',
    category: 'nails',
  },
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === 'user');

   const lastUserText =
  lastUserMessage?.parts
    .filter(
      (part): part is Extract<typeof part, { type: 'text' }> =>
        part.type === 'text',
    )
    .map((part) => part.text)
    .join(' ') ?? '';

    const asksForService =
      /\b(facial|massage|nails|manicure|pedicure|hair|coloring|colouring|service|services|treatment|treatments|recommend|recommendation|beauty)\b/i.test(
        lastUserText,
      );

    const result = streamText({
      model: google(AI_CONFIG.model),

      system: `${AI_CONFIG.systemPrompt}

You are Aura, the assistant for Aura Beauty Center.

When a customer asks about a beauty service, or asks for a service recommendation,
use the recommendService tool to check the available services.

The currently supported services are facial, massage, and nails.

Always use the category requested by the customer, even if that service is not
available. Do not replace an unavailable requested service with a different
category when calling the tool.

After receiving the tool result:
- If available is true, explain the recommended service naturally.
- If available is false, clearly explain that the requested service is unavailable.
- After either result, provide a short, helpful text response to the customer.
- For unavailable services, you may suggest the available facial, massage, or nails services.
- Never claim a service is available unless the tool confirms it.
- Do not repeat the tool result verbatim.
- Do not call the same tool again after receiving its result.`,

      messages: await convertToModelMessages(messages),

      tools: {
        recommendService: {
          description:
            'Check whether a requested beauty service is available at Aura Beauty Center. Return the service details if available, or an unavailable result if it is not.',

          inputSchema: recommendServiceSchema,

          execute: async ({ category }) => {
            const normalizedCategory = category.toLowerCase().trim();

            const service =
              services[normalizedCategory as keyof typeof services];

            if (!service) {
              return {
                available: false,
                requestedCategory: normalizedCategory,
                message:
                  'This service is not currently available at Aura Beauty Center.',
              };
            }

            return {
              available: true,
              ...service,
            };
          },
        },
      },

      prepareStep: ({ stepNumber }) => {
        if (stepNumber === 0 && asksForService) {
          return { toolChoice: 'required' };
        }

        return { toolChoice: 'none' };
      },

      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('CHAT ERROR:', error);

    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}

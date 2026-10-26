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
      'The beauty service category the customer wants: facial, massage, or nails',
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

    const result = streamText({
      model: google(AI_CONFIG.model),
      system: `${AI_CONFIG.systemPrompt}

When a customer asks for a specific beauty service or needs help choosing one,
use the recommendService tool. The supported categories are facial, massage,
and nails. Do not invent services that are not in the tool results.`,
      messages: await convertToModelMessages(messages),
      tools: {
        recommendService: {
          description:
            'Recommend an existing Aura Beauty Center service based on the customer’s needs.',
          inputSchema: recommendServiceSchema,
          execute: async ({ category }) => {
            const normalizedCategory = category.toLowerCase().trim();

            const service =
              services[normalizedCategory as keyof typeof services];

            if (!service) {
              throw new Error(
                'We could not find a matching service. Please try facial, massage, or nails.',
              );
            }

            return service;
          },
        },
      },
      stopWhen: stepCountIs(3),
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
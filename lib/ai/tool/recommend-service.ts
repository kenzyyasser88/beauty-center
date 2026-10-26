import { z } from "zod";

const recommendServiceSchema = z.object({
  category: z
    .string()
    .describe("The type of beauty service the customer is looking for"),
});

const services = {
  facial: {
    name: "Signature Facial",
    description:
      "A 60-minute facial treatment built around your skin's actual needs.",
    duration: "60 minutes",
  },
  massage: {
    name: "Deep Tissue Massage",
    description:
      "Slow, targeted massage work focused on areas that feel tense or tight.",
    duration: "60 minutes",
  },
  nails: {
    name: "Gel Manicure",
    description:
      "A shaped and strengthened manicure finished with a long-lasting gel colour.",
    duration: "60 minutes",
  },
};

export const recommendServiceTool = {
  description:
    "Recommend an Aura Beauty Center service based on what the customer is looking for.",
  inputSchema: recommendServiceSchema,

  execute: async ({ category }: z.infer<typeof recommendServiceSchema>) => {
    const normalizedCategory = category.toLowerCase().trim();

    const service =
      services[normalizedCategory as keyof typeof services];

    if (!service) {
      throw new Error(
        "We couldn't find a matching service. Please try facial, massage, or nails."
      );
    }

    return {
      serviceName: service.name,
      description: service.description,
      duration: service.duration,
      category: normalizedCategory,
    };
  },
};
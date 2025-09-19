'use server';

/**
 * @fileOverview A career guide AI assistant.
 *
 * - guideCareer - A function that provides career suggestions based on skills and interests.
 * - CareerGuideInput - The input type for the guideCareer function.
 * - CareerGuideOutput - The return type for the guideCareer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerGuideInputSchema = z.object({
  interests: z.array(z.string()).describe('A list of the student\'s interests.'),
  skills: z.array(z.string()).describe('A list of the student\'s skills.'),
});
export type CareerGuideInput = z.infer<typeof CareerGuideInputSchema>;

const CareerSuggestionSchema = z.object({
    title: z.string().describe("The title of the suggested career path."),
    description: z.string().describe("A brief description of what the career entails."),
    reason: z.string().describe("The reason why this career is a good match based on the user's skills and interests."),
});

const CareerGuideOutputSchema = z.object({
  suggestions: z.array(CareerSuggestionSchema).describe('A list of career suggestions.'),
});
export type CareerGuideOutput = z.infer<typeof CareerGuideOutputSchema>;

export async function guideCareer(input: CareerGuideInput): Promise<CareerGuideOutput> {
  return careerGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerGuidePrompt',
  input: {schema: CareerGuideInputSchema},
  output: {schema: CareerGuideOutputSchema},
  prompt: `You are an expert career counselor for university students.

  Based on the following skills and interests, provide three distinct and actionable career path suggestions. For each suggestion, include a title, a brief description of the role, and a clear reason why it aligns with the provided interests and skills.

  Interests:
  {{#each interests}}
  - {{{this}}}
  {{/each}}

  Skills:
  {{#each skills}}
  - {{{this}}}
  {{/each}}
  `,
});

const careerGuideFlow = ai.defineFlow(
  {
    name: 'careerGuideFlow',
    inputSchema: CareerGuideInputSchema,
    outputSchema: CareerGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

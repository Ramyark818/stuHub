
'use server';

/**
 * @fileOverview A career guidance AI agent.
 *
 * - guideCareer - A function that provides career suggestions based on interests and skills.
 * - CareerGuideInput - The input type for the guideCareer function.
 * - CareerGuideOutput - The return type for the guideCareer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerGuideInputSchema = z.object({
  interests: z.string().describe('The student\'s interests.'),
  skills: z.string().describe('The student\'s skills.'),
});
export type CareerGuideInput = z.infer<typeof CareerGuideInputSchema>;

const CareerSuggestionSchema = z.object({
    title: z.string().describe("The title of the career path."),
    description: z.string().describe("A brief description of why this career is a good fit."),
    fitReason: z.string().describe("A brief explanation of why this career is a good fit based on the provided interests and skills."),
    nextSteps: z.array(z.string()).describe("A list of actionable next steps for the student to take.")
});

const CareerGuideOutputSchema = z.object({
  suggestions: z.array(CareerSuggestionSchema).describe('A list of 2-3 career suggestions.'),
});
export type CareerGuideOutput = z.infer<typeof CareerGuideOutputSchema>;

export async function guideCareer(input: CareerGuideInput): Promise<CareerGuideOutput> {
  return careerGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerGuidePrompt',
  input: {schema: CareerGuideInputSchema},
  output: {schema: CareerGuideOutputSchema},
  prompt: `You are an expert AI career counselor for university students.

  Your goal is to help students explore career paths based on their provided interests and skills.

  Based on the following information, suggest 2-3 specific career paths. For each path, provide:
  - A title for the career path.
  - A brief description of the career.
  - A reason why it's a good fit for the student's interests and skills.
  - A list of concrete next steps (e.g., specific courses to take, types of projects to build, where to look for internships).

  Keep your tone encouraging, supportive, and professional.

  Student's Interests: {{{interests}}}
  Student's Skills: {{{skills}}}`,
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

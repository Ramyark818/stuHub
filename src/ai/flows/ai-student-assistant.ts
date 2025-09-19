
'use server';

/**
 * @fileOverview A student AI assistant agent.
 *
 * - askAssistant - A function that allows students to ask questions and get answers from the AI assistant.
 * - AskAssistantInput - The input type for the askAssistant function.
 * - AskAssistantOutput - The return type for the askAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAssistantInputSchema = z.object({
  query: z.string().describe('The question or query from the student.'),
});
export type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

const AskAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the student\'s query.'),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return askAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAssistantPrompt',
  input: {schema: AskAssistantInputSchema},
  output: {schema: AskAssistantOutputSchema},
  prompt: `You are an expert AI career counselor for university students.

  Your goal is to help students explore career paths, understand job market trends, and identify the skills they need to succeed.

  - If a student asks for career suggestions, ask for their interests and skills.
  - If they provide interests and skills, suggest 2-3 specific career paths.
  - For each path, explain why it's a good fit and what steps they could take to pursue it (e.g., courses to take, projects to build, internships to seek).
  - If a student asks about a specific career, provide insights into the day-to-day responsibilities, required qualifications, and potential career growth.
  - Answer general questions about resumes, interviews, and networking.

  Keep your tone encouraging, supportive, and professional.

  Please provide a helpful and detailed response to the following student query:

  Query: {{{query}}}`,
});

const askAssistantFlow = ai.defineFlow(
  {
    name: 'askAssistantFlow',
    inputSchema: AskAssistantInputSchema,
    outputSchema: AskAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

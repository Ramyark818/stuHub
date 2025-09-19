
'use server';

import {
  createAI,
  getMutableAIState,
} from 'ai/rsc';
import { CoreMessage } from 'ai';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import { ReactNode } from 'react';
import { askAssistant } from './ai/flows/ai-student-assistant';
import { streamUI } from 'ai/rsc';

async function submit(formData?: FormData) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  const prompt = formData?.get('input') as string;

  const stream = streamUI({
    model: 'googleai/gemini-2.5-flash',
    prompt: `You are an expert AI career counselor for university students.

  Your goal is to help students explore career paths, understand job market trends, and identify the skills they need to succeed.

  - If a student asks for career suggestions, ask for their interests and skills.
  - If they provide interests and skills, suggest 2-3 specific career paths.
  - For each path, explain why it's a good fit and what steps they could take to pursue it (e.g., courses to take, projects to build, internships to seek).
  - If a student asks about a specific career, provide insights into the day-to-day responsibilities, required qualifications, and potential career growth.
  - Answer general questions about resumes, interviews, and networking.

  Keep your tone encouraging, supportive, and professional.

  Please provide a helpful and detailed response to the following student query:

  Query: ${prompt}`,
  });

  stream.done();

  return stream.value;
}

// Define the initial AI state of the application.
const initialAIState: CoreMessage[] = [];

// Define the initial UI state of the application.
const initialUIState: {
  id: number;
  role: 'user' | 'assistant';
  display: React.ReactNode;
}[] = [];

// The `createAI` function configures the AI state and actions for the application.
export const AI = createAI({
  actions: {
    submit,
    assessTranscript,
  },
  initialUIState,
  initialAIState,
});

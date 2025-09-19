'use server';

import {
  createAI,
  getMutableAIState,
} from 'ai/rsc';
import { CoreMessage } from 'ai';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import { askAssistant } from '@/ai/flows/ai-student-assistant';
import { ReactNode } from 'react';

async function submit(formData: FormData): Promise<{
  id: number;
  display: ReactNode;
}> {
  'use server';
  const aiState = getMutableAIState<typeof AI>();

  const userMessage = {
    id: Date.now(),
    role: 'user' as const,
    content: formData.get('input') as string,
  };

  // Update AI state with new user message.
  aiState.update([...aiState.get(), userMessage]);

  const reply = await askAssistant({ query: userMessage.content });

  const assistantMessage = {
    id: Date.now(),
    role: 'assistant' as const,
    content: reply.answer,
  };

  aiState.done([...aiState.get(), assistantMessage]);

  return {
    id: assistantMessage.id,
    display: reply.answer,
  };
}

// Define the initial AI state of the application.
const initialAIState: CoreMessage[] = [];

// Define the initial UI state of the application.
const initialUIState: {
  id: number;
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

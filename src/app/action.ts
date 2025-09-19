
'use server';

import {
  createAI,
  getMutableAIState,
} from 'ai/rsc';
import { CoreMessage } from 'ai';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import { ReactNode } from 'react';

async function submit(formData: FormData): Promise<any> {
  'use server';
  const aiState = getMutableAIState<typeof AI>();

  aiState.done([...aiState.get(), {
    role: 'assistant',
    content: 'Sorry, the chat feature is currently unavailable.'
  }]);

  return {
    id: Date.now(),
    role: 'assistant',
    display: 'Sorry, the chat feature is currently unavailable.'
  };
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
    assessTranscript,
  },
  initialUIState,
  initialAIState,
});

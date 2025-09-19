
'use server';

import {
  createAI,
  getMutableAIState,
} from 'ai/rsc';
import { CoreMessage } from 'ai';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import { ReactNode } from 'react';

async function submit(formData?: FormData) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  // The `submit` action does nothing for now.
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

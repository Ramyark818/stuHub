'use server';

import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from 'ai/rsc';
import { CoreMessage } from 'ai';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import { askAssistant } from '@/ai/flows/ai-student-assistant';

async function submit(formData: FormData): Promise<{
  id: number;
  display: React.ReactNode;
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

  const streamable = createStreamableUI(<div>Typing...</div>);

  const reply = await askAssistant({ query: userMessage.content });

  aiState.done([
    ...aiState.get(),
    { role: 'assistant', content: reply.answer },
  ]);
  streamable.done(<div>{reply.answer}</div>);

  return {
    id: Date.now(),
    display: streamable.value,
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

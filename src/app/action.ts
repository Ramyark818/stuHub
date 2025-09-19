import 'server-only';
import { createAI } from 'ai/rsc';
import { assessTranscript, assessTranscriptFlow, TranscriptAssessmentInput, TranscriptAssessmentOutput } from '@/ai/flows/transcript-assessment';
import { askAssistant, askAssistantFlow, AskAssistantInput, AskAssistantOutput } from '@/ai/flows/ai-student-assistant';

async function submit(formData: FormData): Promise<void> {
  'use server';
  // This is a dummy function to satisfy the createAI interface.
  // The actual logic is handled by calling the specific action functions.
}

export const AI = createAI<any, any, {
  assessTranscript: (input: TranscriptAssessmentInput) => Promise<TranscriptAssessmentOutput>;
  askAssistant: (input: AskAssistantInput) => Promise<AskAssistantOutput>;
}>({
  actions: {
    assessTranscript,
    askAssistant,
  },
  initialUIState: [],
  initialAIState: [],
});

import 'server-only';
import { createAI } from 'ai/rsc';
import { assessTranscript } from '@/ai/flows/transcript-assessment';
import type { TranscriptAssessmentInput, TranscriptAssessmentOutput } from '@/ai/flows/transcript-assessment';
import { askAssistant } from '@/ai/flows/ai-student-assistant';
import type { AskAssistantInput, AskAssistantOutput } from '@/ai/flows/ai-student-assistant';


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

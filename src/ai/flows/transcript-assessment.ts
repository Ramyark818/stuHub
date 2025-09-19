// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Assesses a student's academic transcript.
 *
 * - assessTranscript - A function that assesses the transcript and provides a summary.
 * - TranscriptAssessmentInput - The input type for the assessTranscript function.
 * - TranscriptAssessmentOutput - The return type for the assessTranscript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscriptAssessmentInputSchema = z.object({
  transcriptDataUri: z
    .string()
    .describe(
      'The academic transcript as a data URI.  Must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type TranscriptAssessmentInput = z.infer<typeof TranscriptAssessmentInputSchema>;

const TranscriptAssessmentOutputSchema = z.object({
  summary: z.string().describe('A summary of the student\'s academic progress.'),
  completedCourses: z.array(z.string()).describe('A list of completed courses.'),
  gpa: z.number().describe('The student\'s GPA.'),
  areasForImprovement: z.string().describe('Potential areas for academic improvement.'),
});
export type TranscriptAssessmentOutput = z.infer<typeof TranscriptAssessmentOutputSchema>;

export async function assessTranscript(input: TranscriptAssessmentInput): Promise<TranscriptAssessmentOutput> {
  return assessTranscriptFlow(input);
}

const transcriptAssessmentPrompt = ai.definePrompt({
  name: 'transcriptAssessmentPrompt',
  input: {schema: TranscriptAssessmentInputSchema},
  output: {schema: TranscriptAssessmentOutputSchema},
  prompt: `You are an AI academic advisor.  A student has uploaded their transcript.

  Analyze the transcript, and provide a summary of their academic progress, including a list of completed courses, their GPA, and potential areas for improvement. Use the following transcript data:

  Transcript: {{media url=transcriptDataUri}}`,
});

const assessTranscriptFlow = ai.defineFlow(
  {
    name: 'assessTranscriptFlow',
    inputSchema: TranscriptAssessmentInputSchema,
    outputSchema: TranscriptAssessmentOutputSchema,
  },
  async input => {
    const {output} = await transcriptAssessmentPrompt(input);
    return output!;
  }
);

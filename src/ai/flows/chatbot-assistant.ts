// A chatbot that answers user questions about government schemes.
//
// - schemeChatbot - A function that handles the chatbot conversation.
// - SchemeChatbotInput - The input type for the schemeChatbot function.
// - SchemeChatbotOutput - The return type for the schemeChatbot function.

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SchemeChatbotInputSchema = z.object({
  query: z.string().describe('The user query about government schemes.'),
});
export type SchemeChatbotInput = z.infer<typeof SchemeChatbotInputSchema>;

const SchemeChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type SchemeChatbotOutput = z.infer<typeof SchemeChatbotOutputSchema>;

const prompt = ai.definePrompt({
  name: 'schemeChatbotPrompt',
  input: { schema: SchemeChatbotInputSchema },
  output: { schema: SchemeChatbotOutputSchema },
  prompt: `You are a helpful AI chatbot assistant designed to answer user questions about government schemes.

  You have access to a database of schemes and can provide information on scheme names, eligibility criteria, benefits, required documents, and the application process.

  When answering questions, provide clear, step-by-step guidance.

  If the information is not available, respond politely that you do not have the information.

  User Query: {{{query}}}`,
});

export const schemeChatbotFlow = ai.defineFlow(
  {
    name: 'schemeChatbotFlow',
    inputSchema: SchemeChatbotInputSchema,
    outputSchema: SchemeChatbotOutputSchema,
  },
  async (input) => {
    const result = await prompt(input);
    return {
      response: result.output?.response ?? "Sorry, I couldn't generate a response.",
    };
  }
);

export async function schemeChatbot(input: SchemeChatbotInput): Promise<SchemeChatbotOutput> {
  return schemeChatbotFlow(input);
}

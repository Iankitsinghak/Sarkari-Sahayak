'use server';

/**
 * @fileOverview A government scheme recommendation AI agent.
 *
 * - recommendSchemes - A function that handles the scheme recommendation process.
 * - RecommendSchemesInput - The input type for the recommendSchemes function.
 * - RecommendSchemesOutput - The return type for the recommendSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSchemesInputSchema = z.object({
  profile: z
    .object({
      fullName: z.string(),
      age: z.number(),
      gender: z.string(),
      locationState: z.string(),
      locationDistrict: z.string(),
      incomeLevel: z.string(),
      occupation: z.string(),
      educationLevel: z.string(),
      casteCategory: z.string(),
      disabilityStatus: z.string(),
      aadhaarLinked: z.string(),
    })
    .describe('The user profile.'),
  schemes: z
    .array(z.object({
      name: z.string(),
      category: z.string(),
      eligibility: z.string(),
      benefits: z.string(),
      requiredDocuments: z.string(),
      applicationProcess: z.string(),
      officialLink: z.string(),
    }))
    .describe('A list of government schemes.'),
});
export type RecommendSchemesInput = z.infer<typeof RecommendSchemesInputSchema>;

const RecommendSchemesOutputSchema = z.array(z.object({
  name: z.string(),
  summary: z.string(),
}));
export type RecommendSchemesOutput = z.infer<typeof RecommendSchemesOutputSchema>;

export async function recommendSchemes(input: RecommendSchemesInput): Promise<RecommendSchemesOutput> {
  return recommendSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSchemesPrompt',
  input: {schema: RecommendSchemesInputSchema},
  output: {schema: RecommendSchemesOutputSchema},
  prompt: `You are an AI assistant that recommends government schemes to users based on their profiles.

  User Profile:
  Full Name: {{{profile.fullName}}}
  Age: {{{profile.age}}}
  Gender: {{{profile.gender}}}
  Location State: {{{profile.locationState}}}
  Location District: {{{profile.locationDistrict}}}
  Income Level: {{{profile.incomeLevel}}}
  Occupation: {{{profile.occupation}}}
  Education Level: {{{profile.educationLevel}}}
  Caste Category: {{{profile.casteCategory}}}
  Disability Status: {{{profile.disabilityStatus}}}
  Aadhaar Linked: {{{profile.aadhaarLinked}}}

  Schemes:
  {{#each schemes}}
  Name: {{{name}}}
  Category: {{{category}}}
  Eligibility: {{{eligibility}}}
  Benefits: {{{benefits}}}
  Required Documents: {{{requiredDocuments}}}
  Application Process: {{{applicationProcess}}}
  Official Link: {{{officialLink}}}
  {{/each}}

  Recommend schemes that are relevant to the user's profile and provide a short summary of each scheme, explaining the key benefits and eligibility requirements.
  Return a JSON array of objects with the scheme name and summary.
  `,
});

const recommendSchemesFlow = ai.defineFlow(
  {
    name: 'recommendSchemesFlow',
    inputSchema: RecommendSchemesInputSchema,
    outputSchema: RecommendSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

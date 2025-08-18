'use server';

/**
 * Government Scheme Recommendation AI Flow
 *
 * - recommendSchemes: Main function to run the recommendation flow
 * - Input schema defines user profile + available schemes
 * - Output schema returns recommended schemes with short summaries
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ✅ Input schema
const RecommendSchemesInputSchema = z.object({
  profile: z.object({
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
  }),
  schemes: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      eligibility: z.string(),
      benefits: z.string(),
      requiredDocuments: z.string(),
      applicationProcess: z.string(),
      officialLink: z.string(),
    })
  ),
});
export type RecommendSchemesInput = z.infer<typeof RecommendSchemesInputSchema>;

// ✅ Output schema
const RecommendSchemesOutputSchema = z.array(
  z.object({
    name: z.string(),
    summary: z.string(),
  })
);
export type RecommendSchemesOutput = z.infer<
  typeof RecommendSchemesOutputSchema
>;

// ✅ Prompt definition
const recommendSchemesPrompt = ai.definePrompt({
  name: 'recommendSchemesPrompt',
  input: { schema: RecommendSchemesInputSchema },
  output: { schema: RecommendSchemesOutputSchema },
  prompt: `
You are an AI assistant that recommends government schemes to users based on their profiles.

User Profile:
- Full Name: {{{profile.fullName}}}
- Age: {{{profile.age}}}
- Gender: {{{profile.gender}}}
- Location: {{{profile.locationDistrict}}}, {{{profile.locationState}}}
- Income Level: {{{profile.incomeLevel}}}
- Occupation: {{{profile.occupation}}}
- Education Level: {{{profile.educationLevel}}}
- Caste Category: {{{profile.casteCategory}}}
- Disability Status: {{{profile.disabilityStatus}}}
- Aadhaar Linked: {{{profile.aadhaarLinked}}}

Available Schemes:
{{#each schemes}}
- Name: {{{name}}}
  Category: {{{category}}}
  Eligibility: {{{eligibility}}}
  Benefits: {{{benefits}}}
  Documents: {{{requiredDocuments}}}
  Process: {{{applicationProcess}}}
  Link: {{{officialLink}}}
{{/each}}

Now, recommend the most relevant schemes for this user.
For each recommendation, return:
- "name": scheme name
- "summary": 2–3 lines explaining key benefits & eligibility

⚠️ Only return valid JSON array matching the schema.
  `,
});

// ✅ Flow definition
const recommendSchemesFlow = ai.defineFlow(
  {
    name: 'recommendSchemesFlow',
    inputSchema: RecommendSchemesInputSchema,
    outputSchema: RecommendSchemesOutputSchema,
  },
  async (input) => {
    const { output } = await recommendSchemesPrompt(input);
    return output ?? [];
  }
);

// ✅ Exported function
export async function recommendSchemes(
  input: RecommendSchemesInput
): Promise<RecommendSchemesOutput> {
  return recommendSchemesFlow(input);
}

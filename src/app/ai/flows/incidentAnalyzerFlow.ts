import * as z from 'zod';
import { defineFlow } from "@genkit-ai/flow"
import { promptRef } from '@genkit-ai/dotprompt';
import { defineSchema } from '@genkit-ai/core';


export const IncidentAnalyzerInputSchema = defineSchema(
  'IncidentAnalyzerInputSchema',
  z.object({
    title: z.string().describe('The title of the news article'),
    news: z.string().describe('The content of the news article'),
  })
)

export const IncidentAnalyzerOutputSchema = defineSchema(
  'IncidentAnalyzerOutputSchema',
  z.object({
    location_name: z.string().describe('The name of the area where the incident occurred'),
    type: z.string().describe('The type of incident that occurred'),
    // location: z.object({
    //   longitude: z.number().describe('The longitude of the incident'),
    //   latitude: z.number().describe('The latitude of the incident'),
    // }),
  })
)


export const incidentAnalyzerFlow = defineFlow(
    {
      name: 'incidentAnalyzerFlow',
      inputSchema: IncidentAnalyzerInputSchema,
      outputSchema: IncidentAnalyzerOutputSchema,
    },
    async (input) => {
      const prompt = promptRef('incidentAnalyzer');
      const llmResponse = await prompt.generate<typeof IncidentAnalyzerOutputSchema>({
        input,
      });
      const output = llmResponse.output();
      return output;
    }
  );
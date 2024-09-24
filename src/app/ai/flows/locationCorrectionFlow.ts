import * as z from 'zod';
import { defineFlow } from "@genkit-ai/flow"
import { promptRef } from '@genkit-ai/dotprompt';
// import { IncidentAnalyzerInputSchema, IncidentAnalyzerOutputSchema } from './incidentAnalyzerFlow';


export const locationCorrectorFlow = defineFlow(
    {
      name: 'locationCorrectorFlow',
      // inputSchema: IncidentAnalyzerInputSchema,
      // outputSchema: IncidentAnalyzerOutputSchema,
    },
    async (input) => {
      const prompt = promptRef('locationCorrector');
      const llmResponse = await prompt.generate({
        input,
      });
      const output = llmResponse.output();
      return output;
    }
  );
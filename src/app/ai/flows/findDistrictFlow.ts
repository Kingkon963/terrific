import * as z from 'zod';
import { defineFlow } from "@genkit-ai/flow"
import { promptRef } from '@genkit-ai/dotprompt';


export const FindDistrictFlowInputSchema = z.object({
  news: z.string(),
})

const FindDistrictFlowOutputSchema = z.object({
  district: z.string(),
  type: z.string(),
})


export const findDistrictFlow = defineFlow(
    {
      name: 'findDistrictFlow',
      inputSchema: FindDistrictFlowInputSchema,
      outputSchema: FindDistrictFlowOutputSchema,
    },
    async (input) => {
      const prompt = promptRef('findDistrict');
      const llmResponse = await prompt.generate({
        input,
      });
  
      // Handle the response from the model API. In this sample, we just convert
      // it to a string, but more complicated flows might coerce the response into
      // structured output or chain the response into another LLM call, etc.
     const output = {
        district: llmResponse.text().split('|')[0].trim(),
        type: llmResponse.text().split('|')[1].trim(),
      };
      return output;
    }
  );
import { googleAI } from '@genkit-ai/googleai';
import { findDistrictFlow } from './findDistrictFlow';
import { configureGenkit } from '@genkit-ai/core';
import { dotprompt } from '@genkit-ai/dotprompt';



configureGenkit({
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
        }),
        dotprompt({
            dir: "src/app/ai/prompts",
        })
    ],
    logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    enableTracingAndMetrics: true,
})

const flows = {
    findDistrictFlow,
}

export default flows;

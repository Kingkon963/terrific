import flows from '@/app/ai/flows';
import { FindDistrictFlowInputSchema } from '@/app/ai/flows/findDistrictFlow';
import { runFlow } from '@genkit-ai/flow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  if (!data) {
    return NextResponse.json({
      error: 'No data provided',
    }, {
      status: 400,
    });
  }

  try {
    const input = FindDistrictFlowInputSchema.parse(data);
  
    const output = await runFlow(flows.findDistrictFlow, input);
    
    return NextResponse.json(output);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Failed to process data',
    }, {
      status: 500,
    });
  }
}
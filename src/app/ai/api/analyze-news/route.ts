import flows from '@/app/ai/flows';
import { IncidentAnalyzerInputSchema } from '@/app/ai/flows/incidentAnalyzerFlow';
import { runFlow } from '@genkit-ai/flow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log(req.body);
  const data = await req.json();
  if (!data) {
    return NextResponse.json({
      error: 'No data provided',
    }, {
      status: 400,
    });
  }

  try {
    const input = IncidentAnalyzerInputSchema.parse(data);
  
    const output = await runFlow(flows.incidentAnalyzerFlow, input);
    
    return NextResponse.json(output, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Failed to process data',
    }, {
      status: 500,
    });
  }
}
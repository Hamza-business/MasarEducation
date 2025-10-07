import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const district = req.nextUrl.searchParams.get('district');
    
    if (!district) {
      return new NextResponse(
        JSON.stringify({ error: 'District parameter is required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`https://turkiyeapi.dev/api/v1/neighborhoods?district=${encodeURIComponent(district)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MasarEducation/1.0'
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract just the names as the original code does
    const namesOnly = data.data?.map((neighborhood: { name: string }) => neighborhood.name) || [];
    
    return NextResponse.json(namesOnly);
  } catch (error) {
    console.error('Failed to fetch neighborhoods from Turkey API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch neighborhoods' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

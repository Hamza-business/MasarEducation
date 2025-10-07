import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const province = req.nextUrl.searchParams.get('province');
    
    if (!province) {
      return new NextResponse(
        JSON.stringify({ error: 'Province parameter is required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`https://turkiyeapi.dev/api/v1/districts?province=${encodeURIComponent(province)}`, {
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
    const namesOnly = data.data?.map((district: { name: string }) => district.name) || [];
    
    return NextResponse.json(namesOnly);
  } catch (error) {
    console.error('Failed to fetch districts from Turkey API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch districts' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

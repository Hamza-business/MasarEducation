import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // assuming you're using this path

// GET: Get all visible regions
export async function GET() {
  try {
    const regions = await prisma.regions.findMany({
      where: { hidden: false },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error('GET /regions error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Add a new region
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { country, name } = body;

    if (!name || typeof name !== 'string') {
      return new NextResponse('Invalid region name', { status: 400 });
    }

    const newRegion = await prisma.regions.create({
      data: { country, name },
    });

    return NextResponse.json(newRegion, { status: 201 });
  } catch (error) {
    console.error('POST /regions error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

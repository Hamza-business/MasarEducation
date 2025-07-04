import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/neighborhoods?district=1
export async function GET(req: NextRequest) {
  try {
    const districtId = req.nextUrl.searchParams.get('district');

    if (!districtId) {
      return new NextResponse('District ID is required', { status: 400 });
    }

    const neighborhoods = await prisma.neighbourhoods.findMany({
      where: {
        hidden: false,
        districts: Number(districtId),
      },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(neighborhoods);
  } catch (error) {
    console.error('[NEIGHBORHOODS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/neighborhoods
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, districts } = body;

    if (!name || !districts) {
      return new NextResponse('Name and district ID are required', { status: 400 });
    }

    const newNeighborhood = await prisma.neighbourhoods.create({
      data: {
        name,
        districts: Number(districts),
      },
    });

    return NextResponse.json(newNeighborhood, { status: 201 });
  } catch (error) {
    console.error('[NEIGHBORHOODS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

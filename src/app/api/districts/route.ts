import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/districts?region=1
export async function GET(req: NextRequest) {
  try {
    const regionId = req.nextUrl.searchParams.get('region');
    if (!regionId) {
      return new NextResponse('Region ID is required', { status: 400 });
    }

    const districts = await prisma.districts.findMany({
      where: {
        hidden: false,
        region: Number(regionId),
      },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(districts);
  } catch (error) {
    console.error('[DISTRICTS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/districts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, region } = body;

    if (!name || !region) {
      return new NextResponse('Name and region ID are required', { status: 400 });
    }

    const newDistrict = await prisma.districts.create({
      data: {
        name,
        region: Number(region),
      },
    });

    return NextResponse.json(newDistrict, { status: 201 });
  } catch (error) {
    console.error('[DISTRICTS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const regionId = Number(params.id);

  try {
    await prisma.regions.update({
      where: { id: regionId },
      data: { hidden: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    err;
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const regionId = Number(params.id);
  try {
    const body = await request.json();
    const { name } = body;

    const updatedRegion = await prisma.regions.update({
      where: { id: regionId },
      data: { name:name },
    });

    return NextResponse.json(updatedRegion);
  } catch (err) {
    err;
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 });
  }
}

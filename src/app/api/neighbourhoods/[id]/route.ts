import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const neighbourhoodId = Number(params.id);

  try {
    await prisma.neighbourhoods.update({
      where: { id: neighbourhoodId },
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
  const neighbourhoodId = Number(params.id);
  try {
    const body = await request.json();
    const { name } = body;

    const updatedNeighbourhood = await prisma.neighbourhoods.update({
      where: { id: neighbourhoodId },
      data: { name:name },
    });

    return NextResponse.json(updatedNeighbourhood);
  } catch (err) {
    err;
    return NextResponse.json({ error: "Failed to update neighbourhood" }, { status: 500 });
  }
}

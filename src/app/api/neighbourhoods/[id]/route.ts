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

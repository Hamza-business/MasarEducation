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

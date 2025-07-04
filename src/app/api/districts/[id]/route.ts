import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const districtId = Number(params.id);

  try {
    await prisma.districts.update({
      where: { id: districtId },
      data: { hidden: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}

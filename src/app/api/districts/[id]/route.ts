import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: any
) {
  const districtId = Number(params.id);

  try {
    await prisma.districts.update({
      where: { id: districtId },
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
  { params }: any
) {
  const districtId = Number(params.id);
  try {
    const body = await request.json();
    const { name } = body;

    const updatedDistrict = await prisma.districts.update({
      where: { id: districtId },
      data: { name:name },
    });

    return NextResponse.json(updatedDistrict);
  } catch (err) {
    err;
    return NextResponse.json({ error: "Failed to update district" }, { status: 500 });
  }
}

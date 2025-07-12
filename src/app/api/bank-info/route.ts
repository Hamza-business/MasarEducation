// /api/bank-info/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bank = await prisma.bank.findFirst();

    return NextResponse.json(bank);
  } catch (error) {
    console.error('GET /regions error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bank, tiban, diban, eiban } = body;

    await prisma.bank.update({
      where: { id: 1 },
      data: { name, bank, tiban, diban, eiban },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update bank info." }, { status: 500 });
  }
}
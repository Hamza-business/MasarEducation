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
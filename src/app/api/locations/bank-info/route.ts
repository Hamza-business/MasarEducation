// /api/locations/bank-info/route.ts
import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Mock data for testing when database is not available
    const mockBankData = {
      id: 1,
      name: "Masar Education",
      bank: "Test Bank",
      tiban: "TR1234567890123456789012345",
      diban: "TR1234567890123456789012346", 
      eiban: "TR1234567890123456789012347"
    };

    // Uncomment when database is available:
    // const bank = await prisma.bank.findFirst();
    // return NextResponse.json(bank);

    return NextResponse.json(mockBankData);
  } catch (error) {
    console.error('GET /locations/bank-info error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bank, tiban, diban, eiban } = body;

    // Mock response for testing when database is not available
    // Uncomment when database is available:
    // await prisma.bank.update({
    //   where: { id: 1 },
    //   data: { name, bank, tiban, diban, eiban },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update bank info." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

function generateRandomCode(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET() {
  try {
    let trackCode: string = "";
    let exists = true;
    const maxAttempts = 20;
    let attempts = 0;

    while (exists && attempts < maxAttempts) {
      trackCode = generateRandomCode();
      const existing = await prisma.insurance_order.findFirst({
        where: { track_code: trackCode },
      });
      exists = !!existing;
      attempts++;
    }

    if (exists) {
      return new NextResponse("Unable to generate unique track code", { status: 500 });
    }

    return NextResponse.json({ trackCode });
  } catch (err) {
    console.error("Track code generation error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
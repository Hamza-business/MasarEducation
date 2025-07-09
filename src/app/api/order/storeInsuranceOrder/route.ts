import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { oredrStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.insurance_order.create({
      data: {
        track_code: body.trackCode,
        personinfo: body.personInfo,
        insurance_application: body.insuranceApplication,
        receipt: body.receipt,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (err) {
    console.error("Error storing insurance_order:", err);
    return new NextResponse("Failed to store insurance order", { status: 500 });
  }
}

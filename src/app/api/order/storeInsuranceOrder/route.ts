import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { oredrStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.insurance_order.create({
      data: {
        track_code: body.order.trackCode,
        personinfo: body.order.personInfo,
        insurance_application: body.order.insuranceApplication,
        receipt: body.order.receipt,
      },
      select: { id: true },
    });

    const result2 = await prisma.insurance_order_agent.create({
      data: {
        agent: parseInt(body.agent),
        order: result.id,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (err) {
    console.error("Error storing insurance_order:", err);
    return new NextResponse("Failed to store insurance order", { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { InsuranceApplication } from "@/types/all";

function isValidApplication(app: any): app is InsuranceApplication {
  return (
    typeof app === "object" &&
    typeof app.region === "string" &&
    typeof app.district === "string" &&
    typeof app.neighbourhood === "string" &&
    typeof app.street === "string" &&
    typeof app.building === "string" &&
    typeof app.appartment === "string" &&
    typeof app.plan === "string" &&
    typeof app.price === "number"
  );
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidApplication(body)) {
      return new NextResponse("Invalid insurance application format", { status: 400 });
    }

    const result = await prisma.insurance_application.create({
      data: {
        region: body.region || "",
        district: body.district || "",
        neighbourhood: body.neighbourhood || "",
        street: body.street,
        building: body.building,
        appartment: body.appartment,
        plan: body.plan,
        price: body.price || 0,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error storing insurance application:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Country, PersonInfo } from "@/types/all";

function isValidPersonInfo(info: any): info is PersonInfo {
  return (
    typeof info === "object" &&
    typeof info.nat === "string" &&
    typeof info.dob === "string" &&
    typeof info.email === "string" &&
    typeof info.phone === "string" &&
    typeof info.name === "string" &&
    typeof info.passport === "number"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidPersonInfo(body)) {
      return new NextResponse("Invalid person info format", { status: 400 });
    }

    const result = await prisma.personinfo.create({
      data: {
        nat: body.nat as Country,
        dob: new Date(body.dob),
        passport: body.passport,
        name: body.name,
        phone: body.phone,
        email: body.email,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error storing person info:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
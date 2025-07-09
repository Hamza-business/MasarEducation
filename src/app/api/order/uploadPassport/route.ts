import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { MimeType, PassportFile  } from "@/types/all";

function isValidPassportFile(file: any): file is PassportFile {
  return (
    typeof file === "object" &&
    typeof file.name === "string" &&
    typeof file.mimetype === "string" &&
    typeof file.data === "string"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidPassportFile(body)) {
      return new NextResponse("Invalid passport file format", { status: 400 });
    }

    const result = await prisma.passports.create({
      data: {
        name: body.name,
        mimetype: body.mimetype,
        data: body.data,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error uploading passport:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
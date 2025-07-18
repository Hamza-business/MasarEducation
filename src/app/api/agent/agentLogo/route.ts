import { NextRequest, NextResponse } from 'next/server';
import sql from "@/lib/db";
import { agentImageType } from "@/types/all";

function isValidLogoFile(file: any): file is agentImageType {
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

    if (!isValidLogoFile(body)) {
      return new NextResponse("Invalid Logo file format", { status: 400 });
    }

    const result = await sql.query(
        `INSERT INTO "files"."agent_images" (name, mimetype, data)
        VALUES ($1, $2, $3)
        RETURNING id`,
        [body.name, body.mimetype, body.data]
    );

    return NextResponse.json({ id: result[0].id });
  } catch (error) {
    console.error("Error uploading passport:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
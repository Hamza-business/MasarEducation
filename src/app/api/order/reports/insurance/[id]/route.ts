// src/app/api/file/[id]/route.ts
import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: any) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ message: "Invalid file ID" }, { status: 400 });

  try {
    const result = await sql`
      SELECT name, mimetype, data
      FROM files.insurance_files
      WHERE id = ${id}
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const file = result[0];
    const buffer = Buffer.from(file.data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": file.mimetype,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json({ message: "Error downloading file" }, { status: 500 });
  }
}

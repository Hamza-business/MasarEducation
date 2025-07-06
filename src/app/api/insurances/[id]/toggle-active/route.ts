import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: any
) {
  const id = parseInt(await params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { active } = await req.json(); // true or false

  try {
    const [result] = await sql`
      UPDATE services.insurances
      SET active = ${active}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update active state' }, { status: 500 });
  }
}


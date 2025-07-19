import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { active } = await req.json();
  if (typeof active !== 'boolean') {
    return NextResponse.json({ error: 'Invalid active value' }, { status: 400 });
  }

  try {
    await sql`
      UPDATE "agents"."agent_info"
      SET active = ${active}
      WHERE id = ${id}
    `;

    return NextResponse.json({sucess:true});
  } catch (error) {
    console.error("PATCH /api/insurances/[id]/toggle-active:", error);
    return NextResponse.json({ error: 'Failed to update active state' }, { status: 500 });
  }
}

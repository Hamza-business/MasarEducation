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
    await sql`BEGIN`;
    await sql`
      UPDATE services.insurances
      SET active = ${active}
      WHERE id = ${id}
    `;
    await sql`COMMIT`;

    const [insurance] = await sql`
      SELECT * FROM services.insurances
      WHERE id = ${id}
    `;

    const prices = await sql`
      SELECT * FROM services.insurance_prices
      WHERE insurance = ${id}
      ORDER BY "minAge"
    `;

    const result = {
      ...insurance,
      prices,
    };

    return NextResponse.json(result);
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("PATCH /api/insurances/[id]/toggle-active:", error);
    return NextResponse.json({ error: 'Failed to update active state' }, { status: 500 });
  }
}

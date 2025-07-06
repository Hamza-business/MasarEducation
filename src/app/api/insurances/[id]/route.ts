import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
    console.log("Meoow")
  try {
    await sql`BEGIN`;
    const id = Number(await params.id);
    const body = await req.json();
    const { name, unit, period, prices } = body;

    if (!id || !name || !unit || !period || !Array.isArray(prices) || prices.length === 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`
      UPDATE services.insurances
      SET name = ${name}, unit = ${period}, period = ${unit}
      WHERE id = ${id}
    `;

    await sql`
      DELETE FROM services.insurance_prices WHERE insurance = ${id}
    `;

    for (const price of prices) {
      const { minAge, maxAge, price: value } = price;

      await sql`
        INSERT INTO services.insurance_prices (insurance, "minAge", "maxAge", price)
        VALUES (${id}, ${minAge}, ${maxAge}, ${value})
      `;
    }

    await sql`COMMIT`;

    return NextResponse.json({ success: true });
  } catch (error) {
    await sql`ROLLBACK`;
    console.error(`PUT /api/insurances/${params.id}:`, error);
    return NextResponse.json({ error: "Failed to update insurance." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  const id = Number(await params.id);
  if (isNaN(id)) return new Response('Invalid insurance ID', { status: 400 });

  try {
    await sql`BEGIN`;

    await sql`
      DELETE FROM services.insurance_prices
      WHERE insurance = ${id}
    `;

    await sql`
      DELETE FROM services.insurances
      WHERE id = ${id}
    `;

    await sql`COMMIT`;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    await sql`ROLLBACK`;
    console.error(error);
    return new Response('Failed to delete insurance package', { status: 500 });
  }
}

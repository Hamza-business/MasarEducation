// File: app/api/insurances/route.ts

import sql from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/insurances
export async function GET() {
  try {
    const insurances = await sql`
      SELECT * FROM services.insurances ORDER BY id DESC
    `;

    const prices = await sql`
      SELECT * FROM services.insurance_prices 
      ORDER BY insurance_prices.insurance, insurance_prices."minAge"
    `;

    const result = insurances.map((insurance) => ({
      ...insurance,
      prices: prices.filter((p) => p.insurance === insurance.id),
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json([]);
  }
}

// POST /api/insurances
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, unit, period, prices } = body;

    if (!name || !unit || !period || !Array.isArray(prices) || prices.length === 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const [insurance] = await sql`
      INSERT INTO services.insurances (name, unit, period)
      VALUES (${name}, ${period}, ${unit})
      RETURNING *
    `;

    for (const price of prices) {
      const { minAge, maxAge, price: value } = price;

      await sql`
        INSERT INTO services.insurance_prices (insurance, "minAge", "maxAge", price)
        VALUES (${insurance.id}, ${minAge}, ${maxAge}, ${value})
      `;
    }

    return NextResponse.json(insurance);
  } catch (error) {
    console.error("POST /api/insurances:", error);
    return NextResponse.json({ error: "Failed to create insurance." }, { status: 500 });
  }
}
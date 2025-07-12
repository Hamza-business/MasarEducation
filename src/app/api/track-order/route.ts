// src/app/api/track-order/route.ts
import sql from "@/lib/db"; // adjust path
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code || code.length !== 6) {
      return NextResponse.json({ error: "Invalid track code" }, { status: 400 });
    }



    const result = await sql`
      SELECT
        o.id,
        o.track_code,
        o.status,
        o.finish_date,
        o.msg,
        o.created_at,
        a.plan,
        a.price
      FROM insurances.insurance_order o
      JOIN insurances.insurance_application a
        ON o.insurance_application = a.id
      WHERE o.track_code = ${code}
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const row = result[0];
    const orderDetails = {
      id: row.id,
      trackCode: row.track_code,
      status: row.status,
      price: row.price,
      plan: row.plan,
      finish_date: row.finish_date,
      msg: row.msg,
      created_at: row.created_at,
    };

    return NextResponse.json(orderDetails);
  } catch (err) {
    console.error("Error fetching insurance order:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

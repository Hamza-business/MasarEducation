// src/app/api/order/reports/route.ts
import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");

    if (!orderId || isNaN(Number(orderId))) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }
    console.log(Number(orderId));

    const reports = await sql`
      SELECT id, name
      FROM files.insurance_files
      WHERE "order" = ${Number(orderId)}
    `;

    return NextResponse.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const result = await sql.query(`
      INSERT INTO "agents"."users" (email, name, password)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, password, created_at
    `, [email, name, password]);

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error inserting user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

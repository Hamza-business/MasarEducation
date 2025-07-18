import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await sql.query(
      `SELECT 1 FROM agents.users WHERE email = $1 LIMIT 1`,
      [email]
    );

    const isUnique = result.length === 0;

    return NextResponse.json({ isUnique });
  } catch (error) {
    console.error("Error in isEmailUnique API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import sql from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { url } = await req.json();


    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    const result = await sql.query(
      `SELECT 1 FROM agents.agent_info WHERE LOWER(url) = LOWER($1) LIMIT 1`,
      [url]
    );

    const isUnique = result.length === 0;

    return NextResponse.json({ isUnique });
  } catch (error) {
    console.error("Error in isURLUnique API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

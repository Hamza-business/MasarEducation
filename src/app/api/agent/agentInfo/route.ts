import { NextRequest, NextResponse } from 'next/server';
import sql from "@/lib/db";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      parent_agent,
      userid,
      agent_image,
      percent,
      agent_name,
      lvl,
      url
    } = body;

    console.log(body);

    const result = await sql.query(`
      INSERT INTO "agents"."agent_info" (
        parent_agent,
        userid,
        agent_image,
        percent,
        name,
        lvl,
        url
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
      RETURNING id, parent_agent, userid, agent_image, percent, name, lvl, url, created_at, active
    `, [parent_agent, userid, agent_image, percent, agent_name, lvl, url]);

    console.log(result);

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error inserting agent info:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

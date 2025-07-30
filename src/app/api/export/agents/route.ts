import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(req: NextRequest) {
  const parentId = req.nextUrl.searchParams.get('parent');

  if (!parentId) {
    return NextResponse.json({ error: 'Missing parent_agent ID' }, { status: 400 });
  }

  try {
    const result = await sql.query(`
      SELECT 
        ai.name AS "Agent Name",
        ai.percent,
        ai.url,
        to_char(ai.created_at, 'YYYY-MM-DD') AS "Created Date",
        to_char(ai.created_at, 'HH24:MI:SS') AS "Created Time",
        ai.active,
        u.email AS "User Email",
        u.name AS "User Name",
        u.password AS "User Password"
      FROM agents.agent_info ai
      JOIN agents.users u ON ai.userid = u.id
      WHERE ai.parent_agent = $1
    `, [parentId]);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json({ error: 'Failed to fetch agent data' }, { status: 500 });
  }
}

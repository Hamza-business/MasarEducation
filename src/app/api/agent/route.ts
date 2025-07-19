import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { AgentInfo } from '@/types/all';

export async function GET(req: NextRequest) {
  try {
        const parent = req.nextUrl.searchParams.get('parent')
        if (!parent) {
            return NextResponse.json({ error: 'Invalid agent code' }, { status: 400 });
        }
        const result = await sql.query(  `
          SELECT
            ai.id,
            ai.lvl
          FROM agents.agent_info ai
          WHERE ai.url = $1
        `,[parent]);
          
        return NextResponse.json(result[0]);
  } catch (error) {
    console.error('[FETCH_ORDERS_SQL_ERROR]', error);
    throw new Error('Failed to fetch agent from SQL database.');
  }
}

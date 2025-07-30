import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = Number(searchParams.get('parent'));

  if (!agentId) {
    return NextResponse.json({ error: 'agentId is required' }, { status: 400 });
  }

  try {
    const result = await sql.query(`
WITH all_agents AS (
    SELECT id FROM agents.agent_info WHERE id = $1
    UNION
    SELECT id FROM agents.agent_info WHERE parent_agent = $1
)
SELECT 
    -- Order info
    io.status AS "Order Status",
    io.track_code AS "Order Track Code",
    ia.plan AS "Plan",
    ia.price AS "Price",
    to_char(io.created_at, 'YYYY-MM-DD') AS "Created Date",
    to_char(io.created_at, 'HH24:MI:SS') AS "Created Time",

    -- Client Info
    pi.name AS "Client Name",
    pi.email AS "Client Email",
    pi.phone AS "Client Phone",

    -- Application Info
    ia.region AS "Region",
    ia.district AS "District",
    ia.neighbourhood AS "Neighbourhood",
    ia.street AS "Street",
    ia.building AS "Building",
    ia.appartment AS "Appartment",

    -- Agent Info
    ai.name AS "Agent Name",
    ai.percent AS "Agent Percent",

    -- Agent User Info
    au.name AS "Agent User Name",
    au.email AS "Agent User Email"

FROM all_agents a
JOIN agents.insurance_order_agent ioa ON ioa.agent = a.id
JOIN agents.agent_info ai ON ai.id = ioa.agent
JOIN agents.users au ON au.id = ai.userid
JOIN insurances.insurance_order io ON io.id = ioa.order
JOIN insurances.insurance_application ia ON ia.id = io.insurance_application
JOIN insurances.personinfo pi ON pi.id = io.personinfo

ORDER BY io.created_at DESC;


    `, [agentId]);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[FETCH_AGENT_ORDERS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch agent orders.' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = Number(searchParams.get('agentId'));

  if (!agentId) {
    return NextResponse.json({ error: 'agentId is required' }, { status: 400 });
  }

  try {
    const result = await sql.query(`
        WITH RECURSIVE subAgents AS (
            SELECT id FROM agents.agent_info WHERE id = $1
            UNION
            SELECT ai.id
            FROM agents.agent_info ai
            INNER JOIN subAgents sa ON ai.parent_agent = sa.id
        )

        SELECT 
        io.id,
        io.track_code,
        io.status,
        io.created_at,
        io.msg,

        -- Person Info
        pi.name AS person_name,
        pi.email AS person_email,
        pi.phone AS person_phone,
        pi.nat AS person_nat,
        pi.dob AS person_dob,

        -- Application Info
        ia.plan,
        ia.price,
        ia.street,
        ia.building,
        ia.appartment,
        ia.region AS region_name,
        ia.district AS district_name,
        ia.neighbourhood AS neighbourhood_name,

        -- Agent Logic: if lvl > 2 → parent info, else → agent info
        CASE 
            WHEN ai.lvl > 2 THEN pai.name
            ELSE ai.name
        END AS agent_name,

        CASE 
            WHEN ai.lvl > 2 THEN pai.url
            ELSE ai.url
        END AS agent_url,

        CASE 
            WHEN ai.lvl > 2 THEN pai.id
            ELSE ai.id
        END AS agent_id,

        CASE 
            WHEN ai.lvl > 2 THEN pai.percent
            ELSE ai.percent
        END AS percent

        FROM insurances.insurance_order io
        JOIN insurances.personinfo pi ON io.personinfo = pi.id
        JOIN insurances.insurance_application ia ON io.insurance_application = ia.id
        JOIN agents.insurance_order_agent ioa ON io.id = ioa.order
        JOIN agents.agent_info ai ON ioa.agent = ai.id
        LEFT JOIN agents.agent_info pai ON ai.parent_agent = pai.id  -- Parent agent info

        WHERE ioa.agent IN (SELECT id FROM subAgents)
        ORDER BY io.created_at DESC;

    `, [agentId]);

    const orders = result.map((row: any) => ({
      id: row.id.toString(),
      trackcode: row.track_code,
      status: row.status,
      created_at: row.created_at?.toISOString() || '',
      msg: row.msg || '',
      user: {
        name: row.person_name,
        nationality: row.person_nat,
        dob: row.person_dob?.toISOString().split('T')[0],
      },
      contact: {
        email: row.person_email,
        phone: row.person_phone,
      },
      plan: {
        name: row.plan,
        price: `₺ ${row.price}`,
      },
      location: {
        region: row.region_name,
        district: row.district_name,
        neighbourhood: row.neighbourhood_name,
        street: row.street,
        buildingNo: row.building,
        apartmentNo: row.appartment,
      },
      agent: {
        id: row.agent_id,
        name: row.agent_name,
        url: row.agent_url,
        percent: row?.percent
      },
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error('[FETCH_AGENT_ORDERS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch agent orders.' }, { status: 500 });
  }
}
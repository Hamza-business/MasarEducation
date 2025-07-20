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
      WITH RECURSIVE subagents AS (
        SELECT id FROM agents.agent_info WHERE id = $1
        UNION
        SELECT ai.id
        FROM agents.agent_info ai
        INNER JOIN subagents sa ON ai.parent_agent = sa.id
      )
      SELECT 
        io.id,
        io.track_code,
        io.status,
        io.created_at,
        io.msg,

        pi.name AS person_name,
        pi.email AS person_email,
        pi.phone AS person_phone,
        pi.nat AS person_nat,
        pi.dob AS person_dob,

        ia.plan,
        ia.price,
        ia.street,
        ia.building,
        ia.appartment,
        r.name AS region_name,
        d.name AS district_name,
        n.name AS neighbourhood_name,

        ai.name AS agent_name,
        ai.url AS agent_url,
        ai.id AS agent_id

      FROM insurances.insurance_order io
      JOIN insurances.personinfo pi ON io.personinfo = pi.id
      JOIN insurances.insurance_application ia ON io.insurance_application = ia.id
      JOIN locations.regions r ON ia.region = r.id
      JOIN locations.districts d ON ia.district = d.id
      JOIN locations.neighbourhoods n ON ia.neighbourhood = n.id
      JOIN agents.insurance_order_agent ioa ON io.id = ioa.order
      JOIN agents.agent_info ai ON ioa.agent = ai.id
      WHERE ioa.agent IN (SELECT id FROM subagents)
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
      },
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error('[FETCH_AGENT_ORDERS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch agent orders.' }, { status: 500 });
  }
}


// export async function GET() {
//   try {
//     const result = await sql.query(`
//       SELECT 
//         io.id,
//         io.track_code,
//         io.status,
//         io.created_at,
//         io.msg,

//         pi.name AS person_name,
//         pi.email AS person_email,
//         pi.phone AS person_phone,
//         pi.nat AS person_nat,
//         pi.dob AS person_dob,

//         ia.plan,
//         ia.price,
//         ia.street,
//         ia.building,
//         ia.appartment,
//         r.name AS region_name,
//         d.name AS district_name,
//         n.name AS neighbourhood_name

//       FROM insurances.insurance_order io
//       JOIN insurances.personinfo pi ON io.personinfo = pi.id
//       JOIN insurances.insurance_application ia ON io.insurance_application = ia.id
//       JOIN locations.regions r ON ia.region = r.id
//       JOIN locations.districts d ON ia.district = d.id
//       JOIN locations.neighbourhoods n ON ia.neighbourhood = n.id

//       ORDER BY io.created_at DESC;
//     `);


//     return NextResponse.json(result.map((row) => ({
//       id: row.id.toString(),
//       trackcode: row.track_code,
//       name: row.person_name,
//       email: row.person_email,
//       status: row.status,
//       created_at: row.created_at?.toISOString() || '',
//       msg: row.msg || '',
//       user: {
//         name: row.person_name,
//         nationality: row.person_nat,
//         dob: row.person_dob?.toISOString().split('T')[0],
//       },
//       contact: {
//         email: row.person_email,
//         phone: row.person_phone,
//       },
//       plan: {
//         name: row.plan,
//         price: `$${row.price}`,
//       },
//       location: {
//         region: row.region_name,
//         district: row.district_name,
//         neighbourhood: row.neighbourhood_name,
//         street: row.street,
//         buildingNo: row.building,
//         apartmentNo: row.appartment,
//       },
//     })));
//   } catch (error) {
//     console.error('[FETCH_ORDERS_SQL_ERROR]', error);
//     throw new Error('Failed to fetch orders from SQL database.');
//   }
// }

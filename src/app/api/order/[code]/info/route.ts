import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
        console.log(params)
        const trackCode = await params.code;
        if (!trackCode) {
            return NextResponse.json({ error: 'Invalid agent code' }, { status: 400 });
        }
        const result = await sql.query(  `
          SELECT 
            io.id AS order_id,
            io.status,
            io.track_code,
            io.insurance_application,
            io.created_at,
            io.finish_date,
            io.receipt,
            io.personinfo AS personinfo_id,
            pi.name AS person_name,
            pi.email,
            pi.phone,
            pi.nat,
            pi.dob,
            pi.passport AS passport_id
          FROM insurances.insurance_order io
          JOIN insurances.personinfo pi ON io.personinfo = pi.id
          WHERE io.track_code = $1
        `,[trackCode]);
          
        return NextResponse.json(result[0]);
  } catch (error) {
    console.error('[FETCH_ORDERS_SQL_ERROR]', error);
    throw new Error('Failed to fetch order from SQL database.');
  }
}

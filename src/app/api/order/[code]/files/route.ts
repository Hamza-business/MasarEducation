import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(req: Request, { params }: any) {
  try {
    const orderId = parseInt(await params.code);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    // Step 1: Get order + personinfo (no file data yet)
    const orderResult = await sql.query(`
      SELECT 
        io.receipt AS receipt_id,
        pi.passport AS passport_id
      FROM insurances.insurance_order io
      JOIN insurances.personinfo pi ON io.personinfo = pi.id
      WHERE io.id = $1
    `, [orderId]);

    if (orderResult.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const { receipt_id, passport_id, status } = orderResult[0];

    // Step 2: Fetch files by ID
    const [receiptResult, passportResult, insuranceFilesResult] = await Promise.all([
      sql.query(`
        SELECT name, mimetype, data
        FROM files.receipts
        WHERE id = $1
      `, [receipt_id]),

      sql.query(`
        SELECT name, mimetype, data
        FROM files.passports
        WHERE id = $1
      `, [passport_id]),

      sql.query(`
        SELECT id, name, mimetype, data, "order"
        FROM files.insurance_files
        WHERE "order" = $1
      `, [orderId]),
    ]);

    if (receiptResult.length === 0 || passportResult.length === 0) {
      return NextResponse.json({ error: 'One or more files not found' }, { status: 404 });
    }


    const receipt = receiptResult[0];
    const passport = passportResult[0];
    const insurance_files = insuranceFilesResult;

    return NextResponse.json({ receipt, passport, insurance_files });
  } catch (error) {
    console.error('[FETCH_ORDER_FILES_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const orderId = parseInt(await params.code);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const body = await req.json();
    const { status, msg } = body;

    if (!status || typeof status !== 'string') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    if (status === 'rejected' && msg) {
      await sql.query(
        `UPDATE insurances.insurance_order 
         SET status = $1, msg = $2 
         WHERE id = $3`,
        [status, msg, orderId]
      );
    } else {
      await sql.query(
        `UPDATE insurances.insurance_order 
         SET status = $1, msg = NULL 
         WHERE id = $2`,
        [status, orderId]
      );
    }

    return NextResponse.json({ message: 'Order status updated successfully.' });
  } catch (error) {
    console.error('[UPDATE_ORDER_STATUS_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

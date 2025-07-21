import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(req: NextRequest, { params }: any) {
  try {
    console.log("1111");
    const orderId = parseInt(await params.code);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString('base64');

    await sql.query(
      `
      INSERT INTO files.insurance_files ("order", name, mimetype, data)
      VALUES ($1, $2, $3, $4)
      `,
      [orderId, file.name, file.type, base64Data]
    );

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        name: file.name,
        mimetype: file.type,
      },
    });
  } catch (error) {
    console.error('[UPLOAD_INSURANCE_FILE_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

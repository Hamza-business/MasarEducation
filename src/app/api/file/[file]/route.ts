// app/api/file/[id]/route.ts

import sql from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: any
) {
  // const id = parseInt(params.id);
  // if (isNaN(id)) {
  //   return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  // }

  try {
    const result = await sql`
      SELECT filename, mime_type, data
      FROM "Insurance"."Insurance_Passport"
      WHERE id = ${4}
      LIMIT 1
    `;

    const file = result[0];
    if (!file) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    const binary = Buffer.from(file.data, 'base64');

    return new NextResponse(binary, {
      headers: {
        'Content-Type': file.mime_type,
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      },
    });
  } catch (err: any) {
    err;
    return NextResponse.json({ message: 'Error fetching file' }, { status: 500 });
  }
}

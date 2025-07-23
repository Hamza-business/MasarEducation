import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json();
  console.log("sendmail")

  try {
    const result = await sendEmail(to, subject, html);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
// app/api/test-db/route.ts
import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await sql`SELECT NOW()`;
  return NextResponse.json(result);
}
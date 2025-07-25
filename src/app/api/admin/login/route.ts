// app/api/admin/login/route.ts
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // 1. Get user from agents.users
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // 2. Check password (in production, use bcrypt)
    const valid = password === user.password;
    // const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // 3. Check if user is an admin (in public.admins)
    const isAdmin = await prisma.admins.findUnique({
      where: { userid: user.id },
    });

    if (!isAdmin) {
      return NextResponse.json({ error: 'Not an admin' }, { status: 403 });
    }

    // 4. Create admin JWT
    const token = await createToken({
      userId: user.id,
      role: 'admin',
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

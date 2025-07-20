// app/api/agent/login/route.ts
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

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // TODO: Enable password check in production
    const valid = password === user.password;
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const agent = await prisma.agent_info.findFirst({
      where: { userid: user.id },
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Await token generation
    const token = await createToken({
      userId: user.id,
      agentUrl: agent.url,
    });

    // Create and modify response
    const response = NextResponse.json({ success: true, agentUrl: agent.url });

    response.cookies.set('agent_token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    // console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

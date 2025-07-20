// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('agent_token')?.value;

//   console.log("--- Middleware Check ---");
//   console.log("Requested Path:", request.nextUrl.pathname);
//   console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL('/agent', request.url));
  }

  try {
    const payload = await verifyToken(token);

    // console.log("✅ Verified Payload:", payload);

    // Check if URL matches agent URL
    const requestedAgentUrl = request.nextUrl.pathname.split('/')[2];
    if (payload.agentUrl !== requestedAgentUrl) {
      return NextResponse.redirect(new URL('/agent', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // console.error("❌ JWT verification error:", error);
    return NextResponse.redirect(new URL('/agent', request.url));
  }
}

export const config = {
  matcher: ['/agent/((?!$).*)'],
};

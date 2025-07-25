// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ---------------------- AGENT PROTECTION ----------------------
  if (path.startsWith('/agent/')) {
    const token = request.cookies.get('agent_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/agent', request.url));
    }

    try {
      const payload = await verifyToken(token);
      const requestedAgentUrl = path.split('/')[2];
      if (payload.agentUrl !== requestedAgentUrl) {
        return NextResponse.redirect(new URL('/agent', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/agent', request.url));
    }
  }

  // ---------------------- ADMIN PROTECTION ----------------------
  if (path.startsWith('/admin/')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await verifyToken(token);
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/agent/((?!$).*)', // anything under /agent/*
    '/admin/((?!$).*)', // anything under /admin/*
  ],
};



// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyToken } from '@/lib/auth';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('agent_token')?.value;

// //   console.log("--- Middleware Check ---");
// //   console.log("Requested Path:", request.nextUrl.pathname);
// //   console.log("Token:", token);

//   if (!token) {
//     return NextResponse.redirect(new URL('/agent', request.url));
//   }

//   try {
//     const payload = await verifyToken(token);

//     // console.log("✅ Verified Payload:", payload);

//     // Check if URL matches agent URL
//     const requestedAgentUrl = request.nextUrl.pathname.split('/')[2];
//     if (payload.agentUrl !== requestedAgentUrl) {
//       return NextResponse.redirect(new URL('/agent', request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     // console.error("❌ JWT verification error:", error);
//     return NextResponse.redirect(new URL('/agent', request.url));
//   }
// }

// export const config = {
//   matcher: ['/agent/((?!$).*)'],
// };

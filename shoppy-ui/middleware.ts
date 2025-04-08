import { NextRequest } from 'next/server';

const unauthorizedRoutes = ['/auth/login', '/auth/signup'];

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('Authentication')?.value;

  if (!auth && !unauthorizedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return Response.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/auth/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/products/:path*',
  ],
};

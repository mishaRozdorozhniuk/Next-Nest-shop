import { NextRequest } from 'next/server';
import authenticated from './app/auth/authenticated';
import { onAuthenticated } from './app/common/constants/routes';

export function middleware(req: NextRequest) {
  if (!authenticated() && !onAuthenticated.some(route => req.nextUrl.pathname.startsWith(route.path))) {
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

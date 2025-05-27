import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'de-ES'];

function getLocale(request) {
  const headers = { 'accept-language': request.headers.get('accept-language') };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = 'en-US';
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files (e.g., Whitepaper.pdf) and Next.js internals (_next)
  if (pathname.startsWith('/_next') || pathname === '/Whitepaper.pdf') {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next).*)', // Apply to all routes except _next
  ],
};

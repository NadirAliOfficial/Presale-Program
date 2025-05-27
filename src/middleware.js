import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'de-ES', 'de']; // Supported locales

// Function to get the preferred locale
function getLocale(request) {
  const headers = { 'accept-language': request.headers.get('accept-language') };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = 'en-US'; // Default to 'en-US' if no matching locale
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // If the pathname is for an asset (image, favicon, etc.), don't add the locale
  const assetExtensions = ['.svg', '.ico', '.jpg', '.jpeg', '.png', '.gif', '.css', '.js'];
  const isAssetRequest = assetExtensions.some(ext => pathname.endsWith(ext));

  if (isAssetRequest) return;

  // Check if the pathname already contains a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname already contains a locale, don't modify it
  if (pathnameHasLocale) return;

  // Get the preferred locale from the request headers
  const locale = getLocale(request);

  // Prepend the locale to the pathname and redirect
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next).*)', // Match all URLs except Next.js internal ones
  ],
};

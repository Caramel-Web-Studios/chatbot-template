import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define your production domain
  const rootDomain = 'caramelwebstudios.com';
  
 const subdomain = hostname
  .replace(`.${rootDomain}`, '')
  .replace('www.', ''); // Strip www if present
  // Skip middleware for main site, localhost, or static assets
  if (
    subdomain === hostname || 
    subdomain === 'www' || 
    subdomain === 'localhost:3000' ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Rewrite internally to the dynamic client slot
  return NextResponse.rewrite(new URL(`/_clients/${subdomain}${url.pathname}`, req.url));
}
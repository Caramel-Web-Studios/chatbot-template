/*import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
const path = url.pathname;
  // Define your production domain
  const rootDomain = 'caramelwebstudios.com';
  
// 1. LOCALHOST DEBUGGING
  // If we are on localhost, we treat the first part of the URL path as the client
  if (hostname.includes('localhost:3000')) {
    // Skip static files and API routes
    if (path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
      return NextResponse.next();
    }

    // Example: localhost:3000/CWS -> rewrites to /_clients/CWS
    const slug = path.split('/')[1];
    if (slug && slug !== '_clients') {
      return NextResponse.rewrite(new URL(`/_clients/${slug}`, req.url));
    }
    return NextResponse.next();
  }



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
} */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define your main domain (exclude local host for testing)
  const rootDomain = 'https://caramelwebstudios.com';
  
  // Extract the subdomain (e.g., "client1" from "client1.cws.com")
  const subdomain = hostname.replace(`.${rootDomain}`, '');

  // 1. If it's the root domain (cws.com), serve the portfolio
  if (hostname === rootDomain || hostname === 'localhost:3000') {
    return NextResponse.rewrite(new URL(`/portfolio${url.pathname}`, req.url));
  }

  // 2. If it's a subdomain (client1.cws.com), serve the chatbot page
  return NextResponse.rewrite(new URL(`/chatbots/${subdomain}${url.pathname}`, req.url));
}

// Ensure the middleware doesn't run on static files or icons
export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
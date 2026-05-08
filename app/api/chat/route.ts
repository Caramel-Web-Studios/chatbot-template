import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, clientSlug } = body;

    // 1. CRITICAL: Log this to see it in your VS Code terminal
    console.log("DEBUG: Received slug:", clientSlug);

    // 2. Prevent Prisma from crashing if slug is missing
    if (!clientSlug) {
      console.error("ERROR: No clientSlug found in request body");
      return NextResponse.json({ error: "clientSlug is required" }, { status: 400 });
    }

    const clientConfig = await prisma.client.findUnique({
      where: { slug: clientSlug }
    });

    if (!clientConfig) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: clientConfig.systemPrompt },
          ...messages
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  // Replace your catch block (around line 40) with this:
} catch (error: unknown) {
  // Use a type guard to satisfy TypeScript
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  
  // This prints the ACTUAL reason for the 500 error in your terminal
  console.error("--- CHAT API CRASH ---");
  console.error(errorMessage);

  return new Response(
    JSON.stringify({ error: errorMessage }), 
    { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
}
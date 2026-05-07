import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const { messages, clientSlug} = await req.json();

   // Fetch config from DB based on the URL slug
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
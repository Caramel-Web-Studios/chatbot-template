import { NextRequest, NextResponse } from "next/server";
import clients from "@/config/clients.json"; // 1. Import the whole JSON object

export async function POST(req: NextRequest) {
  try {
    const { messages, clientHandle } = await req.json();

    // 2. Find the client in your JSON "database"
    // We look for the entry where the 'name' matches the 'clientHandle' sent by the widget
    const clientConfig = Object.values(clients).find(
      (c) => c.name === clientHandle
    );

    // 3. Fallback to a default prompt if the client isn't found
    const systemPrompt = clientConfig?.systemPrompt || "You are a helpful AI assistant.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
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
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
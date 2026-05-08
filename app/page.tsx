// app/page.tsx
import { prisma } from "@/lib/prisma";
import ChatWidget from "@/components/ChatWidget";

export default async function DemoPage() {
  // 1. Fetch your "Flagship" client to act as the demo
  // Make sure you have a client with the slug 'cws' (or your preferred name) in Prisma Studio
  const demoSlug = "arcade"; 
  
  const clientData = await prisma.client.findUnique({
    where: { slug: demoSlug }
  });

  // 2. Fallback if the database is empty or the slug is wrong
  if (!clientData) {
    return (
      <div className="flex h-screen items-center justify-center font-sans">
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-bold">Demo Setup Required</h2>
          <p className="text-gray-500">Add a client with the slug <strong>&quot;{demoSlug}&quot;</strong> in Prisma Studio to see the demo.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Live Demo
        </span>
        <h1 className="text-5xl font-black mt-4" style={{ color: clientData.primaryColor }}>
          {clientData.name}
        </h1>
        <p className="text-slate-600 mt-2 max-w-md">
          This is a preview of the AI automation platform built for {clientData.name}.
        </p>
      </div>

      {/* Satisfies TypeScript by providing both required props */}
      <ChatWidget clientSlug={demoSlug} config={clientData} /> 
    </main>
  );
}
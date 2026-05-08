
import { prisma } from "@/lib/prisma";
import ChatWidget from '@/components/ChatWidget';


export default async function ClientPage({ 
  params 
}: { 
  params: Promise<{ client: string }> // Define params as a Promise
}) {
  // 1. You MUST await params in the new version of Next.js
  const resolvedParams = await params; 
  const slug = resolvedParams.client;

  console.log("Looking for slug:", slug);

  // 2. Fetch client by slug
  const clientData = await prisma.client.findUnique({
    where: { 
      slug: slug // This was 'undefined' before, now it has a value
    }
  });

  if (!clientData) {
    return <div>Client not found: {slug}</div>;
  }
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-black" style={{ color: clientData.primaryColor }}>
          {clientData.name}
        </h1>
      </div>
   {/* Pass the data from the DB to the widget */}
   <ChatWidget clientSlug={slug} config={clientData} /> 
   </main>
  );
}

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ChatWidget from '@/components/ChatWidget';


export default async function ClientPage({ params }: { params: { client: string } }) {
 // Fetch client by slug (the folder name in the URL)
  const clientData = await prisma.client.findUnique({
    where: { slug: params.client }
  });
  
 if (!clientData) {
  // Instead of a generic 404, redirect to your main landing page
  return redirect('https://caramelwebstudios.com');
}
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-black" style={{ color: clientData.primaryColor }}>
          {clientData.name}
        </h1>
      </div>
   {/* Pass the data from the DB to the widget */}
      <ChatWidget config={clientData} clientSlug={params.client} />
    </main>
  );
}
import dynamic from 'next/dynamic';
import clients from "@/config/clients.json";
import { notFound } from "next/navigation";

// This forces the component to ONLY load on the client side
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { 
  ssr: false,
  // Optional: show a small placeholder while loading
  loading: () => <div className="fixed bottom-6 right-6 p-4">...</div> 
});

export default function ClientPage({ params }: { params: { client: string } }) {
  const clientData = clients[params.client as keyof typeof clients];
  if (!clientData) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-black" style={{ color: clientData.primaryColor }}>
          {clientData.name}
        </h1>
      </div>
      <ChatWidget config={clientData} />
    </main>
  );
}
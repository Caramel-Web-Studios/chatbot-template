import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  // Create a default config for the preview page
  const demoConfig = {
    name: "Caramel Web Studios",
    botName: "Caramel Assistant",
    primaryColor: "#EAB308", // Your brand gold
    bookingUrl: "https://caramelwebstudios.com/contact",
    initialMessage: "Welcome to the Caramel AI Template. How can I help you build your next project?"
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          AI Chatbot Template
        </h1>
        <p className="text-slate-600 text-lg">
          This is the master preview page. Use subdomains to see specific client branding.
        </p>
        
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-200 inline-block text-sm text-slate-500">
          Try visiting: <code className="bg-slate-100 px-2 py-1 rounded">flexipay.localhost:3000</code>
        </div>
      </div>
      
      {/* Pass the demoConfig here to satisfy TypeScript */}
      <ChatWidget config={demoConfig} />
    </main>
  );
}
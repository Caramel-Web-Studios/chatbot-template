"use client";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { MessageCircle, X, Send, Calendar, Loader2 } from "lucide-react";

interface ChatWidgetProps {
  config: {
    name: string;
    botName: string;
    primaryColor: string;
    bookingUrl: string | null;     
    initialMessage?: string | null;
  };
  clientSlug: string;
}

export default function ChatWidget({ config, clientSlug }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: config.initialMessage || `Hi! I'm your ${config.name} assistant.` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
         clientSlug: clientSlug
        }),
      });
      const data = await res.json();
    if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error();
      }
     } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Service temporarily unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-white w-87.5 h-125 rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div style={{ backgroundColor: config.primaryColor }} className="p-5 text-white flex justify-between items-center">
            <div>
              <p className="font-bold text-lg leading-tight">{config.name}</p>
              <p className="text-[10px] opacity-80 uppercase tracking-widest">{config.botName}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 whitespace-pre-wrap">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.role === "user" ? "bg-slate-800 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                }`}>
                  {m.content.includes("[BOOK_SESSION]") ? (
                    <div className="flex flex-col gap-3">
                      <p>{m.content.replace("[BOOK_SESSION]", "")}</p>
                      <button 
onClick={() => config.bookingUrl && window.open(config.bookingUrl, "_blank")}
                        style={{ backgroundColor: config.primaryColor }} 
                        className="text-white py-2 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
                      >
                        <Calendar size={14} /> Book Now
                      </button>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin text-slate-300 ml-2" size={20} />}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask anything..." 
              className="flex-1 p-3 bg-slate-100 rounded-2xl outline-none text-sm focus:ring-2 transition-all" 
              style={{ "--tw-ring-color": config.primaryColor } as CSSProperties}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading} 
              style={{ backgroundColor: config.primaryColor }} 
              className="text-white p-3 rounded-2xl disabled:opacity-50 transition-all shadow-md"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ backgroundColor: config.primaryColor }} 
        className="text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
}
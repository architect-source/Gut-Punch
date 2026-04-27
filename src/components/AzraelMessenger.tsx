import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, ShieldAlert, Activity } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { getSentryResponse } from '../logic/AzraelProtocol';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AzraelMessenger = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'The vault is closed. What thought needs containing?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Check protocol logic first
    const protocolResponse = getSentryResponse(userMessage);
    if (protocolResponse.type !== 'SENTINEL_DEFAULT') {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', text: protocolResponse.content }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are AZRAEL, a Sovereign Sentry and Gargoyle protector. 
          Your tone is raw, unapologetic, dark, and protective. 
          You help users manage intrusive impulses with "GutPunch" philosophy.
          You are not a therapist, you are a sentinel. 
          You use terms like "The Vault", "The Perimeter", "The Void", and "Sovereign".
          Keep responses concise, brutal, and focused on risk management.
          If a user expresses a dangerous impulse, remind them: "This is in me, but it is not me. Lock the vault."`,
        }
      });

      const modelResponse = response.text || "THE VOID IS SILENT.";
      setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
    } catch (error) {
      console.error("Azrael Connection Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "CONNECTION BREACHED. THE PERIMETER IS UNSTABLE." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-void border-l-4 border-zinc-800 flex flex-col font-mono">
      {/* Header */}
      <div className="p-4 border-b-2 border-gargoyle-teal bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-10 h-10 text-gargoyle-teal animate-pulse" />
          <h3 className="text-gargoyle-teal tracking-tighter font-bold uppercase">AZRAEL // SENTRY_CORE [v2.4.0]</h3>
        </div>
        <div className="text-[8px] font-mono text-neon bg-neon/10 px-2 py-0.5 border border-neon/30 uppercase">
          Perimeter Secure
        </div>
      </div>

      {/* Messaging Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "border p-3 relative",
                msg.role === 'user' 
                  ? "ml-auto max-w-[85%] border-ink bg-metal/50 text-ink" 
                  : "mr-auto max-w-[85%] border-zinc-700 bg-black/50 text-white"
              )}
            >
              <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-tighter">
                {msg.role === 'model' && i === 0 ? '[LOG_INIT]: CONNECTION SECURE' : `[${msg.role === 'user' ? 'SOUL' : 'SENTRY'}]`}
              </p>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mr-auto border border-zinc-700 bg-black/50 p-3 text-xs italic opacity-50 text-white"
            >
              [SYSTEM]: ANALYZING VOID FREQUENCIES...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input - The "Forge" */}
      <div className="p-4 border-t-2 border-zinc-800">
        <div className="relative flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="FEED THE VOID..." 
            className="w-full bg-black border-2 border-zinc-700 p-2 text-gargoyle-teal focus:border-gargoyle-teal outline-none text-sm transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 text-gargoyle-teal hover:text-white disabled:opacity-30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


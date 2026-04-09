import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const azraelResponse = (input: string) => {
  const lowerInput = input.toLowerCase();
  // Logic to detect "Vampire Clusters" (Self-sabotage keywords)
  if (
    lowerInput.includes("i am a failure") || 
    lowerInput.includes("it won't work") || 
    lowerInput.includes("i can't do this") ||
    lowerInput.includes("worthless")
  ) {
    return {
      status: "STRIKE",
      text: "ERROR: LOGIC BREACH. You are identifying as the data. Hardware check: You are the Sentry, not the signal. Re-contextualize now."
    };
  }
  
  return {
    status: "INFO",
    text: "Sovereign state maintained. Proceed with the Pride Directive."
  };
};

export const AzraelChat = () => {
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<{ status: string; text: string; timestamp: string }[]>([]);

  const handleTruthExchange = () => {
    if (!message.trim()) return;
    
    const response = azraelResponse(message);
    const newLog = {
      status: response.status,
      text: response.text,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setLogs(prev => [newLog, ...prev]);
    setMessage("");
  };

  return (
    <div className="border-t-4 border-gargoyle-teal bg-black p-4 brutal-card">
      <div className="flex items-center gap-2 mb-4 text-gargoyle-teal">
        <ShieldAlert className="w-4 h-4" />
        <p className="text-[10px] text-zinc-500 font-mono">TRUTH_GIVER // AZRAEL_v1.0</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Terminal className="absolute left-3 top-3 w-4 h-4 text-gargoyle-teal opacity-50" />
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTruthExchange()}
            placeholder="INPUT DATA FOR TRUTH EXCHANGE..." 
            className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 pl-10 text-gargoyle-teal focus:border-gargoyle-teal outline-none font-mono text-sm"
          />
        </div>

        <div className="h-40 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-2 border-l-2 font-mono text-xs",
                  log.status === 'STRIKE' ? "border-blood-red bg-blood-red/5 text-blood-red" : "border-gargoyle-teal bg-gargoyle-teal/5 text-gargoyle-teal"
                )}
              >
                <div className="flex justify-between opacity-50 mb-1">
                  <span>[{log.status}]</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className={cn(log.status === 'STRIKE' ? "font-bold" : "")}>{log.text}</p>
                {log.status === 'STRIKE' && (
                  <div className="mt-2 flex items-center gap-1 animate-pulse">
                    <Zap className="w-3 h-3" />
                    <span className="text-[8px] uppercase">Titan Strike Recommended</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <p className="text-[10px] text-zinc-600 italic font-mono">Waiting for data input...</p>
          )}
        </div>
      </div>
    </div>
  );
};

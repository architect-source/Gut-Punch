import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldAlert, Activity, Plus, Trash2 } from 'lucide-react';
import { genAI } from '../lib/gemini';

interface Trigger {
  id: string;
  text: string;
  resolution?: string;
  isAnalyzing: boolean;
}

export const TriggerLab = () => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [input, setInput] = useState('');
  
  const addTrigger = () => {
    if (!input.trim()) return;
    const newTrigger: Trigger = {
      id: Math.random().toString(36).substr(2, 9),
      text: input.trim(),
      isAnalyzing: false
    };
    setTriggers(prev => [newTrigger, ...prev]);
    setInput('');
  };

  const analyzeTrigger = async (id: string) => {
    const trigger = triggers.find(t => t.id === id);
    if (!trigger || trigger.isAnalyzing) return;

    setTriggers(prev => prev.map(t => t.id === id ? { ...t, isAnalyzing: true } : t));

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: `Analyze this trigger and provide a Sovereign Resolution Protocol: "${trigger.text}"` }] }],
        config: {
          systemInstruction: `You are AZRAEL, a Sovereign Sentry. 
            Provide a "Sovereign Resolution Protocol" for the given trigger.
            The protocol should be brutal, protective, and focused on GutPunch philosophy.
            Use terms like "The Lock", "The Pride Directive", "Cold Iron", and "The Shield".
            Keep it concise. Max 3 steps.`,
        }
      });

      const resolution = response.text || "THE VOID IS SILENT. HOLD THE LINE.";
      setTriggers(prev => prev.map(t => t.id === id ? { ...t, resolution, isAnalyzing: false } : t));
    } catch (error) {
      console.error("Trigger Analysis Error:", error);
      setTriggers(prev => prev.map(t => t.id === id ? { ...t, resolution: "CONNECTION BREACHED. RELY ON COLD IRON.", isAnalyzing: false } : t));
    }
  };

  const removeTrigger = (id: string) => {
    setTriggers(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="bg-void border-2 border-zinc-800 p-6 font-mono brutal-card">
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
        <ShieldAlert className="text-blood-red w-6 h-6" />
        <h2 className="text-white font-bold uppercase tracking-widest">Trigger Lab // Breach Identification</h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTrigger()}
            placeholder="IDENTIFY TRIGGER NODE..." 
            className="flex-1 bg-black border-2 border-zinc-700 p-2 text-white focus:border-blood-red outline-none text-sm"
          />
          <button 
            onClick={addTrigger}
            className="bg-zinc-800 p-2 text-white hover:bg-blood-red transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {triggers.map((trigger) => (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border border-zinc-700 bg-zinc-950 p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-blood-red animate-pulse" />
                    <span className="text-xs text-zinc-400 uppercase">Trigger Detected</span>
                  </div>
                  <button onClick={() => removeTrigger(trigger.id)} className="text-zinc-600 hover:text-blood-red">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-white font-bold">"{trigger.text}"</p>

                {trigger.resolution ? (
                  <div className="bg-blood-red/5 border-l-2 border-blood-red p-3 space-y-2">
                    <p className="text-[10px] text-blood-red uppercase font-bold tracking-widest">Azrael Resolution Protocol</p>
                    <p className="text-xs text-zinc-300 italic leading-relaxed">{trigger.resolution}</p>
                  </div>
                ) : (
                  <button 
                    onClick={() => analyzeTrigger(trigger.id)}
                    disabled={trigger.isAnalyzing}
                    className="w-full bg-zinc-900 border border-zinc-700 py-2 text-[10px] text-zinc-400 hover:text-white hover:border-white transition-all uppercase tracking-widest"
                  >
                    {trigger.isAnalyzing ? "Analyzing Breach..." : "Analyze for Resolution"}
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {triggers.length === 0 && (
            <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest py-8">No triggers identified. The perimeter is clear.</p>
          )}
        </div>
      </div>
    </div>
  );
};

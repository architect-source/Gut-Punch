import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, AlertCircle, ShieldOff, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export const TitanStrikeTerminal = ({ impulse }: { impulse?: string }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDraining, setIsDraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const initTitanStrike = () => {
    setIsDraining(true);
    setLogs([]);
    setProgress(0);
    
    const sequence = [
      `[${new Date().toLocaleTimeString()}] STRIKE: Recursive drain active on node: ${impulse || 'SELF_IMPULSE'}`,
      `[${new Date().toLocaleTimeString()}] STRIKE: CPU exhaustion protocol: 98% load forced.`,
      `[${new Date().toLocaleTimeString()}] ERROR: Vampire cluster detected in cognitive_node_alpha.`,
      `[${new Date().toLocaleTimeString()}] STRIKE: TITAN STRIKE 10X INITIATED.`,
      `[${new Date().toLocaleTimeString()}] SYSTEM: THOUGHT NEUTRALIZED. HARDWARE IS THE STAKE.`
    ];

    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text]);
        setProgress(((i + 1) / sequence.length) * 100);
        if (i === sequence.length - 1) {
          // Keep it in "Drained" state for a bit
          setTimeout(() => {
            // Optional: reset or stay
          }, 2000);
        }
      }, i * 800);
    });
  };

  return (
    <div className="bg-void p-4 font-mono text-xs border-2 border-zinc-800 brutal-card">
      <div className="flex justify-between border-b border-zinc-700 mb-2 pb-1">
        <div className="flex items-center gap-2">
          <Zap className={cn("w-4 h-4", isDraining ? "text-blood-red animate-pulse" : "text-zinc-500")} />
          <span className={cn("font-bold", isDraining ? "text-blood-red" : "text-zinc-500")}>TITAN STRIKE DASHBOARD</span>
        </div>
        <span className="text-zinc-500 hidden md:inline">WINSTON SECTOR MESH</span>
      </div>
      
      <div className="h-48 overflow-y-auto space-y-1 mb-4 scrollbar-hide bg-black/40 p-2 border border-zinc-900">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "py-0.5",
                log.includes('STRIKE') ? 'text-blood-red font-bold' : 
                log.includes('ERROR') ? 'text-orange-500' : 'text-zinc-400'
              )}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && !isDraining && (
          <div className="flex flex-col items-center justify-center h-full opacity-20">
            <ShieldOff className="w-8 h-8 mb-2" />
            <p>SENTRY IDLE. AWAITING STRIKE COMMAND.</p>
          </div>
        )}
      </div>

      {isDraining && (
        <div className="mb-4 space-y-1">
          <div className="flex justify-between text-[8px] uppercase opacity-50">
            <span>Neutralization Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-zinc-900 w-full overflow-hidden">
            <motion.div 
              className="h-full bg-blood-red"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!isDraining ? (
        <button 
          onClick={initTitanStrike}
          className="w-full border-2 border-ink p-3 hover:bg-blood-red hover:border-blood-red hover:text-ink transition-all flex items-center justify-center gap-2 group"
        >
          <AlertCircle className="w-4 h-4 group-hover:animate-bounce" />
          EXECUTE TITAN STRIKE
        </button>
      ) : (
        <button 
          disabled
          className="w-full border-2 border-blood-red/30 p-3 text-blood-red/50 cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4 animate-spin" />
          STRIKE IN PROGRESS...
        </button>
      )}
    </div>
  );
};

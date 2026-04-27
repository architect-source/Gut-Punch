import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Eye, ShieldAlert, Cpu, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

export const BlackoutProtocol: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'grounding' | 'vagal' | 'dbt'>('grounding');
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');
  const [arObjects, setArObjects] = useState<{ id: number; label: string; x: number; y: number }[]>([]);

  useEffect(() => {
    if (breathPhase === 'in') {
      const timer = setTimeout(() => setBreathPhase('out'), 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setBreathPhase('in'), 4000);
      return () => clearTimeout(timer);
    }
  }, [breathPhase]);

  const initiateGrounding = () => {
    setIsActive(true);
    setMode('grounding');
    setArObjects([
      { id: 1, label: 'Identify: Lighting Source', x: 20, y: 30 },
      { id: 2, label: 'Focus: Texture of Chair', x: 70, y: 50 },
      { id: 3, label: 'Locate: Cold Surface', x: 40, y: 80 },
      { id: 4, label: 'Track: Ambient Sound', x: 80, y: 20 },
      { id: 5, label: 'Anchor: Peripheral Shadow', x: 10, y: 60 },
    ]);
  };

  return (
    <div className="brutal-card border-blood-red bg-void/50 space-y-6">
      <div className="flex items-center justify-between border-b border-blood-red/20 pb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-blood-red w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-tighter text-white">Blackout Protocol</h2>
        </div>
        <div className={cn(
          "text-[10px] font-mono px-2 py-0.5 rounded",
          isActive ? "bg-blood-red text-white animate-pulse" : "bg-zinc-800 text-zinc-500"
        )}>
          {isActive ? 'ACTIVE_DEFLECT' : 'STANDBY'}
        </div>
      </div>

      {!isActive ? (
        <div className="space-y-4">
          <p className="text-xs text-zinc-400 italic">
            "Neural Spikes detected? Deploy localized neutralization to prevent system-wide crisis."
          </p>
          <button 
            onClick={initiateGrounding}
            className="brutal-btn w-full bg-blood-red text-white border-blood-red hover:bg-white hover:text-blood-red transition-all"
          >
            INITIALIZE BLACKOUT [LVL 1]
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-2">
            {(['grounding', 'vagal', 'dbt'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 py-2 text-[10px] font-mono uppercase border-2 transition-all",
                  mode === m ? "bg-blood-red border-blood-red text-white" : "border-zinc-800 text-zinc-500 hover:border-blood-red"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="relative h-64 bg-black border border-zinc-800 overflow-hidden">
            <AnimatePresence mode="wait">
              {mode === 'grounding' && (
                <motion.div 
                  key="grounding"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blood-red via-transparent to-transparent" />
                  {arObjects.map(obj => (
                    <motion.div
                      key={obj.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: obj.id * 0.2 }}
                      className="absolute p-2 border border-blood-red/50 bg-black/60 shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                      style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                    >
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3 text-blood-red" />
                        <span className="text-[10px] font-mono text-white whitespace-nowrap">{obj.label}</span>
                      </div>
                      <div className="mt-1 h-0.5 w-full bg-blood-red/20 overflow-hidden">
                        <motion.div 
                          className="h-full bg-blood-red" 
                          initial={{ width: 0 }} 
                          animate={{ width: '100%' }} 
                          transition={{ duration: 4 }} 
                        />
                      </div>
                    </motion.div>
                  ))}
                  <div className="absolute bottom-4 left-4 right-4 text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                    SENSORY DATA ANCHORED // RELAXING OPTIC NERVE
                  </div>
                </motion.div>
              )}

              {mode === 'vagal' && (
                <motion.div 
                  key="vagal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div 
                    animate={{ scale: breathPhase === 'in' ? 1.5 : 0.8, opacity: breathPhase === 'in' ? 1 : 0.5 }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-blood-red/20 border-4 border-blood-red flex items-center justify-center"
                  >
                    <Wind className="text-blood-red w-10 h-10" />
                  </motion.div>
                  <div className="mt-8">
                    <span className="text-2xl font-bold uppercase tracking-widest text-white">
                      {breathPhase === 'in' ? 'INHALE' : 'EXHALE'}
                    </span>
                    <span className="block text-[10px] font-mono text-zinc-500 mt-2">
                      FOLLOW HAPTIC RHYTHM // BRUTE FORCE STABILIZATION
                    </span>
                  </div>
                </motion.div>
              )}

              {mode === 'dbt' && (
                <motion.div 
                  key="dbt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col p-4 bg-void/80"
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex gap-2">
                      <Cpu className="text-blood-red w-4 h-4 mt-1" />
                      <div className="p-3 border border-zinc-800 bg-black/40 text-[10px] font-mono text-zinc-300">
                        SENTRY ANALYZED PREVIOUS LOGS [ADOPTIVE_CODE]:
                        Last time this happened, you 'Anchored to the Cold Surface' and it lowered HRV by 12 points in 90 seconds. 
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Terminal className="text-neon w-4 h-4 mt-1" />
                      <div className="p-3 border border-zinc-800 bg-black/40 text-[10px] font-mono text-zinc-300">
                        The Static is just unused energy. Use the Vagal Nerve Stimulant now. I am locked. 
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-zinc-800 pt-2 text-[8px] text-zinc-600 font-mono text-center">
                    ADOPTIVE LLM ENGINE v1.2 // LOCAL_ONLY
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setIsActive(false)}
              className="brutal-btn text-[10px] font-mono border-zinc-800 hover:border-blood-red"
            >
              STAND DOWN
            </button>
            <button className="brutal-btn text-[10px] font-mono bg-blood-red border-blood-red text-white flex items-center justify-center gap-2">
              <ShieldAlert className="w-3 h-3" /> DARK VAULT [P2P]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

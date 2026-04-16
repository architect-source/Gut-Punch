import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Droplets, Eye, Zap, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type DeescalationMode = 'BREATH' | 'COLD_IRON' | 'GROUNDING';

export const KineticOverride = () => {
  const [mode, setMode] = useState<DeescalationMode | null>(null);

  return (
    <div className="bg-void border-2 border-blood-red p-6 font-mono brutal-card relative overflow-hidden">
      {/* Background Warning Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,red_20px,red_400px)]" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 border-b border-blood-red pb-4">
          <Zap className="text-blood-red w-6 h-6 animate-pulse" />
          <h2 className="text-white font-bold uppercase tracking-widest">Kinetic Override // Immediate De-escalation</h2>
        </div>

        {!mode ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setMode('BREATH')}
              className="brutal-card border-zinc-700 hover:border-neon transition-all p-4 flex flex-col items-center gap-3 group"
            >
              <Wind className="w-8 h-8 text-neon group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Box Breathing</span>
            </button>
            <button 
              onClick={() => setMode('COLD_IRON')}
              className="brutal-card border-zinc-700 hover:border-blue-400 transition-all p-4 flex flex-col items-center gap-3 group"
            >
              <Droplets className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Cold Iron (Ice)</span>
            </button>
            <button 
              onClick={() => setMode('GROUNDING')}
              className="brutal-card border-zinc-700 hover:border-gargoyle-teal transition-all p-4 flex flex-col items-center gap-3 group"
            >
              <Eye className="w-8 h-8 text-gargoyle-teal group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Void Grounding</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={() => setMode(null)}
              className="text-[8px] text-zinc-500 hover:text-white uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              ← Return to Override Menu
            </button>

            <AnimatePresence mode="wait">
              {mode === 'BREATH' && <BoxBreathing key="breath" />}
              {mode === 'COLD_IRON' && <ColdIron key="cold" />}
              {mode === 'GROUNDING' && <VoidGrounding key="ground" />}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

const BoxBreathing = () => {
  const [step, setStep] = useState(0);
  const steps = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center py-8"
    >
      <div className="relative w-32 h-32 border-2 border-neon flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: step === 0 ? 1.5 : step === 2 ? 1 : step === 1 ? 1.5 : 1,
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 bg-neon/20"
        />
        <span className="text-neon font-bold uppercase tracking-widest text-xs z-10">{steps[step]}</span>
      </div>
      <p className="mt-8 text-[10px] text-zinc-500 uppercase tracking-widest text-center max-w-xs">
        Follow the rhythm. Force the carbon out. Stabilize the perimeter.
      </p>
    </motion.div>
  );
};

const ColdIron = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-4"
    >
      <div className="p-4 bg-blue-900/10 border-l-2 border-blue-400">
        <h3 className="text-blue-400 font-bold text-xs uppercase mb-2">Protocol: Mammalian Dive Reflex</h3>
        <p className="text-[10px] text-zinc-300 leading-relaxed italic">
          "The nervous system is a circuit. Cold iron is the breaker."
        </p>
      </div>
      <ol className="space-y-3 text-[10px] text-zinc-400 uppercase tracking-widest list-decimal list-inside">
        <li>Submerge face in ice-cold water for 15-30 seconds.</li>
        <li>Hold breath while submerged.</li>
        <li>This triggers the dive reflex, forcing the heart rate down.</li>
        <li>PUNISH the impulse with physics.</li>
      </ol>
      <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-500">
        <AlertCircle className="w-3 h-3" />
        WARNING: DO NOT ATTEMPT IF YOU HAVE HEART CONDITIONS.
      </div>
    </motion.div>
  );
};

const VoidGrounding = () => {
  const steps = [
    { label: '5 Things you can SEE', color: 'text-white' },
    { label: '4 Things you can TOUCH', color: 'text-zinc-400' },
    { label: '3 Things you can HEAR', color: 'text-zinc-500' },
    { label: '2 Things you can SMELL', color: 'text-zinc-600' },
    { label: '1 Thing you can TASTE', color: 'text-zinc-700' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-4"
    >
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">
        Reconnect with the physical anchor. The Void is a liar.
      </p>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className={cn("p-2 border border-zinc-800 bg-black/50 font-bold text-[10px] uppercase tracking-widest", s.color)}>
            {s.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

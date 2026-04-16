import { motion } from 'motion/react';
import { Shield, Lock, Zap, Activity, AlertTriangle, X } from 'lucide-react';

export const RiskManagementProtocol = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-void/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-zinc-950 border-4 border-zinc-800 w-full max-w-4xl p-8 relative font-mono"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-8">
          <div className="border-b-2 border-zinc-800 pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-1">Internal Risk Management Protocol</h2>
              <p className="text-sentry text-[10px] font-bold uppercase tracking-widest opacity-70">Fear Mastery and Emotional Sovereignty (FMES)</p>
            </div>
            <div className="text-[8px] text-zinc-600 font-mono text-right">
              CONFIDENTIAL // CLINICAL USE ONLY<br />
              v2.4.0_STABLE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sentry" /> Protocol Purpose
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This protocol guides therapists supporting clients with complex trauma and intrusive impulses. It reframes these experiences as misdirected survival energy (Primal Protective Energy). The goal is resolution leading to <span className="text-white font-bold">Unconditional Self-Pride</span> — a stable, internal sense of inherent worth that ends chronic dependency on external validation.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blood-red" /> Clinical Guardrails
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-zinc-800 bg-zinc-900/30">
                    <p className="text-[10px] text-zinc-300 font-bold mb-1 uppercase">Adjunctive Use</p>
                    <p className="text-[9px] text-zinc-500">FMES is supplementary. Do not replace EMDR, CPT, or DBT without clinical justification.</p>
                  </div>
                  <div className="p-3 border border-blood-red/30 bg-blood-red/5">
                    <p className="text-[10px] text-blood-red font-bold mb-1 uppercase">Medical Oversight</p>
                    <p className="text-[9px] text-zinc-400">Therapists do not manage medications. All "Sovereign Chemical Command" changes require physician approval.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Stability Markers</h3>
              <div className="space-y-2">
                <StabilityItem label="No Active Suicidality" />
                <StabilityItem label="No Acute Dissociation" />
                <StabilityItem label="Informed Consent Obtained" />
                <StabilityItem label="Physician Collaboration Active" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PhaseCard 
              number="I" 
              title="The Lock" 
              goal="Separate identity from impulse."
              marker="Impulse observed without flooding."
            />
            <PhaseCard 
              number="II" 
              title="The Key" 
              goal="Redirect energy into self-worth."
              marker="Impulse experienced as neutral."
            />
            <PhaseCard 
              number="III" 
              title="The Shield" 
              goal="Establish external boundaries."
              marker="Autonomous internal pride."
            />
          </div>

          <section className="bg-zinc-900/50 p-6 border border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase mb-4">Expected Clinical Outcomes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-2"><Activity className="w-3 h-3 text-neon" /> Reduced frequency of impulses</div>
              <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-neon" /> Stable Unconditional Self-Pride</div>
              <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-neon" /> Decreased reliance on medication</div>
              <div className="flex items-center gap-2"><Lock className="w-3 h-3 text-neon" /> Stronger personal boundaries</div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StabilityItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 p-2 border border-zinc-900 bg-black/40">
    <div className="w-1.5 h-1.5 bg-neon rounded-full" />
    <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-widest">{label}</span>
  </div>
);

const PhaseCard = ({ number, title, goal, marker }: { number: string, title: string, goal: string, marker: string }) => (
  <div className="brutal-card border-zinc-800 p-4 space-y-3 bg-black">
    <div className="text-sentry font-bold text-xl">Phase {number}</div>
    <div className="text-white font-bold uppercase text-xs tracking-tighter">{title}</div>
    <div className="text-[10px] text-zinc-500 leading-relaxed">
      <span className="text-zinc-300 font-bold block mb-1 uppercase">Goal:</span> {goal}
    </div>
    <div className="text-[10px] text-zinc-500 leading-relaxed">
      <span className="text-zinc-300 font-bold block mb-1 uppercase">Marker:</span> {marker}
    </div>
  </div>
);

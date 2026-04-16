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
          <div className="border-b-2 border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">Internal Risk Management Protocol</h2>
            <p className="text-sentry text-xs font-bold">Fear Mastery and Emotional Sovereignty (FMES)</p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase border-l-4 border-sentry pl-3">Purpose</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              This protocol guides therapists supporting clients with complex trauma (including C-PTSD) and intrusive impulses. It reframes these experiences not as lifelong pathologies to suppress, but as misdirected survival energy (Primal Protective Energy) that can be observed, contained, redirected, and protected. The goal is resolution leading to Unconditional Self-Pride — a stable, internal sense of inherent worth that ends chronic dependency on external validation or perpetual therapeutic management.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase border-l-4 border-blood-red pl-3">Important Clinical Notes</h3>
            <ul className="space-y-2 text-xs text-zinc-400 list-disc list-inside">
              <li>FMES is an adjunctive framework only and is not a replacement for evidence-based treatments such as EMDR, CPT, or DBT.</li>
              <li><span className="text-blood-red font-bold">Medication Management:</span> Any changes (“Sovereign Chemical Command”) must occur under direct medical supervision. Therapists do not initiate, adjust, or taper medications.</li>
              <li>Use only with stable clients who demonstrate capacity for insight-oriented work. Screen carefully for active dissociation, suicidality, or acute decompensation.</li>
              <li>Always obtain and document informed consent. Maintain detailed progress notes and collaborate with prescribing physicians.</li>
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhaseCard 
              number="I" 
              title="The Lock" 
              goal="Separate core identity from the intrusive impulse."
              marker="Client can notice the impulse without emotional flooding."
            />
            <PhaseCard 
              number="II" 
              title="The Key" 
              goal="Redirect contained energy into stable self-worth."
              marker="The impulse loses emotional charge and is experienced as neutral."
            />
            <PhaseCard 
              number="III" 
              title="The Shield" 
              goal="Translate internal mastery into external boundaries."
              marker="Client independently maintains internal pride and external boundaries."
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

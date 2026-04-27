import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, TrendingDown, Eye, Mic, Brain, ClipboardCheck, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';
import type { ClientData, SessionBattlePlan } from '../types';
import { SystemAuditLog } from './SystemAuditLog';

interface ForensicOverseerProps {
  data: ClientData;
}

export const ForensicOverseer: React.FC<ForensicOverseerProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [sentiments, setSentiments] = useState({ masking: 12, congruency: 88, distress: 42 });

  const runSentimentAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setSentiments({
        masking: Math.floor(Math.random() * 30),
        congruency: 70 + Math.floor(Math.random() * 30),
        distress: 30 + Math.floor(Math.random() * 40),
      });
    }, 2000);
  };

  const plan = data.currentBattlePlan;

  return (
    <div className="space-y-8">
      {/* Dynamic Session Logic */}
      <div className="brutal-card border-sentry bg-sentry/5 space-y-6">
        <div className="flex items-center justify-between border-b border-sentry/20 pb-4">
          <div className="flex items-center gap-2">
            <Target className="text-sentry w-5 h-5" />
            <h2 className="text-xl font-bold uppercase tracking-tighter text-white">Dynamic Session Logic [DSL]</h2>
          </div>
          <div className="text-[10px] font-mono text-sentry bg-sentry/10 px-2 py-0.5 rounded">
            GEN: 168HR_TELEMETRY
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn("p-4 border-2 transition-all", plan?.isComplete ? "border-zinc-800 opacity-50" : "border-sentry bg-sentry/10")}>
            <span className="text-[10px] font-mono text-sentry uppercase block mb-2">Phase 1: Biometric Review</span>
            <p className="text-sm font-bold text-white">{plan?.phase1}</p>
          </div>
          <div className={cn("p-4 border-2 transition-all", plan?.isComplete ? "border-zinc-800 opacity-50" : "border-sentry bg-sentry/10")}>
            <span className="text-[10px] font-mono text-sentry uppercase block mb-2">Phase 2: Spike Analysis</span>
            <p className="text-sm font-bold text-white">{plan?.phase2}</p>
          </div>
          <div className={cn("p-4 border-2 transition-all", plan?.isComplete ? "border-zinc-800 opacity-50" : "border-sentry bg-sentry/10")}>
            <span className="text-[10px] font-mono text-sentry uppercase block mb-2">Phase 3: Restructuring</span>
            <p className="text-sm font-bold text-white">{plan?.phase3}</p>
          </div>
          <div className={cn("p-4 border-2 transition-all", plan?.isComplete ? "border-zinc-800 opacity-50" : "border-sentry bg-sentry/10")}>
            <span className="text-[10px] font-mono text-sentry uppercase block mb-2">Phase 4: Hardening</span>
            <p className="text-sm font-bold text-white">{plan?.phase4}</p>
          </div>
        </div>

        <button className="brutal-btn w-full bg-sentry text-ink border-sentry font-bold">
          EXECUTE BATTLE PLAN
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-time Sentiment Mapping */}
        <div className="brutal-card border-ink/40 space-y-6 bg-black/40">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Eye className="text-zinc-400 w-5 h-5" />
              <h3 className="text-lg font-bold uppercase tracking-tighter">Sentiment Sentry</h3>
            </div>
            {isAnalyzing && <Activity className="w-4 h-4 text-sentry animate-spin" />}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 border border-zinc-800 bg-void/50">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Masking</span>
              <span className={cn("text-xl font-bold", sentiments.masking > 20 ? "text-blood-red" : "text-sentry")}>
                {sentiments.masking}%
              </span>
            </div>
            <div className="text-center p-3 border border-zinc-800 bg-void/50">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Congruency</span>
              <span className="text-xl font-bold text-neon">{sentiments.congruency}%</span>
            </div>
            <div className="text-center p-3 border border-zinc-800 bg-void/50">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Distress</span>
              <span className="text-xl font-bold text-blood-red">{sentiments.distress}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-zinc-500 uppercase">Micro-expression Trace:</span>
              <span className="text-white">Active</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-zinc-500 uppercase">Vocal Tonality:</span>
              <span className="text-white">Harmonized</span>
            </div>
          </div>

          <button 
            onClick={runSentimentAnalysis}
            className="brutal-btn w-full text-[10px] font-mono uppercase bg-zinc-900 border-zinc-800 hover:border-sentry"
          >
            REFRESH LIVE SCAN
          </button>
        </div>

        {/* Blueprint Generator */}
        <div className="brutal-card border-ink/40 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="text-zinc-400 w-5 h-5" />
              <h3 className="text-lg font-bold uppercase tracking-tighter">AI Blueprint Generator</h3>
            </div>
          </div>

          <div className="p-4 border border-zinc-800 bg-void/30 space-y-4">
            <div className="flex gap-3">
              <div className="w-1 h-12 bg-sentry" />
              <div className="text-[10px] font-mono text-zinc-400 leading-relaxed italic">
                "[SYSTEM]: Based on HRV spikes at 02:40 and consistent masking scores {'>'} 15%, 
                current session is mapping to DSM-5 F43.10 (PTSD) Criteria C (Avoidance). 
                Drafting ICD-10 clinical notes..."
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-2 border border-zinc-900 text-[8px] text-zinc-500">
                DSM-5: F41.1 (GAD) - 88% Match
              </div>
              <div className="p-2 border border-zinc-900 text-[8px] text-zinc-500">
                ICD-10: F32.1 (MDD) - 12% Match
              </div>
            </div>
          </div>

          <button className="brutal-btn w-full bg-void text-xs font-mono border-zinc-800 hover:border-sentry">
            MAP SESSION TO DSM-5 COMPLIANCE
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={() => setShowLogs(!showLogs)}
          className={cn(
            "brutal-btn flex items-center gap-2 px-8 py-3 transition-all",
            showLogs ? "bg-blood-red text-white border-blood-red" : "border-zinc-800 text-zinc-500 hover:border-blood-red"
          )}
        >
          <Terminal className="w-4 h-4" />
          {showLogs ? 'CONCEAL FORENSIC LOGS' : 'ACCESS SYSTEM AUDIT TRACE'}
        </button>
      </div>

      {showLogs && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutal-card border-blood-red bg-void"
        >
          <SystemAuditLog />
        </motion.div>
      )}
    </div>
  );
};

const Activity: React.FC<{ className?: string }> = ({ className }) => (
  <TrendingDown className={className} />
);

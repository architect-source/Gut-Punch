import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';

interface ResolutionTrackerProps {
  score: number;
}

export const ResolutionTracker = ({ score }: ResolutionTrackerProps) => {
  const isAligned = score >= 300;
  const isHighRes = score >= 500;

  return (
    <div className="bg-zinc-950 border-2 border-zinc-800 p-4 font-mono text-[10px] brutal-card">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className={cn("w-3 h-3", isAligned ? "text-gargoyle-teal" : "text-blood-red")} />
          <span className="text-zinc-500 uppercase tracking-widest">RESOLUTION_SCORE:</span>
        </div>
        <motion.span 
          key={score}
          initial={{ scale: 1.2, color: '#fff' }}
          animate={{ scale: 1, color: isHighRes ? '#10b981' : isAligned ? '#14b8a6' : '#f59e0b' }}
          className="font-bold text-xs"
        >
          {score} PTS
        </motion.span>
      </div>
      
      {/* Progress bar toward Funding Release */}
      <div className="w-full bg-zinc-900 h-2 border border-zinc-800 relative overflow-hidden mb-3">
        <motion.div 
          className={cn(
            "h-full transition-all duration-1000",
            isHighRes ? "bg-neon" : isAligned ? "bg-gargoyle-teal" : "bg-blood-red"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(score / 10, 100)}%` }}
        />
        {/* Threshold markers */}
        <div className="absolute top-0 left-[30%] h-full w-px bg-white/10" title="Alignment Threshold" />
        <div className="absolute top-0 left-[50%] h-full w-px bg-white/10" title="High-Res Threshold" />
      </div>
      
      <div className={cn(
        "p-2 border flex items-start gap-2 transition-colors",
        isAligned ? "border-gargoyle-teal/20 bg-gargoyle-teal/5 text-gargoyle-teal/80" : "border-blood-red/20 bg-blood-red/5 text-blood-red/80"
      )}>
        {isAligned ? <ShieldCheck className="w-3 h-3 mt-0.5" /> : <AlertCircle className="w-3 h-3 mt-0.5" />}
        <p className="italic leading-tight">
          {score < 300 
            ? "STATUS: DRIFT_RISK - REDIRECT TO FMES PROTOCOL" 
            : "STATUS: ALIGNED - SOVEREIGN EXIT IN SIGHT"}
        </p>
      </div>

      {isHighRes && (
        <div className="mt-2 text-[8px] text-neon uppercase font-bold animate-pulse text-center tracking-[0.2em]">
          Funding Release Authorized
        </div>
      )}
    </div>
  );
};

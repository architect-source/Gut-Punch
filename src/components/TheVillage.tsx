import { motion } from 'motion/react';
import { VillageAudio } from './VillageAudio';

export const TheVillage = () => {
  // Logic to fetch 'punches' from the ICP Canister (Mocked for now)
  const communityWins = [
    { id: '1', alias: 'SENTRY_74', content: 'Identified a digital erosion habit today. Deleted the app. Boundary enforced.', prideScore: 100 },
    { id: '2', alias: 'ARCHITECT_09', content: 'Phase II success: Instead of reacting to a verbal trigger, I performed 50 pushups. The energy is mine now.', prideScore: 150 },
    { id: '3', alias: 'VOID_WALKER', content: 'Locked the vault on a major impulse. Cold iron protocol successful.', prideScore: 200 }
  ];

  const audioFrequencies = [
    { id: 'FRQ-01', creator: 'AZRAEL_CORE' },
    { id: 'FRQ-02', creator: 'VOID_SENTRY' }
  ];

  return (
    <div className="p-4 bg-void font-mono brutal-card border-ink/20">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-zinc-800 pb-2">
        <div className="w-3 h-3 bg-gargoyle-teal rounded-full animate-pulse" />
        <h2 className="text-white font-bold uppercase tracking-widest text-xs">The Village // Raw Feed</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Recent Wins</h3>
          {communityWins.map((win) => (
            <motion.div 
              key={win.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4 border border-zinc-700 bg-zinc-950 hover:border-gargoyle-teal transition-colors group"
            >
              <div className="flex justify-between text-[10px] mb-2">
                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">[{win.alias}]</span>
                <span className="text-gargoyle-teal">+{win.prideScore} PRIDE</span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">"{win.content}"</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Audio Frequencies</h3>
          {audioFrequencies.map((freq) => (
            <VillageAudio key={freq.id} trackId={freq.id} creator={freq.creator} />
          ))}
          <div className="p-4 bg-zinc-900/30 border border-zinc-800 text-[8px] text-zinc-500 italic">
            [ADVISORY]: Frequencies are calibrated for Phase II stabilization. Engage only in secure environments.
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-between items-center">
        <span className="text-[8px] text-zinc-600 uppercase">Nodes Connected: 1,204</span>
        <span className="text-[8px] text-gargoyle-teal uppercase animate-pulse">Syncing with Canister...</span>
      </div>
    </div>
  );
};

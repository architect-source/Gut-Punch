/**
 * DSM-5 Reference & Coherence Bridge
 * Integrity Check: OK
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Search, Link2, Shield, Lock, Zap, Activity, ChevronRight, ChevronDown } from 'lucide-react';
import { DSM5_CATEGORIES, DSM5Category } from '../constants/DSM5Data';
import { cn } from '../lib/utils';

export const DSM5Bridge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DSM5Category | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCategories = DSM5_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-void border-2 border-zinc-800 p-6 font-mono brutal-card">
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <Book className="text-sentry w-6 h-6" />
          <h2 className="text-white font-bold uppercase tracking-widest">DSM-5 Reference & Coherence Bridge</h2>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-6"
          >
            {/* Search Section */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="SEARCH DSM-5 CATEGORIES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border-2 border-zinc-800 p-2 pl-10 text-white focus:border-sentry outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide border-r border-zinc-800">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left p-3 border border-zinc-800 transition-all hover:border-sentry group",
                      selectedCategory?.id === cat.id ? "bg-sentry/10 border-sentry" : "bg-black"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-tighter",
                        selectedCategory?.id === cat.id ? "text-sentry" : "text-zinc-400 group-hover:text-white"
                      )}>
                        {cat.name}
                      </span>
                      {selectedCategory?.id === cat.id && <Link2 className="w-3 h-3 text-sentry" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail & Bridge Section */}
              <div className="space-y-6">
                {selectedCategory ? (
                  <motion.div
                    key={selectedCategory.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* DSM-5 Summary */}
                    <div className="p-4 bg-zinc-900/50 border border-zinc-800">
                      <h3 className="text-xs font-bold text-white uppercase mb-2">Diagnostic Summary</h3>
                      <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                        {selectedCategory.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedCategory.commonCoOccurring.map(tag => (
                          <span key={tag} className="text-[8px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded uppercase font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Coherence Bridge */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sentry">
                        <Link2 className="w-4 h-4" />
                        <h3 className="text-xs font-bold uppercase tracking-widest">GutPunch Coherence Bridge</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <BridgeItem 
                          icon={<Shield className="w-3 h-3" />} 
                          label="Perimeter Check" 
                          content={selectedCategory.fmesPrompts.perimeter} 
                        />
                        <BridgeItem 
                          icon={<Lock className="w-3 h-3" />} 
                          label="Vault Status" 
                          content={selectedCategory.fmesPrompts.vault} 
                        />
                        <BridgeItem 
                          icon={<Zap className="w-3 h-3" />} 
                          label="Stone vs. Beast" 
                          content={selectedCategory.fmesPrompts.stoneVsBeast} 
                        />
                        <BridgeItem 
                          icon={<Activity className="w-3 h-3" />} 
                          label="Resolution Action" 
                          content={selectedCategory.fmesPrompts.resolutionAction} 
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 opacity-50 space-y-4 py-20">
                    <Book className="w-12 h-12" />
                    <p className="text-[10px] uppercase tracking-widest">Select a category to bridge to FMES</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BridgeItem = ({ icon, label, content }: { icon: React.ReactNode, label: string, content: string }) => (
  <div className="p-3 border border-zinc-800 bg-black/50 hover:border-sentry transition-colors group">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-sentry group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">{label}</span>
    </div>
    <p className="text-[10px] text-zinc-300 leading-relaxed italic">"{content}"</p>
  </div>
);

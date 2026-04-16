import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, 
  Eye, 
  Activity, 
  Shield, 
  Brain, 
  Zap, 
  Clock, 
  Volume2, 
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

type Category = 'BREATHING' | 'SENSORY' | 'PHYSICAL' | 'FMES' | 'COGNITIVE';

interface Tool {
  id: string;
  name: string;
  category: Category;
  duration: number;
  script: string;
  why: string;
  icon: any;
}

const TOOLS: Tool[] = [
  // Breathing
  {
    id: 'phys-sigh',
    name: 'Physiological Sigh',
    category: 'BREATHING',
    duration: 30,
    script: '1. Double quick inhale through nose (top-up the lungs). 2. Long, slow exhale through mouth (empty fully). 3. Repeat 2–3 times.',
    why: 'Instantly lowers CO₂, calms amygdala, reduces acute anxiety spike.',
    icon: Wind
  },
  {
    id: 'box-breath',
    name: 'Box Breathing',
    category: 'BREATHING',
    duration: 60,
    script: 'Inhale 4 sec → Hold 4 → Exhale 4 → Hold 4. Repeat 4–6 cycles.',
    why: 'Activates parasympathetic system; creates "containment" rhythm.',
    icon: Wind
  },
  {
    id: '478-breath',
    name: '4-7-8 Breathing',
    category: 'BREATHING',
    duration: 60,
    script: 'Inhale 4 → Hold 7 → Exhale 8 (whoosh sound).',
    why: 'Powerful for panic; longer exhale signals safety to survival energy.',
    icon: Wind
  },
  // Sensory
  {
    id: '54321',
    name: '5-4-3-2-1 Grounding',
    category: 'SENSORY',
    duration: 90,
    script: '5 things you SEE, 4 things you can TOUCH, 3 things you HEAR, 2 things you SMELL, 1 thing you TASTE.',
    why: 'Pulls focus out of flashback/dissociation into the physical present.',
    icon: Eye
  },
  {
    id: 'temp-reset',
    name: 'Temperature Reset',
    category: 'SENSORY',
    duration: 30,
    script: 'Hold ice cube/cold drink against wrist or splash cold water on face. Or press feet hard into floor.',
    why: 'Discreet & instant nervous system "breaker".',
    icon: Eye
  },
  {
    id: '555-stretch',
    name: '5-5-5 Stretch',
    category: 'SENSORY',
    duration: 45,
    script: 'Press feet down 5 sec → squeeze fists 5 sec → roll shoulders back 5 sec. Repeat ×2.',
    why: 'Subtle for public use; reconnects with muscle tension/release.',
    icon: Eye
  },
  // Physical
  {
    id: 'pmr',
    name: 'Quick PMR',
    category: 'PHYSICAL',
    duration: 60,
    script: 'Tense → release one group at a time (start with fists or shoulders).',
    why: 'Forces physical release of stored survival energy.',
    icon: Activity
  },
  {
    id: 'grounded-push',
    name: 'Grounded Push',
    category: 'PHYSICAL',
    duration: 20,
    script: 'Stand arm’s length from wall, push flat palms into it for 15–20 sec.',
    why: 'Feels like "locking" the impulse; activates large muscle groups.',
    icon: Activity
  },
  {
    id: 'walk-name',
    name: 'Walk & Name',
    category: 'PHYSICAL',
    duration: 90,
    script: 'Take 10 slow steps while naming what you see (e.g., "blue chair, white wall").',
    why: 'Combines bilateral movement with cognitive grounding.',
    icon: Activity
  },
  // FMES
  {
    id: 'vault-statement',
    name: 'Vault Statement',
    category: 'FMES',
    duration: 30,
    script: 'Repeat: "This energy is in me, but it is not me. You are restricted to observation and resource storage only. Your power belongs to me now."',
    why: 'Phase I (The Lock) - Externalizes and contains the impulse.',
    icon: Shield
  },
  {
    id: 'pride-loop',
    name: 'Pride Micro-Loop',
    category: 'FMES',
    duration: 45,
    script: '1. Notice trigger. 2. Choose tiny pride action (sit up straight, drink water). 3. Log in Pride Inventory.',
    why: 'Phase II (The Key) - Reclaims agency through micro-actions.',
    icon: Shield
  },
  {
    id: 'sov-shield',
    name: 'Sovereignty Scan',
    category: 'FMES',
    duration: 30,
    script: 'Ask: "Is this thought from inside me or an external narrative? What boundary do I need right now?"',
    why: 'Phase III (The Shield) - Enforces cognitive and social boundaries.',
    icon: Shield
  },
  // Cognitive
  {
    id: 'name-ext',
    name: 'Name & Externalize',
    category: 'COGNITIVE',
    duration: 30,
    script: '"This is the Ancestral Surge / Survival Guardian showing up. It’s old data, not current danger."',
    why: 'Reframes survival energy as a protective mechanism rather than a threat.',
    icon: Brain
  },
  {
    id: 'pride-anchor',
    name: 'Pride Anchor',
    category: 'COGNITIVE',
    duration: 15,
    script: 'Touch a wrist/necklace and silently state: "I am here. I am worthy of my own command."',
    why: 'Creates a physical-cognitive anchor for stable internal worth.',
    icon: Brain
  },
  {
    id: 'future-pace',
    name: 'Future-Pace',
    category: 'COGNITIVE',
    duration: 60,
    script: '"In 5 minutes this energy will be neutral. What small pride action can I take now?"',
    why: 'Shifts perspective past the acute peak of the impulse.',
    icon: Brain
  }
];

export const DeescalationToolkit = ({ 
  isTherapist = false, 
  onLog 
}: { 
  isTherapist?: boolean;
  onLog?: (toolName: string) => void;
}) => {
  const [step, setStep] = useState<'CHECK' | 'SUGGEST' | 'BROWSE' | 'ACTIVE'>('CHECK');
  const [checkScore, setCheckScore] = useState(5);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('BREATHING');

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTool = (tool: Tool) => {
    setActiveTool(tool);
    setTimeLeft(tool.duration);
    setIsActive(true);
    setStep('ACTIVE');
  };

  const getSuggestedTools = () => {
    if (checkScore >= 8) return TOOLS.filter(t => t.category === 'BREATHING' || t.id === 'temp-reset').slice(0, 3);
    if (checkScore >= 5) return TOOLS.filter(t => t.category === 'SENSORY' || t.category === 'PHYSICAL').slice(0, 3);
    return TOOLS.filter(t => t.category === 'FMES' || t.category === 'COGNITIVE').slice(0, 3);
  };

  return (
    <div className="bg-void border-2 border-zinc-800 p-6 font-mono brutal-card relative overflow-hidden">
      {/* Background Warning Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,red_20px,red_400px)]" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Zap className="text-blood-red w-6 h-6 animate-pulse" />
            <h2 className="text-white font-bold uppercase tracking-widest">De-escalation Toolkit</h2>
          </div>
          {step !== 'CHECK' && (
            <button 
              onClick={() => setStep('CHECK')}
              className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Check
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === 'CHECK' && (
            <motion.div 
              key="check"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-neon font-bold uppercase text-sm">Perimeter Check</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Rate current activation level (1-10)</p>
              </div>

              <div className="space-y-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={checkScore}
                  onChange={(e) => setCheckScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blood-red"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-bold">
                  <span>1 - STABLE</span>
                  <span className="text-blood-red text-lg">{checkScore}</span>
                  <span>10 - CRITICAL</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setStep('SUGGEST')}
                  className="w-full bg-blood-red text-white py-4 font-bold uppercase text-sm hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" /> Analyze & Suggest Tools
                </button>
                
                <button 
                  onClick={() => setStep('BROWSE')}
                  className="w-full border-2 border-zinc-700 text-zinc-400 py-3 text-xs font-bold uppercase hover:text-white hover:border-white transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" /> Browse All De-escalation Tools
                </button>
              </div>
            </motion.div>
          )}

          {step === 'SUGGEST' && (
            <motion.div 
              key="suggest"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="p-3 bg-blood-red/10 border-l-2 border-blood-red mb-4">
                <p className="text-[10px] text-blood-red font-bold uppercase">Analysis Complete</p>
                <p className="text-[8px] text-zinc-400 uppercase">Suggested protocols for level {checkScore} activation:</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {getSuggestedTools().map((tool) => (
                  <button 
                    key={tool.id}
                    onClick={() => startTool(tool)}
                    className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/50 hover:border-neon transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <tool.icon className="w-5 h-5 text-neon" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white uppercase">{tool.name}</p>
                        <p className="text-[8px] text-zinc-500 uppercase">{tool.category} // {tool.duration}s</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-neon" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep('BROWSE')}
                className="w-full text-[10px] text-zinc-500 uppercase py-4 hover:text-white"
              >
                View Full Toolkit
              </button>
            </motion.div>
          )}

          {step === 'BROWSE' && (
            <motion.div 
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {(['BREATHING', 'SENSORY', 'PHYSICAL', 'FMES', 'COGNITIVE'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-3 py-1 text-[8px] font-bold uppercase border transition-all whitespace-nowrap",
                      activeCategory === cat ? "bg-neon text-black border-neon" : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOOLS.filter(t => t.category === activeCategory).map((tool) => (
                  <button 
                    key={tool.id}
                    onClick={() => startTool(tool)}
                    className="p-4 border border-zinc-800 bg-zinc-900/50 hover:border-neon transition-all text-left space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <tool.icon className="w-4 h-4 text-neon" />
                      <span className="text-[8px] text-zinc-600 font-mono">{tool.duration}s</span>
                    </div>
                    <p className="text-[10px] font-bold text-white uppercase">{tool.name}</p>
                    <p className="text-[8px] text-zinc-500 leading-tight line-clamp-2">{tool.why}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'ACTIVE' && activeTool && (
            <motion.div 
              key="active"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-8 py-4"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-zinc-900"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: 377 - (377 * (timeLeft / activeTool.duration)) }}
                      className="text-neon"
                    />
                  </svg>
                  <div className="z-10 flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">{timeLeft}</span>
                    <span className="text-[8px] text-zinc-500 uppercase">Seconds</span>
                  </div>
                </div>

                <div className="space-y-4 max-w-sm">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{activeTool.name}</h3>
                  <div className="p-4 bg-zinc-900 border-l-2 border-neon text-left">
                    <p className="text-xs text-neon font-bold uppercase mb-2 flex items-center gap-2">
                      <Volume2 className="w-3 h-3" /> {isTherapist ? 'Clinical Guidance Script:' : 'Guide Script:'}
                    </p>
                    <p className="text-sm text-white leading-relaxed italic">"{activeTool.script}"</p>
                    {isTherapist && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-2">
                        <button className="text-[8px] bg-neon text-black px-2 py-1 font-bold uppercase">Prompt Voice Guide</button>
                        <button className="text-[8px] border border-neon text-neon px-2 py-1 font-bold uppercase">Send Text Prompt</button>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{activeTool.why}</p>
                </div>

                {timeLeft === 0 ? (
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-center gap-2 text-neon animate-bounce">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">Protocol Complete</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <button 
                        onClick={() => {
                          onLog?.(activeTool.name);
                          setStep('CHECK');
                        }}
                        className="w-full bg-neon text-black py-3 font-bold uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Log Use & Return
                      </button>
                      <button 
                        onClick={() => setStep('CHECK')}
                        className="w-full border border-zinc-800 text-zinc-500 py-2 text-[10px] uppercase hover:text-white transition-all"
                      >
                        Return without Logging
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsActive(false); setTimeLeft(0); }}
                    className="text-[10px] text-zinc-600 hover:text-blood-red uppercase tracking-widest"
                  >
                    Abort Protocol
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex items-start gap-3 p-3 bg-blood-red/5 border border-blood-red/20">
            <AlertTriangle className="w-4 h-4 text-blood-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[8px] text-blood-red font-bold uppercase">Clinical Safety Notice</p>
              <p className="text-[8px] text-zinc-500 leading-relaxed">
                These are adjunctive on-the-spot tools only. They support stabilization but do not replace evidence-based trauma treatment or medical oversight. If dissociation, active suicidality, or decompensation appears, return immediately to standard stabilization protocols and contact medical support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

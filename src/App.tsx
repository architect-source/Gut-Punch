import { useState } from 'react';
import { Shield, Lock, Heart, Pill, Users, Activity, AlertTriangle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import type { Role, ClientData } from './types';
import { AzraelMessenger } from './components/AzraelMessenger';

// Mock initial data
const INITIAL_DATA: ClientData = {
  id: '1',
  name: 'Subject-001',
  intrusiveImpulse: '',
  containmentStatement: 'This is in me, but it is not me.',
  logs: [],
  medications: [
    { name: 'Sertraline', currentDose: '100mg', targetDose: '50mg', taperRate: '12.5mg every 2 weeks', notes: 'Monitor for increased anxiety during drops.' }
  ],
  boundaries: []
};

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [data, setData] = useState<ClientData>(INITIAL_DATA);
  const [showMessenger, setShowMessenger] = useState(false);

  if (!role) {
    return (
      <div className="min-h-screen bg-[#050505] text-white border-[10px] border-zinc-900 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-neon" />
            <h1 className="text-4xl font-bold tracking-[0.2em] text-ink">GUTPUNCH</h1>
          </div>
          <p className="text-xs font-mono text-neon opacity-60 tracking-widest uppercase">Sovereign Sentry // Risk Management Protocol</p>
        </motion.div>

        <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('client')}
            className="brutal-card flex flex-col items-center gap-4 text-center group"
          >
            <Shield className="w-16 h-16 text-neon group-hover:text-ink transition-colors" />
            <h2 className="text-2xl font-bold">Client Portal</h2>
            <p className="text-sm opacity-60">Access internal risk management & anxiety tools.</p>
            <div className="mt-4 brutal-btn w-full">Enter Void</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('therapist')}
            className="brutal-card flex flex-col items-center gap-4 text-center group border-sentry"
          >
            <Users className="w-16 h-16 text-sentry group-hover:text-ink transition-colors" />
            <h2 className="text-2xl font-bold">Therapist Command</h2>
            <p className="text-sm opacity-60">Clinical oversight, risk management & tapering guides.</p>
            <div className="mt-4 brutal-btn w-full bg-sentry text-ink border-sentry">Authorize</div>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white border-[10px] border-zinc-900 flex flex-col">
      <header className="border-b-2 border-ink p-4 flex justify-between items-center bg-metal sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Activity className={cn("w-6 h-6", role === 'client' ? "text-neon" : "text-sentry")} />
          <h1 className="text-xl font-bold tracking-widest">GutPunch // {role === 'client' ? 'SENTRY' : 'OVERSEER'}</h1>
        </div>
        <div className="flex items-center gap-4">
          {role === 'client' && (
            <button 
              onClick={() => setShowMessenger(!showMessenger)}
              className={cn(
                "p-2 border-2 transition-all",
                showMessenger ? "bg-neon text-void border-neon" : "border-ink/20 hover:border-neon text-neon"
              )}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setRole(null)}
            className="text-xs font-mono uppercase border border-ink/30 px-2 py-1 hover:bg-ink hover:text-void transition-colors"
          >
            Switch Protocol
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className={cn(
          "flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full overflow-y-auto transition-all duration-500",
          showMessenger && "mr-0 lg:mr-[400px]"
        )}>
          {role === 'client' ? (
            <ClientDashboard data={data} setData={setData} />
          ) : (
            <TherapistDashboard data={data} />
          )}
        </main>

        <AnimatePresence>
          {showMessenger && role === 'client' && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-[73px] right-0 bottom-[42px] w-full lg:w-[400px] z-40"
            >
              <AzraelMessenger />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <footer className="border-t-2 border-ink p-4 bg-metal text-[10px] font-mono opacity-40 flex justify-between uppercase tracking-widest">
        <span>Sovereign Sentry v1.0.0</span>
        <span>Unauthorized access is prohibited</span>
      </footer>
    </div>
  );
}

function ClientDashboard({ data, setData }: { data: ClientData, setData: (d: ClientData) => void }) {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => setActivePhase(p)}
            className={cn(
              "p-2 border-2 font-mono uppercase text-xs transition-all",
              activePhase === p ? "bg-neon text-void border-neon" : "border-ink/20 hover:border-ink"
            )}
          >
            Phase {p}: {p === 1 ? 'Lock' : p === 2 ? 'Pride' : 'Shield'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {activePhase === 1 && (
            <div className="space-y-6">
              <div className="brutal-card border-neon">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="text-neon" />
                  <h2 className="text-xl">Phase 1: The Lock</h2>
                </div>
                <p className="text-sm mb-6 opacity-80 italic">"This is in me, but it is not me."</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-mono mb-1">Name the intrusive impulse</label>
                    <input 
                      className="brutal-input w-full" 
                      placeholder="e.g. The Void, The Static..."
                      value={data.intrusiveImpulse}
                      onChange={(e) => setData({ ...data, intrusiveImpulse: e.target.value })}
                    />
                  </div>
                  <div className="p-4 bg-neon/10 border border-neon/30 text-neon text-sm font-mono">
                    REPEAT DAILY: {data.containmentStatement}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePhase === 2 && (
            <div className="space-y-6">
              <div className="brutal-card border-neon">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="text-neon" />
                  <h2 className="text-xl">Phase 2: The Pride Directive</h2>
                </div>
                <p className="text-sm mb-6 opacity-80">When impulse arises, choose one small action that affirms your worth.</p>
                
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const newLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    trigger: formData.get('trigger') as string,
                    action: formData.get('action') as string,
                    feeling: formData.get('feeling') as string,
                  };
                  setData({ ...data, logs: [newLog, ...data.logs] });
                  form.reset();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="trigger" className="brutal-input" placeholder="Trigger" required />
                    <input name="action" className="brutal-input" placeholder="Pride Action" required />
                    <input name="feeling" className="brutal-input" placeholder="How it felt" required />
                  </div>
                  <button type="submit" className="brutal-btn w-full bg-neon text-void border-neon">Log Entry</button>
                </form>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase opacity-50">Operational Logs</h3>
                {data.logs.map((log) => (
                  <div key={log.id} className="brutal-card p-4 text-xs font-mono grid grid-cols-3 gap-4 border-ink/20">
                    <div><span className="opacity-40">T:</span> {log.trigger}</div>
                    <div><span className="opacity-40">A:</span> {log.action}</div>
                    <div><span className="opacity-40">F:</span> {log.feeling}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePhase === 3 && (
            <div className="space-y-6">
              <div className="brutal-card border-neon">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-neon" />
                  <h2 className="text-xl">Phase 3: The Shield</h2>
                </div>
                <p className="text-sm mb-6 opacity-80">Evaluate one relationship or digital habit each week. Set one clear boundary and test it.</p>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input id="boundary-input" className="brutal-input flex-1" placeholder="New Boundary..." />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('boundary-input') as HTMLInputElement;
                        if (input.value) {
                          setData({ ...data, boundaries: [...data.boundaries, input.value] });
                          input.value = '';
                        }
                      }}
                      className="brutal-btn"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {data.boundaries.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 border border-ink/20 text-sm">
                        <div className="w-1 h-1 bg-neon" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TherapistDashboard({ data }: { data: ClientData }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clinical Oversight: {data.name}</h2>
        <div className="flex items-center gap-2 text-sentry animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase">High Risk Protocol Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="brutal-card border-sentry">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="text-sentry" />
              <h3 className="text-xl">Medication Tapering Guide</h3>
            </div>
            
            <div className="p-4 bg-sentry/10 border border-sentry/30 mb-6">
              <p className="text-xs text-sentry font-bold uppercase mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Non-Medical Guide
              </p>
              <p className="text-[10px] opacity-70 leading-relaxed">
                This tool is for therapist reference only. Medication changes REQUIRE direct medical supervision by a psychiatrist or primary care physician. Do not adjust dosages without clinical authorization.
              </p>
            </div>

            <div className="space-y-6">
              {data.medications.map((med, i) => (
                <div key={i} className="space-y-4 border-b border-ink/10 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{med.name}</h4>
                    <span className="text-[10px] font-mono bg-sentry text-ink px-2 py-0.5 uppercase">Tapering</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="opacity-40 block uppercase text-[8px]">Current Dose</span>
                      {med.currentDose}
                    </div>
                    <div>
                      <span className="opacity-40 block uppercase text-[8px]">Target Dose</span>
                      {med.targetDose}
                    </div>
                    <div className="col-span-2">
                      <span className="opacity-40 block uppercase text-[8px]">Taper Rate</span>
                      {med.taperRate}
                    </div>
                  </div>
                  <div className="text-[10px] italic opacity-60 bg-void p-2 border-l-2 border-sentry">
                    Note: {med.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brutal-card border-ink/40">
            <h3 className="text-sm font-mono uppercase mb-4 opacity-50">Clinical Note</h3>
            <p className="text-xs leading-relaxed opacity-80">
              This tool supports resolution-focused work. Combine with your existing modality (CBT, DBT, EMDR). 
              Monitor Phase 2 logs for "Pride Action" efficacy. If "How it felt" scores remain low, consider pausing the taper.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="brutal-card">
            <h3 className="text-sm font-mono uppercase mb-4 opacity-50">Client Risk Profile</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>Intrusive Impulse:</span>
                <span className="text-neon">{data.intrusiveImpulse || 'NOT DEFINED'}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span>Containment:</span>
                <span className="text-neon">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span>Pride Log Count:</span>
                <span>{data.logs.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span>Boundaries Set:</span>
                <span>{data.boundaries.length}</span>
              </div>
            </div>
          </div>

          <div className="brutal-card border-ink/20">
            <h3 className="text-sm font-mono uppercase mb-4 opacity-50">Recent Activity Log</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {data.logs.length === 0 ? (
                <p className="text-[10px] opacity-40 italic">No recent activity detected.</p>
              ) : (
                data.logs.map((log) => (
                  <div key={log.id} className="text-[10px] font-mono p-2 border border-ink/10 bg-void/50">
                    <div className="flex justify-between opacity-40 mb-1">
                      <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div><span className="text-neon">TRIGGER:</span> {log.trigger}</div>
                    <div><span className="text-neon">ACTION:</span> {log.action}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


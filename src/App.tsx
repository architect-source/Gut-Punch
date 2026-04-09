import { useState } from 'react';
import { Shield, Lock, Heart, Pill, Users, Activity, AlertTriangle, MessageSquare, Zap, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import type { Role, ClientData } from './types';
import { AzraelMessenger } from './components/AzraelMessenger';
import { AzraelChat } from './components/AzraelTruthGiver';
import { TitanStrikeTerminal } from './components/SovereignTerminal';
import { SystemStatus } from './components/SystemStatus';
import { TheShield } from './components/TheShield';
import { TherapistConsultant } from './components/TherapistConsultant';
import { TherapistGuardrail } from './components/TherapistGuardrail';
import { auditNote } from './logic/TherapistAuditor';
import { ResolutionTracker } from './components/ResolutionTracker';
import { calculateResolutionScore } from './logic/FundingEngine';
import { TheVillage } from './components/TheVillage';
import { useSentryGuard } from './hooks/useSentryGuard';

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

  useSentryGuard();

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

      <footer className="border-t-2 border-ink p-4 bg-metal text-[10px] font-mono opacity-40 flex justify-between uppercase tracking-widest mb-6">
        <span>Sovereign Sentry v1.0.0</span>
        <span>Unauthorized access is prohibited</span>
      </footer>
      <SystemStatus />
    </div>
  );
}

function ClientDashboard({ data, setData }: { data: ClientData, setData: (d: ClientData) => void }) {
  const [activePhase, setActivePhase] = useState<number | 'village'>(1);
  const [showSovereignTools, setShowSovereignTools] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="grid grid-cols-4 gap-2 flex-1 w-full">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => {
                setActivePhase(p);
                setShowSovereignTools(false);
              }}
              className={cn(
                "p-2 border-2 font-mono uppercase text-[10px] transition-all",
                activePhase === p && !showSovereignTools ? "bg-neon text-void border-neon" : "border-ink/20 hover:border-ink"
              )}
            >
              Phase {p}: {p === 1 ? 'Lock' : p === 2 ? 'Pride' : 'Shield'}
            </button>
          ))}
          <button
            onClick={() => {
              setActivePhase('village');
              setShowSovereignTools(false);
            }}
            className={cn(
              "p-2 border-2 font-mono uppercase text-[10px] transition-all",
              activePhase === 'village' && !showSovereignTools ? "bg-gargoyle-teal text-void border-gargoyle-teal" : "border-ink/20 hover:border-ink"
            )}
          >
            The Village
          </button>
        </div>
        <button
          onClick={() => setShowSovereignTools(!showSovereignTools)}
          className={cn(
            "p-2 border-2 font-mono uppercase text-xs transition-all w-full md:w-auto flex items-center justify-center gap-2",
            showSovereignTools ? "bg-blood-red text-ink border-blood-red" : "border-blood-red/40 text-blood-red hover:border-blood-red"
          )}
        >
          <Zap className="w-4 h-4" />
          Sovereign Tools
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showSovereignTools ? (
          <motion.div
            key="sovereign-tools"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <TerminalIcon className="text-neon w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tighter">Truth Giver Protocol</h2>
              </div>
              <AzraelChat />
              <div className="p-4 border-l-2 border-neon bg-neon/5 text-[10px] font-mono opacity-60">
                [ADVISORY]: Use Truth Giver when "Vampire Clusters" (self-sabotage) are detected. 
                Azrael will analyze the logic breach and recommend a Strike if necessary.
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-blood-red w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tighter">Titan Strike Terminal</h2>
              </div>
              <TitanStrikeTerminal impulse={data.intrusiveImpulse} />
              <div className="p-4 border-l-2 border-blood-red bg-blood-red/5 text-[10px] font-mono opacity-60">
                [CRITICAL]: Titan Strike is a recursive drain protocol. 
                Use only when thoughts require immediate neutralization. 
                Hardware is the stake.
              </div>
            </div>
          </motion.div>
        ) : (
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
                
                <TheShield />

                <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-mono uppercase opacity-50">Active Boundaries</h3>
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

          {activePhase === 'village' && (
            <div className="space-y-6">
              <TheVillage />
            </div>
          )}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

function TherapistDashboard({ data }: { data: ClientData }) {
  const [isConnected, setIsConnected] = useState(false);
  const [signature, setSignature] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState<{ text: string; timestamp: number; audit?: string }[]>([]);
  const [newNote, setNewNote] = useState('');
  const [auditWarning, setAuditWarning] = useState<string | null>(null);
  
  // Resolution & Funding State
  const [lockVerified, setLockVerified] = useState(false);
  const [prideVerified, setPrideVerified] = useState(false);
  const [resolutionScore, setResolutionScore] = useState(0);
  const [sessionCount, setSessionCount] = useState(1);

  const handleHandshake = () => {
    if (!signature.trim()) return;
    setIsConnecting(true);
    // Simulate Kinetic Handshake validation
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const commitNote = () => {
    if (!newNote.trim()) return;
    
    const auditResult = auditNote(newNote);
    const noteEntry = {
      text: newNote,
      timestamp: Date.now(),
      audit: auditResult.status === 'DRIFT_DETECTED' ? auditResult.warning : undefined
    };

    setClinicalNotes([noteEntry, ...clinicalNotes]);
    setNewNote('');
    setAuditWarning(auditResult.status === 'DRIFT_DETECTED' ? auditResult.warning || null : null);
  };

  const handleCommitResolution = () => {
    const score = calculateResolutionScore({
      lockVerified,
      prideActionLogged: prideVerified ? data.logs.length : 0,
      shieldIntegrity: data.boundaries.length * 10, // Simple heuristic for demo
      sessionCount
    });
    setResolutionScore(score);
  };

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto space-y-8 py-12">
        <div className="brutal-card border-sentry text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-sentry" />
          </div>
          <h2 className="text-2xl font-bold mb-2">KINETIC HANDSHAKE REQUIRED</h2>
          <p className="text-xs font-mono opacity-60 mb-6 uppercase tracking-widest">
            Protocol: validateKineticHandshake
          </p>
          
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-[10px] uppercase font-mono mb-1 opacity-50">Enter Client Signature / ID</label>
              <input 
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="e.g. Subject-001-ALPHA"
                className="brutal-input w-full border-sentry focus:border-ink"
              />
            </div>
            
            <button 
              onClick={handleHandshake}
              disabled={isConnecting || !signature.trim()}
              className="brutal-btn w-full bg-sentry text-ink border-sentry disabled:opacity-30 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  VALIDATING...
                </>
              ) : (
                'AUTHORIZE CONNECTION'
              )}
            </button>
          </div>
        </div>
        
        <div className="p-4 border-l-2 border-sentry bg-sentry/5 text-[10px] font-mono opacity-60 leading-relaxed">
          [SECURITY]: Handshake verifies that the 'Rebuild' was performed locally. 
          Signature is stored as a proof of Sovereignty. Unauthorized access attempts are logged.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Clinical Oversight: {data.name}</h2>
          <span className="text-[8px] font-mono bg-neon/20 text-neon border border-neon/30 px-2 py-0.5 uppercase">Connected</span>
        </div>
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
            <h3 className="text-sm font-mono uppercase mb-4 opacity-50">Clinical Note Entry</h3>
            <div className="space-y-4">
              {auditWarning && (
                <div className="p-2 bg-blood-red/20 border border-blood-red text-blood-red text-[10px] font-mono animate-pulse">
                  {auditWarning}
                </div>
              )}
              <textarea 
                value={newNote}
                onChange={(e) => {
                  setNewNote(e.target.value);
                  if (auditWarning) setAuditWarning(null);
                }}
                placeholder="Enter clinical observations, session summary, or risk assessment..."
                className="brutal-input w-full h-32 resize-none text-sm"
              />
              <button 
                onClick={commitNote}
                className="brutal-btn w-full"
              >
                COMMIT NOTE
              </button>
              
              <div className="space-y-4 mt-6">
                {clinicalNotes.map((note, i) => (
                  <div key={i} className={cn(
                    "p-3 border text-xs leading-relaxed",
                    note.audit ? "border-blood-red bg-blood-red/5" : "border-ink/10 bg-void/30"
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[8px] opacity-30 uppercase font-mono">
                        Entry: {new Date(note.timestamp).toLocaleDateString()} // {new Date(note.timestamp).toLocaleTimeString()}
                      </div>
                      {note.audit && <span className="text-[8px] text-blood-red font-bold uppercase">Drift Detected</span>}
                    </div>
                    <p>{note.text}</p>
                    {note.audit && (
                      <div className="mt-2 text-[8px] text-blood-red italic border-t border-blood-red/20 pt-1">
                        {note.audit}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ResolutionTracker score={resolutionScore} />
          <TherapistConsultant />
          <TherapistGuardrail 
            lockVerified={lockVerified}
            prideVerified={prideVerified}
            onLockChange={setLockVerified}
            onPrideChange={setPrideVerified}
            onCommit={handleCommitResolution}
          />
          
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


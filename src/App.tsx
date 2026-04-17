/**
 * GUTPUNCH // SOVEREIGN SENTRY
 * Version: 2.4.0-STABLE
 * Deployment Trace: 77a9d2f
 */
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
import { TriggerLab } from './components/TriggerLab';
import { DeescalationToolkit } from './components/DeescalationToolkit';
import { DSM5Bridge } from './components/DSM5Bridge';
import { DSM5_CATEGORIES } from './constants/DSM5Data';
import { RiskManagementProtocol } from './components/RiskManagementProtocol';

// Mock initial data
const INITIAL_DATA: ClientData = {
  id: '1',
  name: 'Subject-001',
  intrusiveImpulse: '',
  containmentStatement: 'This is in me, but it is not me.',
  logs: [],
  medications: [
    { 
      name: 'Sertraline', 
      currentDose: '100mg', 
      targetDose: '50mg', 
      taperRate: '12.5mg every 2 weeks', 
      frequency: 'Once daily',
      physician: {
        name: 'Dr. Elena Ramirez',
        lastSeen: '2026-03-15'
      },
      lastReviewed: '2026-04-01',
      notes: 'Monitor for increased anxiety during drops.' 
    }
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
  const [activePhase, setActivePhase] = useState<number | 'village' | 'tools'>(1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="grid grid-cols-5 gap-2 flex-1 w-full">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setActivePhase(p as any)}
              className={cn(
                "p-2 border-2 font-mono uppercase text-[10px] transition-all",
                activePhase === p ? "bg-neon text-void border-neon" : "border-ink/20 hover:border-ink"
              )}
            >
              Phase {p}: {p === 1 ? 'Lock' : p === 2 ? 'Pride' : 'Shield'}
            </button>
          ))}
          <button
            onClick={() => setActivePhase('village')}
            className={cn(
              "p-2 border-2 font-mono uppercase text-[10px] transition-all",
              activePhase === 'village' ? "bg-gargoyle-teal text-void border-gargoyle-teal" : "border-ink/20 hover:border-ink"
            )}
          >
            The Village
          </button>
          <button
            onClick={() => setActivePhase('tools')}
            className={cn(
              "p-2 border-2 font-mono uppercase text-[10px] transition-all",
              activePhase === 'tools' ? "bg-blood-red text-ink border-blood-red" : "border-blood-red/40 text-blood-red hover:border-blood-red"
            )}
          >
            Sovereign Tools
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activePhase === 'tools' ? (
          <motion.div
            key="sovereign-tools"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            </div>

            <div className="space-y-6">
              <DeescalationToolkit onLog={(tool) => {
                const newLog = {
                  id: Math.random().toString(36).substr(2, 9),
                  timestamp: Date.now(),
                  trigger: 'Manual Override',
                  action: `Used Tool: ${tool}`,
                  feeling: 'Regulated',
                  prideScore: 10
                };
                setData({ ...data, logs: [newLog, ...data.logs] });
              }} />
            </div>

            <div className="space-y-6">
              <TriggerLab />
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

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-sm font-mono uppercase mb-6 opacity-50">Common Patterns & Grounding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DSM5_CATEGORIES.slice(3, 6).map(cat => (
                <div key={cat.id} className="brutal-card border-zinc-800 p-4 space-y-3 bg-black/30">
                  <h4 className="text-xs font-bold uppercase text-zinc-300">{cat.name.split(' ')[0]} Patterns</h4>
                  <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                    {cat.summary.substring(0, 100)}...
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button 
                      onClick={() => setActivePhase('tools')}
                      className="text-[8px] uppercase font-bold text-neon hover:underline"
                    >
                      Grounding Tools
                    </button>
                    <button 
                      onClick={() => setActivePhase(2)}
                      className="text-[8px] uppercase font-bold text-gargoyle-teal hover:underline"
                    >
                      Pride Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
  const [showProtocol, setShowProtocol] = useState(false);
  
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
      {showProtocol && <RiskManagementProtocol onClose={() => setShowProtocol(false)} />}
      
      <div className="brutal-card border-sentry bg-sentry/5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Therapist Dashboard – Fear Mastery & Emotional Sovereignty (FMES)</h2>
            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Clinical Support Platform // v1.0.0</p>
          </div>
          <button 
            onClick={() => setShowProtocol(true)}
            className="text-[10px] font-mono bg-sentry text-ink px-3 py-1 uppercase font-bold hover:bg-white transition-colors"
          >
            View Full Protocol
          </button>
        </div>
        
        <p className="text-xs text-zinc-300 leading-relaxed mb-6">
          Welcome to the FMES clinical support platform. This interface bridges standard DSM-5-TR diagnostic grounding with the FMES three-phase framework. It is designed to support the resolution of complex trauma and intrusive impulses by reframing misdirected survival energy into stable, internal worth (Unconditional Self-Pride).
        </p>

        <div className="mb-6 p-4 bg-zinc-900 border-l-2 border-gargoyle-teal">
          <h4 className="text-[10px] font-bold text-gargoyle-teal uppercase tracking-widest mb-2">Clinical Partner Summary (ADAPT):</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed italic">
            The FMES protocol serves as a coherence bridge for clinical partners using the ADAPT (Adaptive Diagnostic & Action Protocol for Trauma) framework. By integrating real-time de-escalation tools with long-term identity reconstruction, FMES provides a measurable path from acute symptom management to autonomous emotional sovereignty. This system prioritizes physician-led medication oversight while empowering therapists to guide the cognitive and somatic redirection of trauma-based impulses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-bold text-sentry uppercase tracking-widest mb-3">Core Principles:</h4>
            <ul className="space-y-2 text-[10px] text-zinc-400 list-disc list-inside">
              <li>DSM-5 categories provide the clinical foundation.</li>
              <li>FMES reframes intrusive impulses as misdirected survival energy (Primal Protective Energy).</li>
              <li>Primary outcome: Unconditional Self-Pride — stable internal worth.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-sentry uppercase tracking-widest mb-3">Quick Access Sections:</h4>
            <ul className="space-y-2 text-[10px] text-zinc-400 list-disc list-inside">
              <li>De-escalation Toolkit – One-tap clinical stabilization tools</li>
              <li>DSM-5 Reference & Coherence Bridge – Searchable categories</li>
              <li>Medications – Full list with physician oversight</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-sentry/20 text-[8px] text-zinc-500 italic">
          All use is adjunctive. Screen for stability, obtain informed consent, and collaborate with medical providers as needed. Document thoroughly.
        </div>
      </div>

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
              <h3 className="text-xl font-bold uppercase tracking-tighter">Current Medications</h3>
            </div>
            
            <div className="p-4 bg-blood-red/10 border-2 border-blood-red mb-6">
              <h4 className="text-xs text-blood-red font-bold uppercase mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Important Safety Notice
              </h4>
              <p className="text-[10px] text-zinc-300 leading-relaxed font-bold">
                Any changes to medication regimens — referred to in this framework as <span className="text-blood-red underline">Sovereign Chemical Command</span> — require direct approval and oversight from the prescribing physician or qualified medical provider. Therapists using FMES tools do not initiate, adjust, taper, or manage medications. Medication decisions must always occur under medical supervision.
              </p>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-6">
              This section displays the client’s full prescribed medication list. Accurate medication information supports coordinated care between therapists and medical providers.
            </p>

            <div className="space-y-8">
              {data.medications.map((med, i) => (
                <div key={i} className="space-y-4 border-b border-zinc-800 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-white uppercase tracking-tighter">{med.name}</h4>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Last Reviewed: {med.lastReviewed}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-[10px] font-mono uppercase tracking-widest">
                    <div className="space-y-1">
                      <span className="text-zinc-500 block">Dosage</span>
                      <span className="text-white">{med.currentDose}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 block">Frequency</span>
                      <span className="text-white">{med.frequency}</span>
                    </div>
                    <div className="col-span-2 space-y-1 pt-2 border-t border-zinc-900">
                      <span className="text-zinc-500 block">Prescribing Physician</span>
                      <span className="text-white">{med.physician.name}</span>
                      <span className="text-[8px] text-zinc-600 block lowercase">Last seen: {med.physician.lastSeen}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 border-2 border-blood-red/30 text-blood-red text-[10px] font-bold uppercase text-center">
              Medication decisions must always occur under medical supervision.
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

      <div className="mt-8 space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-zinc-800 pb-4">
          <Zap className="text-blood-red w-6 h-6" />
          <h2 className="text-2xl font-bold uppercase tracking-widest">Sovereign Tools Reference</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-mono uppercase opacity-50">Truth Giver // Azrael</h3>
            <AzraelChat />
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-mono uppercase opacity-50">Titan Strike // Neutralization</h3>
            <TitanStrikeTerminal impulse={data.intrusiveImpulse} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DeescalationToolkit 
            isTherapist 
            onLog={(tool) => {
              const newNoteText = `[SYSTEM]: Client guided through de-escalation tool: ${tool}`;
              setClinicalNotes([{ text: newNoteText, timestamp: Date.now() }, ...clinicalNotes]);
            }}
          />
          <TriggerLab />
        </div>
      </div>

      <div className="mt-8">
        <DSM5Bridge />
      </div>
    </div>
  );
}


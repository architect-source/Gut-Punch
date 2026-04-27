import React from 'react';
import { Activity, Zap, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { BiometricPoint } from '../types';

interface BiometricMonitorProps {
  data: BiometricPoint[];
}

export const BiometricMonitor: React.FC<BiometricMonitorProps> = ({ data }) => {
  const latest = data[data.length - 1];

  return (
    <div className="brutal-card border-neon space-y-6 bg-void/50">
      <div className="flex items-center justify-between border-b border-neon/20 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="text-neon w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-tighter">Biometric Telemetry</h2>
        </div>
        <div className="text-[10px] font-mono text-neon bg-neon/10 px-2 py-0.5 rounded animate-pulse">
          LIVE SOURCE: SENTRY_CORE
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border border-neon/20 bg-black/40 text-center">
          <span className="block text-[8px] uppercase text-zinc-500 mb-1">HRV</span>
          <span className="text-xl font-bold text-neon">{latest?.hrv || 0}</span>
          <span className="block text-[8px] text-zinc-600 mt-1">ms (Variability)</span>
        </div>
        <div className="p-3 border border-neon/20 bg-black/40 text-center">
          <span className="block text-[8px] uppercase text-zinc-500 mb-1">GSR</span>
          <span className="text-xl font-bold text-gargoyle-teal">{latest?.gsr || 0}</span>
          <span className="block text-[8px] text-zinc-600 mt-1">µS (Arousal)</span>
        </div>
        <div className="p-3 border border-neon/20 bg-black/40 text-center">
          <span className="block text-[8px] uppercase text-zinc-500 mb-1">STRESS</span>
          <span className="text-xl font-bold text-blood-red">{latest?.stressIndex || 0}%</span>
          <span className="block text-[8px] text-zinc-600 mt-1">Forensic Load</span>
        </div>
      </div>

      <div className="h-48 w-full border border-neon/10 bg-black/20 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            <XAxis hide dataKey="timestamp" />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050505', border: '1px solid #00F3FF', color: '#FFF' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Line type="monotone" dataKey="hrv" stroke="#00F3FF" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="stressIndex" stroke="#FF0000" dot={false} strokeWidth={1} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {latest?.stressIndex > 70 && (
        <div className="p-4 bg-blood-red/20 border-2 border-blood-red animate-pulse flex items-center gap-3">
          <Zap className="text-blood-red w-6 h-6" />
          <div className="text-xs font-bold text-blood-red uppercase tracking-widest">
            THRESHOLD BREACH: Deploy neutralization protocols immediately.
          </div>
        </div>
      )}
    </div>
  );
};

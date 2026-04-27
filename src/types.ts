export type Role = 'client' | 'therapist';

export interface BiometricPoint {
  timestamp: number;
  hrv: number; // Heart Rate Variability
  gsr: number; // Galvanic Skin Response
  stressIndex: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  trigger: string;
  action: string;
  feeling: string;
  prideScore?: number;
  biometricTrace?: BiometricPoint;
}

export interface Medication {
  name: string;
  currentDose: string;
  targetDose: string;
  taperRate: string;
  frequency: string;
  physician: {
    name: string;
    lastSeen: string;
  };
  lastReviewed: string;
  notes: string;
}

export interface SessionBattlePlan {
  phase1: string; // Biometric Review
  phase2: string; // Spike Analysis
  phase3: string; // Cognitive Restructuring
  phase4: string; // Hardening
  isComplete: boolean;
}

export interface ClientData {
  id: string;
  name: string;
  intrusiveImpulse: string;
  containmentStatement: string;
  logs: LogEntry[];
  medications: Medication[];
  boundaries: string[];
  phase2Acknowledged?: boolean;
  biometrics: BiometricPoint[];
  currentBattlePlan?: SessionBattlePlan;
}

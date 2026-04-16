export type Role = 'client' | 'therapist';

export interface LogEntry {
  id: string;
  timestamp: number;
  trigger: string;
  action: string;
  feeling: string;
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

export interface ClientData {
  id: string;
  name: string;
  intrusiveImpulse: string;
  containmentStatement: string;
  logs: LogEntry[];
  medications: Medication[];
  boundaries: string[];
}

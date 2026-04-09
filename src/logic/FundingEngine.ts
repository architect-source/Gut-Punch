export interface ResolutionMetrics {
  lockVerified: boolean;       // Phase I
  prideActionLogged: number;   // Phase II
  shieldIntegrity: number;     // Phase III (0-100)
  sessionCount: number;
}

/**
 * FundingEngine Protocol
 * Calculates the Resolution Score based on client progress and clinical efficiency.
 */
export const calculateResolutionScore = (metrics: ResolutionMetrics): number => {
  const baseScore = metrics.lockVerified ? 100 : 0;
  const prideBonus = metrics.prideActionLogged * 50;
  const shieldBonus = metrics.shieldIntegrity;
  
  // The "Efficiency Multiplier": Fewer sessions with high success = Higher funding
  const efficiency = metrics.sessionCount > 0 ? Math.floor(1000 / metrics.sessionCount) : 0;

  return baseScore + prideBonus + shieldBonus + efficiency;
};

/**
 * Client-side progressive interest calculation utilities
 */

export interface InvestmentData {
  startDate: string | Date;
  endDate: string | Date;
  totalInterest: number;
  isCompleted?: boolean;
}

/**
 * Calculate current progressive interest based on elapsed time
 */
export const calculateProgressiveInterest = (investment: InvestmentData): number => {
  if (investment.isCompleted) {
    return investment.totalInterest;
  }

  const now = new Date();
  const startTime = new Date(investment.startDate).getTime();
  const endTime = new Date(investment.endDate).getTime();
  const currentTime = now.getTime();

  // If investment hasn't started yet
  if (currentTime < startTime) {
    return 0;
  }

  // If investment has completed
  if (currentTime >= endTime) {
    return investment.totalInterest;
  }

  // Calculate progress ratio based on elapsed time
  const totalDuration = endTime - startTime;
  const elapsedTime = currentTime - startTime;
  const progressRatio = elapsedTime / totalDuration;

  // Return progressive interest
  return investment.totalInterest * progressRatio;
};

/**
 * Calculate progress percentage
 */
export const calculateProgressPercentage = (investment: InvestmentData): number => {
  if (investment.isCompleted) {
    return 100;
  }

  const now = new Date();
  const startTime = new Date(investment.startDate).getTime();
  const endTime = new Date(investment.endDate).getTime();
  const currentTime = now.getTime();

  if (currentTime < startTime) {
    return 0;
  }

  if (currentTime >= endTime) {
    return 100;
  }

  const totalDuration = endTime - startTime;
  const elapsedTime = currentTime - startTime;
  
  return Math.min((elapsedTime / totalDuration) * 100, 100);
};

/**
 * Format remaining time
 */
export const formatTimeRemaining = (endDate: string | Date): string => {
  const now = new Date();
  const end = new Date(endDate);
  const remaining = end.getTime() - now.getTime();

  if (remaining <= 0) {
    return "Completed";
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else if (minutes > 0) {
    return `${minutes}m remaining`;
  } else {
    return "Less than 1m remaining";
  }
};

/**
 * Check if investment should be refreshed from server
 */
export const shouldRefreshInvestment = (
  investment: InvestmentData,
  lastFetch: Date,
  refreshThresholdMinutes: number = 5
): boolean => {
  const now = new Date();
  const endTime = new Date(investment.endDate);
  const lastFetchTime = lastFetch.getTime();
  const currentTime = now.getTime();

  // Always refresh if completed
  if (currentTime >= endTime.getTime()) {
    return true;
  }

  // Refresh if it's been too long since last fetch
  const timeSinceLastFetch = currentTime - lastFetchTime;
  const refreshThreshold = refreshThresholdMinutes * 60 * 1000; // Convert to milliseconds
  
  return timeSinceLastFetch > refreshThreshold;
};
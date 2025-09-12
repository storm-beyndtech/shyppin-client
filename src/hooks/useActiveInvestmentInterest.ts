import { useState, useEffect } from 'react';
import { calculateProgressiveInterest, shouldRefreshInvestment } from '@/utils/progressiveInterest';

interface ActiveInvestmentData {
  userId: string;
  totalActiveInterest: number;
  activeInvestmentCount: number;
  timestamp: string;
  investments?: Array<{
    _id: string;
    amount: number;
    startDate: string;
    endDate: string;
    totalInterest: number;
    isCompleted: boolean;
  }>;
}

interface UseActiveInvestmentInterestOptions {
  userId: string;
  enabled?: boolean;
}

export const useActiveInvestmentInterest = ({
  userId,
  enabled = true
}: UseActiveInvestmentInterestOptions) => {
  const [data, setData] = useState<ActiveInvestmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedInterest, setAnimatedInterest] = useState(0);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchActiveInterest = async () => {
    if (!userId || !enabled) return;

    try {
      const response = await fetch(`${url}/users/${userId}/active-investment-interest`);
      if (!response.ok) {
        throw new Error('Failed to fetch active investment interest');
      }
      
      const result: ActiveInvestmentData = await response.json();
      setData(result);
      setLastFetch(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Initialize animated interest when data first loads
  useEffect(() => {
    if (data && data.investments && data.investments.length > 0) {
      // Calculate initial interest from investments
      let totalCurrentInterest = 0;
      data.investments.forEach(investment => {
        const currentInterest = calculateProgressiveInterest({
          startDate: investment.startDate,
          endDate: investment.endDate,
          totalInterest: investment.totalInterest,
          isCompleted: investment.isCompleted
        });
        totalCurrentInterest += currentInterest;
      });
      setAnimatedInterest(Math.round(totalCurrentInterest * 100) / 100);
    } else if (data && data.totalActiveInterest) {
      // Fallback to server value if no investment details
      setAnimatedInterest(data.totalActiveInterest);
    }
  }, [data]);

  // Initial fetch only (no auto-refresh)
  useEffect(() => {
    if (!enabled) return;
    fetchActiveInterest();
  }, [userId, enabled]);

  // Client-side progressive calculation with smart refresh
  useEffect(() => {
    if (!data || !lastFetch) return;

    const interval = setInterval(() => {
      // Check if we should refresh from server
      let shouldRefresh = false;
      
      if (data.investments) {
        // Check each investment to see if any should be refreshed
        shouldRefresh = data.investments.some(investment => 
          shouldRefreshInvestment(investment, lastFetch, 5) // Refresh every 5 minutes max
        );
      }

      if (shouldRefresh) {
        fetchActiveInterest();
        return;
      }

      // Calculate current progressive interest client-side
      if (data.investments) {
        let totalCurrentInterest = 0;
        
        data.investments.forEach(investment => {
          const currentInterest = calculateProgressiveInterest({
            startDate: investment.startDate,
            endDate: investment.endDate,
            totalInterest: investment.totalInterest,
            isCompleted: investment.isCompleted
          });
          totalCurrentInterest += currentInterest;
        });

        // Set the calculated interest directly (no smooth animation to avoid drift)
        const roundedInterest = Math.round(totalCurrentInterest * 100) / 100;
        setAnimatedInterest(roundedInterest);
      }
    }, 1000); // Update every second for smooth animation

    return () => clearInterval(interval);
  }, [data, lastFetch]);

  // Return the hook values

  return {
    data,
    loading,
    error,
    animatedInterest,
    refetch: fetchActiveInterest,
    hasActiveInvestments: (data?.activeInvestmentCount ?? 0) > 0
  };
};
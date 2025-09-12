import { useState, useEffect } from 'react';

interface ActiveInvestmentData {
  userId: string;
  totalActiveInterest: number;
  activeInvestmentCount: number;
  timestamp: string;
}

interface UseActiveInvestmentInterestOptions {
  userId: string;
  refreshInterval?: number; // in milliseconds, default 60 seconds
  enabled?: boolean;
}

export const useActiveInvestmentInterest = ({
  userId,
  refreshInterval = 60000,
  enabled = true
}: UseActiveInvestmentInterestOptions) => {
  const [data, setData] = useState<ActiveInvestmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedInterest, setAnimatedInterest] = useState(0);
  
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
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Smooth animation for interest growth
  useEffect(() => {
    if (!data) return;

    const difference = data.totalActiveInterest - animatedInterest;
    if (Math.abs(difference) > 0.01) {
      const increment = difference * 0.1; // Smooth animation
      const timer = setTimeout(() => {
        setAnimatedInterest(prev => Math.round((prev + increment) * 100) / 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data?.totalActiveInterest, animatedInterest]);

  // Initial fetch and interval setup
  useEffect(() => {
    if (!enabled) return;

    fetchActiveInterest();

    // Set up interval for periodic updates
    const interval = setInterval(fetchActiveInterest, refreshInterval);
    
    return () => clearInterval(interval);
  }, [userId, refreshInterval, enabled]);

  // Update animated interest when data changes initially
  useEffect(() => {
    if (data && animatedInterest === 0) {
      setAnimatedInterest(data.totalActiveInterest);
    }
  }, [data]);

  return {
    data,
    loading,
    error,
    animatedInterest,
    refetch: fetchActiveInterest,
    hasActiveInvestments: (data?.activeInvestmentCount ?? 0) > 0
  };
};
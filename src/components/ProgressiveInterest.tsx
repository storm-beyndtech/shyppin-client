import { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, TrendingUp, RefreshCw } from 'lucide-react';
import { formatCurrencyClean } from '@/utils/formatters';

interface ProgressiveInterestProps {
	investmentId: string;
	initialData?: {
		totalAmount: number;
		totalInterest: number;
		currentInterest: number;
		progress: number;
		timeRemaining: string;
		isCompleted: boolean;
	};
	refreshInterval?: number; // in milliseconds, default 10 seconds
}

interface InvestmentProgress {
	investmentId: string;
	status: string;
	totalAmount: number;
	totalInterest: number;
	currentInterest: number;
	progress: number;
	timeRemaining: string;
	startDate: string;
	endDate: string;
	isCompleted: boolean;
}

const ProgressiveInterest: React.FC<ProgressiveInterestProps> = ({
	investmentId,
	initialData,
	refreshInterval = 10000, // 10 seconds default
}) => {
	const [progress, setProgress] = useState<InvestmentProgress | null>(
		initialData ? {
			investmentId,
			status: initialData.isCompleted ? 'completed' : 'active',
			...initialData,
			startDate: '',
			endDate: '',
		} : null
	);
	const [loading, setLoading] = useState(!initialData);
	const [error, setError] = useState<string | null>(null);
	const [animatedInterest, setAnimatedInterest] = useState(initialData?.currentInterest || 0);

	const fetchProgress = async () => {
		try {
			const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
			const response = await fetch(`${url}/plans/investment/${investmentId}/progress`);
			if (!response.ok) {
				throw new Error('Failed to fetch investment progress');
			}
			const data: InvestmentProgress = await response.json();
			setProgress(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	};

	// Initialize animated interest when progress data first loads
	useEffect(() => {
		if (progress && progress.currentInterest !== undefined) {
			setAnimatedInterest(progress.currentInterest);
		}
	}, [progress?.currentInterest]);

	// Fetch progress on mount
	useEffect(() => {
		if (!initialData) {
			fetchProgress();
		}
	}, [investmentId]);

	// Client-side progressive calculation with smart refresh
	useEffect(() => {
		if (!progress || progress.isCompleted) return;

		const interval = setInterval(() => {
			const now = new Date();
			const startTime = new Date(progress.startDate).getTime();
			const endTime = new Date(progress.endDate).getTime();
			const currentTime = now.getTime();
			
			// Check if investment should be completed first
			if (currentTime >= endTime) {
				// Fetch fresh data when investment completes
				fetchProgress();
				return; // Don't calculate if we're fetching new data
			}
			
			// Calculate progress based on time elapsed
			const totalDuration = endTime - startTime;
			const elapsedTime = Math.max(0, currentTime - startTime);
			const progressRatio = Math.min(elapsedTime / totalDuration, 1);
			
			// Calculate current interest based on time progression
			const calculatedInterest = progress.totalInterest * progressRatio;
			const roundedInterest = Math.round(calculatedInterest * 100) / 100;
			
			// Update the animated interest directly (using functional update to avoid stale closure)
			setAnimatedInterest(roundedInterest);
		}, 1000); // Update every second

		return () => clearInterval(interval);
	}, [progress?.startDate, progress?.endDate, progress?.totalInterest, progress?.isCompleted]);

	if (loading) {
		return (
			<div className="flex items-center justify-center p-4">
				<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
				<span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-red-600 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
				Error: {error}
			</div>
		);
	}

	if (!progress) return null;

	const progressPercentage = Math.min(progress.progress, 100);

	return (
		<div className="space-y-4">
			{/* Interest Display */}
			<div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
						<span className="text-sm font-medium text-green-900 dark:text-green-100">
							Current Interest
						</span>
					</div>
					<div className="flex items-center gap-2">
						{!progress.isCompleted && (
							<div className="flex items-center gap-1 text-xs text-green-700 dark:text-green-300">
								<Clock className="w-3 h-3" />
								<span>{progress.timeRemaining}</span>
							</div>
						)}
						<button
							onClick={fetchProgress}
							disabled={loading}
							className="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/20 rounded transition-colors"
							title="Refresh interest data"
						>
							<RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
						</button>
					</div>
				</div>
				
				<div className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">
					{formatCurrencyClean(animatedInterest)}
				</div>
				
				<div className="text-sm text-green-700 dark:text-green-300">
					of {formatCurrencyClean(progress.totalInterest)} total interest
				</div>
			</div>

			{/* Progress Bar */}
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-gray-600 dark:text-gray-400">Progress</span>
					<span className="text-gray-900 dark:text-gray-100 font-medium">
						{progressPercentage.toFixed(1)}%
					</span>
				</div>
				
				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
					<div 
						className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
						style={{ width: `${progressPercentage}%` }}
					/>
				</div>
			</div>

			{/* Status Indicator */}
			{progress.isCompleted ? (
				<div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
					<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
					<span className="font-medium">Investment completed - funds credited to your account</span>
				</div>
			) : (
				<div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
					<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
					<span>Interest accruing - {progress.timeRemaining} remaining</span>
				</div>
			)}
		</div>
	);
};

export default ProgressiveInterest;
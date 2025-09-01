import type React from "react";
import { useState, useEffect } from "react";
import { Check, X, Shield } from "lucide-react";
import { contextData } from "@/context/AuthContext";
import { useToastUtils } from "@/services/toast";

// TypeScript interfaces
interface InvestmentPlan {
	_id: string;
	name: string;
	description: string;
	roi: number;
	minAmount: number;
	duration: string;
	features: string[];
}

const InvestmentPlan: React.FC = () => {
	const [plans, setPlans] = useState<InvestmentPlan[]>([]);
	const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [investmentAmount, setInvestmentAmount] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const { user } = contextData();
	const { showSuccessToast, showErrorToast } = useToastUtils();

	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	// Fetch plans with proper error handling
	const fetchPlans = async (): Promise<void> => {
		try {
			const response = await fetch(`${url}/plans`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: InvestmentPlan[] = await response.json();
			setPlans(data);
		} catch (error: any) {
			console.error("Error fetching plans:", error);
			showErrorToast(error.message || "Error Fetching Plans");
		}
	};

	useEffect(() => {
		fetchPlans();
	}, []);

	const handlePlanSelect = (plan: InvestmentPlan): void => {
		setSelectedPlan(plan);
		setShowModal(true);
		setInvestmentAmount("");
	};

	const handleInvestment = async () => {
		if (!selectedPlan) return;

		setIsSubmitting(true);

		const amount = parseFloat(investmentAmount);

		if (isNaN(amount) || amount <= 0) {
			showErrorToast("Please enter a valid investment amount");
			setIsSubmitting(false);
			return;
		}

		if (amount < selectedPlan.minAmount) {
			showErrorToast(`Minimum investment is $${selectedPlan.minAmount.toLocaleString()}`);
			setIsSubmitting(false);
			return;
		}

		if (amount > user.deposit) {
			showErrorToast(`Insufficient balance. Available: $${user.deposit.toLocaleString()}`);
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch(`${url}/plans/invest`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					planId: selectedPlan._id,
					amount: amount,
					interest: (parseFloat(investmentAmount) * selectedPlan.roi) / 100,
					userId: user._id,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				showSuccessToast(`Investment of $${amount.toLocaleString()} created successfully!`);
				setShowModal(false);
				setSelectedPlan(null);
				setInvestmentAmount("");
			} else {
				throw new Error(data.message || "Failed to create investment");
			}
		} catch (error: any) {
			showErrorToast(error.message || "Failed to create investment");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = (): boolean => {
		const amount = parseFloat(investmentAmount);
		return !isNaN(amount) && amount > 0 && selectedPlan !== null;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-3xl font-light text-slate-900 dark:text-white mb-2">Investment Plans</h1>
					<p className="text-slate-600 dark:text-slate-400">Choose your investment strategy</p>
				</div>

				{/* Plans Grid */}
				<div className="grid lg:grid-cols-3 gap-8">
					{plans.map((plan: InvestmentPlan) => {
						return (
							<div
								key={plan._id}
								className="group relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-2xl p-8 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:border-white/50 dark:hover:border-slate-600/50 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2"
								onClick={() => handlePlanSelect(plan)}
							>
								{/* Glassmorphism overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-700/10 rounded-2xl"></div>

								{/* Content */}
								<div className="relative z-10">
									{/* Icon & Title */}
									<div className="flex items-center space-x-4 mb-6">
										<div className="p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/20">
											<Shield className="w-6 h-6 text-slate-700 dark:text-slate-300" />
										</div>
										<h3 className="text-xl font-medium text-slate-900 dark:text-white">{plan.name}</h3>
                  </div>
                  

									{/* Price Display */}
									<div className="mb-6">
										<div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
											${plan.minAmount.toLocaleString()}+
										</div>
										<div className="text-2xl font-light text-slate-900 dark:text-white">
											{plan.roi}
											<span className="text-lg text-slate-500 dark:text-slate-400">% ROI</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm">
										{plan.description}
									</p>

									{/* Duration */}
									<div className="mb-6">
										<div className="flex items-center space-x-3">
											<div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
												<Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
											</div>
											<span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
												{plan.duration}
											</span>
										</div>
									</div>

									{/* Features */}
									<div className="space-y-3 mb-8">
										{plan.features.slice(0, 3).map((feature: string, index: number) => (
											<div key={index} className="flex items-center space-x-3">
												<div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
													<Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
												</div>
												<span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
											</div>
										))}
									</div>

									{/* CTA Button */}
									<button
										className="w-full py-2.5 px-6 bg-slate-900/80 dark:bg-white/90 text-white dark:text-slate-900 font-medium rounded-lg transition-all duration-300 hover:bg-slate-900 dark:hover:bg-white backdrop-blur-sm border border-slate-800/20 dark:border-white/20 hover:scale-105"
										type="button"
										aria-label={`Start investment with ${plan.name} plan`}
									>
										Start Investment
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Investment Modal */}
			{showModal && selectedPlan && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
					<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20 dark:border-slate-700/30">
						{/* Glassmorphism overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-slate-800/20 rounded-2xl"></div>

						<div className="relative z-10">
							<div className="flex justify-between items-center mb-8">
								<div>
									<h3 className="text-2xl font-light text-slate-900 dark:text-white">{selectedPlan.name}</h3>
									<p className="text-slate-600 dark:text-slate-400 text-sm">
										{selectedPlan.roi}% ROI • {selectedPlan.duration}
									</p>
								</div>
								<button
									onClick={() => setShowModal(false)}
									className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/20 rounded-xl transition-colors"
									type="button"
									aria-label="Close modal"
								>
									<X className="w-5 h-5 text-slate-500" />
								</button>
							</div>

							<div className="mb-6">
								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
									Investment Amount
								</label>
								<div className="relative">
									<span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400">
										$
									</span>
									<input
										type="number"
										value={investmentAmount}
										onChange={(e) => setInvestmentAmount(e.target.value)}
										placeholder={`Min ${selectedPlan.minAmount.toLocaleString()}`}
										className="w-full pl-8 pr-4 py-4 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none backdrop-blur-sm transition-all"
										min={selectedPlan.minAmount}
										max={user.deposit}
										step="1"
										required
									/>
								</div>
								<div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
									Available: ${user.deposit.toLocaleString()}
								</div>
							</div>

							{investmentAmount && !isNaN(parseFloat(investmentAmount)) && (
								<div className="mb-6 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
									<div className="text-sm text-emerald-700 dark:text-emerald-400 mb-1">
										Expected Return (after {selectedPlan.duration})
									</div>
									<div className="text-xl font-medium text-emerald-800 dark:text-emerald-300">
										${((parseFloat(investmentAmount) * selectedPlan.roi) / 100).toLocaleString()}
									</div>
									<div className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
										Total: $
										{(
											parseFloat(investmentAmount) +
											(parseFloat(investmentAmount) * selectedPlan.roi) / 100
										).toLocaleString()}
									</div>
								</div>
							)}

							<div className="flex gap-4">
								<button
									onClick={() => setShowModal(false)}
									className="flex-1 py-3 px-6 border border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700/20 transition-all backdrop-blur-sm"
									type="button"
								>
									Cancel
								</button>
								<button
									onClick={handleInvestment}
									disabled={isSubmitting || !isFormValid()}
									className="flex-1 py-3 px-6 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 backdrop-blur-sm border border-blue-400/30 hover:scale-105"
									type="button"
								>
									{isSubmitting ? "Processing..." : "Proceed"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default InvestmentPlan;

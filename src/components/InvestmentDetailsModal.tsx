import React from "react";
import { TrendingUp, BarChart3, PieChart, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface User {
	id: string;
	email: string;
	name: string;
}

interface PlanData {
	plan: string;
	duration: string;
	interest: number;
}

interface ITransaction {
	_id: string;
	type: string;
	user: User;
	status: "pending" | "approved" | "rejected" | "completed";
	amount: number;
	date: string;
	planData: PlanData;
}

interface InvestmentDetailsModalProps {
	investment: ITransaction | null;
	onClose: () => void;
}

const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({ investment, onClose }) => {
	if (!investment) return null;
	const startDate = new Date(investment.date);
	const maturityDate = new Date(startDate);
	maturityDate.setDate(startDate.getDate() + parseInt(investment.planData.duration));

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "completed":
				return <ArrowUpRight className="w-4 h-4 text-green-500" />;
			case "rejected":
				return <ArrowDownRight className="w-4 h-4 text-red-500" />;
			default:
				return <Activity className="w-4 h-4 text-blue-500" />;
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
			<div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white/20 rounded-lg">
								<TrendingUp className="w-6 h-6" />
							</div>
							<div>
								<h2 className="text-xl font-bold">Investment Details</h2>
								<p className="text-blue-100">Transaction ID: {investment._id.slice(-8)}</p>
							</div>
						</div>
						<button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{/* Status and Progress */}
					<div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								{getStatusIcon(investment.status)}
								<span className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
									{investment.status}
								</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								{new Date(investment.date).toLocaleDateString()}
							</div>
						</div>

						{/* Progress Bar */}
						<div className="mb-4">
							<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
								<span>Progress</span>
								<span>
									{investment.status === "completed"
										? "100%"
										: investment.status === "approved"
										? "50%"
										: "25%"}
								</span>
							</div>
							<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
								<div
									className={`h-2 rounded-full transition-all duration-500 ${
										investment.status === "completed"
											? "bg-green-500 w-full"
											: investment.status === "approved"
											? "bg-blue-500 w-1/2"
											: investment.status === "rejected"
											? "bg-red-500 w-1/4"
											: "bg-yellow-500 w-1/4"
									}`}
								/>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4 text-center">
							<div
								className={`p-2 rounded-lg ${
									investment.status !== "pending"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Created</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">✓</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "approved" || investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Approved</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "approved" || investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Matured</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
						</div>
					</div>

					{/* Financial Summary */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-blue-500 rounded-lg">
									<TrendingUp className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-blue-900 dark:text-blue-100">Principal Amount</h3>
							</div>
							<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
								${investment.amount.toLocaleString()}
							</p>
						</div>

						<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-green-500 rounded-lg">
									<BarChart3 className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-green-900 dark:text-green-100">Interest Earned</h3>
							</div>
							<p className="text-2xl font-bold text-green-900 dark:text-green-100">
								${investment.planData.interest}
							</p>
							<p className="text-sm text-green-700 dark:text-green-300">
								{(investment.planData.interest / investment.amount) * 100}% return
							</p>
						</div>

						<div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-purple-500 rounded-lg">
									<PieChart className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-purple-900 dark:text-purple-100">Total Return</h3>
							</div>
							<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
								${(investment.amount + investment.planData.interest).toLocaleString()}
							</p>
							<p className="text-sm text-purple-700 dark:text-purple-300">
								{((investment.planData.interest / investment.amount) * 100)}% gain
							</p>
						</div>
					</div>

					{/* Investment Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investment Plan</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Plan Type</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.planData.plan}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Duration</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.planData.duration} days
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{(investment.planData.interest / investment.amount) * 100}%
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Status</span>
									<span
										className={`font-medium capitalize ${
											investment.status === "completed"
												? "text-green-600 dark:text-green-400"
												: investment.status === "approved"
												? "text-blue-600 dark:text-blue-400"
												: investment.status === "rejected"
												? "text-red-600 dark:text-red-400"
												: "text-yellow-600 dark:text-yellow-400"
										}`}
									>
										{investment.status}
									</span>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Start Date</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{startDate.toLocaleDateString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Maturity Date</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{maturityDate.toLocaleDateString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.status === "completed"
											? "Completed"
											: Math.max(
													0,
													Math.ceil((maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
											  )}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Investment ID</span>
									<span className="font-mono text-sm text-gray-900 dark:text-white">
										{investment._id.slice(-12)}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Investor Information */}
					<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investor Information</h3>
						<div className="flex items-center gap-4">
							<img
								src={`https://robohash.org/${investment.user.id}`}
								alt="Avatar"
								className="w-12 h-12 rounded-full"
							/>
							<div>
								<p className="font-medium text-gray-900 dark:text-white">{investment.user.name}</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">{investment.user.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvestmentDetailsModal;

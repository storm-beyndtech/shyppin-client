import { Transaction } from "@/pages/Dashboard/InvestmentLog";
import { TrendingUp, Shield, Users, Check, Clock, X, Calendar } from "lucide-react";

interface InvestmentSheetProps {
	investment: Transaction | null;
	isOpen: boolean;
	onClose: () => void;
}

const InvestmentSheet: React.FC<InvestmentSheetProps> = ({ investment, isOpen, onClose }) => {
	if (!isOpen || !investment) return null;

	// Generate transaction number from ID and date
	const generateTransactionNumber = (transaction: Transaction) => {
		const date = new Date(transaction.date);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const shortId = transaction._id.slice(-4).toUpperCase();
		return `INV-${year}${month}${day}-${shortId}`;
	};

	const getStatusBadge = (status: string) => {
		const statusConfig: Record<string, string> = {
			completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			active: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
			cancelled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
			pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
		};

		return (
			<span
				className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
					statusConfig[status] || "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
				}`}
			>
				{status === "active" && <Clock className="w-4 h-4 mr-2" />}
				{status === "completed" && <Check className="w-4 h-4 mr-2" />}
				{status === "cancelled" && <X className="w-4 h-4 mr-2" />}
				{status === "pending" && <Clock className="w-4 h-4 mr-2" />}
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	const getPlanIcon = (planName: string) => {
		const name = planName?.toLowerCase();
		if (name?.includes("basic")) {
			return <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
		}
		if (name?.includes("pro")) {
			return <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />;
		}
		if (name?.includes("expert")) {
			return <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
		}
		return <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

			{/* Sheet */}
			<div className="fixed right-0 top-0 h-full w-full max-w-md sm:max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 z-50 shadow-2xl">
				<div className="h-full flex flex-col">
					{/* Header */}
					<div className="flex-shrink-0 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
									Investment Details
								</h2>
								<p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
									{generateTransactionNumber(investment)}
								</p>
							</div>
							<button
								onClick={onClose}
								className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
						{/* Status and Amount */}
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-6">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									{getPlanIcon(investment.planData.plan)}
									<div>
										<h3 className="font-semibold text-slate-900 dark:text-slate-100">
											{investment.planData.plan}
										</h3>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											{investment.planData.duration}
										</p>
									</div>
								</div>
								{getStatusBadge(investment.status)}
							</div>

							<div className="text-center space-y-4">
								<div>
									<div className="flex items-center justify-center gap-2 mb-1">
										<p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
											{formatCurrency(investment.amount)}
										</p>
									</div>
									<p className="text-sm text-slate-500 dark:text-slate-400">Investment Amount</p>
								</div>

								<div>
									<div className="flex items-center justify-center gap-2 mb-1">
										<p className="text-2xl font-bold text-green-600 dark:text-green-400">
											{formatCurrency(investment.planData.interest)}
										</p>
									</div>
									<p className="text-sm text-slate-500 dark:text-slate-400">Expected Return</p>
								</div>
							</div>
						</div>

						{/* Investment Details */}
						<div className="space-y-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100">Investment Details</h4>
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<div className="flex items-center gap-3 mb-2">
									<Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
									<p className="font-medium text-slate-900 dark:text-slate-100">Investment Date</p>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-400">{formatDate(investment.date)}</p>
							</div>
						</div>

						{/* Summary */}
						<div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Investment Summary</h4>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Principal Amount</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{formatCurrency(investment.amount)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Expected Return</span>
									<span className="font-medium text-green-600 dark:text-green-400">
										{formatCurrency(investment.planData.interest)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Total Payout</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{formatCurrency(investment.amount + investment.planData.interest)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Interest Rate</span>
									<span className="font-medium text-emerald-600 dark:text-emerald-400">
										{((investment.planData.interest / investment.amount) * 100).toFixed(2)} %
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Duration</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{investment.planData.duration}
									</span>
								</div>
								<div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
									<span className="font-medium text-slate-900 dark:text-slate-100">Status</span>
									{getStatusBadge(investment.status)}
								</div>
							</div>
						</div>

						{/* User Information */}
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Investor Information</h4>
							<div className="space-y-2">
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Name</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{investment.user.name}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Email</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{investment.user.email}
									</span>
								</div>
							</div>
						</div>

						{/* Status-based Messages */}
						{investment.status === "completed" && (
							<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
								<h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
									Investment Completed
								</h4>
								<p className="text-sm text-green-800 dark:text-green-200">
									Congratulations! Your investment has matured successfully. The total payout of{" "}
									<span className="font-bold">
										{formatCurrency(investment.amount + investment.planData.interest)}
									</span>{" "}
									has been credited to your account.
								</p>
							</div>
						)}

						{investment.status === "cancelled" && (
							<div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
								<h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Investment Cancelled</h4>
								<p className="text-sm text-red-800 dark:text-red-200">
									This investment was cancelled. Your principal amount of{" "}
									<span className="font-bold">{formatCurrency(investment.amount)}</span> has been refunded to
									your account.
								</p>
							</div>
						)}

						{investment.status === "pending" && (
							<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
								<h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
									Investment Pending
								</h4>
								<p className="text-sm text-yellow-800 dark:text-yellow-200">
									Your investment is currently being processed. You will receive a confirmation once the
									transaction is verified and activated.
								</p>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="flex-shrink-0 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700">
						<button
							onClick={onClose}
							className="w-fit px-7 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default InvestmentSheet;

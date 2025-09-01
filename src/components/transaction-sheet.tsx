import { ArrowDownLeft, ArrowUpRight, TrendingUp, DollarSign, Wallet, X, Calendar } from "lucide-react";

interface Transaction {
	_id: string;
	type: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
	status: string;
	amount: number;
	date: string;
	walletData?: {
		address: string;
		network: string;
		coinName: string;
		convertedAmount: number;
	};
	planData?: {
		plan: string;
		duration: string;
		interest: number;
	};
	transactionNumber?: string;
}

interface TransactionSheetProps {
	transaction: Transaction | null;
	isOpen: boolean;
	onClose: () => void;
}

const TransactionSheet: React.FC<TransactionSheetProps> = ({ transaction, isOpen, onClose }) => {
	if (!isOpen || !transaction) return null;

	const getStatusBadge = (status: string) => {
		const statusConfig: Record<string, string> = {
			approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
			active: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
			rejected: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
			cancelled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
		};

		return (
			<span
				className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
					statusConfig[status] || "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
				}`}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	const getTransactionIcon = (type: string) => {
		switch (type) {
			case "deposit":
				return <ArrowDownLeft className="w-6 h-6 text-green-600 dark:text-green-400" />;
			case "withdrawal":
				return <ArrowUpRight className="w-6 h-6 text-red-600 dark:text-red-400" />;
			case "investment":
				return <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
			case "investment_payout":
				return <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
			case "investment_refund":
				return <Wallet className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
			default:
				return <DollarSign className="w-6 h-6 text-slate-600 dark:text-slate-400" />;
		}
	};

	const getTypeDisplayName = (type: string) => {
		switch (type) {
			case "deposit":
				return "Deposit";
			case "withdrawal":
				return "Withdrawal";
			case "investment":
				return "Investment";
			case "investment_payout":
				return "Investment Payout";
			case "investment_refund":
				return "Investment Refund";
			default:
				return type.charAt(0).toUpperCase() + type.slice(1);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB");
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
									Transaction Details
								</h2>
								<p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Transaction information</p>
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
						{/* Transaction Overview */}
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-6">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									{getTransactionIcon(transaction.type)}
									<div>
										<h3 className="font-semibold text-slate-900 dark:text-slate-100">
											{getTypeDisplayName(transaction.type)}
										</h3>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											{transaction.walletData?.network || transaction.planData?.plan || "Transaction"}
										</p>
									</div>
								</div>
								{getStatusBadge(transaction.status)}
							</div>

							<div className="text-center space-y-4">
								<div>
									<div className="flex items-center justify-center gap-2 mb-1">
										<p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
											{formatCurrency(transaction.amount)}
										</p>
									</div>
									<p className="text-sm text-slate-500 dark:text-slate-400">Transaction Amount</p>
								</div>

								{transaction.walletData &&
									(transaction.type === "deposit" || transaction.type === "withdrawal") && (
										<div>
											<p className="text-lg font-medium text-slate-700 dark:text-slate-300">
												{transaction.walletData.convertedAmount?.toFixed(6)}{" "}
												{transaction.walletData.coinName?.toUpperCase()}
											</p>
											<p className="text-sm text-slate-500 dark:text-slate-400">Crypto Amount</p>
										</div>
									)}

								{transaction.planData &&
									(transaction.type === "investment" ||
										transaction.type === "investment_payout" ||
										transaction.type === "investment_refund") && (
										<div>
											<div className="flex items-center justify-center gap-2 mb-1">
												<p className="text-2xl font-bold text-green-600 dark:text-green-400">
													{formatCurrency(transaction.planData.interest)}
												</p>
											</div>
											<p className="text-sm text-slate-500 dark:text-slate-400">Expected Return</p>

											<div className="flex items-center justify-center gap-4 pt-2">
												<div className="text-center">
													<p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
														{(transaction.planData.interest / transaction.amount) * 100}%
													</p>
													<p className="text-xs text-slate-500 dark:text-slate-400">Interest Rate</p>
												</div>
												<div className="text-center">
													<p className="text-lg font-medium text-slate-700 dark:text-slate-300">
														{transaction.planData.duration}
													</p>
													<p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
												</div>
											</div>
										</div>
									)}
							</div>
						</div>

						{/* Wallet Details (for deposit and withdrawal transactions) */}
						{transaction.walletData &&
							(transaction.type === "deposit" || transaction.type === "withdrawal") && (
								<div className="space-y-4">
									<h4 className="font-semibold text-slate-900 dark:text-slate-100">Wallet Information</h4>

									{/* Network & Coin */}
									<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
										<div className="flex items-center gap-3">
											<Wallet className="w-4 h-4 text-slate-500 dark:text-slate-400" />
											<div className="flex-1">
												<p className="font-medium text-slate-900 dark:text-slate-100">Network</p>
												<p className="text-sm text-slate-600 dark:text-slate-400">
													{transaction.walletData.network}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<DollarSign className="w-4 h-4 text-slate-500 dark:text-slate-400" />
											<div className="flex-1">
												<p className="font-medium text-slate-900 dark:text-slate-100">Cryptocurrency</p>
												<p className="text-sm text-slate-600 dark:text-slate-400">
													{transaction.walletData.coinName} • {transaction.walletData.convertedAmount}
												</p>
											</div>
										</div>
										{transaction.walletData.address && (
											<div className="flex items-start gap-3">
												<Wallet className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5" />
												<div className="flex-1">
													<p className="font-medium text-slate-900 dark:text-slate-100">Wallet Address</p>
													<p className="text-sm text-slate-600 dark:text-slate-400 break-all">
														{transaction.walletData.address}
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							)}

						{/* Plan Details (for investment transactions) */}
						{transaction.planData &&
							(transaction.type === "investment" ||
								transaction.type === "investment_payout" ||
								transaction.type === "investment_refund") && (
								<div className="space-y-4">
									<h4 className="font-semibold text-slate-900 dark:text-slate-100">Investment Plan</h4>

									<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span className="text-slate-600 dark:text-slate-400">Plan Name</span>
												<span className="font-medium text-slate-900 dark:text-slate-100">
													{transaction.planData.plan}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-slate-600 dark:text-slate-400">Duration</span>
												<span className="font-medium text-slate-900 dark:text-slate-100">
													{transaction.planData.duration}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-slate-600 dark:text-slate-400">Interest Rate</span>
												<span className="font-medium text-emerald-600 dark:text-emerald-400">
													{(transaction.planData.interest / transaction.amount) * 100}%
												</span>
											</div>
										</div>
									</div>
								</div>
							)}

						{/* Transaction Details */}
						<div className="space-y-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100">Transaction Details</h4>

							{/* Date */}
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<div className="flex items-center gap-3 mb-2">
									<Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
									<p className="font-medium text-slate-900 dark:text-slate-100">Transaction Date</p>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-400">{formatDate(transaction.date)}</p>
							</div>
						</div>

						{/* User Information */}
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Account Information</h4>
							<div className="space-y-2">
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Name</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{transaction.user.name}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Email</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{transaction.user.email}
									</span>
								</div>
							</div>
						</div>

						{/* Summary */}
						<div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Summary</h4>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Type</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{getTypeDisplayName(transaction.type)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Amount</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{formatCurrency(transaction.amount)}
									</span>
								</div>
								{transaction.walletData &&
									(transaction.type === "deposit" || transaction.type === "withdrawal") && (
										<div className="flex justify-between items-center">
											<span className="text-slate-600 dark:text-slate-400">Crypto Amount</span>
											<span className="font-medium text-slate-900 dark:text-slate-100">
												{transaction.walletData.convertedAmount?.toFixed(6)}{" "}
												{transaction.walletData.coinName?.toUpperCase()}
											</span>
										</div>
									)}
								{transaction.planData &&
									(transaction.type === "investment" ||
										transaction.type === "investment_payout" ||
										transaction.type === "investment_refund") && (
										<div className="flex justify-between items-center">
											<span className="text-slate-600 dark:text-slate-400">Expected Return</span>
											<span className="font-medium text-green-600 dark:text-green-400">
												{formatCurrency(transaction.planData.interest)}
											</span>
										</div>
									)}
								{transaction.planData &&
									(transaction.type === "investment" ||
										transaction.type === "investment_payout" ||
										transaction.type === "investment_refund") && (
										<div className="flex justify-between items-center">
											<span className="text-slate-600 dark:text-slate-400">Total Payout</span>
											<span className="font-medium text-slate-900 dark:text-slate-100">
												{formatCurrency(transaction.amount + transaction.planData.interest)}
											</span>
										</div>
									)}
								<div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
									<span className="font-medium text-slate-900 dark:text-slate-100">Status</span>
									{getStatusBadge(transaction.status)}
								</div>
							</div>
						</div>

						{/* Status Info */}
						{transaction.status === "pending" && (
							<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
								<h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
									Pending Transaction
								</h4>
								<p className="text-sm text-yellow-800 dark:text-yellow-200">
									Your transaction is being processed. This may take a few minutes to complete.
								</p>
							</div>
						)}

						{transaction.status === "active" && transaction.type === "investment" && (
							<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
								<h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Investment Active</h4>
								<p className="text-sm text-blue-800 dark:text-blue-200">
									Your investment is currently active and earning returns. You will receive your payout when
									the investment period ends.
								</p>
							</div>
						)}

						{transaction.status === "approved" && (
							<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
								<h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
									Transaction Approved
								</h4>
								<p className="text-sm text-green-800 dark:text-green-200">
									Your transaction has been successfully approved and processed.
								</p>
							</div>
						)}

						{transaction.status === "completed" && (
							<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
								<h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
									Transaction Completed
								</h4>
								<p className="text-sm text-green-800 dark:text-green-200">
									Your transaction has been successfully completed.
									{transaction.type === "investment" && transaction.planData && (
										<>
											{" "}
											The total payout of {formatCurrency(
												transaction.amount + transaction.planData.interest,
											)}{" "}
											has been credited to your account.
										</>
									)}
								</p>
							</div>
						)}

						{(transaction.status === "rejected" || transaction.status === "cancelled") && (
							<div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
								<h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
									Transaction {transaction.status === "rejected" ? "Rejected" : "Cancelled"}
								</h4>
								<p className="text-sm text-red-800 dark:text-red-200">
									This transaction was {transaction.status}.
									{transaction.type === "investment" && (
										<> Your principal amount has been refunded to your account.</>
									)}{" "}
									Please contact support if you need assistance.
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

export default TransactionSheet;

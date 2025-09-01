import { CreditCard, Copy, Check, Bitcoin, Clock, X, Wallet, Network, ArrowDownLeft } from "lucide-react";
import { useState } from "react";
import { useToastUtils } from "@/services/toast";

interface Withdrawal {
	_id: string;
	transactionNumber: string;
	amount: number;
	convertedAmount: number;
	coinName: string;
	address: string;
	network: string;
	status: "pending" | "approved" | "rejected";
	date: string;
	userId: string;
}

interface WithdrawalSheetProps {
	withdrawal: Withdrawal | null;
	isOpen: boolean;
	onClose: () => void;
}

const WithdrawalSheet: React.FC<WithdrawalSheetProps> = ({ withdrawal, isOpen, onClose }) => {
	const [copied, setCopied] = useState(false);
	const { showSuccessToast } = useToastUtils();

	if (!isOpen || !withdrawal) return null;

	const copyToClipboard = async (text: string, label: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			showSuccessToast(`${label} copied to clipboard`);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	const getStatusBadge = (status: string) => {
		const statusConfig: Record<string, string> = {
			approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
			rejected: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
		};

		return (
			<span
				className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
					statusConfig[status] || "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
				}`}
			>
				{status === "pending" && <Clock className="w-4 h-4 mr-2" />}
				{status === "approved" && <Check className="w-4 h-4 mr-2" />}
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	const getCoinIcon = (coinName: string) => {
		const name = coinName?.toLowerCase();
		if (name?.includes("bitcoin") || name?.includes("btc")) {
			return <Bitcoin className="w-6 h-6 text-orange-500" />;
		}
		return <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />;
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

	const formatAddress = (address: string) => {
		if (address.length <= 12) return address;
		return `${address.slice(0, 6)}...${address.slice(-6)}`;
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
									Withdrawal Details
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
						{/* Status and Amount */}
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-6">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									{getCoinIcon(withdrawal.coinName)}
									<div>
										<h3 className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
											{withdrawal.coinName}
										</h3>
										<p className="text-sm text-slate-500 dark:text-slate-400">Withdrawal</p>
									</div>
								</div>
								{getStatusBadge(withdrawal.status)}
							</div>

							<div className="text-center space-y-3">
								<div>
									<div className="flex items-center justify-center gap-2 mb-1">
										<ArrowDownLeft className="w-6 h-6 text-red-600 dark:text-red-400" />
										<p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
											{formatCurrency(withdrawal.amount)}
										</p>
									</div>
									<p className="text-sm text-slate-500 dark:text-slate-400">USD Amount</p>
								</div>

								<div>
									<p className="text-lg font-medium text-slate-700 dark:text-slate-300">
										{withdrawal.convertedAmount.toFixed(6)} {withdrawal.coinName?.toUpperCase()}
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">Crypto Amount</p>
								</div>
							</div>
						</div>

						{/* Transaction Details */}
						<div className="space-y-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100">Transaction Details</h4>

							{/* Transaction Number */}
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<div className="flex items-center justify-between">
									<div className="flex-1 min-w-0">
										<p className="font-medium text-slate-900 dark:text-slate-100 mb-1">Transaction Number</p>
										<p className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all">
											{withdrawal.transactionNumber}
										</p>
									</div>
									<button
										onClick={() => copyToClipboard(withdrawal.transactionNumber, "Transaction number")}
										className="ml-3 p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
									>
										{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
							</div>

							{/* Wallet Address */}
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<div className="flex items-center justify-between">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<Wallet className="w-4 h-4 text-slate-500" />
											<p className="font-medium text-slate-900 dark:text-slate-100">Wallet Address</p>
										</div>
										<p className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all">
											{withdrawal.address}
										</p>
										<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
											{formatAddress(withdrawal.address)}
										</p>
									</div>
									<button
										onClick={() => copyToClipboard(withdrawal.address, "Wallet address")}
										className="ml-3 p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
									>
										{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
							</div>

							{/* Network */}
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<div className="flex items-center gap-2 mb-1">
									<Network className="w-4 h-4 text-slate-500" />
									<p className="font-medium text-slate-900 dark:text-slate-100">Network</p>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-400 uppercase">{withdrawal.network}</p>
							</div>

							{/* Date */}
							<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
								<p className="font-medium text-slate-900 dark:text-slate-100 mb-1">Created</p>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									{formatDate(withdrawal.date)}
								</p>
							</div>
						</div>

						{/* Summary */}
						<div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
							<h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Summary</h4>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Amount</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{formatCurrency(withdrawal.amount)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Crypto</span>
									<span className="font-medium text-slate-900 dark:text-slate-100">
										{withdrawal.convertedAmount.toFixed(6)} {withdrawal.coinName?.toUpperCase()}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600 dark:text-slate-400">Network</span>
									<span className="font-medium text-slate-900 dark:text-slate-100 uppercase">
										{withdrawal.network}
									</span>
								</div>
								<div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
									<span className="font-medium text-slate-900 dark:text-slate-100">Status</span>
									{getStatusBadge(withdrawal.status)}
								</div>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="flex-shrink-0 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700">
						<button
							onClick={onClose}
							className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default WithdrawalSheet;

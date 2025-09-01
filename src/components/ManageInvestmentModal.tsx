import { AlertCircle, Calendar, CheckCircle, DollarSign, TrendingUp, Users, X, XCircle } from "lucide-react";
import { useState } from "react";

interface User {
	id: string;
	email: string;
	name: string;
}

interface WalletData {
	address?: string;
	network?: string;
	coinName?: string;
	convertedAmount?: number;
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
	walletData: WalletData;
	planData: PlanData;
}

interface ManageInvestmentModalProps {
	toggleModal: (e: boolean) => void;
	investment: ITransaction | null;
}

const ManageInvestmentModal: React.FC<ManageInvestmentModalProps> = ({ toggleModal, investment }) => {
	const [error, setError] = useState<string | null>(null);
	const [successLoading, setSuccessLoading] = useState(false);
	const [rejectedLoading, setRejectedLoading] = useState(false);
	const [completedLoading, setCompletedLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const convertDate = (date: string): string => {
		return new Date(date).toLocaleString();
	};

	const calculateMaturityDate = (startDate: string, duration: string): string => {
		const start = new Date(startDate);
		const durationNum = parseInt(duration);
		const maturity = new Date(start);
		maturity.setDate(start.getDate() + durationNum);
		return maturity.toLocaleDateString();
	};

	const startUpdate = async (status: "approved" | "rejected" | "completed") => {
		setError(null);
		setSuccess(null);

		if (status === "approved") setSuccessLoading(true);
		else if (status === "rejected") setRejectedLoading(true);
		else setCompletedLoading(true);

		try {
			const res = await fetch(`${url}/plans/investment/${investment?._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					status,
				}),
			});

			const data = await res.json();

			if (res.ok) setSuccess(data.message);
			else throw new Error(data.message);
		} catch (error: any) {
			setError(error.message);
			console.log(error.message);
		} finally {
			setSuccessLoading(false);
			setRejectedLoading(false);
			setCompletedLoading(false);
		}
	};

	if (!investment) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
			<div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
							<TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Investment</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">{investment.planData.plan} Plan</p>
						</div>
					</div>
					<button
						onClick={() => toggleModal(false)}
						className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Status Badge */}
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
						<span
							className={`px-3 py-1 rounded-full text-xs font-semibold ${
								investment.status === "pending"
									? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
									: investment.status === "approved"
									? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									: investment.status === "completed"
									? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
									: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
							}`}
						>
							{investment.status.toUpperCase()}
						</span>
					</div>

					{/* User Information */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<Users className="w-4 h-4" />
							Investor Details
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">{investment.user.name}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
									{investment.user.email}
								</p>
							</div>
						</div>
					</div>

					{/* Investment Details */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<DollarSign className="w-4 h-4" />
							Investment Details
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{investment.planData.plan}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{investment.planData.duration} days
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Principal Amount</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									${investment.amount.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{(investment.planData.interest / investment.amount) * 100}%
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Interest Amount</p>
								<p className="text-sm font-medium text-green-600 dark:text-green-400">
									${investment.planData.interest.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Total Return</p>
								<p className="text-sm font-medium text-blue-600 dark:text-blue-400">
									${(investment.planData.interest + investment.amount).toLocaleString()}
								</p>
							</div>
						</div>
          </div>
          

					{/* Timeline */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							Timeline
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Start Date</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{convertDate(investment.date)}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Maturity Date</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{calculateMaturityDate(investment.date, investment.planData.duration)}
								</p>
							</div>
						</div>
					</div>

					{/* Payment Information */}
					{investment.walletData.coinName && (
						<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
							<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								Payment Information
							</h4>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-gray-500 dark:text-gray-400">Method</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{investment.walletData.coinName}
									</p>
								</div>
								<div>
									<p className="text-xs text-gray-500 dark:text-gray-400">Network</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{investment.walletData.network || "N/A"}
									</p>
								</div>
								<div className="col-span-2">
									<p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white break-all">
										{investment.walletData.address || "N/A"}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Success/Error Messages */}
					{error && (
						<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
							<span className="text-sm text-red-700 dark:text-red-300">{error}</span>
						</div>
					)}

					{success && (
						<div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
							<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
							<span className="text-sm text-green-700 dark:text-green-300">{success}</span>
						</div>
					)}

					{/* Action Buttons */}
					{investment.status === "pending" && (
						<div className="flex gap-3">
							<button
								onClick={() => startUpdate("approved")}
								disabled={successLoading}
								className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
							>
								<CheckCircle className="w-4 h-4" />
								{successLoading ? "Approving..." : "Approve"}
							</button>
							<button
								onClick={() => startUpdate("rejected")}
								disabled={rejectedLoading}
								className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
							>
								<XCircle className="w-4 h-4" />
								{rejectedLoading ? "Rejecting..." : "Reject"}
							</button>
						</div>
					)}

					{investment.status === "approved" && (
						<button
							onClick={() => startUpdate("completed")}
							disabled={completedLoading}
							className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
						>
							<TrendingUp className="w-4 h-4" />
							{completedLoading ? "Completing..." : "Mark as Completed"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageInvestmentModal;

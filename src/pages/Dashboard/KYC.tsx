import Header from "@/components/Layouts/KycLayout/Header";
import ProofOfIdentificationForm from "@/components/ProofOfIdentificationForm";
import { contextData } from "@/context/AuthContext";
import { CheckCircle, Clock, XCircle, FileText, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const KYCStatusMessage = ({
	status,
	onResubmit,
	onRefreshStatus,
	onContinueToDashboard,
	isRefreshing,
}: {
	status: string;
	onResubmit: () => void;
	onRefreshStatus: () => void;
	onContinueToDashboard: () => void;
	isRefreshing: boolean;
}) => {
	const getStatusConfig = () => {
		switch (status.toLowerCase()) {
			case "pending":
				return {
					icon: <Clock className="w-8 h-8 text-amber-500" />,
					title: "KYC Under Review",
					description: "Your documents are being reviewed by our team. This usually takes few hours.",
					bgColor:
						"bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
					borderColor: "border-amber-200 dark:border-amber-800/30",
					iconBg: "bg-amber-100 dark:bg-amber-900/30",
					titleColor: "text-amber-900 dark:text-amber-100",
					descColor: "text-amber-700 dark:text-amber-300",
				};
			case "approved":
				return {
					icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
					title: "KYC Verified Successfully",
					description: "Your identity has been verified. You now have full access to all platform features.",
					bgColor:
						"bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
					borderColor: "border-emerald-200 dark:border-emerald-800/30",
					iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
					titleColor: "text-emerald-900 dark:text-emerald-100",
					descColor: "text-emerald-700 dark:text-emerald-300",
				};
			case "rejected":
				return {
					icon: <XCircle className="w-8 h-8 text-red-500" />,
					title: "KYC Verification Failed",
					description:
						"Your documents could not be verified. Please submit new documents or contact support for assistance.",
					bgColor: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
					borderColor: "border-red-200 dark:border-red-800/30",
					iconBg: "bg-red-100 dark:bg-red-900/30",
					titleColor: "text-red-900 dark:text-red-100",
					descColor: "text-red-700 dark:text-red-300",
				};
			default:
				return null;
		}
	};

	const config = getStatusConfig();
	if (!config) return null;

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
			<div className="max-w-2xl w-full">
				<div
					className={`${config.bgColor} ${config.borderColor} border rounded-2xl p-8 shadow-lg backdrop-blur-sm`}
				>
					{/* Status Icon */}
					<div className="text-center mb-6">
						<div
							className={`${config.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
						>
							{config.icon}
						</div>
						<h1 className={`text-2xl font-bold ${config.titleColor} mb-2`}>{config.title}</h1>
						<p className={`${config.descColor} text-center max-w-md mx-auto leading-relaxed`}>
							{config.description}
						</p>
					</div>

					{/* Status Timeline */}
					<div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verification Process</h3>
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
									<CheckCircle className="w-4 h-4 text-white" />
								</div>
								<span className="text-sm text-gray-700 dark:text-gray-300">Documents submitted</span>
							</div>
							<div className="flex items-center gap-3">
								<div
									className={`w-6 h-6 rounded-full flex items-center justify-center ${
										status === "pending"
											? "bg-amber-500"
											: status === "approved"
											? "bg-green-500"
											: "bg-red-500"
									}`}
								>
									{status === "pending" ? (
										<Clock className="w-4 h-4 text-white" />
									) : status === "approved" ? (
										<CheckCircle className="w-4 h-4 text-white" />
									) : (
										<XCircle className="w-4 h-4 text-white" />
									)}
								</div>
								<span className="text-sm text-gray-700 dark:text-gray-300">
									{status === "pending"
										? "Under review"
										: status === "approved"
										? "Verification completed"
										: "Verification failed"}
								</span>
							</div>
							{status === "approved" && (
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
										<CheckCircle className="w-4 h-4 text-white" />
									</div>
									<span className="text-sm text-gray-700 dark:text-gray-300">Full access granted</span>
								</div>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4">
						{status === "rejected" && (
							<button
								onClick={onResubmit}
								className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
							>
								<FileText className="w-4 h-4" />
								Resubmit Documents
							</button>
						)}
						<button
							onClick={onRefreshStatus}
							disabled={isRefreshing}
							className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
						>
							<RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
							{isRefreshing ? "Refreshing..." : "Refresh Status"}
						</button>
						{status === "approved" && (
							<button
								onClick={onContinueToDashboard}
								className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
							>
								Continue to Dashboard
							</button>
						)}
					</div>

					{/* Additional Info */}
					<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
						<div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
							<p>Need help? Contact our support team</p>
							<div className="flex items-center gap-4 mt-2 sm:mt-0">
								<Link
									to="/support"
									className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
									support@Profyt-Opt.com
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function KYC() {
	const { user, login } = contextData();
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	// Check if user has already submitted KYC
	const hasSubmittedKYC = user?.kycStatus && user.kycStatus !== "notSubmitted" && !showForm;
	console.log(user);
	const handleResubmit = () => {
		setShowForm(true);
	};

	const handleRefreshStatus = async () => {
		setIsRefreshing(true);
		try {
			const res = await fetch(`${url}/users/${user._id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const data = await res.json();
				login(data.user);
			} else {
				console.error("Failed to refresh user status");
			}
		} catch (error) {
			console.error("Error refreshing status:", error);
		} finally {
			setIsRefreshing(false);
		}
	};

	const handleContinueToDashboard = () => {
		navigate("/dashboard");
	};

	const handleSubmittedKYC = () => {
		setShowForm(false);
		handleRefreshStatus();
	};

	return (
		<div className="bg-slate-50 dark:bg-slate-950">
			<Header />
			{hasSubmittedKYC ? (
				<KYCStatusMessage
					status={user.kycStatus}
					onResubmit={handleResubmit}
					onRefreshStatus={handleRefreshStatus}
					onContinueToDashboard={handleContinueToDashboard}
					isRefreshing={isRefreshing}
				/>
			) : (
				<ProofOfIdentificationForm onSubmit={handleSubmittedKYC} />
			)}
		</div>
	);
}

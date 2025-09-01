import { useState, useEffect } from "react";
import { Search, Eye, Loader2, ArrowDownLeft } from "lucide-react";
import { contextData } from "@/context/AuthContext";
import WithdrawalSheet from "@/components/withdrawal-sheet";
import { useToastUtils } from "@/services/toast";
import { Link } from "react-router-dom";

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

const WithdrawalLog: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const { user } = contextData();
	const { showErrorToast } = useToastUtils();
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const withdrawalsPerPage = 10;

	// Fetch withdrawals
	const fetchWithdrawals = async (page = 1, search = "", status = "all") => {
		try {
			setLoading(true);
			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: withdrawalsPerPage.toString(),
				userId: user._id,
				...(search && { search }),
				...(status !== "all" && { status }),
			});

			const response = await fetch(`${url}/withdrawals?${queryParams}`);
			const data = await response.json();

			if (response.ok) {
				setWithdrawals(data.withdrawals || []);
				setTotalPages(data.totalPages || 1);
			} else {
				throw new Error(data.message || "Failed to fetch withdrawals");
			}
		} catch (error: any) {
			showErrorToast(error.message || "Failed to load withdrawals");
			setWithdrawals([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?._id) {
			fetchWithdrawals(currentPage, searchTerm, statusFilter);
		}
	}, [user?._id, currentPage, searchTerm, statusFilter]);

	// Handle search
	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1);
	};

	// Handle status filter
	const handleStatusFilter = (status: string) => {
		setStatusFilter(status);
		setCurrentPage(1);
	};

	// Handle view withdrawal
	const handleViewWithdrawal = (withdrawal: Withdrawal) => {
		setSelectedWithdrawal(withdrawal);
		setIsSheetOpen(true);
	};

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	// Format address
	const formatAddress = (address: string) => {
		if (address.length <= 12) return address;
		return `${address.slice(0, 6)}...${address.slice(-6)}`;
	};

	// Get status badge
	const getStatusBadge = (status: string) => {
		const statusConfig: Record<string, string> = {
			approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
			rejected: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
		};

		return (
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
					statusConfig[status] || "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
				}`}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	// Generate pagination numbers
	const getPaginationNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-normal tracking-wide text-slate-900 dark:text-slate-100 mb-2">
						Withdrawal{" "}
						<span className="font-normal bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">
							History
						</span>
					</h1>
					<p className="text-slate-600 dark:text-slate-400 font-normal">
						View and manage all your withdrawal transactions
					</p>
				</div>

				{/* Main Content */}
				<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
					<div className="p-6 md:p-8">
						{/* Controls */}
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
							{/* Search */}
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search by transaction number..."
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200"
								/>
							</div>

							{/* Filters and Actions */}
							<div className="flex items-center gap-3">
								<select
									value={statusFilter}
									onChange={(e) => handleStatusFilter(e.target.value)}
									className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-slate-900 dark:text-slate-100 transition-all duration-200"
								>
									<option value="all">All Status</option>
									<option value="pending">Pending</option>
									<option value="approved">Approved</option>
									<option value="rejected">Rejected</option>
								</select>

								<Link to="/dashboard/withdraw">
									<button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
										<ArrowDownLeft className="w-4 h-4" />
										<span className="max-sm:hidden">New</span> Withdrawal
									</button>
								</Link>
							</div>
						</div>

						{/* Loading */}
						{loading ? (
							<div className="flex items-center justify-center py-12">
								<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
									<Loader2 className="w-5 h-5 animate-spin" />
									Loading withdrawals...
								</div>
							</div>
						) : withdrawals.length === 0 ? (
							/* Empty State */
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
									<ArrowDownLeft className="w-8 h-8 text-slate-400" />
								</div>
								<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
									No withdrawals found
								</h3>
								<p className="text-slate-600 dark:text-slate-400 mb-6">
									{searchTerm || statusFilter !== "all"
										? "Try adjusting your search or filters"
										: "You haven't made any withdrawals yet."}
								</p>
							</div>
						) : (
							<>
								{/* Desktop Table */}
								<div className="hidden lg:block overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
									<table className="w-full whitespace-nowrap break-keep">
										<thead className="bg-slate-50 dark:bg-slate-800/50">
											<tr>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Transaction
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Amount
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Crypto Amount
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Address
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Status
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Date
												</th>
												<th className="px-6 py-4 text-right text-sm font-medium text-slate-900 dark:text-slate-100">
													Action
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
											{withdrawals.map((withdrawal) => (
												<tr
													key={withdrawal._id}
													className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
													onClick={() => handleViewWithdrawal(withdrawal)}
												>
													<td className="px-6 py-4">
														<div>
															<div className="text-sm font-medium text-slate-900 dark:text-slate-100">
																{withdrawal.transactionNumber}
															</div>
															<div className="text-sm text-slate-500 dark:text-slate-400 capitalize">
																{withdrawal.coinName}
															</div>
														</div>
													</td>
													<td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
														{formatCurrency(withdrawal.amount)}
													</td>
													<td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
														{withdrawal.convertedAmount.toFixed(6)} {withdrawal.coinName?.toUpperCase()}
													</td>
													<td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">
														{formatAddress(withdrawal.address)}
													</td>
													<td className="px-6 py-4">{getStatusBadge(withdrawal.status)}</td>
													<td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
														{formatDate(withdrawal.date)}
													</td>
													<td className="px-6 py-4 text-right">
														<button
															onClick={(e) => {
																e.stopPropagation();
																handleViewWithdrawal(withdrawal);
															}}
															className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
														>
															<Eye className="w-4 h-4" />
															View
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{/* Mobile Cards */}
								<div className="lg:hidden space-y-4">
									{withdrawals.map((withdrawal) => (
										<div
											key={withdrawal._id}
											onClick={() => handleViewWithdrawal(withdrawal)}
											className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer"
										>
											<div className="flex items-center justify-between mb-4">
												<div>
													<h3 className="font-medium text-slate-900 dark:text-slate-100">
														{withdrawal.transactionNumber}
													</h3>
													<p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
														{withdrawal.coinName}
													</p>
												</div>
												{getStatusBadge(withdrawal.status)}
											</div>

											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="text-slate-500 dark:text-slate-400 mb-1">USD Amount</p>
													<p className="font-medium text-slate-900 dark:text-slate-100">
														{formatCurrency(withdrawal.amount)}
													</p>
												</div>
												<div>
													<p className="text-slate-500 dark:text-slate-400 mb-1">Crypto Amount</p>
													<p className="font-medium text-slate-900 dark:text-slate-100">
														{withdrawal.convertedAmount.toFixed(6)}
													</p>
												</div>
												<div className="col-span-2">
													<p className="text-slate-500 dark:text-slate-400 mb-1">Address</p>
													<p className="text-slate-900 dark:text-slate-100 font-mono text-xs">
														{formatAddress(withdrawal.address)}
													</p>
												</div>
												<div className="col-span-2">
													<p className="text-slate-500 dark:text-slate-400 mb-1">Date</p>
													<p className="text-slate-900 dark:text-slate-100">{formatDate(withdrawal.date)}</p>
												</div>
											</div>

											<div className="mt-4 flex justify-end">
												<button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
													<Eye className="w-4 h-4" />
													View Details
												</button>
											</div>
										</div>
									))}
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
										<div className="text-sm text-slate-600 dark:text-slate-400">
											Page {currentPage} of {totalPages}
										</div>

										<div className="flex items-center gap-2">
											<button
												onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
												disabled={currentPage === 1}
												className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
											>
												Previous
											</button>

											{getPaginationNumbers().map((page) => (
												<button
													key={page}
													onClick={() => setCurrentPage(page)}
													className={`px-3 py-2 text-sm rounded-lg transition-colors ${
														page === currentPage
															? "bg-red-600 text-white"
															: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
													}`}
												>
													{page}
												</button>
											))}

											<button
												onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
												disabled={currentPage === totalPages}
												className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
											>
												Next
											</button>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>

				{/* Withdrawal Sheet */}
				<WithdrawalSheet
					withdrawal={selectedWithdrawal}
					isOpen={isSheetOpen}
					onClose={() => setIsSheetOpen(false)}
				/>
			</div>
		</div>
	);
};

export default WithdrawalLog;

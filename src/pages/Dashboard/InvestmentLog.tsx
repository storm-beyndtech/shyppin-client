import { useState, useEffect } from "react";
import { Search, Plus, Eye, Loader2, TrendingUp, Shield, Users } from "lucide-react";
import InvestmentSheet from "@/components/investment-sheet";
import { Link } from "react-router-dom";
import { contextData } from "@/context/AuthContext";
import { useToastUtils } from "@/services/toast";

export interface Transaction {
	_id: string;
	type: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
	status: "pending" | "completed" | "cancelled" | "active";
	amount: number;
	date: string;
	planData: {
		plan: string;
		duration: string;
		interest: number;
	};
}

const InvestmentLog: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
	const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const { showErrorToast } = useToastUtils();
	const { user } = contextData();
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const transactionsPerPage = 10;

	// Fetch all transactions
	const fetchTransactions = async () => {
		try {
			setLoading(true);
			const response = await fetch(`${url}/transactions`);
			const data = await response.json();

			if (response.ok) {
				setAllTransactions(data || []);
			} else {
				throw new Error(data.message || "Failed to fetch transactions");
			}
		} catch (error: any) {
			showErrorToast(error.message || "Failed to load transactions");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?._id) {
			fetchTransactions();
		}
	}, [user?._id]);

	// Filter and paginate transactions
	useEffect(() => {
		let filtered = allTransactions.filter((transaction) => {
			// Filter by type (only investment transactions)
			if (transaction.type !== "investment") return false;

			// Filter by user
			if (transaction.user?.id !== user._id) return false;

			// Filter by status
			if (statusFilter !== "all" && transaction.status !== statusFilter) return false;

			// Filter by search term
			if (searchTerm) {
				const searchLower = searchTerm.toLowerCase();
				const planName = transaction.planData?.plan?.toLowerCase() || "";

				return planName.includes(searchLower);
			}

			return true;
		});

		// Sort by date (newest first)
		filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		// Calculate pagination
		const totalItems = filtered.length;
		const pages = Math.ceil(totalItems / transactionsPerPage);
		setTotalPages(pages);

		// Apply pagination
		const startIndex = (currentPage - 1) * transactionsPerPage;
		const endIndex = startIndex + transactionsPerPage;
		const paginatedTransactions = filtered.slice(startIndex, endIndex);

		setFilteredTransactions(paginatedTransactions);
	}, [allTransactions, searchTerm, statusFilter, currentPage, user._id]);

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

	// Handle view transaction
	const handleViewTransaction = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
		setIsSheetOpen(true);
	};

	// Format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB");
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	// Get status badge
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "completed":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
						Completed
					</span>
				);
			case "active":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
						Active
					</span>
				);
			case "cancelled":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
						Cancelled
					</span>
				);
			case "pending":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
						Pending
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
						{status}
					</span>
				);
		}
	};

	// Get plan icon
	const getPlanIcon = (planName: string) => {
		if (planName.toLowerCase().includes("basic")) return TrendingUp;
		if (planName.toLowerCase().includes("pro")) return Shield;
		if (planName.toLowerCase().includes("expert")) return Users;
		return TrendingUp;
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
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-normal tracking-wide text-slate-900 dark:text-slate-100 mb-2">
						Investment{" "}
						<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
							Transactions
						</span>
					</h1>
					<p className="text-slate-600 dark:text-slate-400 font-normal">
						Track and manage all your investment activities
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
									placeholder="Search by plan or wallet..."
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200"
								/>
							</div>

							{/* Filters and Actions */}
							<div className="flex items-center gap-3">
								<select
									value={statusFilter}
									onChange={(e) => handleStatusFilter(e.target.value)}
									className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-slate-100 transition-all duration-200"
								>
									<option value="all">All Status</option>
									<option value="pending">Pending</option>
									<option value="active">Active</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>

								<Link
									to="/dashboard/investment-plan"
									className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
								>
									<Plus className="w-4 h-4" />
									<span className="max-sm:hidden">New</span> Investment
								</Link>
							</div>
						</div>

						{/* Loading */}
						{loading ? (
							<div className="flex items-center justify-center py-12">
								<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
									<Loader2 className="w-5 h-5 animate-spin" />
									Loading transactions...
								</div>
							</div>
						) : filteredTransactions.length === 0 ? (
							/* Empty State */
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
									<TrendingUp className="w-8 h-8 text-slate-400" />
								</div>
								<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
									No investments found
								</h3>
								<p className="text-slate-600 dark:text-slate-400 mb-6">
									{searchTerm || statusFilter !== "all"
										? "Try adjusting your search or filters"
										: "You haven't made any investments yet."}
								</p>
								<Link
									to="/dashboard/investment-plan"
									className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
								>
									Start Investing
								</Link>
							</div>
						) : (
							<>
								{/* Desktop Table */}
								<div className="hidden lg:block overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
									<table className="w-full whitespace-nowrap break-keep">
										<thead className="bg-slate-50 dark:bg-slate-800/50">
											<tr>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Investment Plan
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Amount
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Expected Return
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Interest
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
											{filteredTransactions.map((transaction) => {
												const PlanIcon = getPlanIcon(transaction.planData.plan);
												return (
													<tr
														key={transaction._id}
														className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
														onClick={() => handleViewTransaction(transaction)}
													>
														<td className="px-6 py-4">
															<div className="flex items-center gap-3">
																<div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
																	<PlanIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
																</div>
																<div>
																	<div className="text-sm font-medium text-slate-900 dark:text-slate-100">
																		{transaction.planData.plan}
																	</div>
																	<div className="text-xs text-slate-500 dark:text-slate-400">
																		{transaction.planData.duration}
																	</div>
																</div>
															</div>
														</td>
														<td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
															{formatCurrency(transaction.amount)}
														</td>
														<td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
															{formatCurrency(transaction.amount + transaction.planData.interest)}
														</td>
														<td className="px-6 py-4">
															<span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
																${transaction.planData.interest}
															</span>
														</td>
														<td className="px-6 py-4">{getStatusBadge(transaction.status)}</td>
														<td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
															{formatDate(transaction.date)}
														</td>
														<td className="px-6 py-4 text-right">
															<button
																onClick={(e) => {
																	e.stopPropagation();
																	handleViewTransaction(transaction);
																}}
																className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
															>
																<Eye className="w-4 h-4" />
																View
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>

								{/* Mobile Cards */}
								<div className="lg:hidden space-y-4">
									{filteredTransactions.map((transaction) => {
										const PlanIcon = getPlanIcon(transaction.planData.plan);
										return (
											<div
												key={transaction._id}
												className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-shadow"
												onClick={() => handleViewTransaction(transaction)}
											>
												<div className="flex items-center justify-between mb-3">
													<div className="flex items-center gap-3 flex-1 min-w-0">
														<div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
															<PlanIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
														</div>
														<div className="min-w-0">
															<p className="text-sm text-slate-500 dark:text-slate-400">
																{transaction.planData.plan} • {transaction.planData.duration}
															</p>
														</div>
													</div>
													{getStatusBadge(transaction.status)}
												</div>

												<div className="grid grid-cols-2 gap-4 mb-3">
													<div>
														<p className="text-sm text-slate-500 dark:text-slate-400">Amount</p>
														<p className="font-semibold text-slate-900 dark:text-slate-100">
															{formatCurrency(transaction.amount)}
														</p>
													</div>
													<div>
														<p className="text-sm text-slate-500 dark:text-slate-400">Expected Return</p>
														<p className="font-semibold text-emerald-600 dark:text-emerald-400">
															{formatCurrency(transaction.amount + transaction.planData.interest)}
														</p>
													</div>
												</div>

												<div className="flex justify-between items-center text-sm">
													<span className="text-slate-500 dark:text-slate-400">
														Interest:{" "}
														<span className="font-medium text-emerald-600 dark:text-emerald-400">
															${transaction.planData.interest}
														</span>
													</span>
													<span className="text-slate-500 dark:text-slate-400">
														{formatDate(transaction.date)}
													</span>
												</div>
											</div>
										);
									})}
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
															? "bg-blue-600 text-white"
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
			</div>
			{/* Investment Sheet */}
			<InvestmentSheet
				investment={selectedTransaction}
				isOpen={isSheetOpen}
				onClose={() => setIsSheetOpen(false)}
			/>
		</div>
	);
};

export default InvestmentLog;

import { useState, useEffect } from "react";
import {
	Search,
	Eye,
	Loader2,
	Filter,
	TrendingUp,
	ArrowUpRight,
	ArrowDownLeft,
	Wallet,
	DollarSign,
} from "lucide-react";
import { contextData } from "@/context/AuthContext";
import TransactionSheet from "@/components/transaction-sheet";
import { useToastUtils } from "@/services/toast";

export interface Transaction {
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

const AllTransactions: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
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
			// Filter by user
			if (transaction.user?.id !== user._id) return false;

			// Filter by status
			if (statusFilter !== "all" && transaction.status !== statusFilter) return false;

			// Filter by type
			if (typeFilter !== "all" && transaction.type !== typeFilter) return false;

			// Filter by search term
			if (searchTerm) {
				const searchLower = searchTerm.toLowerCase();
				const type = transaction.type.toLowerCase();
				const status = transaction.status.toLowerCase();
				const coinName = transaction.walletData?.coinName?.toLowerCase() || "";
				const planName = transaction.planData?.plan?.toLowerCase() || "";
				const network = transaction.walletData?.network?.toLowerCase() || "";

				return (
					type.includes(searchLower) ||
					status.includes(searchLower) ||
					coinName.includes(searchLower) ||
					planName.includes(searchLower) ||
					network.includes(searchLower)
				);
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
	}, [allTransactions, searchTerm, statusFilter, typeFilter, currentPage, user._id]);

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

	// Handle type filter
	const handleTypeFilter = (type: string) => {
		setTypeFilter(type);
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

	// Get transaction icon
	const getTransactionIcon = (type: string) => {
		switch (type) {
			case "deposit":
				return <ArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />;
			case "withdrawal":
				return <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />;
			case "investment":
				return <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
			case "investment_payout":
				return <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
			case "investment_refund":
				return <Wallet className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
			default:
				return <DollarSign className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
		}
	};

	// Get transaction type display name
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

	// Get status badge
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
			case "completed":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
						{status === "approved" ? "Approved" : "Completed"}
					</span>
				);
			case "pending":
			case "active":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
						{status === "pending" ? "Pending" : "Active"}
					</span>
				);
			case "rejected":
			case "cancelled":
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
						{status === "rejected" ? "Rejected" : "Cancelled"}
					</span>
				);
			default:
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</span>
				);
		}
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
						All{" "}
						<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
							Transactions
						</span>
					</h1>
					<p className="text-slate-600 dark:text-slate-400 font-normal">
						Complete overview of your financial activities
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
									placeholder="Search transactions..."
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200"
								/>
							</div>

							{/* Filters */}
							<div className="flex items-center gap-3">
								<select
									value={typeFilter}
									onChange={(e) => handleTypeFilter(e.target.value)}
									className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-slate-100 transition-all duration-200"
								>
									<option value="all">All Types</option>
									<option value="deposit">Deposits</option>
									<option value="withdrawal">Withdrawals</option>
									<option value="investment">Investments</option>
									<option value="investment_payout">Payouts</option>
									<option value="investment_refund">Refunds</option>
								</select>

								<select
									value={statusFilter}
									onChange={(e) => handleStatusFilter(e.target.value)}
									className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-slate-100 transition-all duration-200"
								>
									<option value="all">All Status</option>
									<option value="pending">Pending</option>
									<option value="approved">Approved</option>
									<option value="active">Active</option>
									<option value="completed">Completed</option>
									<option value="rejected">Rejected</option>
									<option value="cancelled">Cancelled</option>
								</select>
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
									<Filter className="w-8 h-8 text-slate-400" />
								</div>
								<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
									No transactions found
								</h3>
								<p className="text-slate-600 dark:text-slate-400 mb-6">
									{searchTerm || statusFilter !== "all" || typeFilter !== "all"
										? "Try adjusting your search or filters"
										: "You haven't made any transactions yet."}
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
													Type
												</th>
												<th className="px-6 py-4 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
													Amount
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
											{filteredTransactions.map((transaction) => (
												<tr
													key={transaction._id}
													className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
													onClick={() => handleViewTransaction(transaction)}
												>
													<td className="px-6 py-4">
														<div className="flex items-center gap-3">
															<div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
																{getTransactionIcon(transaction.type)}
															</div>
															<div>
																<div className="text-sm font-medium text-slate-900 dark:text-slate-100">
																	{getTypeDisplayName(transaction.type)}
																</div>
																<div className="text-sm text-slate-500 dark:text-slate-400">
																	{transaction.walletData?.coinName || transaction.planData?.plan || "N/A"}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
														{formatCurrency(transaction.amount)}
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
											))}
										</tbody>
									</table>
								</div>

								{/* Mobile Cards */}
								<div className="lg:hidden space-y-4">
									{filteredTransactions.map((transaction) => (
										<div
											key={transaction._id}
											className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-shadow"
											onClick={() => handleViewTransaction(transaction)}
										>
											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center gap-3 flex-1 min-w-0">
													<div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
														{getTransactionIcon(transaction.type)}
													</div>
													<div className="min-w-0">
														<h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
															{getTypeDisplayName(transaction.type)}
														</h3>
														<p className="text-sm text-slate-500 dark:text-slate-400">
															{transaction.walletData?.coinName || transaction.planData?.plan || "N/A"}
														</p>
													</div>
												</div>
												{getStatusBadge(transaction.status)}
											</div>

											<div className="flex justify-between items-center mb-3">
												<div>
													<p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
														{formatCurrency(transaction.amount)}
													</p>
												</div>
											</div>

											<p className="text-xs text-slate-500 dark:text-slate-400">
												{formatDate(transaction.date)}
											</p>
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
			{/* Transaction Sheet */}
			<TransactionSheet
				transaction={selectedTransaction}
				isOpen={isSheetOpen}
				onClose={() => setIsSheetOpen(false)}
			/>
		</div>
	);
};

export default AllTransactions;

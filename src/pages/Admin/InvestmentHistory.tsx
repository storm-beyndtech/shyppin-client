import React, { useEffect, useState } from "react";
import { TrendingUp, Calendar, Filter, Search, Eye, Download, BarChart3, PieChart } from "lucide-react";
import InvestmentDetailsModal from "@/components/InvestmentDetailsModal";

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

const InvestmentHistory: React.FC = () => {
	const [investments, setInvestments] = useState<ITransaction[]>([]);
	const [filteredInvestments, setFilteredInvestments] = useState<ITransaction[]>([]);
	const [selectedInvestment, setSelectedInvestment] = useState<ITransaction | null>(null);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateRange, setDateRange] = useState("all");
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchInvestments = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${url}/transactions/investments`);
			const data = await res.json();

			if (res.ok) {
				const investmentData = data.filter((inv: ITransaction) => inv.type === "investment");
				setInvestments(investmentData);
				setFilteredInvestments(investmentData);
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchInvestments();
	}, []);

	useEffect(() => {
		let filtered = investments;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(inv) =>
					inv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					inv.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
					inv.planData.plan.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Status filter
		if (statusFilter !== "all") {
			filtered = filtered.filter((inv) => inv.status === statusFilter);
		}

		// Date range filter
		if (dateRange !== "all") {
			const now = new Date();
			let startDate = new Date();

			switch (dateRange) {
				case "7days":
					startDate.setDate(now.getDate() - 7);
					break;
				case "30days":
					startDate.setDate(now.getDate() - 30);
					break;
				case "90days":
					startDate.setDate(now.getDate() - 90);
					break;
				case "1year":
					startDate.setFullYear(now.getFullYear() - 1);
					break;
			}

			filtered = filtered.filter((inv) => new Date(inv.date) >= startDate);
		}

		setFilteredInvestments(filtered);
	}, [investments, searchTerm, statusFilter, dateRange]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
			case "approved":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
			case "completed":
				return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
			case "rejected":
				return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
		}
	};

	const calculateStats = () => {
		const completed = filteredInvestments.filter((inv) => inv.status === "completed");
		const totalInvested = filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0);
		const totalReturns = completed.reduce((sum, inv) => {
			return sum + inv.planData.interest;
		}, 0);
		const avgReturn =
			completed.length > 0
				? completed.reduce((sum, inv) => sum + (inv.planData.interest / inv.amount) * 100, 0) /
				  completed.length
				: 0;

		return {
			totalInvestments: filteredInvestments.length,
			totalInvested,
			totalReturns,
			avgReturn,
			completed: completed.length,
		};
	};

	const stats = calculateStats();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Investment History</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Track and analyze all investment transactions and their performance
							</p>
						</div>
						<button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
							<Download className="w-4 h-4" />
							Export Data
						</button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Investments</p>
								<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
									{stats.totalInvestments}
								</p>
							</div>
							<TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-green-700 dark:text-green-300">Total Invested</p>
								<p className="text-2xl font-bold text-green-900 dark:text-green-100">
									${stats.totalInvested.toLocaleString()}
								</p>
							</div>
							<BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Returns</p>
								<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
									${stats.totalReturns.toLocaleString()}
								</p>
							</div>
							<PieChart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-orange-700 dark:text-orange-300">Completed</p>
								<p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.completed}</p>
							</div>
							<Calendar className="w-8 h-8 text-orange-600 dark:text-orange-400" />
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search by investor name, email, or plan..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
							/>
						</div>

						{/* Status Filter */}
						<div className="flex items-center gap-3">
							<Filter className="w-5 h-5 text-gray-400" />
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-[140px]"
							>
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="approved">Approved</option>
								<option value="completed">Completed</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>

						{/* Date Range Filter */}
						<div className="flex items-center gap-3">
							<Calendar className="w-5 h-5 text-gray-400" />
							<select
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-[140px]"
							>
								<option value="all">All Time</option>
								<option value="7days">Last 7 Days</option>
								<option value="30days">Last 30 Days</option>
								<option value="90days">Last 90 Days</option>
								<option value="1year">Last Year</option>
							</select>
						</div>
					</div>
				</div>

				{/* Investment History Table */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					{loading ? (
						<div className="p-12 text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-gray-600 dark:text-gray-400">Loading investment history...</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-4">
											Investor
										</th>
										<th scope="col" className="px-6 py-4">
											Plan
										</th>
										<th scope="col" className="px-6 py-4">
											Amount
										</th>
										<th scope="col" className="px-6 py-4">
											Returns
										</th>
										<th scope="col" className="px-6 py-4">
											Date
										</th>
										<th scope="col" className="px-6 py-4">
											Status
										</th>
										<th scope="col" className="px-6 py-4">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredInvestments.length > 0 ? (
										filteredInvestments.map((investment, i) => {
											const totalReturn = investment.amount + investment.planData.interest;

											return (
												<tr
													key={i}
													className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
												>
													<td className="px-6 py-4">
														<div className="flex items-center">
															<img
																className="w-10 h-10 rounded-full"
																src={`https://robohash.org/${investment.user.id}`}
																alt="Avatar"
															/>
															<div className="ml-3">
																<div className="text-sm font-medium text-gray-900 dark:text-white">
																	{investment.user.name.length > 18
																		? investment.user.name.slice(0, 16) + "..."
																		: investment.user.name}
																</div>
																<div className="text-sm text-gray-500 dark:text-gray-400">
																	{investment.user.email.length > 25
																		? investment.user.email.slice(0, 23) + "..."
																		: investment.user.email}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm font-medium text-gray-900 dark:text-white">
															{investment.planData.plan}
														</div>
														<div className="text-sm text-gray-500 dark:text-gray-400">
															{investment.planData.duration} days •{" "}
															{(investment.planData.interest / investment.amount) * 100}%
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm font-medium text-gray-900 dark:text-white">
															${investment.amount.toLocaleString()}
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm font-medium text-gray-900 dark:text-white">
															${investment.planData.interest.toLocaleString()}
														</div>
														<div className="text-sm text-gray-500 dark:text-gray-400">
															Total: ${totalReturn.toLocaleString()}
														</div>
													</td>
													<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
														{new Date(investment.date).toLocaleDateString()}
													</td>
													<td className="px-6 py-4">
														<span
															className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
																investment.status,
															)}`}
														>
															{investment.status.toUpperCase()}
														</span>
													</td>
													<td className="px-6 py-4">
														<button
															onClick={() => setSelectedInvestment(investment)}
															className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
														>
															<Eye className="w-4 h-4" />
															View
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan={7} className="px-6 py-12 text-center">
												<TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
												<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
													No investments found
												</h3>
												<p className="text-gray-500 dark:text-gray-400">
													{searchTerm || statusFilter !== "all" || dateRange !== "all"
														? "Try adjusting your search or filter criteria."
														: "No investment history available."}
												</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Pagination */}
				{filteredInvestments.length > 0 && (
					<div className="flex items-center justify-between mt-6">
						<div className="text-sm text-gray-700 dark:text-gray-300">
							Showing <span className="font-medium">{filteredInvestments.length}</span> of{" "}
							<span className="font-medium">{investments.length}</span> investments
						</div>
						<div className="flex items-center gap-2">
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								Previous
							</button>
							<button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
								1
							</button>
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								2
							</button>
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								Next
							</button>
						</div>
					</div>
				)}

				{/* Investment Details Modal */}
				{selectedInvestment && (
					<InvestmentDetailsModal
						investment={selectedInvestment}
						onClose={() => setSelectedInvestment(null)}
					/>
				)}
			</div>
		</div>
	);
};

export default InvestmentHistory;

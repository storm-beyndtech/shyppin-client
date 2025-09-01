import React, { useEffect, useState } from "react";
import { TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react";
import ManageInvestmentModal from "@/components/ManageInvestmentModal";

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

const ManageInvestments: React.FC = () => {
	const [investments, setInvestments] = useState<ITransaction[]>([]);
	const [singleInvestment, setSingleInvestment] = useState<ITransaction | null>(null);
	const [toggle, setToggle] = useState(false);
	const [filter, setFilter] = useState<string>("all");
	const [loading, setLoading] = useState(true);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const toggleModal = (e: boolean) => {
		setToggle(e);
	};

	const manageInvestment = (investment: ITransaction) => {
		setSingleInvestment(investment);
		toggleModal(true);
	};

	const fetchInvestments = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${url}/transactions/investments`);
			const data = await res.json();

			if (res.ok) {
				setInvestments(data.filter((inv: ITransaction) => inv.type === "investment"));
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
	}, [toggle]);

	const filteredInvestments = investments.filter((investment) => {
		if (filter === "all") return true;
		return investment.status === filter;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
			case "approved":
				return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
			case "completed":
				return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
			case "rejected":
				return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
			default:
				return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20";
		}
	};

	const stats = {
		total: investments.length,
		pending: investments.filter((inv) => inv.status === "pending").length,
		approved: investments.filter((inv) => inv.status === "approved").length,
		completed: investments.filter((inv) => inv.status === "completed").length,
		totalValue: investments.reduce((sum, inv) => sum + inv.amount, 0),
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Investments</h1>
					<p className="text-gray-600 dark:text-gray-400">Monitor and manage all investment transactions</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
								<Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
								<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
								<TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
								<DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">
									${stats.totalValue.toLocaleString()}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filter Tabs */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
					<div className="flex flex-wrap gap-2">
						{["all", "pending", "approved", "completed", "rejected"].map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
									filter === status
										? "bg-blue-600 text-white"
										: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
								}`}
							>
								{status === "all" ? "All Investments" : status.charAt(0).toUpperCase() + status.slice(1)}
							</button>
						))}
					</div>
				</div>

				{/* Investments Table */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					{loading ? (
						<div className="p-8 text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-gray-600 dark:text-gray-400">Loading investments...</p>
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
											Plan Details
										</th>
										<th scope="col" className="px-6 py-4">
											Amount
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
										filteredInvestments.map((investment, i) => (
											<tr
												key={i}
												className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
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
																{investment.user.name.length > 20
																	? investment.user.name.slice(0, 18) + "..."
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
														{investment.planData.duration} days • {(investment.planData.interest / investment.amount) * 100}%
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900 dark:text-white">
														${investment.amount.toLocaleString()}
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														+${investment.planData.interest.toLocaleString()}{" "}
														interest
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
													{investment.date.slice(0, 10)}
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
														onClick={() => manageInvestment(investment)}
														className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
													>
														Manage
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={6} className="px-6 py-12 text-center">
												<TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
												<p className="text-gray-500 dark:text-gray-400">No investments found</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Modal */}
				{toggle && <ManageInvestmentModal toggleModal={toggleModal} investment={singleInvestment} />}
			</div>
		</div>
	);
};

export default ManageInvestments;

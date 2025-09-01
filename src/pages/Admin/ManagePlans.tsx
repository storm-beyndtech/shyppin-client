import type React from "react";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, TrendingUp, Shield, Users } from "lucide-react";
import { useToastUtils } from "@/services/toast";

// TypeScript interfaces
interface InvestmentPlan {
	_id: string;
	name: string;
	description: string;
	roi: number;
	minAmount: number;
	duration: string;
	features: string[];
	icon: IconType;
	createdAt: string;
	isActive?: boolean;
}

interface AdminFormData {
	name: string;
	description: string;
	roi: string;
	minAmount: string;
	duration: string;
	features: string[];
	icon: IconType;
}

interface IconOption {
	value: IconType;
	label: string;
	icon: any;
}

type IconType = "TrendingUp" | "Shield" | "Users";

const AdminInvestmentPlans: React.FC = () => {
	const [plans, setPlans] = useState<InvestmentPlan[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	// Toast utilities
	const { showSuccessToast, showErrorToast, showWarningToast } = useToastUtils();

	// Server URL from environment
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	// Admin form state with proper typing
	const [adminForm, setAdminForm] = useState<AdminFormData>({
		name: "",
		description: "",
		roi: "",
		minAmount: "",
		duration: "",
		features: ["", "", ""],
		icon: "TrendingUp",
	});

	const iconOptions: IconOption[] = [
		{ value: "TrendingUp", label: "Trending Up", icon: TrendingUp },
		{ value: "Shield", label: "Shield", icon: Shield },
		{ value: "Users", label: "Users", icon: Users },
	];

	// Fetch plans with proper error handling
	const fetchPlans = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await fetch(`${url}/plans`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data: InvestmentPlan[] = await response.json();
			setPlans(data);
		} catch (error: any) {
			console.error("Error fetching plans:", error);
			showErrorToast(error.message || "Failed to fetch investment plans");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPlans();
	}, []);

	const openModal = (plan?: InvestmentPlan | null): void => {
		if (plan) {
			setEditingPlan(plan);
			setAdminForm({
				name: plan.name,
				description: plan.description,
				roi: plan.roi.toString(),
				minAmount: plan.minAmount.toString(),
				duration: plan.duration,
				features: [...plan.features, "", "", ""].slice(0, 3),
				icon: plan.icon || "TrendingUp",
			});
		} else {
			setEditingPlan(null);
			setAdminForm({
				name: "",
				description: "",
				roi: "",
				minAmount: "",
				duration: "",
				features: ["", "", ""],
				icon: "TrendingUp",
			});
		}
		setShowModal(true);
	};

	const handleSubmit = async (): Promise<void> => {
		setIsSubmitting(true);

		try {
			// Validate form data
			const roiValue = parseFloat(adminForm.roi);
			const minAmountValue = parseFloat(adminForm.minAmount);

			if (isNaN(roiValue) || isNaN(minAmountValue)) {
				showWarningToast("Please enter valid numbers for ROI and minimum amount");
				return;
			}

			if (roiValue < 0 || roiValue > 1000) {
				showWarningToast("ROI must be between 0 and 1000%");
				return;
			}

			if (minAmountValue < 0) {
				showWarningToast("Minimum amount must be positive");
				return;
			}

			const filteredFeatures = adminForm.features.filter((f) => f.trim() !== "");
			if (filteredFeatures.length === 0) {
				showWarningToast("At least one feature is required");
				return;
			}

			const planData = {
				name: adminForm.name.trim(),
				description: adminForm.description.trim(),
				roi: roiValue,
				minAmount: minAmountValue,
				duration: adminForm.duration.trim(),
				features: filteredFeatures,
				icon: adminForm.icon,
			};

			const endpoint = editingPlan ? `${url}/plans/${editingPlan._id}` : `${url}/plans`;
			const method = editingPlan ? "PUT" : "POST";

			const response = await fetch(endpoint, {
				method,
				headers: { 
					"Content-Type": "application/json" 
				},
				body: JSON.stringify(planData),
			});

			const responseData = await response.json();

			if (response.ok) {
				showSuccessToast(
					editingPlan 
						? "Investment plan updated successfully" 
						: "Investment plan created successfully"
				);
				await fetchPlans();
				setShowModal(false);
			} else {
				throw new Error(responseData.message || "Unknown error occurred");
			}
		} catch (error: any) {
			console.error("Error saving plan:", error);
			showErrorToast(error.message || "Failed to save investment plan");
		} finally {
			setIsSubmitting(false);
		}
	};

	const deletePlan = async (planId: string): Promise<void> => {
		if (!window.confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
			return;
		}

		try {
			const response = await fetch(`${url}/plans/${planId}`, { 
				method: "DELETE" 
			});
			
			const responseData = await response.json();

			if (response.ok) {
				showSuccessToast("Investment plan deleted successfully");
				await fetchPlans();
			} else {
				throw new Error(responseData.message || "Failed to delete plan");
			}
		} catch (error: any) {
			console.error("Error deleting plan:", error);
			showErrorToast(error.message || "Failed to delete investment plan");
		}
	};

	const getIcon = (iconName: IconType): any => {
		const iconOption = iconOptions.find((opt) => opt.value === iconName);
		return iconOption ? iconOption.icon : TrendingUp;
	};

	const updateFormField = <K extends keyof AdminFormData>(field: K, value: AdminFormData[K]): void => {
		setAdminForm((prev) => ({ ...prev, [field]: value }));
	};

	const updateFeature = (index: number, value: string): void => {
		const newFeatures = [...adminForm.features];
		newFeatures[index] = value;
		setAdminForm((prev) => ({ ...prev, features: newFeatures }));
	};

	const isFormValid = (): boolean => {
		return !!(
			adminForm.name.trim() &&
			adminForm.roi.trim() &&
			adminForm.minAmount.trim() &&
			adminForm.description.trim() &&
			adminForm.duration.trim() &&
			adminForm.features.some(f => f.trim() !== "")
		);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-center items-center h-64">
						<div className="text-slate-600 dark:text-slate-400">Loading investment plans...</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-12">
					<div>
						<h1 className="text-3xl font-light text-slate-900 dark:text-white mb-2">
							Investment Plans Admin
						</h1>
						<p className="text-slate-600 dark:text-slate-400">Manage investment plans and settings</p>
					</div>
					<button
						onClick={() => openModal()}
						className="flex items-center space-x-2 px-6 py-3 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition-all backdrop-blur-sm border border-blue-400/30 hover:scale-105"
						type="button"
					>
						<Plus className="w-5 h-5" />
						<span>Add Plan</span>
					</button>
				</div>

				{/* Plans Grid */}
				<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
					{plans.map((plan: InvestmentPlan) => {
						const Icon = getIcon(plan.icon);
						return (
							<div
								key={plan._id}
								className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
							>
								{/* Glassmorphism overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-700/10 rounded-2xl"></div>

								{/* Admin Controls */}
								<div className="mb-3 flex space-x-2 text-xs">
									<button
										onClick={() => openModal(plan)}
										className="flex items-center gap-1 px-2 py-[2px] bg-blue-500/80 text-white rounded-lg hover:bg-blue-500 transition-all backdrop-blur-sm"
									>
										edit
										<Edit className="w-3 h-3" strokeWidth={1} />
									</button>
									<button
										onClick={() => deletePlan(plan._id)}
										className="flex items-center gap-1 px-2 py-[2px] bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-all backdrop-blur-sm"
									>
										delete
										<Trash2 className="w-3 h-3" strokeWidth={1} />
									</button>
								</div>

								{/* Content */}
								<div className="relative z-10">
									{/* Icon & Title */}
									<div className="flex items-center space-x-3 mb-4">
										<div className="p-2 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm">
											<Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
										</div>
										<h3 className="text-lg font-medium text-slate-900 dark:text-white">{plan.name}</h3>
									</div>

									{/* Stats */}
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div>
											<div className="text-2xl font-light text-slate-900 dark:text-white">{plan.roi}%</div>
											<div className="text-xs text-slate-500 dark:text-slate-400">ROI</div>
										</div>
										<div>
											<div className="text-lg font-medium text-slate-900 dark:text-white">
												${plan.minAmount.toLocaleString()}
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400">Min Amount</div>
										</div>
									</div>

									{/* Duration */}
									<div className="mb-4">
										<div className="text-sm text-slate-600 dark:text-slate-300">
											Duration: {plan.duration}
										</div>
									</div>

									{/* Description */}
									<p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
										{plan.description}
									</p>

									{/* Features */}
									<div className="space-y-1 mb-4">
										{plan.features.slice(0, 2).map((feature: string, index: number) => (
											<div key={index} className="text-xs text-slate-500 dark:text-slate-400">
												• {feature}
											</div>
										))}
										{plan.features.length > 2 && (
											<div className="text-xs text-slate-400 dark:text-slate-500">
												+{plan.features.length - 2} more features
											</div>
										)}
									</div>

									{/* Created Date */}
									<div className="text-xs text-slate-400 dark:text-slate-500">
										Created: {new Date(plan.createdAt).toLocaleDateString()}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{plans.length === 0 && !loading && (
					<div className="text-center py-16">
						<div className="text-slate-400 dark:text-slate-500 mb-4">
							<TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
							<p>No investment plans found</p>
						</div>
						<button
							onClick={() => openModal()}
							className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
							type="button"
						>
							Create Your First Plan
						</button>
					</div>
				)}
			</div>

			{/* Admin Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
					<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 dark:border-slate-700/30 max-h-[90vh] overflow-y-auto">
						{/* Glassmorphism overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-slate-800/20 rounded-2xl"></div>

						<div className="relative z-10">
							<div className="flex justify-between items-center mb-8">
								<h3 className="text-2xl font-light text-slate-900 dark:text-white">
									{editingPlan ? "Edit Plan" : "Create Plan"}
								</h3>
								<button
									onClick={() => setShowModal(false)}
									className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/20 rounded-xl transition-colors"
									type="button"
									aria-label="Close modal"
								>
									<X className="w-5 h-5 text-slate-500" />
								</button>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								{/* Left Column */}
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Plan Name
										</label>
										<input
											type="text"
											value={adminForm.name}
											onChange={(e) => updateFormField("name", e.target.value)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
											placeholder="e.g., Basic Plan"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											ROI Percentage
										</label>
										<input
											type="number"
											value={adminForm.roi}
											onChange={(e) => updateFormField("roi", e.target.value)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
											placeholder="50"
											min="0"
											max="1000"
											step="0.1"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Minimum Amount
										</label>
										<input
											type="number"
											value={adminForm.minAmount}
											onChange={(e) => updateFormField("minAmount", e.target.value)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
											placeholder="500"
											min="0"
											step="1"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Duration
										</label>
										<input
											type="text"
											value={adminForm.duration}
											onChange={(e) => updateFormField("duration", e.target.value)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
											placeholder="12 months"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Icon
										</label>
										<select
											value={adminForm.icon}
											onChange={(e) => updateFormField("icon", e.target.value as IconType)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
										>
											{iconOptions.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									</div>
								</div>

								{/* Right Column */}
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Description
										</label>
										<textarea
											value={adminForm.description}
											onChange={(e) => updateFormField("description", e.target.value)}
											className="w-full px-4 py-3 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
											rows={3}
											placeholder="Brief description of the investment plan"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Features
										</label>
										{adminForm.features.map((feature, index) => (
											<input
												key={index}
												type="text"
												value={feature}
												onChange={(e) => updateFeature(index, e.target.value)}
												className="w-full px-4 py-3 mb-2 border border-white/30 dark:border-slate-600/30 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none backdrop-blur-sm"
												placeholder={`Feature ${index + 1}`}
											/>
										))}
									</div>
								</div>
							</div>

							<div className="flex gap-4 mt-8">
								<button
									onClick={() => setShowModal(false)}
									className="flex-1 py-3 px-6 border border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700/20 transition-all backdrop-blur-sm"
									type="button"
								>
									Cancel
								</button>
								<button
									onClick={handleSubmit}
									disabled={isSubmitting || !isFormValid()}
									className="flex-1 py-3 px-6 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 backdrop-blur-sm border border-blue-400/30 hover:scale-105 flex items-center justify-center space-x-2"
									type="button"
								>
									<Save className="w-5 h-5" />
									<span>{isSubmitting ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminInvestmentPlans;
import React, { useState, useEffect } from "react";
import { Check, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";

interface Plan {
	_id: string;
	name: string;
	description: string;
	roi: number;
	minAmount: number;
	duration: string;
	features: string[];
	isActive: boolean;
}

const PricingSection: React.FC = () => {
	const [plans, setPlans] = useState<Plan[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { user } = contextData();

	const handleGetStarted = () => {
		if (user) {
			navigate("/dashboard/investment-plan");
		} else {
			navigate("/login");
		}
	};

	const handleViewAllPlans = () => {
		if (user) {
			navigate("/dashboard/investment-plan");
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		const fetchPlans = async () => {
			try {
				const API_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:5000/api";
				const response = await fetch(`${API_BASE_URL}/plans`);
				if (!response.ok) {
					throw new Error("Failed to fetch plans");
				}
				const data = await response.json();
				setPlans(data); // Show all plans
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchPlans();
	}, []);

	if (loading) {
		return (
			<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
						<div className="h-4 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="bg-white/40 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 animate-pulse shadow-xl"
							>
								<div className="h-6 bg-gray-200 rounded mb-4"></div>
								<div className="h-4 bg-gray-200 rounded mb-6"></div>
								<div className="h-8 bg-gray-200 rounded mb-6"></div>
								<div className="space-y-3">
									{[1, 2, 3].map((j) => (
										<div key={j} className="h-4 bg-gray-200 rounded"></div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
				<div className="max-w-6xl mx-auto text-center">
					<p className="text-red-600">Failed to load pricing plans. Please try again later.</p>
				</div>
			</section>
		);
	}

	return (
		<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-blue-100/40 overflow-hidden">
			{/* Floating Background Blobs */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Medium floating blobs */}
				<div className="absolute top-20 left-1/4 w-48 h-48 bg-gradient-to-br from-cyan-200/20 to-blue-300/15 rounded-full blur-2xl animate-pulse delay-500"></div>
				<div className="absolute bottom-40 left-1/3 w-56 h-56 bg-gradient-to-tr from-blue-300/20 to-indigo-200/15 rounded-full blur-2xl animate-pulse delay-1500"></div>

				{/* Small floating accents */}
				<div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/25 to-cyan-300/20 rounded-full blur-xl animate-pulse delay-700"></div>
				<div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-gradient-to-tr from-indigo-300/20 to-blue-400/15 rounded-full blur-xl animate-pulse delay-1200"></div>
			</div>

			<div className="relative max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 bg-clip-text text-transparent">
						Investment Plans
					</h2>
					<p className="text-gray-500 max-w-2xl mx-auto">
						Choose investment strategy & start building your portfolio
					</p>
				</div>

				{/* Plans Grid */}
				<div className="flex flex-wrap gap-6 justify-center">
					{plans.map((plan: Plan) => {
						return (
							<div
								key={plan._id}
								className="w-full max-w-90 group relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 hover:bg-white/60 hover:border-white/50 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2"
								onClick={handleGetStarted}
							>
								{/* Glassmorphism overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>

								{/* Content */}
								<div className="relative z-10">
									{/* Icon & Title */}
									<div className="flex items-center space-x-4 mb-6">
										<div className="p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
											<Shield className="w-6 h-6 text-slate-700" />
										</div>
										<h3 className="text-xl font-medium text-slate-900">{plan.name}</h3>
									</div>

									{/* Price Display */}
									<div className="mb-6">
										<div className="text-4xl font-extrabold text-slate-900 mb-2">
											${plan.minAmount.toLocaleString()}+
										</div>
										<div className="text-2xl font-light text-slate-900">
											{plan.roi}
											<span className="text-lg text-slate-500">% ROI</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-slate-600 mb-4 leading-relaxed text-sm">{plan.description}</p>

									{/* Duration */}
									<div className="mb-6">
										<div className="flex items-center space-x-3">
											<div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
												<Check className="w-3 h-3 text-blue-600" />
											</div>
											<span className="text-slate-600 text-sm font-medium">{plan.duration}</span>
										</div>
									</div>

									{/* Features */}
									<div className="space-y-3 mb-8">
										{plan.features.map((feature: string, index: number) => (
											<div key={index} className="flex items-center space-x-3">
												<div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
													<Check className="w-3 h-3 text-emerald-600" />
												</div>
												<span className="text-slate-600 text-sm">{feature}</span>
											</div>
										))}
									</div>

									{/* CTA Button */}
									<button
										className="w-full py-2.5 px-6 bg-slate-900/80 text-white font-medium rounded-lg transition-all duration-300 hover:bg-slate-900 backdrop-blur-sm border border-slate-800/20 hover:scale-105"
										type="button"
										aria-label={`Start investment with ${plan.name} plan`}
									>
										{user ? "Start Investment" : "Sign In to Invest"}
									</button>
								</div>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<p className="text-slate-600 mb-6">Ready to start your investment journey?</p>
					<button
						onClick={handleViewAllPlans}
						className="bg-slate-900/80 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-slate-800/20 hover:scale-105"
					>
						{user ? "View All Plans" : "Sign In to Get Started"}
					</button>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;

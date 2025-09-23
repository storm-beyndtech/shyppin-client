import React, { useState, useEffect } from 'react';
import { Check, Star, TrendingUp, Shield, Clock } from 'lucide-react';
import { formatCurrency, formatROI } from '@/utils/formatters';

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

	useEffect(() => {
		const fetchPlans = async () => {
			try {
				const response = await fetch('/api/plans');
				if (!response.ok) {
					throw new Error('Failed to fetch plans');
				}
				const data = await response.json();
				setPlans(data.slice(0, 3)); // Show only first 3 plans
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchPlans();
	}, []);

	if (loading) {
		return (
			<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-slate-50/30 to-slate-50/20">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
						<div className="h-4 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="bg-white rounded-2xl p-8 border border-gray-200 animate-pulse">
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
			<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-slate-50/30 to-slate-50/20">
				<div className="max-w-7xl mx-auto text-center">
					<p className="text-red-600">Failed to load pricing plans. Please try again later.</p>
				</div>
			</section>
		);
	}

	return (
		<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-slate-50/30 to-slate-50/20 overflow-hidden">
			{/* Background Assets */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-blue-200/10 rounded-full blur-3xl"></div>
				<div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-100/15 to-blue-200/10 rounded-full blur-2xl"></div>
				<div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-blue-100/20 to-transparent rounded-full blur-2xl"></div>
			</div>

			<div className="relative max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-4 tracking-tight">
						Investment <span className="text-blue-600">Plans</span>
					</h2>
					<p className="text-xl md:text-3xl text-gray-500 font-light max-w-5xl mx-auto italic leading-relaxed">
						Choose the perfect plan to start your investment journey
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
					{plans.map((plan, index) => (
						<div key={plan._id} className="group relative">
							{/* Popular Badge */}
							{index === 1 && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
									<div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
										<Star className="w-4 h-4 mr-1" />
										Most Popular
									</div>
								</div>
							)}

							{/* Pricing Card */}
							<div className={`relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
								index === 1 
									? 'border-blue-200 ring-2 ring-blue-100 hover:ring-blue-200 scale-105' 
									: 'border-gray-200 hover:border-blue-200'
							}`}>
								{/* Plan Name */}
								<div className="mb-6">
									<h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
									<p className="text-gray-600 text-sm">{plan.description}</p>
								</div>

								{/* ROI Display */}
								<div className="mb-8">
									<div className="flex items-baseline">
										<span className="text-5xl font-extrabold text-gray-900">{formatROI(plan.roi, 0)}</span>
										<span className="text-xl text-gray-500 ml-1">%</span>
									</div>
									<p className="text-gray-500 text-sm mt-1">Return on Investment</p>
								</div>

								{/* Min Amount & Duration */}
								<div className="mb-8 space-y-3">
									<div className="flex items-center text-gray-600">
										<TrendingUp className="w-5 h-5 mr-3 text-blue-500" />
										<span>Min. Investment: {formatCurrency(plan.minAmount)}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<Clock className="w-5 h-5 mr-3 text-blue-500" />
										<span>Duration: {plan.duration}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<Shield className="w-5 h-5 mr-3 text-blue-500" />
										<span>Secured Investment</span>
									</div>
								</div>

								{/* Features */}
								<div className="mb-8">
									<h4 className="font-semibold text-gray-900 mb-4">Plan Features:</h4>
									<ul className="space-y-3">
										{plan.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-start">
												<Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
												<span className="text-gray-600 text-sm">{feature}</span>
											</li>
										))}
									</ul>
								</div>

								{/* CTA Button */}
								<button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
									index === 1
										? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
										: 'bg-gray-900 text-white hover:bg-gray-800'
								}`}>
									Get Started
								</button>

								{/* Hover Effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<p className="text-gray-600 mb-6">Ready to start your investment journey?</p>
					<button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
						View All Plans
					</button>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
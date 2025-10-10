"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Ship, DollarSign, Package, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const OceanFreight: FC = () => {
	const benefits = [
		"Most economical for large volumes",
		"Suitable for heavy and oversized cargo",
		"Environmental efficiency",
		"Flexible scheduling options", 
		"Comprehensive cargo insurance",
	];

	const useCases = [
		"Bulk commodities and raw materials",
		"Vehicles and heavy machinery",
		"Furniture and home goods",
		"Building materials",
		"Large-scale retail inventory",
	];

	return (
		<section className="py-20 bg-gray-50 dark:bg-slate-900/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Image */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1570305958985-64e0a5a84774"
								alt="Ocean Freight"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
						</div>
					</motion.div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center mb-6">
							<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
								<Ship className="w-7 h-7 text-blue-600 dark:text-blue-400" />
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
								Ocean Freight
							</h2>
						</div>

						<p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
							Ocean freight remains the backbone of international trade, moving 90% of global cargo.
							We offer both FCL (Full Container Load) and LCL (Less than Container Load) services
							with competitive rates and reliable schedules.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
									<DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
									Key Benefits
								</h4>
								<ul className="space-y-2">
									{benefits.map((benefit, idx) => (
										<li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
											<div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
											{benefit}
										</li>
									))}
								</ul>
							</div>

							<div>
								<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
									<Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
									Ideal For
								</h4>
								<ul className="space-y-2">
									{useCases.map((useCase, idx) => (
										<li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
											<div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
											{useCase}
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 mb-8">
							<div className="flex items-center mb-3">
								<Globe className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
								<h4 className="font-semibold text-green-900 dark:text-green-100">Container Options</h4>
							</div>
							<p className="text-green-800 dark:text-green-200 text-sm">
								FCL (20ft, 40ft, 40ft HC containers), LCL consolidation services, container loading 
								supervision, and vessel tracking with estimated arrival times.
							</p>
						</div>

						<Link to="/quote">
							<button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
								Get Ocean Freight Quote
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default OceanFreight;
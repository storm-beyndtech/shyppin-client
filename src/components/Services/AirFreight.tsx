"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Plane, Clock, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const AirFreight: FC = () => {
	const benefits = [
		"Fastest transit times globally (1-5 days)",
		"Priority handling for urgent cargo",
		"Global airline partnerships",
		"24/7 tracking and support",
		"Door-to-door delivery options",
	];

	const useCases = [
		"Electronics and high-value goods",
		"Pharmaceutical and medical supplies",
		"Fashion and perishables",
		"Emergency spare parts",
		"E-commerce fulfillment",
	];

	return (
		<section className="py-20 bg-white dark:bg-slate-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center mb-6">
							<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
								<Plane className="w-7 h-7 text-blue-600 dark:text-blue-400" />
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
								Air Freight
							</h2>
						</div>

						<p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
							Our air freight services provide the fastest shipping solution for your urgent cargo.
							With partnerships across 500+ airlines and access to major airports worldwide, we ensure
							your shipments reach their destination swiftly and securely.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
									<Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
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
									<Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
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

						<div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 mb-8">
							<div className="flex items-center mb-3">
								<Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
								<h4 className="font-semibold text-blue-900 dark:text-blue-100">Express Services</h4>
							</div>
							<p className="text-blue-800 dark:text-blue-200 text-sm">
								Next-flight-out services for emergency shipments, temperature-controlled handling, 
								and hazmat-certified transport available 24/7.
							</p>
						</div>

						<Link to="/quote">
							<button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
								Get Air Freight Quote
							</button>
						</Link>
					</motion.div>

					{/* Image */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
								alt="Air Freight"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AirFreight;
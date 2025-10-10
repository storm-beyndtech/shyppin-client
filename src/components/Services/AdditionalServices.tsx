"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Package, Star, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AdditionalServices: FC = () => {
	const additionalServices = [
		{
			title: "Project Cargo",
			description: "Specialized handling for oversized, heavy, or complex shipments requiring custom solutions.",
			icon: Package,
		},
		{
			title: "White Glove Delivery", 
			description: "Premium delivery service with inside placement, assembly, and debris removal.",
			icon: Star,
		},
		{
			title: "Trade Compliance Consulting",
			description: "Expert guidance on import/export regulations, tariffs, and trade agreements.",
			icon: FileText,
		},
	];

	return (
		<section className="py-20 bg-gray-50 dark:bg-slate-900/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
					>
						Additional Services
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
					>
						Specialized solutions for unique shipping challenges
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					{additionalServices.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/10 transition-all duration-300"
						>
							<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
								<service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
								{service.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								{service.description}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-800"
				>
					<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
						Not Sure Which Service You Need?
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
						Our logistics experts will recommend the best solution for your shipment requirements and budget.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
								Speak with an Expert
							</button>
						</Link>
						<Link to="/quote">
							<button className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-2xl font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200">
								Get a Quote
							</button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AdditionalServices;
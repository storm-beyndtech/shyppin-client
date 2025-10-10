"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { MapPin, Truck, Shield, Calculator } from "lucide-react";

const FreightFeaturesSection: FC = () => {
	const features = [
		{
			title: "Real-Time Tracking",
			description: "Monitor your shipments from pickup to delivery with live GPS tracking and automated status updates.",
			icon: MapPin,
		},
		{
			title: "Multi-Modal Shipping",
			description: "Choose from air, ocean, or ground freight—or combine them for optimized routing and costs.",
			icon: Truck,
		},
		{
			title: "Customs Expertise",
			description: "Licensed brokers handle documentation, duties, and compliance so your cargo crosses borders smoothly.",
			icon: Shield,
		},
		{
			title: "Instant Quotes",
			description: "Get accurate freight quotes in seconds with our online calculator. No hidden fees.",
			icon: Calculator,
		},
	];

	return (
		<section className="py-20 bg-white dark:bg-slate-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
					>
						Why Choose{" "}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
							Shyppin
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
					>
						Ship smarter, deliver faster
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/10 transition-all duration-300 group"
						>
							<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
								<feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
								{feature.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FreightFeaturesSection;
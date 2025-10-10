"use client";

import { motion } from "framer-motion";
import type { FC } from "react";

const StatsSection: FC = () => {
	const stats = [
		{ value: "150+", label: "Countries Served" },
		{ value: "50K+", label: "Shipments Annually" },
		{ value: "99.2%", label: "On-Time Delivery" },
		{ value: "24/7", label: "Customer Support" },
	];

	return (
		<section className="py-16 bg-gray-50 dark:bg-slate-900/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
								{stat.value}
							</div>
							<div className="text-gray-600 dark:text-gray-400 font-medium">
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;
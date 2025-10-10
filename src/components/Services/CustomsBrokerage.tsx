"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const CustomsBrokerage: FC = () => {
	return (
		<section className="py-20 bg-white dark:bg-slate-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center mb-6">
							<div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
								<ShieldCheck className="w-7 h-7 text-orange-600 dark:text-orange-400" />
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
								Customs Brokerage
							</h2>
						</div>

						<p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
							Navigate complex international trade regulations with confidence. Our licensed customs
							brokers handle all documentation, duties, and compliance requirements to ensure smooth
							border crossings.
						</p>

						<Link to="/quote">
							<button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
								Get Customs Support
							</button>
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
								alt="Customs Brokerage"
								className="w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default CustomsBrokerage;
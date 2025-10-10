"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Truck } from "lucide-react";
import { Link } from "react-router-dom";

const GroundTransport: FC = () => {
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
							<div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
								<Truck className="w-7 h-7 text-green-600 dark:text-green-400" />
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
								Ground Transportation
							</h2>
						</div>

						<p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
							Our ground transportation network provides reliable trucking services across North America
							and strategic international corridors. From LTL to FTL, we optimize routes for speed
							and cost-efficiency.
						</p>

						<Link to="/quote">
							<button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-green-500/25">
								Get Ground Transport Quote
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
								src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7"
								alt="Ground Transportation"
								className="w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default GroundTransport;
"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

const Warehousing: FC = () => {
	return (
		<section className="py-20 bg-gray-50 dark:bg-slate-900/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1553413077-190dd305871c"
								alt="Warehousing"
								className="w-full h-full object-cover"
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center mb-6">
							<div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
								<Warehouse className="w-7 h-7 text-purple-600 dark:text-purple-400" />
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
								Warehousing & Distribution
							</h2>
						</div>

						<p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
							Our global network of warehouses provides flexible storage, inventory management,
							and order fulfillment services. Whether you need short-term storage or long-term
							distribution solutions, we've got you covered.
						</p>

						<Link to="/quote">
							<button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
								Get Warehousing Quote
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Warehousing;
"use client";

import { motion } from "framer-motion";
import type { FC } from "react";

const TestimonialsSection: FC = () => {
	const testimonials = [
		{
			quote: "Shyppin transformed our supply chain. Their air freight service got our urgent parts to Germany in 48 hours—saving our production line.",
			author: "Sarah Chen",
			title: "Supply Chain Director",
			company: "TechParts Inc.",
		},
		{
			quote: "The tracking platform is incredibly transparent. We always know exactly where our containers are and when they'll arrive.",
			author: "Marcus Rodriguez",
			title: "Logistics Manager",
			company: "Global Retail Co.",
		},
		{
			quote: "Their customs brokerage team handled all the paperwork flawlessly. We've never had a smoother import experience.",
			author: "Lisa Thompson",
			title: "Import Coordinator",
			company: "Precision Manufacturing",
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
						What Our Customers Say
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
					>
						Trusted by businesses worldwide
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.author}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/10 transition-all duration-300"
						>
							<div className="mb-6">
								<svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
									"{testimonial.quote}"
								</p>
							</div>
							<div>
								<div className="font-semibold text-gray-900 dark:text-gray-100">
									{testimonial.author}
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									{testimonial.title}
								</div>
								<div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
									{testimonial.company}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
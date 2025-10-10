"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { Plane, Ship, Truck, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

const FreightServicesSection: FC = () => {
	const services = [
		{
			id: "air-freight",
			title: "Air Freight",
			description: "Express air cargo for time-critical shipments",
			icon: Plane,
			features: ["Fastest transit times globally (1-5 days)", "Priority handling for urgent cargo", "Global airline partnerships"],
			image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
		},
		{
			id: "sea-freight",
			title: "Ocean Freight",
			description: "Cost-effective shipping for large-volume cargo",
			icon: Ship,
			features: ["Most economical for large volumes", "Suitable for heavy and oversized cargo", "Environmental efficiency"],
			image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8",
		},
		{
			id: "land-freight",
			title: "Ground Transportation",
			description: "Flexible trucking solutions for regional delivery",
			icon: Truck,
			features: ["Flexible pickup and delivery schedules", "Last-mile delivery capabilities", "Real-time GPS tracking"],
			image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
		},
		{
			id: "warehousing",
			title: "Warehousing & Distribution",
			description: "Strategic storage and fulfillment solutions",
			icon: Warehouse,
			features: ["Reduce shipping costs with strategic positioning", "Scalable storage solutions", "Advanced inventory tracking"],
			image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
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
						Our Freight Services
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
					>
						Comprehensive logistics solutions for every need
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/10 transition-all duration-300 group"
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={service.image}
									alt={service.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
								<div className="absolute top-4 left-4">
									<div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
										<service.icon className="w-6 h-6 text-blue-600" />
									</div>
								</div>
							</div>
							<div className="p-8">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
									{service.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">
									{service.description}
								</p>
								<ul className="space-y-2 mb-6">
									{service.features.map((feature, idx) => (
										<li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
											<div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
											{feature}
										</li>
									))}
								</ul>
								<Link to="/quote">
									<button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
										Get Quote
									</button>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FreightServicesSection;
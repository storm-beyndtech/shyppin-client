"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import cryptoGlass1 from "../../assets/Futuristic_Glass_Cube.png";

const ServicesHero: FC = () => {
	return (
		<section className="sm:min-h-[400px] relative w-full py-16 md:py-20 overflow-hidden bg-gradient-to-b from-blue-700 via-blue-700/50 to-blue-white text-white">
			{/* Floating Background Images */}
			<motion.img
				src={cryptoGlass1}
				aria-hidden="true"
				className="absolute top-0 right-0 w-48 md:w-72 opacity-50 blur-sm pointer-events-none select-none"
				animate={{ y: [0, -20, 0] }}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.img
				src={cryptoGlass1}
				aria-hidden="true"
				className="absolute bottom-0 left-0 w-48 md:w-72 opacity-50 blur-sm pointer-events-none select-none"
				animate={{ y: [0, 20, 0] }}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="flex flex-col items-center text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-3xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
					>
						Comprehensive Freight Solutions for Every Need
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white font-regular sm:text-lg max-w-2xl mb-8"
					>
						From urgent air cargo to cost-effective ocean freight, we've got you covered with 
						expert logistics solutions tailored to your business needs.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-col sm:flex-row gap-4"
					>
						<Link to="/quote">
							<button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">
								Get a Quote
								<ChevronRight size={20} />
							</button>
						</Link>
						<Link to="/contact">
							<button className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
								Speak with an Expert
								<ChevronRight size={20} />
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ServicesHero;
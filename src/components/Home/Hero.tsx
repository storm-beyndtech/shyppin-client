"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
	return (
		<section className="relative w-full py-20 md:py-28 overflow-hidden text-white flex items-center justify-center">
			{/* Video Background */}
			<div className="absolute inset-0 z-0">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover"
					onError={(e) => {
						// Fallback: hide video and show gradient background
						e.currentTarget.style.display = "none";
						e.currentTarget.parentElement!.style.background =
							"linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)";
					}}
				>
					{/* Primary source - Professional shipping/maritime operations */}
					<source
						src="https://www.optimashipbroking.com/wp-content/uploads/2024/05/optima-home-hero-02.mp4"
						type="video/mp4"
					/>
					{/* Backup source - Container shipping/logistics */}
					<source src="https://cdn.pixabay.com/video/2019/05/17/23759-337232393_large.mp4" type="video/mp4" />
					{/* Additional backup - Port/logistics operations */}
					<source
						src="https://videos.pexels.com/video-files/3843433/3843433-uhd_2560_1440_30fps.mp4"
						type="video/mp4"
					/>
				</video>
				{/* Dark overlay for better text readability */}
				<div className="absolute inset-0 bg-black/70"></div>
				{/* Fallback gradient background */}
				<div className="absolute inset-0 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 -z-10"></div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="flex flex-col sm:items-center sm:text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl md:text-7xl font-medium mb-6"
					>
						Global Freight Solutions
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white font-regular sm:text-lg max-w-2xl mb-8"
					>
						Ship smarter with real-time tracking, competitive rates, and expert support across air, ocean, and
						ground logistics.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-wrap gap-4"
					>
						<Link to="/quote">
							<button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">
								Get a Quote
								<ChevronRight size={20} />
							</button>
						</Link>
						<Link to="/track">
							<button className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
								Track Shipment
								<ChevronRight size={20} />
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

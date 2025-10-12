import { motion } from "framer-motion";
import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
	return (
		<section className="relative sm:min-h-[500px] w-full py-16 md:py-24 overflow-hidden text-white grid place-content-center">
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
					{/* Primary source - Port cranes video from Optima about page */}
					<source src="https://www.optimashipbroking.com/wp-content/uploads/2024/05/cranes-unloading.mp4" type="video/mp4" />
					{/* Backup source - Professional shipping/maritime operations */}
					<source src="https://www.optimashipbroking.com/wp-content/uploads/2024/05/optima-home-hero-02.mp4" type="video/mp4" />
					{/* Additional backup - Container shipping/logistics */}
					<source src="https://cdn.pixabay.com/video/2019/05/17/23759-337232393_large.mp4" type="video/mp4" />
				</video>
				{/* Dark overlay for better text readability */}
				<div className="absolute inset-0 bg-black/70"></div>
				{/* Fallback gradient background */}
				<div className="absolute inset-0 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 -z-10"></div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
				<div className="flex flex-col items-start text-left max-w-4xl">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight"
					>
						Connecting the World, One Shipment at a Time
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-white text-lg leading-relaxed mb-8"
					>
						Since 2020, Shyppin has been simplifying global logistics for businesses of all sizes. 
						We leverage cutting-edge technology and a global network of partners to provide 
						enterprise-level logistics solutions at accessible prices.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col sm:flex-row gap-4"
					>
						<Link to="/quote">
							<button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
								Get a Quote <ChevronRight className="w-5 h-5" />
							</button>
						</Link>
						<Link to="/contact">
							<button className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
								Contact Us <ChevronRight className="w-5 h-5" />
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

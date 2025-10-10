import { motion } from "framer-motion";
import type { FC } from "react";
import cryptoGlass from "../../assets/Futuristic_Glass_Cube.png";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
	return (
		<section className="relative sm:min-h-[500px] w-full py-16 md:py-24 overflow-hidden bg-gradient-to-b from-blue-700 to-blue-50/10 text-white">
			{/* Floating Background Cubes */}
			<motion.img
				src={cryptoGlass}
				alt="crypto illustration"
				className="absolute top-0 right-0 w-60 md:w-80 opacity-50 blur-md pointer-events-none select-none"
				animate={{ y: [0, -30, 0] }}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.img
				src={cryptoGlass}
				alt="crypto illustration"
				className="absolute bottom-0 left-0 w-60 md:w-80 opacity-50 blur-md pointer-events-none select-none"
				animate={{ y: [0, 30, 0] }}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 md:px-12">
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

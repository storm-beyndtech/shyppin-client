import { motion } from "framer-motion";
import type { FC } from "react";
import cryptoGlass1 from "../../assets/Futuristic_Glass_Cube.png";
import cryptoGlass2 from "../../assets/Futuristic_Glass_Cube.png";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
	return (
		<section className="sm:min-h-[400px] relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-b from-blue-700 to-blue-50/10 text-white">
			{/* Animated Background Images */}
			<motion.img
				src={cryptoGlass1}
				alt="crypto illustration"
				className="absolute top-0 right-0 w-60 md:w-80 opacity-50 blur-md pointer-events-none select-none"
				animate={{ y: [0, -30, 0] }}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.img
				src={cryptoGlass2}
				alt="crypto illustration"
				className="absolute bottom-0 left-0 w-60 md:w-80 opacity-50 blur-md pointer-events-none select-none"
				animate={{ y: [0, 30, 0] }}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
			/>

			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="flex flex-col items-start text-left mb-12">
					{/* Heading */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.2]"
					>
						Upcoming Events & Webinars
					</motion.h1>

					{/* Supporting Text */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
					>
						Explore technology future & finance with innovative leaders. Our events are designed to inspire,
						educate, and connect change-makers like you.
					</motion.p>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<Link to="/login">
							<button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
								Discover More
								<ChevronRight className="w-5 h-5" />
							</button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

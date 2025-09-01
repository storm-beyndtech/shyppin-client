import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { FC } from "react";
import cryptoGlass from "../../assets/Futuristic_Glass_Cube.png";

const Cta: FC = () => {
	return (
		<section className="relative w-full py-16 md:py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="bg-gray-950 rounded-xl overflow-hidden"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 items-center">
						{/* Text Content */}
						<div className="p-8 md:p-12 lg:p-12 text-white">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								viewport={{ once: true }}
								className="text-4xl md:text-5xl font-semibold mb-6 Poppins"
							>
								Global Impact
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								viewport={{ once: true }}
								className="text-white/90 text-lg mb-8 max-w-md"
							>
								We are a global, science driven, patient focused company. We are committed to transforming the
								future of technology and innovation.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								viewport={{ once: true }}
							>
								<button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors inline-flex items-center group">
									Create an Account
									<span className="ml-2 bg-blue-500 text-white rounded-full p-3 group-hover:bg-blue-600 transition-colors">
										<ArrowRight size={16} />
									</span>
								</button>
							</motion.div>
						</div>

						{/* Image Section */}
						<div className="relative h-full min-h-[300px] lg:min-h-[400px]">
							{/* Device/Product Image */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								viewport={{ once: true }}
								className="absolute inset-0 flex items-center justify-center"
							>
								<div className="relative">
									{/* Blue glow effect */}
									<div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-300 rounded-full blur-xl opacity-70"></div>

									{/* Placeholder for the device image */}
									<img
										src={cryptoGlass || "/placeholder.svg"}
										alt="Innovative device"
										className="relative z-10 max-h-[350px] w-auto object-contain"
									/>
								</div>
							</motion.div>

							{/* Background elements - constrained */}
							<div className="absolute bottom-0 right-0 max-w-full overflow-hidden">
								<div className="text-blue-500/10 text-[120px] font-bold leading-none">Blue.</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Cta;

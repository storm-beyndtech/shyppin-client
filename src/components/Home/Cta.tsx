import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { FC } from "react";

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
								Ready to Ship?
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								viewport={{ once: true }}
								className="text-white/90 text-lg mb-8 max-w-md"
							>
								Join thousands of businesses worldwide who trust Shyppin for their freight logistics. Get
								instant quotes and start shipping smarter today.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								viewport={{ once: true }}
								className="flex flex-col sm:flex-row gap-4"
							>
								<button className="gap-3 w-fit bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors inline-flex items-center group">
									Get a Quote
									<span className=" bg-blue-500 text-white rounded-full p-3 group-hover:bg-blue-600 transition-colors">
										<ArrowRight size={16} />
									</span>
								</button>
								<button className="gap-3 w-fit border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center group">
									Track Shipment
									<span className="">
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
										src={
											"https://cdn.prod.website-files.com/647068704f90b915daf19034/64c241634a9b193611e78fdd_ezgif.com-resizenow_700x700.gif"
										}
										alt="Innovative device"
										className="relative z-10 max-h-[350px] w-auto object-contain"
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Cta;

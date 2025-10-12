import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
	return (
		<section className="w-full bg-white py-12 sm:py-16">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row">
					{/* Left side - Image */}
					<div className="w-full md:w-1/3 bg-black relative overflow-hidden h-64 md:h-auto mb-6 md:mb-0">
						<motion.img
							src="https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=600"
							alt="Container ships in port - global logistics operations"
							className="w-full h-full object-cover opacity-80 grayscale"
							initial={{ scale: 1.1 }}
							whileInView={{ scale: 1 }}
							transition={{ duration: 1.5 }}
						/>
					</div>

					{/* Right side - Blue background with content */}
					<div className="w-full md:w-2/3 bg-blue-500 text-white p-6 sm:p-8 md:p-10 lg:p-12">
						<h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">About Shyppin</h3>

						<motion.h2
							className="text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							Pioneering Excellence in Global Logistics
						</motion.h2>

						<motion.p
							className="text-base sm:text-lg mb-6 sm:mb-8 text-justify"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Since 2020, Shyppin has been simplifying global logistics for businesses of all sizes. 
							We leverage cutting-edge technology and a worldwide network of trusted partners to provide 
							enterprise-level logistics solutions at accessible prices.
						</motion.p>

						<motion.p
							className="text-base sm:text-lg mb-8 sm:mb-12 text-justify"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							Our mission is to continue providing top-tier services in the freight industry, maintaining 
							the quality and professionalism that has made us a trusted partner for businesses worldwide. 
							We specialize in air freight, ocean freight, ground transportation, and comprehensive logistics solutions.
						</motion.p>

						{/* Stats */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
							<motion.div
								className="text-left max-sm:max-w-32"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<h3 className="text-4xl md:text-5xl font-bold">
									200<span className="text-3xl">+</span>
								</h3>
								<p className="text-xs sm:text-sm mt-2">Countries & Territories Served</p>
							</motion.div>

							<motion.div
								className="text-left max-sm:max-w-32"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
							>
								<h3 className="text-4xl md:text-5xl font-bold">
									24<span className="text-3xl">/7</span>
								</h3>
								<p className="text-xs sm:text-sm mt-2">Customer Support</p>
							</motion.div>

							<motion.div
								className="text-left"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
							>
								<h3 className="text-4xl md:text-5xl font-bold">
									99<span className="text-3xl">%</span>
								</h3>
								<p className="text-xs sm:text-sm mt-2">On-Time Delivery Rate</p>
							</motion.div>
						</div>

						{/* Optional CTA button */}
						<motion.div
							className="mt-8 sm:mt-12"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							<a
								href="/services"
								className="inline-flex items-center bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors"
							>
								Learn More <ArrowRight className="ml-2 h-4 w-4" />
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

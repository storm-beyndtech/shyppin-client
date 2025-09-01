import { motion } from "framer-motion";
import { useState } from "react";

export default function TradingEducation() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section id="trading-education" className="py-12 sm:py-16 md:py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Dive Deeper</h2>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Mastering Markets</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-6">
							Profyt-Opt Society is committed to redefining how individuals and enterprises approach asset
							transformation. Our educational initiatives empower learners with the knowledge and tools to
							navigate trading, markets, and financial instruments with confidence.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Through engaging content and practical solutions, we bridge innovation with actionable
							strategies, fostering sustainable growth in the world of finance.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden cursor-pointer"
						onClick={() => setIsModalOpen(true)}
					>
						<img
							src="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg"
							alt="Trading education video"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
							<h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">
								Explore Trading & Markets
							</h3>
							<p className="text-white/80 text-sm sm:text-base">
								Discover the essentials of trading, markets, and financial instruments
							</p>
						</div>
						<div className="absolute inset-0 flex items-center justify-center">
							<motion.div
								className="bg-white/90 rounded-full p-4 shadow-lg"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<svg className="w-12 h-12 text-[#1e56ff]" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							</motion.div>
						</div>
					</motion.div>
				</div>

				{isModalOpen && (
					<motion.div
						className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsModalOpen(false)}
					>
						<div
							className="relative bg-white rounded-lg w-full max-w-3xl p-4"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
								onClick={() => setIsModalOpen(false)}
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<div className="aspect-w-16 aspect-h-9">
								<iframe
									className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
									src="https://www.youtube.com/embed/BxNxnj_JWTY?si=eetuJtrjMQZPV0iR"
									title="Trading Education Video"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</section>
	);
}

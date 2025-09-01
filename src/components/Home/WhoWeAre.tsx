import { motion } from "framer-motion";
import type { FC } from "react";

const WhoWeAre: FC = () => {
	return (
		<section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
			{/* Decorative Circles - constrained with max-width */}
			<div className="absolute top-20 left-5 sm:left-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
			<div className="absolute bottom-40 right-5 sm:right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
			<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full opacity-10 blur-2xl"></div>

			{/* Grid Section */}
			<div className="max-ctn flex flex-wrap items-center gap-8 sm:justify-center">
				{/* Left: Stats */}
				<div className="flex flex-col gap-6 w-full max-w-xs">
					{[
						{ number: 5301, label: "Finished Projects", bg: "bg-blue-600", dot: "bg-black" },
						{ number: 18201, label: "Global Clients", bg: "bg-blue-600", dot: "bg-black" },
					].map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							viewport={{ once: true }}
							className="relative w-full max-w-md"
						>
							<div className={`${item.bg} p-7 py-4 relative z-10`}>
								<h3 className="text-4xl font-bold text-white mb-1">{item.number}+</h3>
								<p className="text-sm font-medium text-white/70">{item.label}</p>
							</div>
							<div className="absolute -right-2 -bottom-2 z-0">
								<div className="grid grid-cols-3 gap-1">
									{[...Array(6)].map((_, i) => (
										<div key={i} className={`w-2 h-2 ${i % 2 === 0 ? item.dot : "bg-transparent"}`} />
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<div className="w-full max-w-3xl text-justify indent-0 leading-relaxed">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-700 w-full mb-5"
					>
						We are committed to serving as your trusted partner, preserving and growing your wealth through
						diverse investment opportunities in mining, agriculture, and philanthropy.
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-gray-700 w-full"
					>
						With a steadfast dedication to excellence and deep understanding of global financial markets, we
						offer comprehensive private wealth planning services--customized for your needs and aspirations.
					</motion.p>
				</div>
			</div>

			{/* Bottom-right decorative dots */}
			<div className="absolute bottom-10 right-10">
				<div className="grid grid-cols-4 gap-1">
					{[...Array(8)].map((_, i) => (
						<div key={`br-${i}`} className={`w-3 h-3 ${i % 2 === 0 ? "bg-blue-500" : "bg-transparent"}`} />
					))}
				</div>
			</div>
		</section>
	);
};

export default WhoWeAre;

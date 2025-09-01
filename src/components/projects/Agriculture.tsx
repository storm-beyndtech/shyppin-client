import { motion } from "framer-motion";
import { ArrowRight, Leaf, Globe, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

import agricultureImage from "../../assets/agriculture.jpg";

export default function Agriculture() {
	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6 },
		},
	};

	return (
		<section id="agriculture" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<h2 className="text-4xl font-bold mb-2">Agricultural Investment</h2>
					<div className="w-20 h-1 bg-[#1e56ff]"></div>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="order-2 lg:order-1"
					>
						<h3 className="text-2xl font-bold mb-4">Blue Scope Properties</h3>
						<p className="text-gray-700 mb-6">
							Blue Scope has a longstanding history in agriculture, having owned and operated iconic cattle
							stations such as Ashburton Downs and Hamersley Station in Western Australia for decades.
							Expanding its agricultural footprint strategically, the group has made substantial investments
							in pastoral stations and agribusinesses.
						</p>
						<p className="text-gray-700 mb-6">
							Blue Scope currently owns and operates more than 14 properties across Australia, spanning from
							Western Australia to New South Wales. These stations and farms play a pivotal role in producing
							top-quality beef for both domestic and international markets.
						</p>
						<p className="text-gray-700">
							Committed to enhancing productivity and sustainability, Blue Scope leverages cutting-edge
							technology across its properties. Innovations such as digital UHF communications systems,
							walk-over weighing, solar power, remote bore monitoring, and drones are revolutionizing
							management practices and improving cattle welfare.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden"
					>
						<img src={agricultureImage} alt="Agricultural landscape" className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
							<h3 className="text-white text-xl font-bold mb-2">Sustainable Agriculture</h3>
							<p className="text-white/80">Investing in the future of food production and land management</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div className="bg-white p-6 rounded-lg shadow-sm" variants={itemVariants}>
						<Leaf className="h-10 w-10 text-[#1e56ff] mb-4" />
						<h3 className="text-xl font-bold mb-3">Sustainable Practices</h3>
						<p className="text-gray-700">
							As global demand for food surges, Australia emerges as a premier food supplier and a reliable
							partner in food security. To capitalize on growth opportunities, Australia seeks investment in
							innovation, agriculture production, and advanced food processing, positioning itself as a key
							player in the global food market.
						</p>
					</motion.div>

					<motion.div className="bg-white p-6 rounded-lg shadow-sm" variants={itemVariants}>
						<Globe className="h-10 w-10 text-[#1e56ff] mb-4" />
						<h3 className="text-xl font-bold mb-3">Market Access</h3>
						<p className="text-gray-700">
							Australia offers a stable, resilient, and diversified environment for business, making it an
							attractive destination for investors in agribusiness and food industries. With a transparent
							regulatory framework and strong trade ties to the Asia-Pacific region, investors benefit from
							Australia's network of free trade agreements.
						</p>
					</motion.div>

					<motion.div className="bg-white p-6 rounded-lg shadow-sm" variants={itemVariants}>
						<BarChart3 className="h-10 w-10 text-[#1e56ff] mb-4" />
						<h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
						<p className="text-gray-700">
							International investment in Australia's agriculture and food sector is on the rise, driven by
							the high demand for safe, premium food products and integration into regional supply chains.
							Agribusiness presents significant opportunities for economic growth, emphasizing the importance
							of international partnerships.
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div className="bg-white p-8 rounded-lg border border-gray-200">
						<h3 className="text-2xl font-bold mb-6">Government Support</h3>
						<p className="text-gray-700 mb-6">
							The Australian Government is committed to enhancing the global competitiveness of the
							agribusiness and food sector. Through initiatives outlined in the agricultural competitiveness
							white paper and the white paper on developing northern Australia, the government aims to bolster
							supply chains, invest in research for productivity growth, and expand overseas markets.
						</p>
						<div className="flex justify-end">
							<Link
								to="/agriculture-projects"
								className="inline-flex items-center text-[#1e56ff] font-medium hover:underline"
							>
								Learn more about our agricultural projects <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

import { motion } from "framer-motion";
import { ArrowRight, Droplet, Flame, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import oilGasImage from "../../assets/oil-gas.jpg";

export default function OilAndGas() {
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
		<section id="oil-gas" className="py-12 sm:py-16 md:py-20 bg-white">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Oil & Gas</h2>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden order-2 lg:order-1"
					>
						<img src={oilGasImage} alt="Oil and gas operations" className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
							<h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">Energy Solutions</h3>
							<p className="text-white/80 text-sm sm:text-base">
								Powering Australia's future with responsible energy production
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="order-1 lg:order-2"
					>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-6">
							Australia has a long history of oil and gas production. The ongoing development of its
							substantial reserves is strengthening the country's position as a leading global player in the
							sector. Oil and gas exports are a major contributor to the Australian economy, earning A$23.2
							billion in 2015.
						</p>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-6">
							Oil remained the largest primary energy source in Australia, at 38 per cent in 2013–14. Gas is
							Australia's third largest energy resource after oil and coal, accounting for 24 per cent. By the
							end of the decade, Australia should be home to ten operational LNG projects with a combined
							nameplate capacity of 86 million tonnes per annum (mtpa).
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							This will put Australia on track to become the world's largest exporter of LNG by the end of the
							decade. Australia's competitive position is underpinned by a strong economy, abundant resources,
							supportive government policies, mature trade links with key markets, and the participation of
							the world's major oil and gas companies at all stages of the supply chain.
						</p>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div className="bg-gray-50 p-4 sm:p-6 rounded-lg" variants={itemVariants}>
						<h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Conventional Gas</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
							Australia has substantial conventional gas resources. Australia's proved and probable gas
							reserves stood at 126,000 petajoules, comprising 83,000 petajoules of conventional gas.
							Australia produced 2,460 petajoules of gas in 2014–15, of which 50 per cent was exported as
							liquefied natural gas(LNG).
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Around 92 per cent of Australia's conventional gas resources are located in the Carnarvon,
							Browse and Bonaparte basins off the coast of Western Australia and the Northern Territory. There
							are also resources in offshore basins along Australia's southern margin as well as in onshore
							basins. The potential for additional commercial discoveries is large.
						</p>
					</motion.div>

					<motion.div className="bg-gray-50 p-4 sm:p-6 rounded-lg" variants={itemVariants}>
						<h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Oil Resources</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
							Australia's oil resources are primarily condensate and naturally occurring liquefied petroleum
							gas (LPG) associated with large offshore gas fields. Australia also has a number of crude oil
							reserves. There is scope for growth in Australia's oil reserves in existing fields, and for new
							oil discoveries in proven basins and in underexplored frontier basins.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Australia has large unconventional oil resources hosted in oil shales. These resources, along
							with the recently recognised potential for shale gas liquids and light tight oil, could
							potentially contribute to future oil supply. Identified shale oil resources contained in
							immature oil shale deposits is estimated at 131,659 petajoules (22,391 MMbbl).
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div
						className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<Droplet className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">LNG Exports</h3>
						<p className="text-sm sm:text-base text-gray-700">
							Australia remained the world's third largest LNG exporter in 2014 and accounted for 10 per cent
							of world LNG trade. The strongest growth in Australia's export earnings will be in LNG, which is
							projected to increase from 23.2 million tonnes in 2013–14 to about 80 million tonnes in 2019–20.
						</p>
					</motion.div>

					<motion.div
						className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<Flame className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Global Demand</h3>
						<p className="text-sm sm:text-base text-gray-700">
							The growing global demand for energy, led mainly by China and India over the past decade,
							coupled with the shift in energy transition has driven a strong increase in gas demand,
							particularly LNG due to its suitability for long-distance transportation.
						</p>
					</motion.div>

					<motion.div
						className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Economic Impact</h3>
						<p className="text-sm sm:text-base text-gray-700">
							By the end of this decade Australia is expected to be the world's largest LNG exporter,
							generating estimated export earnings of almost $45 billion in 2019–20 compared to just over $17
							billion in 2014–15.
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<Link
						to="/oil-gas-projects"
						className="inline-flex items-center bg-[#1e56ff] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors"
					>
						Explore Our Energy Projects <ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

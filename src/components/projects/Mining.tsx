import { motion } from "framer-motion";
import { Users, Globe, Shield } from "lucide-react";
import miningImage from "../../assets/mining.jpg";

export default function Mining() {
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
		<section id="mining" className="py-12 sm:py-16 md:py-20 bg-white">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Mining</h2>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
							Mining is critical to securing the minerals essential for everyday life and essential to be able
							to build renewable energy projects. The mining industry produces the primary products required
							for the generation, distribution and delivery of renewable energy. The first step in the supply
							chain to create solar panels and wind turbines and EV batteries begins with mining companies
							like Blue Scope, Atlas and Roy Hill.
						</p>
						<p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
							We have existing agreements with the Kariyarra, Palyku, Nyiyaparli, Ngarla, and Nyamal People,
							and are working closely with other groups including the Banjima and Yindjibarndi People in
							regard to future activity. Over the last seven years alone, Blue Scope has contributed well in
							excess of $300 million in royalties to these communities, as well as other significant
							investments in health, education, arts and culture.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							We are proud to be West Australian owned and operated and we take a leadership role in working
							with Traditional Owners, communities and regulators to ensure we achieve best in class outcomes
							in fulfilling our license to operate on native title land. We take our responsibility seriously
							in the management of the environment and preservation of culture and heritage, all of which must
							be reviewed through a rigorous approval process before development of new projects, and
							ultimately mining operations, can be undertaken.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden"
					>
						<img src={miningImage} alt="Mining operations" className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
							<h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">
								Sustainable Mining Practices
							</h3>
							<p className="text-white/80 text-sm sm:text-base">
								Committed to responsible resource extraction and community development
							</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div className="bg-gray-50 p-4 sm:p-6 rounded-lg" variants={itemVariants}>
						<Users className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Community Engagement</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
							The Profyt-Opt Partners believes it is important to follow the science. We are 100% compliant
							with all legislation and regulations established by the government targeting a reduction of
							emissions by 43% below 2005 levels by 2030 and net zero by 2050.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Part of these efforts are that miners are required to consult and reach agreement with the
							Traditional Owners of the lands on which we operate – without agreement with Traditional Owners
							projects can't proceed.
						</p>
					</motion.div>

					<motion.div className="bg-gray-50 p-4 sm:p-6 rounded-lg" variants={itemVariants}>
						<Shield className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Environmental Stewardship</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
							The regulatory framework also encompasses the management of the environment (including flora,
							fauna, water, land rehabilitation, and carbon emissions), native title, and cultural heritage
							engagement.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							This is part of our landscape and we take our responsibilities in meeting our obligations
							seriously. OceanGlobal has been a responsible mining company for decades and complies fully with
							all its obligations.
						</p>
					</motion.div>

					<motion.div className="bg-gray-50 p-4 sm:p-6 rounded-lg" variants={itemVariants}>
						<Globe className="h-8 w-8 sm:h-10 sm:w-10 text-[#1e56ff] mb-3 sm:mb-4" />
						<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Supply Chain Optimization</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
							We optimize the entire proppant supply chain: acquisition, transportation, and storage. This
							enables us to provide efficient planning, scheduling, production, reporting, monitoring, and
							knowledge sharing services across our customers and service partners.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Simplify the complexity of an evolving global mining sector. From worldwide exploration,
							discoveries, development, production, mine cost analysis, acquisitions activity, industrials and
							base metals markets forecasts and analysis.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

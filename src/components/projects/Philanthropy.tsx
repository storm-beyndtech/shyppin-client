import { motion } from "framer-motion";
import { Heart, GraduationCap, Award } from "lucide-react";
import philanthropyImage from "../../assets/philanthropy.jpg";

export default function Philanthropy() {
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
		<section id="philanthropy" className="py-12 sm:py-16 md:py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Philanthropy</h2>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Community Impact</h3>
						<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-6">
							Profyt-Opt Society showcases its dedication to investing in initiatives that enhance the
							well-being of individuals and communities nationwide. Through strategic partnerships and
							targeted programs, we aim to create lasting positive change in the communities where we operate.
						</p>
						<p className="text-sm sm:text-base text-gray-700">
							Our philanthropic efforts focus on education, cultural preservation, and community development.
							We believe that by investing in these areas, we can help build stronger, more resilient
							communities and create opportunities for future generations.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden"
					>
						<img src={philanthropyImage} alt="Community engagement" className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
							<h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">
								Building Better Communities
							</h3>
							<p className="text-white/80 text-sm sm:text-base">
								Supporting initiatives that create lasting positive impact
							</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div className="bg-white rounded-lg overflow-hidden shadow-sm" variants={itemVariants}>
						<div className="h-36 sm:h-48 bg-[#1e56ff]/10 flex items-center justify-center">
							<GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-[#1e56ff]" />
						</div>
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Hanrine Futures Scholarships</h3>
							<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
								This Indigenous scholarship and career development program begins when students enter the
								program and continues through to employment. Hanrine Futures launched in 2022 and already has
								10 students who have been awarded scholarships.
							</p>
							<p className="text-sm sm:text-base text-gray-700">
								The program works in partnership with Madalah. A key differentiator of the Hanrine Futures
								Program is the combination of education/mentoring support and work experience/employment
								opportunities.
							</p>
						</div>
					</motion.div>

					<motion.div className="bg-white rounded-lg overflow-hidden shadow-sm" variants={itemVariants}>
						<div className="h-36 sm:h-48 bg-[#1e56ff]/10 flex items-center justify-center">
							<Award className="h-12 w-12 sm:h-16 sm:w-16 text-[#1e56ff]" />
						</div>
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">NAIDOC</h3>
							<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
								Blue Scope Partners has been a sponsor of NAIDOC since 2012, which celebrates and honours the
								successes of Aboriginal and Torres Strait Islander individuals and organisations who have made
								outstanding contributions to the community.
							</p>
							<p className="text-sm sm:text-base text-gray-700">
								Over the course of the Group's involvement with NAIDOC, Blue Scope Partners has supported
								various awards such as Business of the Year, Program of the Year, Female Elder of the Year and
								the Outstanding Achievement Award.
							</p>
						</div>
					</motion.div>

					<motion.div className="bg-white rounded-lg overflow-hidden shadow-sm" variants={itemVariants}>
						<div className="h-36 sm:h-48 bg-[#1e56ff]/10 flex items-center justify-center">
							<Heart className="h-12 w-12 sm:h-16 sm:w-16 text-[#1e56ff]" />
						</div>
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Brisbane Fashion Festival</h3>
							<p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
								Blue Scope Partners joined as a new partner at the Brisbane Fashion Festival in 2022. Blue
								Scope lent its support to the Next Gen Group Show, assisting the Fashion Festival in
								showcasing the brightest up-and-coming design talent, including supporting and celebrating
								local emerging and First Nations designers.
							</p>
							<p className="text-sm sm:text-base text-gray-700">
								In addition, Roy Hill provides funding that enables Indigenous designers to showcase their
								talents at New York fashion week.
							</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

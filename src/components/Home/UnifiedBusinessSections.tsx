import { motion } from "framer-motion";
import {
	HardHat,
	ArrowRight,
	BarChart3,
	Globe,
	Heart,
	Users,
	Wheat,
	Droplets,
	Fuel,
	Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

// Static image imports (replace these with your actual images)
import agricultureImage from "../../assets/agriculture.jpg";
import miningImage from "../../assets/mining.jpg";
import oilGasImage from "../../assets/oil-gas.jpg";
import philanthropyImage from "../../assets/philanthropy.jpg";

const sectionsData = [
	{
		id: "agriculture",
		title: "Agricultural Innovations",
		description:
			"Sustainable farming solutions and agricultural innovations to feed the world while protecting our environment for future generations.",
		icon: Wheat,
		image: agricultureImage,
		route: "/agriculture",
		color: "blue",
		features: [
			{
				icon: Leaf,
				title: "Sustainable Farming",
				description: "Implementing eco-friendly agricultural practices and organic farming methods.",
			},
			{
				icon: BarChart3,
				title: "Crop Analytics",
				description: "Advanced data analytics for optimizing crop yields and farm productivity.",
			},
			{
				icon: Globe,
				title: "Global Supply Chain",
				description: "Connecting farmers to global markets through efficient supply chain networks.",
			},
		],
		highlight: "Feeding the Future Sustainably",
		highlightDesc: "Innovative solutions for modern agriculture challenges",
	},
	{
		id: "mining",
		title: "Mining Investment & Engagement",
		description:
			"Evaluate the global mining sector, monitor the volatile metals market, mitigate risk, and align ESG goals with essential data, analytics, and insights.",
		icon: HardHat,
		image: miningImage,
		route: "/mining",
		color: "blue",
		features: [
			{
				icon: BarChart3,
				title: "Market Analysis",
				description: "Comprehensive insights into global mining markets and commodity trends.",
			},
			{
				icon: Globe,
				title: "Global Operations",
				description: "Strategic mining investments across key resource-rich regions worldwide.",
			},
			{
				icon: Leaf,
				title: "Sustainable Mining Practices",
				description: "Balancing resource extraction with environmental responsibility",
			},
		],
		highlight: "Responsible Resource Extraction",
		highlightDesc: "Mining with environmental and social responsibility",
	},
	{
		id: "oil-gas",
		title: "Oil & Gas Operations",
		description:
			"Leading energy solutions through innovative oil and gas exploration, production, and distribution while transitioning to cleaner energy alternatives.",
		icon: Fuel,
		image: oilGasImage,
		route: "/oil-gas",
		color: "blue",
		features: [
			{
				icon: Droplets,
				title: "Exploration & Production",
				description: "Advanced exploration techniques and efficient production methods.",
			},
			{
				icon: BarChart3,
				title: "Energy Analytics",
				description: "Data-driven insights for optimizing energy production and distribution.",
			},
			{
				icon: Leaf,
				title: "Clean Energy Transition",
				description: "Investing in renewable energy and sustainable practices.",
			},
		],
		highlight: "Energy Innovation",
		highlightDesc: "Powering the future with responsible energy solutions",
	},
	{
		id: "philanthropy",
		title: "Philanthropy",
		description:
			"Profyt-Opt Society showcases its dedication to investing in initiatives that enhance the well-being of individuals and communities nationwide.",
		icon: Heart,
		image: philanthropyImage,
		route: "/philanthropy",
		color: "blue",
		features: [
			{
				icon: Users,
				title: "Community Support",
				description:
					"Investing in local communities through education, health, and infrastructure initiatives.",
			},
			{
				icon: Globe,
				title: "Global Impact",
				description: "Supporting international humanitarian efforts and sustainable development projects.",
			},
			{
				icon: Heart,
				title: "Building Better Communities",
				description: "Supporting initiatives that create lasting positive impact",
			},
		],
		highlight: "Making a Difference",
		highlightDesc: "Creating positive impact in communities worldwide",
	},
];

export default function UnifiedBusinessSections() {
	return (
		<div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{sectionsData.map((section, index) => (
					<motion.section
						key={section.id}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: index * 0.2 }}
						viewport={{ once: true }}
						className={`mb-20 last:mb-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
					>
						<div className={`lg:flex lg:gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
							{/* Content Section */}
							<div className="lg:w-1/2 mb-8 lg:mb-0">
								<div className="flex items-center mb-4">
									<div className="p-3 bg-blue-100 rounded-xl mr-4">
										<section.icon className="w-8 h-8 text-blue-600" />
									</div>
									<div>
										<h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
										<div className="w-16 h-1 bg-blue-600 rounded"></div>
									</div>
								</div>

								<p className="text-lg text-gray-600 mb-8 leading-relaxed">{section.description}</p>

								{/* Features Grid */}
								<div className="grid md:grid-cols-2 gap-6 mb-8">
									{section.features.map((feature, featureIndex) => (
										<motion.div
											key={featureIndex}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
											viewport={{ once: true }}
											className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
										>
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<feature.icon className="w-5 h-5 text-blue-600" />
											</div>
											<div>
												<h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
												<p className="text-sm text-gray-600">{feature.description}</p>
											</div>
										</motion.div>
									))}
								</div>

								{/* CTA Button */}
								<Link
									to={section.route}
									className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
								>
									<span>Click here for full details</span>
									<ArrowRight className="w-5 h-5 ml-2" />
								</Link>
							</div>

							{/* Image Section */}
							<div className="lg:w-1/2 relative">
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
									className="relative overflow-hidden shadow-2xl"
								>
									<img
										src={section.image}
										alt={section.title}
										className="w-full h-96 sm:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
									/>

									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

									{/* Highlight Text */}
									<div className="absolute bottom-6 left-6 right-6 text-white">
										<h3 className="text-xl font-bold mb-2">{section.highlight}</h3>
										<p className="text-sm opacity-90">{section.highlightDesc}</p>
									</div>
								</motion.div>

								{/* Decorative Elements */}
								<div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-60 -z-10"></div>
								<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-50 rounded-full opacity-40 -z-10"></div>
							</div>
						</div>

						{/* Divider */}
						{index < sectionsData.length - 1 && (
							<div className="mt-20 flex justify-center">
								<div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
							</div>
						)}
					</motion.section>
				))}
			</div>

			{/* Background Decorative Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
				<div className="absolute bottom-1/4 right-10 w-60 h-60 bg-blue-200 rounded-full opacity-15 blur-3xl"></div>
			</div>
		</div>
	);
}

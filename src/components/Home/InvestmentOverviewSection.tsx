import {
	TrendingUp,
	Shield,
	Globe,
	Target,
	Building,
	Droplets,
	Cpu,
	Stethoscope,
	ArrowRight,
	BarChart3,
} from "lucide-react";

const sectionsData = [
	{
		id: "investment-approach",
		title: "Investment Excellence",
		description:
			"We deliver enhanced returns by investing in traditional asset-backed infrastructure companies. Our international team specializes in financial markets, real estate, and cryptocurrency trading through qualified professionals. We provide reliable high income while minimizing risks through automated solutions.",
		icon: TrendingUp,
		image: "https://res.cloudinary.com/ddb1vjioq/image/upload/v1750864830/Futuristic_Data_Display_bkpyub.jpg",
		highlight: "Reliable High Income",
		highlightDesc: "Professional trading across global markets",
	},
	{
		id: "global-portfolio",
		title: "Diversified Global Portfolio",
		description:
			"Since 2013, Vestor Solution focuses on blue chip technology, energy sectors, hospitality, logistics, and biomedical research. Our portfolio spans from traditional giants like BP and Unilever to modern leaders like Amazon, Netflix, and Facebook, plus rising companies in developing markets.",
		icon: Globe,
		image:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		highlight: "Market Evolution",
		highlightDesc: "From traditional giants to emerging opportunities",
	},
];

export default function InvestmentOverviewSection() {
	return (
		<div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{sectionsData.map((section, index) => (
					<section
						key={section.id}
						className={`mb-20 last:mb-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
					>
						<div className={`lg:flex lg:gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
							{/* Content Section */}
							<div className="lg:w-1/2 mb-8 lg:mb-0">
								<div className="flex items-center mb-4">
									<div className="p-3 bg-blue-100 rounded-xl mr-4">
										<section.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
									</div>
									<div>
										<h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
										<div className="w-16 h-1 bg-blue-600 rounded"></div>
									</div>
								</div>

								<p className="text-lg text-gray-600 mb-8 leading-relaxed">{section.description}</p>

								{/* Features Grid */}
								{index === 0 ? (
									<div className="grid md:grid-cols-2 gap-4 mb-8">
										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Shield className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Risk Management</h3>
												<p className="text-xs text-gray-600">Reliable income with minimized risks</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Target className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Automated Solutions</h3>
												<p className="text-xs text-gray-600">Simplified investor relations</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<BarChart3 className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Profit Focus</h3>
												<p className="text-xs text-gray-600">Strategic profit optimization</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Globe className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Global Markets</h3>
												<p className="text-xs text-gray-600">International trading expertise</p>
											</div>
										</div>
									</div>
								) : (
									<div className="grid md:grid-cols-2 gap-4 mb-8">
										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Cpu className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Technology & Startups</h3>
												<p className="text-xs text-gray-600">Blue chip IT and acquisitions</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Droplets className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Energy Solutions</h3>
												<p className="text-xs text-gray-600">Oil, gas, and green energy</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Building className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Infrastructure</h3>
												<p className="text-xs text-gray-600">Hospitality and logistics</p>
											</div>
										</div>

										<div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
											<div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
												<Stethoscope className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Biomedical</h3>
												<p className="text-xs text-gray-600">Research and development</p>
											</div>
										</div>
									</div>
								)}

								{/* CTA Button */}
								<button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
									<span className="text-sm">Learn More About Our Approach</span>
									<ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
								</button>
							</div>

							{/* Image Section */}
							<div className="lg:w-1/2 relative">
								<div className="relative overflow-hidden shadow-2xl rounded-lg">
									<img
										src={section.image}
										alt={section.title}
										className="w-full h-[450px] sm:h-[550px] object-cover transform hover:scale-105 transition-transform duration-700"
									/>

									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

									{/* Highlight Text */}
									<div className="absolute bottom-6 left-6 right-6 text-white">
										<h3 className="text-lg font-bold mb-2">{section.highlight}</h3>
										<p className="text-sm opacity-90">{section.highlightDesc}</p>
									</div>
								</div>

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
					</section>
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

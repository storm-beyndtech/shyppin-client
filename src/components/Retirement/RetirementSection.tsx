import {
	CheckCircle,
	Shield,
	TrendingUp,
	Users,
	Calculator,
	Heart,
	Target,
	PiggyBank,
	ArrowRight,
	Award,
	Clock,
	Briefcase,
} from "lucide-react";

const RetirementPlanning = () => {
	const benefits = [
		{
			icon: <Shield className="w-6 h-6" strokeWidth={1.5} />,
			title: "Financial Security",
			description: "Live comfortably without worrying about running out of money in your golden years.",
		},
		{
			icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
			title: "Maintain Lifestyle",
			description: "Continue pursuing your passions, traveling, and spending time with loved ones.",
		},
		{
			icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
			title: "Tax Efficiency",
			description: "Minimize tax liabilities and maximize your retirement income through strategic planning.",
		},
		{
			icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
			title: "Legacy Planning",
			description: "Ensure your assets are passed on smoothly to your beneficiaries.",
		},
	];

	const keyElements = [
		"Setting clear retirement goals and timeline",
		"Establishing a realistic retirement budget",
		"Choosing the right investment strategy",
		"Maximizing retirement account benefits",
		"Planning for healthcare and long-term care costs",
		"Accounting for inflation and longevity",
	];

	const whyChooseUs = [
		{
			icon: <Target className="w-7 h-7" strokeWidth={1.5} />,
			title: "Tailored Solutions",
			description:
				"Personalized retirement plans that reflect your unique vision for the future, whether it's early retirement or world travel.",
		},
		{
			icon: <Award className="w-7 h-7" strokeWidth={1.5} />,
			title: "Expert Guidance",
			description:
				"Experienced financial advisors specializing in retirement planning with deep expertise in markets and tax strategies.",
		},
		{
			icon: <Calculator className="w-7 h-7" strokeWidth={1.5} />,
			title: "Comprehensive Planning",
			description:
				"Complete financial strategy addressing investments, pensions, real estate, and insurance needs.",
		},
		{
			icon: <TrendingUp className="w-7 h-7" strokeWidth={1.5} />,
			title: "Smart Investments",
			description: "Well-diversified portfolios that balance growth and income while protecting your assets.",
		},
		{
			icon: <PiggyBank className="w-7 h-7" strokeWidth={1.5} />,
			title: "Tax-Advantaged Savings",
			description:
				"Strategic use of IRAs, Roth IRAs, and 401(k) plans to maximize benefits and minimize tax burden.",
		},
		{
			icon: <Clock className="w-7 h-7" strokeWidth={1.5} />,
			title: "Continuous Monitoring",
			description: "Regular portfolio reviews and adjustments based on market conditions and life changes.",
		},
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Workforce Optimization Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="mb-16">
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
							Workforce Optimization
						</h1>
						<div className="grid lg:grid-cols-3 gap-8 items-start">
							<div className="lg:col-span-2">
								<p className="text-xl text-gray-600 mb-8 leading-relaxed">
									Saving for retirement can be a daunting task, but with a sound strategy, it's well within
									reach. Vestor Solution is here to bring clarity to retirement planning and set you on your
									path to success. Here you'll better understand your options and find the right investment.
								</p>
							</div>
							<div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl shadow-2xl">
								<div className="flex items-center mb-4">
									<Briefcase className="w-8 h-8 mr-3 text-blue-400" strokeWidth={1.5} />
									<h3 className="text-xl font-bold">Opportunity</h3>
								</div>
								<p className="font-semibold mb-3">
									If you had the chance to double—or even quadruple—your retirement savings, you'd probably
									jump at that opportunity, right?
								</p>
								<p className="text-slate-300">
									Well, there's one simple change you can make today that's sure to boost your retirement
									savings.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Retirement Planning Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
								Retirement Planning with <span className="text-blue-500">Profyt-Opt</span>
							</h2>
							<p className="text-xl text-gray-600 mb-8 leading-relaxed">
								Planning for retirement is one of the most important financial decisions you will make in your
								lifetime. At Profyt-Opt, we understand that building a secure future requires careful
								planning and expert guidance. Whether you're just starting to save for retirement or nearing
								the end of your career, our personalized retirement planning solutions ensure you can retire
								comfortably and live the life you've always envisioned.
							</p>
							<button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
								Get Started Today
								<ArrowRight className="w-5 h-5 ml-2" strokeWidth={1.5} />
							</button>
						</div>
						<div className="relative">
							<img
								src="https://plus.unsplash.com/premium_photo-1681881045620-2d64f37ca396?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmV0aXJlbWVudHxlbnwwfHwwfHx8MA%3D%3D"
								alt="Couple planning retirement together"
								className="rounded-xl shadow-2xl w-full h-[500px] object-cover"
							/>
							<div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-sm">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
										<TrendingUp className="w-6 h-6 text-white" strokeWidth={1.5} />
									</div>
									<div>
										<p className="font-bold text-gray-900">Start Planning Today</p>
										<p className="text-gray-600 text-sm">Your future self will thank you</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What is Retirement Planning */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-start">
						<div>
							<h2 className="text-4xl font-bold text-gray-900 mb-8">What is Retirement Planning?</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								Retirement planning is the process of determining your financial goals for retirement and
								creating a strategic plan to achieve them while maintaining your standard of living.
							</p>
							<img
								src="https://plus.unsplash.com/premium_photo-1661430892115-b118272a5925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8"
								alt="Financial planning charts and graphs"
								className="rounded-xl shadow-lg w-full h-64 object-cover"
							/>
						</div>
						<div>
							<h3 className="text-2xl font-bold text-gray-900 mb-8">Key Elements of Retirement Planning</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{keyElements.map((element, index) => (
									<div key={index} className="relative overflow-hidden group">
										<div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:from-blue-100 hover:to-indigo-100">
											<div className="flex items-start space-x-4">
												<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
													<CheckCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
												</div>
												<p className="text-gray-700 leading-relaxed font-medium">{element}</p>
											</div>
											<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Why Retirement Planning is Essential */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-6">Why Retirement Planning is Essential</h2>
						<p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
							Proper retirement planning provides the foundation for a secure and fulfilling future.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{benefits.map((benefit, index) => (
							<div
								key={index}
								className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
							>
								<div className="flex items-start space-x-6">
									<div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
										{benefit.icon}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
										<p className="text-gray-600 leading-relaxed">{benefit.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Profyt-Opt */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-6">
							Why Choose <span className="text-blue-500">Profyt-Opt</span> for Your Retirement Planning?
						</h2>
						<p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
							We take a holistic approach to retirement planning, ensuring that your unique financial needs
							and goals are met.
						</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						{whyChooseUs.map((feature, index) => (
							<div key={index} className="group">
								<div className="bg-white p-8 rounded-2xl border border-gray-100 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-100">
									<div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:from-blue-700 group-hover:to-indigo-800 transition-all duration-300 group-hover:scale-110">
										{feature.icon}
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
									<p className="text-gray-600 leading-relaxed">{feature.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Healthcare & Longevity Planning */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h3 className="text-4xl font-bold text-gray-900 mb-8">Planning for Longevity and Healthcare</h3>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								With increasing life expectancies, Profyt-Opt helps you plan for a longer retirement. We
								ensure that your savings and income streams are sustainable, and we factor in healthcare costs
								to give you peace of mind in your later years.
							</p>
							<div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg">
								<h4 className="font-bold text-gray-900 mb-4 flex items-center">
									<Shield className="w-5 h-5 mr-2 text-blue-600" strokeWidth={1.5} />
									Healthcare Planning Includes:
								</h4>
								<div className="grid grid-cols-1 gap-3">
									<div className="flex items-center space-x-3">
										<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
										<span className="text-gray-700">Long-term care insurance strategies</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
										<span className="text-gray-700">Medicare supplement planning</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
										<span className="text-gray-700">Medical emergency fund allocation</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
										<span className="text-gray-700">Health savings account optimization</span>
									</div>
								</div>
							</div>
						</div>
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1524758870432-af57e54afa26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNvbnN1bHRhbnR8ZW58MHx8MHx8fDA%3D"
								alt="Senior couple enjoying retirement outdoors"
								className="rounded-xl shadow-2xl w-full h-[500px] object-cover"
							/>
							<div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
								<div className="flex items-center space-x-3">
									<Clock className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
									<div>
										<p className="text-sm font-semibold text-gray-900">Average Retirement Length</p>
										<p className="text-2xl font-bold text-blue-500">20+ Years</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RetirementPlanning;

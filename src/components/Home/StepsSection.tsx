import {
	UserPlus,
	Shield,
	CreditCard,
	TrendingUp,
	BarChart3,
	Banknote,
	ArrowRight,
	CheckCircle,
} from "lucide-react";

const StepsSection = () => {
	const steps = [
		{
			number: "01",
			icon: <UserPlus className="w-6 h-6" strokeWidth={2} />,
			title: "Register",
			description: "Create your secure account in minutes with our simple registration process.",
		},
		{
			number: "02",
			icon: <Shield className="w-6 h-6" strokeWidth={2} />,
			title: "Verify KYC",
			description: "Complete your identity verification to ensure secure and compliant investing.",
		},
		{
			number: "03",
			icon: <CreditCard className="w-6 h-6" strokeWidth={2} />,
			title: "Deposit",
			description: "Fund your account securely through multiple payment methods and channels.",
		},
		{
			number: "04",
			icon: <TrendingUp className="w-6 h-6" strokeWidth={2} />,
			title: "Earn",
			description: "Choose from our curated earning options and start building your portfolio.",
		},
		{
			number: "05",
			icon: <BarChart3 className="w-6 h-6" strokeWidth={2} />,
			title: "Track",
			description: "Monitor your investments in real-time with our comprehensive dashboard.",
		},
		{
			number: "06",
			icon: <Banknote className="w-6 h-6" strokeWidth={2} />,
			title: "Withdraw",
			description: "Access your returns anytime with our flexible withdrawal options.",
		},
	];

	return (
		<section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-50/20 overflow-hidden">
			{/* Background Assets */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Large circle - top right */}
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-blue-200/10 rounded-full blur-3xl"></div>

				{/* Medium circle - middle left */}
				<div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-100/15 to-blue-200/10 rounded-full blur-2xl"></div>

				{/* Small circle - bottom center */}
				<div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-blue-100/20 to-transparent rounded-full blur-2xl"></div>

				{/* Geometric shapes */}
				<div className="absolute top-20 right-1/4 w-4 h-4 bg-blue-300/20 rounded transform rotate-45"></div>
				<div className="absolute bottom-32 left-1/4 w-6 h-6 bg-blue-300/15 rounded-full"></div>
				<div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full"></div>

				{/* Subtle grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				></div>
			</div>

			<div className="relative max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-20">
					<h2 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-4 tracking-tight">
						How It <span className="text-gray-500">Works</span>
					</h2>
					<p className="text-xl md:text-3xl text-gray-500 font-light max-w-5xl italic leading-relaxed">
						Simple steps to get started with your investment portfolio.
					</p>
				</div>

				{/* Steps Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
					{steps.map((step, index) => (
						<div key={index} className="group relative">
							{/* Connection Line - Desktop Only */}
							{index < steps.length - 1 && (
								<div className="hidden lg:block absolute top-16 left-full w-10 h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform translate-x-0 z-0">
									<div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
										<ArrowRight className="w-4 h-4 text-blue-400" strokeWidth={2} />
									</div>
								</div>
							)}

							{/* Step Card */}
							<div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-100/50 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-white/90">
								{/* Step Number */}
								<div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-lg text-blue-700 font-bold text-sm group-hover:bg-blue-300 transition-colors duration-300">
									{step.number}
								</div>

								{/* Icon */}
								<div
									className={`w-12 h-12 bg-blue-500 rounded-[35%] flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg`}
								>
									{step.icon}
								</div>

								{/* Content */}
								<h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-300">
									{step.title}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

								{/* Status Indicator */}
								<div className="flex items-center text-sm text-blue-500 font-medium">
									<CheckCircle className="w-4 h-4 mr-2" strokeWidth={2} />
									<span>Quick & Easy</span>
								</div>

								{/* Hover Glow Effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StepsSection;

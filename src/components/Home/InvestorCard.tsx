import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { SiVisa } from "react-icons/si"; // Add this import - try this Visa logo
import type { FC } from "react";
import { Link } from "react-router-dom";

const InvestorCard: FC = () => {
	return (
		<section className="w-full py-12 md:py-16 overflow-x-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl shadow-xl"
				>
					<div className="relative z-10 p-8 md:p-12">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
							{/* Content */}
							<div className="text-white">
								<h2 className="text-3xl md:text-4xl font-bold mb-4">
									Exclusive Investor Card – Unlock Premium Benefits
								</h2>
								<p className="text-blue-100 mb-8">
									Join our exclusive investor program and gain access to premium benefits, early investment
									opportunities, and personalized financial guidance.
								</p>

								<div className="space-y-4 mb-8">
									<div className="flex items-start">
										<div className="bg-blue-600 p-2 rounded-lg mr-4">
											<Shield className="h-5 w-5 text-white" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Enhanced Security</h3>
											<p className="text-sm text-blue-100">Advanced protection for all your investments</p>
										</div>
									</div>

									<div className="flex items-start">
										<div className="bg-blue-600 p-2 rounded-lg mr-4">
											<Zap className="h-5 w-5 text-white" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Priority Access</h3>
											<p className="text-sm text-blue-100">Be first to access new investment opportunities</p>
										</div>
									</div>

									<div className="flex items-start">
										<div className="bg-blue-600 p-2 rounded-lg mr-4">
											<TrendingUp className="h-5 w-5 text-white" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Performance Analytics</h3>
											<p className="text-sm text-blue-100">
												Detailed insights into your investment portfolio
											</p>
										</div>
									</div>
								</div>

								<Link to="/support">
									<button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center group">
										Apply Now
										<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
									</button>
								</Link>
							</div>

							{/* Image/Illustration */}
							<div className="relative flex justify-center lg:justify-end">
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									className="relative"
								>
									{/* Card illustration */}
									<div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 w-72 h-96">
										{/* Visa logo */}
										<div className="absolute top-6 right-6">
											<SiVisa className="text-white text-6xl" />
										</div>

										{/* Card elements with original style */}
										<div className="absolute top-20 left-6 right-6 h-12 bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg opacity-50"></div>

										{/* Card number area */}
										<div className="absolute top-36 left-6">
											<div className="text-white font-mono text-sm tracking-wider">4532 **** **** 8901</div>
										</div>

										<div className="absolute top-48 left-6 right-6 h-8 bg-blue-300 rounded-lg opacity-30"></div>

										{/* Card holder and expiry */}
										<div className="absolute bottom-20 left-6">
											<div className="text-xs text-blue-200 uppercase tracking-wide">Card Holder</div>
											<div className="text-white text-sm font-medium">PREMIUM INVESTOR</div>
										</div>

										<div className="absolute bottom-20 right-6">
											<div className="text-xs text-blue-200 uppercase tracking-wide">Valid Thru</div>
											<div className="text-white text-sm font-medium">12/29</div>
										</div>

										<div className="absolute bottom-6 left-6 w-16 h-12 bg-blue-300 rounded-lg opacity-30"></div>

										{/* CVV area */}
										<div className="absolute bottom-8 right-6">
											<div className="text-xs text-blue-200">CVV: ***</div>
										</div>

										{/* Crypto illustration */}
										<div className="absolute bottom-4 right-20">
											<svg
												width="32"
												height="32"
												viewBox="0 0 80 80"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.1" />
												<path d="M40 16L52 40L40 48L28 40L40 16Z" fill="white" fillOpacity="0.8" />
												<path d="M40 48L52 40L40 64L28 40L40 48Z" fill="white" fillOpacity="0.6" />
											</svg>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>

					{/* Background decorative elements - constrained */}
					<div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full opacity-10"></div>
					<div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full opacity-10"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-transparent to-blue-800 opacity-20"></div>
				</motion.div>
			</div>
		</section>
	);
};

export default InvestorCard;

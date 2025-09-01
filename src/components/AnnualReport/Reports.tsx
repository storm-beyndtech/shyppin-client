"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	ArrowUp,
	ArrowDown,
	BarChart3,
	DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Reports() {
	// Financial data
	const financialData = {
		totalSales: {
			value: 161.5,
			change: 2.8,
			previous: 157.0,
			unit: "million",
			isPositive: true,
		},
		productSales: {
			value: 125.9,
			change: 9.6,
			previous: 114.8,
			unit: "million",
			isPositive: true,
		},
		serviceSales: {
			value: 35.6,
			change: 14.2,
			previous: 31.1,
			unit: "million",
			isPositive: true,
		},
		costOfSales: {
			value: 71.3,
			change: 6.9,
			previous: 66.8,
			unit: "million",
			isPositive: false,
		},
		sgaExpenses: {
			value: 15.1,
			change: 18.2,
			previous: 12.8,
			unit: "million",
			isPositive: false,
		},
		netIncome: {
			value: 87.4,
			unit: "million",
		},
		adjustedEbitda: {
			value: 58.3,
			unit: "million",
		},
		liquidity: {
			value: 442.7,
			unit: "million",
		},
		cashEquivalents: {
			value: 268.4,
			unit: "million",
		},
	};
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

	// Helper function to format numbers
	const formatNumber = (num: number) => {
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1,
		});
	};

	return (
		<div className="bg-white min-h-screen">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl"
				>
					<h1 className="text-5xl md:text-6xl font-bold leading-tight">
						Profyt-Opt's <span className="text-[#1e56ff]">Q3 2024</span> Performance{" "}
						<span className="text-[#1e56ff]">Overview</span>
					</h1>
					<p className="mt-6 text-gray-600 text-lg max-w-2xl">
						In the third quarter of 2024, Profyt-Opt achieved a solid growth trajectory, with total sales
						increasing by $4.5 million, a 2.8% rise compared to the previous quarter, bringing the total to
						$161.5 million.
					</p>
				</motion.div>
			</section>

			{/* Key Metrics */}
			<section className="container mx-auto px-4 py-8">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm text-gray-500">Total Sales</p>
								<h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
									${formatNumber(financialData.totalSales.value)}M
								</h3>
							</div>
							<div
								className={`flex items-center ${
									financialData.totalSales.isPositive ? "text-green-500" : "text-red-500"
								}`}
							>
								{financialData.totalSales.isPositive ? (
									<ArrowUp className="h-5 w-5" />
								) : (
									<ArrowDown className="h-5 w-5" />
								)}
								<span className="ml-1 font-medium">{financialData.totalSales.change}%</span>
							</div>
						</div>
						<p className="text-sm text-gray-600">
							Compared to ${formatNumber(financialData.totalSales.previous)}M in Q2 2024
						</p>
					</motion.div>

					<motion.div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm text-gray-500">Product Sales</p>
								<h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
									${formatNumber(financialData.productSales.value)}M
								</h3>
							</div>
							<div
								className={`flex items-center ${
									financialData.productSales.isPositive ? "text-green-500" : "text-red-500"
								}`}
							>
								{financialData.productSales.isPositive ? (
									<ArrowUp className="h-5 w-5" />
								) : (
									<ArrowDown className="h-5 w-5" />
								)}
								<span className="ml-1 font-medium">{financialData.productSales.change}%</span>
							</div>
						</div>
						<p className="text-sm text-gray-600">
							Compared to ${formatNumber(financialData.productSales.previous)}M in Q2 2024
						</p>
					</motion.div>

					<motion.div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm text-gray-500">Service Sales</p>
								<h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
									${formatNumber(financialData.serviceSales.value)}M
								</h3>
							</div>
							<div
								className={`flex items-center ${
									financialData.serviceSales.isPositive ? "text-green-500" : "text-red-500"
								}`}
							>
								{financialData.serviceSales.isPositive ? (
									<ArrowUp className="h-5 w-5" />
								) : (
									<ArrowDown className="h-5 w-5" />
								)}
								<span className="ml-1 font-medium">{financialData.serviceSales.change}%</span>
							</div>
						</div>
						<p className="text-sm text-gray-600">
							Compared to ${formatNumber(financialData.serviceSales.previous)}M in Q2 2024
						</p>
					</motion.div>

					<motion.div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
						variants={itemVariants}
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm text-gray-500">Net Income</p>
								<h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
									${formatNumber(financialData.netIncome.value)}M
								</h3>
							</div>
							<div className="text-[#1e56ff]">
								<DollarSign className="h-5 w-5" />
							</div>
						</div>
						<p className="text-sm text-gray-600">Strong performance across all business segments</p>
					</motion.div>
				</motion.div>
			</section>

			{/* Feature Cards */}
			<section className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<motion.div
						className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<div>
							<BarChart3 className="h-6 w-6 mb-4" />
							<h3 className="text-xl font-medium mb-2">Explore Business to Achieve More</h3>
						</div>
						<Link to="/explore" className="flex items-center text-sm mt-4">
							Explore Now <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</motion.div>

					<motion.div
						className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div>
							<DollarSign className="h-6 w-6 mb-4" />
							<h3 className="text-xl font-medium mb-2">
								Ready to Make an Impact? Let's Create Something Amazing!
							</h3>
						</div>
						<Link to="/get-started" className="flex items-center text-sm mt-4">
							Get Started <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</motion.div>

					<motion.div
						className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<div>
							<div className="mb-4">"</div>
							<p className="text-sm">Their expertise helped us achieve real growth. Highly recommended!</p>
						</div>
						<div className="mt-4 text-sm">
							<p>Echo Agency</p>
							<p>Alexander Ronald</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Performance Overview */}
			<section className="mt-16 grid grid-cols-1 md:grid-cols-2">
				<motion.div
					className="bg-black p-8 flex items-center justify-center"
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<img
						src="https://images.unsplash.com/photo-1583009640887-eafd1a994d30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
						alt="Office building"
						className="object-cover grayscale w-full h-full max-w-md"
					/>
				</motion.div>
				<motion.div
					className="bg-[#1e56ff] text-white p-12 flex flex-col justify-center"
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h4 className="text-sm uppercase mb-4">Reports</h4>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
						Q3 2024 Performance Highlights and Market Analysis
					</h2>
					<p className="mb-4">
						Product sales experienced a robust surge, rising by $11.1 million, reflecting a 9.6% increase over
						Q2 2024, reaching $125.9 million. This performance was primarily driven by favorable market
						conditions and higher sales prices across our portfolio, particularly in oil, agriculture, and
						real estate tokenization investments.
					</p>
					<p className="mb-8">
						Despite maintaining a positive outlook, the company experienced a slight price regression during
						this period, primarily due to the expiration of higher-priced short-term contracts.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
						<div>
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
								${formatNumber(financialData.adjustedEbitda.value)}M
							</h3>
							<p className="text-xs sm:text-sm mt-1">Adjusted EBITDA</p>
						</div>
						<div>
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
								${formatNumber(financialData.liquidity.value)}M
							</h3>
							<p className="text-xs sm:text-sm mt-1">Total Liquidity</p>
						</div>
						<div>
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
								${formatNumber(financialData.cashEquivalents.value)}M
							</h3>
							<p className="text-xs sm:text-sm mt-1">Cash & Equivalents</p>
						</div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}

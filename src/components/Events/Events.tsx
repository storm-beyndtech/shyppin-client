import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import globalPresence from "../../assets/global_map.jpeg";

export default function EventsSection() {
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

	// Events data
	const featuredEvents = [
		{
			id: 1,
			title: "Exclusive Investment Strategies for Building Wealth",
			description:
				"Crucial Event Awaits You in Australia. Uncover pivotal updates and engage in high-stakes discussions about the future of our portfolio. Important project advancements and potential expansions are on the table – but full details will be disclosed only upon your attendance. Don't miss this exclusive.",
			location: "Perth Convention and Exhibition Centre",
			date: "3rd Nov, 2025",
			time: "09:00 AM - 05:00 PM",
			image:
				"https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			category: "Business Engagement",
		},
		{
			id: 2,
			title: "Building Generational Wealth Portfolio and Card Launch",
			description:
				"Crucial Event Awaits You in London. Join us for an exclusive opportunity to discuss the upcoming card launch and make key decisions regarding the future of our portfolio. Important project updates and potential expansions will be on the agenda – but full details will be shared only at the event. This is one you won't want to miss.",
			location: "Excel London and Exhibition Centre",
			date: "15th Dec, 2025",
			time: "10:00 AM - 04:00 PM",
			image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
			category: "Product Launch",
		},
	];

	const upcomingEvents = [
		{
			id: 3,
			title: "Quarterly Investor Briefing",
			description:
				"Join us for our quarterly investor briefing to discuss the latest portfolio performance and market trends.",
			location: "Virtual Event",
			date: "10th Oct, 2025",
			time: "02:00 PM - 03:30 PM",
			category: "Investor Relations",
		},
		{
			id: 4,
			title: "Sustainable Investment Workshop",
			description:
				"Learn about sustainable investment strategies and how to incorporate ESG factors into your portfolio.",
			location: "Profyt-Opt Headquarters, Sydney",
			date: "25th Oct, 2025",
			time: "09:30 AM - 12:30 PM",
			category: "Workshop",
		},
		{
			id: 5,
			title: "Digital Asset Masterclass",
			description:
				"An in-depth look at digital assets and blockchain technology for wealth creation and portfolio diversification.",
			location: "Singapore Financial District",
			date: "5th Dec, 2025",
			time: "10:00 AM - 04:00 PM",
			category: "Masterclass",
		},
	];

	return (
		<div className="bg-white min-h-screen">
			{/* Featured Events */}
			<section className="container mx-auto px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<h2 className="text-3xl font-bold mb-2">Our Events</h2>
					<div className="w-20 h-1 bg-[#1e56ff]"></div>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
					{featuredEvents.map((event) => (
						<motion.div
							key={event.id}
							className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<div className="relative h-64 overflow-hidden">
								<img
									src={event.image}
									alt={event.title}
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								<div className="absolute top-4 left-4 bg-[#1e56ff] text-white text-xs font-semibold px-3 py-1 rounded-full">
									{event.category}
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-3">{event.title}</h3>
								<p className="text-gray-600 mb-6">{event.description}</p>
								<div className="flex flex-col space-y-3 mb-6">
									<div className="flex items-center text-gray-700">
										<Calendar className="h-5 w-5 mr-2 text-[#1e56ff]" />
										<span>{event.date}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<Clock className="h-5 w-5 mr-2 text-[#1e56ff]" />
										<span>{event.time}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<MapPin className="h-5 w-5 mr-2 text-[#1e56ff]" />
										<span>{event.location}</span>
									</div>
								</div>
								<Link
									to={`/events/${event.id}`}
									className="inline-flex items-center bg-[#1e56ff] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
								>
									Register Now <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Upcoming Events */}
			<section className="container mx-auto px-4 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<h2 className="text-3xl font-bold mb-2">More Upcoming Events</h2>
					<div className="w-20 h-1 bg-[#1e56ff]"></div>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{upcomingEvents.map((event) => (
						<motion.div
							key={event.id}
							className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
							variants={itemVariants}
						>
							<div className="p-6">
								<div className="flex items-center justify-between mb-4">
									<span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-[#1e56ff]">
										{event.category}
									</span>
									<span className="text-sm font-medium text-gray-500">{event.date}</span>
								</div>
								<h3 className="text-xl font-bold mb-3">{event.title}</h3>
								<p className="text-gray-600 text-sm mb-4">{event.description}</p>
								<div className="flex items-center text-gray-700 text-sm mb-5">
									<MapPin className="h-4 w-4 mr-2 text-[#1e56ff]" />
									<span>{event.location}</span>
								</div>
								<Link
									to={`/events/${event.id}`}
									className="inline-flex items-center text-[#1e56ff] text-sm font-medium hover:underline"
								>
									View Details <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>

				<div className="flex items-center justify-between mt-12">
					<button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
						<ChevronLeft className="h-5 w-5 text-gray-500" />
					</button>
					<div className="flex space-x-2">
						<button className="w-8 h-8 rounded-full bg-[#1e56ff] text-white flex items-center justify-center text-sm">
							1
						</button>
						<button className="w-8 h-8 rounded-full text-gray-500 flex items-center justify-center text-sm">
							2
						</button>
						<button className="w-8 h-8 rounded-full text-gray-500 flex items-center justify-center text-sm">
							3
						</button>
					</div>
					<button className="w-10 h-10 rounded-full bg-[#1e56ff] flex items-center justify-center">
						<ChevronRight className="h-5 w-5 text-white" />
					</button>
				</div>
			</section>

			{/* Global Events Map */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="mb-12"
					>
						<h2 className="text-3xl font-bold mb-2">Global Presence</h2>
						<div className="w-20 h-1 bg-[#1e56ff]"></div>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="bg-white p-8 rounded-lg shadow-sm"
						>
							<div className="flex items-center mb-6">
								<Globe className="h-6 w-6 text-[#1e56ff] mr-3" />
								<h3 className="text-xl font-bold">Our Global Events</h3>
							</div>
							<p className="text-gray-700 mb-6">
								Profyt-Opt hosts events across the globe, bringing together investors, industry experts, and
								community leaders to discuss the future of wealth building and sustainable investments.
							</p>
							<div className="space-y-4">
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full bg-[#1e56ff] mr-3"></div>
									<span className="text-gray-700">Australia & New Zealand</span>
									<span className="ml-auto text-gray-500">12 events</span>
								</div>
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full bg-[#1e56ff] mr-3"></div>
									<span className="text-gray-700">Europe & UK</span>
									<span className="ml-auto text-gray-500">8 events</span>
								</div>
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full bg-[#1e56ff] mr-3"></div>
									<span className="text-gray-700">North America</span>
									<span className="ml-auto text-gray-500">6 events</span>
								</div>
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full bg-[#1e56ff] mr-3"></div>
									<span className="text-gray-700">Asia Pacific</span>
									<span className="ml-auto text-gray-500">9 events</span>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="h-96 bg-gray-200 rounded-lg overflow-hidden"
						>
							<img src={globalPresence} alt="Global map" className="w-full h-full object-cover" />
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}

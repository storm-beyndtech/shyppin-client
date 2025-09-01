import React, { useState } from "react";
import { Calendar, Clock, MapPin, Search, Filter, Users, Globe } from "lucide-react";

interface Event {
	id: number;
	title: string;
	description: string;
	location: string;
	date: string;
	time: string;
	category: string;
	status: "upcoming" | "completed";
	attendees: number;
	registered: boolean;
}

interface Category {
	value: string;
	label: string;
}

interface Status {
	value: string;
	label: string;
}

const EventsPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");

	// Events data
	const events: Event[] = [
		{
			id: 1,
			title: "Exclusive Investment Strategies for Building Wealth",
			description:
				"Crucial Event Awaits You in Australia. Uncover pivotal updates and engage in high-stakes discussions about the future of our portfolio.",
			location: "Perth Convention and Exhibition Centre",
			date: "3rd Nov, 2025",
			time: "09:00 AM - 05:00 PM",
			category: "Business Engagement",
			status: "upcoming",
			attendees: 150,
			registered: true,
		},
		{
			id: 2,
			title: "Building Generational Wealth Portfolio and Card Launch",
			description:
				"Join us for an exclusive opportunity to discuss the upcoming card launch and make key decisions regarding the future of our portfolio.",
			location: "Excel London and Exhibition Centre",
			date: "15th Dec, 2025",
			time: "10:00 AM - 04:00 PM",
			category: "Product Launch",
			status: "upcoming",
			attendees: 200,
			registered: false,
		},
		{
			id: 3,
			title: "Quarterly Investor Briefing",
			description:
				"Join us for our quarterly investor briefing to discuss the latest portfolio performance and market trends.",
			location: "Virtual Event",
			date: "10th Oct, 2025",
			time: "02:00 PM - 03:30 PM",
			category: "Investor Relations",
			status: "upcoming",
			attendees: 75,
			registered: true,
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
			status: "upcoming",
			attendees: 45,
			registered: false,
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
			status: "upcoming",
			attendees: 120,
			registered: true,
		},
		{
			id: 6,
			title: "Annual Investor Summit",
			description:
				"Our flagship annual event bringing together all stakeholders to review performance and set future goals.",
			location: "Melbourne Convention Centre",
			date: "15th Sep, 2025",
			time: "09:00 AM - 06:00 PM",
			category: "Summit",
			status: "completed",
			attendees: 300,
			registered: true,
		},
	];

	const categories: Category[] = [
		{ value: "all", label: "All Categories" },
		{ value: "Business Engagement", label: "Business Engagement" },
		{ value: "Product Launch", label: "Product Launch" },
		{ value: "Investor Relations", label: "Investor Relations" },
		{ value: "Workshop", label: "Workshop" },
		{ value: "Masterclass", label: "Masterclass" },
		{ value: "Summit", label: "Summit" },
	];

	const statuses: Status[] = [
		{ value: "all", label: "All Events" },
		{ value: "upcoming", label: "Upcoming" },
		{ value: "completed", label: "Completed" },
	];

	// Filter events
	const filteredEvents: Event[] = events.filter((event: Event) => {
		const matchesSearch: boolean =
			event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory: boolean = selectedCategory === "all" || event.category === selectedCategory;
		const matchesStatus: boolean = selectedStatus === "all" || event.status === selectedStatus;

		return matchesSearch && matchesCategory && matchesStatus;
	});

	const getCategoryColor = (category: string): string => {
		const colors: Record<string, string> = {
			"Business Engagement": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			"Product Launch": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
			"Investor Relations": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
			Workshop: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
			Masterclass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
			Summit: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
		};
		return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	};

	const getStatusColor = (status: Event["status"]): string => {
		return status === "upcoming"
			? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
			: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(e.target.value);
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedCategory(e.target.value);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedStatus(e.target.value);
	};

	const upcomingEventsCount: number = events.filter((event) => event.status === "upcoming").length;
	const registeredEventsCount: number = events.filter((event) => event.registered).length;
	const totalAttendeesCount: number = events.reduce((sum, event) => sum + event.attendees, 0);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Events</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Manage and track your upcoming events and registrations
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 shadow-sm border border-blue-100 dark:border-blue-800/30">
						<div className="flex items-center">
							<div className="p-3 bg-blue-500 rounded-xl shadow-lg">
								<Calendar className="w-6 h-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-blue-700 dark:text-blue-300">Upcoming Events</p>
								<p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{upcomingEventsCount}</p>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-800/30">
						<div className="flex items-center">
							<div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
								<Users className="w-6 h-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
									Registered Events
								</p>
								<p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
									{registeredEventsCount}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 shadow-sm border border-purple-100 dark:border-purple-800/30">
						<div className="flex items-center">
							<div className="p-3 bg-purple-500 rounded-xl shadow-lg">
								<Globe className="w-6 h-6 text-white" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Attendees</p>
								<p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
									{totalAttendeesCount}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8 backdrop-blur-sm">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search events..."
								value={searchTerm}
								onChange={handleSearchChange}
								className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 shadow-sm"
							/>
						</div>

						{/* Category Filter */}
						<div className="flex items-center gap-3">
							<div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
							</div>
							<select
								value={selectedCategory}
								onChange={handleCategoryChange}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white shadow-sm min-w-[160px]"
							>
								{categories.map((category: Category) => (
									<option key={category.value} value={category.value}>
										{category.label}
									</option>
								))}
							</select>
						</div>

						{/* Status Filter */}
						<div>
							<select
								value={selectedStatus}
								onChange={handleStatusChange}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white shadow-sm min-w-[140px]"
							>
								{statuses.map((status: Status) => (
									<option key={status.value} value={status.value}>
										{status.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Events List */}
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
					{filteredEvents.map((event: Event) => (
						<div
							key={event.id}
							className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
						>
							{/* Gradient Header */}
							<div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

							<div className="p-6">
								{/* Event Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-2 flex-wrap">
										<span
											className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
												event.category,
											)}`}
										>
											{event.category}
										</span>
										<span
											className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
												event.status,
											)}`}
										>
											{event.status}
										</span>
									</div>
									{event.registered && (
										<div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
											<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
											<span className="text-xs font-medium">Registered</span>
										</div>
									)}
								</div>

								{/* Event Title & Description */}
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{event.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
									{event.description}
								</p>

								{/* Event Details */}
								<div className="space-y-3">
									<div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
										<div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
											<Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
										</div>
										<span className="font-medium">{event.date}</span>
									</div>
									<div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
										<div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
											<Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
										</div>
										<span className="font-medium">{event.time}</span>
									</div>
									<div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
										<div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
											<MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
										</div>
										<span className="font-medium">{event.location}</span>
									</div>
									<div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
										<div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-3">
											<Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
										</div>
										<span className="font-medium">{event.attendees} attendees</span>
									</div>
								</div>

								{/* Registration Status Indicator */}
								{event.status === "upcoming" && (
									<div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
										<div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
											<div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
											<span className="font-medium">Registration Available</span>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredEvents.length === 0 && (
					<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
						<Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
						<p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default EventsPage;

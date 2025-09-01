import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	LayoutDashboard,
	User,
	TrendingUp,
	ArrowDownLeft,
	ArrowUpRight,
	History,
	Target,
	ChevronLeft,
	ChevronRight,
	X,
  Calendar,
} from "lucide-react";
import Logo from "../../../components/Logo";
import { ScrollArea } from "../../UI/scroll-area";
import DarkModeSwitcher from "@/components/UI/DarkModeSwitcher";
import fav from "../../../assets/fav.svg";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	sidebarCollapsed: boolean;
	setSidebarCollapsed: (collapsed: boolean) => void;
}

interface MenuItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	to?: string;
	isButton?: boolean;
}

interface MenuGroup {
	title: string;
	items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
	sidebarOpen,
	setSidebarOpen,
	sidebarCollapsed,
	setSidebarCollapsed,
}) => {
	const navigate = useNavigate();

	const menuGroups: MenuGroup[] = [
		{
			title: "DASHBOARD",
			items: [{ icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" }],
		},
		{
			title: "INVESTMENTS",
			items: [
				{ icon: Target, label: "Investment Plans", to: "/dashboard/investment-plan" },
				{ icon: TrendingUp, label: "My Investments", to: "/dashboard/investments" },
			],
		},
		{
			title: "TRANSACTIONS",
			items: [
				{ icon: ArrowUpRight, label: "Deposit", to: "/dashboard/deposit", isButton: true },
				{ icon: ArrowUpRight, label: "Deposit History", to: "/dashboard/deposits" },
				{ icon: ArrowDownLeft, label: "Withdraw", to: "/dashboard/withdraw", isButton: true },
				{ icon: ArrowDownLeft, label: "Withdrawal History", to: "/dashboard/withdrawals" },
				{ icon: History, label: "All Transactions", to: "/dashboard/all-transactions" },
			],
		},
		{
			title: "ACCOUNT",
			items: [{ icon: User, label: "Profile", to: "/dashboard/profile" }, { icon: Calendar, label: "Events", to: "/dashboard/events" }],
		},
	];

	const handleNavClick = () => {
		setSidebarOpen(false);
	};

	const handleButtonClick = (item: MenuItem) => {
		if (item.to) {
			navigate(item.to);
			setSidebarOpen(false);
		}
	};

	return (
		<>
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
        fixed lg:static inset-y-0 left-0 z-30
        ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"} 
        w-64 bg-blue-600 border-r border-blue-500 h-screen flex flex-col
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
			>
				{/* Header with logo and mobile close button */}
				<div
					className={`
          p-4 border-b border-blue-500 flex items-center justify-between
          ${sidebarCollapsed ? "lg:p-2 lg:justify-center" : ""}
        `}
				>
					<div
						className={`
            flex items-center space-x-2 
            ${sidebarCollapsed ? "lg:justify-center lg:space-x-0" : ""}
          `}
					>
						{!sidebarCollapsed && <Logo />}
						{sidebarCollapsed && (
							<div className="w-8 h-8">
								<img src={fav} className="w-full" />
							</div>
						)}
					</div>

					{/* Mobile close button */}
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden p-1 rounded-md text-white hover:bg-blue-500 transition-colors"
						aria-label="Close sidebar"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Menu Sections */}
				<ScrollArea className="flex-1 p-4">
					<div className="space-y-6">
						{menuGroups.map((group, groupIndex) => (
							<div key={groupIndex} className="space-y-1">
								{!sidebarCollapsed && (
									<h3 className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-3">
										{group.title}
									</h3>
								)}

								<nav className="space-y-1">
									{group.items.map((item, index) => (
										<div key={index} className="relative">
											{item.isButton ? (
												<button
													onClick={() => handleButtonClick(item)}
													className={`w-full flex items-center ${
														sidebarCollapsed ? "lg:justify-center lg:px-2" : "px-3"
													} py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative text-blue-100 hover:bg-blue-500 hover:text-white`}
													title={sidebarCollapsed ? item.label : ""}
												>
													<div className="relative flex-shrink-0">
														<item.icon className={sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
													</div>
													{!sidebarCollapsed && <span className="truncate ml-3">{item.label}</span>}

													{sidebarCollapsed && (
														<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 hidden lg:block pointer-events-none">
															{item.label}
														</div>
													)}
												</button>
											) : (
												<NavLink
													to={item.to!}
													end={item.to === "/dashboard"}
													onClick={handleNavClick}
													className={({ isActive }) =>
														`flex items-center ${
															sidebarCollapsed ? "lg:justify-center lg:px-2" : "space-x-3 px-3"
														} py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
															isActive
																? "bg-blue-100 text-blue-700 shadow-sm"
																: "text-blue-100 hover:bg-blue-500 hover:text-white"
														}`
													}
													title={sidebarCollapsed ? item.label : ""}
												>
													<item.icon
														className={`flex-shrink-0 ${sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
													/>
													{!sidebarCollapsed && <span className="truncate">{item.label}</span>}

													{sidebarCollapsed && (
														<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 hidden lg:block pointer-events-none">
															{item.label}
														</div>
													)}
												</NavLink>
											)}
										</div>
									))}
								</nav>

								{/* Add spacing between groups when collapsed */}
								{sidebarCollapsed && groupIndex < menuGroups.length - 1 && (
									<div className="border-t border-blue-500/30 mt-4 pt-2" />
								)}
							</div>
						))}
					</div>

					{/* Theme Toggle */}
					{!sidebarCollapsed && (
						<div className="mt-6 pt-6 border-t border-blue-500/30">
							<DarkModeSwitcher variant="blue" />
						</div>
					)}
				</ScrollArea>

				{/* Desktop collapse toggle button - positioned on the border */}
				<button
					onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
					className={`
            hidden lg:flex absolute -right-3 top-20 z-40 
            w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md 
            hover:bg-gray-50 text-gray-600 hover:text-gray-900 
            transition-all duration-200 items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
					aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
				</button>
			</aside>
		</>
	);
};

export default Sidebar;

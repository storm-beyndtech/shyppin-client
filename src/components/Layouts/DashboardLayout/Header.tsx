import type React from "react";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../UI/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../../UI/popover";
import { useEffect, useState } from "react";
import DarkModeSwitcher from "@/components/UI/DarkModeSwitcher";
import { contextData } from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface HeaderProps {
	setSidebarOpen: (open: boolean) => void;
	sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
	const [mounted, setMounted] = useState(false);
	const { user, logout } = contextData();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className="bg-slate-50 dark:bg-slate-950  px-4 md:px-6 py-2 flex items-center justify-between lg:justify-end transition-colors duration-300">
			{/* Mobile menu button */}
			<button
				onClick={() => setSidebarOpen(true)}
				className="lg:hidden p-2 rounded-md text-white hover:text-foreground bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
				aria-label="Open sidebar"
			>
				<Menu className="w-5 h-5" />
			</button>

			{/* Page title for mobile */}
			<h1 className="lg:hidden text-lg font-semibold text-foreground">Dashboard</h1>

			{/* Right side - Theme toggle and Profile with popover */}
			<div className="flex items-center gap-4">
				{/* Theme Toggle Styled as Radio Button */}
				<DarkModeSwitcher variant="neutral" />

				<Popover>
					<PopoverTrigger asChild>
						<button className="flex items-center space-x-3 focus:outline-none bg-transparent border-0 p-2 rounded-lg hover:bg-accent/10 transition-colors">
							<div className="relative">
								<Avatar className="w-8 h-8">
									<AvatarImage src={user.profileImage} alt="User avatar" />
									<AvatarFallback className="bg-blue-500 text-primary-foreground text-sm">
										<User />
									</AvatarFallback>
								</Avatar>
								{/* Active green dot */}
								<span className="absolute -bottom-0.5 -right-0.5 block w-3 h-3 rounded-full ring-2 ring-background bg-green-500" />
							</div>
							<div className="hidden md:flex flex-col items-start">
								<span className="text-sm font-medium text-foreground dark:text-white">{user.username}</span>
								<span className="text-xs text-muted-foreground">{user.email}</span>
							</div>
						</button>
					</PopoverTrigger>
					<PopoverContent
						className="w-64 p-4 bg-white dark:bg-slate-950/20 backdrop-blur-xl border-gray-50 dark:border-gray-800"
						align="end"
					>
						<div className="flex flex-col space-y-3">
							{/* User info */}
							<div className="flex items-center space-x-3">
								<Avatar className="w-8 h-8">
									<AvatarImage src={user.profileImage} alt="User avatar" />
									<AvatarFallback className="bg-blue-500 text-primary-foreground text-sm">
										<User />
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span className="text-sm font-medium text-gray-500 dark:text-white">{user.username}</span>
									<span className="text-xs text-muted-foreground">{user.email}</span>
								</div>
							</div>

							{/* Status indicator */}
							<div className="flex items-center space-x-2 px-2 py-1 bg-green-50 dark:bg-green-950 rounded-md">
								<span className="inline-block w-2 h-2 rounded-full bg-green-500" />
								<span className="text-xs text-green-700 dark:text-green-300 font-medium">Online</span>
							</div>

							{/* Menu items */}
							<div className="py-1">
								<Link
									to="/dashboard"
									className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<LayoutDashboard size={16} className="mr-2" />
									Dashboard
								</Link>
								<Link
									to="/dashboard/profile"
									className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<User size={16} className="mr-2" />
									Profile
								</Link>
								<div
									onClick={() => logout()}
									className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<LogOut size={16} className="mr-2" />
									Logout
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</header>
	);
};

export default Header;

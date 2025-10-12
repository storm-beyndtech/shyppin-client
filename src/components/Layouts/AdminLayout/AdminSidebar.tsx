import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import {
	Home,
	Users,
	Package,
	Globe,
	LogOut,
	Menu,
	ClipboardList,
	Mail,
} from "lucide-react";
import { contextData } from "@/context/AuthContext";
import DarkModeSwitcher from "@/components/UI/DarkModeSwitcher";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
	const location = useLocation();
	const { pathname } = location;
	const { logout } = contextData();
	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, []);

	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	}, []);

	return (
		<aside
			ref={sidebar}
			className={`text-xs absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-gray-900 dark:bg-gray-950 border-r border-gray-700 dark:border-gray-800 duration-300 ease-linear lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className="flex items-center justify-between gap-2 px-6 py-5">
				<NavLink to="/">
					<img src={Logo} alt="Logo" className="w-20" />
				</NavLink>
				<DarkModeSwitcher variant="neutral" />
				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden"
				>
					<Menu className="text-gray-400" />
				</button>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					<ul className="mb-10 flex flex-col gap-1.5">
						<li>
							<NavLink
								to="/"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800`}
							>
								<Globe strokeWidth={1.5} className="text-blue-500 text-xl" />
								Main Website
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/admin"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800 ${
									pathname === "/admin" && "bg-gray-800 dark:bg-gray-800"
								}`}
							>
								<Home strokeWidth={1.5} className="text-blue-500 text-xl" />
								Dashboard
							</NavLink>
						</li>
					</ul>

					<ul className="mb-10 flex flex-col gap-1.5">
						{/* Shipments */}
						<li>
							<NavLink
								to="/admin/shipments"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800 ${
									pathname.includes("shipments") && "bg-gray-800 dark:bg-gray-800"
								}`}
							>
								<Package strokeWidth={1.5} className="text-blue-500 text-xl" />
								Shipments
							</NavLink>
						</li>

						{/* Customers */}
						<li>
							<NavLink
								to="/admin/customers"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800 ${
									pathname.includes("customers") && "bg-gray-800 dark:bg-gray-800"
								}`}
							>
								<Users strokeWidth={1.5} className="text-blue-500 text-xl" />
								Customers
							</NavLink>
						</li>

						{/* Contact/Quotes */}
						<li>
							<NavLink
								to="/admin/quotes"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800 ${
									pathname.includes("quotes") && "bg-gray-800 dark:bg-gray-800"
								}`}
							>
								<ClipboardList strokeWidth={1.5} className="text-blue-500 text-xl" />
								Quote Requests
							</NavLink>
						</li>

						{/* Mail */}
						<li>
							<NavLink
								to="/admin/mail"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800 ${
									pathname.includes("mail") && "bg-gray-800 dark:bg-gray-800"
								}`}
							>
								<Mail strokeWidth={1.5} className="text-blue-500 text-xl" />
								Email Campaigns
							</NavLink>
						</li>
					</ul>


					<ul className="flex flex-col gap-1.5">


						<li
							className="cursor-pointer text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-800"
							onClick={() => logout()}
						>
							<LogOut strokeWidth={1.5} className="text-blue-500 text-xl" />
							Sign out
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
}

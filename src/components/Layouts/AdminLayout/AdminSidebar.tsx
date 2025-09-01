import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SidebarDropdown from "./SidebarDropdown";
import {
	Home,
	Users,
	BarChart2,
	Globe,
	MessageSquare,
	LogOut,
	Menu,
	ShieldAlert,
	Settings,
	ArrowUpFromLine,
	ArrowDownFromLine,
  Coins,
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
			className={`text-xs absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-bodydark1 lg:dark:bg-bodydark1/40 duration-300 ease-linear lg:static lg:translate-x-0 ${
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
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black`}
							>
								<Globe strokeWidth={1.5} className="text-blue-500 text-xl" />
								Main Website
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/admin"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
									pathname === "/admin" && "bg-black"
								}`}
							>
								<Home strokeWidth={1.5} className="text-blue-500 text-xl" />
								Dashboard
							</NavLink>
						</li>
					</ul>

					<ul className="mb-10 flex flex-col gap-1.5">
						{/* Investment Dropdown Menu */}
						<SidebarDropdown
							title="Investments"
							icon={<BarChart2 strokeWidth={1.5} className="text-blue-500 text-xl" />}
							links={[
								{ label: "Manage Investments", href: "manage-investments" },
								{ label: "Investment  History", href: "investment-history" },
							]}
						/>

						{/* Users Dropdown Menu */}
						<SidebarDropdown
							title="Users"
							icon={<Users strokeWidth={1.5} className="text-blue-500 text-xl" />}
							links={[
								{ label: "Active Users", href: "active-users" },
								{ label: "Banned Users", href: "banned-users" },
							]}
						/>

						{/* Transactions drop down */}
						<SidebarDropdown
							title="Manage Deposits"
							icon={<ArrowUpFromLine strokeWidth={1.5} className="text-blue-500 text-xl" />}
							links={[
								{ label: "Approved Deposits", href: "approved-deposits" },
								{ label: "Pending Deposits", href: "pending-deposits" },
								{ label: "Rejected Deposits", href: "rejected-deposits" },
							]}
						/>

						<SidebarDropdown
							title="Manage Withdrawals"
							icon={<ArrowDownFromLine strokeWidth={1.5} className="text-blue-500 text-xl" />}
							links={[
								{ label: "Approved Withdrawals", href: "approved-withdrawals" },
								{ label: "Pending Withdrawals", href: "pending-withdrawals" },
								{ label: "Rejected Withdrawals", href: "rejected-withdrawals" },
							]}
						/>
					</ul>

					<ul className="flex flex-col gap-1.5">
						<li>
							<NavLink
								to="/admin/kyc"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
									pathname.includes("kyc") && "bg-black"
								}`}
							>
								<ShieldAlert strokeWidth={1.5} className="text-blue-500 text-xl" />
								Kyc
							</NavLink>
            </li>
            
						<li>
							<NavLink
								to="/admin/plans"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
									pathname.includes("plans") && "bg-black"
								}`}
							>
								<Coins strokeWidth={1.5} className="text-blue-500 text-xl" />
								Manage Plans
							</NavLink>
						</li>
					</ul>

					<ul className="flex flex-col gap-1.5">
						<li>
							<NavLink
								to="/admin/mails"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
									pathname.includes("mails") && "bg-black"
								}`}
							>
								<MessageSquare strokeWidth={1.5} className="text-blue-500 text-xl" />
								Mails
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/admin/settings"
								className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
									pathname.includes("settings") && "bg-black"
								}`}
							>
								<Settings strokeWidth={1.5} className="text-blue-500 text-xl" />
								Settings
							</NavLink>
						</li>

						<li
							className="cursor-pointer text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-3 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black"
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

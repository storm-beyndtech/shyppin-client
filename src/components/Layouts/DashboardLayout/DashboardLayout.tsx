import type React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout: React.FC = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	return (
		<div className="bg-slate-50 dark:bg-slate-950 flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
				sidebarCollapsed={sidebarCollapsed}
				setSidebarCollapsed={setSidebarCollapsed}
			/>

			{/* Main content area */}
			<div className="flex-1 flex flex-col min-w-0 relative">
				{/* Header */}
				<Header setSidebarOpen={setSidebarOpen} sidebarCollapsed={sidebarCollapsed} />

				{/* Main content */}
				<main className="flex-1 overflow-y-auto md:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;

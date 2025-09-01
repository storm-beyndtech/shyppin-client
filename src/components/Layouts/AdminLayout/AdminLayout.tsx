import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import PageLoader from "@/components/PageLoader";

declare global {
  interface Window {
	Tawk_API?: {
	  hideWidget?: () => void;
	  showWidget?: () => void;
	};
  }
}

export default function AdminLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { user, fetching } = contextData();
	const navigate = useNavigate();

useEffect(() => {
  if (!fetching) {
    if (!user.isAdmin) {
      navigate('/dashboard');
    }
  }

  // Smartsupp
  const chatCtn = document.getElementById('smartsupp-widget-container');
  if (chatCtn) chatCtn.style.display = 'none';

  // Tawk.to iframe (target by title)
  const tawkIframe = document.querySelector('iframe[title="chat widget"]') as HTMLIFrameElement;
  if (tawkIframe) tawkIframe.style.display = 'none';

  // Tawk.to API fallback 
  if (window.Tawk_API?.hideWidget) window.Tawk_API.hideWidget();

  return () => {
    if (chatCtn) chatCtn.style.display = 'block';
    if (tawkIframe) tawkIframe.style.display = 'block';
    if (window.Tawk_API?.showWidget) window.Tawk_API.showWidget();
  };
}, [fetching, user, navigate]);


	if (fetching || !user.isAdmin) return <PageLoader />;

	return (
		<div className="dark:bg-black dark:text-bodydark">
			<div className="flex h-screen overflow-hidden">
				<AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					<main>
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

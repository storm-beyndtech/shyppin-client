/* App.tsx */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Support from "./pages/Support";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import Tracking from "./pages/Tracking";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";

// Layout Components
import AdminLayout from "./components/Layouts/AdminLayout/AdminLayout";

// Import your context and loader
import { contextData } from "./context/AuthContext";
import PublicLayout from "./components/Layouts/Public/PublicLayout";
import PageLoader from "./components/PageLoader";
import Admin from "./pages/Admin/Admin";
import ActiveUsers from "./pages/Admin/ActiveUsers";
import BannedUsers from "./pages/Admin/BannedUsers";
import SendMail from "./pages/Admin/SendMail";
import AdminSettings from "./pages/Admin/AdminSettings";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
	const [assetsLoaded, setAssetsLoaded] = useState(false);
	const { fetching, user } = contextData();

	useEffect(() => {
		const handleAssetsLoaded = () => {
			setAssetsLoaded(true);
		};

		// Wait until all images/videos/fonts are loaded
		if (document.readyState === "complete") {
			handleAssetsLoaded();
		} else {
			window.addEventListener("load", handleAssetsLoaded);
		}

		return () => {
			window.removeEventListener("load", handleAssetsLoaded);
		};
	}, []);

	// Show loader while either assets or user auth is loading
	if (fetching || !assetsLoaded) return <PageLoader />;

	return (
		<Routes>
			{user?.isAdmin ? (
				<>
					{/* Admin Dashboard Routes */}
					<Route path="/admin/" element={<AdminLayout />}>
						<Route index element={<Admin />} />
						<Route path="/admin/home" element={<Admin />} />
						<Route path="/admin/active-users" element={<ActiveUsers />} />
						<Route path="/admin/banned-users" element={<BannedUsers />} />
						<Route path="/admin/mails" element={<SendMail />} />
						<Route path="/admin/settings" element={<AdminSettings />} />
					</Route>

					{/* Redirect admin from public routes when needed */}
					<Route path="/login" element={<Navigate to="/admin" replace />} />
					<Route path="/signup" element={<Navigate to="/admin" replace />} />
				</>
			) : (
				<>
					{/* Auth routes */}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />

					{/* Redirect non-admin users from admin routes */}
					<Route path="/admin/*" element={<Navigate to="/login" replace />} />
				</>
			)}

			{/* Public Routes (accessible to everyone) */}
			<Route
				path="/"
				element={
					<PublicLayout>
						<Home />
					</PublicLayout>
				}
			/>
			<Route
				path="/about"
				element={
					<PublicLayout>
						<About />
					</PublicLayout>
				}
			/>
			<Route
				path="/services"
				element={
					<PublicLayout>
						<Services />
					</PublicLayout>
				}
			/>
			<Route
				path="/track"
				element={
					<PublicLayout>
						<Tracking />
					</PublicLayout>
				}
			/>
			<Route
				path="/quote"
				element={
					<PublicLayout>
						<Quote />
					</PublicLayout>
				}
			/>
			<Route
				path="/contact"
				element={
					<PublicLayout>
						<Contact />
					</PublicLayout>
				}
			/>
			<Route
				path="/support"
				element={
					<PublicLayout>
						<Support />
					</PublicLayout>
				}
			/>

			{/* Catch-all route */}
			<Route
				path="*"
				element={<Navigate to={user?.isAdmin ? "/admin" : "/"} replace />}
			/>
		</Routes>
	);
}

export default App;

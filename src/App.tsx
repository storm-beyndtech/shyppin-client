/* App.tsx */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
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

			{/* Redirects for old financial platform routes */}
			<Route path="/projects" element={<Navigate to="/services" replace />} />
			<Route path="/reports" element={<Navigate to="/track" replace />} />
			<Route path="/retirement" element={<Navigate to="/quote" replace />} />
			<Route path="/events" element={<Navigate to="/contact" replace />} />

			{/* Catch-all route */}
			<Route path="*" element={<Navigate to={user?.isAdmin ? "/admin" : "/"} replace />} />
		</Routes>
	);
}

export default App;

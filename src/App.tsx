/* App.tsx */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Support from "./pages/Support";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import About from "./pages/About";
import Projects from "./pages/Projects";
import AnnualReport from "./pages/AnnualReport";
import Events from "./pages/Events";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";

// Layout Components
import AdminLayout from "./components/Layouts/AdminLayout/AdminLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout/DashboardLayout";
import InvestmentPlan from "./pages/Dashboard/InvestmentPlan";
import InvestmentLog from "./pages/Dashboard/InvestmentLog";
import AllTransactions from "./pages/Dashboard/AllTransactions";
import Deposit from "./pages/Dashboard/Deposit";
import DepositLog from "./pages/Dashboard/DepositLog";
import Withdraw from "./pages/Dashboard/Withdraw";
import Profile from "./pages/Dashboard/Profile";

// Import your context and loader
import { contextData } from "./context/AuthContext";
import PublicLayout from "./components/Layouts/Public/PublicLayout";
import PageLoader from "./components/PageLoader";
import WithdrawalLog from "./pages/Dashboard/WithdrawLog";
import KYC from "./pages/Dashboard/KYC";
import Admin from "./pages/Admin/Admin";
import ActiveUsers from "./pages/Admin/ActiveUsers";
import BannedUsers from "./pages/Admin/BannedUsers";
import ApprovedDeposits from "./pages/Admin/ApprovedDeposits";
import PendingDeposits from "./pages/Admin/PendingDeposits";
import RejectedDeposits from "./pages/Admin/RejectedDeposits";
import ApprovedWithdrawals from "./pages/Admin/ApprovedWithdrawals";
import PendingWithdrawals from "./pages/Admin/PendingWithdrawals";
import RejectedWithdrawals from "./pages/Admin/RejectedWithdrawals";
import SendMail from "./pages/Admin/SendMail";
import AdminSettings from "./pages/Admin/AdminSettings";
import KycApproval from "./pages/Admin/KycApproval";
import EventsPage from "./pages/Dashboard/Events";
import ManageInvestments from "./pages/Admin/ManageInvestments";
import InvestmentHistory from "./pages/Admin/InvestmentHistory";
import AdminInvestmentPlans from "./pages/Admin/ManagePlans";
import Retirement from "./pages/Retirement";
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
			{user ? (
				<>
					{user.isAdmin ? (
						<>
							{/* Admin Dashboard Routes */}
							<Route path="/admin/" element={<AdminLayout />}>
								<Route index element={<Admin />} />
								<Route path="/admin/home" element={<Admin />} />
								<Route path="/admin/active-users" element={<ActiveUsers />} />
								<Route path="/admin/banned-users" element={<BannedUsers />} />
								<Route path="/admin/approved-deposits" element={<ApprovedDeposits />} />
								<Route path="/admin/pending-deposits" element={<PendingDeposits />} />
								<Route path="/admin/rejected-deposits" element={<RejectedDeposits />} />
								<Route path="/admin/approved-withdrawals" element={<ApprovedWithdrawals />} />
								<Route path="/admin/pending-withdrawals" element={<PendingWithdrawals />} />
								<Route path="/admin/rejected-withdrawals" element={<RejectedWithdrawals />} />
								<Route path="/admin/manage-investments" element={<ManageInvestments />} />
								<Route path="/admin/investment-history" element={<InvestmentHistory />} />
								<Route path="/admin/mails" element={<SendMail />} />
								<Route path="/admin/plans" element={<AdminInvestmentPlans />} />
								<Route path="/admin/settings" element={<AdminSettings />} />
								<Route path="/admin/kyc" element={<KycApproval />} />
							</Route>

							{/* Redirect admin to admin dashboard from other auth routes */}
							<Route path="/dashboard/*" element={<Navigate to="/admin" replace />} />
							<Route path="/login" element={<Navigate to="/admin" replace />} />
							<Route path="/signup" element={<Navigate to="/admin" replace />} />
						</>
					) : (
						<>
							{user.kycStatus !== "approved" ? (
								<Route path="/dashboard/*" element={<Navigate to="/kyc" replace />} />
							) : (
								<Route path="/dashboard" element={<DashboardLayout />}>
									<Route index element={<Dashboard />} />
									<Route path="investment-plan" element={<InvestmentPlan />} />
									<Route path="investments" element={<InvestmentLog />} />
									<Route path="all-transactions" element={<AllTransactions />} />
									<Route path="deposit" element={<Deposit />} />
									<Route path="deposits" element={<DepositLog />} />
									<Route path="withdraw" element={<Withdraw />} />
									<Route path="withdrawals" element={<WithdrawalLog />} />
									<Route path="profile" element={<Profile />} />
									<Route path="events" element={<EventsPage />} />
									<Route path="*" element={<Navigate to="/dashboard" replace />} />
								</Route>
							)}

							<Route path="kyc" element={<KYC />} />
							{/* Redirect regular user from admin routes */}
							<Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
							<Route path="/login" element={<Navigate to="/dashboard" replace />} />
							<Route path="/signup" element={<Navigate to="/dashboard" replace />} />
						</>
					)}

					{/* Public Routes (accessible to logged-in users) */}
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
						path="/projects"
						element={
							<PublicLayout>
								<Projects />
							</PublicLayout>
						}
					/>
					<Route
						path="/reports"
						element={
							<PublicLayout>
								<AnnualReport />
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
					<Route
						path="/retirement"
						element={
							<PublicLayout>
								<Retirement />
							</PublicLayout>
						}
					/>
					<Route
						path="/events"
						element={
							<PublicLayout>
								<Events />
							</PublicLayout>
						}
					/>
				</>
			) : (
				<>
					{/* Not logged in - Auth routes */}
					<Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

					{/* Public Routes (for non-logged-in users) */}
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
						path="/projects"
						element={
							<PublicLayout>
								<Projects />
							</PublicLayout>
						}
					/>
					<Route
						path="/reports"
						element={
							<PublicLayout>
								<AnnualReport />
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
					<Route
						path="/events"
						element={
							<PublicLayout>
								<Events />
							</PublicLayout>
						}
					/>
					<Route
						path="/retirement"
						element={
							<PublicLayout>
								<Retirement />
							</PublicLayout>
						}
					/>

					{/* Redirect non-logged-in users from protected routes */}
					<Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
					<Route path="/admin/*" element={<Navigate to="/login" replace />} />
					<Route path="/admin-dashboard/*" element={<Navigate to="/login" replace />} />
				</>
			)}

			{/* Catch-all route - Redirect to appropriate home */}
			<Route
				path="*"
				element={<Navigate to={user ? (user.isAdmin ? "/admin" : "/dashboard") : "/"} replace />}
			/>
		</Routes>
	);
}

export default App;

import { useState } from "react";
import { User, Lock, Link, ShieldCheck } from "lucide-react";
import ProfileInfo from "@/components/ProfileInfo";
import UserReferrals from "@/components/UserReferrals";
import ChangePassword from "@/components/ChangePassword";
import TwoFactorAuth from "@/components/TwoFactorAuth";

// Tab component
const Tab = ({ label, icon, active, onClick }: any) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center py-2 px-6 w-full rounded-xl transition-colors ${
				active ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
			}`}
		>
			<div className="flex items-center space-x-2">
				{icon}
				<span>{label}</span>
			</div>
		</button>
	);
};

// Main Settings Component
export default function Profile() {
	const [activeTab, setActiveTab] = useState("profile");

	return (
		<div className={`min-h-screen transition-colors duration-200 pt-10 p-3`}>
			<div className="grid grid-cols-1 gap-6">
				{/* Tabs */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Tab
						label="Profile"
						icon={<User size={18} />}
						active={activeTab === "profile"}
						onClick={() => setActiveTab("profile")}
					/>
					<Tab
						label="Referrals"
						icon={<Link size={18} />}
						active={activeTab === "referrals"}
						onClick={() => setActiveTab("referrals")}
					/>
					<Tab
						label="Password"
						icon={<Lock size={18} />}
						active={activeTab === "password"}
						onClick={() => setActiveTab("password")}
					/>
					<Tab
						label="2FA"
						icon={<ShieldCheck size={18} />}
						active={activeTab === "2fa"}
						onClick={() => setActiveTab("2fa")}
					/>
				</div>

				{/* Tab Content */}
				<div>
					{activeTab === "profile" && <ProfileInfo />}
					{activeTab === "referrals" && <UserReferrals />}
					{activeTab === "password" && <ChangePassword />}
					{activeTab === "2fa" && <TwoFactorAuth />}
				</div>
			</div>
		</div>
	);
}

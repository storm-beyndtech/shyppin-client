import { useState } from "react";
import { PiggyBank, TrendingUp, Share2, Users, Mail, Check, Copy } from "lucide-react";
import { contextData } from "@/context/AuthContext";
import BankingCard from "@/components/BankingCard";
import { useActiveInvestmentInterest } from "@/hooks/useActiveInvestmentInterest";
import { formatCurrencyClean } from "@/utils/formatters";

interface User {
	_id: string;
	id: string;
	username: string;
	email: string;
	balance: number;
	deposit: number;
	interest: number;
}

const Dashboard = () => {
	const [copied, setCopied] = useState(false);

	const { user } = contextData() as { user: User };
	
	// Get active investment interest
	const { 
		animatedInterest: activeInvestmentInterest, 
		hasActiveInvestments,
		data: activeInvestmentData
	} = useActiveInvestmentInterest({ 
		userId: user?._id || user?.id,
		enabled: !!(user?._id || user?.id)
	});

	const handleCopyReferralCode = async () => {
		try {
			const referralLink = `${window.location.origin}/?ref=${user.username}`;
			await navigator.clipboard.writeText(referralLink);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy referral code:", error);
		}
	};

	const handleShareEmail = () => {
		const subject = encodeURIComponent("Join Profyt-Opt - Investment Platform");
		const body = encodeURIComponent(
			`Hi! I've been using Profyt-Opt for my investments and thought you might be interested. Use my referral link to get started: ${window.location.origin}/?ref=${user.username}`,
		);
		window.open(`mailto:?subject=${subject}&body=${body}`);
	};

	const handleShareSocial = (platform: "facebook" | "twitter") => {
		const referralLink = `${window.location.origin}/?ref=${user.username}`;
		const message = encodeURIComponent("Join me on Profyt-Opt - Smart Investment Platform");

		if (platform === "facebook") {
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`);
		} else if (platform === "twitter") {
			window.open(`https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(referralLink)}`);
		}
	};

	const today = new Date();
	const dateString = today.toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Calculate total balance (deposit + interest + active investment interest)
	const totalStaticBalance = (user.deposit || 0) + (user.interest || 0);
	const totalBalance = totalStaticBalance + (activeInvestmentInterest || 0);
	
	// Calculate total profit balance (completed interest + active interest)
	const totalProfitBalance = (user.interest || 0) + (activeInvestmentInterest || 0);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-slate-900/30 p-4 md:p-8">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header */}
				<div className="mb-10">
					<h1 className="text-2xl md:text-4xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-3">
						Welcome back,{" "}
						<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
							{user.username}
						</span>
					</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400 font-normal tracking-wide">{dateString}</p>
				</div>

				{/* Balance Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Total Balance */}
					<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/10 transition-all duration-300 group">
						<div className="flex items-center justify-between mb-4">
							<div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-inner">
								<span className="text-blue-600 dark:text-blue-400 font-medium text-lg">$</span>
							</div>
							<div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
						</div>
						<div>
							<p className="text-3xl font-normal text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
								{formatCurrencyClean(totalBalance)}
							</p>
							<p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 font-medium">
								Wallet Balance
							</p>
						</div>
					</div>

					{/* Deposit Balance */}
					<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/10 transition-all duration-300 group">
						<div className="flex items-center justify-between mb-4">
							<div className="w-11 h-11 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center shadow-inner">
								<PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
							</div>
							<div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
						</div>
						<div>
							<p className="text-3xl font-normal text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
								{formatCurrencyClean(user.deposit || 0)}
							</p>
							<p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 font-medium">
								Capital Balance
							</p>
						</div>
					</div>

					{/* Interest Balance */}
					<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-400/10 transition-all duration-300 group">
						<div className="flex items-center justify-between mb-4">
							<div className="w-11 h-11 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-inner">
								<TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
						</div>
						<div>
							<p className="text-3xl font-normal text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
								{formatCurrencyClean(totalProfitBalance)}
							</p>
							<p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 font-medium">
								Profit Balance
							</p>
							{hasActiveInvestments && (
								<div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
									<div className="flex justify-between items-center text-xs">
										<span className="text-gray-500 dark:text-gray-400">Completed:</span>
										<span className="font-medium text-gray-600 dark:text-gray-300">
											{formatCurrencyClean(user.interest || 0)}
										</span>
									</div>
									<div className="flex justify-between items-center text-xs mt-1">
										<span className="text-purple-600 dark:text-purple-400">Active:</span>
										<span className="font-medium text-purple-600 dark:text-purple-400">
											{formatCurrencyClean(activeInvestmentInterest || 0)}
										</span>
									</div>
									{activeInvestmentData && (
										<div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
											{activeInvestmentData.activeInvestmentCount} active investment{activeInvestmentData.activeInvestmentCount !== 1 ? 's' : ''}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Referral Section */}
				<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
					<div className="p-8 lg:p-10">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Left Column */}
							<div className="space-y-8">
								<div>
									<h2 className="text-3xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-4">
										Earn with{" "}
										<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
											Profyt-Opt
										</span>
									</h2>
									<p className="text-gray-600 dark:text-gray-400 leading-relaxed font-normal tracking-wide">
										Invite your friends to Profyt-Opt. When they sign up and invest, you'll earn commission
										on their investments and they get access to our premium investment platform.
									</p>
								</div>

								{/* Steps */}
								<div className="space-y-6">
									<div className="flex items-start gap-5">
										<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
											<Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
												Send Invitation
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
												Send your referral link to friends and tell them about Profyt-Opt's investment
												opportunities.
											</p>
										</div>
									</div>

									<div className="flex items-start gap-5">
										<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
											<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
												Registration
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
												Let your friends register using your personal referral code to start investing.
											</p>
										</div>
									</div>

									<div className="flex items-start gap-5">
										<div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
											<Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
												Earn Commission!
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
												You earn commission when your referrals make deposits on our platform.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Right Column */}
							<div className="space-y-8">
								{/* Card */}
								<div>
									<BankingCard />
								</div>
								{/* Email Invitation */}
								<div>
									<h3 className="text-xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-4">
										Invite your friends
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed font-normal">
										Send them an email invitation to join Profyt-Opt investment platform.
									</p>
									<div className="flex gap-3">
										<input
											type="email"
											placeholder="Enter email addresses..."
											className="flex-1 px-5 py-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-sm transition-all duration-200 font-normal tracking-wide"
										/>
										<button
											onClick={handleShareEmail}
											className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-blue-500/25"
										>
											<Share2 className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Referral Link */}
								<div>
									<h3 className="text-xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-4">
										Share the referral link
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed font-normal">
										Copy and share your referral link with friends or on social media.
									</p>

									<div className="flex gap-3 mb-6">
										<div className="flex-1 px-5 py-4 bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl backdrop-blur-sm overflow-hidden">
											<code className="text-xs text-gray-700 dark:text-gray-400 font-mono tracking-wide block truncate">
												{`${window.location.origin}/?ref=${user.username}`}
											</code>
										</div>
										<button
											onClick={handleCopyReferralCode}
											className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 dark:from-gray-100 dark:to-gray-200 dark:hover:from-gray-200 dark:hover:to-gray-300 dark:text-gray-900 text-white rounded-2xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-gray-500/25 font-medium tracking-wide"
										>
											{copied ? (
												<>
													<Check className="w-4 h-4" />
													Copied!
												</>
											) : (
												<>
													<Copy className="w-4 h-4" />
													Copy
												</>
											)}
										</button>
									</div>

									{/* Social Share Buttons */}
									<div className="flex gap-3">
										<button
											onClick={() => handleShareSocial("facebook")}
											className="w-14 h-14 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-2xl flex items-center justify-center transition-all duration-200 group hover:shadow-md"
										>
											<svg
												className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
										</button>
										<button
											onClick={() => handleShareSocial("twitter")}
											className="w-14 h-14 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-2xl flex items-center justify-center transition-all duration-200 group hover:shadow-md"
										>
											<svg
												className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
	ArrowDownLeft,
	DollarSign,
	Wallet,
	Network,
	AlertCircle,
	CheckCircle2,
	Bitcoin,
	CreditCard,
} from "lucide-react";
import PageLoader from "@/components/PageLoader";
import { useToastUtils } from "@/services/toast";

interface Coin {
	name: string;
	address: string;
	network: string;
	price: number;
}

export default function Withdraw() {
	const [amount, setAmount] = useState("");
	const [convertedAmount, setConvertedAmount] = useState<string | number>(0);
	const [coins, setCoins] = useState<Coin[]>([]);
	const [coin, setCoin] = useState<Coin | undefined>();
	const [address, setAddress] = useState("");
	const [network, setNetwork] = useState("");
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string>("");
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const { user } = contextData();
	const { showErrorToast, showSuccessToast } = useToastUtils();

	const fetchCoins = async () => {
		setFetching(true);
		try {
			const res = await fetch(`${url}/utils`);
			const data = await res.json();

			if (res.ok) {
				setCoins(data.coins);
				setCoin(data.coins[0]);
			} else throw new Error(data.message);
		} catch (error: any) {
			showErrorToast(error.message || "Failed to load cryptocurrencies");
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchCoins();
	}, []);

	const sendWithdraw = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		const numAmount = Number(amount);
		if (numAmount < 1) {
			const errorMsg = "The minimum withdrawal amount is $1";
			setError(errorMsg);
			showErrorToast(errorMsg);
			return;
		}
		if (!address.trim()) {
			const errorMsg = "Wallet address is required";
			setError(errorMsg);
			showErrorToast(errorMsg);
			return;
		}
		if (!network.trim()) {
			const errorMsg = "Network is required";
			setError(errorMsg);
			showErrorToast(errorMsg);
			return;
		}

		setLoading(true);

		try {
			const res = await fetch(`${url}/withdrawals`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: user._id,
					amount: numAmount,
					convertedAmount,
					coinName: coin?.name,
					address: address.trim(),
					network: network.trim(),
				}),
			});

			const data = await res.json();

			if (res.ok) {
				const successMsg = data.message || "Withdrawal request submitted successfully";
				setSuccess(successMsg);
				showSuccessToast(successMsg);
				// Reset form
				setAmount("");
				setAddress("");
				setNetwork("");
				setConvertedAmount(0);
			} else {
				throw new Error(data.message);
			}
		} catch (error: any) {
			const errorMsg = error.message || "Failed to process withdrawal";
			setError(errorMsg);
			showErrorToast(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	const roundNumber = (number: number) => {
		if (number < 1 && Math.abs(number) % 1 > 1e-6) {
			return number.toFixed(6);
		}
		return number.toFixed(2);
	};

	const handleCoinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const findCoin: Coin = JSON.parse(e.target.value);
		setCoin(findCoin);

		if (findCoin && amount) {
			setConvertedAmount(roundNumber(Number(amount) / findCoin.price));
		}
	};

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newAmount = e.target.value;
		setAmount(newAmount);

		if (coin && newAmount) {
			setConvertedAmount(roundNumber(Number(newAmount) / coin.price));
		} else {
			setConvertedAmount(0);
		}
	};

	const getCoinIcon = (coinName: string) => {
		const name = coinName?.toLowerCase();
		if (name?.includes("bitcoin") || name?.includes("btc")) {
			return <Bitcoin className="w-5 h-5 text-orange-500" />;
		}
		return <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
	};

	if (fetching) return <PageLoader />;

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
			<div className="max-w-2xl mx-auto space-y-6">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
						<ArrowDownLeft className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-normal tracking-wide text-slate-900 dark:text-slate-100 mb-2">
						Withdraw{" "}
						<span className="font-normal bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">
							Funds
						</span>
					</h1>
					<p className="text-slate-600 dark:text-slate-400">Transfer your funds to an external wallet</p>
				</div>

				{coin && (
					<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
						<div className="p-6 md:p-8">
							{/* Success/Error Messages */}
							{error && (
								<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl">
									<div className="flex items-center gap-3">
										<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
										<p className="text-red-800 dark:text-red-200">{error}</p>
									</div>
								</div>
							)}

							{success && (
								<div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl">
									<div className="flex items-center gap-3">
										<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
										<p className="text-green-800 dark:text-green-200">{success}</p>
									</div>
								</div>
							)}

							<form onSubmit={sendWithdraw} className="space-y-6">
								{/* Cryptocurrency and Amount */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
											Cryptocurrency
										</label>
										<div className="relative">
											<select
												onChange={handleCoinChange}
												className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 appearance-none cursor-pointer transition-all duration-200"
											>
												{coins.map((c: Coin, i: number) => (
													<option key={i} value={JSON.stringify(c)} className="capitalize">
														{c.name}
													</option>
												))}
											</select>
											<div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
												{coin && getCoinIcon(coin.name)}
											</div>
											<div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
												<svg
													className="w-5 h-5 text-slate-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</div>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
											Amount (USD)
										</label>
										<div className="relative">
											<DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
											<input
												type="number"
												value={amount}
												onChange={handleAmountChange}
												min="1"
												step="0.01"
												placeholder="0.00"
												className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all duration-200"
												required
											/>
										</div>
									</div>
								</div>

								{/* Wallet Address and Network */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
											Wallet Address
										</label>
										<div className="relative">
											<Wallet className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
											<input
												type="text"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												placeholder="Enter wallet address"
												className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all duration-200"
												required
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
											Network
										</label>
										<div className="relative">
											<Network className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
											<input
												type="text"
												value={network}
												onChange={(e) => setNetwork(e.target.value)}
												placeholder="e.g., ERC20, TRC20"
												className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all duration-200"
												required
											/>
										</div>
									</div>
								</div>

								{/* Conversion Display */}
								{coin && amount && (
									<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm text-slate-600 dark:text-slate-400 mb-1">You will receive</p>
												<p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
													{convertedAmount} {coin.name.toUpperCase()}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Rate</p>
												<p className="text-lg font-medium text-slate-700 dark:text-slate-300">
													${coin.price.toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								)}

								{/* Important Info */}
								<div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
									<div className="flex items-start gap-3">
										<AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
										<div>
											<h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Notes</h4>
											<ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
												<li>• Minimum withdrawal amount is $1</li>
												<li>• Double-check wallet address and network</li>
												<li>• Withdrawals are typically processed within 24 hours</li>
												<li>• Network fees may apply</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={loading || !amount || !address || !network}
									className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
								>
									{loading ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Processing...
										</>
									) : (
										<>
											<ArrowDownLeft className="w-5 h-5" />
											Withdraw Funds
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

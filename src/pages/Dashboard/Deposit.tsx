import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";
import { GoInfo } from "react-icons/go";
import { Copy, DollarSign, Wallet, CreditCard, CheckCircle } from "lucide-react";
import { useToastUtils } from "@/services/toast";
import { useNavigate } from "react-router-dom";

interface Coin {
	name: string;
	address: string;
	network: string;
	price: number;
}

export default function Deposit() {
	const [amount, setAmount] = useState(0);
	const [convertedAmount, setConvertedAmount] = useState<string | number>(0);
	const [coins, setCoins] = useState([]);
	const [coin, setCoin] = useState<Coin | undefined>();
	const [fetching, setFetching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const { showSuccessToast, showErrorToast } = useToastUtils();
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const { user } = contextData();
	const navigate = useNavigate();

	const fetchCoins = async () => {
		setFetching(true);
		try {
			const res = await fetch(`${url}/utils`);
			const data = await res.json();

			if (res.ok) {
				setCoins(data.coins);
				setCoin(data.coins[0]);
				// showSuccessToast("Payment methods loaded successfully");
			} else {
				throw new Error(data.message);
			}
		} catch (error: any) {
			showErrorToast(error.message || "Failed to load payment methods");
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchCoins();
	}, []);

	const sendDeposit = async (e: any) => {
		e.preventDefault();

		if (amount < 1) {
			const errorMsg = "The minimum transfer amount is $1";
			showErrorToast(errorMsg);
			return;
		}

		if (!coin) {
			showErrorToast("Try again later, payment methods not available");
			return;
		}

		setLoading(true);
		setSuccess(false);

		try {
			const res = await fetch(`${url}/deposits`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: user._id,
					amount,
					convertedAmount,
					coinName: coin.name,
					address: coin.address,
					network: coin.network,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setSuccess(data.message);
				showSuccessToast(`Deposit order created successfully! Amount: $${amount}`);
			} else {
				throw new Error(data.message);
			}
		} catch (error: any) {
			const errorMsg = error.message || "An error occurred while creating the deposit";
			if (errorMsg === "You have a pending deposit. Please wait for approval.") {
				setTimeout(() => {
					navigate("/dashboard/deposits");
				}, 2000);
			}
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

	const handleCoinChange = (e: any) => {
		const findCoin: Coin | any = JSON.parse(e.target.value);
		if (findCoin) setCoin(findCoin);

		if (findCoin) {
			setConvertedAmount(roundNumber(amount / findCoin.price));
		}
	};

	const handleAmountChange = (e: any) => {
		const newAmount = Number(e.target.value);
		setAmount(newAmount);
		if (coin) setConvertedAmount(roundNumber(newAmount / coin.price));
	};

	const copyToClipBoard = async (copyMe: string) => {
		try {
			await navigator.clipboard.writeText(copyMe);
			setCopySuccess(true);
			showSuccessToast("Address copied to clipboard!");
			setTimeout(() => {
				setCopySuccess(false);
			}, 3000);
		} catch (error) {
			showErrorToast("Failed to copy address");
		}
	};

	if (fetching) return <PageLoader />;

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 md:p-14">
			<div className="max-w-2xl mx-auto">
				{!success ? (
					<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
						<div className="p-8">
							{/* Header */}
							<div className="text-center mb-8">
								<div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
									<Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
								</div>
								<h1 className="text-lg sm:text-3xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-2">
									Make a{" "}
									<span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
										Deposit
									</span>
								</h1>
								<p className="text-gray-600 dark:text-gray-300 font-normal">
									Fund your account to start investing
								</p>
							</div>

							<form className="space-y-6" onSubmit={sendDeposit}>
								{/* Payment Method and Amount */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="coin"
											className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100"
										>
											<CreditCard className="w-4 h-4 inline mr-2" />
											Payment Method
										</label>
										<select
											onChange={handleCoinChange}
											id="coin"
											className="w-full px-4 py-3 bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 dark:text-gray-100 backdrop-blur-sm transition-all duration-200"
										>
											{coins.map((c: Coin, i: number) => (
												<option key={i} value={JSON.stringify(c)} className="capitalize">
													{c.name} ({c.network})
												</option>
											))}
										</select>
									</div>

									<div>
										<label
											htmlFor="amount"
											className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100"
										>
											<DollarSign className="w-4 h-4 inline mr-2" />
											Amount (USD)
										</label>
										<input
											onChange={handleAmountChange}
											value={amount === 0 ? "" : amount}
											type="number"
											id="amount"
											className="w-full px-4 py-3 bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-sm transition-all duration-200"
											placeholder="$0.00"
											required
											min={1}
										/>
									</div>
								</div>

								{/* Converted Amount and Minimum */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="convertedAmount"
											className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize"
										>
											Amount in {coin?.name}
										</label>
										<input
											value={convertedAmount}
											type="text"
											id="convertedAmount"
											className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 backdrop-blur-sm"
											disabled
											readOnly
										/>
									</div>

									<div>
										<label
											htmlFor="minDeposit"
											className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100"
										>
											Minimum Deposit
										</label>
										<input
											value="$1.00"
											type="text"
											id="minDeposit"
											className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 backdrop-blur-sm"
											disabled
											readOnly
										/>
									</div>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={loading || amount < 1}
									className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? (
										<div className="flex items-center justify-center gap-2">
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
											Processing...
										</div>
									) : (
										"Create Deposit Order"
									)}
								</button>
							</form>
						</div>
					</div>
				) : (
					/* Success State */
					<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
						<div className="p-8">
							{/* Success Header */}
							<div className="text-center mb-8">
								<div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
									<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
								</div>
								<h1 className="text-3xl font-normal tracking-wide text-gray-900 dark:text-gray-100 mb-2">
									Deposit{" "}
									<span className="font-normal bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
										Confirmation
									</span>
								</h1>
								<p className="text-gray-600 dark:text-gray-300 font-normal">
									Your deposit order has been created successfully
								</p>
							</div>

							{/* Payment Details */}
							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 mb-6">
								<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 capitalize">
									{coin?.name} Payment Details
								</h3>

								<div className="space-y-3 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600 dark:text-gray-400">Order Amount:</span>
										<span className="font-medium text-blue-600 dark:text-blue-400">${amount} USD</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600 dark:text-gray-400">Send Amount:</span>
										<span className="font-medium text-green-600 dark:text-green-400">
											{convertedAmount} {coin?.name}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600 dark:text-gray-400">Network:</span>
										<span className="font-medium text-gray-900 dark:text-gray-100">{coin?.network}</span>
									</div>
								</div>
							</div>

							{/* Instructions */}
							<div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 mb-6">
								<p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
									Please send exactly{" "}
									<span className="font-medium">
										{convertedAmount} {coin?.name}
									</span>{" "}
									to the address below. The amount will reflect in your wallet only after the transaction is
									confirmed on the blockchain.
								</p>
							</div>

							{/* Wallet Address */}
							<div className="space-y-4">
								<label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
									Deposit Address
								</label>

								<div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
									{coin && (
										<div className="flex flex-col lg:flex-row items-center gap-6">
											{/* QR Code */}
											<div className="flex-shrink-0">
												<img
													src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
														coin.address,
													)}`}
													alt="QR Code"
													className="w-32 h-32 rounded-xl border border-gray-200 dark:border-gray-700"
												/>
											</div>

											{/* Address */}
											<div className="flex-1 w-full">
												<div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
													<div className="flex items-center gap-3">
														<input
															type="text"
															readOnly
															value={coin.address}
															className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 font-mono text-sm outline-none break-all"
														/>
														<button
															onClick={() => copyToClipBoard(coin.address)}
															className="flex-shrink-0 p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
														>
															<Copy
																size={18}
																className={copySuccess ? "text-blue-600 dark:text-blue-400" : ""}
															/>
														</button>
													</div>
													{copySuccess && (
														<p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
															Address copied to clipboard!
														</p>
													)}
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Warning */}
								<div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl">
									<GoInfo className="text-red-600 dark:text-red-400 text-lg flex-shrink-0 mt-0.5" />
									<p className="text-sm text-red-800 dark:text-red-200 leading-relaxed">
										<strong>Important:</strong> Please ensure you are sending to the correct wallet address
										and network. Sending to the wrong address or network may result in permanent loss of
										funds.
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

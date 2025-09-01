import { motion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Transaction {
	hash: string;
	time: number;
	value: number;
	to: string;
	symbol: string;
	id: string;
}

// Generate random addresses and hashes
const generateRandomHash = () => {
	const chars = "0123456789abcdef";
	let hash = "0x";
	for (let i = 0; i < 64; i++) {
		hash += chars[Math.floor(Math.random() * chars.length)];
	}
	return hash;
};

const generateRandomAddress = () => {
	const chars = "0123456789abcdefABCDEF";
	let start = "0x";
	let end = "";
	for (let i = 0; i < 8; i++) {
		start += chars[Math.floor(Math.random() * chars.length)];
	}
	for (let i = 0; i < 4; i++) {
		end += chars[Math.floor(Math.random() * chars.length)];
	}
	return `${start}...${end}`;
};

const symbols = ["BTC", "ETH", "USDT", "USDC", "BNB", "ADA", "DOT", "LINK"];

const generateRandomTransaction = (): Transaction => {
	const symbol = symbols[Math.floor(Math.random() * symbols.length)];
	let value;

	switch (symbol) {
		case "BTC":
			value = Math.random() * 10;
			break;
		case "ETH":
			value = Math.random() * 100;
			break;
		case "USDT":
		case "USDC":
			value = Math.random() * 100000;
			break;
		default:
			value = Math.random() * 1000;
	}

	return {
		hash: generateRandomHash(),
		time: Date.now() - Math.random() * 3600000, // Random time within last hour
		value,
		to: generateRandomAddress(),
		symbol,
		id: `tx-${Date.now()}-${Math.random()}`,
	};
};

export default function TransactionsSection() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [visibleTransactions, setVisibleTransactions] = useState(5);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	// Initialize with random transactions
	useEffect(() => {
		const initialTransactions = Array.from({ length: 12 }, generateRandomTransaction).sort(
			(a, b) => b.time - a.time,
		);
		setTransactions(initialTransactions);
	}, []);

	// Intersection Observer to detect when section is visible
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// Dynamic transaction updates when visible
	useEffect(() => {
		if (!isVisible) return;

		const interval = setInterval(() => {
			setIsRefreshing(true);

			setTimeout(() => {
				setTransactions((prev) => {
					// Create a mix of existing and new transactions
					const newTransaction = generateRandomTransaction();
					const updatedTransactions = [newTransaction, ...prev];

					// Randomly update some existing transaction times to simulate activity
					const randomizedTransactions = updatedTransactions.map((tx) =>
						Math.random() < 0.3 ? { ...tx, time: Date.now() - Math.random() * 1800000 } : tx,
					);

					// Keep only the most recent 15 transactions
					return randomizedTransactions.sort((a, b) => b.time - a.time).slice(0, 15);
				});
				setIsRefreshing(false);
			}, 600);
		}, 3000); // Update every 3 seconds when visible

		return () => clearInterval(interval);
	}, [isVisible]);

	// Format hash to show only first and last few characters
	const formatHash = (hash: string) => {
		return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
	};

	// Format address to show only first and last few characters
	const formatAddress = (address: string) => {
		return address;
	};

	// Format amount with appropriate decimal places based on currency
	const formatAmount = (amount: number, symbol: string) => {
		const decimals = ["BTC", "ETH"].includes(symbol) ? 6 : 2;
		return amount.toLocaleString("en-US", {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		});
	};

	// Format time to show relative time
	const formatTime = (timestamp: number) => {
		const now = Date.now();
		const diff = now - timestamp;
		const minutes = Math.floor(diff / 60000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}m ago`;

		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;

		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	};

	const showMore = () => {
		setVisibleTransactions(transactions.length);
	};

	const showLess = () => {
		setVisibleTransactions(5);
	};

	return (
		<section
			ref={sectionRef}
			className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-x-hidden relative w-full"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<div className="flex items-center gap-3 mb-2 sm:mb-4">
						<h2 className="text-2xl sm:text-3xl font-semibold">
							Latest <span className="text-blue-600">Transactions</span>
						</h2>
						{isRefreshing && <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />}
						{isVisible && (
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span className="text-xs text-green-600 font-medium">LIVE</span>
							</div>
						)}
					</div>
					<p className="text-gray-600 text-sm sm:text-base">
						Real-time transactions on Profyt-Opt
					</p>
				</motion.div>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
						<table className="w-full min-w-full table-fixed">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/3">
										Transaction Hash
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
										To
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
										Amount
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/8">
										Time
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-16">
										<span className="sr-only">Action</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{transactions.slice(0, visibleTransactions).map((transaction, index) => (
									<motion.tr
										key={transaction.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{
											opacity: isRefreshing ? 0.6 : 1,
											x: 0,
										}}
										exit={{ opacity: 0, x: 20 }}
										transition={{
											duration: 0.4,
											delay: index * 0.03,
										}}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-900 font-mono">
											{formatHash(transaction.hash)}
										</td>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-500 font-mono">
											{formatAddress(transaction.to)}
										</td>
										<td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-right text-gray-900">
											<div className="flex items-center justify-end">
												<span className="text-xs text-gray-500 mr-1">{transaction.symbol}</span>
												<span className="truncate font-mono">
													{formatAmount(transaction.value, transaction.symbol)}
												</span>
											</div>
										</td>
										<td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
											{formatTime(transaction.time)}
										</td>
										<td className="px-4 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
											<a
												href="#"
												onClick={(e) => e.preventDefault()}
												className="text-blue-600 hover:text-blue-700 block"
											>
												<ArrowUpRight className="h-4 w-4 ml-auto" />
											</a>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="px-4 py-3 bg-gray-50 text-right">
						{visibleTransactions < transactions.length ? (
							<button onClick={showMore} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
								View All Transactions
							</button>
						) : (
							<button onClick={showLess} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
								Show Less
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

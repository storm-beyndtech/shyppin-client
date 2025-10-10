import { useEffect, useState } from "react";
import { DollarSign, Clock, CheckCircle } from "lucide-react";

export default function AdminRevenueCards() {
	const [shipments, setShipments] = useState<any[]>([]);
	const [totalRevenue, setTotalRevenue] = useState(487520);
	const [pendingQuotes, setPendingQuotes] = useState(23);
	const [completedShipments, setCompletedShipments] = useState(2691);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchShipmentData = async () => {
		try {
			const res = await fetch(`${url}/shipments`);
			const data = await res.json();

			if (res.ok) {
				setShipments(data);
				// Calculate metrics from shipment data
				const completed = data.filter((shipment: any) => shipment.status === 'delivered').length;
				setCompletedShipments(completed);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchShipmentData();
	}, []);

	return (
		<div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Total Revenue</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						${Number(totalRevenue).toLocaleString("en-US")}
					</h2>
					<DollarSign className="text-3xl text-green-500" />
				</div>
			</div>

			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Pending Quotes</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						{Number(pendingQuotes).toLocaleString("en-US")}
					</h2>
					<Clock className="text-3xl text-orange-500" />
				</div>
			</div>

			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Completed Deliveries</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						{Number(completedShipments).toLocaleString("en-US")}
					</h2>
					<CheckCircle className="text-3xl text-blue-500" />
				</div>
			</div>
		</div>
	);
}

import { useState } from "react";
import { Search, Package, Truck, Plane, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const Tracking = () => {
	const [trackingNumber, setTrackingNumber] = useState("");
	const [shipmentData, setShipmentData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const sampleStatuses = [
		{ status: "Created", description: "Shipment booked and awaiting pickup", color: "gray", icon: Package },
		{ status: "Picked Up", description: "Cargo collected from origin", color: "blue", icon: Truck },
		{ status: "In Transit", description: "Shipment in progress", color: "yellow", icon: Plane },
		{ status: "Customs Clearance", description: "Undergoing customs processing", color: "orange", icon: AlertCircle },
		{ status: "Out for Delivery", description: "Final leg to destination", color: "green", icon: MapPin },
		{ status: "Delivered", description: "Successfully delivered", color: "green", icon: CheckCircle },
	];

	const features = [
		"Real-time GPS tracking for ground shipments",
		"Flight and vessel tracking for air and ocean freight",
		"Automated email and SMS notifications",
		"Proof of delivery documents",
		"Shipment history and analytics",
	];

	const handleTrack = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!trackingNumber.trim()) return;

		setLoading(true);
		setError("");

		try {
			const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/shipments/track/${trackingNumber}`);
			const data = await response.json();

			if (response.ok) {
				setShipmentData(data);
			} else {
				setError(data.message || "Shipment not found");
				setShipmentData(null);
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
			setError(`Failed to track shipment: ${errorMessage}`);
			setShipmentData(null);
			console.error('Error tracking shipment:', err);
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status: string) => {
		const colors: { [key: string]: string } = {
			pending: "bg-gray-500",
			"picked-up": "bg-blue-500",
			"in-transit": "bg-yellow-500",
			"arrived": "bg-orange-500",
			"out-for-delivery": "bg-green-500",
			delivered: "bg-green-600",
			delayed: "bg-red-500",
			exception: "bg-red-600",
		};
		return colors[status] || "bg-gray-500";
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-slate-950">
			{/* Hero Section */}
			<div className="bg-gradient-to-b from-blue-700 to-blue-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Shipment</h1>
					<p className="text-xl mb-8 opacity-90">
						Enter your tracking number to see real-time updates on your cargo
					</p>

					{/* Tracking Form */}
					<form onSubmit={handleTrack} className="max-w-md mx-auto">
						<div className="relative">
							<input
								type="text"
								value={trackingNumber}
								onChange={(e) => setTrackingNumber(e.target.value)}
								placeholder="Enter tracking number (e.g., SHYP123456789)"
								className="w-full px-4 py-4 pr-16 rounded-2xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
							/>
							<button
								type="submit"
								disabled={loading}
								className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50"
							>
								{loading ? (
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
								) : (
									<Search className="w-5 h-5 text-white" />
								)}
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Error Message */}
				{error && (
					<div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl">
						<div className="flex items-center">
							<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
							<p className="text-red-800 dark:text-red-200">{error}</p>
						</div>
					</div>
				)}

				{/* Shipment Results */}
				{shipmentData && (
					<div className="max-w-4xl mx-auto mb-16">
						<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
							{/* Header */}
							<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
								<h2 className="text-2xl font-bold mb-2">Shipment Details</h2>
								<p className="opacity-90">Tracking ID: {(shipmentData as any).trackingNumber}</p>
							</div>

							{/* Status Timeline */}
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Tracking Events</h3>
								<div className="space-y-4">
									{(shipmentData as any).trackingEvents?.map((event: any, index: number) => (
										<div key={index} className="flex items-start">
											<div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} mt-2 mr-4 flex-shrink-0`}></div>
											<div className="flex-1">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
															{event.status.replace('-', ' ')}
														</h4>
														<p className="text-gray-600 dark:text-gray-400 text-sm">
															{event.description}
														</p>
														<p className="text-gray-500 dark:text-gray-500 text-sm">
															{event.location}
														</p>
													</div>
													<span className="text-sm text-gray-500 dark:text-gray-400">
														{new Date(event.timestamp).toLocaleString()}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Shipment Info */}
							<div className="bg-gray-50 dark:bg-gray-800 p-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Origin</h4>
										<p className="text-gray-600 dark:text-gray-400">
											{(shipmentData as any).sender?.city}, {(shipmentData as any).sender?.state}
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Destination</h4>
										<p className="text-gray-600 dark:text-gray-400">
											{(shipmentData as any).recipient?.city}, {(shipmentData as any).recipient?.state}
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Service Type</h4>
										<p className="text-gray-600 dark:text-gray-400 capitalize">
											{(shipmentData as any).service?.type}
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Est. Delivery</h4>
										<p className="text-gray-600 dark:text-gray-400">
											{new Date((shipmentData as any).service?.estimatedDelivery).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Features and Status Guide */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Sample Statuses */}
					<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Shipment Statuses</h3>
						<div className="space-y-4">
							{sampleStatuses.map((status) => (
								<div key={status.status} className="flex items-center">
									<div className={`w-3 h-3 rounded-full bg-${status.color}-500 mr-4`}></div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100">{status.status}</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">{status.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Features */}
					<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Tracking Features</h3>
						<ul className="space-y-4">
							{features.map((feature, index) => (
								<li key={index} className="flex items-start">
									<CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
									<span className="text-gray-600 dark:text-gray-400">{feature}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tracking;
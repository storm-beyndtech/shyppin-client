import { useEffect, useState } from "react";
import {
	Package,
	Truck,
	MapPin,
	Calendar,
	Search,
	Plus,
	Edit,
	Trash2,
	Eye,
	X,
	CheckCircle,
	AlertCircle,
} from "lucide-react";

interface TrackingEvent {
	timestamp: string;
	location: string;
	status: string;
	description: string;
}

interface Shipment {
	_id: string;
	trackingNumber: string;
	sender: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		email: string;
		phone: string;
	};
	recipient: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		email: string;
		phone: string;
	};
	package: {
		weight: number;
		dimensions: {
			length: number;
			width: number;
			height: number;
		};
		description: string;
		declaredValue: number;
		fragile: boolean;
		hazardous: boolean;
	};
	service: {
		type: string;
		cost: number;
		estimatedDelivery: string;
	};
	status: string;
	currentLocation: string;
	trackingEvents: TrackingEvent[];
	createdAt: string;
	updatedAt: string;
}

interface NewShipment {
	sender: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		email: string;
		phone: string;
	};
	recipient: {
		name: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		email: string;
		phone: string;
	};
	package: {
		weight: number;
		dimensions: {
			length: number;
			width: number;
			height: number;
		};
		description: string;
		declaredValue: number;
		fragile: boolean;
		hazardous: boolean;
	};
	service: {
		type: string;
		cost: number;
		estimatedDelivery: string;
	};
}

export default function AdminShipments() {
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const [submitting, setSubmitting] = useState(false);
	const [updatingStatus, setUpdatingStatus] = useState(false);
	const [statusUpdate, setStatusUpdate] = useState({
		status: "",
		currentLocation: "",
		notes: "",
	});
	const [statusUpdates, setStatusUpdates] = useState([
		{
			status: "",
			location: "",
			description: "",
			timestamp: new Date().toISOString().slice(0, 16), // Format for datetime-local input
		},
	]);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const [newShipment, setNewShipment] = useState<NewShipment>({
		sender: {
			name: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
			email: "",
			phone: "",
		},
		recipient: {
			name: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
			email: "",
			phone: "",
		},
		package: {
			weight: 0,
			dimensions: {
				length: 0,
				width: 0,
				height: 0,
			},
			description: "",
			declaredValue: 0,
			fragile: false,
			hazardous: false,
		},
		service: {
			type: "standard",
			cost: 0,
			estimatedDelivery: "",
		},
	});

	const fetchShipments = async () => {
		try {
			setLoading(true);
			setError("");
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Authentication required. Please log in.");
				return;
			}

			const response = await fetch(`${url}/shipments`, {
				headers: {
					"x-auth-token": token,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setShipments(Array.isArray(data) ? data : []);
				setSuccess("Shipments loaded successfully");
				setTimeout(() => setSuccess(""), 3000);
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage = errorData.message || `Failed to fetch shipments (${response.status})`;
				setError(errorMessage);
				console.error("Fetch shipments error:", response.status, errorMessage);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Network error occurred";
			setError(`Error fetching shipments: ${errorMessage}`);
			console.error("Error fetching shipments:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchShipments();
	}, []);

	const filteredShipments = shipments.filter((shipment) => {
		const matchesSearch =
			shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			shipment.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const openShipmentModal = (shipment: Shipment) => {
		setSelectedShipment(shipment);
		setStatusUpdate({
			status: shipment.status,
			currentLocation: shipment.currentLocation,
			notes: "",
		});
		setShowModal(true);
	};

	const closeModal = () => {
		setSelectedShipment(null);
		setShowModal(false);
		setShowCreateModal(false);
		setShowEditModal(false);
		setStatusUpdate({ status: "", currentLocation: "", notes: "" });
		setStatusUpdates([
			{
				status: "",
				location: "",
				description: "",
				timestamp: new Date().toISOString().slice(0, 16),
			},
		]);
	};

	const openCreateModal = () => {
		setShowCreateModal(true);
	};

	const addStatusUpdate = () => {
		setStatusUpdates([
			...statusUpdates,
			{
				status: "",
				location: "",
				description: "",
				timestamp: new Date().toISOString().slice(0, 16),
			},
		]);
	};

	const removeStatusUpdate = (index: number) => {
		if (statusUpdates.length > 1) {
			setStatusUpdates(statusUpdates.filter((_, i) => i !== index));
		}
	};

	const updateStatusUpdate = (index: number, field: string, value: string) => {
		const updated = [...statusUpdates];
		updated[index] = { ...updated[index], [field]: value };
		setStatusUpdates(updated);
	};

	const openEditModal = (shipment: Shipment) => {
		setSelectedShipment(shipment);
		setNewShipment({
			sender: shipment.sender,
			recipient: shipment.recipient,
			package: shipment.package,
			service: {
				type: shipment.service.type,
				cost: shipment.service.cost,
				estimatedDelivery: shipment.service.estimatedDelivery,
			},
		});
		setStatusUpdate({
			status: shipment.status,
			currentLocation: shipment.currentLocation,
			notes: "",
		});
		// Initialize with existing tracking events or empty array
		setStatusUpdates(
			shipment.trackingEvents?.length > 0
				? shipment.trackingEvents.map((event) => ({
						status: event.status,
						location: event.location,
						description: event.description,
						timestamp: new Date(event.timestamp).toISOString().slice(0, 16),
				  }))
				: [
						{
							status: "",
							location: "",
							description: "",
							timestamp: new Date().toISOString().slice(0, 16),
						},
				  ],
		);
		setShowEditModal(true);
	};

	const handleCreateShipment = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setError("");

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Authentication required. Please log in.");
				return;
			}

			const response = await fetch(`${url}/shipments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
				body: JSON.stringify(newShipment),
			});

			if (response.ok) {
				const createdShipment = await response.json();
				setSuccess(`Shipment ${createdShipment.trackingNumber || "created"} successfully!`);
				setTimeout(() => setSuccess(""), 5000);
				await fetchShipments();
				closeModal();
				// Reset form
				setNewShipment({
					sender: {
						name: "",
						address: "",
						city: "",
						state: "",
						zipCode: "",
						country: "",
						email: "",
						phone: "",
					},
					recipient: {
						name: "",
						address: "",
						city: "",
						state: "",
						zipCode: "",
						country: "",
						email: "",
						phone: "",
					},
					package: {
						weight: 0,
						dimensions: { length: 0, width: 0, height: 0 },
						description: "",
						declaredValue: 0,
						fragile: false,
						hazardous: false,
					},
					service: { type: "standard", cost: 0, estimatedDelivery: "" },
				});
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage = errorData.message || `Failed to create shipment (${response.status})`;
				setError(errorMessage);
				console.error("Create shipment error:", response.status, errorMessage);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Network error occurred";
			setError(`Error creating shipment: ${errorMessage}`);
			console.error("Error creating shipment:", error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleUpdateShipment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedShipment) return;

		// Validate status updates - check for incomplete entries
		const incompleteUpdates = statusUpdates.filter(
			(update) => 
				(update.status && (!update.location || !update.description)) ||
				(update.location && (!update.status || !update.description)) ||
				(update.description && (!update.status || !update.location))
		);

		if (incompleteUpdates.length > 0) {
			setError("Please complete all fields for each status update or remove incomplete entries.");
			return;
		}

		setSubmitting(true);
		setError("");

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Authentication required. Please log in.");
				return;
			}

			// Prepare update data including status and location updates
			let updateData = { ...newShipment } as Shipment;

			// Process status updates array - only include complete entries
			const validStatusUpdates = statusUpdates.filter(
				(update) => update.status && update.location && update.description && update.timestamp,
			);

			// Only update if we have at least one valid status update
			if (validStatusUpdates.length > 0) {
				// Sort by timestamp to ensure chronological order
				const sortedUpdates = validStatusUpdates.sort((a, b) => 
					new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
				);

				const trackingEvents = sortedUpdates.map((update) => ({
					timestamp: new Date(update.timestamp).toISOString(),
					location: update.location.trim(),
					status: update.status,
					description: update.description.trim(),
				}));

				// Get the latest status for the main status field (most recent timestamp)
				const latestUpdate = sortedUpdates[sortedUpdates.length - 1];

				updateData = {
					...updateData,
					status: latestUpdate.status,
					currentLocation: latestUpdate.location.trim(),
					trackingEvents: trackingEvents,
					updatedAt: new Date().toISOString(),
				};
			} else {
				// If no valid status updates, just update the shipment details without changing status
				updateData = {
					...updateData,
					updatedAt: new Date().toISOString(),
				};
			}

			const response = await fetch(`${url}/shipments/${selectedShipment._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
				body: JSON.stringify(updateData),
			});

			if (response.ok) {
				const updatedShipment = await response.json();
				setSuccess(
					`Shipment ${
						updatedShipment.trackingNumber || selectedShipment.trackingNumber
					} updated successfully!`,
				);
				setTimeout(() => setSuccess(""), 5000);
				await fetchShipments();
				closeModal();
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage = errorData.message || `Failed to update shipment (${response.status})`;
				setError(errorMessage);
				console.error("Update shipment error:", response.status, errorMessage);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Network error occurred";
			setError(`Error updating shipment: ${errorMessage}`);
			console.error("Error updating shipment:", error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteShipment = async (shipmentId: string) => {
		if (!confirm("Are you sure you want to delete this shipment?")) return;

		setError("");

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Authentication required. Please log in.");
				return;
			}

			const response = await fetch(`${url}/shipments/${shipmentId}`, {
				method: "DELETE",
				headers: {
					"x-auth-token": token,
				},
			});

			if (response.ok) {
				setSuccess("Shipment deleted successfully!");
				setTimeout(() => setSuccess(""), 5000);
				await fetchShipments();
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage = errorData.message || `Failed to delete shipment (${response.status})`;
				setError(errorMessage);
				console.error("Delete shipment error:", response.status, errorMessage);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Network error occurred";
			setError(`Error deleting shipment: ${errorMessage}`);
			console.error("Error deleting shipment:", error);
		}
	};

	const handleStatusUpdate = async () => {
		if (!selectedShipment) return;

		setUpdatingStatus(true);
		setError("");

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Authentication required. Please log in.");
				return;
			}

			// Prepare tracking event
			const trackingEvent = {
				timestamp: new Date().toISOString(),
				location: statusUpdate.currentLocation,
				status: statusUpdate.status,
				description: statusUpdate.notes || `Status updated to ${statusUpdate.status.replace("-", " ")}`,
			};

			// Update shipment with new status and tracking event
			const updateData = {
				status: statusUpdate.status,
				currentLocation: statusUpdate.currentLocation,
				trackingEvents: [...(selectedShipment.trackingEvents || []), trackingEvent],
				updatedAt: new Date().toISOString(),
			};

			const response = await fetch(`${url}/shipments/${selectedShipment._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
				body: JSON.stringify(updateData),
			});

			if (response.ok) {
				setSuccess(`Shipment ${selectedShipment.trackingNumber} status updated successfully!`);
				setTimeout(() => setSuccess(""), 5000);
				await fetchShipments();
				closeModal();
			} else {
				const errorData = await response.json().catch(() => ({}));
				const errorMessage = errorData.message || `Failed to update status (${response.status})`;
				setError(errorMessage);
				console.error("Update status error:", response.status, errorMessage);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Network error occurred";
			setError(`Error updating status: ${errorMessage}`);
			console.error("Error updating status:", error);
		} finally {
			setUpdatingStatus(false);
		}
	};

	const getStatusColor = (status: string) => {
		const colors: { [key: string]: string } = {
			pending: "bg-gray-500",
			"picked-up": "bg-blue-500",
			"in-transit": "bg-yellow-500",
			arrived: "bg-orange-500",
			"out-for-delivery": "bg-green-500",
			delivered: "bg-green-600",
			delayed: "bg-red-500",
			exception: "bg-red-600",
		};
		return colors[status] || "bg-gray-500";
	};

	if (loading) {
		return (
			<div className="p-4 sm:p-6">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-300 rounded mb-4"></div>
					<div className="space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="h-16 bg-gray-300 rounded"></div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 sm:p-6">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-100 dark:text-white mb-2">Shipment Management</h1>
				<p className="text-gray-300 dark:text-gray-200">
					Track and manage all shipments in your freight network
				</p>
			</div>

			{/* Success Message */}
			{success && (
				<div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
					<div className="flex items-center">
						<CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
						<p className="text-green-800 dark:text-green-200 text-sm">{success}</p>
					</div>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
					<div className="flex items-center">
						<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
						<p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
					</div>
				</div>
			)}

			{/* Stats Cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg border border-gray-600 dark:border-gray-700">
					<div className="flex items-center">
						<Package className="h-8 w-8 text-blue-500" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-300 dark:text-gray-200">Total</p>
							<p className="text-2xl font-bold text-gray-100 dark:text-white">{shipments.length}</p>
						</div>
					</div>
				</div>
				<div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg border border-gray-600 dark:border-gray-700">
					<div className="flex items-center">
						<Truck className="h-8 w-8 text-green-500" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-300 dark:text-gray-200">In Transit</p>
							<p className="text-2xl font-bold text-gray-100 dark:text-white">
								{shipments.filter((s) => s.status === "in-transit").length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg border border-gray-600 dark:border-gray-700">
					<div className="flex items-center">
						<MapPin className="h-8 w-8 text-yellow-500" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-300 dark:text-gray-200">Delivered</p>
							<p className="text-2xl font-bold text-gray-100 dark:text-white">
								{shipments.filter((s) => s.status === "delivered").length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg border border-gray-600 dark:border-gray-700">
					<div className="flex items-center">
						<Calendar className="h-8 w-8 text-purple-500" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-300 dark:text-gray-200">Pending</p>
							<p className="text-2xl font-bold text-gray-100 dark:text-white">
								{shipments.filter((s) => s.status === "pending").length}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Search and Filter */}
			<div className="mb-6 flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<input
							type="text"
							placeholder="Search by tracking number, sender, or recipient..."
							className="w-full pl-10 pr-4 py-3 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<select
						className="px-4 py-3 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value="all">All Status</option>
						<option value="pending">Pending</option>
						<option value="picked-up">Picked Up</option>
						<option value="in-transit">In Transit</option>
						<option value="delivered">Delivered</option>
					</select>
					<button
						onClick={openCreateModal}
						className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 min-h-[48px]"
					>
						<Plus className="h-4 w-4" />
						<span className="hidden sm:inline">New Shipment</span>
						<span className="sm:hidden">New</span>
					</button>
				</div>
			</div>

			{/* Desktop Table */}
			<div className="hidden lg:block bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-600 dark:border-gray-700 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-600 dark:divide-gray-700">
						<thead className="bg-gray-700 dark:bg-gray-950">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Tracking Number
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Sender
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Recipient
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Service
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-gray-800 dark:bg-gray-900 divide-y divide-gray-600 dark:divide-gray-700">
							{filteredShipments.map((shipment) => (
								<tr key={shipment._id} className="hover:bg-gray-700 dark:hover:bg-gray-800">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
										{shipment.trackingNumber}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<div>
											<div className="font-medium">{shipment.sender.name}</div>
											<div className="text-gray-400">
												{shipment.sender.city}, {shipment.sender.state}
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<div>
											<div className="font-medium">{shipment.recipient.name}</div>
											<div className="text-gray-400">
												{shipment.recipient.city}, {shipment.recipient.state}
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
										{shipment.service.type}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(
												shipment.status,
											)}`}
										>
											{shipment.status.replace("-", " ")}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div className="flex space-x-2">
											<button
												onClick={() => openShipmentModal(shipment)}
												className="text-blue-400 hover:text-blue-300"
											>
												<Eye className="h-4 w-4" />
											</button>
											<button
												onClick={() => openEditModal(shipment)}
												className="text-yellow-400 hover:text-yellow-300"
											>
												<Edit className="h-4 w-4" />
											</button>
											<button
												onClick={() => handleDeleteShipment(shipment._id)}
												className="text-red-400 hover:text-red-300"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Mobile Cards */}
			<div className="lg:hidden space-y-4">
				{filteredShipments.map((shipment) => (
					<div
						key={shipment._id}
						className="bg-gray-700 dark:bg-gray-800 rounded-lg p-4 border border-gray-600 dark:border-gray-700"
					>
						<div className="flex justify-between items-start mb-3">
							<div>
								<p className="font-semibold text-gray-100">{shipment.trackingNumber}</p>
								<span
									className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(
										shipment.status,
									)} mt-1`}
								>
									{shipment.status.replace("-", " ")}
								</span>
							</div>
							<div className="flex space-x-2">
								<button
									onClick={() => openShipmentModal(shipment)}
									className="text-blue-400 hover:text-blue-300"
								>
									<Eye className="h-4 w-4" />
								</button>
								<button
									onClick={() => openEditModal(shipment)}
									className="text-yellow-400 hover:text-yellow-300"
								>
									<Edit className="h-4 w-4" />
								</button>
								<button
									onClick={() => handleDeleteShipment(shipment._id)}
									className="text-red-400 hover:text-red-300"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-400">From:</span>
								<span className="text-gray-300">{shipment.sender.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-400">To:</span>
								<span className="text-gray-300">{shipment.recipient.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-400">Location:</span>
								<span className="text-gray-300">{shipment.currentLocation}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Shipment Detail Modal */}
			{showModal && selectedShipment && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-gray-800 dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-gray-100">Shipment Details</h2>
								<button onClick={closeModal} className="text-gray-400 hover:text-gray-300">
									<X className="h-6 w-6" />
								</button>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{/* Sender Info */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-gray-100">Sender Information</h3>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-gray-400">Name:</span>{" "}
											<span className="text-gray-300">{selectedShipment.sender.name}</span>
										</p>
										<p>
											<span className="text-gray-400">Address:</span>{" "}
											<span className="text-gray-300">{selectedShipment.sender.address}</span>
										</p>
										<p>
											<span className="text-gray-400">City:</span>{" "}
											<span className="text-gray-300">
												{selectedShipment.sender.city}, {selectedShipment.sender.state}{" "}
												{selectedShipment.sender.zipCode}
											</span>
										</p>
										<p>
											<span className="text-gray-400">Email:</span>{" "}
											<span className="text-gray-300">{selectedShipment.sender.email}</span>
										</p>
										<p>
											<span className="text-gray-400">Phone:</span>{" "}
											<span className="text-gray-300">{selectedShipment.sender.phone}</span>
										</p>
									</div>
								</div>

								{/* Recipient Info */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-gray-100">Recipient Information</h3>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-gray-400">Name:</span>{" "}
											<span className="text-gray-300">{selectedShipment.recipient.name}</span>
										</p>
										<p>
											<span className="text-gray-400">Address:</span>{" "}
											<span className="text-gray-300">{selectedShipment.recipient.address}</span>
										</p>
										<p>
											<span className="text-gray-400">City:</span>{" "}
											<span className="text-gray-300">
												{selectedShipment.recipient.city}, {selectedShipment.recipient.state}{" "}
												{selectedShipment.recipient.zipCode}
											</span>
										</p>
										<p>
											<span className="text-gray-400">Email:</span>{" "}
											<span className="text-gray-300">{selectedShipment.recipient.email}</span>
										</p>
										<p>
											<span className="text-gray-400">Phone:</span>{" "}
											<span className="text-gray-300">{selectedShipment.recipient.phone}</span>
										</p>
									</div>
								</div>

								{/* Package Info */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-gray-100">Package Information</h3>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-gray-400">Weight:</span>{" "}
											<span className="text-gray-300">{selectedShipment.package.weight} lbs</span>
										</p>
										<p>
											<span className="text-gray-400">Dimensions:</span>{" "}
											<span className="text-gray-300">
												{selectedShipment.package.dimensions?.length}x
												{selectedShipment.package.dimensions?.width}x
												{selectedShipment.package.dimensions?.height} in
											</span>
										</p>
										<p>
											<span className="text-gray-400">Description:</span>{" "}
											<span className="text-gray-300">{selectedShipment.package.description}</span>
										</p>
										<p>
											<span className="text-gray-400">Declared Value:</span>{" "}
											<span className="text-gray-300">${selectedShipment.package.declaredValue}</span>
										</p>
										<p>
											<span className="text-gray-400">Fragile:</span>{" "}
											<span className="text-gray-300">{selectedShipment.package.fragile ? "Yes" : "No"}</span>
										</p>
										<p>
											<span className="text-gray-400">Hazardous:</span>{" "}
											<span className="text-gray-300">
												{selectedShipment.package.hazardous ? "Yes" : "No"}
											</span>
										</p>
									</div>
								</div>

								{/* Service Info */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-gray-100">Service Information</h3>
									<div className="space-y-2 text-sm">
										<p>
											<span className="text-gray-400">Service Type:</span>{" "}
											<span className="text-gray-300 capitalize">{selectedShipment.service.type}</span>
										</p>
										<p>
											<span className="text-gray-400">Cost:</span>{" "}
											<span className="text-gray-300">${selectedShipment.service.cost}</span>
										</p>
										<p>
											<span className="text-gray-400">Est. Delivery:</span>{" "}
											<span className="text-gray-300">
												{new Date(selectedShipment.service.estimatedDelivery).toLocaleDateString()}
											</span>
										</p>
										<p>
											<span className="text-gray-400">Current Status:</span>
											<span
												className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(
													selectedShipment.status,
												)}`}
											>
												{selectedShipment.status.replace("-", " ")}
											</span>
										</p>
									</div>
								</div>

								{/* Status Update Section */}
								<div className="mt-6 pt-6 border-t border-gray-600 dark:border-gray-700">
									<h3 className="text-lg font-semibold text-gray-100 mb-4">Update Status</h3>
									<div className="space-y-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-2">New Status</label>
												<select
													value={statusUpdate.status}
													onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												>
													<option value="pending">Pending</option>
													<option value="picked-up">Picked Up</option>
													<option value="in-transit">In Transit</option>
													<option value="arrived">Arrived</option>
													<option value="out-for-delivery">Out for Delivery</option>
													<option value="delivered">Delivered</option>
													<option value="delayed">Delayed</option>
													<option value="exception">Exception</option>
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-2">
													Current Location
												</label>
												<input
													type="text"
													value={statusUpdate.currentLocation}
													onChange={(e) =>
														setStatusUpdate({ ...statusUpdate, currentLocation: e.target.value })
													}
													placeholder="Enter current location"
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
											<textarea
												value={statusUpdate.notes}
												onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
												placeholder="Add notes about this status update..."
												rows={3}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div className="flex justify-end">
											<button
												onClick={handleStatusUpdate}
												disabled={updatingStatus || !statusUpdate.status || !statusUpdate.currentLocation}
												className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
											>
												{updatingStatus ? (
													<div className="flex items-center gap-2">
														<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
														Updating...
													</div>
												) : (
													"Update Status"
												)}
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* Tracking Events */}
							{selectedShipment.trackingEvents && selectedShipment.trackingEvents.length > 0 && (
								<div className="mt-6">
									<h3 className="text-lg font-semibold text-gray-100 mb-4">Tracking History</h3>
									<div className="space-y-3 max-h-60 overflow-y-auto">
										{selectedShipment.trackingEvents
											.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
											.map((event, index) => (
												<div key={index} className="flex items-start space-x-3">
													<div
														className={`w-3 h-3 rounded-full ${getStatusColor(
															event.status,
														)} mt-2 flex-shrink-0`}
													></div>
													<div className="flex-1">
														<div className="flex justify-between items-start">
															<div>
																<h4 className="font-semibold text-gray-100 capitalize">
																	{event.status.replace("-", " ")}
																</h4>
																<p className="text-gray-300 text-sm">{event.description}</p>
																<p className="text-gray-400 text-sm">{event.location}</p>
															</div>
															<span className="text-sm text-gray-400">
																{new Date(event.timestamp).toLocaleString()}
															</span>
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Create/Edit Modal */}
			{(showCreateModal || showEditModal) && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-gray-800 dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-gray-100">
									{showCreateModal ? "Create New Shipment" : "Edit Shipment"}
								</h2>
								<button onClick={closeModal} className="text-gray-400 hover:text-gray-300">
									<X className="h-6 w-6" />
								</button>
							</div>

							<form
								onSubmit={showCreateModal ? handleCreateShipment : handleUpdateShipment}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{/* Sender Information */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-100">Sender Information</h3>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
												<input
													type="text"
													required
													value={newShipment.sender.name}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															sender: { ...prev.sender, name: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
												<input
													type="email"
													required
													value={newShipment.sender.email}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															sender: { ...prev.sender, email: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div className="sm:col-span-2">
												<label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
												<input
													type="text"
													required
													value={newShipment.sender.address}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															sender: { ...prev.sender, address: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">City</label>
												<input
													type="text"
													required
													value={newShipment.sender.city}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															sender: { ...prev.sender, city: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">State</label>
												<input
													type="text"
													required
													value={newShipment.sender.state}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															sender: { ...prev.sender, state: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
										</div>
									</div>

									{/* Recipient Information */}
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-gray-100">Recipient Information</h3>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
												<input
													type="text"
													required
													value={newShipment.recipient.name}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															recipient: { ...prev.recipient, name: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
												<input
													type="email"
													required
													value={newShipment.recipient.email}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															recipient: { ...prev.recipient, email: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div className="sm:col-span-2">
												<label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
												<input
													type="text"
													required
													value={newShipment.recipient.address}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															recipient: { ...prev.recipient, address: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">City</label>
												<input
													type="text"
													required
													value={newShipment.recipient.city}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															recipient: { ...prev.recipient, city: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-1">State</label>
												<input
													type="text"
													required
													value={newShipment.recipient.state}
													onChange={(e) =>
														setNewShipment((prev) => ({
															...prev,
															recipient: { ...prev.recipient, state: e.target.value },
														}))
													}
													className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Package Information */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-gray-100">Package Information</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Weight (lbs)</label>
											<input
												type="number"
												required
												value={newShipment.package.weight}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: { ...prev.package, weight: parseFloat(e.target.value) },
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Length (in)</label>
											<input
												type="number"
												required
												step="0.1"
												value={newShipment.package.dimensions.length}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: {
															...prev.package,
															dimensions: {
																...prev.package.dimensions,
																length: parseFloat(e.target.value) || 0,
															},
														},
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Width (in)</label>
											<input
												type="number"
												required
												step="0.1"
												value={newShipment.package.dimensions.width}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: {
															...prev.package,
															dimensions: {
																...prev.package.dimensions,
																width: parseFloat(e.target.value) || 0,
															},
														},
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Height (in)</label>
											<input
												type="number"
												required
												step="0.1"
												value={newShipment.package.dimensions.height}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: {
															...prev.package,
															dimensions: {
																...prev.package.dimensions,
																height: parseFloat(e.target.value) || 0,
															},
														},
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">
												Declared Value ($)
											</label>
											<input
												type="number"
												required
												step="0.01"
												value={newShipment.package.declaredValue}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: { ...prev.package, declaredValue: parseFloat(e.target.value) || 0 },
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Service Type</label>
											<select
												value={newShipment.service.type}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														service: { ...prev.service, type: e.target.value },
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											>
												<option value="standard">Standard</option>
												<option value="express">Express</option>
												<option value="overnight">Overnight</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">Service Cost ($)</label>
											<input
												type="number"
												required
												step="0.01"
												value={newShipment.service.cost}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														service: { ...prev.service, cost: parseFloat(e.target.value) || 0 },
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-300 mb-1">
												Estimated Delivery
											</label>
											<input
												type="datetime-local"
												required
												value={
													typeof newShipment.service.estimatedDelivery === "string"
														? new Date(newShipment.service.estimatedDelivery).toISOString().slice(0, 16)
														: new Date().toISOString().slice(0, 16)
												}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														service: { ...prev.service, estimatedDelivery: e.target.value },
													}))
												}
												className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="flex items-center">
											<input
												type="checkbox"
												id="fragile"
												checked={newShipment.package.fragile}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: { ...prev.package, fragile: e.target.checked },
													}))
												}
												className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
											/>
											<label htmlFor="fragile" className="ml-2 text-sm font-medium text-gray-300">
												Fragile Item
											</label>
										</div>
										<div className="flex items-center">
											<input
												type="checkbox"
												id="hazardous"
												checked={newShipment.package.hazardous}
												onChange={(e) =>
													setNewShipment((prev) => ({
														...prev,
														package: { ...prev.package, hazardous: e.target.checked },
													}))
												}
												className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
											/>
											<label htmlFor="hazardous" className="ml-2 text-sm font-medium text-gray-300">
												Hazardous Material
											</label>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
										<textarea
											required
											rows={3}
											value={newShipment.package.description}
											onChange={(e) =>
												setNewShipment((prev) => ({
													...prev,
													package: { ...prev.package, description: e.target.value },
												}))
											}
											className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>

								{/* Status History Section */}
								<div className="mt-6 pt-6 border-t border-gray-600 dark:border-gray-700">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-100">Status History</h3>
										<button
											type="button"
											onClick={addStatusUpdate}
											className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
										>
											<Plus className="w-4 h-4 inline mr-1" />
											Add Status
										</button>
									</div>
									<div className="space-y-4 max-h-80 overflow-y-auto">
										{statusUpdates.map((update, index) => {
											const isIncomplete = (update.status && (!update.location || !update.description)) ||
												(update.location && (!update.status || !update.description)) ||
												(update.description && (!update.status || !update.location));
											
											return (
											<div key={index} className={`p-4 rounded-lg ${isIncomplete ? 'bg-red-900/20 border border-red-500/50' : 'bg-gray-700 dark:bg-gray-800'}`}>
												<div className="flex justify-between items-start mb-3">
													<span className="text-sm font-medium text-gray-300">
														Status Update #{index + 1}
													</span>
													{statusUpdates.length > 1 && (
														<button
															type="button"
															onClick={() => removeStatusUpdate(index)}
															className="text-red-400 hover:text-red-300"
														>
															<Trash2 className="w-4 h-4" />
														</button>
													)}
												</div>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
													<div>
														<label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
														<select
															value={update.status}
															onChange={(e) => updateStatusUpdate(index, "status", e.target.value)}
															className="w-full px-3 py-2 bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
														>
															<option value="">Select Status</option>
															<option value="pending">Pending</option>
															<option value="picked-up">Picked Up</option>
															<option value="in-transit">In Transit</option>
															<option value="arrived">Arrived</option>
															<option value="out-for-delivery">Out for Delivery</option>
															<option value="delivered">Delivered</option>
															<option value="delayed">Delayed</option>
															<option value="exception">Exception</option>
														</select>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-300 mb-1">
															Date & Time
														</label>
														<input
															type="datetime-local"
															value={update.timestamp}
															onChange={(e) => updateStatusUpdate(index, "timestamp", e.target.value)}
															className="w-full px-3 py-2 bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
														<input
															type="text"
															value={update.location}
															onChange={(e) => updateStatusUpdate(index, "location", e.target.value)}
															placeholder="Enter location"
															className="w-full px-3 py-2 bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-300 mb-1">
															Description
														</label>
														<input
															type="text"
															value={update.description}
															onChange={(e) => updateStatusUpdate(index, "description", e.target.value)}
															placeholder="Enter description"
															className="w-full px-3 py-2 bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
														/>
													</div>
												</div>
											</div>
											);
										})}
									</div>
								</div>

								<div className="flex gap-4 pt-4">
									<button
										type="submit"
										disabled={submitting}
										className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
									>
										{submitting ? (
											<div className="flex items-center gap-2">
												<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
												{showCreateModal ? "Creating..." : "Updating..."}
											</div>
										) : showCreateModal ? (
											"Create Shipment"
										) : (
											"Update Shipment"
										)}
									</button>
									<button
										type="button"
										onClick={closeModal}
										disabled={submitting}
										className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

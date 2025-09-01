import { useState, useEffect } from "react";
import { Check, X, Clock, FileText } from "lucide-react";

type KycSubmission = {
	_id: string;
	name: string;
	email: string;
	documentFront?: string;
	documentBack?: string;
	documentNumber?: string;
	documentExpDate?: string;
	status: boolean;
	createdAt?: string;
};

export default function KycApproval() {
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const [kycSubmissions, setKycSubmissions] = useState<KycSubmission[] | null>(null);
	const [filteredSubmissions, setFilteredSubmissions] = useState<KycSubmission[] | null>(null);
	const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
	const [filterType, setFilterType] = useState<string>("all");
	const [viewingDocument, setViewingDocument] = useState<{
		type: string;
		url: string;
	} | null>(null);
	const [fetching, setFetching] = useState<boolean>(true);

	// Simulate API fetch
	useEffect(() => {
		const fetchKycSubmissions = async () => {
			try {
				// Simulate API delay
				const res = await fetch(`${url}/kycs`);
				const data = await res.json();
				setKycSubmissions(data || []);
				setFilteredSubmissions(data || []);
			} catch (error) {
				console.error("Error fetching KYC submissions:", error);
			} finally {
				setFetching(false);
			}
		};

		fetchKycSubmissions();
	}, []);

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedSubmissions(filteredSubmissions?.map((submission) => submission._id) || []);
		} else {
			setSelectedSubmissions([]);
		}
	};

	const handleSelectSubmission = (submissionId: string) => {
		setSelectedSubmissions((prev) => {
			if (prev.includes(submissionId)) {
				return prev.filter((id) => id !== submissionId);
			}
			return [...prev, submissionId];
		});
	};

	const handleFilter = (type: string) => {
		setFilterType(type);
		let filtered = kycSubmissions;

		switch (type) {
			case "pending":
				filtered = kycSubmissions?.filter((submission) => !submission.status) || [];
				break;
			case "approved":
				filtered = kycSubmissions?.filter((submission) => submission.status) || [];
				break;
			case "incomplete":
				filtered =
					kycSubmissions?.filter(
						(submission) =>
							!submission.documentFront || !submission.documentBack || !submission.documentNumber,
					) || [];
				break;
			default:
				filtered = kycSubmissions || [];
		}
		setFilteredSubmissions(filtered);
		setSelectedSubmissions([]);
	};

	const handleApproveSubmission = async (submissionId: string, email: string, kycStatus: boolean) => {
		try {
			// API call to approve the KYC
			const res = await fetch(`${url}/kycs`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
          kyc: submissionId,
          kycStatus
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Failed to approve submission.");
			}

			// Optionally, you can get the response
			const data = await res.json();
			console.log("KYC approved successfully:", data);

			// Update state locally
			setKycSubmissions(
				(prev) =>
					prev?.map((submission) =>
						submission._id === submissionId ? { ...submission, status: true } : submission,
					) || null,
			);

			setFilteredSubmissions(
				(prev) =>
					prev?.map((submission) =>
						submission._id === submissionId ? { ...submission, status: true } : submission,
					) || null,
			);
		} catch (error) {
			console.error("Error approving submission:", error);
			// Optionally, show a toast notification for the error
		}
	};

	const handleBulkApprove = async () => {
		try {
			await Promise.all(
				selectedSubmissions.map(async (submissionId) => {
					// Find the submission to get its email
					const submission = kycSubmissions?.find((s) => s._id === submissionId);
					if (!submission) return;

					const res = await fetch(`${url}/kycs`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: submission.email,
							kyc: submissionId,
						}),
					});

					if (!res.ok) {
						const errorData = await res.json();
						console.error(`Error approving submission ${submissionId}:`, errorData.message);
					}
				}),
			);

			// Update state locally after successful API calls
			setKycSubmissions(
				(prev) =>
					prev?.map((submission) =>
						selectedSubmissions.includes(submission._id) ? { ...submission, status: true } : submission,
					) || null,
			);

			setFilteredSubmissions(
				(prev) =>
					prev?.map((submission) =>
						selectedSubmissions.includes(submission._id) ? { ...submission, status: true } : submission,
					) || null,
			);

			// Clear selection after successful bulk update
			setSelectedSubmissions([]);
		} catch (error) {
			console.error("Error bulk approving submissions:", error);
		}
	};

	const formatDate = (dateString?: string) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString();
	};

	if (fetching) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<div className="relative overflow-x-auto text-nowrap">
			{/* Filter Buttons */}
			<div className="w-fit flex gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
				<button
					onClick={() => handleFilter("all")}
					className={`px-4 py-2 text-xs font-medium rounded ${
						filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-white"
					}`}
				>
					All Submissions
				</button>
				<button
					onClick={() => handleFilter("pending")}
					className={`px-4 py-2 text-xs font-medium rounded ${
						filterType === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-white"
					}`}
				>
					Pending Approval
				</button>
				<button
					onClick={() => handleFilter("approved")}
					className={`px-4 py-2 text-xs font-medium rounded ${
						filterType === "approved" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-white"
					}`}
				>
					Approved
				</button>
				<button
					onClick={() => handleFilter("incomplete")}
					className={`px-4 py-2 text-xs font-medium rounded ${
						filterType === "incomplete" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-white"
					}`}
				>
					Incomplete
				</button>
			</div>

			{/* KYC Submissions Table */}
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							<input
								type="checkbox"
								checked={
									selectedSubmissions.length === filteredSubmissions?.length &&
									filteredSubmissions?.length > 0
								}
								onChange={handleSelectAll}
								className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
							/>
						</th>
						<th scope="col" className="px-6 py-3">
							User Details
						</th>
						<th scope="col" className="px-6 py-3">
							Document Info
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Submitted
						</th>
						<th scope="col" className="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredSubmissions &&
						filteredSubmissions.map((submission) => (
							<tr
								key={submission._id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="px-6 py-4">
									<input
										type="checkbox"
										checked={selectedSubmissions.includes(submission._id)}
										onChange={() => handleSelectSubmission(submission._id)}
										className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
									/>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm font-semibold text-gray-900 dark:text-white">{submission.name}</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">{submission.email}</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm">
										<div>Doc #: {submission.documentNumber || "N/A"}</div>
										<div>Expires: {formatDate(submission.documentExpDate)}</div>
										<div className="flex gap-2 mt-1">
											{submission.documentFront && (
												<button
													onClick={() =>
														setViewingDocument({
															type: "Front",
															url: submission.documentFront!,
														})
													}
													className="text-xs text-blue-600 hover:underline flex items-center gap-1"
												>
													<FileText size={12} />
													Front
												</button>
											)}
											{submission.documentBack && (
												<button
													onClick={() =>
														setViewingDocument({
															type: "Back",
															url: submission.documentBack!,
														})
													}
													className="text-xs text-blue-600 hover:underline flex items-center gap-1"
												>
													<FileText size={12} />
													Back
												</button>
											)}
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span
										className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
											submission.status
												? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
												: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
										}`}
									>
										{submission.status ? (
											<>
												<Check size={12} />
												Approved
											</>
										) : (
											<>
												<Clock size={12} />
												Pending
											</>
										)}
									</span>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-500 dark:text-gray-400">
										{formatDate(submission.createdAt)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex gap-2">
										{!submission.status && (
											<>
												<button
													onClick={() => handleApproveSubmission(submission._id, submission.email, true)}
													className="p-1 text-green-600 hover:bg-green-100 rounded"
													title="Approve"
												>
													<Check size={16} />
												</button>
												<button
													onClick={() => handleApproveSubmission(submission._id, submission.email, false)}
													className="p-1 text-red-600 hover:bg-red-100 rounded"
													title="Reject"
												>
													<X size={16} />
												</button>
											</>
										)}
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>

			{/* Empty State */}
			{filteredSubmissions && filteredSubmissions.length === 0 && (
				<div className="text-center py-12">
					<FileText size={48} className="mx-auto text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No KYC submissions found</h3>
					<p className="text-gray-500 dark:text-gray-400">
						{filterType === "all"
							? "No KYC submissions have been made yet."
							: `No ${filterType} KYC submissions found.`}
					</p>
				</div>
			)}

			{/* Bulk Actions */}
			{selectedSubmissions.length > 0 && (
				<div className="fixed bottom-4 right-7.5 flex gap-2">
					<button
						onClick={handleBulkApprove}
						className="px-4 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
					>
						<Check size={16} />
						Approve Selected ({selectedSubmissions.length})
					</button>
					<button
						onClick={() => alert("Bulk reject functionality")}
						className="px-4 py-2 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
					>
						<X size={16} />
						Reject Selected ({selectedSubmissions.length})
					</button>
				</div>
			)}

			{/* Document Viewer Modal */}
			{viewingDocument && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Document - {viewingDocument.type}
							</h3>
							<button
								onClick={() => setViewingDocument(null)}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								<X size={24} />
							</button>
						</div>
						<div className="">
							<div className="bg-gray-100 dark:bg-gray-700 p-5">
								<img src={viewingDocument.url} alt={`Document${viewingDocument.type}`} className="w-full" />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

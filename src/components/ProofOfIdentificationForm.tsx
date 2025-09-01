import { useState, useRef, ChangeEvent, FormEvent, JSX } from "react";
import { Calendar, Camera, Upload } from "lucide-react";
import { contextData } from "@/context/AuthContext";
import Alert from "./UI/Alert";

// Define types
type DocumentType = "id" | "passport" | "driver";
type AlertType = "danger" | "success";

interface FormData {
	documentType: DocumentType;
	documentNumber: string;
	expiryDate: string;
	frontImage: File | null;
	backImage: File | null;
}

interface AlertState {
	type: AlertType;
	message: string;
}

interface FormErrors {
	documentNumber?: string;
	expiryDate?: string;
	frontImage?: string;
	backImage?: string;
}

const defaultData: FormData = {
	documentType: "id",
	documentNumber: "",
	expiryDate: "",
	frontImage: null,
	backImage: null,
};

export default function ProofOfIdentificationForm({ onSubmit }: { onSubmit: () => void }): JSX.Element {
	const [formData, setFormData] = useState<FormData>(defaultData);

	const [loading, setLoading] = useState<boolean>(false);
	const [alert, setAlert] = useState<AlertState | null>(null);
	const [errors, setErrors] = useState<FormErrors>({});

	const frontImageRef = useRef<HTMLInputElement | null>(null);
	const backImageRef = useRef<HTMLInputElement | null>(null);
	const { user } = contextData();

	const handleDocumentTypeChange = (type: DocumentType): void => {
		setFormData({
			...formData,
			documentType: type,
			frontImage: null,
			backImage: null,
		});

		// Reset file inputs
		if (frontImageRef.current) frontImageRef.current.value = "";
		if (backImageRef.current) backImageRef.current.value = "";
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Clear error for this field
		if (errors[name as keyof FormErrors]) {
			setErrors({ ...errors, [name]: undefined });
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>, side: "frontImage" | "backImage"): void => {
		if (e.target.files && e.target.files.length > 0) {
			setFormData({ ...formData, [side]: e.target.files[0] });

			// Clear error for this field
			if (errors[side]) {
				setErrors({ ...errors, [side]: undefined });
			}
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		const MAX_FILE_SIZE_MB = 5;
		const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

		if (!formData.documentNumber.trim()) {
			newErrors.documentNumber = "Document number is required";
		}

		if (!formData.expiryDate) {
			newErrors.expiryDate = "Expiry date is required";
		}

		if (!formData.frontImage) {
			newErrors.frontImage = "Front side image is required";
		} else if (formData.frontImage.size > MAX_FILE_SIZE) {
			newErrors.frontImage = `Front image must be less than ${MAX_FILE_SIZE_MB}MB`;
		}

		if (!formData.backImage) {
			newErrors.backImage = "Back side image is required";
		} else if (formData.backImage.size > MAX_FILE_SIZE) {
			newErrors.backImage = `Back image must be less than ${MAX_FILE_SIZE_MB}MB`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Clear any existing alert
		setAlert(null);

		if (!validateForm()) {
			setAlert({
				type: "danger",
				message: "Please fill in all required fields correctly.",
			});
			return;
		}

		setLoading(true);

		try {
			// Create form data for file upload
			const submitData = new FormData();
			submitData.append("documentType", formData.documentType);
			submitData.append("documentNumber", formData.documentNumber);
			submitData.append("documentExpDate", formData.expiryDate);
			submitData.append("email", user.email);
			submitData.append("name", user.username);

			if (formData.frontImage) {
				submitData.append("documentFront", formData.frontImage);
			}

			if (formData.backImage) {
				submitData.append("documentBack", formData.backImage);
			}

			// Get the server URL and construct the endpoint
			const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
			const endpoint = `${url}/kycs`;

			// In a real implementation, you would use:
			const response = await fetch(endpoint, {
				method: "POST",
				body: submitData,
			});

			const resData = await response.json();

			if (!response.ok) {
				throw new Error(resData.message);
			}

			// Success message
			setAlert({
				type: "success",
				message:
					"Your identification has been submitted successfully. We will verify your documents shortly.",
			});

			// Reset form
      setFormData(defaultData);

			if (frontImageRef.current) frontImageRef.current.value = "";
			if (backImageRef.current) backImageRef.current.value = "";
		} catch (error: any) {
			setAlert({
				type: "danger",
				message: error.message,
			});
			console.error("Error submitting form:", error);
		} finally {
      setLoading(false);
      onSubmit(); // Call the onSubmit prop to notify parent component
		}
	};

	return (
		<div className="p-6 mt-10 rounded-lg max-w-5xl mx-auto dark:bg-gray-950 dark:text-white bg-white text-gray-900">
			<div className="flex justify-between items-start mb-6">
				<h2 className="text-2xl font-semibold dark:text-white text-gray-900">Proof of Identification</h2>
			</div>

			<div className="mb-6 w-full text-xs">
				<p className="mb-2 dark:text-gray-300 text-gray-700 max-w-[600px]">
					To verify your identification, please upload one of the following proof of identification documents:
					ID Card, passport or driver's license. All sides containing your personal details are required.
				</p>
				<p className="dark:text-gray-300 text-gray-700 max-w-[620px]">
					The documents must include: full name, ID number, photograph, date of birth, place of birth,
					nationality
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				{/* Document Type Selection */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					{(["id", "passport", "driver"] as const).map((type) => (
						<button
							key={type}
							type="button"
							className={`p-3 text-center rounded-md transition-all font-semibold ${
								formData.documentType === type
									? "dark:bg-blue-600 bg-blue-500 text-white"
									: "dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
							onClick={() => handleDocumentTypeChange(type)}
						>
							{type === "id" ? "ID" : type === "passport" ? "Passport" : "Driver's License"}
						</button>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					{/* Front Side Upload */}
					<div>
						<label className="block mb-2 dark:text-gray-300 text-gray-700">Front Side</label>
						<div
							className={`border border-dashed rounded-md p-8 text-center ${
								errors.frontImage
									? "border-red-500"
									: "dark:border-gray-600 dark:text-gray-400 border-gray-300 text-gray-600"
							}`}
						>
							<input
								type="file"
								ref={frontImageRef}
								accept="image/*"
								onChange={(e) => handleFileChange(e, "frontImage")}
								className="hidden"
								id="front-image"
							/>
							<label
								htmlFor="front-image"
								className="flex flex-col items-center justify-center h-32 cursor-pointer"
							>
								<Camera size={32} className="mb-2 dark:text-gray-400 text-gray-500" />
								{formData.frontImage ? (
									<span className="text-blue-400">{formData.frontImage.name}</span>
								) : (
									<div className="flex items-center">
										<Upload size={16} className="mr-1" />
										<span>Upload</span>
									</div>
								)}
							</label>
						</div>
						{errors.frontImage && <p className="mt-1 text-red-500 text-sm">{errors.frontImage}</p>}
					</div>

					{/* Back Side Upload */}
					<div>
						<label className="block mb-2 dark:text-gray-300 text-gray-700">Back Side</label>
						<div
							className={`border border-dashed rounded-md p-8 text-center ${
								errors.backImage
									? "border-red-500"
									: "dark:border-gray-600 dark:text-gray-400 border-gray-300 text-gray-600"
							}`}
						>
							<input
								type="file"
								ref={backImageRef}
								accept="image/*"
								onChange={(e) => handleFileChange(e, "backImage")}
								className="hidden"
								id="back-image"
							/>
							<label
								htmlFor="back-image"
								className="flex flex-col items-center justify-center h-32 cursor-pointer"
							>
								<Camera size={32} className="mb-2 dark:text-gray-400 text-gray-500" />
								{formData.backImage ? (
									<span className="text-blue-400">{formData.backImage.name}</span>
								) : (
									<div className="flex items-center">
										<Upload size={16} className="mr-1" />
										<span>Upload</span>
									</div>
								)}
							</label>
						</div>
						{errors.backImage && <p className="mt-1 text-red-500 text-sm">{errors.backImage}</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Document Number */}
					<div>
						<label htmlFor="document-number" className="block mb-2 dark:text-gray-300 text-gray-700">
							Document Number
						</label>
						<input
							type="text"
							id="document-number"
							name="documentNumber"
							value={formData.documentNumber}
							onChange={handleInputChange}
							className={`w-full border rounded-md py-3 px-4 ${
								errors.documentNumber
									? "border-red-500"
									: "dark:bg-gray-900 dark:border-gray-700 dark:text-white bg-white border-gray-300 text-gray-900"
							}`}
							placeholder="Enter document number"
						/>
						{errors.documentNumber && <p className="mt-1 text-red-500 text-sm">{errors.documentNumber}</p>}
					</div>

					{/* Expiry Date */}
					<div className="relative">
						<label htmlFor="expiry-date" className="block mb-2 dark:text-gray-300 text-gray-700">
							Expiry Date
						</label>
						<div className="relative">
							<input
								type="date"
								id="expiry-date"
								name="expiryDate"
								value={formData.expiryDate}
								onChange={handleInputChange}
								className={`w-full border rounded-md py-3 px-4 pr-10
              [&::-webkit-calendar-picker-indicator]:opacity-0 
              [&::-webkit-calendar-picker-indicator]:absolute 
              [&::-webkit-calendar-picker-indicator]:right-0 
              [&::-webkit-calendar-picker-indicator]:w-10 
              [&::-webkit-calendar-picker-indicator]:h-full 
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
              ${
								errors.expiryDate
									? "border-red-500"
									: "dark:bg-gray-900 dark:border-gray-700 dark:text-white bg-white border-gray-300 text-gray-900"
							}`}
							/>
							<Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
						</div>
						{errors.expiryDate && <p className="mt-1 text-red-500 text-sm">{errors.expiryDate}</p>}
					</div>
				</div>

				{alert && <Alert type={alert.type} message={alert.message} />}

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className="dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-500 hover:bg-blue-600 text-white py-2 font-semibold px-6 rounded-md transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto md:min-w-64"
					>
						{loading ? "Submitting..." : "Submit Proof of Identification"}
					</button>
				</div>
			</form>
		</div>
	);
}

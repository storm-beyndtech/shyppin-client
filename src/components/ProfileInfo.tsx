import { useEffect, useState } from "react";
import { User, Upload, RefreshCw, AlertCircle } from "lucide-react";
import { contextData } from "@/context/AuthContext";

interface FormData {
	profileImage: File | null;
	email: string;
	firstName: string;
	lastName: string;
	state: string;
	phone: string;
	city: string;
	zipCode: string;
	streetAddress: string;
}

interface ValidationErrors {
	[key: string]: string;
}

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

// Mock API functions - replace with your actual API calls
const fetchProfile = async (user: any) => {
	// let profileData: FormData;
	try {
		const res = await fetch(`${url}/users/${user._id}`);
		const resData = await res.json();

		if (!res.ok) {
			throw new Error(resData.message || "Failed to update profile");
		}

		return resData.user;
	} catch (error) {
		throw error;
	}
};

const updateProfile = async (data: FormData): Promise<void> => {
	try {
		const response = await fetch(`${url}/users/update-profile`, {
			method: "PUT",
			body: data as any,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to update profile");
		}
	} catch (error) {
		throw error;
	}
};

export default function ProfileInfo() {
	const { user } = contextData();
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [successMessage, setSuccessMessage] = useState("");
	const [formData, setFormData] = useState<FormData>({
		email: "",
		firstName: "",
		lastName: "",
		state: "",
		phone: "",
		city: "",
		zipCode: "",
		profileImage: null,
		streetAddress: "",
	});

	useEffect(() => {
		const loadProfile = async () => {
			setLoading(true);
			try {
				const data = await fetchProfile(user);
				setFormData(data);
			} catch (error) {
				setErrors({ general: "Failed to load profile data" });
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, []);

	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};

		// Only validate if phone is provided and not empty
		if (formData.phone && formData.phone.trim()) {
			const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
			if (!phoneRegex.test(formData.phone.trim())) {
				newErrors.phone = "Please enter a valid phone number";
			}
		}

		// Only validate zipCode format if it's provided
		if (formData.zipCode && formData.zipCode.trim() && formData.zipCode.length < 4) {
			newErrors.zipCode = "Please enter a valid zip code (at least 4 characters)";
		}

		// Only validate image size if an image is selected
		if (formData.profileImage && formData.profileImage.size > 5 * 1024 * 1024) {
			newErrors.profileImage = "Image size must be less than 5MB";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			// Validate file type
			if (!file.type.startsWith("image/")) {
				setErrors((prev) => ({
					...prev,
					profileImage: "Please select a valid image file",
				}));
				return;
			}

			// Validate file size (5MB)
			if (file.size > 5 * 1024 * 1024) {
				setErrors((prev) => ({
					...prev,
					profileImage: "Image size must be less than 5MB",
				}));
				return;
			}

			setFormData((prev) => ({ ...prev, profileImage: file }));

			// Clear image error if it exists
			if (errors.profileImage) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors.profileImage;
					return newErrors;
				});
			}
		}
	};

	const handleSubmit = async () => {
		setSuccessMessage("");
		setErrors({});

		if (!validateForm()) {
			return;
		}

		try {
			setSubmitting(true);
			const formPayload = new FormData();

			// Append all fields (including empty ones - let backend handle)
			formPayload.append("firstName", formData.firstName || "");
			formPayload.append("lastName", formData.lastName || "");
			formPayload.append("state", formData.state || "");
			formPayload.append("phone", formData.phone || "");
			formPayload.append("city", formData.city || "");
			formPayload.append("zipCode", formData.zipCode || "");
			formPayload.append("streetAddress", formData.streetAddress || "");
			formPayload.append("email", user.email);

			console.log(formData.profileImage);
			// Append the image only if it exists
			if (formData.profileImage) {
				formPayload.append("profileImage", formData.profileImage);
			}

			// Call your API
			await updateProfile(formPayload as any);

			setSuccessMessage("Profile updated successfully");
		} catch (error: any) {
			setErrors({ general: error.message });
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Update Profile</h2>

			{/* Success Message */}
			{successMessage && (
				<div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-xl">
					<p className="text-green-800 dark:text-green-300 text-sm">{successMessage}</p>
				</div>
			)}

			{/* General Error */}
			{errors.general && (
				<div className="mb-4 p-4 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-700 rounded-xl">
					<p className="text-red-800 dark:text-red-500 font-semibold text-sm flex items-center">
						<AlertCircle size={16} className="mr-2 flex-shrink-0 text-4xl" />
						{errors.general}
					</p>
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Image Section */}
				<div className="lg:col-span-1">
					<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
						<div className="w-full h-50 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
							{formData.profileImage instanceof File ? (
								<img
									src={URL.createObjectURL(formData.profileImage)}
									alt="Profile Preview"
									className="w-full h-full object-cover"
								/>
							) : formData.profileImage ? (
								<img
									src={formData.profileImage}
									alt="Profile from URL"
									className="w-full h-full object-cover"
								/>
							) : (
								<User size={80} className="text-gray-400 dark:text-gray-500" />
							)}
						</div>

						{/* User Info Display */}
						<div className="space-y-3 text-sm">
							<div className="text-gray-600 dark:text-gray-400">
								<p className="font-medium">{user.username}</p>
								<p className="text-xs">Username</p>
							</div>
							<div className="text-gray-600 dark:text-gray-400">
								<p className="font-medium">{user.email}</p>
								<p className="text-xs">Email</p>
							</div>
							<div className="text-gray-600 dark:text-gray-400">
								<p className="font-medium">{formData.phone || user.phone || "Not provided"}</p>
								<p className="text-xs">Mobile</p>
							</div>
							<div className="text-gray-600 dark:text-gray-400">
								<p className="font-medium">{user.country}</p>
								<p className="text-xs">Country</p>
							</div>
							<div className="text-gray-600 dark:text-gray-400">
								<p className="font-medium">
									{formData.streetAddress || user.streetAddress || "Not provided"}
								</p>
								<p className="text-xs">Address</p>
							</div>
						</div>
					</div>
				</div>

				{/* Form Fields */}
				<div className="lg:col-span-2">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.firstName
										? "border-red-400 dark:border-red-500"
										: "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.firstName && (
								<p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.firstName}</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.lastName
										? "border-red-400 dark:border-red-500"
										: "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.lastName && (
								<p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.lastName}</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
								Phone Number
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								placeholder="e.g., +1234567890"
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.phone ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.phone && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.phone}</p>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">State</label>
							<input
								type="text"
								name="state"
								value={formData.state}
								onChange={handleInputChange}
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.state ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.state && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.state}</p>}
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">City</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleInputChange}
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.city ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.city && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.city}</p>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
								Zip Code
							</label>
							<input
								type="text"
								name="zipCode"
								value={formData.zipCode}
								onChange={handleInputChange}
								placeholder="12345 or 12345-6789"
								className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
									errors.zipCode
										? "border-red-400 dark:border-red-500"
										: "border-gray-300 dark:border-gray-700"
								}`}
							/>
							{errors.zipCode && (
								<p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.zipCode}</p>
							)}
						</div>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
							Street Address
						</label>
						<input
							type="text"
							name="streetAddress"
							value={formData.streetAddress}
							onChange={handleInputChange}
							className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white ${
								errors.streetAddress
									? "border-red-400 dark:border-red-500"
									: "border-gray-300 dark:border-gray-700"
							}`}
						/>
						{errors.streetAddress && (
							<p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.streetAddress}</p>
						)}
					</div>

					{/* Image Upload */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
							Profile Image
						</label>
						<div className="flex flex-col sm:flex-row sm:items-center gap-3">
							<button
								type="button"
								className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl flex items-center justify-center sm:justify-start"
								onClick={() => document.getElementById("profileImage")?.click()}
							>
								<Upload size={16} className="mr-2" /> Choose File
							</button>
							<input
								type="file"
								id="profileImage"
								className="hidden"
								accept="image/jpeg,image/png,image/jpg,image/gif"
								onChange={handleImageChange}
							/>
							<span className="text-gray-600 dark:text-gray-400 text-sm">
								{formData.profileImage ? formData.profileImage.name : "No file chosen"}
							</span>
						</div>
						{errors.profileImage && (
							<p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.profileImage}</p>
						)}
						<p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
							Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
						</p>
					</div>

					{/* Submit Button */}
					<div className="mt-8">
						<button
							onClick={handleSubmit}
							disabled={submitting}
							className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center"
						>
							{submitting ? (
								<>
									<RefreshCw size={18} className="mr-2 animate-spin" /> Updating...
								</>
							) : (
								"Update Profile"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

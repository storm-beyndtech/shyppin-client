import { User, Lock, Eye, EyeOff, ArrowLeft, Mail, Globe, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import cryptoGlass from "../../assets/Futuristic_Glass_Cube.png";
import { countries } from "@/lib/countries";
import { motion } from "framer-motion";
import { sendRequest } from "@/lib/sendRequest";
import { contextData } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Types
interface Country {
	name: string;
	code: string;
}

interface FormData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
}

interface ValidationErrors {
	firstName?: string;
	lastName?: string;
	username?: string;
	email?: string;
	country?: string;
	phone?: string;
	password?: string;
	confirmPassword?: string;
	agreeToTerms?: string;
}

interface ApiResponse {
	country_code?: string;
}

const Signup = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
	const [countrySearch, setCountrySearch] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitMessage, setSubmitMessage] = useState<string>("");
	const [errors, setErrors] = useState<ValidationErrors>({});
	const { login } = contextData();
	const navigate = useNavigate();
	const emptyFormData: FormData = {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	};
	// Form data state
	const [formData, setFormData] = useState<FormData>(emptyFormData);

	// Auto-detect user's country using ipapi.co (free service)
	useEffect(() => {
		const detectCountry = async (): Promise<void> => {
			try {
				const response = await fetch("https://ipapi.co/json/");
				const data: ApiResponse = await response.json();

				if (data.country_code) {
					const detectedCountry = countries.find(
						(country: Country) => country.code === data.country_code!.toUpperCase(),
					);
					if (detectedCountry) {
						setSelectedCountry(detectedCountry.name);
					}
				}
			} catch (error) {
				console.log("Could not detect country:", error);
				// Fallback: try to detect from timezone
				try {
					const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
					if (timezone.includes("America/New_York") || timezone.includes("America/Chicago")) {
						setSelectedCountry("United States");
					} else if (timezone.includes("Europe/London")) {
						setSelectedCountry("United Kingdom");
					} else if (timezone.includes("Europe/Berlin")) {
						setSelectedCountry("Germany");
					} else if (timezone.includes("Asia/Tokyo")) {
						setSelectedCountry("Japan");
					}
				} catch (timezoneError) {
					console.log("Timezone detection also failed");
				}
			}
		};

		detectCountry();
	}, []);

	const handleCountrySelect = (country: Country): void => {
		setSelectedCountry(country.name);
		setCountrySearch("");
		setIsCountryDropdownOpen(false);
		// Clear country error when selected
		if (errors.country) {
			setErrors((prev) => ({ ...prev, country: undefined }));
		}
	};

	const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const validateForm = (): ValidationErrors => {
		const newErrors: ValidationErrors = {};

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		} else if (formData.firstName.length < 2) {
			newErrors.firstName = "First name must be at least 2 characters";
		} else if (!/^[a-zA-Z\s'.-]+$/.test(formData.firstName)) {
			newErrors.firstName = "First name can only contain letters, spaces, apostrophes, and hyphens";
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		} else if (formData.lastName.length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters";
		} else if (!/^[a-zA-Z\s'.-]+$/.test(formData.lastName)) {
			newErrors.lastName = "Last name can only contain letters, spaces, apostrophes, and hyphens";
		}

		// Username validation
		if (!formData.username.trim()) {
			newErrors.username = "Username is required";
		} else if (formData.username.length < 3) {
			newErrors.username = "Username must be at least 3 characters";
		} else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
			newErrors.username = "Username can only contain letters, numbers, and underscores";
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Country validation
		if (!selectedCountry.trim()) {
			newErrors.country = "Please select your country";
		}

		// Phone validation
		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (!/^[\+]?[\d\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ""))) {
			newErrors.phone = "Please enter a valid phone number";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
			newErrors.password = "Password must contain uppercase, lowercase, and number";
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		// Terms validation
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = "You must agree to the terms";
		}

		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		// Validate form
		const newErrors = validateForm();
		setErrors(newErrors);

		// If there are errors, don't submit
		if (Object.keys(newErrors).length > 0) {
			setSubmitMessage("Please fix the errors above");
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const data = await sendRequest("/users/signup", "POST", {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				username: formData.username,
				phone: formData.phone,
				password: formData.password,
        country: selectedCountry,
        referrer: localStorage.getItem("referrer") || "",
			});
			setSubmitMessage("Account created successfully! Welcome aboard! 🎉");

			setTimeout(() => {
				login(data.user);
				navigate("/kyc");
			}, 2000);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			setSubmitMessage(`Error: ${errorMessage}. Please try again.`);
		} finally {
			setIsSubmitting(false);
			setFormData(emptyFormData);
			setSelectedCountry("");
		}
	};

	const getInputClassName = (fieldName: keyof ValidationErrors): string => {
		return `w-full pl-10 pr-4 py-3 rounded-2xl border bg-white text-sm focus:outline-none focus:ring-2 ${
			errors[fieldName] ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
		}`;
	};

	const getPasswordInputClassName = (fieldName: keyof ValidationErrors): string => {
		return `w-full pl-10 pr-10 py-3 rounded-2xl border bg-white text-sm focus:outline-none focus:ring-2 ${
			errors[fieldName] ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
		}`;
	};

	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4 sm:px-6">
			{/* Back Arrow */}
			<button
				onClick={() => window.history.back()}
				className="flex items-center absolute top-6 left-4 sm:top-8 sm:left-8 text-black hover:text-blue-800 text-sm sm:text-base"
			>
				<ArrowLeft size={18} aria-label="Back arrow" />
				<span className="ml-2">Back</span>
			</button>

			{/* Signup Card */}
			<div className="w-full max-w-lg bg-white p-6 sm:p-8">
				<h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
					Create your account
				</h2>

				{/* Submit Message */}
				{submitMessage && (
					<div
						className={`mb-4 p-3 rounded-lg text-sm text-center ${
							submitMessage.includes("successfully")
								? "bg-green-100 text-green-700 border border-green-200"
								: "bg-red-100 text-red-700 border border-red-200"
						}`}
					>
						{submitMessage}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* First Name & Last Name Row */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
								First Name
							</label>
							<div className="relative">
								<User
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type="text"
									id="firstName"
									placeholder="Enter your first name"
									value={formData.firstName}
									onChange={(e) => handleInputChange("firstName", e.target.value)}
									className={getInputClassName("firstName")}
								/>
							</div>
							{errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
						</div>

						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
								Last Name
							</label>
							<div className="relative">
								<User
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type="text"
									id="lastName"
									placeholder="Enter your last name"
									value={formData.lastName}
									onChange={(e) => handleInputChange("lastName", e.target.value)}
									className={getInputClassName("lastName")}
								/>
							</div>
							{errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
						</div>
					</div>

					{/* Username & Email Row */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
								Username
							</label>
							<div className="relative">
								<User
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type="text"
									id="username"
									placeholder="Enter your username"
									value={formData.username}
									onChange={(e) => handleInputChange("username", e.target.value)}
									className={getInputClassName("username")}
								/>
							</div>
							{errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<div className="relative">
								<Mail
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type="email"
									id="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className={getInputClassName("email")}
								/>
							</div>
							{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
						</div>
					</div>

					{/* Country & Phone Row */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
								Country
							</label>
							<div className="relative">
								<Globe
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
									size={20}
									aria-hidden
								/>
								<input
									type="text"
									id="country"
									placeholder="Search for your country"
									value={isCountryDropdownOpen ? countrySearch : selectedCountry}
									onChange={(e) => {
										setCountrySearch(e.target.value);
										setIsCountryDropdownOpen(true);
										if (errors.country) {
											setErrors((prev) => ({ ...prev, country: undefined }));
										}
									}}
									onFocus={() => setIsCountryDropdownOpen(true)}
									className={getInputClassName("country")}
								/>

								{/* Country Dropdown */}
								{isCountryDropdownOpen && (
									<div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-48 overflow-y-auto">
										{countries.map((country: Country) => (
											<button
												key={country.code}
												type="button"
												onClick={() => handleCountrySelect(country)}
												className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
											>
												{country.name}
											</button>
										))}
									</div>
								)}
							</div>
							{errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<div className="relative">
								<Phone
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type="tel"
									id="phone"
									placeholder="Enter your phone number"
									value={formData.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
									className={getInputClassName("phone")}
								/>
							</div>
							{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
						</div>
					</div>

					{/* Password & Confirm Password Row */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<div className="relative">
								<Lock
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									placeholder="Enter your password"
									value={formData.password}
									onChange={(e) => handleInputChange("password", e.target.value)}
									className={getPasswordInputClassName("password")}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
						</div>

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
								Confirm Password
							</label>
							<div className="relative">
								<Lock
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
									aria-hidden
								/>
								<input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									placeholder="Confirm your password"
									value={formData.confirmPassword}
									onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
									className={getPasswordInputClassName("confirmPassword")}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									aria-label={showConfirmPassword ? "Hide password" : "Show password"}
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.confirmPassword && (
								<p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
							)}
						</div>
					</div>

					{/* Terms & Forgot Password */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={formData.agreeToTerms}
								onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
							/>
							I agree to the{" "}
							<a href="#" className="text-blue-600 underline">
								Terms
							</a>
						</label>
					</div>
					{errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className={`w-full h-12 text-white text-sm sm:text-base font-medium rounded-2xl transition duration-200 ${
							isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
						}`}
					>
						{isSubmitting ? "Creating Account..." : "Create Account"}
					</button>

					{/* Login Redirect */}
					<p className="text-center text-sm text-gray-600">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-600 hover:underline">
							Log in
						</Link>
					</p>
				</form>
			</div>

			{/* Footer */}
			<div className="mt-10 text-center text-xs sm:text-sm text-gray-400">
				© {new Date().getFullYear()} Profyt-Opt™. All rights reserved.
			</div>

			{/* Floating Illustration */}
			<div className="absolute bottom-4 right-4 w-48 opacity-70 pointer-events-none">
				<motion.img
					src={cryptoGlass}
					alt="crypto illustration"
					className="w-full h-auto"
					animate={{ y: [0, -30, 0] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>
		</div>
	);
};

export default Signup;

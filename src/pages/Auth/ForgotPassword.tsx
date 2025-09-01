import cryptoGlass from "../../assets/Futuristic_Glass_Cube.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { sendRequest } from "@/lib/sendRequest";

interface FormData {
	email: string;
	resetCode: string;
	newPassword: string;
	confirmPassword: string;
}

interface FormErrors {
	email?: string;
	resetCode?: string;
	newPassword?: string;
	confirmPassword?: string;
	submit?: string;
}

interface ResetError {
	message: string;
}

const ForgotPassword: React.FC = () => {
	const [step, setStep] = useState<'email' | 'reset'>('email'); // Two-step process
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		email: "",
		resetCode: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const navigate = useNavigate();

	// Validation for email step
	const validateEmailStep = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Validation for reset step
	const validateResetStep = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.resetCode.trim()) {
			newErrors.resetCode = "Reset code is required";
		} else if (formData.resetCode.length !== 6) {
			newErrors.resetCode = "Reset code must be 6 digits";
		}

		if (!formData.newPassword) {
			newErrors.newPassword = "New password is required";
		} else if (formData.newPassword.length < 6) {
			newErrors.newPassword = "Password must be at least 6 characters";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle input changes
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	// Handle email submission (step 1)
	const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (!validateEmailStep()) return;
		setIsLoading(true);

		try {
			await sendRequest("/users/forgot-password", "POST", { email: formData.email });
			setStep('reset');
			setErrors({});
		} catch (error) {
			const resetError = error as ResetError;
			setErrors({ submit: resetError.message });
		} finally {
			setIsLoading(false);
		}
	};

	// Handle password reset submission (step 2)
	const handleResetSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (!validateResetStep()) return;
		setIsLoading(true);

		try {
			await sendRequest("/users/reset-password", "POST", {
				email: formData.email,
				resetCode: formData.resetCode,
				newPassword: formData.newPassword,
			});
			
			// Success - redirect to login
			navigate("/login");
		} catch (error) {
			const resetError = error as ResetError;
			setErrors({ submit: resetError.message });
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = (): void => {
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = (): void => {
		setShowConfirmPassword((prev) => !prev);
	};

	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
			{/* Back Arrow */}
			<Link to="/login" className="flex items-center absolute top-8 left-8 text-black hover:text-blue-800">
				<ArrowLeft size={20} />
				<span className="ml-2">Back to Login</span>
			</Link>

			{/* Reset Password Card */}
			<div className="w-full max-w-md p-8">
				<h2 className="text-center text-2xl font-semibold mb-2">
					{step === 'email' ? 'Forgot Password?' : 'Reset Password'}
				</h2>
				<p className="text-center text-gray-600 mb-6">
					{step === 'email' 
						? 'Enter your email address and we\'ll send you a reset code.' 
						: 'Enter the reset code and your new password.'
					}
				</p>

				{/* Submit Error */}
				{errors.submit && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
						{errors.submit}
					</div>
				)}

				{step === 'email' ? (
					// Step 1: Email Form
					<form onSubmit={handleEmailSubmit} className="space-y-5">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Enter your email address"
									className={`w-full pl-10 pr-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-400"
									}`}
									autoComplete="email"
								/>
							</div>
							{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full h-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium flex items-center justify-center"
						>
							{isLoading ? (
								<>
									<Loader2 className="animate-spin mr-2" size={20} />
									Sending Code...
								</>
							) : (
								"Send Reset Code"
							)}
						</button>
					</form>
				) : (
					// Step 2: Reset Form
					<form onSubmit={handleResetSubmit} className="space-y-5">
						{/* Reset Code */}
						<div>
							<label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
								Reset Code
							</label>
							<div className="relative">
								<KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
								<input
									type="text"
									id="resetCode"
									name="resetCode"
									value={formData.resetCode}
									onChange={handleInputChange}
									placeholder="Enter 6-digit code"
									maxLength={6}
									className={`w-full pl-10 pr-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest ${
										errors.resetCode ? "border-red-400 focus:ring-red-500" : "border-gray-400"
									}`}
								/>
							</div>
							{errors.resetCode && <p className="mt-1 text-sm text-red-600">{errors.resetCode}</p>}
						</div>

						{/* New Password */}
						<div>
							<label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
								New Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
								<input
									type={showPassword ? "text" : "password"}
									id="newPassword"
									name="newPassword"
									value={formData.newPassword}
									onChange={handleInputChange}
									placeholder="Enter new password"
									className={`w-full pl-10 pr-10 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										errors.newPassword ? "border-red-400 focus:ring-red-500" : "border-gray-400"
									}`}
									autoComplete="new-password"
								/>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none hover:text-gray-600"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
						</div>

						{/* Confirm Password */}
						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
								Confirm New Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
								<input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									placeholder="Confirm new password"
									className={`w-full pl-10 pr-10 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
										errors.confirmPassword ? "border-red-400 focus:ring-red-500" : "border-gray-400"
									}`}
									autoComplete="new-password"
								/>
								<button
									type="button"
									onClick={toggleConfirmPasswordVisibility}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none hover:text-gray-600"
									aria-label={showConfirmPassword ? "Hide password" : "Show password"}
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full h-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium flex items-center justify-center"
						>
							{isLoading ? (
								<>
									<Loader2 className="animate-spin mr-2" size={20} />
									Resetting Password...
								</>
							) : (
								"Reset Password"
							)}
						</button>

						{/* Back to email step */}
						<button
							type="button"
							onClick={() => setStep('email')}
							className="w-full text-sm text-blue-600 hover:underline"
						>
							Didn't receive the code? Try again
						</button>
					</form>
				)}

				{/* Login Redirect */}
				<p className="text-center text-sm text-gray-600 mt-6">
					Remember your password?{" "}
					<Link to="/login" className="text-blue-600 hover:underline">
						Back to Login
					</Link>
				</p>
			</div>

			{/* Footer */}
			<div className="mt-8 text-center text-sm text-gray-400">
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

export default ForgotPassword;
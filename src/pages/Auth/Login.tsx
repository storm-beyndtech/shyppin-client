import cryptoGlass from "../../assets/Futuristic_Glass_Cube.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { sendRequest } from "@/lib/sendRequest";
import { contextData } from "@/context/AuthContext";

interface FormData {
	email: string;
	password: string;
}

interface FormErrors {
	email?: string;
	password?: string;
	submit?: string;
}

interface LoginError {
	message: string;
}

const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const navigate = useNavigate();
	const { login } = contextData();

	// Helper function to check if input is email or username
	const isEmail = (input: string): boolean => {
		return input.includes("@") && /\S+@\S+\.\S+/.test(input);
	};

	// Validation rules
	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Email/Username validation
		if (!formData.email.trim()) {
			newErrors.email = "Email or username is required";
		} else if (formData.email.includes("@") && !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
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

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (!validateForm()) return;
		setIsLoading(true);

		try {
			// Prepare data based on input type
			const loginData = {
				...formData,
				username: !isEmail(formData.email) && formData.email,
				email: isEmail(formData.email) && formData.email,
			};

			// Option 1: Send with loginType indicator
			const data = await sendRequest("/users/login", "POST", loginData);

			login(data.user);
			navigate("/dashboard");
		} catch (error) {
			const loginError = error as LoginError;
			setErrors({ submit: loginError.message });
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = (): void => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
			{/* Back Arrow */}
			<Link to="/" className="flex items-center absolute top-8 left-8 text-black hover:text-blue-800">
				<ArrowLeft size={20} />
				<span className="ml-2">Back</span>
			</Link>

			{/* Login Card */}
			<div className="w-full max-w-md p-8">
				<h2 className="text-center text-2xl font-semibold mb-6">Welcome Back!</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Submit Error */}
					{errors.submit && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
							{errors.submit}
						</div>
					)}

					{/* Username or Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
							Username or Email
						</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
							<input
								type="text"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Enter your email or username"
								className={`w-full pl-10 pr-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-400"
								}`}
								autoComplete="username"
							/>
						</div>
						{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
					</div>

					{/* Password */}
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								placeholder="Enter your password"
								className={`w-full pl-10 pr-10 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									errors.password ? "border-red-400 focus:ring-red-500" : "border-gray-400"
								}`}
								autoComplete="current-password"
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
						{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
					</div>

					{/* Forgot Password */}
					<div className="flex justify-end">
						<Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
							Forgot password?
						</Link>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full h-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium flex items-center justify-center"
					>
						{isLoading ? (
							<>
								<Loader2 className="animate-spin mr-2" size={20} />
								Logging in...
							</>
						) : (
							"Login"
						)}
					</button>

					{/* Signup Redirect */}
					<p className="text-center text-sm text-gray-600">
						Don't have an account with us?{" "}
						<Link to="/signup" className="text-blue-600 hover:underline">
							Create Account
						</Link>
					</p>
				</form>
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

export default Login;

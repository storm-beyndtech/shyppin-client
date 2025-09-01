import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full py-4 px-6 md:px-12 bg-blue-700">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				{/* Logo */}
				<Link to="/">
					<img src={logo} alt="logo" className="w-24" />
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-8 text-white">
					<Link to="/" className="text-sm font-medium hover:text-blue-100">
						Home
					</Link>
					<Link to="/about" className="text-sm font-medium hover:text-blue-100">
						About
					</Link>
					<Link to="/projects" className="text-sm font-medium hover:text-blue-100">
						Projects
					</Link>
					<Link to="/reports" className="text-sm font-medium hover:text-blue-100">
						Annual Report
					</Link>
					<Link to="/support" className="text-sm font-medium hover:text-blue-100">
						Support
					</Link>
					<Link to="/retirement" className="text-sm font-medium hover:text-blue-100">
						Retirement
					</Link>
					<Link to="/events" className="text-sm font-medium hover:text-blue-100">
						Event
					</Link>
					<div className="flex items-center space-x-2">
						<Link
							to="/login"
							className="flex items-center h-10 bg-blue-500 text-white  text-sm font-medium px-4 py-1.5 rounded-xl hover:bg-blue-800  transition-colors text-center"
						>
							Sign in
						</Link>
						<Link
							to="/signup"
							className="flex items-center h-10 bg-white text-black  text-sm font-medium px-4 py-1.5 rounded-xl hover:bg-white/90  transition-colors text-center"
						>
							Create an Account
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</div>
				</div>

				{/* Mobile menu button */}
				<div className="md:hidden">
					<button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-4"
				>
					<div className="flex flex-col space-y-4">
						<Link to="/" className="text-sm font-medium hover:text-blue-500">
							Home
						</Link>
						<Link to="/about" className="text-sm font-medium hover:text-blue-500">
							About
						</Link>
						<Link to="/projects" className="text-sm font-medium hover:text-blue-500">
							Projects
						</Link>
						<Link to="/reports" className="text-sm font-medium hover:text-blue-500">
							Annual Report
						</Link>
						<Link to="/support" className="text-sm font-medium hover:text-blue-500">
							Support
						</Link>
						<Link to="/retirement" className="text-sm font-medium hover:text-blue-500">
							Retirement
						</Link>
						<Link to="/events" className="text-sm font-medium hover:text-blue-500">
							Event
						</Link>

						<div className="flex flex-col space-y-2 mt-4">
							<Link
								to="/signup"
								className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-600/90 transition-colors text-center"
							>
								Create an Account
							</Link>
							<Link
								to="/login"
								className="bg-white border border-gray-300 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl transition-colors text-center"
							>
								Sign in
							</Link>
						</div>
					</div>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;

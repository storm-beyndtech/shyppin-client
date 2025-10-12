import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import GTranslateProvider from "./UI/GTranslateProvider";

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
					<Link to="/services" className="text-sm font-medium hover:text-blue-100">
						Services
					</Link>
					<Link to="/track" className="text-sm font-medium hover:text-blue-100">
						Track Shipment
					</Link>
					<Link to="/quote" className="text-sm font-medium hover:text-blue-100">
						Get Quote
					</Link>
					<Link to="/contact" className="text-sm font-medium hover:text-blue-100">
						Contact
					</Link>
					<div className="flex items-center space-x-3">
						<div className="cursor-pointer">
							<GTranslateProvider />
						</div>
					</div>
				</div>

				{/* Mobile menu button */}
				<div className="md:hidden flex items-center gap-5">
					<div className="cursor-pointer">
						<GTranslateProvider />
					</div>

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
						<Link to="/services" className="text-sm font-medium hover:text-blue-500">
							Services
						</Link>
						<Link to="/track" className="text-sm font-medium hover:text-blue-500">
							Track Shipment
						</Link>
						<Link to="/quote" className="text-sm font-medium hover:text-blue-500">
							Get Quote
						</Link>
						<Link to="/contact" className="text-sm font-medium hover:text-blue-500">
							Contact
						</Link>
					</div>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;

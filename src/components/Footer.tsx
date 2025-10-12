import { Link } from "react-router-dom";
import type { FC } from "react";
import logo from "../assets/logo-black.png";

const Footer: FC = () => {
	return (
		<footer className="bg-gradient-to-b from-gray-50 to-gray-200 text-black py-12">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-10 md:space-y-0">
					{/* Logo and tagline */}
					<div className="md:max-w-[200px]">
						{/* Logo */}
						<Link to="/">
							<img src={logo} alt="logo" className="w-24" />
						</Link>
						<p className="text-sm mt-2">Simplifying global logistics for businesses worldwide.</p>
					</div>

					{/* Grid Section */}
					<div className="w-full flex justify-evenly flex-wrap max-sm:justify-start gap-8 text-left">
						{/* Information links */}
						<div>
							<p className="text-sm mb-4 font-medium">Company</p>
							<ul className="space-y-2">
								<li>
									<Link to="/about" className="hover:underline">
										About Us
									</Link>
								</li>
								<li>
									<Link to="/services" className="hover:underline">
										Our Services
									</Link>
								</li>
								<li>
									<Link to="/contact" className="hover:underline">
										Contact Us
									</Link>
								</li>
							</ul>
						</div>

						{/* Quick links 1 */}
						<div>
							<p className="text-sm mb-4 font-medium">Services</p>
							<ul className="space-y-2">
								<li>
									<Link to="/track" className="hover:underline">
										Track Shipment
									</Link>
								</li>
								<li>
									<Link to="/quote" className="hover:underline">
										Get Quote
									</Link>
								</li>
								<li>
									<Link to="/services" className="hover:underline">
										All Services
									</Link>
								</li>
							</ul>
						</div>

						{/* Legal links 2 */}
						<div>
							<p className="text-sm mb-4 font-medium">Policy</p>
							<ul className="space-y-2">
								<li>
									<Link to="#" className="hover:underline">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link to="#" className="hover:underline">
										Terms & Conditions
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="pt-8 mt-10 border-t border-gray-400 text-left">
					<p className="text-xs">© {new Date().getFullYear()} Shyppin. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

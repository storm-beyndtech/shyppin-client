import { Link } from "react-router-dom";
import type { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="bg-blue-800 text-white py-12">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-10 md:space-y-0">
					{/* Logo and tagline */}
					<div className="md:max-w-[200px]">
						<h2 className="text-2xl font-semibold">Profyt-Opt</h2>
						<p className="text-sm mt-2">transforming the future of technology and innovation.</p>
					</div>

					{/* Grid Section */}
					<div className="w-full flex justify-evenly flex-wrap max-sm:justify-start gap-8 text-left">
						{/* Information links */}
						<div>
							<p className="text-sm mb-4 font-medium">Need more information?</p>
							<ul className="space-y-2">
								<li>
									<Link to="/about" className="hover:underline">
										Company Info
									</Link>
								</li>
								<li>
									<Link to="/events" className="hover:underline">
										Announcements
									</Link>
								</li>
								<li>
									<Link to="/support" className="hover:underline">
										Customer Support
									</Link>
								</li>
								<li>
									<Link to="/reports" className="hover:underline">
										Annual Report
									</Link>
								</li>
							</ul>
						</div>

						{/* Quick links 1 */}
						<div>
							<p className="text-sm mb-4 font-medium">Quick Links</p>
							<ul className="space-y-2">
								<li>
									<Link to="/projects" className="hover:underline">
										Projects
									</Link>
								</li>
								<li>
									<Link to="/events" className="hover:underline">
										Events
									</Link>
								</li>
								<li>
									<Link to="/register" className="hover:underline">
										Register
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
					<p className="text-xs">© {new Date().getFullYear()} Profyt-Opt. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

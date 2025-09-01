import React from "react";
import logo from "../assets/logo-black.png";
import { LoaderCircle } from "lucide-react";

const PageLoader: React.FC = () => {
	return (
		<div className="fixed inset-0 z-[9999999] bg-gradient-to-b from-blue-100 to-white flex items-center justify-center noRight">
			<div className="absolute w-[465px] h-[140px] flex items-center justify-center gap-[10px] transition-all duration-500 ease-in-out">
				<div className="flex items-center justify-center spin  text-blue-600">
					<LoaderCircle size={30} />
				</div>
				<div className="load-text">
					<img src={logo} alt="Copyelite logo text" className="w-24 sm:w-40" />
				</div>
			</div>
		</div>
	);
};

export default PageLoader;

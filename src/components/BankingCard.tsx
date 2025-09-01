import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { SiVisa } from "react-icons/si";
import { FcSimCardChip } from "react-icons/fc";

const BankingCard = () => {
	return (
		<div className="w-80 h-fit">
			<div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black rounded-2xl px-6 py-2 pb-4 text-white shadow-2xl overflow-hidden h-full">
				{/* Modern geometric pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500 to-cyan-400 rounded-full -mr-16 -mt-16"></div>
					<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full -ml-12 -mb-12"></div>
				</div>

				{/* Card layout */}
				<div className="relative z-10 h-full flex flex-col justify-between">
					{/* Header */}
					<div className="flex items-center justify-between">
						<Link to="/">
							<img src={logo} alt="logo" className="w-16" />
						</Link>

						<SiVisa className="text-6xl text-white" />
					</div>

					{/* Chip */}
					<div className="flex justify-start">
						<FcSimCardChip className="text-4xl opacity-90" />
					</div>

					{/* Footer */}
					<div className="flex items-end justify-between">
						<div className="space-y-1">
							<div className="text-xl tracking-wider text-white/90">**** **** **** ****</div>
							<div className="text-sm text-slate-300">**/** ***</div>
						</div>

						<Link to="/support">
							<button className="border-[1px] border-blue-600 text-gray-200 hover:text-white px-4 py-1 rounded-2xl text-xs font-medium transition-all duration-200">
								apply
							</button>
						</Link>
					</div>
				</div>

				{/* Subtle border glow */}
				<div className="absolute inset-0 rounded-2xl border border-slate-700/50 dark:border-slate-600/30"></div>
			</div>
		</div>
	);
};

export default BankingCard;

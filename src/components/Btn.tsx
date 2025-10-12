import { ArrowLeft, ArrowRight } from "lucide-react";

type dataProp = {
	type?: "primary" | "small" | "auth";
	label?: string;
	disabled?: boolean;
	btnAction?: "button" | "submit" | "reset" | undefined;
	direction?: "left" | "right";
	onClick?: () => void;
	enabled?: boolean;
};

export default function Btn({ type, direction, onClick, enabled }: dataProp) {
	switch (type) {
    

		case "small":
			return (
				<div
					onClick={enabled ? onClick : undefined}
					className={`w-12 h-12 grid place-content-center rounded-xl cursor-pointer 
              bg-blue-50 text-xl transition-colors duration-200
              ${
								enabled ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : "text-gray-300 cursor-not-allowed"
							}`}
				>
					{direction === "left" ? <ArrowLeft /> : <ArrowRight />}
				</div>
			);

		default:
			return;
	}
}

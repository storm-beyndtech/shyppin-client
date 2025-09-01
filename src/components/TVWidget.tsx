import { useEffect, useRef, memo } from "react";

interface TradingViewConfig {
	defaultColumn: string;
	screener_type: string;
	displayCurrency: string;
	colorTheme: "light" | "dark";
	isTransparent: boolean;
	locale: string;
	width: string;
	height: number;
}

interface TradingViewWidgetProps {
	theme?: "light" | "dark";
	height?: number;
	maxWidth?: string;
	className?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
	theme = "light",
	height = 360,
	maxWidth = "max-w-7xl",
	className = "",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Clear any existing content
		container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

		const config: TradingViewConfig = {
			defaultColumn: "overview",
			screener_type: "crypto_mkt",
			displayCurrency: "USD",
			colorTheme: theme,
			isTransparent: true,
			locale: "en",
			width: "100%",
			height,
		};

		const script = document.createElement("script");
		script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
		script.type = "text/javascript";
		script.async = true;
		script.innerHTML = JSON.stringify(config);

		container.appendChild(script);
	}, [theme, height]);

	return (
		<div
			className={`w-full mx-auto p-5 ${maxWidth} h-auto overflow-hidden ${className}`}
			ref={containerRef}
			style={{ height: height ? `${height}px` : "auto" }}
		>
			<div className="tradingview-widget-container__widget w-full h-full"></div>
		</div>
	);
};

export default memo(TradingViewWidget);

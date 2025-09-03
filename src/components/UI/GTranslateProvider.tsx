import { useEffect } from "react";

const GTranslateProvider = () => {
	useEffect(() => {
		// If already initialized, don’t inject again
		if (document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/float.js"]')) {
			return;
		}

		// Set settings before script loads
		// @ts-ignore
		window.gtranslateSettings = {
			default_language: "en",
			wrapper_selector: ".gtranslate_wrapper",
			switcher_horizontal_position: "inline",
			float_switcher_open_direction: "bottom",
			alt_flags: {
				en: "usa",
			},
		};

		// Inject script
		const script = document.createElement("script");
		script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
		script.defer = true;
		script.setAttribute("data-gtranslate", "true");
		document.body.appendChild(script);
	}, []); // 👈 only run once, not on every route change

	return (
		<div className="w-[68px] h-[24px] py-3 relative bg-gray-50 rounded">
			<div className="gtranslate_wrapper absolute left-1 top-[0px]"></div>
		</div>
	);
};

export default GTranslateProvider;

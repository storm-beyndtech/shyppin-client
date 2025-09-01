import useColorMode from "../../hooks/useColorMode";
import { Sun, Moon } from "lucide-react";

interface DarkModeSwitcherProps {
	variant?: "blue" | "neutral";
}

const DarkModeSwitcher = ({ variant = "blue" }: DarkModeSwitcherProps) => {
	const [colorMode, setColorMode] = useColorMode();
	const isDark = colorMode === "dark";

	const handleThemeChange = (theme: "light" | "dark") => {
		if (typeof setColorMode === "function") {
			setColorMode(theme);
		}
	};

	const getVariantStyles = () => {
		switch (variant) {
			case "blue":
				return {
					container: "flex items-center justify-between px-3 py-2",
					label: "text-sm font-medium text-blue-100",
					switcher: "flex items-center gap-2 px-2 py-1 bg-blue-700/40 rounded-full border border-blue-500",
					lightButton: !isDark ? "bg-white shadow text-yellow-500" : "text-blue-200 hover:bg-blue-600",
					darkButton: isDark ? "bg-blue-900 text-blue-100 shadow" : "text-blue-200 hover:bg-blue-600",
					separator: "w-px h-5 bg-blue-400 mx-1",
					focus: "focus:outline-none focus:ring-2 focus:ring-blue-300",
					hasLabel: true,
				};
			case "neutral":
				return {
					container:
						"flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-inner",
					switcher: "",
					lightButton: !isDark
						? "bg-white shadow text-yellow-500"
						: "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
					darkButton: isDark
						? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow"
						: "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
					separator: "w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1",
					focus: "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
					hasLabel: false,
				};
			default:
				return getVariantStyles(); // This won't actually be called due to TypeScript
		}
	};

	const styles = getVariantStyles();

	if (styles.hasLabel) {
		return (
			<div className={styles.container}>
				<span className={styles.label}>Theme</span>
				<div className={styles.switcher}>
					<button
						type="button"
						aria-label="Switch to light mode"
						onClick={() => handleThemeChange("light")}
						className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors
              ${styles.lightButton} ${styles.focus}`}
					>
						<Sun className="w-4 h-4" />
					</button>
					<span className={styles.separator} />
					<button
						type="button"
						aria-label="Switch to dark mode"
						onClick={() => handleThemeChange("dark")}
						className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors
              ${styles.darkButton} ${styles.focus}`}
					>
						<Moon className="w-4 h-4" />
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<button
				type="button"
				aria-label="Switch to light mode"
				onClick={() => handleThemeChange("light")}
				className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors
          ${styles.lightButton} ${styles.focus}`}
			>
				<Sun className="w-4 h-4" />
			</button>
			<span className={styles.separator} />
			<button
				type="button"
				aria-label="Switch to dark mode"
				onClick={() => handleThemeChange("dark")}
				className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors
          ${styles.darkButton} ${styles.focus}`}
			>
				<Moon className="w-4 h-4" />
			</button>
		</div>
	);
};

export default DarkModeSwitcher;

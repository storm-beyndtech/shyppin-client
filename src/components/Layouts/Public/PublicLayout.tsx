import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar"; // Adjust path as needed
import Footer from "../../Footer"; // Adjust path as needed

interface PublicLayoutProps {
	children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	const location = useLocation();

	// Routes that shouldn't show navbar/footer (if any special cases)
	const noNavFooterPaths: string[] = [
		// Add any public routes that shouldn't have nav/footer
	];

	const hideNavFooter = noNavFooterPaths.includes(location.pathname);

	return (
		<>
			{!hideNavFooter && <Navbar />}
			<main className="min-h-screen">{children}</main>
			{!hideNavFooter && <Footer />}
		</>
	);
};

export default PublicLayout;

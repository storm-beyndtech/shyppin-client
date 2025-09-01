import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./components/UI/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<ToastProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ToastProvider>
		</Router>
	</StrictMode>,
);

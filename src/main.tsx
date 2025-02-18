import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { MenuContextProvider } from "./contexts/MenuContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthContextProvider>
			<MenuContextProvider>
				<App />
			</MenuContextProvider>
		</AuthContextProvider>
	</StrictMode>
);

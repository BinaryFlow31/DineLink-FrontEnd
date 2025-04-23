import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { MenuContextProvider } from "./contexts/MenuContext.tsx";
import { OrderProvider } from "./contexts/OrderContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthContextProvider>
			<MenuContextProvider>
				<OrderProvider>

				
				<App />
				</OrderProvider>
			</MenuContextProvider>
		</AuthContextProvider>
	</StrictMode>
);

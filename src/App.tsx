import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TableOrder from "./pages/TableOrder";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import useAuth from "./hooks/useAuth";
import ChefDashboard from "./pages/ChefDashboard";

const App = () => {
	const auth = useAuth()!;
	const { isAdmin, isAuthenticated } = auth;

	return (
		<Router>
			<div className="bg-gradient min-h-screen w-full">
				<Routes>
					{/* Login Page */}
					<Route path="/" element={isAuthenticated ? (isAdmin ? <AdminDashboard /> : <ChefDashboard />) : <AdminLogin />} />
					
					{/* Table Orders */}
					<Route path="/table/:tableNumber" element={<TableOrder />} />

					{/* Admin Dashboard */}
					<Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
					
					{/* Catch-All Route for Unknown URLs */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</Router>
	);
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TableOrder from "./pages/TableOrder";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import useAuth from "./hooks/useAuth";
import ChefDashboard from "./pages/ChefDashboard";
import CreateChef from "./pages/CreateChef";
import CreateAdmin from "./pages/CreateAdmin";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

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

					<Route path="/cart" element={<CartPage />} />

					<Route path="/checkout" element={<CheckoutPage />} />

					{/* Admin Dashboard */}
					<Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />

					{/* Chef Creation Form */}
					<Route path="/chef-form" element={isAuthenticated && isAdmin ? <CreateChef /> : <Navigate to="/" />} />

					{/* Admin Creation Form */}
					<Route path="/admin-form" element={isAuthenticated && isAdmin ? <CreateAdmin /> : <Navigate to="/" />} />
					
					{/* Catch-All Route for Unknown URLs */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</Router>
	);
};

export default App;
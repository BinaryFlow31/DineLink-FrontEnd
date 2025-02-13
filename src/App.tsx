import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableOrder from "./pages/TableOrder";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <AdminLogin />
		},
		{
			path: '/table',
			element: <TableOrder />
		},
		{
			path: '/admin',
			element: <AdminDashboard />
		}
		
	])

	return <div className='bg-gradient min-h-screen w-full'>
		<RouterProvider router={router} />
		<Toaster />
	</div>;
};

export default App;

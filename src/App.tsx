import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableOrder from "./pages/TableOrder";

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <TableOrder />
		}
	])

	return <div className='bg-gradient min-h-screen w-full'>
		<RouterProvider router={router} />
	</div>;
};

export default App;

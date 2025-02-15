import Graphs from "@/components/Graphs";
import HeaderAdmin from "@/components/HeaderAdmin";
import NumericalStats from "@/components/NumericalStats";
import OrderListTable from "@/components/OrderListTable";
const AdminDashboard = () => {
	return (
		<>
			<HeaderAdmin />
			<NumericalStats />
			<Graphs />
			<OrderListTable />
		</>
	);
};

export default AdminDashboard;

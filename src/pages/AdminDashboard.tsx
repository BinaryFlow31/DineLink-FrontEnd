import Graphs from "@/components/Graphs"
import HeaderAdmin from "@/components/HeaderAdmin"
import NumericalStats from "@/components/NumericalStats"
const AdminDashboard = () => {
  return (
    <>
        <HeaderAdmin />
        <NumericalStats />
        <Graphs />
    </>
  )
}

export default AdminDashboard
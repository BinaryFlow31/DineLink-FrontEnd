import OrdersSummary from "./OrderSummary"
import RevenueChart from "./RevenueChart"

const Graphs = () => {
  return (
    <div className="flex justify-center gap-4 items-center flex-col md:flex-row pb-4">
        <RevenueChart />
        <OrdersSummary />
    </div>
  )
}

export default Graphs
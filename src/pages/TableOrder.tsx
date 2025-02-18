import Banner from "@/components/Banner";
import Header from "@/components/Header";
import HowWeWork from "@/components/HowWeWork";
import Menu from "@/components/Menu";
import { useParams } from "react-router-dom";

const TableOrder = () => {
    const {tableNumber} = useParams();
    console.log(tableNumber);
	return <>
        <Header />
        <Banner />
        <HowWeWork />
        <Menu />
    </>;
};

export default TableOrder;

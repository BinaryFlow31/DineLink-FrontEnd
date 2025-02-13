import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { date: "Jun 24", orders: 10000, returns: 20000, refunds: 15000 },
  { date: "Jun 25", orders: 11000, returns: 21000, refunds: 15500 },
  { date: "Jun 26", orders: 10500, returns: 20500, refunds: 15200 },
  { date: "Jun 27", orders: 10800, returns: 20800, refunds: 15400 },
];

interface Payload {
  payload: {
    date: string;
    value: number;
  };
  value: number;
}

const CustomTooltip = ({ active, payload }: { active: boolean; payload: Payload[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <p className="text-gray-700 font-semibold">{payload[0].payload.date}</p>
        <p className="text-black">🛒 Orders: {payload[0].value.toLocaleString()}</p>
        <p className="text-gray-400">📦 Returns: {payload[1].value.toLocaleString()}</p>
        <p className="text-indigo-400">💰 Refunds: {payload[2].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const OrdersSummary: React.FC = () => {
  const [selected, setSelected] = useState("Weekly");

  return (
    <Card className="p-5 bg-white md:w-[48%] w-[98%] mx-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Orders Summary</h2>
        <div className="space-x-2">
          {["Monthly", "Weekly", "Today"].map((item) => (
            <Button
              key={item}
              className={`px-3 py-1 rounded-md ${selected === item ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setSelected(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className="p-2 mt-2">
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#808080" />
          <YAxis stroke="#808080" />
          <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
          <Legend />
          <Bar dataKey="orders" fill="black" barSize={30} />
          <Bar dataKey="returns" fill="lightgray" barSize={30} />
          <Bar dataKey="refunds" fill="lightblue" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default OrdersSummary;

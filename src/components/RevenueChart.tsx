import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const data = [
  { month: "Jan", income: 11000, expenses: 8000 },
  { month: "Feb", income: 12000, expenses: 9000 },
  { month: "Mar", income: 14000, expenses: 10000 },
  { month: "Apr", income: 18000, expenses: 13000 },
  { month: "May", income: 20000, expenses: 15000 },
  { month: "Jun", income: 23000, expenses: 16000 },
];

const CustomTooltip = ({ 
  active, 
  payload 
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-3 rounded-lg shadow-lg">
        <p className="text-gray-200 font-semibold">{payload[0]?.payload?.month ?? "Unknown"} 2022</p>
        <p className="text-green-600">🔼 Income: {payload[0]?.value?.toLocaleString() ?? "0"}k</p>
        <p className="text-red-500">🔻 Expenses: {payload[1]?.value?.toLocaleString() ?? "0"}k</p>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  const [selected, setSelected] = useState("Monthly");

  return (
    <Card className="p-5 bg-white md:w-[48%] w-[98%] mx-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Revenue</h2>
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
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#808080" />
          <YAxis stroke="#808080" />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="income" stroke="black" strokeWidth={2} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="expenses" stroke="red" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;

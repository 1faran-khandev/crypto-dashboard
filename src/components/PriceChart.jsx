// src/components/PriceChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function PriceChart({ data, coin }) {
  if (!data || data.length === 0) return <p>No data for {coin}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md w-full h-64">
      <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{coin.toUpperCase()}</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

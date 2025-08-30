import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CryptoChart({ data = [], coin }) {
  // If no data, show a message instead of crashing
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300">No data available for {coin.toUpperCase()}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {coin.toUpperCase()} Price
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

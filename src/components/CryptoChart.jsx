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
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300">
          No data available for {coin.toUpperCase()}
        </p>
      </div>
    );
  }

  const latestPrice = data[data.length - 1]?.price ?? 0;
  const prevPrice = data[data.length - 2]?.price ?? latestPrice;
  const priceChange = latestPrice - prevPrice;
  const isPositive = priceChange >= 0;

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white capitalize">
          {coin}
        </h2>
        <div className={`text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "▲" : "▼"} ${Math.abs(priceChange).toFixed(2)}
        </div>
      </div>

      {/* Current Price */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        ${latestPrice.toLocaleString()}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" opacity={0.2} />
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis stroke="#8884d8" domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

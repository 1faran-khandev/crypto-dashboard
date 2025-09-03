import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function CryptoChart({ data = [], coin }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300">
          No data available for {coin?.toUpperCase()}
        </p>
      </div>
    );
  }

  const latestPrice = data[data.length - 1]?.price ?? 0;
  const prevPrice = data[data.length - 2]?.price ?? latestPrice;
  const priceChange = latestPrice - prevPrice;
  const percentChange = ((priceChange / prevPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white capitalize">
          {coin}
        </h2>
        <div
          className={`text-sm font-semibold px-2 py-1 rounded ${
            isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(percentChange)}%
        </div>
      </div>

      {/* Current Price */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        ${latestPrice.toLocaleString()}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" opacity={0.1} />
          <XAxis dataKey="date" stroke="#8884d8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#8884d8" domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#10B981" : "#EF4444"}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

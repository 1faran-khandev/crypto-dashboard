// src/components/CoinsGrid.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CoinsGrid({ searchTerm = "" }) { 
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 12,
              page: 1,
              sparkline: true,
            },
          }
        );
        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching coins", err);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Safe filter with optional chaining
  const filteredCoins = coins.filter((coin) =>
    coin?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading coins...</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {filteredCoins.length > 0 ? (
        filteredCoins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-white dark:bg-gray-900 shadow-md rounded-2xl hover:shadow-lg transition cursor-pointer"
          >
            {/* Coin Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <h2 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </h2>
              </div>
              <span
                className={`text-sm font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${coin.current_price.toLocaleString()}
            </p>

            {/* Market Cap */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MCap: ${coin.market_cap.toLocaleString()}
            </p>

            {/* Mini Chart */}
            <div className="h-20 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coin.sparkline_in_7d.price.map((p, i) => ({ time: i, price: p }))}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={["auto", "auto"]} hide />
                  <Tooltip
                    formatter={(value) => `$${value.toFixed(2)}`}
                    contentStyle={{ fontSize: "12px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={coin.price_change_percentage_24h >= 0 ? "#22c55e" : "#ef4444"}
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No coins found for "{searchTerm}"
        </p>
      )}
    </div>
  );
}

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

const priceData = [
  { time: "10 AM", price: 42000 },
  { time: "11 AM", price: 42500 },
  { time: "12 PM", price: 41500 },
  { time: "1 PM", price: 43000 },
  { time: "2 PM", price: 42800 },
];

const volumeData = [
  { time: "10 AM", volume: 12 },
  { time: "11 AM", volume: 18 },
  { time: "12 PM", volume: 10 },
  { time: "1 PM", volume: 15 },
  { time: "2 PM", volume: 20 },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-20"
        }`}
      >
        {/* Navbar Fixed on Top */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatsCard title="Price" value="$42,000" change={+2.4} />
            <StatsCard title="Market Cap" value="$780B" change={-1.2} />
            <StatsCard title="24h Volume" value="$38B" change={+5.1} />
            <StatsCard title="BTC Supply" value="19M" change={0} />
          </motion.div>

          {/* Market Overview Charts */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Market Overview</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Line Chart for Price */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Price Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={priceData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart for Volume */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">24h Trading Volume</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={volumeData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

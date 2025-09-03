import { Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import axios from "axios";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [price, setPrice] = useState(null);

  // Fetch BTC price every 60s
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setPrice(res.data.bitcoin.usd);
      } catch (err) {
        console.error("Error fetching price", err);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left: Logo */}
      <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        CryptoDashboard
      </h1>

      {/* Center: Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search coin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 w-40"
        />
      </div>
      <div className="flex items-center gap-4">
        {price && (
          <span className="text-sm font-semibold text-green-500">
            BTC: ${price.toLocaleString()}
          </span>
        )}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-transform duration-300 hover:scale-110"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </motion.nav>
  );
}

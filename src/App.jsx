import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import CoinsGrid from "./components/CoinsGrid";
import useCryptoData from "./hooks/useCryptoData";
import useDarkMode from "./hooks/useDarkMode";

export default function App() {
  const [coins, setCoins] = useState(["bitcoin", "ethereum", "dogecoin"]);
  const { data, loading, error } = useCryptoData(coins);
  const [newCoin, setNewCoin] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const { darkMode, toggleDark } = useDarkMode();

  // Add a new coin
  const handleAddCoin = () => {
    const coin = newCoin.toLowerCase().trim();
    if (coin && !coins.includes(coin)) {
      setCoins([...coins, coin]);
      setNewCoin("");
    }
  };

  // Remove a coin
  const handleRemoveCoin = (coinToRemove) => {
    setCoins(coins.filter((coin) => coin !== coinToRemove));
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-20"
        }`}
      >
        <Navbar
          searchTerm={search}
          setSearchTerm={setSearch}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleDark={toggleDark}
          darkMode={darkMode}
        />

        <main className="p-6 overflow-y-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatsCard title="Total Coins" value={coins.length} />
            <StatsCard title="Top Coin" value={coins[0]} />
            <StatsCard title="Market Cap" value="$1.2T+" />
            <StatsCard title="24h Volume" value="$80B+" />
          </div>

          {/* Add Coin & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl">
            <input
              type="text"
              value={newCoin}
              onChange={(e) => setNewCoin(e.target.value)}
              placeholder="Add coin (e.g., solana)"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
            />
            <button
              onClick={handleAddCoin}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
            >
              Add Coin
            </button>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coin..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
            />
          </div>

          {/* Loading / Error */}
          {loading && (
            <p className="text-gray-700 dark:text-gray-300">Loading data...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {/* Coins Grid */}
          <CoinsGrid searchTerm={search} />
        </main>
      </div>
    </div>
  );
}

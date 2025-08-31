import { useState } from "react";
import CryptoChart from "./components/CryptoChart";
import useCryptoData from "./hooks/useCryptoData";

// Dark Mode Toggle in Navbar
function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <button
      onClick={toggleDark}
      className="px-4 py-2 rounded-lg shadow bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition"
    >
      {darkMode ? " Light Mode" : " Dark Mode"}
    </button>
  );
}

// Sidebar Component
function Sidebar() {
  const links = ["Dashboard", "Markets", "Portfolio", "Settings"];
  return (
    <aside className="w-60 bg-gray-100 dark:bg-gray-800 h-screen p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        CryptoDashboard
      </h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li
            key={link}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 cursor-pointer transition"
          >
            {link}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        CryptoDashboard
      </h1>
      <DarkModeToggle />
    </nav>
  );
}

function App() {
  const [coins, setCoins] = useState(["bitcoin", "ethereum", "dogecoin"]);
  const { data, loading, error } = useCryptoData(coins);
  const [newCoin, setNewCoin] = useState("");
  const [search, setSearch] = useState("");

  const handleAddCoin = () => {
    const coin = newCoin.toLowerCase().trim();
    if (coin && !coins.includes(coin)) {
      setCoins([...coins, coin]);
      setNewCoin("");
    }
  };

  const handleRemoveCoin = (coinToRemove) => {
    setCoins(coins.filter((coin) => coin !== coinToRemove));
  };

  const filteredCoins = coins.filter((coin) =>
    coin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">
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
          {loading && <p className="text-gray-700 dark:text-gray-300">Loading data...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Coins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <div
                  key={coin}
                  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveCoin(coin)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 shadow"
                  >
                    ✖
                  </button>

                  {/* Chart */}
                  <CryptoChart data={data[coin]} coin={coin} />
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-center col-span-full">
                No coins found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

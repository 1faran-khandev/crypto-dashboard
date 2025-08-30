import { useState } from "react";
import CryptoChart from "./components/CryptoChart";
import useCryptoData from "./hooks/useCryptoData";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <button
      onClick={toggleDark}
      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

function App() {
  const [coins, setCoins] = useState(["bitcoin", "ethereum", "dogecoin"]);
  const { data, loading, error } = useCryptoData(coins);
  const [newCoin, setNewCoin] = useState("");

  // Add coin
  const handleAddCoin = () => {
    const coin = newCoin.toLowerCase().trim();
    if (coin && !coins.includes(coin)) {
      setCoins([...coins, coin]);
      setNewCoin("");
    }
  };

  // Remove coin
  const handleRemoveCoin = (coinToRemove) => {
    setCoins(coins.filter((coin) => coin !== coinToRemove));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex flex-col items-center gap-6">
      <DarkModeToggle />

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Crypto Dashboard</h1>

      {/* Add Coin Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newCoin}
          onChange={(e) => setNewCoin(e.target.value)}
          placeholder="Add coin (e.g., solana)"
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <button
          onClick={handleAddCoin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Error / Loading */}
      {loading && <p className="text-gray-700 dark:text-gray-300">Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Crypto Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {coins.map((coin) => (
          <div key={coin} className="relative">
            <button
              onClick={() => handleRemoveCoin(coin)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 z-10"
            >
              X
            </button>
            <CryptoChart data={data[coin]} coin={coin} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

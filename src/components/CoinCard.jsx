import { X } from "lucide-react";
import CryptoChart from "./CryptoChart";

export default function CoinCard({ coin, data, onRemove }) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-[1.02]">
      <button
        onClick={() => onRemove(coin)}
        className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow"
      >
        <X size={16} />
      </button>

      <h3 className="text-lg font-semibold capitalize mb-2 text-gray-800 dark:text-gray-200">
        {coin}
      </h3>

      <CryptoChart data={data} coin={coin} />
    </div>
  );
}

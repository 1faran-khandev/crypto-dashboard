import { useState, useEffect } from "react";
import axios from "axios";

export default function useCryptoData(coins = ["bitcoin", "ethereum"]) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (coins.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const coinList = coins.join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinList}&vs_currencies=usd`;

      const res = await axios.get(url);
      const now = new Date().toLocaleTimeString();

      setData((prevData) => {
        const newData = { ...prevData };

        coins.forEach((coin) => {
          const price = res.data[coin]?.usd ?? null;

          if (!newData[coin]) newData[coin] = [];
          if (price !== null) {
            newData[coin] = [...newData[coin], { date: now, price }];
            if (newData[coin].length > 7) newData[coin].shift(); // keep last 7 points
          }
        });

        return newData;
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError("Failed to fetch crypto data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // update every 60s
    return () => clearInterval(interval);
  }, [coins]);

  return { data, loading, error };
}

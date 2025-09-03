import { useState, useEffect } from "react";

export default function useCryptoData(coins = ["bitcoin", "ethereum", "dogecoin"]) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coins.length === 0) return;

    let ws;
    setLoading(true);
    setError(null);

    try {
      const assets = coins.join(",");
      ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setLoading(false);
      };

      ws.onmessage = (msg) => {
        const prices = JSON.parse(msg.data);
        const now = new Date().toLocaleTimeString();

        setData((prevData) => {
          const newData = { ...prevData };

          Object.keys(prices).forEach((coin) => {
            const price = parseFloat(prices[coin]);
            if (!newData[coin]) newData[coin] = [];
            newData[coin] = [...newData[coin], { date: now, price }];
            if (newData[coin].length > 7) newData[coin].shift(); // keep last 7 points
          });

          return newData;
        });
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("Failed to connect to live prices");
        setLoading(false);
      };
    } catch (err) {
      console.error("Error setting up WebSocket:", err);
      setError("Failed to fetch real-time data");
      setLoading(false);
    }

    return () => ws?.close();
  }, [coins]);

  return { data, loading, error };
}

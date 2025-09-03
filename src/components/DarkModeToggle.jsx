import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; 

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle Dark Mode"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800 transition-transform duration-300" />
      )}
    </button>
  );
}

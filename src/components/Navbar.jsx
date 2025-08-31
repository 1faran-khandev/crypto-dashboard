import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        CryptoDashboard
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
      >
        {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
      </button>
    </nav>
  );
}

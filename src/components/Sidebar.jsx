// src/components/Sidebar.jsx
import { Home, BarChart, Wallet, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [active, setActive] = useState("Dashboard");

  const links = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Markets", icon: <BarChart size={20} /> },
    { name: "Portfolio", icon: <Wallet size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      className={`${
        isOpen ? "w-60" : "w-20"
      } fixed top-0 left-0 h-screen bg-gray-100 dark:bg-gray-800 p-4 hidden md:flex flex-col transition-all duration-300 z-40`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
      >
        {isOpen ? "Collapse" : "Expand"}
      </button>

      {/* Sidebar Links */}
      <ul className="space-y-3 flex-1">
        {links.map((link) => (
          <li
            key={link.name}
            onClick={() => setActive(link.name)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              active === link.name
                ? "bg-indigo-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {link.icon}
            {isOpen && <span className="text-sm">{link.name}</span>}
          </li>
        ))}
      </ul>

      {/* Footer */}
      {isOpen && (
        <div className="mt-auto text-xs text-gray-500 dark:text-gray-400 text-center pb-4">
          © 2025 CryptoDash
        </div>
      )}
    </motion.aside>
  );
}

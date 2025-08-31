import { Home, BarChart, Wallet, Settings } from "lucide-react";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Markets", icon: <BarChart size={20} /> },
    { name: "Portfolio", icon: <Wallet size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-60 bg-gray-100 dark:bg-gray-800 h-screen p-4 hidden md:block">
      <ul className="space-y-4">
        {links.map((link, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 cursor-pointer"
          >
            {link.icon}
            {link.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

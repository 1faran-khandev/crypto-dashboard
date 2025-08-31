import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard title="Price" value="$42,000" change={+2.4} />
            <StatsCard title="Market Cap" value="$780B" change={-1.2} />
            <StatsCard title="24h Volume" value="$38B" change={+5.1} />
            <StatsCard title="BTC Supply" value="19M" change={0} />
          </div>

          {/* Charts will go here later */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* ChartCard components */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

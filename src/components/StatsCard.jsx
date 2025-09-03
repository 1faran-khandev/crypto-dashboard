export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition transform hover:scale-[1.02]">
      <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
        {value || "--"}
      </p>
    </div>
  );
}

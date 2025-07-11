
export default function Stats({ stats }: { stats: { name: string, value: number }[] }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{stat.name}</h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
                            <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${stat.value}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
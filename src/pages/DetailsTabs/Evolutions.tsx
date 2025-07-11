

export default function Evolutions({ evolutions }: { evolutions: { name: string, id: number }[] }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Evolutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evolutions.map((evolution) => (
                    <div key={evolution.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{evolution.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {evolution.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
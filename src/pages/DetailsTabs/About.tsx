

export default function About(){
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-700 dark:text-gray-300">
                This application provides detailed information about various Pokémon, including their abilities, stats, and evolutions. 
                It is designed to be user-friendly and visually appealing, with a focus on accessibility and responsiveness.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
                The data is sourced from the official Pokémon API, ensuring that all information is accurate and up-to-date.
            </p>
        </div>
    );
}
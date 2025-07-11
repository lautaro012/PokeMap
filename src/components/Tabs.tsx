

export default function Tabs({page, setpage} : {page: 'about' | 'stats' | 'evolutions', setpage: (page: 'about' | 'stats' | 'evolutions') => void}) {
    
    const setPages = (newPage: 'about' | 'stats' | 'evolutions') => {
        setpage(newPage);
    }
    const isActive = (thisPage: 'about' | 'stats' | 'evolutions') => {
        return thisPage === page  ? "inline-block p-4 rounded-t-lg active font-medium border-b-2 border-red-600 text-black font-bold" : " inline-block p-4 rounded-t-lg active font-medium";
    }
   // const active = "border-b-2 border-red-600 text-red-600 font-bold";
    return (
        <div className="">
            <ul className="flex flex-wrap -mb-px justify-center gap-2">
                <li className="me-2">
                    <button onClick={() => setPages('about')} className={isActive("about")} aria-current="page">About</button>
                </li>
                <li className="me-2">
                    <button onClick={() => setPages('stats')} className={isActive("stats")} aria-current="page">Stats</button>
                </li>
                <li className="me-2">
                    <button onClick={() => setPages('evolutions')} className={isActive("evolutions")} aria-current="page">Evolutions</button>
                </li>
            </ul>
        </div>
);}
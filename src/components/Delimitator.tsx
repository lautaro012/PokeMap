type DelimitatorProps = {
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    location: string;
    handleRegionClick: (region: string) => void;
}

export default function Delimitator({positionX, positionY, width, height, location, handleRegionClick}: DelimitatorProps) {
    return(
         <rect
            x={positionX}
            y={positionY}
            width={width}
            height={height}
            fill="transparent"
            className="cursor-pointer hover:fill-blue-300/10 hover:stroke-blue-400 hover:stroke-2 transition-all duration-200"
            onClick={() => handleRegionClick(location)}
            role="button"
            aria-label={location}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleRegionClick(location)}
          />
    )
}
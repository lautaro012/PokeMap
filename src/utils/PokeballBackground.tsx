const PokeballBg = ({ className = "", styles }: { className?: string, styles:string }) => (
  
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="50" cy="50" r="40" fill="white" opacity="0.5" />
    <rect  x="10" y="45" width="80" height="12" fill={styles} opacity="1" />
    <circle cx="50" cy="50" r="15" fill={styles} opacity="1" />
  </svg>
);
export default PokeballBg;

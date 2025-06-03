const PokeballBg = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
    <rect x="10" y="48" width="80" height="5" fill="white" opacity="0.3" />
    <circle cx="50" cy="50" r="15" fill="white" opacity="0.3" />
  </svg>
);
export default PokeballBg;

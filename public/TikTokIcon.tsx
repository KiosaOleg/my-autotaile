const TikTokIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12.75 2a5.23 5.23 0 0 0 .08 1.06c.2 1.02.73 1.9 1.5 2.61a6.1 6.1 0 0 0 3.04 1.49v3.1a8.68 8.68 0 0 1-3.45-.87v5.39a6.15 6.15 0 1 1-6.15-6.15c.33 0 .67.03 1 .1v3.2a3.05 3.05 0 1 0 2.1 2.9V2h1.88Z" />
    </svg>
  );
};

export default TikTokIcon;

export function VortexLogo({
  className,
  color = '#5575A5',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      height="40"
      viewBox="0 0 27 40"
      width="27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Vector Logo</title>
      <path
        d="M17.7761 15.5555V6.66663H-0.00170898V15.5555H17.7761Z"
        fill={color}
      />
      <path
        d="M17.7757 24.4443C12.8665 24.4443 8.88682 28.424 8.88682 33.3332L-0.000622996 33.3336L-0.000622994 33.1042C0.121538 23.4294 7.97192 15.6168 17.6613 15.5558L26.665 15.5562V33.334H17.7761L17.7757 24.4443Z"
        fill={color}
      />
    </svg>
  );
}

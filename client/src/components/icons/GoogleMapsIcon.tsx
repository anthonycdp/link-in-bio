interface GoogleMapsIconProps {
  className?: string;
  size?: number | string;
}

export default function GoogleMapsIcon({ className = "", size = 24 }: GoogleMapsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fill="#EA4335" 
        d="M12 1C8.13 1 5 4.13 5 8c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
      <path 
        fill="#4285F4" 
        d="M12 1v4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5V21s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <path 
        fill="#34A853" 
        d="M5 8c0 5.25 7 13 7 13V10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5V1C8.13 1 5 4.13 5 8z"
      />
      <path 
        fill="#FBBC04" 
        d="M12 5.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"
      />
    </svg>
  );
}
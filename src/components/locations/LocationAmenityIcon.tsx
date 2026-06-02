import type { LocationAmenityKey } from "@/i18n/get-dictionary";

interface LocationAmenityIconProps {
  amenity: LocationAmenityKey;
  className?: string;
}

export function LocationAmenityIcon({
  amenity,
  className = "h-6 w-6",
}: LocationAmenityIconProps) {
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };

  switch (amenity) {
    case "cardio":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "strength":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h6" />
        </svg>
      );
    case "machines":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6v12m6-12v12M6 9h12M6 15h12"
          />
        </svg>
      );
    case "freeWeights":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h3l2-4h8l2 4h3M6 10v8M18 10v8"
          />
        </svg>
      );
    case "parking":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2l1-4h12l1 4h2M5 13v5h14v-5" />
          <circle cx="7.5" cy="18.5" r="1.5" />
          <circle cx="16.5" cy="18.5" r="1.5" />
        </svg>
      );
    case "showers":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c-2 0-3 1.5-3 3.5 0 2 1 3 3 5.5M12 3c2 0 3 1.5 3 3.5 0 2-1 3-3 5.5M8 14h8M9 17h6"
          />
        </svg>
      );
    case "lockers":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5h14v14H5zM9 9h6v6H9zM12 12v.01"
          />
        </svg>
      );
    case "airConditioning":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"
          />
        </svg>
      );
    case "changingRooms":
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"
          />
        </svg>
      );
    default:
      return null;
  }
}

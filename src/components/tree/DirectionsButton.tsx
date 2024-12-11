import { Navigation } from 'lucide-react';

interface LocationProps {
  lat: number;
  lng: number;
  address: string;
  schwebebahnStop: string;
}

interface DirectionsButtonProps {
  location: LocationProps;
  className?: string;
}

function DirectionsButton({ location, className = '' }: DirectionsButtonProps) {
  const handleGetDirections = () => {
    const destinationStr = `${location.lat},${location.lng}`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationStr}&travelmode=walking`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <button
      onClick={handleGetDirections}
      className={`flex items-center text-sm text-black hover:text-gray-700 transition-colors ${className}`}
    >
      <Navigation className="w-3 h-3 mr-1" />
      <span>Wegbeschreibung</span>
    </button>
  );
}

export default DirectionsButton;

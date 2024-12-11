import DirectionsButton from './DirectionsButton';

interface TreeLocationProps {
  lat: number;
  lng: number;
  address: string;
  schwebebahnStop: string;
  className?: string;
}

function TreeLocation({ lat, lng, address, schwebebahnStop, className = '' }: TreeLocationProps) {
  const location = { lat, lng, address, schwebebahnStop };

  return (
    <div className={className}>
      <h4 className="text-xs font-medium text-gray-500 mb-1">Standort</h4>
      <p className="text-sm text-gray-900">{address}</p>
      <p className="text-sm text-gray-600 mb-1.5">Schwebebahn {schwebebahnStop}</p>
      <DirectionsButton location={location} className="text-xs py-1 px-2" />
    </div>
  );
}

export default TreeLocation;

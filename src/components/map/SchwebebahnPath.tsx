import { useEffect, useRef } from 'react';
import { SCHWEBEBAHN_PATH } from '../../constants';

interface SchwebebahnPathProps {
  map: google.maps.Map;
}

function SchwebebahnPath({ map }: SchwebebahnPathProps) {
  const pathRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    pathRef.current = new google.maps.Polyline({
      path: SCHWEBEBAHN_PATH,
      geodesic: true,
      strokeColor: '#87E69B',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map
    });

    return () => {
      if (pathRef.current) {
        pathRef.current.setMap(null);
      }
    };
  }, [map]);

  return null;
}

export default SchwebebahnPath;
import { useEffect, useRef } from 'react';
import { SCHWEBEBAHN_STATIONS } from '../../constants';

interface SchwebebahnStationsProps {
  map: google.maps.Map;
}

function SchwebebahnStations({ map }: SchwebebahnStationsProps) {
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    // Create markers for each station
    const markers = SCHWEBEBAHN_STATIONS.map(station => {
      const marker = new google.maps.Marker({
        position: { lat: station.lat, lng: station.lng },
        map,
        title: station.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5.5,
          fillColor: '#87E69B',
          fillOpacity: 1,
          strokeWeight: 0,
          // Position label to start right at the dot's edge
          labelOrigin: new google.maps.Point(6, 0)
        },
        label: {
          text: station.name,
          color: '#333333',
          fontSize: '11px',
          fontWeight: '500'
        }
      });

      return marker;
    });

    markersRef.current = markers;

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [map]);

  return null;
}

export default SchwebebahnStations;

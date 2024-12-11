import { useEffect, useRef } from 'react';
import { Tree } from '../types/tree';
import { WUPPERTAL_CENTER, SCHWEBEBAHN_PATH } from '../constants';
import { mapLoader } from '../utils/mapLoader';
import { mapStyles } from '../utils/mapStyles';

interface MapProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
}

function Map({ trees, onTreeSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const schwebebahnPathRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    let isLoaded = false;

    const initMap = async () => {
      if (!mapRef.current || isLoaded) return;

      try {
        const google = await mapLoader.load();
        isLoaded = true;
        
        const map = new google.maps.Map(mapRef.current, {
          center: WUPPERTAL_CENTER,
          zoom: 15,
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy'
        });

        mapInstanceRef.current = map;

        // Add Schwebebahn path
        schwebebahnPathRef.current = new google.maps.Polyline({
          path: SCHWEBEBAHN_PATH,
          geodesic: true,
          strokeColor: '#87E69B',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: map
        });

        // Add tree markers
        trees.forEach((tree) => {
          const marker = new google.maps.Marker({
            position: {
              lat: tree.lat,
              lng: tree.lng
            },
            map,
            title: tree.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#87E69B',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
            animation: google.maps.Animation.DROP
          });

          marker.addListener('click', () => onTreeSelect(tree));
          markersRef.current.push(marker);
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      if (schwebebahnPathRef.current) {
        schwebebahnPathRef.current.setMap(null);
      }
    };
  }, [trees, onTreeSelect]);

  return <div ref={mapRef} className="w-full h-[600px] shadow-lg" />;
}

export default Map;

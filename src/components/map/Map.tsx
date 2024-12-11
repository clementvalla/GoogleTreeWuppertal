import { useEffect, useRef } from 'react';
import { Tree } from '../../types/tree';
import { mapLoader } from '../../utils/mapLoader';
import { mapStyles } from '../../utils/mapStyles';
import { SCHWEBEBAHN_PATH } from '../../constants';

interface MapProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
}

// Center on Google Tree location
const MAP_CENTER = {
  lat: 51.259472,
  lng: 7.165083
};

function Map({ trees, onTreeSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const googleRef = useRef<typeof google | null>(null);
  const isInitializedRef = useRef(false);

  // Function to create markers
  const createMarkers = (trees: Tree[], map: google.maps.Map, google: typeof window.google) => {
    console.log('Creating markers for', trees.length, 'trees');
    
    // Clear existing markers
    clearMarkers();

    trees.forEach((tree) => {
      const position = { lat: tree.lat, lng: tree.lng };
      console.log(`Creating marker for ${tree.name} at:`, position);
      
      const markerIcon = tree.id === 'google-tree' ? {
        url: '/gtree_isolated.png',
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      } : {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: '#87E69B',
        scale: 1,
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        anchor: new google.maps.Point(0, 0)
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: tree.name,
        icon: markerIcon
      });

      marker.addListener('click', () => {
        console.log('Marker clicked for tree:', tree.name);
        onTreeSelect(tree);
      });

      markersRef.current.push(marker);
    });
  };

  // Function to clear markers
  const clearMarkers = () => {
    console.log('Clearing', markersRef.current.length, 'existing markers');
    markersRef.current.forEach(marker => {
      if (marker) {
        if (googleRef.current) {
          googleRef.current.maps.event.clearInstanceListeners(marker);
        }
        marker.setMap(null);
      }
    });
    markersRef.current = [];
  };

  // Initialize map
  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement || isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initMap = async () => {
      try {
        console.log('Initializing map...');
        const googleInstance = await mapLoader.load();
        googleRef.current = googleInstance;

        const map = new googleInstance.maps.Map(mapElement, {
          center: MAP_CENTER,
          zoom: 14, // Fixed zoom level that shows all markers
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
        new googleInstance.maps.Polyline({
          path: SCHWEBEBAHN_PATH,
          geodesic: true,
          strokeColor: '#87E69B',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map
        });

        // Create markers after map is initialized
        if (trees.length > 0) {
          console.log('Creating initial markers...');
          createMarkers(trees, map, googleInstance);
        }

        // Add idle listener to log map state
        map.addListener('idle', () => {
          console.log('Map idle. Current bounds:', map.getBounds()?.toString());
          console.log('Current zoom:', map.getZoom());
          console.log('Current center:', map.getCenter()?.toString());
        });

      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      clearMarkers();
      mapInstanceRef.current = null;
      googleRef.current = null;
      isInitializedRef.current = false;
    };
  }, []); // Empty dependency array means this only runs once on mount

  // Update markers when trees prop changes
  useEffect(() => {
    if (mapInstanceRef.current && googleRef.current && trees.length > 0) {
      console.log('Trees data updated, recreating markers');
      createMarkers(trees, mapInstanceRef.current, googleRef.current);
    }
  }, [trees, onTreeSelect]);

  return <div ref={mapRef} className="w-full h-[600px] shadow-lg" />;
}

export default Map;

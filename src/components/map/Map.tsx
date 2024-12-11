import { useEffect, useRef } from 'react';
import { Tree } from '../../types/tree';
import { MapService } from '../../utils/map/mapService';

interface MapProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
}

function Map({ trees, onTreeSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapServiceRef = useRef<MapService | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement || isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initMap = async () => {
      try {
        console.log('Initializing map...');
        const mapService = new MapService();
        await mapService.initialize(mapElement, trees, onTreeSelect);
        mapServiceRef.current = mapService;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapServiceRef.current) {
        mapServiceRef.current.cleanup();
        mapServiceRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []); // Empty dependency array means this only runs once on mount

  // Update markers when trees prop changes
  useEffect(() => {
    if (mapServiceRef.current && trees.length > 0) {
      mapServiceRef.current.updateMarkers(trees, onTreeSelect);
    }
  }, [trees, onTreeSelect]);

  return <div ref={mapRef} className="w-full h-[600px] shadow-lg" />;
}

export default Map;

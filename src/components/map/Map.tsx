import { useEffect, useRef, useState } from 'react';
import { Tree } from '../../types/tree';
import { MapService } from '../../utils/map/mapService';
import SchwebebahnStations from './SchwebebahnStations';

interface MapProps {
  trees: Tree[];
  selectedTree: Tree | null;
  onTreeSelect: (tree: Tree) => void;
}

function Map({ trees, selectedTree, onTreeSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapServiceRef = useRef<MapService | null>(null);
  const isInitializedRef = useRef(false);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

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
        setGoogleMap(mapService.getMap());
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
      setGoogleMap(null);
    };
  }, []); // Empty dependency array means this only runs once on mount

  // Update markers when trees prop changes
  useEffect(() => {
    if (mapServiceRef.current && trees.length > 0) {
      mapServiceRef.current.updateMarkers(trees, onTreeSelect);
    }
  }, [trees, onTreeSelect]);

  // Center map on selected tree
  useEffect(() => {
    if (mapServiceRef.current && selectedTree) {
      mapServiceRef.current.centerOnTree(selectedTree);
    }
  }, [selectedTree]);

  return (
    <div ref={mapRef} className="w-full h-[600px] shadow-lg">
      {googleMap && <SchwebebahnStations map={googleMap} />}
    </div>
  );
}

export default Map;

import { TreeData } from '../types/tree';
import { mapLoader } from './mapLoader';
import { mapStyles } from './mapStyles';
import { WUPPERTAL_CENTER, SCHWEBEBAHN_PATH } from '../constants';

export class MapManager {
  private map: google.maps.Map | null = null;
  private markers: google.maps.Marker[] = [];
  private schwebebahnPath: google.maps.Polyline | null = null;

  async initialize(
    element: HTMLElement,
    trees: TreeData[],
    onTreeSelect: (tree: TreeData) => void
  ) {
    try {
      const google = await mapLoader.load();
      
      this.map = new google.maps.Map(element, {
        center: WUPPERTAL_CENTER,
        zoom: 13,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        clickableIcons: false,
        maxZoom: 18,
        minZoom: 12
      });

      // Add Schwebebahn path
      this.schwebebahnPath = new google.maps.Polyline({
        path: SCHWEBEBAHN_PATH,
        geodesic: true,
        strokeColor: '#87E69B',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: this.map
      });

      // Create marker icon SVG
      const markerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
            <path fill="#87E69B" stroke="#FFFFFF" stroke-width="2" d="M12 2C6.477 2 2 6.477 2 12c0 7.318 8.268 20.675 9.602 22.596.205.295.544.404.844.404.3 0 .639-.109.844-.404C14.732 32.675 22 19.318 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        `),
        size: new google.maps.Size(24, 36),
        scaledSize: new google.maps.Size(24, 36),
        anchor: new google.maps.Point(12, 36),
        origin: new google.maps.Point(0, 0)
      };

      // Add markers
      trees.forEach(tree => {
        const marker = new google.maps.Marker({
          position: {
            lat: tree.location.lat,
            lng: tree.location.lng
          },
          map: this.map,
          title: tree.title,
          icon: markerIcon,
          optimized: false,
          clickable: true
        });

        marker.addListener('click', () => {
          onTreeSelect(tree);
        });

        this.markers.push(marker);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  cleanup() {
    this.markers.forEach(marker => {
      if (marker) {
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
    });
    this.markers = [];

    if (this.schwebebahnPath) {
      this.schwebebahnPath.setMap(null);
    }
  }
}
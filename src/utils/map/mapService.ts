import { Tree } from '../../types/tree';
import { mapLoader } from '../map/loader';
import { DEFAULT_MAP_CONFIG, SCHWEBEBAHN_PATH_CONFIG, DEFAULT_MARKER_ICON, GOOGLE_TREE_MARKER_CONFIG } from './config';
import { SCHWEBEBAHN_PATH } from '../../constants';

export class MapService {
  private map: google.maps.Map | null = null;
  private markers: google.maps.Marker[] = [];
  private schwebebahnPath: google.maps.Polyline | null = null;
  private google: typeof window.google | null = null;

  async initialize(element: HTMLElement, trees: Tree[], onTreeSelect: (tree: Tree) => void): Promise<void> {
    try {
      this.google = await mapLoader.load();
      if (!this.google) throw new Error('Failed to load Google Maps');

      this.map = new this.google.maps.Map(element, DEFAULT_MAP_CONFIG);
      
      // Add Schwebebahn path
      this.schwebebahnPath = new this.google.maps.Polyline({
        ...SCHWEBEBAHN_PATH_CONFIG,
        path: SCHWEBEBAHN_PATH,
        map: this.map
      });

      this.createMarkers(trees, onTreeSelect);
    } catch (error) {
      console.error('Error initializing map:', error);
      throw error;
    }
  }

  getMap(): google.maps.Map | null {
    return this.map;
  }

  private createMarkers(trees: Tree[], onTreeSelect: (tree: Tree) => void): void {
    if (!this.map || !this.google) return;
    const google = this.google; // Local reference to avoid null checks

    this.clearMarkers();

    trees.forEach(tree => {
      const position = { lat: tree.lat, lng: tree.lng };
      
      const markerIcon = tree.id === 'google-tree' 
        ? {
            url: GOOGLE_TREE_MARKER_CONFIG.url,
            scaledSize: new google.maps.Size(
              GOOGLE_TREE_MARKER_CONFIG.width,
              GOOGLE_TREE_MARKER_CONFIG.height
            ),
            anchor: new google.maps.Point(
              GOOGLE_TREE_MARKER_CONFIG.anchorX,
              GOOGLE_TREE_MARKER_CONFIG.anchorY
            )
          }
        : {
            ...DEFAULT_MARKER_ICON,
            anchor: new google.maps.Point(0, 0)
          };

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: tree.name,
        icon: markerIcon
      });

      marker.addListener('click', () => {
        onTreeSelect(tree);
      });

      this.markers.push(marker);
    });
  }

  private clearMarkers(): void {
    if (!this.google) return;
    const google = this.google; // Local reference to avoid null checks

    this.markers.forEach(marker => {
      if (marker) {
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
    });
    this.markers = [];
  }

  updateMarkers(trees: Tree[], onTreeSelect: (tree: Tree) => void): void {
    this.createMarkers(trees, onTreeSelect);
  }

  cleanup(): void {
    this.clearMarkers();
    
    if (this.schwebebahnPath) {
      this.schwebebahnPath.setMap(null);
      this.schwebebahnPath = null;
    }

    this.map = null;
    this.google = null;
  }
}

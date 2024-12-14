import { Tree } from '../../types/tree';
import { mapLoader } from '../map/loader';
import { 
  DEFAULT_MAP_CONFIG, 
  SCHWEBEBAHN_PATH_CONFIG, 
  DEFAULT_MARKER_ICON, 
  SELECTED_MARKER_ICON,
  GOOGLE_TREE_MARKER_CONFIG, 
  SELECTED_GOOGLE_TREE_MARKER_CONFIG 
} from './config';
import { SCHWEBEBAHN_PATH } from '../../constants';

export class MapService {
  private map: google.maps.Map | null = null;
  private markers: Map<string, google.maps.Marker> = new Map();
  private schwebebahnPath: google.maps.Polyline | null = null;
  private google: typeof window.google | null = null;
  private selectedTreeId: string | null = null;

  async initialize(element: HTMLElement, trees: Tree[], onTreeSelect: (tree: Tree) => void): Promise<void> {
    try {
      const google = await mapLoader.load();
      if (!google) throw new Error('Failed to load Google Maps');
      this.google = google;

      this.map = new google.maps.Map(element, DEFAULT_MAP_CONFIG);
      
      // Add Schwebebahn path
      this.schwebebahnPath = new google.maps.Polyline({
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

  centerOnTree(tree: Tree): void {
    if (!this.map) return;
    
    const position = { lat: tree.lat, lng: tree.lng };
    this.map.panTo(position);
    this.map.setZoom(14);

    // Update marker appearance
    this.updateSelectedMarker(tree.id);
  }

  private updateSelectedMarker(treeId: string): void {
    if (!this.google) return;

    // Reset previous selected marker if exists
    if (this.selectedTreeId && this.markers.has(this.selectedTreeId)) {
      const prevMarker = this.markers.get(this.selectedTreeId)!;
      prevMarker.setIcon(
        this.selectedTreeId === 'google-tree' 
          ? {
              url: GOOGLE_TREE_MARKER_CONFIG.url,
              scaledSize: new this.google.maps.Size(
                GOOGLE_TREE_MARKER_CONFIG.width,
                GOOGLE_TREE_MARKER_CONFIG.height
              ),
              anchor: new this.google.maps.Point(
                GOOGLE_TREE_MARKER_CONFIG.anchorX,
                GOOGLE_TREE_MARKER_CONFIG.anchorY
              )
            }
          : {
              ...DEFAULT_MARKER_ICON,
              labelOrigin: new this.google.maps.Point(0, 10)  // Changed to 10 to place below
            }
      );
    }

    // Update new selected marker
    if (this.markers.has(treeId)) {
      const marker = this.markers.get(treeId)!;
      marker.setIcon(
        treeId === 'google-tree'
          ? {
              url: SELECTED_GOOGLE_TREE_MARKER_CONFIG.url,
              scaledSize: new this.google.maps.Size(
                SELECTED_GOOGLE_TREE_MARKER_CONFIG.width,
                SELECTED_GOOGLE_TREE_MARKER_CONFIG.height
              ),
              anchor: new this.google.maps.Point(
                SELECTED_GOOGLE_TREE_MARKER_CONFIG.anchorX,
                SELECTED_GOOGLE_TREE_MARKER_CONFIG.anchorY
              )
            }
          : {
              ...SELECTED_MARKER_ICON,
              labelOrigin: new this.google.maps.Point(0, 15)  // Changed to 15 for selected state
            }
      );
    }

    this.selectedTreeId = treeId;
  }

  private createMarkers(trees: Tree[], onTreeSelect: (tree: Tree) => void): void {
    if (!this.map || !this.google) return;

    this.clearMarkers();

    trees.forEach(tree => {
      const position = { lat: tree.lat, lng: tree.lng };
      
      const markerIcon = tree.id === 'google-tree' 
        ? {
            url: GOOGLE_TREE_MARKER_CONFIG.url,
            scaledSize: new this.google.maps.Size(
              GOOGLE_TREE_MARKER_CONFIG.width,
              GOOGLE_TREE_MARKER_CONFIG.height
            ),
            anchor: new this.google.maps.Point(
              GOOGLE_TREE_MARKER_CONFIG.anchorX,
              GOOGLE_TREE_MARKER_CONFIG.anchorY
            )
          }
        : {
            ...DEFAULT_MARKER_ICON,
            labelOrigin: new this.google.maps.Point(0, 10)  // Changed to 10 to place below
          };

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: tree.name,
        icon: markerIcon,
        label: tree.number ? {
          text: tree.number.toString(),
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'bold'
        } : undefined
      });

      marker.addListener('click', () => {
        onTreeSelect(tree);
      });

      this.markers.set(tree.id, marker);
    });

    // If there's a hash in the URL, highlight that tree's marker
    const hash = window.location.hash.slice(1);
    if (hash) {
      const tree = trees.find(t => t.id === hash);
      if (tree) {
        this.updateSelectedMarker(tree.id);
      }
    }
  }

  private clearMarkers(): void {
    if (!this.google) return;

    this.markers.forEach(marker => {
      google.maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    });
    this.markers.clear();
    this.selectedTreeId = null;
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

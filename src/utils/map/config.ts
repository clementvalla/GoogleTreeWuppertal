import { WUPPERTAL_CENTER } from '../../constants';
import { mapStyles } from './styles';

export const DEFAULT_MAP_CONFIG = {
  center: WUPPERTAL_CENTER,
  zoom: 14,
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
  minZoom: 12,
  draggableCursor: 'default'
} as const;

export const SCHWEBEBAHN_PATH_CONFIG = {
  geodesic: true,
  strokeColor: '#87E69B',
  strokeOpacity: 0.8,
  strokeWeight: 4
} as const;

export const DEFAULT_MARKER_ICON = {
  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
  fillColor: '#87E69B',
  fillOpacity: 1,
  strokeWeight: 2,
  strokeColor: '#FFFFFF',
  scale: 1
} as const;

export const SELECTED_MARKER_ICON = {
  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
  fillColor: '#5BC469',
  fillOpacity: 1,
  strokeWeight: 3,
  strokeColor: '#FFFFFF',
  scale: 1.5
} as const;

export const GOOGLE_TREE_MARKER_CONFIG = {
  url: '/gtree_isolated.png',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 20
} as const;

export const SELECTED_GOOGLE_TREE_MARKER_CONFIG = {
  url: '/gtree_isolated.png',
  width: 60, // 1.5x larger
  height: 60, // 1.5x larger
  anchorX: 30,
  anchorY: 30
} as const;

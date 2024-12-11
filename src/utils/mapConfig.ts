import { mapStyles } from './mapStyles';
import { WUPPERTAL_CENTER } from '../constants';

export const defaultMapConfig: google.maps.MapOptions = {
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
  minZoom: 12,
  draggableCursor: 'default'
};
import { SCHWEBEBAHN_PATH } from '../constants';

export function createSchwebebahnPath(map: google.maps.Map): google.maps.Polyline {
  return new google.maps.Polyline({
    path: SCHWEBEBAHN_PATH,
    geodesic: true,
    strokeColor: '#87E69B',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    map
  });
}
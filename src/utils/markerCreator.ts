import { TreeData } from '../types/tree';

const createMarkerIcon = () => ({
  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
      <path fill="#87E69B" stroke="#FFFFFF" stroke-width="2" d="M12 2C6.477 2 2 6.477 2 12c0 7.318 8.268 20.675 9.602 22.596.205.295.544.404.844.404.3 0 .639-.109.844-.404C14.732 32.675 22 19.318 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  `),
  size: new google.maps.Size(24, 36),
  scaledSize: new google.maps.Size(24, 36),
  anchor: new google.maps.Point(12, 36),
  origin: new google.maps.Point(0, 0)
});

export function createTreeMarkers(
  map: google.maps.Map,
  trees: TreeData[],
  onTreeSelect: (tree: TreeData) => void
): google.maps.Marker[] {
  return trees.map(tree => {
    const marker = new google.maps.Marker({
      position: {
        lat: tree.location.lat,
        lng: tree.location.lng
      },
      map,
      title: tree.title,
      icon: createMarkerIcon(),
      optimized: false,
      clickable: true
    });

    marker.addListener('click', () => {
      // Pan to marker position
      map.panTo(marker.getPosition()!);
      onTreeSelect(tree);
    });

    return marker;
  });
}
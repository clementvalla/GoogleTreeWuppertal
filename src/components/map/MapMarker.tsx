// import { useEffect, useRef } from 'react';
// import { TreeData } from '../../types/tree';

// interface MapMarkerProps {
//   tree: TreeData;
//   map: google.maps.Map;
//   onClick: (tree: TreeData) => void;
// }

// function MapMarker({ tree, map, onClick }: MapMarkerProps) {
//   // const markerRef = useRef<google.maps.Marker | null>(null);

//   // useEffect(() => {
//   //   // Create marker if it doesn't exist
//   //   if (!markerRef.current) {
//   //     markerRef.current = new google.maps.Marker({
//   //       position: {
//   //         lat: tree.location.lat,
//   //         lng: tree.location.lng
//   //       },
//   //       map,
//   //       title: tree.title,
//   //       icon: 'brown_markerA.png',
//   //       animation: google.maps.Animation.DROP
//   //     });

//   //     // Add click listener
//   //     markerRef.current.addListener('click', () => onClick(tree));
//   //   }

//   //   // Cleanup on unmount
//   //   return () => {
//   //     if (markerRef.current) {
//   //       google.maps.event.clearInstanceListeners(markerRef.current);
//   //       markerRef.current.setMap(null);
//   //       markerRef.current = null;
//   //     }
//   //   };
//   // }, [map, tree, onClick]);

//   // return null;
// }

// export default MapMarker;
import { Tree } from '../../types/tree';
import DirectionsButton from './DirectionsButton';

interface TreeDetailsProps {
  tree: Tree;
}

function TreeDetails({ tree }: TreeDetailsProps) {
  // Filter out null or undefined values
  const details = [
    { label: 'Familie', value: tree.family },
    { label: 'Urspr. Vorkommen', value: tree.nativeCountry },
    { label: 'Gepflanzt im Jahr', value: tree.yearPlanted },
    { label: 'Max. Wuchshöhe', value: tree.maxHeight ? `${tree.maxHeight} m` : undefined },
    { label: 'Max. Alter', value: tree.maxAge ? `${tree.maxAge} Jahre` : undefined },
    { label: 'Lebensraum', value: tree.habitat }
  ].filter(detail => detail.value !== null && detail.value !== undefined);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-xl font-normal">{tree.name}</h3>
        <p className="text-base italic text-gray-400">{tree.latinName}</p>
        <div className="mt-1">
          <p className="text-sm uppercase tracking-wide text-[#4BA459]">{tree.schwebebahnStop}</p>
        </div>
      </div>

      <div>
        <DirectionsButton 
          location={{ lat: tree.lat, lng: tree.lng, address: tree.address, schwebebahnStop: tree.schwebebahnStop }} 
          className="bg-[#87E69B] hover:bg-[#5BC469] px-3 py-1.5"
        />
      </div>

      {details.length > 0 && (
        <div className="grid grid-cols-2 gap-y-4">
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-sm text-gray-500">{label}</dt>
              <dd className="text-gray-900">{value}</dd>
            </div>
          ))}
        </div>
      )}

      {tree.features && (
        <div className="prose max-w-none">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Besonderheiten zum Baum</h4>
          <p className="text-gray-700">{tree.features}</p>
        </div>
      )}

      <div className="prose max-w-none">
        <p className="text-gray-700">{tree.description}</p>
      </div>
    </div>
  );
}

export default TreeDetails;

import { TreeData } from '../types';

interface TreeCardProps {
  tree: TreeData;
  onClick: () => void;
}

function TreeCard({ tree, onClick }: TreeCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
    >
      <img
        src={tree.thumbnail}
        alt={tree.name}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 text-left">
        <h3 className="font-bold">{tree.name}</h3>
        <p className="text-gray-600">{tree.species}</p>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">{tree.station.name}</div>
        <div className="text-sm text-gray-500">{tree.station.distance}</div>
      </div>
    </button>
  );
}

export default TreeCard;
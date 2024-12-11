import { Tree } from '../types/tree';

interface TreePopupProps {
  tree: Tree;
  onClose: () => void;
}

function TreePopup({ tree, onClose }: TreePopupProps) {
  return (
    <div className="absolute top-4 right-4 bg-white p-6 shadow-lg max-w-sm rounded-lg">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-2xl leading-none bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-gray-700 transition-colors shadow-md"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <h3 className="text-xl font-bold mb-1">{tree.name}</h3>
      <p className="text-gray-600 italic mb-2">{tree.latinName}</p>
      {tree.maxHeight && (
        <p className="text-sm text-gray-700 mb-2">{tree.maxHeight} m</p>
      )}
      <p className="text-gray-700">{tree.description}</p>
    </div>
  );
}

export default TreePopup;

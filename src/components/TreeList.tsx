import { Tree } from '../types/tree';

interface TreeListProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
}

function TreeList({ trees, onTreeSelect }: TreeListProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">The Tree Collection</h2>
      <div className="divide-y divide-gray-200">
        {trees.map((tree) => (
          <button
            key={tree.id}
            onClick={() => onTreeSelect(tree)}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <img
              src={tree.thumbnail}
              alt={tree.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 text-left">
              <h3 className="font-bold">{tree.name}</h3>
              <p className="text-gray-600">{tree.latinName}</p>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{tree.schwebebahnStop}</div>
              <div className="text-sm text-gray-500">{tree.address}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TreeList;

import { Tree } from '../../types/tree';
import TreeCard from './TreeCard';
import TreeDetails from './TreeDetails';

interface TreeListProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
  expandedTreeId: string | null;
  onTreeExpand: (treeId: string | null) => void;
}

function TreeList({ trees, onTreeSelect, expandedTreeId, onTreeExpand }: TreeListProps) {
  const handleTreeClick = (tree: Tree) => {
    onTreeExpand(expandedTreeId === tree.id ? null : tree.id);
    onTreeSelect(tree);
  };

  return (
    <section id="tree-list">
      <div className="border-t border-b border-black">
        <h2 className="text-2xl font-normal my-6">Die Baumsammlung</h2>
      </div>
      
      <div className="divide-y divide-black">
        {trees.map((tree) => (
          <div key={tree.id}>
            <TreeCard
              tree={tree}
              onClick={() => handleTreeClick(tree)}
              isExpanded={expandedTreeId === tree.id}
            />
            {expandedTreeId === tree.id && (
              <div className="p-6 bg-gray-50">
                <TreeDetails tree={tree} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-black mt-0">
        <p className="text-xs text-gray-400 mt-12 mb-8">
          © 2024 Freiluft, Certain Measures, und Clement Valla
        </p>
      </div>
    </section>
  );
}

export default TreeList;

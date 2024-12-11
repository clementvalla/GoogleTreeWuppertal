import { Tree } from '../../types/tree';

interface TreeSummaryProps {
  tree: Tree;
}

function TreeSummary({ tree }: TreeSummaryProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold">{tree.name}</h3>
        <p className="text-gray-600 italic">{tree.latinName}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-gray-500">Family</dt>
          <dd className="font-medium text-gray-900">{tree.family}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Native to</dt>
          <dd className="font-medium text-gray-900">{tree.nativeCountry}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Height</dt>
          <dd className="font-medium text-gray-900">{tree.maxHeight ? `${tree.maxHeight}m` : '-'}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Age</dt>
          <dd className="font-medium text-gray-900">{tree.maxAge ? `${tree.maxAge} years` : '-'}</dd>
        </div>
      </div>
    </div>
  );
}

export default TreeSummary;

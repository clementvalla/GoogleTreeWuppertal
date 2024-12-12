import { Tree } from '../../types/tree';

interface TreeCardProps {
  tree: Tree;
  onClick: () => void;
  isExpanded: boolean;
}

function TreeCard({ tree, onClick, isExpanded }: TreeCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-gray-50 transition-colors"
    >
      <img
        src={tree.thumbnail}
        alt={tree.name}
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
      />
      <div className="flex-1 text-left">
        <h3 className="text-lg sm:text-xl font-normal">{tree.name}</h3>
        <p className="text-sm sm:text-base italic text-gray-400">{tree.latinName}</p>
        <div className="mt-0.5 sm:mt-1">
          <p className="text-xs sm:text-sm uppercase tracking-wide text-[#4BA459]">{tree.schwebebahnStop}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-gray-400 text-xl sm:text-2xl">
          {isExpanded ? '↑' : '↓'}
        </span>
      </div>
    </button>
  );
}

export default TreeCard;

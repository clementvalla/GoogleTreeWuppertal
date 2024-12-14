import { Tree } from '../../types/tree';
import DirectionsButton from './DirectionsButton';

interface TreePopupProps {
  tree: Tree;
  onClose: () => void;
  onReadMore: (treeId: string) => void;
}

function TreePopup({ tree, onClose, onReadMore }: TreePopupProps) {
  const handleReadMore = () => {
    onReadMore(tree.id);
    
    // Add a small delay to ensure the tree details are expanded
    setTimeout(() => {
      const treeElement = document.getElementById(`tree-${tree.id}`);
      if (treeElement) {
        const headerHeight = 100; // Approximate header height
        const elementPosition = treeElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="absolute top-2 right-2 bg-white p-2 sm:p-4 shadow-lg w-[300px] sm:w-[350px] md:w-[400px]">
      <div className="relative">
        <img
          src={tree.image}
          alt={tree.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors shadow-md rounded-full"
          aria-label="Schließen"
        >
          ×
        </button>
      </div>
      
      <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal">{tree.number}. {tree.name}</h3>
          <p className="text-sm sm:text-base italic text-gray-400">{tree.latinName}</p>
        </div>

        <div>
          <p className="text-xs sm:text-sm uppercase tracking-wide text-[#4BA459]">{tree.address}</p>
          <p className="text-xs sm:text-sm uppercase tracking-wide text-[#4BA459]">Schwebebahn {tree.schwebebahnStop}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <DirectionsButton 
              location={{
                lat: tree.lat,
                lng: tree.lng,
                address: tree.address,
                schwebebahnStop: tree.schwebebahnStop
              }} 
              className="text-xs sm:text-sm py-1.5 px-0 bg-transparent hover:bg-transparent text-black hover:text-gray-700 ml-2 sm:ml-3" 
            />
          </div>
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <button
              onClick={handleReadMore}
              className="flex items-center text-xs sm:text-sm text-black hover:text-gray-700 transition-colors ml-2 sm:ml-3"
            >
              <span className="mr-1">↓</span>
              <span>Mehr Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreePopup;

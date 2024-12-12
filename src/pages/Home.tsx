import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Map from '../components/map/Map';
import TreeList from '../components/tree/TreeList';
import TreePopup from '../components/tree/TreePopup';
import { trees } from '../data/trees';
import type { Tree } from '../types/tree';

function Home() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [expandedTreeId, setExpandedTreeId] = useState<string | null>(null);

  // Handle initial hash and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        const tree = trees.find(t => t.id === hash);
        if (tree) {
          setSelectedTree(tree);
          setExpandedTreeId(tree.id); // Expand the tree in the list
        }
      } else {
        setSelectedTree(null);
        setExpandedTreeId(null);
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree);
    setExpandedTreeId(tree.id); // Expand the tree in the list
    // Update URL hash without page reload
    window.history.pushState(null, '', `#${tree.id}`);
  };

  const handleTreeClose = () => {
    setSelectedTree(null);
    setExpandedTreeId(null);
    // Remove hash without page reload
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleReadMore = (treeId: string) => {
    setExpandedTreeId(treeId);
  };

  return (
    <Layout>
      <Header />

      <div className="relative mb-12">
        <Map
          trees={trees}
          selectedTree={selectedTree}
          onTreeSelect={handleTreeSelect}
        />

        {selectedTree && (
          <TreePopup 
            tree={selectedTree} 
            onClose={handleTreeClose}
            onReadMore={handleReadMore}
          />
        )}
      </div>

      <section className="mb-12">
        <p className="text-gray-700 w-1/2 max-lg:w-3/4 max-sm:w-full mb-8 font-bold">
          Der Google Tree Wuppertal ist eine lebensgroße Skulptur eines aus Google Maps 
          extrahierten Baums in Wuppertal, die im Winter 2024 auf den Fußwegen in der 
          Nähe der Architekturfakultät am Campus Haspel installiert wird. In Zusammenarbeit 
          mit Freiluft dient diese Skulptur als Vorschau auf eine größere Biennale, die für 
          den Sommer 2026 geplant ist.
        </p>
        <div>
          <p className="text-sm text-gray-500 mb-2">in Zusammenarbeit mit</p>
          <img 
            src="/freiluft.png" 
            alt="Freiluft - Festival für Kunst + Stadttransformation" 
            className="h-16" 
          />
        </div>
      </section>

      <TreeList 
        trees={trees} 
        onTreeSelect={handleTreeSelect}
        expandedTreeId={expandedTreeId}
        onTreeExpand={setExpandedTreeId}
      />
    </Layout>
  );
}

export default Home;

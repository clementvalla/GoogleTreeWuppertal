import { useState } from 'react';
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

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree);
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
          onTreeSelect={handleTreeSelect}
        />

        {selectedTree && (
          <TreePopup 
            tree={selectedTree} 
            onClose={() => setSelectedTree(null)}
            onReadMore={handleReadMore}
          />
        )}
      </div>

      <section className="mb-12">
        <p className="text-gray-700 w-1/2 mb-8 font-bold">
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

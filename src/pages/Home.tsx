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
        <div className="text-gray-700 w-1/2 max-lg:w-3/4 max-sm:w-full mb-8 font-bold space-y-4">
          <p>
            Entdecken Sie die Skulptur „Google Tree" von Certain Measures und Clement Valla am Haspel in Wuppertal -in Verbindung mit einer Baumroute, die sie mit der Schwebebahn einmal quer durch Wuppertal führt, immer entlang von Schwebebahn und Wupper.
          </p>
          <p>
            Bäume sind über lange Zeiträume hinweg stille Zeugen des Wandels. Unsere Baumroute lässt Sie die Stadt aus der Perspektive von ausgewählten Bäumen entdecken – eine Reise durch Vergangenheit, Gegenwart und Zukunft Wuppertals. 
          </p>
          <p>
            Schwebebahnticket kaufen - und Bäume finden!
          </p>
          <p>
            Die lebensgroße Skulptur eines aus Google Maps stammenden Baums in Wuppertal dient als Vorschau auf eine größere Biennale, die der Verein <a href="https://freiluft-wuppertal.de/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">FREILUFT Wuppertal</a> für den Sommer 2026 in WUppertal plant.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">iEine Veranstaltung von</p>
          <a href="https://freiluft-wuppertal.de/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/freiluft.png" 
              alt="Freiluft - Festival für Kunst + Stadttransformation" 
              className="h-16" 
            />
          </a>
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

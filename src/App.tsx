import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');

  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
        // Only reload if explicitly navigating from another page to home
        if (e.oldURL.includes('#about') && (hash === '' || hash === '#')) {
          window.location.reload();
        }
      }
    };

    // Set initial page based on hash without reloading
    const hash = window.location.hash;
    if (hash === '#about') {
      setCurrentPage('about');
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return currentPage === 'home' ? <Home /> : <About />;
}

export default App;

import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
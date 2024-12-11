import { useLocation, Link } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  
  return (
    <nav className="absolute top-8 right-8 flex gap-4 font-title text-sm">
      <NavLink 
        to="/" 
        active={location.pathname === '/'} 
        dotColor={isAboutPage ? '#5BC469' : '#87E69B'}
      >
        Home
      </NavLink>
      <NavLink 
        to="/about" 
        active={location.pathname === '/about'}
        dotColor={isAboutPage ? '#5BC469' : '#87E69B'}
      >
        About
      </NavLink>
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  dotColor: string;
  children: React.ReactNode;
}

function NavLink({ to, active, dotColor, children }: NavLinkProps) {
  return (
    <Link to={to} className="flex items-center gap-1">
      {active && (
        <span 
          className="w-2.5 h-2.5 rounded-full" 
          style={{ backgroundColor: dotColor }}
        />
      )}
      <span className="text-black">{children}</span>
    </Link>
  );
}

export default Navigation;
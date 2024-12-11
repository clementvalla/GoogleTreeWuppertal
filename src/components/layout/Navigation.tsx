import { useLocation, Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active: boolean;
  isAboutPage: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, isAboutPage, children }: NavLinkProps) {
  return (
    <Link to={to} className="relative pl-4">
      {active && (
        <span 
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
            isAboutPage ? 'bg-white' : 'bg-[#87E69B]'
          }`}
        />
      )}
      <span className="text-black">{children}</span>
    </Link>
  );
}

function Navigation() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  
  return (
    <nav className="absolute top-8 right-8 flex gap-4 font-title text-sm">
      <NavLink 
        to="/" 
        active={location.pathname === '/'}
        isAboutPage={isAboutPage}
      >
        Home
      </NavLink>
      <NavLink 
        to="/about" 
        active={location.pathname === '/about'}
        isAboutPage={isAboutPage}
      >
        About
      </NavLink>
    </nav>
  );
}

export default Navigation;

interface NavLinkProps {
  href: string;
  active: boolean;
  isAboutPage: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, isAboutPage, children }: NavLinkProps) {
  return (
    <a href={href} className="relative pl-4">
      {active && (
        <span 
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
            isAboutPage ? 'bg-white' : 'bg-green-500'
          }`}
        />
      )}
      <span className="text-black hover:opacity-70 transition-opacity">
        {children}
      </span>
    </a>
  );
}

function Navigation() {
  const hash = window.location.hash;
  const isAboutPage = hash === '#about';
  
  return (
    <nav className="absolute top-8 right-8 flex gap-4 font-title text-sm">
      <NavLink 
        href="#"
        active={!isAboutPage}
        isAboutPage={isAboutPage}
      >
        Home
      </NavLink>
      <NavLink 
        href="#about"
        active={isAboutPage}
        isAboutPage={isAboutPage}
      >
        About
      </NavLink>
    </nav>
  );
}

export default Navigation;

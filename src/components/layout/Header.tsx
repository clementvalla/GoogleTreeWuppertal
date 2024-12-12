function Header() {
  const isAboutPage = window.location.hash === '#about';
  const textColor = isAboutPage ? 'text-white' : 'text-black';
  const accentColor = isAboutPage ? 'text-[#5BC469]' : 'text-[#87E69B]';

  return (
    <header className="py-8">
      <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight title-condensed">
        <span className={`block ${textColor}`}>THE</span>
        <span className={`block ${textColor}`}>GOOGLE TREE</span>
        <span className={`block ${accentColor}`}>WUPPERTAL</span>
        <span className={`block ${accentColor}`}>2024</span>
      </h1>
    </header>
  );
}

export default Header;

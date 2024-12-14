import foundersGrotesk from '../../assets/fonts/TestFoundersGroteskCondensed-Bold.otf';

function Header() {
  const isAboutPage = window.location.hash === '#about';
  const textColor = isAboutPage ? 'text-white' : 'text-black';
  const accentColor = isAboutPage ? 'text-[#5BC469]' : 'text-[#87E69B]';

  return (
    <header className="py-4">
      <style>
        {`
          @font-face {
            font-family: 'Founders Grotesk';
            src: url('${foundersGrotesk}') format('opentype');
            font-weight: bold;
            font-style: normal;
            font-display: block;
          }
        `}
      </style>
      <div className="flex items-end gap-2 sm:gap-4">
        <h1 className="font-title text-4xl sm:text-7xl md:text-8xl font-bold tracking-tight title-condensed">
          <span className={`block -mb-2 sm:-mb-4 md:-mb-6 ${textColor}`}>THE</span>
          <span className={`block -mb-2 sm:-mb-4 md:-mb-6 ${textColor}`}>GOOGLE TREE</span>
          <span className={`block -mb-2 sm:-mb-4 md:-mb-6 ${accentColor}`}>WUPPERTAL</span>
          <span className={`block ${accentColor}`}>2024</span>
        </h1>
        <img 
          src="/gtree_isolated.png" 
          alt="Google Tree Illustration" 
          className="w-16 sm:w-28 md:w-32 h-auto object-contain"
        />
      </div>
    </header>
  );
}

export default Header;

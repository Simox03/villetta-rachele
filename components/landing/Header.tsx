
/**
 * @file components/landing/Header.tsx
 * @purpose Renders the main navigation header for the public-facing site, including a responsive mobile menu.
 */
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  hasVideo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasVideo = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'La Villetta', href: '#property' },
    { name: 'Galleria', href: '#gallery' },
    ...(hasVideo ? [{ name: 'Video', href: '#video' }] : []),
    { name: 'Posizione', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // If we are on the landing page, scroll.
    // Since header is used on Admin too, we might need check. But currently Header is inside LandingPage only? 
    // Actually AdminPage has its own header internal usage or no header? 
    // Let's assume LandingPage usage. App.tsx renders LandingPage which renders Header.

    // Extract target id
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Also close mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className={`text-2xl font-bold font-serif transition-colors ${isScrolled || isMobileMenuOpen ? 'text-slate-800' : 'text-white'} z-50 relative`}>
          Villetta Rachele
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white hover:text-teal-200'}`}
            >
              {link.name}
            </a>
          ))}

          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md">
            Contatti
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-slate-800' : (isScrolled ? 'bg-slate-800' : 'bg-white')}`}></div>
          <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : (isScrolled ? 'bg-slate-800' : 'bg-white')}`}></div>
          <div className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-slate-800' : (isScrolled ? 'bg-slate-800' : 'bg-white')}`}></div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-40`}>
          <nav className="flex flex-col items-center space-y-8 text-lg">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-800 font-bold text-xl hover:text-teal-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg mt-4"
            >
              Contatti
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

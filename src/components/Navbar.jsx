import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck, Star, Sparkles, MessageSquare } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle transparent to solid transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* 2. MAIN NAV BAR */}
      <nav className={`transition-all duration-300 ${
        (isScrolled || isOpen) 
          ? 'bg-white border-b border-slate-200/80 shadow-md py-1.5' 
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            {/* Logo Section */}
            <Link to="/" className="flex items-center group">
              <img 
                src={logoImg} 
                alt="SB Electricals Logo" 
                className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 lg:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `text-[14px] lg:text-[15px] font-bold tracking-wide transition-all duration-300 relative py-1 hover:text-emerald-600 ${
                      isActive 
                        ? 'text-emerald-600' 
                        : 'text-slate-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Action CTA Button */}
            <div className="hidden lg:flex items-center">
              <a 
                href="https://wa.me/918867710294?text=Hello%20SB%20Electricals,%20I%2520am%2520interested%2520in%2520your%2520solar%2520services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs lg:text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="h-4 w-4" />
                <span>Call: +91 88677 10294 / +91 87928 29882</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer menu */}
        <div className={`md:hidden fixed left-0 w-full bg-white z-40 shadow-2xl transition-all duration-300 ease-in-out transform overflow-y-auto ${
          isOpen ? 'translate-x-0 top-[80px] h-[calc(100vh-80px)]' : 'translate-x-full top-[80px] h-[calc(100vh-80px)]'
        }`}>
          <div className="px-4 pt-6 pb-8 space-y-4 shadow-xl border-t border-slate-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500 pl-3' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

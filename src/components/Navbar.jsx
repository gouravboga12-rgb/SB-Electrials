import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle transparent to blur transition on scroll
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

  const handleNavLinkClick = (linkName) => {
    setIsOpen(false);
    if (linkName === 'Contact' && window.innerWidth < 1024) {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      (isScrolled || isOpen)
        ? 'bg-white border-b border-slate-200 shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${(isScrolled || isOpen) ? 'h-20' : 'h-24'}`}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoImg} 
              alt="SB Electricals Logo" 
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${(isScrolled || isOpen) ? 'h-20' : 'h-24'}`} 
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => handleNavLinkClick(link.name)}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 after:transition-all after:duration-300 hover:text-emerald-600 ${
                    isActive 
                      ? 'text-emerald-600 after:w-full' 
                      : 'text-slate-600 hover:after:w-full'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+918867710294" 
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-semibold transition-colors duration-300"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>+91 88677 10294</span>
            </a>
            <Link 
              to="/contact" 
              onClick={() => handleNavLinkClick('Contact')}
              className="bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-600/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Get Free Consultation
            </Link>
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
        (isScrolled || isOpen) ? 'top-20 h-[calc(100vh-80px)]' : 'top-24 h-[calc(100vh-96px)]'
      } ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="px-4 pt-6 pb-8 space-y-4 shadow-xl border-t border-slate-100">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => handleNavLinkClick(link.name)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500 pl-3' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="pt-4 border-t border-slate-100 space-y-4 px-4">
            <a 
              href="tel:+918867710294" 
              className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 py-2 transition-colors duration-300"
            >
              <Phone className="h-5 w-5 text-emerald-600" />
              <span className="font-bold text-lg text-slate-800">+91 88677 10294</span>
            </a>
            <Link
              to="/contact"
              onClick={() => handleNavLinkClick('Contact')}
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-600/20"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

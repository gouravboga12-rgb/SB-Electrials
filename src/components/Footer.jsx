import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Contact', path: '/contact' }
  ];

  const solarServices = [
    { name: 'Residential Solar', path: '/services' },
    { name: 'Commercial Solar', path: '/services' },
    { name: 'System Maintenance', path: '/services' },
    { name: 'System Repair', path: '/services' },
    { name: 'Inverter Installation', path: '/services' },
    { name: 'Annual Contract (AMC)', path: '/services' }
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src={logoImg} 
                alt="SB Electricals Logo" 
                className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 text-left">
              Powering a greener tomorrow with premium solar panel design, installations, and electrical services. 6+ years of engineering trust in Bengaluru.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-semibold">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="text-left">
            <h3 className="text-slate-900 font-bold text-lg tracking-wide mb-6">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-slate-600 hover:text-emerald-600 flex items-center gap-2 group transition-colors duration-300 font-medium"
                  >
                    <ArrowRight className="h-3 w-3 text-emerald-600 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solar Services */}
          <div className="text-left">
            <h3 className="text-slate-900 font-bold text-lg tracking-wide mb-6">Our Services</h3>
            <ul className="space-y-3.5">
              {solarServices.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-sm text-slate-600 hover:text-emerald-600 flex items-center gap-2 group transition-colors duration-300 font-medium"
                  >
                    <ArrowRight className="h-3 w-3 text-emerald-600 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-6 text-left">
            <h3 className="text-slate-900 font-bold text-lg tracking-wide">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed text-slate-600">
                  XFWQ+8WQ, Venkateshwara Layout, Sunkadakatte, Bengaluru, Karnataka 560091
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <a href="tel:+918867710294" className="text-sm text-slate-600 hover:text-emerald-600 font-semibold transition-colors duration-300">
                  +91 88677 10294
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <a href="mailto:sbelectricals013@gmail.com" className="text-sm text-slate-600 hover:text-emerald-600 font-semibold transition-colors duration-300 break-all">
                  sbelectricals013@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="border-t border-slate-200 bg-slate-100 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} SB Electricals. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-slate-800 transition-colors duration-300">About</Link>
            <Link to="/services" className="hover:text-slate-800 transition-colors duration-300">Services</Link>
            <Link to="/contact" className="hover:text-slate-800 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

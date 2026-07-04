import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      // Open WhatsApp with details
      const text = `Hello SB Electricals, I am submitting an enquiry from your footer. Name: ${formData.name}, Phone: ${formData.phone}.`;
      window.open(`https://wa.me/918867710294?text=${encodeURIComponent(text)}`, '_blank');
      setFormData({ name: '', phone: '' });
      setSubmitted(false);
    }, 800);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const solarServices = [
    { name: 'Rooftop Solar Installation', path: '/services' },
    { name: 'Commercial Solar Solutions', path: '/services' },
    { name: 'Solar System Maintenance', path: '/services' },
    { name: 'Solar Inverters & Accessories', path: '/services' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-6 lg:col-span-3 text-left">
            <Link to="/" className="inline-block">
              <img 
                src={logoImg} 
                alt="SB Electricals Logo" 
                className="h-20 w-auto object-contain brightness-110 filter hover:opacity-90" 
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              We provide end-to-end solar solutions for homes, businesses and industries. Switch to solar and save more.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://sbelectricals.in" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-xs text-slate-400 hover:text-emerald-500 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="text-left lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Our Services</h3>
            <ul className="space-y-3">
              {solarServices.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-xs text-slate-400 hover:text-emerald-500 transition-colors duration-300 font-medium"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4 text-left lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-3 text-xs leading-relaxed text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Ground Floor 183/1 Madhura Nagar 2nd main Moodalpalya Nagarbhavi Stage 2, Bengaluru, Bengaluru Urban-560072</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+918867710294" className="hover:text-emerald-500 transition-colors">+91 88677 10294</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500 flex-shrink-0 break-all" />
                <a href="mailto:sbelectricals013@gmail.com" className="hover:text-emerald-500 transition-colors break-all">sbelectricals013@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Enquiry Form */}
          <div className="space-y-4 text-left lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
              <button 
                type="submit"
                disabled={submitted}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.98]"
              >
                {submitted ? 'Opening WhatsApp...' : 'Send Message'}
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-slate-900/60 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} SB Electricals. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-slate-400">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link to="/services" className="hover:text-slate-400">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

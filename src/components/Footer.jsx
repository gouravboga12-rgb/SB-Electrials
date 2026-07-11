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
                className="h-28 w-auto object-contain brightness-110 filter hover:opacity-90" 
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              We provide end-to-end solar solutions for homes, businesses and industries. Switch to solar and save more.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/s_b_electricals_?utm_source=qr&igsh=MTVkb3I4emk2NHBieA==" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
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
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:+918867710294" className="hover:text-emerald-500 transition-colors font-semibold">+91 88677 10294</a>
                  <a href="tel:+918792829882" className="hover:text-emerald-500 transition-colors font-semibold mt-0.5">+91 87928 29882</a>
                </div>
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

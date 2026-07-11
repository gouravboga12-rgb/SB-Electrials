import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Contact() {
  useSEO(
    "Contact Us | SB Electricals - Solar Panel Installations Bengaluru",
    "Get in touch with SB Electricals in Nagarabhavi, Bengaluru. Request a free quote, schedule a site survey, or call +91 88677 10294 for quick consultation."
  );

  useEffect(() => {
    // Check if on mobile or tablet view (screen width < 1024px)
    if (window.innerWidth < 1024) {
      const element = document.getElementById('contact-form');
      if (element) {
        // Smooth scroll to the form section
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const servicesDropdown = [
    "Residential Solar Panel Installation",
    "Commercial Solar Panel Installation",
    "Solar System Maintenance",
    "Solar Panel Repair",
    "Solar Inverter Installation & Replacement",
    "Annual Maintenance Contract (AMC)",
    "General Inquiry"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate sending email/form message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 1500);
  };

  const whatsappNumber = "918867710294";
  const contactWhatsappMsg = encodeURIComponent("Hello SB Electricals, I am contacting you from the Contact Us page regarding solar energy services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${contactWhatsappMsg}`;

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-32 lg:pt-36 bg-white">
      
      {/* 1. HEADER BANNER */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact SB Electricals
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Have a question or ready to schedule your site inspection? Let us know and we'll reply within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. CONTACT LAYOUT */}
      <section id="contact-form" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Info Cards */}
          <div className="lg:col-span-5 space-y-8 text-left" data-aos="fade-right">
            
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Connect Directly</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Office Details & Contact Cards</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Connect with our advisors instantly on WhatsApp, give us a phone call, or drop by our service office in Bengaluru.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Phone card */}
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:border-slate-300 transition-colors duration-300 bg-white">
                <div className="bg-emerald-550/10 bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Call Us Anytime</h4>
                  <div className="flex flex-col">
                    <a href="tel:+918867710294" className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors duration-300">
                      +91 88677 10294
                    </a>
                    <a href="tel:+918792829882" className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors duration-300 mt-1">
                      +91 87928 29882
                    </a>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Available Monday to Saturday</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:border-emerald-300 hover:bg-emerald-50/20 transition-all duration-300 bg-white">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Chat on WhatsApp</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
                    +91 88677 10294
                  </a>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Pre-filled query & fast responses</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:border-slate-300 transition-colors duration-300 bg-white">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Email Support</h4>
                  <a href="mailto:sbelectricals013@gmail.com" className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors duration-300 break-all">
                    sbelectricals013@gmail.com
                  </a>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">For tenders, bids, and quotes</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:border-slate-300 transition-colors duration-300 bg-white">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Office Address</h4>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    Ground Floor 183/1 Madhura Nagar,<br />
                    2nd main Moodalpalya Nagarbhavi Stage 2,<br />
                    Bengaluru, Bengaluru Urban - 560072
                  </p>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:border-slate-300 transition-colors duration-300 bg-white">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Business Hours</h4>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    Mon - Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: Form Panel */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="200">
            <div className="glass-panel p-8 md:p-10 rounded-2xl text-left relative overflow-hidden bg-white/95">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-emerald-600/5 rounded-full blur-xl"></div>
              
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Request Free Consultation</h3>
              <p className="text-xs text-slate-500 mb-8 leading-relaxed font-semibold">
                Fill out this contact form. Our technician will contact you to explain panels, grid syncing, structures, and prices.
              </p>

              {/* Alert Status States */}
              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Request Sent Successfully!</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Thank you. We have received your query. An engineer will reach out to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Incomplete Fields</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Please make sure all form elements are filled out before submitting.
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input 
                      type="text" 
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-colors font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 96768 24255"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-colors font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-colors font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-xs font-bold text-slate-700">Service Required *</label>
                    <select 
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-colors cursor-pointer font-medium"
                      required
                    >
                      <option value="" disabled>Select a Service</option>
                      {servicesDropdown.map((option, index) => (
                        <option key={index} value={option} className="bg-white text-slate-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700">Your Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your roof space, current bill amount, phase requirements..."
                    className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-colors resize-none font-medium"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-600/30 disabled:opacity-50 transition-all duration-300 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>Sending Request...</span>
                  ) : (
                    <>
                      <span>Send Consultation Request</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* 3. GOOGLE MAPS EMBED */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="zoom-in">
        <div className="glass-panel p-2 rounded-2xl shadow-xl relative overflow-hidden h-[400px] bg-white">
          <iframe 
            title="SB Electricals Location Map"
            src="https://maps.google.com/maps?q=Ground%20Floor%20183/1%20Madhura%20Nagar%202nd%20main%20Moodalpalya%20Nagarbhavi%20Stage%202%20Bengaluru%20Bengaluru%20Urban-560072&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '14px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}

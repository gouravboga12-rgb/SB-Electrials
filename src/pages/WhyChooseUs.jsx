import * as Icons from 'lucide-react';
import { features } from '../data/features';
import useSEO from '../hooks/useSEO';

import imgExp from '../assets/images/hero_solar.png';
import imgCert from '../assets/images/solar_maintenance.png';
import imgPrem from '../assets/images/solar_inverter.png';
import imgPrice from '../assets/images/commercial_solar.png';
import imgTime from '../assets/images/residential_solar.png';
import imgSupport from '../assets/images/service_amc.png';
import imgAfter from '../assets/images/solar_repair.png';
import imgEco from '../assets/images/service_residential.png';
import imgCustom from '../assets/images/service_inverter.png';
import imgSafety from '../assets/images/service_maintenance.png';

// Dynamic Icon Component helper
const LucideIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function WhyChooseUs() {
  useSEO(
    "Why Choose Us | SB Electricals - Professional Solar Contractors Bengaluru",
    "Discover the benefits of choosing SB Electricals. 6+ years of experience, certified professionals, premium Tier-1 solar panels, customizable layouts, and dedicated after-sales support."
  );

  const securityMeasures = [
    { title: "Standard Galvanized Structures", desc: "Our structures are built using thick galvanized iron (GI) to resist wind speeds up to 150 km/h." },
    { title: "Double Ground Earthing", desc: "Dual ground points to safely discharge any static charges or high voltage surges directly to earth." },
    { title: "Surge Protection Devices (SPD)", desc: "Class B & C DC and AC surge arrestors to prevent panel or inverter damage during lightning." },
    { title: "Waterproofing Mounting Seals", desc: "All anchor chemical fasteners are sealed with waterproof compound to eliminate roof leaks." }
  ];

  const featureImages = {
    1: imgExp,
    2: imgCert,
    3: imgPrem,
    4: imgPrice,
    5: imgTime,
    6: imgSupport,
    7: imgAfter,
    8: imgEco,
    9: imgCustom,
    10: imgSafety
  };

  const whatsappNumber = "918867710294";
  const generalWhatsappMsg = encodeURIComponent("Hello SB Electricals, I am interested in your solar services. Why Choose Us page convinced me to contact you!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${generalWhatsappMsg}`;

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-32 lg:pt-36 bg-white">
      
      {/* 1. HEADER BANNER */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Advantages
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose SB Electricals
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
            10 core pillars of trust, engineering quality, safety, and customer commitment that set us apart.
          </p>
        </div>
      </section>

      {/* 2. CORE FEATURES GRID WITH IMAGES FOR ALL CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const featImage = featureImages[feat.id] || imgExp;
            return (
              <div
                key={feat.id}
                className="glass-panel p-6 rounded-3xl text-left hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200/80 shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="space-y-4">
                  {/* Image Header with Overlaid Icon */}
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <img 
                      src={featImage} 
                      alt={feat.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-2 rounded-xl text-emerald-600 border border-white/20 shadow-sm">
                      <LucideIcon name={feat.icon} className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">{feat.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SAFETY STANDARDS SECTION WITH EXTRA ACTION IMAGE */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 text-left space-y-6" data-aos="fade-right">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Safety Engineering</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Our Commitment to Absolute Safety & Quality
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Solar grids handle hundreds of volts of Direct Current (DC). A single loose wire or weak mounting weld can cause electrical hazards or leak issues. At SB Electricals, we enforce strict compliance checklists.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl inline-flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300"
                >
                  <Icons.Shield className="h-4 w-4" />
                  <span>View Our Design Standards</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left" data-aos-delay="200">
              {securityMeasures.map((measure, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-xl text-left space-y-2 bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-emerald-700">{measure.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{measure.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Action Visual Banner Image */}
          <div className="mt-16 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100" data-aos="zoom-in">
            <img 
              src={imgCert} 
              alt="SB Electricals technician maintaining solar panels" 
              className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" data-aos="zoom-in">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Upgrade to Solar Energy?
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Join hundreds of happy families and business owners who have optimized their grid connections with SB.
            </p>
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icons.MessageSquare className="h-5 w-5" />
                <span>Start Saving Today via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

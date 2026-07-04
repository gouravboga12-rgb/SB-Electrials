import { useState } from 'react';
import * as Icons from 'lucide-react';
import { services } from '../data/services';
import useSEO from '../hooks/useSEO';

// Dynamic Icon Component helper
const LucideIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Services() {
  useSEO(
    "Solar Panel Installation & Maintenance Services in Bengaluru | SB Electricals",
    "Explore our professional solar panel services in Bengaluru. We provide residential & commercial installations, inverter replacement, panel repairs, and Annual Maintenance Contracts (AMC)."
  );

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const whatsappNumber = "918867710294";
  const generalWhatsappMsg = encodeURIComponent("Hello SB Electricals, I am looking to get details on your solar and electrical services.");
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${generalWhatsappMsg}`;

  // Helper details for each service to show exactly 5 bullet points on their respective cards
  const serviceDetails = {
    1: [
      "Custom load assessment and shade analysis",
      "Tier-1 monocrystalline panels for high efficiency",
      "Structural engineering design and installation",
      "Net-metering connection & BESCOM liaison approvals",
      "25-Year performance warranty on solar cells"
    ],
    2: [
      "System design matching commercial peak load curves",
      "Optimized Return on Investment (ROI) analytics",
      "Heavy duty structural mounts & industrial wiring",
      "Zero-downtime integration with backup generators",
      "Acceleration depreciation tax benefit documentation"
    ],
    3: [
      "Scheduled panel cleaning and dust removal",
      "Electrical wiring assessments and termination checks",
      "Inverter conversion performance checks",
      "Thermal scans to detect panel hot-spots",
      "Detailed performance yield reports post-visit"
    ],
    4: [
      "Smart hybrid inverter installation and configuration",
      "High-capacity, long-life Lithium battery storage systems",
      "Seamless grid and battery auto-switchover setup",
      "Maximize self-consumption and backup during grid outages",
      "Advanced battery monitoring and management interface"
    ],
    5: [
      "Selection of grid-tied or hybrid smart inverters",
      "Proper surge protection devices (SPD) installation",
      "Old inverter swap and calibration checks",
      "Mobile tracking setup for production logs",
      "5 to 10 years extended manufacturer warranty"
    ],
    6: [
      "Quarterly regular wash & maintenance inspections",
      "Priority assistance during sudden outages",
      "Detailed efficiency reports & health statements",
      "Prevention of costly repairs and output degradation",
      "Free emergency troubleshooting visits"
    ]
  };

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-24 lg:pt-28 bg-white">
      
      {/* 1. HEADER BANNER */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Expertise
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Solar Services
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
            High-efficiency renewable energy systems engineered for maximum yield, structural safety, and lifetime durability.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {services.map((service, index) => {
            const isExpanded = expandedIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="glass-panel p-6 rounded-2xl text-left hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="space-y-5">
                  {/* Service Graphic Image */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                        Service {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Expand Toggle Button */}
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-colors duration-300 py-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? (
                      <Icons.ChevronUp className="h-4 w-4" />
                    ) : (
                      <Icons.ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {/* Dynamic Accordion list (only expands this specific card) */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 mt-4 animate-fade-in duration-300 text-left">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">What's Included</h4>
                      <ul className="space-y-2">
                        {serviceDetails[service.id]?.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Icons.CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-slate-600 leading-relaxed font-semibold">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Inquiry Action */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.ctaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-600 border border-emerald-200/50 text-emerald-600 hover:text-white font-bold text-xs w-full py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:shadow-md hover:shadow-emerald-600/20 active:scale-[0.98] transition-all duration-300"
                  >
                    <Icons.MessageCircle className="h-4 w-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ENDING SECTION / CALL TO ACTION */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" data-aos="zoom-in">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Not Sure Which System Fits Your Roof?
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              We offer free consulting sessions. Send us a picture of your terrace structure or upload your latest electricity bill, and our engineers will calculate your perfect solar load match.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icons.MessageSquare className="h-5 w-5" />
                <span>Get Free Solar Consulting</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

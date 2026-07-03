import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { services } from '../data/services';
import { features } from '../data/features';
import { testimonials } from '../data/testimonials';
import heroImg from '../assets/images/hero_solar.png';
import useSEO from '../hooks/useSEO';

// Dynamic Icon Component helper
const LucideIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Home() {
  useSEO(
    "SB Electricals | Premium Solar Energy Solutions & Electrical Services Bengaluru",
    "Switch to green energy with SB Electricals. 6+ years of trusted experience in residential and commercial solar panel installation, repairs, and maintenance in Bengaluru."
  );

  // Expanded state for 6 services inside the homepage services section
  const [expandedServiceIds, setExpandedServiceIds] = useState([]);

  const toggleServiceExpand = (id) => {
    if (expandedServiceIds.includes(id)) {
      setExpandedServiceIds(expandedServiceIds.filter(item => item !== id));
    } else {
      setExpandedServiceIds([...expandedServiceIds, id]);
    }
  };

  // Contact Form state for home page contact section
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service || !formData.message) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 1500);
  };

  // WhatsApp configuration
  const whatsappNumber = "918867710294";
  const bookingWhatsappMsg = encodeURIComponent("Hello SB Electricals, I would like to book a solar service or site inspection.");
  const bookingWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingWhatsappMsg}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello SB Electricals, I am visiting your website and would like a free consultation.")}`;

  // Shared Data Vectors copied from About Page
  const aboutStrengths = [
    "6+ Years of Proven Industry Experience",
    "In-house Certified Solar Engineers & Installers",
    "Expertise in residential rooftops & commercial installations",
    "Comprehensive BESCOM net-metering approvals management",
    "High-converting solar configurations with Tier-1 components",
    "All-inclusive Annual Maintenance Contracts (AMC)"
  ];

  const aboutValues = [
    {
      title: "Quality Workmanship",
      desc: "We enforce precise guidelines on structural strength, mounting, and wiring to deliver systems that operate efficiently for decades.",
      icon: "Award"
    },
    {
      title: "Integrity & Transparency",
      desc: "No hidden charges or low-yield substitutes. We quote realistic production projections and supply authentic Tier-1 materials.",
      icon: "ShieldCheck"
    },
    {
      title: "Rigorous Safety Standards",
      desc: "Our installations integrate proper earthing systems, surge protection devices (SPD), and high-grade breakers to protect lives and properties.",
      icon: "HardHat"
    },
    {
      title: "Customer Satisfaction First",
      desc: "From local BESCOM net-metering liaison to quick troubleshooting, we maintain responsive support channels for our clients.",
      icon: "HeartHandshake"
    }
  ];

  // Service bullet points copied from Services Page (5 items each)
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
      "Prompt response times for system fault fixing",
      "Replacement of bypass diodes and MC4 connectors",
      "Troubleshooting solar generation drops",
      "Structural repair and mounting realignment",
      "In-warranty parts replacement coordination"
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

  // Safety checklist from Why Choose Us Page
  const safetyMeasures = [
    { title: "Standard Galvanized Structures", desc: "Our structures are built using thick galvanized iron (GI) to resist wind speeds up to 150 km/h." },
    { title: "Double Ground Earthing", desc: "Dual ground points to safely discharge any static charges or high voltage surges directly to earth." },
    { title: "Surge Protection Devices (SPD)", desc: "Class B & C DC and AC surge arrestors to prevent panel or inverter damage during lightning." },
    { title: "Waterproofing Mounting Seals", desc: "All anchor chemical fasteners are sealed with waterproof compound to eliminate roof leaks." }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 flex items-center justify-center bg-gradient-to-b from-slate-50 via-slate-100/30 to-white border-b border-slate-200">
        
        {/* Background Image overlay with light tint */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Rooftop solar panels under blue sky" 
            className="w-full h-full object-cover opacity-35 filter brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 text-left" data-aos="fade-up">
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-700 text-xs font-bold tracking-wider uppercase">
                <Icons.Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-600" />
                6+ Years of Solar Expertise
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Powering a Greener Tomorrow with <span className="text-emerald-600">Reliable Solar Energy</span> Solutions
              </h1>

              <p className="text-slate-600 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                SB Electricals provides premium residential and commercial solar panel installation, maintenance, and AMC services across Bengaluru. Make the switch today and reduce your energy costs by up to 90%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={bookingWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icons.MessageCircle className="h-5 w-5" />
                  <span>Book Service</span>
                </a>
                
                <Link
                  to="/services"
                  className="bg-white/90 hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 hover:border-slate-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <span>View All Services</span>
                  <Icons.ArrowRight className="h-4 w-4 text-emerald-600" />
                </Link>
              </div>

            </div>

            {/* Hero Quick Trust Card */}
            <div className="lg:col-span-5 hidden lg:block" data-aos="fade-left" data-aos-delay="300">
              <div className="glass-panel p-8 rounded-2xl shadow-xl relative overflow-hidden space-y-6 bg-white/80">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-600/5 rounded-full blur-xl"></div>
                
                <h3 className="text-lg font-bold text-slate-900 tracking-wide text-left">Why Switch with SB?</h3>
                
                <div className="space-y-4 text-left">
                  <div className="flex gap-3">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 self-start">
                      <Icons.Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Govt. Approved & Certified</h4>
                      <p className="text-xs text-slate-500 mt-0.5">We install top Tier-1 panels adhering to all safety codes.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 self-start">
                      <Icons.Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Instant Bill Reductions</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Start saving electricity charges immediately from Day 1.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 self-start">
                      <Icons.HeartHandshake className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Lifetime Support Commitment</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Prompt maintenance, regular cleanings, and continuous output checks.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Solar Yield Warranty</span>
                  <span className="text-emerald-600 font-extrabold">25 Years</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATISTICS SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-20 -mt-8 px-4" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y-0 divide-x-0 md:divide-x divide-slate-100">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">6+</p>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Years Experience</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">150+</p>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Projects Completed</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">500+</p>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Happy Clients</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">100%</p>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT US SECTION (JOURNEY & CORE VALUES COPIED FROM ABOUT.JSX) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        
        {/* Journey header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Story & Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 text-left space-y-6" data-aos="fade-right">
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Journey</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              6+ Years of Electrical & Solar Innovation
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Founded as a technical electrical services contractor in Bengaluru, SB Electricals quickly evolved to address the growing demand for green and renewable energy. Over the last 6+ years, we have designed and commissioned dozens of rooftop solar plants, scaling from small 2kW residential homes to complex 50kW commercial grids.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We understand that solar installation is not a one-size-fits-all product. That is why we invest heavily in precise site survey tools, load assessments, and structural evaluation. Our focus remains centered on supplying durable equipment and building safe power lines that deliver maximum efficiency year after year.
            </p>
          </div>

          <div className="lg:col-span-5" data-aos="fade-left">
            <div className="glass-panel p-8 rounded-2xl text-left space-y-6 relative overflow-hidden bg-white border border-slate-200 shadow-md">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-emerald-600/5 rounded-full blur-xl"></div>
              <h4 className="text-lg font-bold text-slate-900">Why Customers Trust Us</h4>
              <ul className="space-y-4">
                {aboutStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icons.CheckSquare className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 font-semibold">{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vision & Mission Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {/* Mission Card */}
          <div className="glass-panel p-8 md:p-10 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200 shadow-sm" data-aos="fade-right">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl"></div>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                <Icons.Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                To deliver reliable, high-yield solar energy plants and electrical contracting services that optimize energy bills, increase client asset valuation, and actively reduce carbon emissions throughout Bengaluru.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="glass-panel p-8 md:p-10 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200 shadow-sm" data-aos="fade-left">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl"></div>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                <Icons.Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                To be Bengaluru's most trusted solar integrator and electrical contractor, renowned for our engineering integrity, safety standards, and lifelong customer care programs.
              </p>
            </div>
          </div>
        </div>

        {/* Foundation Core Values */}
        <div className="mt-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3" data-aos="fade-down">
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Foundation</h3>
            <h4 className="text-2xl font-extrabold text-slate-900">The Values We Live By</h4>
            <p className="text-slate-600 text-sm font-medium">
              At SB Electricals, we prioritize safety, quality, and complete transparency in all solar layouts and projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutValues.map((val, idx) => {
              return (
                <div 
                  key={idx} 
                  className="glass-panel p-6 rounded-2xl text-left hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                      <LucideIcon name={val.icon} className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SERVICES SECTION (FULL GRID COPIED FROM SERVICES.JSX WITH TOGGLE ACCORDION) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Offerings
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Premium Solar & Grid Services
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Discover our six core services designed to provide you with continuous, affordable clean electricity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {services.map((service, index) => {
            const isExpanded = expandedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="glass-panel p-6 rounded-2xl text-left hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200 shadow-md"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="space-y-5">
                  {/* Service Graphic Image */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-sm">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-emerald-600 border border-white/20">
                      <LucideIcon name={service.icon} className="h-5 w-5" />
                    </div>
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
                    onClick={() => toggleServiceExpand(service.id)}
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

      {/* ========================================================================= */}
      {/* 5. WHY CHOOSE US SECTION (CORE FEATURES & SAFETY COPIED FROM WHYCHOOSEUS.JSX) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Strengths
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Partner with SB Electricals?
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Discover the features and professional standards that make us the leading solar contractor in Bengaluru.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={feat.id}
              className="glass-panel p-6 rounded-2xl text-left hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="space-y-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                  <LucideIcon name={feat.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{feat.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Standards Block */}
        <div className="mt-24 bg-slate-50/50 border border-slate-200/80 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left space-y-6" data-aos="fade-right">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Safety Engineering</h3>
              <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                Our Commitment to Absolute Safety & Quality
              </h4>
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
              {safetyMeasures.map((measure, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-xl text-left space-y-2 bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-emerald-700">{measure.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{measure.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CONTACT SECTION (FORM & DETAILS COPIED FROM CONTACT.JSX) */}
      {/* ========================================================================= */}
      <section id="home-contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact SB Electricals
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Have a question or ready to schedule your site inspection? Let us know and we'll reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Column 1: Info Cards */}
          <div className="lg:col-span-5 space-y-6 text-left" data-aos="fade-right">
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Connect Directly</h3>
              <h4 className="text-xl md:text-2xl font-bold text-slate-900">Office Details & Contact Cards</h4>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Connect with our advisors instantly on WhatsApp, give us a phone call, or drop by our service office in Bengaluru.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Phone card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start bg-white border border-slate-200 shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">Call Us Anytime</h4>
                  <a href="tel:+918867710294" className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                    +91 88677 10294
                  </a>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Available Monday to Saturday</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start bg-white border border-slate-200 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/10 transition-colors">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">Chat on WhatsApp</h4>
                  <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello SB Electricals, I am contacting you from your Homepage to discuss solar installations.")}`} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    +91 88677 10294
                  </a>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Pre-filled query & fast responses</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start bg-white border border-slate-200 shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">Email Support</h4>
                  <a href="mailto:sbelectricals013@gmail.com" className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors break-all">
                    sbelectricals013@gmail.com
                  </a>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">For tenders, bids, and quotes</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start bg-white border border-slate-200 shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">Office Address</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    XFWQ+8WQ, Venkateshwara Layout,<br />
                    Sunkadakatte, Bengaluru,<br />
                    Karnataka - 560091
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: Form Panel */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="200">
            <div className="glass-panel p-8 rounded-2xl text-left bg-white border border-slate-200 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Request Free Consultation</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-semibold">
                Fill out this contact form. Our technician will contact you to explain panels, grid syncing, structures, and prices.
              </p>

              {/* Alerts */}
              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <Icons.CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                  <Icons.AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Incomplete Fields</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Please make sure all form elements are filled out before submitting.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="homeFullName" className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input 
                      type="text" 
                      id="homeFullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="homePhone" className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="homePhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 96768 24255"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="homeEmail" className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input 
                      type="email" 
                      id="homeEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="homeService" className="text-xs font-bold text-slate-700">Service Required *</label>
                    <select 
                      id="homeService"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors cursor-pointer font-semibold"
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

                <div className="space-y-1.5 text-left">
                  <label htmlFor="homeMessage" className="text-xs font-bold text-slate-700">Your Message *</label>
                  <textarea 
                    id="homeMessage"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your roof space, current bill amount, phase requirements..."
                    className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors resize-none font-semibold"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-600/30 text-white font-bold text-xs w-full py-3.5 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:translate-y-0 cursor-pointer"
                >
                  <Icons.Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Submitting Form...' : 'Send Request'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg border border-slate-200" data-aos="zoom-in">
          <iframe 
            title="SB Electricals Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5255476694666!2d77.502805!3d12.980644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d87b322a31f%3A0x6b8c9d2f2d93e8!2sSunkadakatte%252C%2520Bengaluru%252C%2520Karnataka%2520560091!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TESTIMONIALS SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              We have helped over 500 households and businesses in Bengaluru slash their electricity bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div
                key={test.id}
                className="glass-panel p-8 rounded-2xl text-left bg-white border border-slate-200/80 shadow-md flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="space-y-4">
                  <div className="flex text-emerald-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Icons.Star key={i} className="h-4 w-4 fill-emerald-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 font-bold text-sm">
                    {test.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HOME CTA BANNER */}
      {/* ========================================================================= */}
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

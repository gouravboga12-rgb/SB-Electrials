import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import useSEO from '../hooks/useSEO';

// Local Assets
import heroImg from '../assets/images/hero_solar.png';
import residentialSolarImg from '../assets/images/residential_solar.png';
import commercialSolarImg from '../assets/images/commercial_solar.png';
import solarMaintImg from '../assets/images/solar_maintenance.png';
import solarInverterImg from '../assets/images/solar_inverter.png';
import solarRepairImg from '../assets/images/solar_repair.png';

// Dynamic Icon Component helper
const LucideIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

// CountUp animation component
function CountUp({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        let startTimestamp = null;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Easing function (easeOutQuad)
          const easeProgress = progress * (2 - progress);
          
          setCount(Math.floor(easeProgress * end));
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home() {
  useSEO(
    "SB Electricals | Premium Solar Energy Solutions & Electrical Services Bengaluru",
    "Switch to green energy with SB Electricals. 6+ years of trusted experience in residential and commercial solar panel installation, repairs, and maintenance in Bengaluru."
  );


  // Expanded state for services inside the homepage services section
  const [expandedServiceIds, setExpandedServiceIds] = useState([]);

  const toggleServiceExpand = (id) => {
    if (expandedServiceIds.includes(id)) {
      setExpandedServiceIds(expandedServiceIds.filter(item => item !== id));
    } else {
      setExpandedServiceIds([...expandedServiceIds, id]);
    }
  };

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

  // Contact/Consultation Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: 'Requesting a free consultation and quote.'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const servicesDropdown = [
    "Residential Solar Panel Installation",
    "Commercial Solar Panel Installation",
    "Solar System Maintenance",
    "Solar Hybrid Solutions & Lithium Batteries",
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
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Trigger WhatsApp redirection with consultation details
      const text = `Hello SB Electricals, I would like to book a free solar consultation. Name: ${formData.fullName}, Phone: ${formData.phone}, Email: ${formData.email}, Service: ${formData.service}`;
      window.open(`https://wa.me/918867710294?text=${encodeURIComponent(text)}`, '_blank');

      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        message: 'Requesting a free consultation and quote.'
      });
    }, 1200);
  };

  // WhatsApp numbers and links
  const whatsappNumber = "918867710294";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello SB Electricals, I am visiting your website and would like a free consultation.")}`;

  // ----------------------------------------------------
  // Home Page Solar Calculator State & Handlers
  // ----------------------------------------------------
  const [calcStep, setCalcStep] = useState(1);
  const [calcFormData, setCalcFormData] = useState({
    name: '',
    city: 'Bengaluru',
    otherCity: '',
    pincode: '',
    mobile: '',
    monthlyBill: 3000,
    billFile: null,
    income: '25 - 50 L',
    familyMembers: '3-5',
    bedrooms: '3',
    appliances: {
      ac: 0,
      geyser: 0,
      ev2w: 0,
      ev4w: 'Don\'t Have',
      heater: 0,
      cooler: 0,
      pump: 'Don\'t Have',
    }
  });
  const [calcErrors, setCalcErrors] = useState({});

  const calcCities = ['Bengaluru', 'Hyderabad', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Other'];
  const calcIncomeOptions = ['< 25 L', '25 - 50 L', '50 - 1Cr', '> 1Cr'];
  const calcFamilyOptions = ['1-2', '3-5', '5-7', '7+'];
  const calcBedroomOptions = ['1', '2', '3', '4', '> 4'];

  const handleCalcChange = (field, val) => {
    setCalcFormData(prev => ({ ...prev, [field]: val }));
    if (calcErrors[field]) {
      setCalcErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateCalcAppliance = (app, delta) => {
    setCalcFormData(prev => {
      const current = prev.appliances[app];
      return {
        ...prev,
        appliances: { ...prev.appliances, [app]: Math.max(0, current + delta) }
      };
    });
  };

  const selectCalcAppliance = (app, val) => {
    setCalcFormData(prev => ({
      ...prev,
      appliances: { ...prev.appliances, [app]: val }
    }));
  };

  const validateCalcStep1 = () => {
    const err = {};
    if (!calcFormData.name.trim()) err.name = "Name is required";
    if (calcFormData.city === 'Other' && !calcFormData.otherCity.trim()) {
      err.otherCity = "City name is required";
    }
    if (!calcFormData.pincode.trim()) {
      err.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(calcFormData.pincode)) {
      err.pincode = "Invalid 6-digit Pincode";
    }
    if (!calcFormData.mobile.trim()) {
      err.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(calcFormData.mobile)) {
      err.mobile = "Invalid 10-digit Mobile number";
    }
    setCalcErrors(err);
    return Object.keys(err).length === 0;
  };

  const nextCalcStep = () => {
    if (calcStep === 1) {
      if (validateCalcStep1()) setCalcStep(2);
    } else if (calcStep < 5) {
      setCalcStep(prev => prev + 1);
    }
  };

  const prevCalcStep = () => {
    if (calcStep > 1) setCalcStep(prev => prev - 1);
  };

  // ----------------------------------------------------
  // Home Page Solar Calculations
  // ----------------------------------------------------
  const billVal = parseFloat(calcFormData.monthlyBill) || 0;
  const finalCapacity = Math.min(15, Math.max(1, Math.round((billVal / 1200) * 10) / 10));
  const areaRequired = Math.round(finalCapacity * 100);
  const grossMin = finalCapacity * 60000;
  const grossMax = finalCapacity * 70000;
  const averageGross = (grossMin + grossMax) / 2;

  let subsidy = 0;
  if (finalCapacity <= 1) {
    subsidy = finalCapacity * 30000;
  } else if (finalCapacity <= 2) {
    subsidy = 30000 + (finalCapacity - 1) * 30000;
  } else if (finalCapacity <= 3) {
    subsidy = 60000 + (finalCapacity - 2) * 18000;
  } else {
    subsidy = 78000;
  }
  const finalSubsidy = Math.min(subsidy, grossMin * 0.9);
  const netMin = Math.max(12000, Math.round(grossMin - finalSubsidy));
  const netMax = Math.max(18000, Math.round(grossMax - finalSubsidy));
  const averageNet = (netMin + netMax) / 2;
  const annualSavings = Math.round(billVal * 0.85 * 12);
  const paybackPeriod = annualSavings > 0 ? (averageNet / annualSavings).toFixed(1) : '3.5';
  const co2Offset = (finalCapacity * 1.2).toFixed(1);
  const treesPlanted = Math.round(finalCapacity * 30);

  const buildWhatsAppMessage = () => {
    let msg = `*SB Electricals Home Solar Setup Inquiry*\n\n`;
    msg += `*Customer Details*:\n`;
    msg += `- Name: ${calcFormData.name}\n`;
    msg += `- City: ${calcFormData.city === 'Other' ? calcFormData.otherCity : calcFormData.city}\n`;
    msg += `- Pincode: ${calcFormData.pincode}\n`;
    msg += `- Contact: +91 ${calcFormData.mobile}\n\n`;
    msg += `*Rooftop & Bill Profile*:\n`;
    msg += `- Monthly Bill: ₹${calcFormData.monthlyBill}\n`;
    msg += `- Income Range: ${calcFormData.income}\n`;
    msg += `- Family Size: ${calcFormData.familyMembers} members\n`;
    msg += `- Bedrooms: ${calcFormData.bedrooms}\n\n`;
    msg += `*Appliance Load*:\n`;
    msg += `- ACs: ${calcFormData.appliances.ac}, Geysers: ${calcFormData.appliances.geyser}\n`;
    msg += `- EVs: 2W (${calcFormData.appliances.ev2w}), 4W (${calcFormData.appliances.ev4w})\n\n`;
    msg += `*Estimated Solar Recommendation*:\n`;
    msg += `- Recommended System: *${finalCapacity} kW*\n`;
    msg += `- Required Area: ~${areaRequired} sq.ft.\n`;
    msg += `- Estimated Price: *₹${netMin.toLocaleString('en-IN')} - ₹${netMax.toLocaleString('en-IN')}* (after Govt Subsidy of ₹${finalSubsidy.toLocaleString('en-IN')})\n`;
    msg += `- Approx. Annual Savings: *₹${annualSavings.toLocaleString('en-IN')}*\n`;
    msg += `- Estimated Payback: *${paybackPeriod} years*\n\n`;
    msg += `Please contact me to schedule a technical site survey!`;
    return encodeURIComponent(msg);
  };

  const whatsappUrlHomeCalc = `https://wa.me/918867710294?text=${buildWhatsAppMessage()}`;

  return (
    <div className="relative overflow-hidden min-h-screen bg-white pt-24 lg:pt-24">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section 
        className="relative pt-24 pb-28 lg:pt-36 lg:pb-48 bg-cover bg-center overflow-hidden flex items-center min-h-[75vh]"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Centered or Left Aligned Content Frame */}
          <div className="max-w-3xl space-y-6 text-left" data-aos="fade-up">
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-bold tracking-wider uppercase">
              <Icons.Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              Eco Friendly • Cost Effective • Reliable
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Solar Power for <br />
              <span className="text-emerald-400">a Brighter Tomorrow</span>
            </h1>

            <p className="text-slate-200 text-sm md:text-base max-w-2xl font-semibold leading-relaxed">
              Expert in Solar Panel Installation & Services for Homes, Businesses & Industries. Make the switch today and reduce your energy costs by up to 90%.
            </p>

            {/* Inline Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-slate-100">
                <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                  <Icons.Check className="h-3.5 w-3.5" />
                </div>
                <span>Save on Electricity Bills</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-slate-100">
                <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                  <Icons.Check className="h-3.5 w-3.5" />
                </div>
                <span>High Quality Solar Panels</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-slate-100">
                <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                  <Icons.Check className="h-3.5 w-3.5" />
                </div>
                <span>Expert Installation</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-slate-100">
                <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                  <Icons.Check className="h-3.5 w-3.5" />
                </div>
                <span>After Sales Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#consultation-form"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Get Free Quote</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </a>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                <Icons.MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DYNAMIC CALCULATOR SECTION */}
      {/* ========================================================================= */}
      <section id="consultation-form" className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 lg:-mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 md:p-8 lg:p-10 text-left">
          
          {/* Step Indicator Header (Desktop) */}
          <div className="hidden md:flex justify-between items-center mb-10 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
            {[
              { stepNum: 1, label: "Contact" },
              { stepNum: 2, label: "Usage" },
              { stepNum: 3, label: "Household" },
              { stepNum: 4, label: "Load" },
              { stepNum: 5, label: "Summary" }
            ].map((s, idx) => (
              <div 
                key={idx}
                className={`flex-grow text-center py-3.5 font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 relative ${
                  calcStep === s.stepNum 
                    ? 'bg-slate-900 text-white font-black'
                    : calcStep > s.stepNum
                      ? 'bg-emerald-50 text-emerald-700 border-r border-slate-100'
                      : 'text-slate-400 border-r border-slate-100 bg-white'
                }`}
              >
                {s.stepNum}. {s.label}
              </div>
            ))}
          </div>

          {/* Step Indicator Header (Mobile) */}
          <div className="flex md:hidden justify-between items-center mb-6 bg-slate-50 border border-slate-200 p-3 rounded-xl shadow-inner">
            <button 
              onClick={prevCalcStep}
              disabled={calcStep === 1}
              className="p-1 text-slate-500 disabled:opacity-30 cursor-pointer animate-pulse"
            >
              <Icons.ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Step {calcStep} of 5: {
                calcStep === 1 ? "Contact Details" :
                calcStep === 2 ? "Electricity Usage" :
                calcStep === 3 ? "Household Details" :
                calcStep === 4 ? "Appliance Load" : "Result Summary"
              }
            </div>
            <div className="w-5 h-5"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {calcStep === 1 && (
              <>
                <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    Design Your <span className="text-emerald-600">Rooftop</span> <br />Solar Setup
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                    Estimate your recommended solar capacity, Govt subsidy, net cost, and yearly electricity savings instantly.
                  </p>
                  <div className="space-y-2 pt-2 text-[10px] font-extrabold text-emerald-600">
                    <div className="flex items-center gap-2">
                      <Icons.CheckCircle2 className="h-3.5 w-3.5" />
                      <span>MNRE Approved Vendor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.CheckCircle2 className="h-3.5 w-3.5" />
                      <span>30-Year Performance Warranty</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={calcFormData.name}
                        onChange={(e) => handleCalcChange('name', e.target.value)}
                        className={`w-full bg-slate-50 border ${calcErrors.name ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600`}
                      />
                      {calcErrors.name && <p className="text-[9px] text-red-500 font-bold">{calcErrors.name}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="text"
                        maxLength="10"
                        placeholder="10-digit number"
                        value={calcFormData.mobile}
                        onChange={(e) => handleCalcChange('mobile', e.target.value.replace(/\D/g, ''))}
                        className={`w-full bg-slate-50 border ${calcErrors.mobile ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600`}
                      />
                      {calcErrors.mobile && <p className="text-[9px] text-red-500 font-bold">{calcErrors.mobile}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">City</label>
                      <select
                        value={calcFormData.city}
                        onChange={(e) => handleCalcChange('city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                      >
                        {calcCities.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pincode</label>
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="6-digit pincode"
                        value={calcFormData.pincode}
                        onChange={(e) => handleCalcChange('pincode', e.target.value.replace(/\D/g, ''))}
                        className={`w-full bg-slate-50 border ${calcErrors.pincode ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600`}
                      />
                      {calcErrors.pincode && <p className="text-[9px] text-red-500 font-bold">{calcErrors.pincode}</p>}
                    </div>
                  </div>

                  {calcFormData.city === 'Other' && (
                    <div className="space-y-1 animate-fade-in">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Enter City Name</label>
                      <input 
                        type="text"
                        placeholder="Enter your city name"
                        value={calcFormData.otherCity}
                        onChange={(e) => handleCalcChange('otherCity', e.target.value)}
                        className={`w-full bg-slate-50 border ${calcErrors.otherCity ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600`}
                      />
                      {calcErrors.otherCity && <p className="text-[9px] text-red-500 font-bold">{calcErrors.otherCity}</p>}
                    </div>
                  )}

                  <div className="pt-2 text-right">
                    <button
                      onClick={nextCalcStep}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {calcStep === 2 && (
              <>
                <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
                  <button onClick={prevCalcStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold mb-2 cursor-pointer">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Electricity Bill</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">Let's check your last month's bill details to calculate the sizing and cost payback period.</p>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-slate-700">Last Monthly Bill Amount</span>
                      <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-emerald-700 font-black text-xs flex items-center gap-1">
                        <span>₹</span>
                        <input 
                          type="number"
                          value={calcFormData.monthlyBill}
                          onChange={(e) => handleCalcChange('monthlyBill', Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 bg-transparent text-right focus:outline-none font-black"
                        />
                      </div>
                    </div>
                    <input 
                      type="range"
                      min="500"
                      max="50000"
                      step="250"
                      value={calcFormData.monthlyBill}
                      onChange={(e) => handleCalcChange('monthlyBill', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-extrabold">
                      <span>₹500</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 text-center bg-slate-50/50">
                    <p className="text-[10px] text-slate-400 font-bold">Have a copy of the bill? You can upload it during site surveys.</p>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={nextCalcStep}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {calcStep === 3 && (
              <>
                <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
                  <button onClick={prevCalcStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold mb-2 cursor-pointer">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Household Sizing</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">Helps us evaluate load configurations for household members and roof structural dimensions.</p>
                </div>

                <div className="lg:col-span-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Annual Household Income</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {calcIncomeOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleCalcChange('income', opt)}
                          className={`py-2 px-3 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            calcFormData.income === opt
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Family Members</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {calcFamilyOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleCalcChange('familyMembers', opt)}
                          className={`py-2 px-3 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            calcFormData.familyMembers === opt
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Bedrooms</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {calcBedroomOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleCalcChange('bedrooms', opt)}
                          className={`py-2 px-3 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            calcFormData.bedrooms === opt
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={nextCalcStep}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {calcStep === 4 && (
              <>
                <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
                  <button onClick={prevCalcStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold mb-2 cursor-pointer">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Appliance Load</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">Specify heavy appliances to help us estimate peak load and switchover requirements.</p>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Air Conditioner</h4>
                        <p className="text-[9px] text-slate-400 font-bold">1.5 Ton splits</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button onClick={() => updateCalcAppliance('ac', -1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">-</button>
                        <span className="text-xs font-black text-slate-800 w-4 text-center">{calcFormData.appliances.ac}</span>
                        <button onClick={() => updateCalcAppliance('ac', 1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Water Geyser</h4>
                        <p className="text-[9px] text-slate-400 font-bold">Bathrooms geysers</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button onClick={() => updateCalcAppliance('geyser', -1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">-</button>
                        <span className="text-xs font-black text-slate-800 w-4 text-center">{calcFormData.appliances.geyser}</span>
                        <button onClick={() => updateCalcAppliance('geyser', 1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">EV 2-Wheeler</h4>
                        <p className="text-[9px] text-slate-400 font-bold">Scooter chargers</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button onClick={() => updateCalcAppliance('ev2w', -1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">-</button>
                        <span className="text-xs font-black text-slate-800 w-4 text-center">{calcFormData.appliances.ev2w}</span>
                        <button onClick={() => updateCalcAppliance('ev2w', 1)} className="w-7 h-7 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-xs cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">EV 4-Wheeler</h4>
                        <p className="text-[9px] text-slate-400 font-bold">Car chargers</p>
                      </div>
                      <select
                        value={calcFormData.appliances.ev4w}
                        onChange={(e) => selectCalcAppliance('ev4w', e.target.value)}
                        className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-[10px] text-slate-700 font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="Don't Have">Don't Have</option>
                        <option value="1 Car">1 Car</option>
                        <option value="2 Cars">2 Cars</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={nextCalcStep}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Calculate Solar Setup
                    </button>
                  </div>
                </div>
              </>
            )}

            {calcStep === 5 && (
              <div className="lg:col-span-12 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <button onClick={prevCalcStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold cursor-pointer">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back to Load</span>
                  </button>
                  <button 
                    onClick={() => {
                      setCalcStep(1);
                      setCalcFormData({
                        name: '',
                        city: 'Bengaluru',
                        otherCity: '',
                        pincode: '',
                        mobile: '',
                        monthlyBill: 3000,
                        billFile: null,
                        income: '25 - 50 L',
                        familyMembers: '3-5',
                        bedrooms: '3',
                        appliances: { ac: 0, geyser: 0, ev2w: 0, ev4w: 'Don\'t Have', heater: 0, cooler: 0, pump: 'Don\'t Have' }
                      });
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 text-center space-y-1">
                    <Icons.Cpu className="h-6 w-6 text-emerald-600 mx-auto" />
                    <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Recommended Setup</h4>
                    <p className="text-2xl font-black text-slate-900">{finalCapacity} kW</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 text-center space-y-1">
                    <Icons.Grid className="h-6 w-6 text-emerald-600 mx-auto" />
                    <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Required Roof Space</h4>
                    <p className="text-2xl font-black text-slate-900">~{areaRequired} sq.ft</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 text-center space-y-1">
                    <Icons.BadgePercent className="h-6 w-6 text-emerald-600 mx-auto" />
                    <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Govt. Subsidy</h4>
                    <p className="text-2xl font-black text-slate-900">₹{finalSubsidy.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 text-center space-y-1">
                    <Icons.Clock className="h-6 w-6 text-emerald-600 mx-auto" />
                    <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Payback Period</h4>
                    <p className="text-2xl font-black text-slate-900">~{paybackPeriod} Years</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-150">
                  <div className="space-y-4 text-left">
                    <h4 className="text-sm font-bold text-slate-800">Financial Summary</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between font-semibold text-slate-500">
                        <span>Average Gross Setup Cost</span>
                        <span>₹{grossMin.toLocaleString('en-IN')} - ₹{grossMax.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-emerald-600">
                        <span>Govt Subsidy (PM Surya Ghar)</span>
                        <span>- ₹{finalSubsidy.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-black text-slate-900 border-t border-slate-200 pt-2 text-sm">
                        <span>Net Investment Cost Range</span>
                        <span>₹{netMin.toLocaleString('en-IN')} - ₹{netMax.toLocaleString('en-IN')}*</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">Lock in your Savings</h4>
                      <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">Click the button below to send your load configurations directly to our engineering desk via WhatsApp to schedule a site validation check.</p>
                    </div>
                    <a
                      href={whatsappUrlHomeCalc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                    >
                      <Icons.MessageCircle className="h-4.5 w-4.5" />
                      <span>Send Setup Configurations via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STATISTICS BAR SECTION */}
      {/* ========================================================================= */}
      <section className="bg-slate-950 text-white py-12 mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            
            <div className="flex flex-col items-center justify-center space-y-2.5 p-3 hover:scale-105 transition-transform duration-300">
              <Icons.ShieldCheck className="h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-black text-white tracking-tight">
                <CountUp end={6} suffix="+" duration={1500} />
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Years of Experience</div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2.5 p-3 hover:scale-105 transition-transform duration-300">
              <Icons.Users className="h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-black text-white tracking-tight">
                <CountUp end={500} suffix="+" duration={1800} />
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Happy Customers</div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2.5 p-3 hover:scale-105 transition-transform duration-300">
              <Icons.CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-black text-white tracking-tight">
                <CountUp end={100} suffix="+" duration={1800} />
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Projects Completed</div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2.5 p-3 hover:scale-105 transition-transform duration-300">
              <Icons.Award className="h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-black text-white tracking-tight">
                <CountUp end={100} suffix="%" duration={1800} />
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Quality Assurance</div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2.5 p-3 hover:scale-105 transition-transform duration-300 col-span-2 md:col-span-1">
              <Icons.Leaf className="h-8 w-8 text-emerald-500" />
              <div className="text-3xl font-black text-white tracking-tight">Eco</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Friendly Solutions</div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ABOUT US SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Image Column */}
          <div className="lg:col-span-5 relative" data-aos="fade-right">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img 
                src={residentialSolarImg} 
                alt="Solar Panels Rooftop SB Electricals" 
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent"></div>
            </div>
            
            {/* Experience Floating Badge */}
            <div className="absolute bottom-6 left-6 bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-5 text-left max-w-[190px]">
              <div className="text-4xl font-black text-emerald-600 leading-none">6+</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mt-2 leading-snug">Years of Solar Experience</div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 text-left space-y-6" data-aos="fade-left">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              About SB Electricals
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Powering Clean Energy <br />for <span className="text-emerald-600">a Sustainable Future</span>
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              SB Electricals is a trusted name in solar panel installation and maintenance. With over 6 years of experience, we deliver high-quality, cost-effective and eco-friendly solar solutions tailored to your needs.
            </p>

            {/* Checklist */}
            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-extrabold text-slate-700 leading-snug">Residential, Commercial & Industrial Solar Solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-extrabold text-slate-700 leading-snug">Premium Quality Solar Panels & Inverters</span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-extrabold text-slate-700 leading-snug">Professional Installation by Expert Team</span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-extrabold text-slate-700 leading-snug">Maintenance & After Sales Support</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Know More About Us</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Solar Solutions
          </h2>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.slice(0, 4).map((service, index) => {
            const isExpanded = expandedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="glass-panel p-6 rounded-2xl text-left hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200 shadow-md animate-fade-in"
                data-aos="zoom-in"
                data-aos-delay={index * 80}
              >
                <div className="space-y-5">
                  {/* Service Graphic Image */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-sm">
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
                    onClick={() => toggleServiceExpand(service.id)}
                    className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-colors duration-300 py-1 cursor-pointer"
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

        {/* Redirection View All Services Button */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>View All Services</span>
            <Icons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE US SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text details */}
          <div className="lg:col-span-7 text-left space-y-6" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Why Choose Us?
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Choose SB Electricals?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              We are committed to providing the best solar solutions with quality products, expert installation and excellent customer support.
            </p>
            
            {/* 2x2 trust metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex gap-4">
                <div className="bg-emerald-50 p-3.5 rounded-2xl text-emerald-600 h-fit">
                  <Icons.Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Experienced Team</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Skilled & certified professionals</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-emerald-50 p-3.5 rounded-2xl text-emerald-600 h-fit">
                  <Icons.ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Quality Products</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Only branded & certified equipment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-emerald-50 p-3.5 rounded-2xl text-emerald-600 h-fit">
                  <Icons.DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Affordable Pricing</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Best solutions within your budget</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-emerald-50 p-3.5 rounded-2xl text-emerald-600 h-fit">
                  <Icons.Headphones className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">After Sales Support</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Dedicated support whenever you need</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5" data-aos="fade-left">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src={solarRepairImg} 
                alt="Installer mounting solar panels on GI structures" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 8. TESTIMONIALS SECTION (HAPPY CUSTOMERS) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              What Our Customers Say
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Happy Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((test, index) => (
              <div
                key={test.id}
                className="glass-panel p-8 rounded-3xl text-left bg-white border border-slate-200/80 shadow-md flex flex-col justify-between hover:border-emerald-200 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Icons.Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-bold italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 font-extrabold text-sm">
                    {test.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHY GO SOLAR? */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Why Go Solar?
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Save Money. Save Planet.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center space-y-3.5" data-aos="fade-up" data-aos-delay="0">
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100">
              <Icons.TrendingDown className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Reduce Electricity Bills</h4>
          </div>

          <div className="flex flex-col items-center text-center space-y-3.5" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100">
              <Icons.Leaf className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Clean & Green Energy</h4>
          </div>

          <div className="flex flex-col items-center text-center space-y-3.5" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100">
              <Icons.Home className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Increase Property Value</h4>
          </div>

          <div className="flex flex-col items-center text-center space-y-3.5" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100">
              <Icons.ShieldAlert className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Low Maintenance & Long Life</h4>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. READY TO GO SOLAR (FINAL CTA BLOCK) */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" data-aos="zoom-in">
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Ready to Go Solar?</h3>
              <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Get a Free Site Inspection & Quotation Today!
              </h4>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="tel:+918867710294"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-300"
                >
                  <Icons.Phone className="h-4 w-4" />
                  <span>Call or WhatsApp: +91 88677 10294</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Icons.MessageCircle className="h-4 w-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
            
            {/* Right side illustration icon card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md w-fit mx-auto">
                <Icons.Home className="h-16 w-16 text-emerald-600 mx-auto" />
                <p className="text-[10px] font-bold text-slate-400 mt-2 text-center uppercase tracking-widest">Premium Solar Setup</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

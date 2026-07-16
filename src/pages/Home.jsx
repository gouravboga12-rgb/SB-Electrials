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

// Gallery Preview Images
import galleryImg9 from '../assets/images/gallery/gallery_9.png';
import galleryImg10 from '../assets/images/gallery/gallery_10.png';
import galleryImg11 from '../assets/images/gallery/gallery_11.png';
import galleryImg12 from '../assets/images/gallery/gallery_12.png';

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
  // Home Page Solar Calculator State & Handlers (Rebuilt)
  // ----------------------------------------------------
  const [homeCalcType, setHomeCalcType] = useState('monthly'); // 'monthly' or 'daily'
  const [homeCalcInput, setHomeCalcInput] = useState(500);

  const [homeLeadForm, setHomeLeadForm] = useState({
    name: '',
    mobile: '',
    city: 'Bengaluru',
    otherCity: '',
    pincode: ''
  });
  const [homeErrors, setHomeErrors] = useState({});

  const homeCities = ['Bengaluru', 'Hyderabad', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Other'];

  const handleHomeLeadChange = (field, val) => {
    setHomeLeadForm(prev => ({ ...prev, [field]: val }));
    if (homeErrors[field]) {
      setHomeErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleHomeCalcReset = () => {
    setHomeCalcInput(500);
    setHomeCalcType('monthly');
    setHomeLeadForm({
      name: '',
      mobile: '',
      city: 'Bengaluru',
      otherCity: '',
      pincode: ''
    });
    setHomeErrors({});
  };

  const formatHomeCurrency = (num) => {
    if (isNaN(num) || num === 0) return '0';
    const str = Math.round(num).toString();
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  // Calculations
  const homeMonthlyUnits = homeCalcType === 'monthly' ? Number(homeCalcInput) : Number(homeCalcInput) * 30;
  const homeDailyUnits = homeCalcType === 'monthly' ? Number(homeCalcInput) / 30 : Number(homeCalcInput);
  const homeCapacity = homeCalcType === 'monthly' ? (Number(homeCalcInput) / 120) : ((Number(homeCalcInput) * 30) / 120);
  const homeEstimatedCost = homeCapacity * 70000;
  const homeTariffRate = 8;
  const homeDailyCharges = homeDailyUnits * homeTariffRate;
  const homeMonthlyCharges = homeMonthlyUnits * homeTariffRate;

  const validateHomeCalcForm = () => {
    const err = {};
    if (!homeLeadForm.name.trim()) err.name = "Name is required";
    if (!homeLeadForm.mobile.trim()) {
      err.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(homeLeadForm.mobile)) {
      err.mobile = "Invalid 10-digit Mobile number";
    }
    if (homeLeadForm.city === 'Other' && !homeLeadForm.otherCity.trim()) {
      err.otherCity = "City name is required";
    }
    if (!homeLeadForm.pincode.trim()) {
      err.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(homeLeadForm.pincode)) {
      err.pincode = "Invalid 6-digit Pincode";
    }
    setHomeErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildHomeWhatsAppMessage = () => {
    const costVal = formatHomeCurrency(homeEstimatedCost);
    const capVal = homeCapacity.toFixed(2);
    const monthlyVal = Math.round(homeMonthlyUnits);
    const dailyVal = homeDailyUnits.toFixed(2);

    let msg = `*SB Electricals - Home Solar Inquiry*\n\n`;
    msg += `*Customer Details*:\n`;
    msg += `- Name: ${homeLeadForm.name}\n`;
    msg += `- Mobile: +91 ${homeLeadForm.mobile}\n`;
    msg += `- City: ${homeLeadForm.city === 'Other' ? homeLeadForm.otherCity : homeLeadForm.city}\n`;
    msg += `- Pincode: ${homeLeadForm.pincode}\n\n`;
    msg += `*Solar Estimation Details*:\n`;
    msg += `- Input Mode: ${homeCalcType === 'monthly' ? 'Monthly Consumption' : 'Daily Consumption'}\n`;
    msg += `- Entered Value: ${homeCalcInput} units\n`;
    msg += `- Monthly Consumption: ${monthlyVal} units/month\n`;
    msg += `- Daily Consumption: ${dailyVal} units/day\n`;
    msg += `- Required Capacity: *${capVal} kW*\n`;
    msg += `- Estimated Cost: *₹ ${costVal}*\n\n`;
    msg += `Please contact me to schedule a technical site survey!`;
    return encodeURIComponent(msg);
  };

  const handleHomeCalcSubmit = (e) => {
    e.preventDefault();
    if (validateHomeCalcForm()) {
      const whatsappUrl = `https://wa.me/918867710294?text=${buildHomeWhatsAppMessage()}`;
      window.open(whatsappUrl, '_blank');
    }
  };


  // ----------------------------------------------------
  // Home Page Contact Form State & Handlers
  // ----------------------------------------------------
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitStatus, setContactSubmitStatus] = useState(null);

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactFormData.fullName || !contactFormData.phone || !contactFormData.email || !contactFormData.service || !contactFormData.message) {
      setContactSubmitStatus('error');
      return;
    }
    setIsContactSubmitting(true);
    setContactSubmitStatus(null);
    setTimeout(() => {
      setIsContactSubmitting(false);
      setContactSubmitStatus('success');
      // Redirect to WhatsApp with the contact details
      const text = `Hello SB Electricals, I am contacting you from the Home page regarding solar services. Name: ${contactFormData.fullName}, Phone: ${contactFormData.phone}, Email: ${contactFormData.email}, Service: ${contactFormData.service}, Message: ${contactFormData.message}`;
      window.open(`https://wa.me/918867710294?text=${encodeURIComponent(text)}`, '_blank');
      setContactFormData({
        fullName: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-white pt-32 lg:pt-32">
      
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
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                <Icons.LayoutGrid className="h-5 w-5" />
                <span>View All Services</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DYNAMIC CALCULATOR SECTION */}
      {/* ========================================================================= */}
      <section id="consultation-form" className="relative z-30 max-w-2xl mx-auto px-4 -mt-8 lg:-mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 md:p-8 relative text-left space-y-6">
          
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 pr-8">
              Cost Estimation Calculator
            </h3>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Enter your monthly electricity consumption to get an estimate
            </p>
          </div>

          {/* Input block */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Monthly Consumption (Units)
            </label>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200">
              <input 
                type="number"
                min="0"
                value={homeCalcInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setHomeCalcInput(val === '' ? '' : Math.max(0, parseFloat(val) || 0));
                }}
                className="w-full bg-white focus:bg-slate-50/50 px-5 py-4 text-2xl font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Enter units"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
                units
              </span>
            </div>
          </div>

          {/* Results block (Gradient matches image copy 8.png) */}
          <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-2xl p-5 text-white space-y-4 shadow-lg shadow-indigo-500/20">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-indigo-100">Daily Consumption:</span>
              <span className="text-base font-extrabold">
                {homeDailyUnits.toFixed(2)} units/day
              </span>
            </div>
            <div className="flex justify-between items-end pt-1">
              <span className="text-xs font-bold text-indigo-100 mb-1 block">Required Capacity:</span>
              <span className="text-3xl font-black tracking-tight">
                {homeCapacity.toFixed(2)} kW
              </span>
            </div>
          </div>

          {/* Premium Savings Callout (Choose Solar benefits) */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3 text-slate-700">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 mt-0.5 flex-shrink-0">
              <Icons.TrendingUp className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-emerald-850">
                Save up to 90% on Electricity Bills
              </h4>
              <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                By switching to solar, your monthly electricity bills can be saved up to <strong>90%</strong>, and you can even <strong>generate revenue</strong> by selling surplus clean energy back to the grid.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic mt-2">
            * This is an approximate estimate. Final pricing may vary based on installation requirements.
          </p>
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
      {/* 5.5. GALLERY PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Installation Showcase
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Take a look at a few of our completed rooftop solar installations across Bengaluru.
          </p>
        </div>

        {/* 4-Image Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { src: galleryImg9, alt: 'Solar Panel Installation' },
            { src: galleryImg10, alt: 'Rooftop Solar Setup' },
            { src: galleryImg11, alt: 'Residential Solar Installation' },
            { src: galleryImg12, alt: 'Commercial Solar Array' }
          ].map((img, idx) => (
            <div 
              key={idx} 
              className="relative group rounded-2xl overflow-hidden shadow-md border border-slate-150 aspect-[4/3] bg-slate-50 cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center" data-aos="fade-up">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>View All Gallery</span>
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
      <section className="py-24 bg-slate-50/30 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              What Our Customers Say
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Happy Customers
            </h2>
          </div>

        </div>

        {/* Full-width scrolling container */}
        <div className="marquee-container py-4">
          <div className="marquee-track flex gap-6 px-4">
            {[...testimonials, ...testimonials].map((test, index) => (
              <div
                key={`${test.id}-${index}`}
                className="glass-panel p-8 rounded-3xl text-left bg-white border border-slate-200/80 shadow-md flex flex-col justify-between hover:border-emerald-200 transition-all duration-300 w-[290px] sm:w-[350px] md:w-[400px] flex-shrink-0"
              >
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Icons.Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-bold italic h-24 overflow-y-auto pr-1">
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
                  <span>Call: +91 88677 10294 / +91 87928 29882</span>
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

      {/* ========================================================================= */}
      {/* 11. CONTACT US LAYOUT (Embedded from Contact Page) */}
      {/* ========================================================================= */}
      <section id="contact-us-embedded" className="py-20 border-t border-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Info Cards */}
          <div className="lg:col-span-5 space-y-8 text-left" data-aos="fade-right">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Connect Directly
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Office Details & Contact Cards</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                Connect with our engineering advisors instantly on WhatsApp, give us a phone call, or drop by our service office in Bengaluru.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Phone card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start border border-slate-200 bg-white shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400">Call Us Anytime</h4>
                  <div className="flex flex-col">
                    <a href="tel:+918867710294" className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                      +91 88677 10294
                    </a>
                    <a href="tel:+918792829882" className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors mt-0.5">
                      +91 87928 29882
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Monday to Saturday: 9am - 7pm</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start border border-slate-200 bg-white shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400">Chat on WhatsApp</h4>
                  <a href={`https://wa.me/918867710294?text=${encodeURIComponent("Hello SB Electricals, I am contacting you from the Home page regarding solar services.")}`} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    +91 88677 10294
                  </a>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Pre-filled query & fast responses</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start border border-slate-200 bg-white shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400">Email Support</h4>
                  <a href="mailto:sbelectricals013@gmail.com" className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors break-all">
                    sbelectricals013@gmail.com
                  </a>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">For tenders, bids, and quotes</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-panel p-5 rounded-2xl flex gap-4 items-start border border-slate-200 bg-white shadow-sm">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Icons.MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400">Office Address</h4>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    Ground Floor 183/1 Madhura Nagar,<br />
                    2nd main Moodalpalya Nagarbhavi Stage 2,<br />
                    Bengaluru, Bengaluru Urban - 560072
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Form Panel */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="glass-panel p-8 md:p-10 border border-slate-200 rounded-3xl text-left bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Request Free Consultation</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-semibold">
                Fill out our consultation form. Our technician will contact you to explain solar panels, structures, and pricing ranges.
              </p>

              {contactSubmitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <Icons.CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Request Sent Successfully!</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-semibold">
                      Thank you. We have received your query. An engineer will reach out to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {contactSubmitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <Icons.AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Incomplete Fields</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-semibold">
                      Please make sure all form elements are filled out before submitting.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={contactFormData.fullName}
                      onChange={handleContactInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactInputChange}
                      placeholder="e.g. 96768 24255"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Service Required *</label>
                    <select 
                      name="service"
                      value={contactFormData.service}
                      onChange={handleContactInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer font-bold"
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

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Your Message *</label>
                  <textarea 
                    name="message"
                    rows="3"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    placeholder="Provide details about your roof space, current bill amount, requirements..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 resize-none font-bold"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 transition-all duration-300 cursor-pointer active:scale-[0.99] text-xs uppercase tracking-wider"
                >
                  {isContactSubmitting ? <span>Sending...</span> : <span>Send Consultation Request</span>}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 12. GOOGLE MAPS EMBED */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="zoom-in">
        <div className="glass-panel p-1.5 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden h-[350px] bg-white">
          <iframe 
            title="SB Embedded Maps"
            src="https://maps.google.com/maps?q=Ground%20Floor%20183/1%20Madhura%20Nagar%202nd%20main%20Moodalpalya%20Nagarbhavi%20Stage%202%20Bengaluru%20Bengaluru%20Urban-560072&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '20px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}

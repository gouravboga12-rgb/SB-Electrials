import { Award, ShieldCheck, HardHat, HeartHandshake, Eye, Target, CheckSquare } from 'lucide-react';
import useSEO from '../hooks/useSEO';

import residentialSolarImg from '../assets/images/residential_solar.png';
import commercialSolarImg from '../assets/images/commercial_solar.png';

export default function About() {
  useSEO(
    "About Us | SB Electricals - Trusted Solar Energy Contractors in Bengaluru",
    "Learn about SB Electricals' 6+ year journey, our vision, mission, and core values of Quality, Integrity, and Safety in solar installation."
  );

  const values = [
    {
      title: "Quality Workmanship",
      desc: "We enforce precise guidelines on structural strength, mounting, and wiring to deliver systems that operate efficiently for decades.",
      icon: Award
    },
    {
      title: "Integrity & Transparency",
      desc: "No hidden charges or low-yield substitutes. We quote realistic production projections and supply authentic Tier-1 materials.",
      icon: ShieldCheck
    },
    {
      title: "Rigorous Safety Standards",
      desc: "Our installations integrate proper earthing systems, surge protection devices (SPD), and high-grade breakers to protect lives and properties.",
      icon: HardHat
    },
    {
      title: "Customer Satisfaction First",
      desc: "From local BESCOM net-metering liaison to quick troubleshooting, we maintain responsive support channels for our clients.",
      icon: HeartHandshake
    }
  ];

  const strengths = [
    "6+ Years of Proven Industry Experience",
    "In-house Certified Solar Engineers & Installers",
    "Expertise in residential rooftops & commercial installations",
    "Comprehensive BESCOM net-metering approvals management",
    "High-converting solar configurations with Tier-1 components",
    "All-inclusive Annual Maintenance Contracts (AMC)"
  ];

  // WhatsApp connection
  const whatsappNumber = "918867710294";
  const aboutWhatsappMsg = encodeURIComponent("Hello SB Electricals, I read about your journey on the About Us page and would like to speak to an expert regarding solar solutions.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${aboutWhatsappMsg}`;

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-24 lg:pt-28 bg-white">
      
      {/* 1. HEADER HERO BANNER */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Story
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About SB Electricals
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Established in Bengaluru with a commitment to build a sustainable and clean power future.
          </p>
        </div>
      </section>

      {/* 2. COMPANY JOURNEY */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 text-left space-y-6" data-aos="fade-right">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Journey</h2>
            <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              6+ Years of Electrical & Solar Innovation
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Founded as a technical electrical services contractor in Bengaluru, SB Electricals quickly evolved to address the growing demand for green and renewable energy. Over the last 6+ years, we have designed and commissioned dozens of rooftop solar plants, scaling from small 2kW residential homes to complex 50kW commercial grids.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We understand that solar installation is not a one-size-fits-all product. That is why we invest heavily in precise site survey tools, load assessments, and structural evaluation. Our focus remains centered on supplying durable equipment and building safe power lines that deliver maximum efficiency year after year.
            </p>
          </div>

          <div className="lg:col-span-6" data-aos="fade-left">
            <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 relative">
              <img 
                src={residentialSolarImg} 
                alt="SB Electricals Residential Solar Panels Installation" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20 text-left">
                <span className="text-3xl font-black text-emerald-600">6+</span>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Years of Quality Service</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2b: Trust Strengths Card + Commercial Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-20">
          
          <div className="lg:col-span-6 lg:order-2" data-aos="fade-left">
            <div className="glass-panel p-8 md:p-10 rounded-[32px] text-left space-y-6 relative overflow-hidden bg-white border border-slate-200/80 shadow-md">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-emerald-600/5 rounded-full blur-xl"></div>
              
              <h4 className="text-xl font-bold text-slate-900">Why Customers Trust Us</h4>
              
              <ul className="space-y-4">
                {strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckSquare className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 font-semibold">{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1" data-aos="fade-right">
            <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <img 
                src={commercialSolarImg} 
                alt="SB Electricals Commercial Solar Installation" 
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION & MISSION CARDS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="glass-panel p-8 md:p-12 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between bg-white" data-aos="fade-right">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl"></div>
              <div className="space-y-5">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  To deliver reliable, high-yield solar energy plants and electrical contracting services that optimize energy bills, increase client asset valuation, and actively reduce carbon emissions throughout Bengaluru.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="glass-panel p-8 md:p-12 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between bg-white" data-aos="fade-left">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl"></div>
              <div className="space-y-5">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  To be Bengaluru's most trusted solar integrator and electrical contractor, renowned for our engineering integrity, safety standards, and lifelong customer care programs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-down">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Foundation</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">The Values We Live By</h3>
          <p className="text-slate-600 text-sm font-medium">
            At SB Electricals, we prioritize safety, quality, and complete transparency in all solar layouts and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => {
            const ValIcon = val.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel p-8 rounded-2xl text-left hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between bg-white"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 inline-block">
                    <ValIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{val.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 5. CTA BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" data-aos="zoom-in">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Let's Build Your Sustainable Energy Grid
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              We manage everything from structural fabrication, electrical wiring integration, load calculations to BESCOM liaison documentation. Let us handle your transition seamlessly.
            </p>
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <HardHat className="h-5 w-5" />
                <span>Consult with an Engineer on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

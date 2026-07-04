import { useState } from 'react';
import * as Icons from 'lucide-react';
import useSEO from '../hooks/useSEO';

// Local Assets
import imgStep1 from '../assets/images/commercial_solar.png';
import imgStep2 from '../assets/images/solar_maintenance.png';
import imgStep3 from '../assets/images/residential_solar.png';

export default function Calculator() {
  useSEO(
    "Solar Setup Calculator | SB Electricals - Design Your Rooftop Solar",
    "Calculate your recommended rooftop solar system capacity, estimated setup cost ranges, PM Surya Ghar central subsidies, and annual energy bill savings in Bengaluru."
  );

  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    city: 'Bengaluru',
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

  const [errors, setErrors] = useState({});

  // Cities list
  const cities = ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Other'];

  // Income options
  const incomeOptions = ['< 25 L', '25 - 50 L', '50 - 1Cr', '> 1Cr'];
  // Family sizes
  const familyOptions = ['1-2', '3-5', '5-7', '7+'];
  // Bedrooms
  const bedroomOptions = ['1', '2', '3', '4', '> 4'];

  // Handle simple input changes
  const handleChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle appliance count updates
  const updateAppliance = (app, delta) => {
    setFormData(prev => {
      const current = prev.appliances[app];
      const newVal = Math.max(0, current + delta);
      return {
        ...prev,
        appliances: {
          ...prev.appliances,
          [app]: newVal
        }
      };
    });
  };

  // Handle appliance select option changes
  const selectAppliance = (app, val) => {
    setFormData(prev => ({
      ...prev,
      appliances: {
        ...prev.appliances,
        [app]: val
      }
    }));
  };

  // Validate step 1
  const validateStep1 = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.pincode.trim()) {
      err.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      err.pincode = "Invalid 6-digit Pincode";
    }
    if (!formData.mobile.trim()) {
      err.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      err.mobile = "Invalid 10-digit Mobile number";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const nextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step < 5) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  // ----------------------------------------------------
  // SOLAR MATHEMATICS CALCULATIONS (Based on Indian PM Surya Ghar rules)
  // ----------------------------------------------------
  const billVal = parseFloat(formData.monthlyBill) || 0;
  
  // 1. Recommended system capacity (kW)
  // Approx: ₹1,200 monthly bill corresponds to roughly 1kW of system needed
  const calculatedCapacity = Math.max(1, Math.round((billVal / 1200) * 10) / 10);
  const finalCapacity = Math.min(15, calculatedCapacity); // Capped at 15kW for normal residential

  // 2. Output Area required (approx 100 sq ft per kW)
  const areaRequired = Math.round(finalCapacity * 100);

  // 3. Investment Ranges
  // Average base installation cost is approx ₹60,000 - ₹70,000 per kW gross
  const grossMin = finalCapacity * 60000;
  const grossMax = finalCapacity * 70000;
  const averageGross = (grossMin + grossMax) / 2;

  // 4. PM Surya Ghar Muft Bijli Yojana central subsidy calculation:
  // - 1 kW: ₹30,000
  // - 2 kW: ₹60,000
  // - 3 kW or higher: ₹78,000 (Subsidies are capped flat at 3 kW max)
  let subsidy = 0;
  if (finalCapacity <= 1) {
    subsidy = finalCapacity * 30000;
  } else if (finalCapacity <= 2) {
    subsidy = 30000 + (finalCapacity - 1) * 30000;
  } else if (finalCapacity <= 3) {
    subsidy = 60000 + (finalCapacity - 2) * 18000;
  } else {
    subsidy = 78000; // Flat cap
  }
  
  // Limit subsidy to 90% of actual minimum cost just in case
  const finalSubsidy = Math.min(subsidy, grossMin * 0.9);

  // 5. Net Cost range after subsidy
  const netMin = Math.max(12000, Math.round(grossMin - finalSubsidy));
  const netMax = Math.max(18000, Math.round(grossMax - finalSubsidy));
  const averageNet = (netMin + netMax) / 2;

  // 6. Annual Bill Savings (Assuming solar replaces approx 85% of grid billing)
  const annualSavings = Math.round(billVal * 0.85 * 12);

  // 7. Payback Period
  const paybackPeriod = annualSavings > 0 ? (averageNet / annualSavings).toFixed(1) : '3.5';

  // 8. Environmental Impact
  const co2Offset = (finalCapacity * 1.2).toFixed(1); // 1.2 tons CO2 offset per kW annually
  const treesPlanted = Math.round(finalCapacity * 30); // 30 trees per kW annually

  // Prepare custom message for WhatsApp liaison
  const buildWhatsAppMessage = () => {
    let msg = `*SB Electricals Solar Setup Inquiry*\n\n`;
    msg += `*Customer Details*:\n`;
    msg += `- Name: ${formData.name}\n`;
    msg += `- City: ${formData.city}\n`;
    msg += `- Pincode: ${formData.pincode}\n`;
    msg += `- Contact: +91 ${formData.mobile}\n\n`;
    msg += `*Rooftop & Bill Profile*:\n`;
    msg += `- Monthly Bill: ₹${formData.monthlyBill}\n`;
    msg += `- Income Range: ${formData.income}\n`;
    msg += `- Family Size: ${formData.familyMembers} members\n`;
    msg += `- Bedrooms: ${formData.bedrooms}\n\n`;
    msg += `*Appliance Load*:\n`;
    msg += `- ACs: ${formData.appliances.ac}, Geysers: ${formData.appliances.geyser}\n`;
    msg += `- EVs: 2W (${formData.appliances.ev2w}), 4W (${formData.appliances.ev4w})\n\n`;
    msg += `*Estimated Solar Recommendation*:\n`;
    msg += `- Recommended System: *${finalCapacity} kW*\n`;
    msg += `- Required Area: ~${areaRequired} sq.ft.\n`;
    msg += `- Estimated Price: *₹${netMin.toLocaleString('en-IN')} - ₹${netMax.toLocaleString('en-IN')}* (after Govt Subsidy of ₹${finalSubsidy.toLocaleString('en-IN')})\n`;
    msg += `- Approx. Annual Savings: *₹${annualSavings.toLocaleString('en-IN')}*\n`;
    msg += `- Estimated Payback: *${paybackPeriod} years*\n\n`;
    msg += `Please contact me to schedule a technical site survey!`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/918867710294?text=${buildWhatsAppMessage()}`;

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-24 lg:pt-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Step Indicator Header (Desktop) */}
        <div className="hidden md:flex justify-between items-center mb-10 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {[
            { stepNum: 1, label: "Contact Details" },
            { stepNum: 2, label: "Electricity Usage" },
            { stepNum: 3, label: "Household Details" },
            { stepNum: 4, label: "Appliance Load" },
            { stepNum: 5, label: "Result Summary" }
          ].map((s, idx) => (
            <div 
              key={idx}
              className={`flex-1 text-center py-4 font-extrabold text-xs transition-all duration-300 relative ${
                step === s.stepNum 
                  ? 'bg-slate-900 text-white'
                  : step > s.stepNum
                    ? 'bg-emerald-50 text-emerald-700 border-r border-slate-100'
                    : 'text-slate-400 border-r border-slate-100 bg-white'
              }`}
            >
              Step {s.stepNum}: {s.label}
              {step > s.stepNum && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Icons.CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step Indicator Header (Mobile) */}
        <div className="flex md:hidden justify-between items-center mb-8 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className="p-1 text-slate-500 disabled:opacity-30"
          >
            <Icons.ChevronLeft className="h-6 w-6" />
          </button>
          <div className="text-sm font-black text-slate-800">
            Step {step} of 5: {
              step === 1 ? "Contact Details" :
              step === 2 ? "Electricity Usage" :
              step === 3 ? "Household Details" :
              step === 4 ? "Appliance Load" : "Result Summary"
            }
          </div>
          <div className="w-6 h-6"></div> {/* Spacer */}
        </div>

        {/* Wizard Main Content Container */}
        <div className="glass-panel rounded-3xl shadow-xl overflow-hidden bg-white border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Step 1: Contact Details */}
            {step === 1 && (
              <>
                {/* Left Panel Graphic Banner */}
                <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden min-h-[300px] lg:min-h-[500px]">
                  <img 
                    src={imgStep1} 
                    alt="Rooftop Solar Installation SB" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 text-left space-y-4">
                    <h3 className="text-2xl font-black text-white leading-tight">
                      Design Your Rooftop Solar Setup
                    </h3>
                    <p className="text-slate-200 text-xs leading-relaxed font-semibold">
                      India's premium solar layout planner. Get direct access to cost estimates, government subsidies, and payback calculations tailored for your home.
                    </p>
                    <div className="space-y-2 pt-2 text-[11px] font-extrabold text-emerald-400">
                      <div className="flex items-center gap-2">
                        <Icons.CheckCircle2 className="h-4 w-4" />
                        <span>Government Approved Vendor (MNRE)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.CheckCircle2 className="h-4 w-4" />
                        <span>Lowest Price Guarantee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.CheckCircle2 className="h-4 w-4" />
                        <span>30-Year Performance Warranty</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel Form */}
                <div className="lg:col-span-7 p-8 md:p-12 text-left space-y-6 flex flex-col justify-center">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Design Your Rooftop Solar</h2>
                    <p className="text-slate-500 text-xs font-semibold">A simple, guided journey to design your ideal solar setup.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Your Name</label>
                      <input 
                        type="text"
                        placeholder="Enter name here"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-800 font-bold`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">City</label>
                        <select
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-800 font-bold"
                        >
                          {cities.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* Pincode */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">Pincode</label>
                        <input 
                          type="text"
                          maxLength="6"
                          placeholder="Enter pincode"
                          value={formData.pincode}
                          onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                          className={`w-full bg-slate-50 border ${errors.pincode ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-800 font-bold`}
                        />
                        {errors.pincode && <p className="text-[10px] text-red-500 font-bold">{errors.pincode}</p>}
                      </div>
                    </div>

                    {/* Mobile Number (Plain input, no OTP check) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Mobile Number</label>
                      <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <span className="bg-slate-100 border-r border-slate-200 px-4 py-3 text-sm font-black text-slate-500 flex items-center">
                          +91
                        </span>
                        <input 
                          type="text"
                          maxLength="10"
                          placeholder="Enter 10-digit mobile number"
                          value={formData.mobile}
                          onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, ''))}
                          className={`w-full bg-transparent px-4 py-3 text-sm focus:outline-none text-slate-800 font-bold`}
                        />
                      </div>
                      {errors.mobile && <p className="text-[10px] text-red-500 font-bold">{errors.mobile}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={nextStep}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 active:scale-[0.99] transition-all duration-300 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Electricity Usage */}
            {step === 2 && (
              <>
                <div className="lg:col-span-6 p-8 md:p-12 text-left space-y-6 flex flex-col justify-center border-r border-slate-100">
                  <button onClick={prevStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Electricity Usage Details</h2>
                    <p className="text-slate-500 text-xs font-semibold">Add your last month's electricity bill to calculate your overall payback.</p>
                  </div>

                  {/* Bill Slider Block */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-extrabold text-slate-700">How much was your last Electricity bill?</span>
                      <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-emerald-700 font-black text-sm flex items-center gap-1">
                        <span>₹</span>
                        <input 
                          type="number"
                          value={formData.monthlyBill}
                          onChange={(e) => handleChange('monthlyBill', Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-20 bg-transparent text-right focus:outline-none font-black"
                        />
                      </div>
                    </div>
                    
                    <input 
                      type="range"
                      min="500"
                      max="50000"
                      step="250"
                      value={formData.monthlyBill}
                      onChange={(e) => handleChange('monthlyBill', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Min: ₹500</span>
                      <span>Max: ₹50,000+</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold text-center">An approximate amount is enough. We will get into details later.</p>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* Mock Bill Uploader */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700">Upload Electricity Bill</label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors duration-300 relative cursor-pointer group bg-slate-50/50">
                      <input 
                        type="file"
                        onChange={(e) => handleChange('billFile', e.target.files[0] ? e.target.files[0].name : null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                      <div className="space-y-2">
                        <Icons.UploadCloud className="h-10 w-10 text-slate-400 mx-auto group-hover:text-emerald-600 transition-colors" />
                        <p className="text-xs font-bold text-slate-700">
                          {formData.billFile ? formData.billFile : "Autofill your consumption and location details"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">pdf, jpeg, png, and webp files up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={nextStep}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 active:scale-[0.99] transition-all duration-300 cursor-pointer text-center"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Right Side Visual Panel */}
                <div className="lg:col-span-6 relative bg-slate-100 overflow-hidden min-h-[300px] lg:min-h-full">
                  <img 
                    src={imgStep2} 
                    alt="Reviewing electricity bills solar panel integration" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30"></div>
                </div>
              </>
            )}

            {/* Step 3: Household Details */}
            {step === 3 && (
              <>
                {/* Left Side Graphic Panel */}
                <div className="lg:col-span-5 relative bg-slate-100 overflow-hidden min-h-[300px] lg:min-h-full">
                  <img 
                    src={imgStep3} 
                    alt="Indian home rooftop solar grid systems" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40"></div>
                </div>

                <div className="lg:col-span-7 p-8 md:p-12 text-left space-y-6 flex flex-col justify-center">
                  <button onClick={prevStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Household Details</h2>
                    <p className="text-slate-500 text-xs font-semibold">We ask these to understand your home's energy habits. These answers help us calculate your usage better.</p>
                  </div>

                  <div className="space-y-6 pt-2">
                    {/* Annual Income */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-extrabold text-slate-700">What's your annual household income?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {incomeOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleChange('income', opt)}
                            className={`px-4 py-3 text-xs font-bold rounded-xl border text-center transition-all duration-300 ${
                              formData.income === opt
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Family Members */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-extrabold text-slate-700">How many members do you have in your house?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {familyOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleChange('familyMembers', opt)}
                            className={`px-4 py-3 text-xs font-bold rounded-xl border text-center transition-all duration-300 ${
                              formData.familyMembers === opt
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-extrabold text-slate-700">How many bedrooms do you have?</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {bedroomOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleChange('bedrooms', opt)}
                            className={`px-3 py-3 text-xs font-bold rounded-xl border text-center transition-all duration-300 ${
                              formData.bedrooms === opt
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={nextStep}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 active:scale-[0.99] transition-all duration-300 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Appliance Load */}
            {step === 4 && (
              <div className="lg:col-span-12 p-8 md:p-12 text-left space-y-6">
                <button onClick={prevStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold">
                  <Icons.ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Select Household Appliances</h2>
                  <p className="text-slate-500 text-xs font-semibold">Select the number of heavy appliances you have at home to adjust calculations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* AC Counter */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Air Conditioner (AC)</h4>
                      <p className="text-[10px] text-slate-400 font-bold">1.5 Ton split or window</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateAppliance('ac', -1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">-</button>
                      <span className="text-sm font-black text-slate-800 w-6 text-center">{formData.appliances.ac}</span>
                      <button onClick={() => updateAppliance('ac', 1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* Geyser Counter */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Electric Water Geyser</h4>
                      <p className="text-[10px] text-slate-400 font-bold">For bathrooms and kitchen</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateAppliance('geyser', -1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">-</button>
                      <span className="text-sm font-black text-slate-800 w-6 text-center">{formData.appliances.geyser}</span>
                      <button onClick={() => updateAppliance('geyser', 1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* EV 2W Counter */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">EV 2-Wheeler</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Electric scooter/bike chargers</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateAppliance('ev2w', -1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">-</button>
                      <span className="text-sm font-black text-slate-800 w-6 text-center">{formData.appliances.ev2w}</span>
                      <button onClick={() => updateAppliance('ev2w', 1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* EV 4W Dropdown */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">EV 4-Wheeler</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Electric car home chargers</p>
                    </div>
                    <select
                      value={formData.appliances.ev4w}
                      onChange={(e) => selectAppliance('ev4w', e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Don't Have">Don't Have</option>
                      <option value="1 Car">1 Car</option>
                      <option value="2 Cars">2 Cars</option>
                      <option value="3+ Cars">3+ Cars</option>
                    </select>
                  </div>

                  {/* Room Heater */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Room Heater</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Seasonal room heaters</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateAppliance('heater', -1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">-</button>
                      <span className="text-sm font-black text-slate-800 w-6 text-center">{formData.appliances.heater}</span>
                      <button onClick={() => updateAppliance('heater', 1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* Air Cooler */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Air Cooler</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Standard water air coolers</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateAppliance('cooler', -1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">-</button>
                      <span className="text-sm font-black text-slate-800 w-6 text-center">{formData.appliances.cooler}</span>
                      <button onClick={() => updateAppliance('cooler', 1)} className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* Water Pump */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Water Pump</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Water motors/borewell pumps</p>
                    </div>
                    <select
                      value={formData.appliances.pump}
                      onChange={(e) => selectAppliance('pump', e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Don't Have">Don't Have</option>
                      <option value="0.5 HP">0.5 HP</option>
                      <option value="1.0 HP">1.0 HP</option>
                      <option value="1.5 HP+">1.5 HP+</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={nextStep}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 active:scale-[0.99] transition-all duration-300 cursor-pointer text-center"
                  >
                    Calculate Solar Setup
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Recommendation Output */}
            {step === 5 && (
              <div className="lg:col-span-12 p-8 md:p-12 text-left space-y-8 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <button onClick={prevStep} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-extrabold">
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>Back to Load Adjuster</span>
                  </button>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        name: '',
                        city: 'Bengaluru',
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
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Reset Calculator
                  </button>
                </div>

                <div className="space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    <Icons.Award className="h-3.5 w-3.5" />
                    <span>Your Recommended Solar Design</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Hello {formData.name}, here is your customized solar configuration
                  </h2>
                </div>

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Capacity Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2 flex flex-col justify-center">
                    <Icons.Cpu className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Recommended Capacity</h4>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{finalCapacity} kW</p>
                    <p className="text-[10px] text-slate-500 font-semibold">Suggested based on ₹{billVal.toLocaleString('en-IN')}/mo bill</p>
                  </div>

                  {/* Area Required Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2 flex flex-col justify-center">
                    <Icons.Grid className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Required Roof Area</h4>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">~{areaRequired} sq.ft</p>
                    <p className="text-[10px] text-slate-500 font-semibold">Shade-free clear terrace space</p>
                  </div>

                  {/* Pricing Range Card (Excluding Subsidy) */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2 flex flex-col justify-center">
                    <Icons.TrendingUp className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Annual Savings</h4>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">₹{annualSavings.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">Saving up to 85% on utility bills</p>
                  </div>

                  {/* Payback period Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2 flex flex-col justify-center">
                    <Icons.Clock className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Payback Period</h4>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">~{paybackPeriod} Years</p>
                    <p className="text-[10px] text-slate-500 font-semibold">ROI return on solar investment</p>
                  </div>

                </div>

                {/* Secondary Cost Summary & Gov Subsidy Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Financial Breakdown Panel */}
                  <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">
                      Investment & Gov Subsidy Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Gross Installation Price */}
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-500">Gross Setup Cost Range (Estimated)</span>
                        <span className="text-slate-800">₹{grossMin.toLocaleString('en-IN')} - ₹{grossMax.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Gov Subsidy */}
                      <div className="flex justify-between items-center text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
                        <span className="flex items-center gap-1.5">
                          <Icons.BadgePercent className="h-4 w-4 flex-shrink-0" />
                          <span>PM Surya Ghar Govt. Subsidy</span>
                        </span>
                        <span>- ₹{finalSubsidy.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Net Price Range after Subsidy */}
                      <div className="flex justify-between items-center text-base font-black border-t border-slate-100 pt-4 text-slate-900">
                        <span>Net Investment Cost Range</span>
                        <span className="text-emerald-600">₹{netMin.toLocaleString('en-IN')} - ₹{netMax.toLocaleString('en-IN')}*</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 leading-relaxed font-bold space-y-1.5 bg-slate-50 p-4 rounded-xl">
                      <p>* Disclaimer: Setup costs represent local market averages and depend on your chosen solar brand (panels/inverters), structure height, and building site conditions. Official subsidies are subject to standard MNRE liaison approval.</p>
                      <p>* PM Surya Ghar Yojana offers up to ₹78,000 subsidy limit capped at 3kW capacity for residential grids.</p>
                    </div>
                  </div>

                  {/* Environmental Impact & Next Actions */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 space-y-6">
                    <h3 className="text-lg font-bold text-white tracking-tight border-b border-slate-800 pb-3">
                      Environmental Impact Metrics
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 text-left">
                        <Icons.Leaf className="h-5 w-5 text-emerald-400" />
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">CO2 Reduced</h4>
                        <p className="text-lg font-black text-white">{co2Offset} Tons / yr</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 text-left">
                        <Icons.Sparkles className="h-5 w-5 text-emerald-400" />
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Trees Equivalent</h4>
                        <p className="text-lg font-black text-white">{treesPlanted} Trees</p>
                      </div>
                    </div>

                    {/* WhatsApp Action Wrapper */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-bold text-slate-300 leading-relaxed">
                        Ready to lock in these savings? Send your configurations to our engineering desk on WhatsApp to book a formal site assessment.
                      </h4>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs w-full py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all duration-300 shadow-md"
                      >
                        <Icons.MessageCircle className="h-4.5 w-4.5" />
                        <span>Send Configurations & Get Detailed Quotation</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

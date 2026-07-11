import { useState } from 'react';
import * as Icons from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Calculator() {
  useSEO(
    "Solar Setup Calculator | SB Electricals - Design Your Rooftop Solar",
    "Calculate your recommended rooftop solar system capacity, estimated setup cost ranges, PM Surya Ghar central subsidies, and annual energy bill savings in Bengaluru."
  );

  // Calculator State
  const [inputType, setInputType] = useState('monthly'); // 'monthly' or 'daily'
  const [inputValue, setInputValue] = useState(500);

  const handleReset = () => {
    setInputValue(500);
    setInputType('monthly');
  };

  // ----------------------------------------------------
  // CALCULATIONS (Based on requested formulas)
  // ----------------------------------------------------
  const monthlyUnits = inputType === 'monthly' ? Number(inputValue) : Number(inputValue) * 30;
  const dailyUnits = inputType === 'monthly' ? Number(inputValue) / 30 : Number(inputValue);
  const capacity = inputType === 'monthly' ? (Number(inputValue) / 120) : ((Number(inputValue) * 30) / 120);
  const estimatedCost = capacity * 70000;
  const tariffRate = 8;
  const dailyCharges = dailyUnits * tariffRate;
  const monthlyCharges = monthlyUnits * tariffRate;

  // Indian Currency Formatter
  const formatIndianCurrency = (num) => {
    if (isNaN(num) || num === 0) return '0';
    const str = Math.round(num).toString();
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  return (
    <div className="relative overflow-hidden radial-glow-green min-h-screen pt-32 lg:pt-36 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Icons.Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Interactive Estimator</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Design Your Rooftop <span className="text-emerald-600">Solar Setup</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed">
            Get instant solar capacity and setup cost estimates based on your power consumption.
          </p>
        </div>

        {/* Rebuilt Layout Container */}
        <div className="max-w-2xl mx-auto">
          
          {/* Cost Estimation Calculator (Matches image copy 8.png) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 relative text-left">
            
            {/* Close/Reset button representation */}
            <button 
              onClick={handleReset} 
              className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 transition-colors cursor-pointer"
              title="Reset Calculator"
            >
              <Icons.X className="h-4.5 w-4.5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 pr-8">
              Cost Estimation Calculator
            </h3>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Enter your {inputType === 'monthly' ? 'monthly' : 'daily'} electricity consumption to get an estimate
            </p>

            {/* Toggles */}
            <div className="flex gap-2 mt-5 bg-slate-105 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setInputType('monthly');
                  if (inputType === 'daily') {
                    setInputValue(Math.round(inputValue * 30));
                  }
                }}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer text-center ${
                  inputType === 'monthly' 
                    ? 'bg-white text-emerald-700 shadow-sm font-black' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Monthly Consumption
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputType('daily');
                  if (inputType === 'monthly') {
                    setInputValue(Math.round((inputValue / 30) * 100) / 100);
                  }
                }}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer text-center ${
                  inputType === 'daily' 
                    ? 'bg-white text-emerald-700 shadow-sm font-black' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Daily Consumption
              </button>
            </div>

            {/* Input block */}
            <div className="mt-5 space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                {inputType === 'monthly' ? 'Monthly Consumption (Units)' : 'Daily Consumption (Units)'}
              </label>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                <input 
                  type="number"
                  min="0"
                  value={inputValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputValue(val === '' ? '' : Math.max(0, parseFloat(val) || 0));
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
            <div className="mt-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-2xl p-5 text-white space-y-4 shadow-lg shadow-indigo-500/20">
              {inputType === 'monthly' ? (
                <>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-indigo-100">Daily Consumption:</span>
                    <span className="text-base font-extrabold">
                      {dailyUnits.toFixed(2)} units/day
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-indigo-100">Required Capacity:</span>
                    <span className="text-base font-extrabold">
                      {capacity.toFixed(2)} kW
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-1">
                    <span className="text-xs font-bold text-indigo-100 mb-1 block">Estimated Cost:</span>
                    <span className="text-3xl font-black tracking-tight">
                      ₹ {formatIndianCurrency(estimatedCost)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-indigo-100">Daily Consumption:</span>
                    <span className="text-base font-extrabold">
                      {dailyUnits.toFixed(2)} units/day
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-indigo-100">Required Capacity:</span>
                    <span className="text-base font-extrabold">
                      {capacity.toFixed(2)} kW
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-1">
                    <span className="text-xs font-bold text-indigo-100 mb-1 block">Daily Charges (Est.):</span>
                    <span className="text-3xl font-black tracking-tight">
                      ₹ {formatIndianCurrency(dailyCharges)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium mt-4 italic">
              * This is an approximate estimate. Final pricing may vary based on installation requirements.
            </p>
          </div>

        </div>

        {/* Pricing Guide Section */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-250 shadow-md p-6 md:p-8 text-left space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900">
            About Our Setup Calculation Methodology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-650 font-medium">
            <div className="space-y-3">
              <p className="font-semibold text-slate-800">1. Required Capacity Logic:</p>
              <p>
                Solar installation guidelines state that monthly power generation of a system is roughly 120 units per kW of system capacity (i.e. 4 units a day per kW).
              </p>
              <p>
                Capacity calculation is performed as:
                <br />
                <code className="bg-slate-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-xs">
                  Capacity (kW) = Monthly Consumption (Units) / 120
                </code>
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-slate-800">2. Setup Cost Sizing:</p>
              <p>
                Standard premium MNRE-compliant residential grid installations in Bengaluru cost roughly ₹70,000 per kW on a gross basis.
              </p>
              <p>
                Setup cost estimation is performed as:
                <br />
                <code className="bg-slate-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-xs">
                  Estimated Cost (₹) = Capacity (kW) * 70,000
                </code>
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-slate-800">3. Electricity Charges Logic:</p>
              <p>
                Electricity bills are calculated assuming a standard residential BESCOM tariff average of ₹8 per unit (inclusive of fixed charges and energy taxes).
              </p>
              <p>
                Charges estimation is performed as:
                <br />
                <code className="bg-slate-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-xs">
                  Charges (₹) = Consumption (Units) * 8
                </code>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

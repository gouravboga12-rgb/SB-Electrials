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
  };

  // Calculations (Based on requested formulas)
  const dailyUnits = Number(inputValue || 0) / 30;
  const capacity = Number(inputValue || 0) / 120;

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
            Get instant solar capacity estimates based on your power consumption.
          </p>
        </div>

        {/* Rebuilt Layout Container */}
        <div className="max-w-2xl mx-auto">
          
          {/* Cost Estimation Calculator (Matches image copy 8.png) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 relative text-left space-y-6">
            
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
            <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-2xl p-5 text-white space-y-4 shadow-lg shadow-indigo-500/20">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-indigo-100">Daily Consumption:</span>
                <span className="text-base font-extrabold">
                  {dailyUnits.toFixed(2)} units/day
                </span>
              </div>
              <div className="flex justify-between items-end pt-1">
                <span className="text-xs font-bold text-indigo-100 mb-1 block">Required Capacity:</span>
                <span className="text-3xl font-black tracking-tight">
                  {capacity.toFixed(2)} kW
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

        </div>

      </div>
    </div>
  );
}

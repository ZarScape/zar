import React from 'react';

interface BillingToggleProps {
  cycle: 'monthly' | 'yearly';
  onChange: (cycle: 'monthly' | 'yearly') => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ cycle, onChange }) => {
  return (
    <div className="flex justify-center mb-16">
      <div className="relative flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl overflow-hidden w-fit">
        {/* Animated Glider */}
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-xl shadow-[0_0_20px_rgba(0,219,197,0.4)] transition-all duration-500 cubic-bezier(0.37, 1.95, 0.66, 0.56) z-10 ${
            cycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.37, 1.95, 0.66, 0.56)' }}
        />

        <button
          onClick={() => onChange('monthly')}
          className={`relative z-20 px-8 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300 min-w-[120px] ${
            cycle === 'monthly' ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => onChange('yearly')}
          className={`relative z-20 px-8 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300 min-w-[120px] ${
            cycle === 'yearly' ? 'text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};

export default BillingToggle;

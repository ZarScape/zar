import { useState, useEffect, useRef } from 'react';
import BackgroundOrbs from '../components/BackgroundOrbs';
import BackHomeBtn from '../components/BackHomeBtn';
import { GlowCard } from '../components/ui/spotlight-card';

const packages = [
  {
    tier: 'Bronze',
    badge: 'Starter',
    duration: '1 Month',
    price: '$2.99',
    value: 'Quick Start: A simple monthly plan to get started fast.',
    savings: 'For 1 month',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/bronze.png',
    color: 'theme' as const,
  },
  {
    tier: 'Silver',
    badge: 'Most Common',
    duration: '6 Months',
    price: '$13.97',
    value: 'Steady Growth: Great for growing communities that want better long-term value.',
    savings: '22% Off',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/silver.png',
    color: 'theme' as const,
  },
  {
    tier: 'Gold',
    badge: 'Annual',
    duration: '1 Year',
    price: '$17.99',
    value: 'Best Annual Value: More time, lower effective monthly cost, and premium savings.',
    savings: '50% Off',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/gold.png',
    featured: true,
    color: 'theme' as const,
  },
  {
    tier: 'Diamond',
    badge: 'Lifetime',
    duration: 'Lifetime',
    price: '$44.97',
    value: 'Lifetime Access: One payment for permanent access and maximum convenience.',
    savings: 'Ultimate Value',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/diamond.png',
    color: 'theme' as const,
  },
];

const Store = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);
  const holdStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const HOLD_DURATION = 1500;

  useEffect(() => {
    const verified = sessionStorage.getItem('zar_store_verified');
    if (verified) setIsVerified(true);
  }, []);

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isVerified) return;
    setIsHolding(true);
    holdStartRef.current = performance.now();
    
    const animate = () => {
      if (holdStartRef.current === null) return;
      const elapsed = performance.now() - holdStartRef.current;
      const ratio = Math.min(1, elapsed / HOLD_DURATION);
      setHoldProgress(ratio * 100);

      if (ratio >= 1) {
        setIsVerified(true);
        setIsHolding(false);
        sessionStorage.setItem('zar_store_verified', 'true');
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const stopHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    holdStartRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleCardClick = () => {
    setShowPaymentNotice(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <BackgroundOrbs />
      
      {!isVerified && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="verify-card glass p-8 max-w-md w-full text-center rounded-[2rem] border-accent/30 shadow-2xl shadow-accent/20">
            <h2 className="text-2xl font-black text-accent mb-2">Verify You Are Human</h2>
            <p className="text-gray-400 mb-8">Press and hold to continue to the store.</p>
            
            <button
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              className="hold-btn relative w-full h-16 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group transition-all"
            >
              <div 
                className="absolute inset-0 bg-accent transition-all duration-75"
                style={{ width: `${holdProgress}%` }}
              />
              <span className="relative z-10 font-bold text-white uppercase tracking-wider group-hover:scale-105 transition-transform">
                {isHolding ? 'Keep Holding...' : 'Hold to Verify'}
              </span>
            </button>
            <p className="mt-4 text-xs text-gray-500 italic">Security verification required for store access.</p>
          </div>
        </div>
      )}

      <main className={`container mx-auto px-6 ${!isVerified ? 'blur-lg' : ''} transition-all duration-500`}>
        <div className="mb-12">
            <BackHomeBtn />
        </div>

        <header className="text-center mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-4">Premium Packages</p>
          <h1 className="text-6xl font-black text-accent mb-6">zar store</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Professional plans designed for growth. Pick your tier and scale your server with confidence.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.tier} onClick={handleCardClick} className="cursor-pointer group">
              <GlowCard 
                glowColor={pkg.color}
                customSize={true}
                className={`h-full flex flex-col gap-4 border-white/5 hover:border-accent/30 transition-all ${
                  pkg.featured ? 'border-accent/40 bg-accent/5 glow-primary' : ''
                }`}
              >
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 mb-2">
                  <img src={pkg.img} alt={pkg.tier} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-white">{pkg.tier}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                    {pkg.badge}
                  </span>
                </div>
                
                <div>
                  <p className="text-gray-500 font-bold text-sm mb-1">{pkg.duration}</p>
                  <p className="text-4xl font-black text-white">{pkg.price}</p>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{pkg.value}</p>
                
                <div className="pt-4 mt-auto border-t border-white/5 flex flex-col gap-4">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest">{pkg.savings}</p>
                  <button className="w-full py-4 rounded-xl bg-accent text-black font-black uppercase tracking-widest text-sm shadow-accent btn-hover">
                      Purchase Plan
                  </button>
                </div>
              </GlowCard>
            </div>
          ))}
        </section>

        {showPaymentNotice && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md" onClick={() => setShowPaymentNotice(false)}>
            <div className="glass p-12 max-w-2xl w-full text-center rounded-[3rem] border-accent/20" onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-black text-accent mb-6">Payments Unavailable</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                Payments are temporarily unavailable. They will return in the next major zar update. Thank you for your patience and support.
              </p>
              <button 
                onClick={() => setShowPaymentNotice(false)}
                className="px-12 py-5 rounded-2xl bg-accent text-black font-black uppercase tracking-widest btn-hover"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Store;

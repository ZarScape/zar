import { useState, useEffect } from 'react';
import BackgroundOrbs from '../components/BackgroundOrbs';
import BackHomeBtn from '../components/BackHomeBtn';
import { Bell, X } from 'lucide-react';
import { GlowCard } from '../components/ui/spotlight-card';
import BillingToggle from '../components/ui/BillingToggle';

const packages = [
  {
    tier: 'Bronze',
    badge: 'Entry',
    monthlyPrice: '$3.99',
    yearlyPrice: '$25.97',
    value: 'Quick Start: A simple plan to get started fast with essential elite features.',
    savings: 'SAVE $21/year',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/bronze.png',
    color: 'theme' as const,
  },
  {
    tier: 'Silver',
    badge: 'Popular',
    monthlyPrice: '$8.99',
    yearlyPrice: '$54.97',
    value: 'Steady Growth: Great for growing communities that want better long-term performance.',
    savings: 'SAVE $52/year',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/silver.png',
    color: 'theme' as const,
  },
  {
    tier: 'Gold',
    badge: 'Best Value',
    monthlyPrice: '$12.99',
    yearlyPrice: '$64.97',
    value: 'Maximum Power: Complete access to all advanced modules and community scaling tools.',
    savings: 'SAVE $90/year',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/gold.png',
    color: 'theme' as const,
  },
  {
    tier: 'Diamond',
    badge: 'Lifetime',
    monthlyPrice: '$49.97',
    yearlyPrice: '$49.97',
    isLifetime: true,
    featured: true,
    value: 'Everything in Gold but permanent. One-time payment for maximum convenience.',
    savings: 'Ultimate Value',
    img: 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/diamond.png',
    color: 'theme' as const,
  },
];

const Store = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showNotification, setShowNotification] = useState(false);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      // Use BASE_URL to handle /zar/ prefix automatically
      const soundPath = `${import.meta.env.BASE_URL}sounds/notification.mp3`.replace('//', '/');
      const audio = new Audio(soundPath);
      audio.volume = 0.4;
      audio.play().catch(err => {
        console.warn("Audio autoplay blocked or file not found:", err);
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    setShowPaymentNotice(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <BackgroundOrbs />

      <main className="container mx-auto px-6 transition-all duration-500">
        <div className="mb-12">
          <BackHomeBtn />
        </div>

        <header className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-4">Premium Packages</p>
          <h1 className="text-6xl font-black text-accent mb-6">zar store</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12">
            Professional plans designed for growth. Pick your tier and scale your server with confidence.
          </p>

          <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.tier} onClick={handleCardClick} className="cursor-pointer group">
              <GlowCard
                glowColor={pkg.color}
                customSize={true}
                className={`h-full flex flex-col gap-4 border-white/5 hover:border-accent/30 transition-all ${pkg.featured ? 'border-accent/40 bg-accent/5 glow-primary' : ''
                  }`}
              >
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 mb-2">
                  <img src={pkg.img} alt={pkg.tier} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="flex justify-between items-center">
                  <h3 className={`text-2xl font-black ${pkg.isLifetime ? 'text-accent' : 'text-white'}`}>{pkg.tier}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${pkg.isLifetime
                      ? 'bg-accent text-black border-accent shadow-[0_0_15px_rgba(0,219,197,0.5)]'
                      : 'bg-white/5 border-white/10 text-gray-400'
                    }`}>
                    {pkg.badge}
                  </span>
                </div>

                <div>
                  <p className={`font-bold text-sm mb-1 ${pkg.isLifetime ? 'text-accent/60' : 'text-gray-500'}`}>
                    {pkg.isLifetime ? 'One-time Payment' : (billingCycle === 'monthly' ? '1 Month' : '1 Year')}
                  </p>
                  <div className="flex items-end gap-2">
                    <p className={`text-4xl font-black transition-all ${pkg.isLifetime ? 'text-accent drop-shadow-[0_0_10px_rgba(0,219,197,0.3)] scale-110 origin-left' : 'text-white'}`}>
                      {billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice}
                    </p>
                    {!pkg.isLifetime && (
                      <span className="text-gray-500 font-bold mb-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{pkg.value}</p>

                <div className="pt-4 mt-auto border-t border-white/5 flex flex-col gap-4">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest">
                    {billingCycle === 'yearly' ? pkg.savings : (pkg.isLifetime ? 'Ultimate Value' : 'Standard Rate')}
                  </p>
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
      {/* Support Server Notification */}
      <div className={`fixed bottom-6 left-6 right-6 md:left-auto md:bottom-8 md:right-8 z-[120] transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100 animate-wobble' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}>
        <div className="glass p-5 pr-12 rounded-2xl border-accent/20 shadow-2xl shadow-black/50 max-w-sm mx-auto md:mx-0 relative group !backdrop-blur-[32px]">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Bell className="text-accent" size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Special Offer!</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Join our support server for <span className="text-accent font-bold">better discount codes</span> and exclusive community rewards.
              </p>
              <a
                href="https://discord.gg/6YVmxA4Qsf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[10px] font-black uppercase tracking-widest text-accent hover:underline"
              >
                Join Discord →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

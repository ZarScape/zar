import { ChevronRight, ClipboardList, UserPlus, Binary, LayoutTemplate, SmilePlus, Gamepad2, Gift, Hand, Info, FileText, ShieldAlert, Mic, Crown, Bell, UserCog, Wrench, Star } from 'lucide-react';
import { features } from '../data/features';
import { reviews, reviewsSecondary } from '../data/reviews';
import BackgroundOrbs from '../components/BackgroundOrbs';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  'clipboard-list': ClipboardList,
  'user-plus': UserPlus,
  'binary': Binary,
  'layout-template': LayoutTemplate,
  'smile-plus': SmilePlus,
  'gamepad-2': Gamepad2,
  'gift': Gift,
  'hand': Hand,
  'info': Info,
  'file-text': FileText,
  'shield-alert': ShieldAlert,
  'mic': Mic,
  'crown': Crown,
  'bell': Bell,
  'user-cog': UserCog,
  'wrench': Wrench,
};

const Home = () => {
  return (
    <main className="relative">
      <BackgroundOrbs />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        <div className="glow -top-40 -left-40 scale-150"></div>
        <div className="glow top-20 right-0 scale-125"></div>

        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-10 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-accent shadow-accent"></div>
            <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">
              Your Ultimate Discord Companion
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.95] md:leading-[0.85] text-white">
            Evolve Your <br />
            <span className="text-accent italic">Community</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            Your Ultimate Discord Companion. Always by Your Side. A multipurpose app packed with everything you
            need to enhance your server
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1345820519827636295"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-accent text-black font-black text-xl shadow-accent btn-hover transition-all"
            >
              ADD TO DISCORD <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/store"
              className="px-10 py-5 rounded-2xl glass-light border-white/10 font-bold text-xl hover:bg-white/5 btn-hover transition-all text-white"
            >
              Open Store
            </Link>
            <a
              href="https://discord.gg/6YVmxA4Qsf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl glass-light border-white/10 font-bold text-xl hover:bg-white/5 btn-hover transition-all text-white"
            >
              Join Support
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="glass rounded-[3rem] p-8 md:p-16 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[100px] -z-10"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-accent text-sm font-black tracking-widest uppercase mb-4">The Elite Choice</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  What is <span className="text-accent italic">zar?</span>
                </h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                  zar is an all-in-one multipurpose Discord bot designed to elevate your server experience. 
                  With powerful moderation, engaging modules, and seamless utility, zar ensures your 
                  community stays safe, active, and organized.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "Replace multiple bots with one high-performance solution",
                    "Elite-grade security and moderation tools",
                    "Highly customizable modules for any community type"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                      </div>
                      <span className="text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 glass flex items-center justify-center group hover:border-accent/30 transition-all duration-500">
                    <img 
                      src="https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/zar.png" 
                      alt="zar Bot" 
                      className="w-full h-full object-cover shadow-2xl shadow-accent/20 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-end mb-20 gap-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-accent text-sm font-black tracking-widest uppercase mb-4">Elite Modules</h2>
              <p className="text-5xl font-black leading-tight text-white">
                Everything built-in. <br />
                Inside zar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="p-8 glass rounded-[2rem] border-white/5 hover:border-accent/30 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="text-accent w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-black mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Marquee */}
      <section id="reviews" className="py-20 md:py-32 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-20">
          <h2 className="text-5xl font-black mb-6 italic text-white">The Wall of Love</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real feedback from server owners and community leads who have scaled with zar.
          </p>
        </div>

        <div className="relative mb-8 scroll-container">
          <div className="animate-marquee flex gap-6 w-max">
            {[...reviews, ...reviews].map((review, i) => (
              <div key={i} className="review-card flex-shrink-0 w-[350px] p-8 glass rounded-3xl border-white/5 mx-3">
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="fill-accent w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">"{review.quote}"</p>
                <p className="font-black text-sm uppercase tracking-widest text-white">{review.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative scroll-container">
          <div className="animate-marquee-reverse flex gap-6 w-max">
            {[...reviewsSecondary, ...reviewsSecondary].map((review, i) => (
              <div key={i} className="review-card flex-shrink-0 w-[350px] p-8 glass rounded-3xl border-white/5 mx-3">
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="fill-accent w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">"{review.quote}"</p>
                <p className="font-black text-sm uppercase tracking-widest text-white">{review.author}</p>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .scroll-container {
            mask: linear-gradient(
              90deg,
              transparent 0%,
              black 10%,
              black 90%,
              transparent 100%
            );
            -webkit-mask: linear-gradient(
              90deg,
              transparent 0%,
              black 10%,
              black 90%,
              transparent 100%
            );
          }
        `}} />
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: 'Servers Secured', value: '360+' },
              { label: 'Modules Ready', value: '15+' },
              { label: 'Uptime Guaranteed', value: '99.99%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group p-12 glass rounded-[3rem] text-center border-white/5 relative overflow-hidden stat-card hover:border-accent/20 transition-colors"
              >
                <h4 className="text-6xl font-black text-accent mb-3">{stat.value}</h4>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="glass rounded-[4rem] p-16 md:p-32 text-center border-white/10 relative overflow-hidden">
            <div className="glow -top-40 -right-40"></div>
            <div className="glow -bottom-40 -left-40"></div>

            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] text-white">
              The elite choice <br /> for your community.
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-14">
              Empower your server with the ultimate moderation and utility toolkit. Join the elite communities
              trusting zar today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1345820519827636295"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-accent text-black font-black text-2xl rounded-2xl shadow-accent btn-hover transition-all"
              >
                invite zar now
              </a>
              <a
                href="https://discord.gg/6YVmxA4Qsf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 glass-light border-white/20 font-bold text-2xl rounded-2xl hover:bg-white/5 btn-hover transition-all text-white"
              >
                join support server
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

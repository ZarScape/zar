import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="py-20 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-8 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform">
                <img
                  src="https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/zar-round-200x200.png"
                  alt="zar Logo"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">zar</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm mb-8">
              The elite choice for community scaling. Empower your server with the ultimate moderation and utility toolkit.
            </p>
            <div className="flex gap-4">
               <a 
                href="https://discord.com/oauth2/authorize?client_id=1345820519827636295" 
                className="px-6 py-3 rounded-xl bg-accent text-black font-black text-xs uppercase tracking-widest btn-hover"
                target="_blank"
                rel="noopener noreferrer"
               >
                 Add Bot
               </a>
               <a 
                href="https://discord.gg/6YVmxA4Qsf" 
                className="px-6 py-3 rounded-xl glass-light border-white/10 text-white font-black text-xs uppercase tracking-widest btn-hover"
                target="_blank"
                rel="noopener noreferrer"
               >
                 Support
               </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-black uppercase tracking-widest text-[10px] mb-8 text-accent">Navigation</h5>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">About</button></li>
              <li><button onClick={() => handleNavClick('features')} className="hover:text-white transition-colors cursor-pointer">Modules</button></li>
              <li><button onClick={() => handleNavClick('reviews')} className="hover:text-white transition-colors cursor-pointer">Reviews</button></li>
              <li><button onClick={() => handleNavClick('stats')} className="hover:text-white transition-colors cursor-pointer">Stats</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-black uppercase tracking-widest text-[10px] mb-8 text-accent">Platform</h5>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><Link to="/store" className="hover:text-white transition-colors">Store</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/tos" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
          <p>&copy; {currentYear} zar DEVELOPMENT. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-accent transition-colors cursor-default">Security</span>
            <span className="hover:text-accent transition-colors cursor-default">Scalability</span>
            <span className="hover:text-accent transition-colors cursor-default">Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

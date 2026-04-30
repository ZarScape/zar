import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
        setActiveSection('');
        return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'features', 'reviews', 'stats'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Handle scrolling to hash on home page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'About', path: '#about' },
    { name: 'Modules', path: '#features' },
    { name: 'Reviews', path: '#reviews' },
    { name: 'Stats', path: '#stats' },
    { name: 'Store', path: '/store' },
    { name: 'Partners', path: '/partners' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      if (location.pathname === '/') {
        const id = path.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${path}`);
      }
    }
  };

  const isLinkActive = (path: string) => {
    if (path.startsWith('#')) {
      if (location.pathname !== '/') return false;
      // If no section is active and we're at the top, highlight 'About'
      if (!activeSection && path === '#about' && window.scrollY < 300) return true;
      return activeSection === path;
    }
    return location.pathname === path;
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-6xl rounded-full glass border border-white/10 px-4 py-3 flex justify-between items-center shadow-2xl shadow-black/50 hover:border-accent/30 hover:shadow-accent/10 ${
        isScrolled ? 'nav-scrolled' : ''
      }`}
      style={{ animation: 'navSlideDown 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform">
          <img
            src="https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/zar/zar-round-200x200.png"
            alt="zar Logo"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">zar</span>
      </Link>

      <div className="hidden md:flex items-center gap-2 flex-1 justify-center px-4">
        {navLinks.map((link) => (
          link.path.startsWith('#') ? (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.path)} 
              className={`nav-btn text-sm font-medium transition-all cursor-pointer ${
                isLinkActive(link.path) ? 'nav-link-active text-accent' : 'text-gray-400'
              }`}
            >
              {link.name}
            </button>
          ) : (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-btn text-sm font-medium transition-all ${
                isLinkActive(link.path) ? 'nav-link-active text-accent' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          )
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3 ml-auto">
        <a
          href="https://discord.gg/6YVmxA4Qsf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn px-5 py-2 rounded-full glass-light border-white/20 text-xs font-bold text-white whitespace-nowrap"
        >
          Support
        </a>
        <a
          href="https://discord.com/oauth2/authorize?client_id=1345820519827636295"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn nav-btn-primary px-6 py-2.5 rounded-full bg-accent text-black font-black text-xs shadow-accent whitespace-nowrap uppercase tracking-wider"
        >
          Add to Discord
        </a>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white nav-btn">
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 glass rounded-3xl border border-white/10 py-8 px-6 flex flex-col gap-6 animate-in slide-in-from-top shadow-2xl">
          {navLinks.map((link) => (
            link.path.startsWith('#') ? (
              <button 
                key={link.name} 
                onClick={() => { handleNavClick(link.path); setIsOpen(false); }} 
                className={`text-xl font-medium nav-btn transition-all text-left ${
                    isLinkActive(link.path) ? 'nav-link-active text-accent' : 'text-white'
                }`}
              >
                {link.name}
              </button>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-xl font-medium nav-btn transition-all ${
                    isLinkActive(link.path) ? 'nav-link-active text-accent' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="flex flex-col gap-4 mt-4">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1345820519827636295"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-accent text-black font-bold text-lg text-center nav-btn nav-btn-primary"
            >
              Add to Discord
            </a>
            <a
              href="https://discord.gg/6YVmxA4Qsf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl glass-light border-white/10 font-bold text-center nav-btn text-white"
            >
              Join Support
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import BackHomeBtn from '../components/BackHomeBtn';
import BackgroundOrbs from '../components/BackgroundOrbs';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative bg-[#050505] overflow-hidden flex items-center justify-center">
      <BackgroundOrbs />
      
      <main className="container mx-auto px-6 relative z-10 text-center">

        <section className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Error 404
            </span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter">
            Lost in <span className="text-accent italic">Space?</span>
          </h1>
          
          <p className="text-gray-400 text-xl md:text-2xl mb-12 leading-relaxed">
            The page you're looking for has drifted out of orbit. <br className="hidden md:block" />
            Let's get you back to the command center.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <BackHomeBtn />
          </div>
        </section>

        {/* Large decorative 404 in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none opacity-[0.02]">
          <span className="text-[30rem] font-black text-white">404</span>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

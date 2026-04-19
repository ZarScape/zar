import { partners } from '../data/partners';
import BackgroundOrbs from '../components/BackgroundOrbs';
import BackHomeBtn from '../components/BackHomeBtn';

const Partners = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <BackgroundOrbs />

      <main className="container mx-auto px-6">
        <div className="mb-12">
          <BackHomeBtn />
        </div>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-accent">Our Bot Partners</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the elite bots and communities that power the Discord ecosystem alongside zar.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="glass p-8 rounded-3xl border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg bg-white/5"
                />
                <div>
                  <h3 className="text-2xl font-black text-white">{partner.name}</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{partner.handle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {partner.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-accent border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <a
                  href={partner.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 py-3 rounded-xl bg-accent text-black font-bold text-center hover:opacity-90 transition-opacity"
                >
                  Invite Bot
                </a>
                <a
                  href={partner.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    partner.websiteUrl ? 'col-span-1' : 'col-span-2'
                  } py-3 rounded-xl glass border-white/10 font-bold text-center hover:bg-white/5 transition-colors text-white`}
                >
                  Support
                </a>
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl glass border-white/10 font-bold text-center hover:bg-white/5 transition-colors text-white"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Partners;

import BackgroundOrbs from '../components/BackgroundOrbs';
import BackHomeBtn from '../components/BackHomeBtn';

const Tos = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <BackgroundOrbs />

      <main className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <BackHomeBtn />
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-4 text-accent">Terms of Service</h1>
        <p className="text-gray-500 font-bold tracking-widest text-xs uppercase mb-16">Last Updated On: March 9, 2026</p>

        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Welcome to zar’s Terms of Service</h3>
            <p className="text-gray-400 leading-relaxed">
              By using the zar Discord bot (“the App”), you agree to be bound by these Terms of Service (“Terms”). If
              you do not agree, please discontinue use.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">License</h3>
            <p className="text-gray-400 leading-relaxed">
              zar grants you a limited, non-exclusive, non-transferable license to use the App for personal or
              non-commercial purposes in accordance with these Terms.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Premium Services & Refunds</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Specific advanced features may require a premium subscription. By purchasing these services, you agree to
              the following:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li><strong className="text-white">Final Sale:</strong> All sales of digital goods and subscriptions are final.</li>
              <li><strong className="text-white">No Refund Policy:</strong> No refunds are provided under any circumstances.</li>
              <li><strong className="text-white">Payment Processing:</strong> Payments are handled by third-party providers. We do not store financial information.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Prohibited Uses</h3>
            <p className="text-gray-400 mb-4">You must not use the App in any way that:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li>Violates any applicable laws or regulations.</li>
              <li>Contravenes Discord's Terms of Service or Community Guidelines.</li>
              <li>Harms or disrupts the App, other users, or servers.</li>
              <li>Is for commercial gain without explicit written consent from zar.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Termination</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li><strong className="text-white">By zar:</strong> We may suspend or revoke access for Terms violations.</li>
              <li><strong className="text-white">By You:</strong> You may stop using the App at any time.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
            <p className="text-gray-400 leading-relaxed">
              For inquiries, contact our founder, <strong className="text-white">Muhammad Abuzar</strong> at{' '}
              <a href="mailto:ZarScape@hotmail.com" className="text-accent hover:underline">
                ZarScape@hotmail.com
              </a>
              , or reach out in our support server:{' '}
              <a href="https://discord.gg/6YVmxA4Qsf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Zar HQ
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Tos;

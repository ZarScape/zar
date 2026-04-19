import BackgroundOrbs from '../components/BackgroundOrbs';
import BackHomeBtn from '../components/BackHomeBtn';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <BackgroundOrbs />

      <main className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <BackHomeBtn />
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-4 text-accent">Privacy Policy</h1>
        <p className="text-gray-500 font-bold tracking-widest text-xs uppercase mb-16">Last Updated On: March 9, 2026</p>

        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Welcome to zar’s Privacy Policy</h3>
            <p className="text-gray-400 leading-relaxed">
              At zar, we prioritize your privacy. This policy explains exactly what data we collect, how we use it, and
              how we keep it secure—always minimizing retention and never storing message content.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Data Collected</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li>
                <strong className="text-white">Discord IDs</strong> (User, Server, Channel) to enable bot functionality
                (e.g., giveaways, embeds, PVCs).
              </li>
              <li>
                <strong className="text-white">Temporary Session Data</strong> (e.g., giveaway participants, embed
                drafts) stored locally and purged immediately after use.
              </li>
              <li>
                <strong className="text-white">Configuration IDs</strong> (e.g., role IDs for autorole, channel IDs for
                audit logs) stored only for as long as the feature is enabled.
              </li>
              <li>
                <strong className="text-white">Payment Email Address</strong> collected during checkout to verify
                payment status and confirm order processing.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Payment Data</h3>
            <p className="text-gray-400 leading-relaxed">
              Payments are processed by our online reseller and Merchant of Record, Polar. Polar handles payment
              processing, order-related inquiries, and returns. We do not store or collect your credit card details on
              our servers. We only receive limited payment confirmation details (such as your email and Discord ID)
              required to verify payment and process your order.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">No Message Content Storage</h3>
            <p className="text-gray-400 leading-relaxed">
              We do not retain any user messages. Modmail DMs, utility command inputs, and similar interactions are
              processed in real-time and immediately discarded. We may collect temporary data such as embed
              configuration and giveaway state so buttons and related functions can work correctly, but this data is
              deleted immediately after use.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">No External Databases</h3>
            <p className="text-gray-400 leading-relaxed">
              All database data is hosted on our own cloud database servers. We do not provide your data to any third
              party.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Data Usage</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li>Deliver bot features (e.g., create private VCs, manage giveaways).</li>
              <li>Process premium activations and maintain subscription status.</li>
              <li>Respect permissions and security settings.</li>
              <li>Automatically purge data when no longer needed.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400 leading-relaxed">
              For any privacy inquiries, contact our founder, <strong className="text-white">Muhammad Abuzar</strong> at{' '}
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

export default Privacy;

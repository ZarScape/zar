import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundOrbs from '../components/BackgroundOrbs';

const SuccessOrder = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://discord.gg/6YVmxA4Qsf';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#050505]">
      <BackgroundOrbs />

      <main className="container mx-auto px-6 relative z-10">
        <div className="glass max-w-3xl mx-auto rounded-[3rem] p-12 text-center border-accent/20 shadow-2xl shadow-accent/10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-4">Order Update</p>
          <h1 className="text-4xl md:text-6xl font-black text-accent mb-8 leading-tight">
            Payment Received <br /> Successfully
          </h1>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            <p>If you were redirected to this page after payment, your order has been received and is now being processed.</p>
            <p>To verify the latest status, please check the email address you entered during checkout.</p>
            <p>Thank you for choosing our services. If you need help or have any questions, join our support server.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 inline-block">
            <p className="text-gray-300">
              Redirecting you to our Discord support server in{' '}
              <span className="font-black text-accent text-2xl mx-1">{count}</span>{' '}
              seconds...
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://discord.gg/6YVmxA4Qsf" 
              className="px-10 py-5 rounded-2xl bg-accent text-black font-black uppercase tracking-widest hover:scale-105 transition-all shadow-accent"
            >
              Join Support Now
            </a>
            <Link 
              to="/" 
              className="px-10 py-5 rounded-2xl glass border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessOrder;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { MessageCircle, Camera, Mail, Copy, Check } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const waMessage = encodeURIComponent(
  'Halo, saya tertarik untuk diskusi project dengan Anda'
);
const waLink = `https://wa.me/${profileData.whatsapp}?text=${waMessage}`;

const Contact = () => {
  const reduced = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="perf-section py-20 px-6 max-w-4xl mx-auto relative z-10 w-full scroll-mt-20">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={reduced ? undefined : { once: true, margin: '-100px' }}
        transition={{ duration: reduced ? 0.28 : 0.4 }}
        className="glass-card rounded-[2.5rem] p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-snug">
          Punya project, kolaborasi, atau{' '}
          <span className="text-gradient">ide kreatif?</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Saya terbuka untuk diskusi project, kolaborasi kreatif, atau peluang baru.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
          <motion.a
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow md:hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            <MessageCircle size={18} />
            Chat via WhatsApp
          </motion.a>

          <motion.a
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            href={profileData.instagram}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 glass-card hover:bg-white/10 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Camera size={18} />
            DM Instagram
          </motion.a>

          <motion.a
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            href={`mailto:${profileData.email}`}
            className="px-6 py-3.5 glass-card hover:bg-white/10 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Mail size={18} />
            Kirim Email
          </motion.a>
        </div>

        <motion.button
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-accent-light/30 transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              Tersalin!
            </>
          ) : (
            <>
              <Copy size={16} />
              Salin Email: {profileData.email}
            </>
          )}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Contact;

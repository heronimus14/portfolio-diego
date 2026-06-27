import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-12 px-6 text-center relative z-10">
      
      {/* Floating Profile Image */}
      <HeroImageBlock />

      {/* Main Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-6">
          <CheckCircle2 size={14} className="text-accent-light" />
          <span>Full Stack Developer • UI Design • Creative Work</span>
        </div>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          {profileData.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects" 
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-full font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(2,132,199,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(2,132,199,0.6)]"
          >
            Lihat Karya Saya <ArrowRight size={18} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

function HeroImageBlock() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mb-8">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(56,189,248,0.2)] bg-secondary/50 backdrop-blur-sm z-10 relative">
        <img
          src={profileData.photo}
          alt={profileData.name}
          loading={reduced ? 'lazy' : 'eager'}
          decoding="async"
          width={160}
          height={160}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + profileData.name.replace(' ', '+') + "&background=0D8ABC&color=fff&size=200" }}
        />
      </div>

      {/* Animated accent elements behind image */}
      {reduced ? (
        <div className="absolute inset-[-6px] bg-gradient-to-tr from-accent-light via-transparent to-accent-dark rounded-[2.5rem] opacity-20 z-0 blur-sm" />
      ) : (
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-10px] bg-gradient-to-tr from-accent-light via-transparent to-accent-dark rounded-[2.5rem] opacity-30 z-0 blur-md"
        />
      )}

      {/* Badge */}
      {reduced ? (
        <div className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-green-400 flex items-center gap-1.5 shadow-sm z-20">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for Work
        </div>
      ) : (
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-green-400 flex items-center gap-1.5 shadow-xl z-20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for Work
        </motion.div>
      )}
    </div>
  );
}

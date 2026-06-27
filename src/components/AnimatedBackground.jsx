import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const AnimatedBackground = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-primary">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-primary to-primary opacity-80"></div>

      {/* Animated gradient blobs - disabled or simplified on mobile/reduced-motion */}
      {reduced ? (
        <>
          <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-accent-dark/12 blur-[24px] opacity-40" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-accent/12 blur-[28px] opacity-30" />
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-accent-light/8 blur-[16px] opacity-20" />
        </>
      ) : (
        <>
          <motion.div 
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.55, 0.35],
              x: [0, 28, 0],
              y: [0, 18, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-dark/20 blur-[80px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.45, 0.25],
              x: [0, -28, 0],
              y: [0, 38, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.06, 1],
              opacity: [0.12, 0.28, 0.12],
              x: [0, 18, 0],
              y: [0, -18, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-accent-light/10 blur-[60px]"
          />
        </>
      )}
      
      {/* Noise texture overlay for premium feel (skip on mobile/reduced) */}
      {!reduced && (
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      )}
    </div>
  );
};

export default AnimatedBackground;

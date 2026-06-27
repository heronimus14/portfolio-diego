import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profileData } from '../data/profile';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const IntroLoader = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 1500); // Fast load for bio link

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <IntroLoaderContent onComplete={onComplete} />
      )}
    </AnimatePresence>
  );
};

 
const IntroLoaderContent = ({ onComplete }) => {
  const reduced = usePrefersReducedMotion();

  // small, lightweight markup when reduced motion
  if (reduced) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary">
        <div className="text-accent-light text-sm font-semibold tracking-[0.3em] mb-4">DIGITAL CREATIVE</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{profileData.name.toUpperCase()}</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-accent-light to-accent-dark mt-6 rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-accent-light text-sm font-semibold tracking-[0.3em] mb-4"
      >
        DIGITAL CREATIVE
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="text-4xl md:text-5xl font-bold text-white tracking-tight"
      >
        {profileData.name.toUpperCase()}
      </motion.h1>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, delay: 0.25, ease: "anticipate" }}
        className="w-24 h-1 bg-gradient-to-r from-accent-light to-accent-dark mt-6 rounded-full"
      />
    </motion.div>
  );
};

export default IntroLoader;

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profileData } from '../data/profile';

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
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent-light text-sm font-semibold tracking-[0.3em] mb-4"
          >
            DIGITAL CREATIVE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {profileData.name.toUpperCase()}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "anticipate" }}
            className="w-24 h-1 bg-gradient-to-r from-accent-light to-accent-dark mt-6 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;

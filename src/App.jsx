import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroLoader from './components/IntroLoader';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LinkCards from './components/LinkCards';
import IdentityCards from './components/IdentityCards';
import About from './components/About';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatedBackground />

      {loading && <IntroLoader onComplete={handleLoaderComplete} />}

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative min-h-screen"
          >
            <Navbar />
            <main>
              <Hero />
              <LinkCards />
              <IdentityCards />
              <About />
              <Projects />
              <Experiences />
              <Achievements />
              <Skills />
              <Timeline />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

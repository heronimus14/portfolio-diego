import { motion } from 'framer-motion';
import { timelineData } from '../data/timeline';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Timeline = () => {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="timeline" className="perf-section py-20 px-6 max-w-3xl mx-auto relative z-10 w-full scroll-mt-20">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={reduced ? undefined : { once: true, margin: '-100px' }}
        transition={{ duration: reduced ? 0.28 : 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          My <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Perjalanan belajar, berorganisasi, dan berkarya dari waktu ke waktu.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-light/50 via-accent/30 to-accent-dark/20" />

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 z-10">
                <div className="w-4 h-4 rounded-full bg-accent-light border-4 border-primary shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
              </div>

              {/* Spacer for alternating layout on desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content card */}
              <div className="ml-14 md:ml-0 md:w-1/2">
                <div className="glass-card p-5 md:p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                  <span className="inline-block text-accent-light font-bold text-sm tracking-wider mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

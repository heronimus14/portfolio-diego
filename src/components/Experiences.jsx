import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { experiencesData } from '../data/experiences';

const Experiences = () => {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const isUserInteractingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const interactionTimeoutRef = useRef(null);
  const autoSlideIntervalRef = useRef(null);
  const scrollEndTimeoutRef = useRef(null);
  const itemWidthRef = useRef(0);
  const currentSlideRef = useRef(0);
  const [displayExperiences, setDisplayExperiences] = useState(experiencesData);

  const clearInteractionTimeout = () => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  };

  const clearScrollEndTimeout = () => {
    if (scrollEndTimeoutRef.current) {
      window.clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = null;
    }
  };

  const pauseAutoSlide = () => {
    isUserInteractingRef.current = true;
    clearInteractionTimeout();
    interactionTimeoutRef.current = window.setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 6000);
  };

  const measureItemWidth = () => {
    const container = carouselRef.current;
    if (!container) return;
    const items = container.querySelectorAll('[data-carousel-item]');
    if (!items.length) return;

    const firstRect = items[0].getBoundingClientRect();
    const secondRect = items[1]?.getBoundingClientRect() ?? firstRect;
    const width = firstRect.width;
    const gap = Math.max(0, secondRect.left - firstRect.left - width);
    itemWidthRef.current = width + gap;
  };

  const getCurrentSlideIndex = () => {
    const container = carouselRef.current;
    if (!container || itemWidthRef.current === 0) return 0;
    return Math.round(container.scrollLeft / itemWidthRef.current);
  };

  const handleLoopReset = () => {
    const container = carouselRef.current;
    if (!container || itemWidthRef.current === 0) return;

    const maxIndex = experiencesData.length;
    const index = getCurrentSlideIndex();
    if (index >= maxIndex) {
      const resetIndex = index - maxIndex;
      container.scrollLeft = resetIndex * itemWidthRef.current;
      currentSlideRef.current = resetIndex;
    }
  };

  const handleScrollEnd = () => {
    clearScrollEndTimeout();
    scrollEndTimeoutRef.current = window.setTimeout(() => {
      if (!isUserInteractingRef.current) {
        handleLoopReset();
      }
    }, 150);
  };

  const updateCurrentSlide = () => {
    currentSlideRef.current = getCurrentSlideIndex();
  };

  const slideToNext = () => {
    const container = carouselRef.current;
    if (!container || itemWidthRef.current === 0) return;
    if (isUserInteractingRef.current) return;

    const currentIndex = getCurrentSlideIndex();
    const nextIndex = currentIndex + 1;
    isAutoScrollingRef.current = true;
    container.scrollTo({ left: nextIndex * itemWidthRef.current, behavior: 'smooth' });
    currentSlideRef.current = nextIndex;

    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
      if (!isUserInteractingRef.current) {
        handleLoopReset();
      }
    }, 700);
  };

  const handleInteraction = () => {
    if (isAutoScrollingRef.current) return;
    pauseAutoSlide();
    updateCurrentSlide();
  };

  useEffect(() => {
    const updateMobileState = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(mobile);
      setDisplayExperiences(mobile ? [...experiencesData, ...experiencesData] : experiencesData);
    };

    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      itemWidthRef.current = 0;
      clearInteractionTimeout();
      clearScrollEndTimeout();
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
      return;
    }

    measureItemWidth();
    if (autoSlideIntervalRef.current) {
      window.clearInterval(autoSlideIntervalRef.current);
    }

    autoSlideIntervalRef.current = window.setInterval(() => {
      slideToNext();
    }, 4000);

    return () => {
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    };
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
      }
      clearInteractionTimeout();
      clearScrollEndTimeout();
    };
  }, []);

  return (
    <section id="experiences" className="py-20 pl-6 md:px-6 relative z-10 w-full overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 pr-6 md:pr-0"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Beyond The <span className="text-gradient">Screen</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Pengalaman saya di luar dunia coding, termasuk organisasi, kepanitiaan, dan kegiatan kreatif.
          </p>
          <p className="mt-4 text-sm text-gray-400 md:hidden">
            Geser untuk melihat pengalaman lainnya <span aria-hidden="true">→</span>
          </p>
        </motion.div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 snap-x snap-mandatory md:grid md:grid-cols-3 md:snap-none md:overflow-visible pr-6 md:pr-0"
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          onTouchEnd={() => {
            handleInteraction();
            handleScrollEnd();
          }}
          onMouseDown={handleInteraction}
          onMouseUp={() => {
            handleInteraction();
            handleScrollEnd();
          }}
          onWheel={(event) => {
            if (event.deltaX !== 0 || event.deltaY !== 0) {
              handleInteraction();
            }
          }}
          onScroll={() => {
            if (!isAutoScrollingRef.current) {
              handleInteraction();
              handleScrollEnd();
            }
          }}
        >
          {displayExperiences.map((exp, index) => (
            <motion.div
              key={`${exp.id}-${index}`}
              data-carousel-item
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center glass-card rounded-3xl overflow-hidden group relative transform transition-all duration-300 hover:-translate-y-2 hover:border-accent/40"
            >
              {/* Image & Gradient */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={576}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent-light text-xs font-bold px-3 py-1 rounded-full">
                  {exp.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10 -mt-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white inline-block mb-3 shadow-lg">
                  {exp.role}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{exp.title}</h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-3xl pointer-events-none transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;

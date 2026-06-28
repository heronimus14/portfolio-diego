import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';
import { Code2, Palette, HeartHandshake } from 'lucide-react';

const categories = [
  {
    key: 'technical',
    title: 'Technical Skills',
    icon: <Code2 size={22} />,
    color: 'text-accent-light',
    borderHover: 'hover:border-accent-light/40',
  },
  {
    key: 'design',
    title: 'Design Skills',
    icon: <Palette size={22} />,
    color: 'text-purple-400',
    borderHover: 'hover:border-purple-400/40',
  },
  {
    key: 'soft',
    title: 'Soft Skills',
    icon: <HeartHandshake size={22} />,
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-400/40',
  },
];

const allSkills = [
  ...skillsData.technical,
  ...skillsData.design,
  ...skillsData.soft,
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, type: 'spring', stiffness: 120 },
  }),
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto relative z-10 w-full scroll-mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Skills <span className="text-gradient">Strengths</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Keahlian teknis, desain, dan soft skill yang saya kembangkan seiring perjalanan.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: catIndex * 0.15 }}
            className={`glass-card p-6 rounded-3xl transition-colors duration-300 ${cat.borderHover}`}
          >
            <div className={`flex items-center gap-3 mb-5 ${cat.color}`}>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillsData[cat.key].map((skill, i) => (
                <motion.span
                  key={skill}
                  custom={i}
                  variants={chipVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-accent-light/30 hover:text-white transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Horizontal marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-4">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0">
                {allSkills.map((skill) => (
                  <span
                    key={`${group}-${skill}`}
                    className="mx-3 px-4 py-2 rounded-full glass-card text-sm text-gray-400 font-medium border border-white/5 shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

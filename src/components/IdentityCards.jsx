import { motion } from 'framer-motion';
import { MonitorSmartphone, Mic2, Users } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const IdentityCards = () => {
  const reduced = usePrefersReducedMotion();
  const cards = [
    {
      icon: <MonitorSmartphone size={32} />,
      title: "Web Development",
      desc: "Membangun website modern, responsif, dan clean dengan teknologi terkini.",
      color: "text-accent-light"
    },
    {
      icon: <Mic2 size={32} />,
      title: "Pengalaman Kreatif",
      desc: "Aktif dalam kegiatan kreatif seperti paduan suara, wedding organizer, dokumentasi, dan event.",
      color: "text-purple-400"
    },
    {
      icon: <Users size={32} />,
      title: "Organisasi",
      desc: "Terlibat dalam organisasi, kepanitiaan besar, lomba, dan kolaborasi tim.",
      color: "text-emerald-400"
    }
  ];

  return (
    <section className="perf-section py-16 px-6 max-w-6xl mx-auto relative z-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={reduced ? undefined : { once: true, margin: "-100px" }}
            transition={{ duration: reduced ? 0.28 : 0.6, delay: reduced ? 0 : index * 0.12 }}
            className="glass-card p-8 rounded-3xl md:hover:-translate-y-2 transition-transform duration-300 group"
          >
            <div className={`mb-6 p-4 bg-white/5 rounded-2xl inline-block ${card.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{card.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IdentityCards;

import { motion } from 'framer-motion';
import { achievementsData } from '../data/achievements';
import { Trophy, BadgeCheck, Star } from 'lucide-react';

const Achievements = () => {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'competition': return <Trophy size={20} className="text-yellow-400" />;
      case 'certification': return <BadgeCheck size={20} className="text-blue-400" />;
      default: return <Star size={20} className="text-purple-400" />;
    }
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Achievements &  <span className="text-gradient">Highlights</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Pencapaian, sertifikasi, dan penghargaan yang pernah diraih.
        </p>
      </motion.div>

      <div className="space-y-6">
        {achievementsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center group hover:bg-white/10 transition-colors duration-300"
          >
            {/* Image Placeholder / Icon Container */}
            <div className="w-full md:w-32 h-32 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                decoding="async"
                width={512}
                height={320}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-inner">
                  {getIcon(item.type)}
                </span>
                <span className="text-accent-light font-bold text-sm tracking-wider uppercase">
                  {item.year}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;

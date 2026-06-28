import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

const About = () => {
  const stats = [
    { label: "Proyek Web", value: profileData.stats.webProjects, suffix: "+" },
    { label: "Aktivitas Kreatif", value: profileData.stats.creativeActivities, suffix: "+" },
    { label: "Organisasi", value: profileData.stats.organizationExperience, suffix: "" },
    { label: "Pencapaian", value: profileData.stats.achievements, suffix: "+" }
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto relative z-10 w-full scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-[2.5rem] p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Tentang <span className="text-gradient">Saya</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {profileData.bio}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), type: "spring" }}
                  className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors"
                >
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}<span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="hidden md:flex w-1/3 justify-center">
            <div className="relative w-64 h-64">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-accent/30"
              />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                <span className="text-5xl">✨</span>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default About;

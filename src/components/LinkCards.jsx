import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { Camera, GitBranch, Briefcase, Mail, MessageCircle } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const LinkCards = () => {
  const reduced = usePrefersReducedMotion();
  const waLink = `https://wa.me/${profileData.whatsapp}?text=Halo%2C%20saya%20tertarik%20untuk%20diskusi%20project%20dengan%20Anda`;

  const links = [
    {
      title: "WhatsApp",
      desc: "Ayo diskusikan project",
      url: waLink,
      icon: <MessageCircle size={24} />,
      color: "from-green-500/20 to-emerald-600/20",
      borderColor: "group-hover:border-green-500/50",
      iconColor: "text-green-400"
    },
    {
      title: "Instagram",
      desc: "Kegiatan kreatif harian",
      url: profileData.instagram,
      icon: <Camera size={24} />,
      color: "from-pink-500/20 to-purple-600/20",
      borderColor: "group-hover:border-pink-500/50",
      iconColor: "text-pink-400"
    },
    {
      title: "Email",
      desc: "Pertanyaan bisnis",
      url: `mailto:${profileData.email}`,
      icon: <Mail size={24} />,
      color: "from-blue-500/20 to-cyan-600/20",
      borderColor: "group-hover:border-blue-500/50",
      iconColor: "text-blue-400"
    },
    {
      title: "GitHub",
      desc: "Lihat kode saya",
      url: profileData.github,
      icon: <GitBranch size={24} />,
      color: "from-gray-500/20 to-gray-700/20",
      borderColor: "group-hover:border-gray-400/50",
      iconColor: "text-gray-300"
    },
    {
      title: "LinkedIn",
      desc: "Jaringan profesional",
      url: profileData.linkedin,
      icon: <Briefcase size={24} />,
      color: "from-blue-600/20 to-blue-800/20",
      borderColor: "group-hover:border-blue-500/50",
      iconColor: "text-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="perf-section py-10 px-6 max-w-4xl mx-auto relative z-10 w-full">
      <motion.div 
        variants={containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={reduced ? undefined : { once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            variants={itemVariants}
            initial={reduced ? false : undefined}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`group relative glass-card p-4 rounded-2xl flex items-center gap-4 overflow-hidden transition-all duration-300 md:hover:-translate-y-1 ${link.borderColor}`}
          >
            {/* Background Hover Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
            
            {/* Icon Container */}
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${link.iconColor} md:group-hover:scale-110 md:group-hover:rotate-3 transition-transform duration-300 shadow-inner`}>
              {link.icon}
            </div>
            
            {/* Text */}
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                {link.title}
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {link.desc}
              </p>
            </div>
            
            {/* Arrow */}
            <div className="text-gray-500 md:group-hover:text-white md:group-hover:translate-x-1 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default LinkCards;

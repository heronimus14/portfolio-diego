import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { User, Briefcase, Award, Mail } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Navbar = () => {
  const reduced = usePrefersReducedMotion();
  const navItems = [
    { icon: <User size={18} />, href: "#about", label: "Tentang" },
    { icon: <Briefcase size={18} />, href: "#projects", label: "Proyek" },
    { icon: <Award size={18} />, href: "#experiences", label: "Pengalaman" },
    { icon: <Mail size={18} />, href: "#contact", label: "Kontak" },
  ];

  return (
    <motion.nav 
      initial={reduced ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 px-4 pointer-events-none"
    >
      <div className="glass-card px-6 py-3 rounded-full flex items-center gap-6 pointer-events-auto shadow-lg bg-black/40">
        <a href="#" className="font-bold text-lg text-white tracking-tighter">
          {profileData.name.split(' ')[0]}<span className="text-accent-light">.</span>
        </a>
        <div className="w-px h-4 bg-white/20"></div>
        <div className="flex gap-4 sm:gap-6">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group relative"
              aria-label={item.label}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="hidden md:block text-sm font-medium">
                {item.label}
              </span>
              
              {/* Tooltip for mobile */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 md:hidden transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

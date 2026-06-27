import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ExternalLink, GitBranch, Lock } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto relative z-10 w-full scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Proyek Web <span className="text-gradient">Unggulan</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          Beberapa project website dan karya digital yang pernah saya kerjakan.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)] xl:hover:rotate-1"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-secondary/50">
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                width={1024}
                height={576}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              
              {/* Role Badge */}
              <div className="absolute bottom-4 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-white">
                {project.role}
              </div>

              {project.isPrivate && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center transition-opacity duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 bg-black/50">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white border border-white/20">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 mb-1">
                      Private Client Project
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Project bisnis aktif. Detail lengkap tidak ditampilkan untuk menjaga privasi klien.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tools.map((tool, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                    {tool}
                  </span>
                ))}
              </div>

              {((project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "") || (project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "")) && (
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  {project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "" && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-white text-primary text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      Lihat Proyek <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "" && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:text-accent-light transition-all"
                      aria-label="View Source Code"
                    >
                      <GitBranch size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

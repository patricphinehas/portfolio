import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Globe, House } from 'lucide-react';
import { projects } from '../data/portfolio';
import { PinnedInCard } from './StackCard';
import SectionIntro, { sectionGrid } from './SectionIntro';
import { ArrowRight, Sprout, Ambulance, Sparkles, Warehouse, SolarPanel, Bot, LayoutDashboard, AudioLines, FolderFiles } from './icons/KoboyoIcons';

const iconMap = {
  home: House,
  vegroute: Sprout,
  ambulance: Ambulance,
  clinic: Sparkles,
  inventory: Warehouse,
  solar: SolarPanel,
  chatbot: Bot,
  dashboard: LayoutDashboard,
  audio: AudioLines,
};

const PortfolioGrid = () => {
  return (
    <section className="py-10 md:py-14">
      <div className={sectionGrid}>
        <PinnedInCard className="min-w-0 xl:col-span-4">
          <SectionIntro label="Projects" title={<>Selected<br />Works</>}>
            Products I have built and shipped, from the Digital Twin platform at Bosch to my own side projects.
          </SectionIntro>
        </PinnedInCard>

        <div className="min-w-0 xl:col-span-8">
          {/* Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 2xl:grid-cols-2 gap-6"
            >
              {projects.map((project, idx) => {
                const IconComponent = iconMap[project.icon] || FolderFiles;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] } }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Background accent on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{
                        backgroundColor: '#249D8F',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {project.page ? (
                        <Link
                          to={project.page}
                          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14635a]"
                          aria-label={`${project.title} project page`}
                        />
                      ) : project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14635a]"
                          aria-label={`${project.title} website, opens in a new tab`}
                        />
                      ) : null}

                      {/* Icon and Links Row */}
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="p-3 rounded-xl text-white shadow-sm"
                          style={{ backgroundColor: '#249D8F' }}
                        >
                          <IconComponent size={24} />
                        </div>
                        {(project.url || project.github) && (
                          <div className="relative z-20 flex items-center gap-1">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} website`}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                              >
                                <Globe size={18} />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} on GitHub`}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                              >
                                <Github size={18} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Role Badge */}
                      {project.role && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="inline-block text-xs font-semibold uppercase tracking-wider mb-2 px-2 py-1 rounded"
                          style={{ backgroundColor: '#E9C46A', color: '#1e293b' }}
                        >
                          {project.role}
                        </motion.span>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center justify-between gap-2">
                        <span className="group-hover:text-[#249D8F] transition-colors">{project.title}</span>
                        {(project.page || project.url) && (
                          <ArrowRight
                            size={18}
                            className="shrink-0 -rotate-45 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                            style={{ color: '#249D8F' }}
                          />
                        )}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIdx) => (
                          <motion.span
                            key={tagIdx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIdx * 0.05 }}
                            className="relative z-20 text-xs font-medium rounded-full px-3 py-1"
                            style={{
                              backgroundColor: 'rgba(36, 157, 143, 0.1)',
                              color: '#249D8F',
                              border: '1px solid rgba(36, 157, 143, 0.2)'
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: '#249D8F'
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;

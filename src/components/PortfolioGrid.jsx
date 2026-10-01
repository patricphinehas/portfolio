import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';
import { ArrowRight, Sprout, Ambulance, Sparkles, Warehouse, SolarPanel, Bot, LayoutDashboard, AudioLines, FolderFiles } from './icons/KoboyoIcons';

const iconMap = {
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
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract unique tags and add "All"
  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

  // Filter projects based on selected tag
  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section className="section min-h-screen relative" style={{ backgroundColor: '#FDF0D5' }}>
      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#1e293b' }}>
              Selected <span style={{ color: '#249D8F' }}>Works</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              From leading product teams to strategic brand & growth consulting — a look at what I've shipped.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, idx) => {
                const IconComponent = iconMap[project.icon] || FolderFiles;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
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
                      {/* Icon and Links Row */}
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="p-3 rounded-xl text-white shadow-sm"
                          style={{ backgroundColor: '#249D8F' }}
                        >
                          <IconComponent size={24} />
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={project.github || '#'}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <Github size={18} />
                          </a>
                          <a
                            href={project.link || '#'}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
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
                        <ArrowRight
                          size={18}
                          className="shrink-0 -rotate-45 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                          style={{ color: '#249D8F' }}
                        />
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
                            className="text-xs font-medium rounded-full px-3 py-1 cursor-pointer hover:scale-105 transition-transform"
                            style={{
                              backgroundColor: 'rgba(36, 157, 143, 0.1)',
                              color: '#249D8F',
                              border: '1px solid rgba(36, 157, 143, 0.2)'
                            }}
                            onClick={() => setSelectedTag(tag)}
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
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">No projects found with that category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;

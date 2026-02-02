import React from 'react';
import { projects } from '../data/portfolio';
import { Folder, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <section id="projects" className="section bg-black/20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Selected <span className="gradient-text">Works</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card flex flex-col h-full group relative overflow-hidden p-0"
                        >
                            {/* Card Header/Image Placeholder if we had images, using gradient for now */}
                            <div className="h-48 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 flex items-start justify-between relative">
                                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                                <Folder size={40} className="text-indigo-400 relative z-10" />

                                <div className="flex gap-3 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href="#" className="p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors">
                                        <Github size={18} />
                                    </a>
                                    <a href="#" className="p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                                    {project.title}
                                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                </h3>

                                <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

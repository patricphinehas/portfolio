import React from 'react';
import { projects } from '../data/portfolio';
import { Github } from 'lucide-react';
import { ExternalLink, ArrowRight, Sprout, Ambulance, Sparkles, Warehouse, SolarPanel, Bot, LayoutDashboard, AudioLines, FolderFiles } from './icons/KoboyoIcons';
import { motion } from 'framer-motion';
import { Carousel, CarouselSlide } from './ui/Carousel';

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

const Projects = () => {
    return (
        <section id="projects" className="section bg-black/[0.02]">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Selected <span className="gradient-text">Works</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-600 max-w-2xl mx-auto -mt-8 mb-16"
                >
                    From leading product teams to strategic brand & growth consulting — a look at what I've shipped.
                </motion.p>

                <Carousel autoplay delay={5500}>
                    {projects.map((project, index) => {
                        const IconComponent = iconMap[project.icon] || FolderFiles;
                        return (
                            <CarouselSlide
                                key={project.id}
                                className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_33%]"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                    className="glass-card flex flex-col h-full group relative overflow-hidden p-0"
                                >
                                    {/* Card Header */}
                                    <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 p-6 flex items-start justify-between relative">
                                        <div className="absolute inset-0 bg-grid-black/[0.03]" />
                                        <div className="relative z-10 p-3 rounded-xl bg-white/70 text-indigo-600 shadow-sm">
                                            <IconComponent size={28} />
                                        </div>

                                        <div className="flex gap-3 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <a href="#" className="p-2 bg-white/70 rounded-full hover:bg-white/90 text-slate-900 transition-colors">
                                                <Github size={18} />
                                            </a>
                                            <a href="#" className="p-2 bg-white/70 rounded-full hover:bg-white/90 text-slate-900 transition-colors">
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        {project.role && (
                                            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
                                                {project.role}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between gap-2">
                                            <span>{project.title}</span>
                                            <ArrowRight size={18} className="shrink-0 -rotate-45 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        </h3>

                                        <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag, idx) => (
                                                <span key={idx} className="text-xs font-medium text-indigo-700 bg-indigo-500/10 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </CarouselSlide>
                        );
                    })}
                </Carousel>
            </div>
        </section>
    );
};

export default Projects;

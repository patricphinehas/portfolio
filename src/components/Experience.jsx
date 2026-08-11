import React from 'react';
import { experience, education, speaking } from '../data/portfolio';
import { Briefcase, GraduationCap, Sparkles } from './icons/KoboyoIcons';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container mx-auto px-4">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    <span className="gradient-text">Experience</span>
                </motion.h2>

                <div className="space-y-12 max-w-5xl mx-auto">
                    {experience.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Timeline Line for Desktop */}
                            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-black/10 -translate-x-1/2" />

                            <div className={`md:flex items-start justify-between gap-10 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" />

                                {/* Date */}
                                <div className={`hidden md:block w-1/2 text-gray-500 font-mono text-sm ${index % 2 === 0 ? 'text-left' : 'text-right'} pt-1`}>
                                    {job.period}
                                </div>

                                {/* Mobile Date */}
                                <span className="md:hidden text-sm text-indigo-600 font-mono mb-2 block">{job.period}</span>

                                {/* Content Card */}
                                <div className="md:w-1/2">
                                    <div className="glass-card p-6 md:p-8 hover:border-indigo-500/30">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{job.role}</h3>
                                        <div className="flex items-center gap-2 text-indigo-600 mb-4 font-medium">
                                            <Briefcase size={16} />
                                            <span>{job.company}</span>
                                        </div>

                                        <ul className="space-y-3 text-gray-600">
                                            {job.description.map((desc, i) => (
                                                <li key={i} className="text-sm md:text-base leading-relaxed flex gap-3">
                                                    <span className="text-indigo-500 mt-1.5">•</span>
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Education Section */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12 text-center"
                    >
                        Education
                    </motion.h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card flex items-start gap-4 p-6"
                            >
                                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">{edu.school}</p>
                                    <span className="inline-block mt-2 text-xs font-mono text-indigo-700 bg-indigo-500/10 px-2 py-1 rounded">{edu.period}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Speaking & Mentorship */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card flex items-start gap-4 p-6 max-w-4xl mx-auto mt-6 border-indigo-500/20"
                >
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{speaking.title}</h3>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{speaking.description}</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Experience;

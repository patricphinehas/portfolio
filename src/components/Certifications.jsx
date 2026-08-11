import React from 'react';
import { certifications } from '../data/portfolio';
import { Award, ExternalLink, Calendar } from './icons/KoboyoIcons';
import { motion } from 'framer-motion';
import { Carousel, CarouselSlide } from './ui/Carousel';

const Certifications = () => {
    return (
        <section id="certifications" className="section bg-black/[0.02]">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Licenses & <span className="gradient-text">Certifications</span>
                </motion.h2>

                <Carousel className="max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <CarouselSlide key={cert.id} className="flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_48%]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 2) * 0.1 }}
                                className="glass-card p-6 hover:border-indigo-500/30 group h-full"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500/20 transition-colors">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-indigo-600 font-medium">{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={cert.credentialUrl}
                                        className="p-2 rounded-lg bg-black/[0.03] hover:bg-black/[0.06] text-gray-500 hover:text-slate-900 transition-colors"
                                        aria-label="View credential"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Calendar size={14} />
                                    <span>{cert.date}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-lg text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </CarouselSlide>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default Certifications;

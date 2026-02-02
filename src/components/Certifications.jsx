import React from 'react';
import { certifications } from '../data/portfolio';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Certifications = () => {
    return (
        <section id="certifications" className="section bg-black/20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Licenses & <span className="gradient-text">Certifications</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 hover:border-indigo-500/30 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-indigo-400 font-medium">{cert.issuer}</p>
                                    </div>
                                </div>
                                <a
                                    href={cert.credentialUrl}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    aria-label="View credential"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                <Calendar size={14} />
                                <span>{cert.date}</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {cert.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-lg text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;

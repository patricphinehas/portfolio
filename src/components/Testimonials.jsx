import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolio';
import { Sparkles } from './icons/KoboyoIcons';

const Testimonials = () => {
    return (
        <section id="testimonials" className="section">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    What Clients <span className="gradient-text">Say</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 flex flex-col h-full"
                        >
                            <div className="flex gap-1 text-amber-400 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Sparkles key={i} size={16} />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed flex-grow italic">"{t.quote}"</p>
                            <div className="mt-6 pt-4 border-t border-black/5">
                                <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                                <p className="text-xs text-gray-500">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-8 max-w-xl mx-auto">
                    Placeholder testimonials shown above pending real client quotes — swap in verified feedback before this goes live.
                </p>
            </div>
        </section>
    );
};

export default Testimonials;

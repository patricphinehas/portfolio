import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '../data/portfolio';
import { ArrowRight } from './icons/KoboyoIcons';

const CaseStudies = () => {
    const [activeId, setActiveId] = useState(caseStudies[0].id);
    const active = caseStudies.find((c) => c.id === activeId);

    return (
        <section id="case-studies" className="section bg-black/[0.02]">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Case <span className="gradient-text">Studies</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-600 max-w-2xl mx-auto -mt-8 mb-16"
                >
                    A closer look at the problem, approach, and outcome behind a few flagship engagements.
                </motion.p>

                <div className="max-w-4xl mx-auto">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {caseStudies.map((cs) => (
                            <button
                                key={cs.id}
                                onClick={() => setActiveId(cs.id)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeId === cs.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-black/[0.03] text-gray-600 hover:bg-black/[0.06]'
                                    }`}
                            >
                                {cs.title}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card p-8 md:p-10"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{active.title}</h3>
                                    <p className="text-indigo-600 font-medium">{active.subtitle}</p>
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-black/[0.03] px-3 py-1.5 rounded-full">
                                    {active.role}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Problem</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{active.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Approach</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{active.approach}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Result</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{active.result}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-8">
                                {active.tags.map((tag, idx) => (
                                    <span key={idx} className="text-xs font-medium text-indigo-700 bg-indigo-500/10 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a href="#contact" className="inline-flex items-center gap-2 mt-8 text-indigo-600 font-semibold hover:gap-3 transition-all group">
                                Discuss a similar project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;

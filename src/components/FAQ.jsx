import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { faqs, responsePromise } from '../data/portfolio';
import { Calendar } from './icons/KoboyoIcons';

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
        },
    })),
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="section">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
            </Helmet>
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Frequently Asked <span className="gradient-text">Questions</span>
                </motion.h2>

                <div className="max-w-3xl mx-auto">
                    {/* Response-time promise banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 glass-card p-5 mb-10 border-indigo-500/20"
                    >
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{responsePromise.headline}</p>
                            <p className="text-sm text-gray-600">{responsePromise.detail}</p>
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-0 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-center justify-between gap-4 text-left p-6 font-semibold text-slate-900"
                                    >
                                        <span>{faq.question}</span>
                                        <span
                                            className={`shrink-0 text-indigo-500 text-2xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                                            aria-hidden="true"
                                        >
                                            +
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

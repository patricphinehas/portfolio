import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { faqs, responsePromise } from '../data/portfolio';
import SectionIntro, { TEAL, CREAM, sectionGrid, pad } from './SectionIntro';

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
    const sectionRef = useRef(null);
    const stamped = useInView(sectionRef, { once: true, amount: 0.75 });

    return (
        <section ref={sectionRef} className="py-10 md:py-14">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
            </Helmet>
            <div className={sectionGrid}>
                <div className="xl:col-span-4">
                    <SectionIntro label="FAQ" title={<>Frequently asked<br />questions</>}>
                        The things people usually ask before we start working together.
                    </SectionIntro>
                    <motion.div
                        className="mt-10 flex items-center gap-6"
                        animate={stamped ? { x: [0, -5, 4, -2, 0] } : undefined}
                        transition={{ delay: 0.28, duration: 0.35 }}
                    >
                        <motion.div
                            className="relative h-40 w-40 shrink-0"
                            aria-hidden="true"
                            initial={{ scale: 2.4, opacity: 0, rotate: -40 }}
                            animate={stamped ? { scale: 1, opacity: 1, rotate: -15 } : undefined}
                            transition={{ type: 'spring', stiffness: 520, damping: 20, mass: 0.9 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full border-2"
                                style={{ borderColor: TEAL }}
                                initial={{ scale: 1, opacity: 0 }}
                                animate={stamped ? { scale: [1, 1.7], opacity: [0.6, 0] } : undefined}
                                transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
                            />
                            <svg viewBox="0 0 200 200" className="absolute inset-0">
                                <circle cx="100" cy="100" r="97" fill={CREAM} stroke={TEAL} strokeWidth="1.5" />
                                <circle cx="100" cy="100" r="63" fill="none" stroke={TEAL} strokeWidth="1" strokeDasharray="3 4" />
                            </svg>
                            <motion.svg
                                viewBox="0 0 200 200"
                                className="absolute inset-0"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                            >
                                <defs>
                                    <path id="faq-seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                                </defs>
                                <text fill={TEAL} fontSize="14" fontWeight="700" letterSpacing="3">
                                    <textPath href="#faq-seal-ring" textLength="486" lengthAdjust="spacing">
                                        PERSONAL REPLY • EVERY ENQUIRY • WITHIN A DAY •
                                    </textPath>
                                </text>
                            </motion.svg>
                            <div
                                className="absolute inset-[23%] flex flex-col items-center justify-center rounded-full text-white"
                                style={{ backgroundColor: TEAL }}
                            >
                                <span className="text-3xl font-extrabold leading-none">24h</span>
                                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]">reply</span>
                            </div>
                        </motion.div>
                        <div>
                            <p className="font-bold text-slate-900">{responsePromise.headline}</p>
                            <p className="mt-1 text-sm text-gray-600">{responsePromise.detail}</p>
                        </div>
                    </motion.div>
                </div>

                <ul className="border-t border-slate-900/10 xl:col-span-8">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <li key={faq.question} className="border-b border-slate-900/10">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center gap-5 py-6 text-left"
                                >
                                    <span className="font-mono text-sm" style={{ color: TEAL }}>{pad(index + 1)}</span>
                                    <span className="flex-1 text-lg font-semibold text-slate-900">{faq.question}</span>
                                    <span
                                        className={`shrink-0 text-2xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                                        style={{ color: TEAL }}
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-6 pl-10 leading-relaxed text-gray-600">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default FAQ;

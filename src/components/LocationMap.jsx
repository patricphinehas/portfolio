import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { ArrowRight } from './icons/KoboyoIcons';

const LocationMap = () => {
    const query = encodeURIComponent(personalInfo.location);
    const embedSrc = `https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

    return (
        <section id="location" className="section bg-black/[0.02]">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Based in <span className="gradient-text">{personalInfo.location}</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-600 max-w-2xl mx-auto -mt-8 mb-12"
                >
                    Working with clients locally and remotely, worldwide.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-2 max-w-4xl mx-auto overflow-hidden"
                >
                    <div className="rounded-2xl overflow-hidden aspect-[16/7]">
                        <iframe
                            title={`Map showing ${personalInfo.location}`}
                            src={embedSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                        <p className="text-gray-600 text-sm">
                            Available for on-site meetings in {personalInfo.location}, or fully remote anywhere else.
                        </p>
                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all shrink-0"
                        >
                            Get Directions
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LocationMap;

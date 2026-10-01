import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolio';
import { ExternalLink } from './icons/KoboyoIcons';
import SectionIntro, { TEAL, CREAM, sectionGrid, pad } from './SectionIntro';

const Certifications = () => (
    <section className="py-10 md:py-14">
        <div className={sectionGrid}>
            <div className="xl:col-span-4">
                <SectionIntro
                    label="Certifications"
                    title={<>Licenses &amp;<br />Certifications</>}
                >
                    {certifications.length} credentials that back up the day-to-day work.
                </SectionIntro>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 xl:col-span-8">
                {certifications.map((cert, i) => (
                    <motion.li
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col rounded-3xl p-6 md:p-7"
                        style={{ backgroundColor: CREAM }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <span className="font-mono text-sm" style={{ color: TEAL }}>{pad(i + 1)}</span>
                            {cert.credentialUrl && cert.credentialUrl !== '#' && (
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${cert.title} credential`}
                                    className="rounded-full p-2 transition-colors hover:bg-white"
                                    style={{ color: TEAL }}
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                        <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">{cert.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            {cert.issuer} · {cert.date}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                            {cert.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-white px-3 py-1 text-xs font-medium"
                                    style={{ color: TEAL }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    </section>
);

export default Certifications;

import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import { PinnedInCard } from './StackCard';
import SectionIntro, { TEAL, CORAL, sectionGrid, pad } from './SectionIntro';

const Experience = () => (
    <section className="py-10 md:py-14">
        <div className={sectionGrid}>
            <PinnedInCard className="xl:col-span-4">
                <SectionIntro label="Experience" title={<>Where I&apos;ve<br />worked</>}>
                    {experience.length} roles, most recent first.
                </SectionIntro>
            </PinnedInCard>

            <ol className="border-t border-slate-900/10 xl:col-span-8">
                {experience.map((job, i) => (
                    <motion.li
                        key={job.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="grid gap-4 border-b border-slate-900/10 py-8 md:grid-cols-[180px_1fr] md:gap-10"
                    >
                        <div>
                            <p className="font-mono text-sm" style={{ color: TEAL }}>{pad(i + 1)}</p>
                            <p className="mt-1 text-sm text-gray-500">{job.period}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{job.role}</h3>
                            <p className="mt-1 font-medium" style={{ color: TEAL }}>{job.company}</p>
                            <ul className="mt-5 space-y-2.5">
                                {job.description.map((desc) => (
                                    <li key={desc} className="flex gap-3 leading-relaxed text-gray-600">
                                        <span
                                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: CORAL }}
                                        />
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </div>
    </section>
);

export default Experience;

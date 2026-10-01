import React from 'react';
import { motion } from 'framer-motion';
import { education, speaking } from '../data/portfolio';
import { GraduationCap, Sparkles } from './icons/KoboyoIcons';
import SectionIntro, { TEAL, CREAM, sectionGrid, pad } from './SectionIntro';

const items = [
    ...education.map((edu) => ({ Icon: GraduationCap, title: edu.degree, subtitle: edu.school, meta: edu.period })),
    { Icon: Sparkles, title: speaking.title, subtitle: speaking.description, meta: 'Ongoing' },
];

const Education = () => (
    <section className="py-10 md:py-14">
        <div className={sectionGrid}>
            <div className="xl:col-span-4">
                <SectionIntro label="Education" title={<>Education &amp;<br />teaching</>}>
                    Where the foundations came from, and how I give back.
                </SectionIntro>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 xl:col-span-8">
                {items.map(({ Icon, title, subtitle, meta }, i) => (
                    <motion.li
                        key={title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex flex-col rounded-3xl p-6 md:p-8 ${i === items.length - 1 ? 'md:col-span-2' : ''}`}
                        style={{ backgroundColor: CREAM }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="rounded-2xl p-3 text-white" style={{ backgroundColor: TEAL }}>
                                <Icon size={24} />
                            </div>
                            <span className="font-mono text-sm" style={{ color: TEAL }}>{pad(i + 1)}</span>
                        </div>
                        <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight text-slate-900">{title}</h3>
                        <p className="mt-2 leading-relaxed text-gray-600">{subtitle}</p>
                        <p className="mt-auto pt-5 font-mono text-xs" style={{ color: TEAL }}>{meta}</p>
                    </motion.li>
                ))}
            </ul>
        </div>
    </section>
);

export default Education;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolio';
import SectionIntro, { TEAL, CORAL, CREAM, sectionGrid, pad } from './SectionIntro';

const totalTools = skills.reduce((n, g) => n + g.items.length, 0);

const Skills = () => {
    const [active, setActive] = useState(0);
    const group = skills[active];

    return (
        <section className="py-10 md:py-14">
            <div className={sectionGrid}>
                <div className="min-w-0 xl:col-span-5">
                    <SectionIntro label="Skills" title={<>Technical<br />Competencies</>}>
                        {skills.length} disciplines · {totalTools} tools I work with day to day.
                    </SectionIntro>

                    {/* Phones: one swipeable row bleeding to the card edges. Tablets: wrapped rows. xl: the list below. */}
                    <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-10 sm:px-10 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 xl:hidden">
                        {skills.map((g, i) => (
                            <button
                                key={g.category}
                                onClick={(e) => {
                                    setActive(i);
                                    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                }}
                                aria-pressed={i === active}
                                className="shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                                style={
                                    i === active
                                        ? { backgroundColor: TEAL, borderColor: TEAL, color: '#fff' }
                                        : { borderColor: 'rgba(36, 157, 143, 0.25)', color: '#334155' }
                                }
                            >
                                {g.category}
                            </button>
                        ))}
                    </div>

                    <ul className="mt-8 hidden border-t border-slate-900/10 xl:block">
                        {skills.map((g, i) => {
                            const isActive = i === active;
                            return (
                                <li key={g.category}>
                                    <button
                                        onMouseEnter={() => setActive(i)}
                                        onFocus={() => setActive(i)}
                                        onClick={() => setActive(i)}
                                        aria-pressed={isActive}
                                        className="relative flex w-full items-center gap-4 border-b border-slate-900/10 py-2.5 pl-4 pr-2 text-left"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="skills-active-bar"
                                                className="absolute inset-y-1 left-0 w-1 rounded-full"
                                                style={{ backgroundColor: TEAL }}
                                                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                            />
                                        )}
                                        <span className="font-mono text-xs text-slate-500">{pad(i + 1)}</span>
                                        <span
                                            className={`flex-1 text-sm font-semibold transition-colors ${isActive ? '' : 'text-slate-600'}`}
                                            style={isActive ? { color: TEAL } : undefined}
                                        >
                                            {g.category}
                                        </span>
                                        <span className="font-mono text-xs text-slate-500">{g.items.length}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="min-w-0 xl:col-span-7 xl:pt-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-3xl p-6 sm:p-8 md:min-h-[380px] xl:min-h-[420px] xl:p-10"
                            style={{ backgroundColor: CREAM }}
                        >
                            <p className="font-mono text-sm" style={{ color: TEAL }}>
                                {pad(active + 1)} / {pad(skills.length)}
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {group.category}
                            </h3>

                            <ul className="mt-6 grid gap-x-8 sm:mt-8 sm:grid-cols-2">
                                {group.items.map((item, i) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                                        className="flex items-center gap-3 border-b border-slate-900/10 py-3"
                                    >
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: CORAL }} />
                                        <span className="font-medium text-slate-800">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;

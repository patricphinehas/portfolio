import React, { useMemo } from 'react';
import { personalInfo } from '../data/portfolio';
import { Linkedin } from 'lucide-react';
import { ArrowRight, DeveloperLaptop } from './icons/KoboyoIcons';
import { motion } from 'framer-motion';
import { SiReact, SiAngular, SiTypescript, SiPython, SiNodedotjs, SiDocker, SiMongodb, SiFigma, SiTailwindcss, SiGit, SiAwsamplify, SiPostgresql } from 'react-icons/si';
import { features } from '../config/features';

const Hero = () => {
    const techIcons = [
        { Icon: SiReact, color: '#61DAFB', name: 'React' },
        { Icon: SiAngular, color: '#DD0031', name: 'Angular' },
        { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
        { Icon: SiPython, color: '#3776AB', name: 'Python' },
        { Icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
        { Icon: SiDocker, color: '#2496ED', name: 'Docker' },
        { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
        { Icon: SiFigma, color: '#F24E1E', name: 'Figma' },
        { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
        { Icon: SiGit, color: '#F05032', name: 'Git' },
        { Icon: SiAwsamplify, color: '#FF9900', name: 'AWS' },
        { Icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
    ];

    const randomizedIcons = useMemo(() => {
        return techIcons.map((icon) => ({
            ...icon,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
            delay: Math.random() * 2,
            duration: 4 + Math.random() * 3,
        }));
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
        >
            <div className="pointer-events-none absolute top-[-10%] left-[-20%] -z-10 h-[280px] w-[280px] rounded-full bg-indigo-400/20 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
            <div className="pointer-events-none absolute right-[-15%] bottom-[-10%] -z-10 h-[240px] w-[240px] rounded-full bg-purple-400/20 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />

            <div className="absolute inset-0 -z-5 pointer-events-none hidden lg:block">
                {randomizedIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{ left: item.left, top: item.top }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.05, 0.15, 0.05],
                            scale: [0.9, 1, 0.9],
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            opacity: {
                                duration: item.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: item.delay,
                            },
                            scale: {
                                duration: item.duration + 1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: item.delay,
                            },
                            y: {
                                duration: item.duration + 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: item.delay,
                            },
                            rotate: {
                                duration: item.duration + 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: item.delay,
                            },
                        }}
                    >
                        <item.Icon size={60} color={item.color} />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto grid w-full items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="min-w-0 space-y-5 sm:space-y-6 lg:max-w-xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white ring-2 ring-white/70 sm:h-12 sm:w-12"
                            role="img"
                            aria-label={`Profile photo placeholder for ${personalInfo.name}`}
                        >
                            PR
                        </div>
                        <div className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-indigo-700 sm:px-4 sm:text-sm">
                            Available for Hire
                        </div>
                    </motion.div>

                    <div className="space-y-3 sm:space-y-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600 sm:text-xs">
                            {personalInfo.name}
                        </p>
                        <h1 className="text-[2.35rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Building
                            <br />
                            <span className="gradient-text pb-1">Digital Experiences</span>
                        </h1>
                        <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl md:font-light">
                            {personalInfo.role} focused on accessible, pixel-perfect interfaces.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-3 sm:pt-2"
                    >
                        <a href="#contact" className="btn btn-primary group w-full justify-center sm:w-auto">
                            Get in Touch
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        {features.showSelectedWorks && (
                            <a href="#projects" className="btn btn-outline w-full justify-center sm:w-auto">
                                View My Work
                            </a>
                        )}
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline w-full justify-center sm:w-auto"
                        >
                            <Linkedin size={18} /> LinkedIn
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden justify-center lg:flex"
                >
                    <div className="relative aspect-square w-full max-w-lg">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 rounded-full border border-dashed border-black/10"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-12 rounded-full border border-black/10"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute -bottom-6 -left-4 z-20 md:-left-12"
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0], rotate: [0, -2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-indigo-500 drop-shadow-[0_15px_25px_rgba(99,102,241,0.35)]"
                            >
                                <DeveloperLaptop className="h-auto w-28 md:w-36" />
                            </motion.div>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2">
                            <div className="glass-card relative z-10 rotate-[-6deg] border-indigo-500/20 bg-white/70 p-8 transition-transform duration-500 hover:rotate-0">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-400" />
                                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                                        <div className="h-3 w-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="font-mono text-xs text-gray-400">portfolio.tsx</div>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex gap-2">
                                        <span className="text-purple-600">const</span>
                                        <span className="text-blue-600">developer</span>
                                        <span className="text-slate-900">=</span>
                                        <span className="text-amber-600">{'{'}</span>
                                    </div>
                                    <div className="pl-4 text-gray-700">
                                        name: <span className="text-green-600">"{personalInfo.name}"</span>,
                                    </div>
                                    <div className="pl-4 text-gray-700">
                                        role: <span className="text-green-600">"{personalInfo.role}"</span>,
                                    </div>
                                    <div className="pl-4 text-gray-700">
                                        passion: <span className="text-green-600">"Building Amazing Things"</span>
                                    </div>
                                    <div className="text-amber-600">{'}'}</div>
                                </div>
                                <div className="absolute -right-6 -bottom-6 -z-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-60 blur-xl" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

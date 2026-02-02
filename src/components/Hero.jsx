import React, { useMemo } from 'react';
import { personalInfo } from '../data/portfolio';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiReact, SiAngular, SiTypescript, SiPython, SiNodedotjs, SiDocker, SiMongodb, SiFigma, SiTailwindcss, SiGit, SiAwsamplify, SiPostgresql } from 'react-icons/si';

const Hero = () => {
    // All tech icons with their colors
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

    // Randomize positions for banner effect - memoized so it doesn't change on re-render
    const randomizedIcons = useMemo(() => {
        return techIcons.map((icon, index) => ({
            ...icon,
            // Random position across the width and height
            left: `${Math.random() * 90 + 5}%`, // 5% to 95%
            top: `${Math.random() * 80 + 10}%`, // 10% to 90%
            delay: Math.random() * 2, // Random delay 0-2s
            duration: 4 + Math.random() * 3, // Random duration 4-7s
        }));
    }, []);

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

            {/* Tech Icons Banner - Continuously Animated */}
            <div className="absolute inset-0 hidden lg:block -z-5 pointer-events-none">
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
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            opacity: {
                                duration: item.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            },
                            scale: {
                                duration: item.duration + 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            },
                            y: {
                                duration: item.duration + 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            },
                            rotate: {
                                duration: item.duration + 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            }
                        }}
                    >
                        <item.Icon size={60} color={item.color} />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 lg:max-w-xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide"
                    >
                        Available for New Challenges
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        Building  <br />
                        <span className="gradient-text pb-2">Digital Experiences</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-400 font-light">
                        I'm {personalInfo.name}, a {personalInfo.role} focused on creating accessible, pixel-perfect user interfaces.
                    </h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <a href="#projects" className="btn btn-primary group">
                            View My Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                            <Linkedin size={18} /> LinkedIn
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right side visual - Abstract Interactive Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex justify-center items-center relative"
                >
                    <div className="relative w-full max-w-lg aspect-square">
                        {/* Abstract Circles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/5 rounded-full border-dashed"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-12 border border-white/5 rounded-full"
                        />

                        {/* Main Centerpiece */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5">
                            <div className="glass-card p-8 rotate-[-6deg] hover:rotate-0 transition-transform duration-500 border-indigo-500/20 relative z-10 bg-black/40">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">portfolio.tsx</div>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex gap-2">
                                        <span className="text-purple-400">const</span>
                                        <span className="text-blue-400">developer</span>
                                        <span className="text-white">=</span>
                                        <span className="text-yellow-300">{"{"}</span>
                                    </div>
                                    <div className="pl-4 text-gray-300">
                                        name: <span className="text-green-400">"{personalInfo.name}"</span>,
                                    </div>
                                    <div className="pl-4 text-gray-300">
                                        role: <span className="text-green-400">"{personalInfo.role}"</span>,
                                    </div>
                                    <div className="pl-4 text-gray-300">
                                        passion: <span className="text-green-400">"Building Amazing Things"</span>
                                    </div>
                                    <div className="text-yellow-300">{"}"}</div>
                                </div>

                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl -z-10 opacity-60 blur-xl" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

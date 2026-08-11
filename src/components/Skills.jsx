import React from 'react';
import { skills } from '../data/portfolio';
import { motion } from 'framer-motion';
import { Code, PaletteKnife, Database, Cloud, GitBranch, Beaker, Wrench, LayoutTemplate, BarChart, Layers, Pencil, Globe, Brain, Workflow } from './icons/KoboyoIcons';

const Skills = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Icon mapping for categories
    const categoryIcons = {
        "Frontend Frameworks": LayoutTemplate,
        "Languages": Code,
        "Styling & UI": PaletteKnife,
        "Backend & APIs": Layers,
        "Machine Learning & AI": Brain,
        "Automation & Workflow": Workflow,
        "Data Visualization": BarChart,
        "3D & Graphics": Globe,
        "Cloud & DevOps": Cloud,
        "Databases": Database,
        "Version Control": GitBranch,
        "UX/UI Design & Research": Pencil,
        "Testing": Beaker,
        "Other Tools": Wrench,
    };

    return (
        <section id="skills" className="section relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Technical <span className="gradient-text">Competencies</span>
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skills.map((skillGroup, index) => {
                        const IconComponent = categoryIcons[skillGroup.category] || Code;

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className="glass-card hover:bg-black/[0.02] transition-colors group p-8"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500/20 transition-colors">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-600 group-hover:text-indigo-500">
                                        {skillGroup.category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 rounded-lg text-sm bg-black/[0.03] border border-black/10 text-gray-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

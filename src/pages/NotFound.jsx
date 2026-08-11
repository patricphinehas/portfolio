import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { ArrowRight, FolderFiles } from '../components/icons/KoboyoIcons';
import { features } from '../config/features';

const quickLinks = [
    features.showSelectedWorks && { label: 'Projects', href: '/#projects' },
    features.showCaseStudies && { label: 'Case Studies', href: '/#case-studies' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
].filter(Boolean);

const NotFound = () => {
    return (
        <div className="min-h-screen text-slate-800 selection:bg-indigo-500/20 flex flex-col">
            <Seo
                title="Page Not Found"
                description="The page you're looking for doesn't exist. Head back home or jump to FAQ and contact."
                path="/404"
                noindex
            />

            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-lg w-full text-center"
                >
                    <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-6">
                        <FolderFiles size={40} />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
                        <span className="gradient-text">404</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                        This page wandered off.
                    </h2>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
                    </p>

                    <Link to="/" className="btn btn-primary inline-flex mb-8 group">
                        Back to homepage
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex flex-wrap justify-center gap-3">
                        {quickLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-500 bg-black/[0.03] hover:bg-black/[0.06] hover:text-indigo-600 px-4 py-2 rounded-full transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default NotFound;

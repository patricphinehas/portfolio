import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Experience', href: '#experience' }

    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
            >
                <div className={`container mx-auto px-4 ${scrolled ? 'max-w-5xl' : 'max-w-7xl'} transition-all duration-500`}>
                    <div
                        className={`flex justify-between items-center transition-all duration-300 ${scrolled
                            ? 'bg-black/80 backdrop-blur-xl rounded-full py-3 px-6 border border-white/10 shadow-2xl shadow-indigo-500/10'
                            : 'bg-white/5 backdrop-blur-md rounded-2xl py-4 px-8 border border-white/5'
                            }`}
                    >

                        <a href="#home" className="text-2xl font-bold font-outfit tracking-tighter hover:text-indigo-400 transition-colors flex items-center gap-1">
                            Patric<span className="text-indigo-500 text-3xl">.</span>
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 hover:text-white relative group py-1"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                            <a href="#contact" className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all transform hover:-translate-y-0.5">
                                Let's Talk
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 pt-24 md:hidden"
                    >
                        <div className="container mx-auto px-6 flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-3xl font-bold text-gray-300 hover:text-white hover:pl-4 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 hover:pl-4 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact Me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

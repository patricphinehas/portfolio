import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from './icons/KoboyoIcons';

/**
 * Fixed CTA bar shown only on mobile, once the user has scrolled past the hero.
 * Keeps "get in touch" one tap away no matter how far down the page they are.
 */
const StickyMobileCta = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.6);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-white/90 backdrop-blur-xl border-t border-black/5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
                >
                    <a
                        href="#contact"
                        className="btn btn-primary w-full justify-center"
                    >
                        <Mail size={18} /> Get in Touch
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyMobileCta;

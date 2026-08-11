import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { responsePromise } from '../data/portfolio';
import { Sparkles, ArrowRight } from '../components/icons/KoboyoIcons';

const ThankYou = () => {
    return (
        <div className="min-h-screen text-slate-800 selection:bg-indigo-500/20 flex flex-col">
            <Seo
                title="Thank You"
                description="Thanks for reaching out — your message has been received and you'll hear back soon."
                path="/thank-you"
                noindex
            />
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Thank You' }]} />

            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass-card max-w-lg w-full text-center p-10 md:p-14"
                >
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Message <span className="gradient-text">received!</span>
                    </h1>
                    <p className="text-gray-600 mb-2">
                        Thanks for reaching out — I've got your message.
                    </p>
                    <p className="text-gray-600 mb-8">
                        <span className="font-semibold text-slate-900">{responsePromise.headline}.</span> {responsePromise.detail}
                    </p>
                    <Link to="/" className="btn btn-primary inline-flex group">
                        Back to homepage
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </main>
        </div>
    );
};

export default ThankYou;

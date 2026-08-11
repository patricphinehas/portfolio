import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { personalInfo, responsePromise } from '../data/portfolio';
import { ChefHat, Linkedin } from 'lucide-react';
import { Mail } from './icons/KoboyoIcons';
import { motion, useInView } from 'framer-motion';
import { features } from '../config/features';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const footerLinks = [
    features.showSelectedWorks && { label: 'Projects', href: '#projects' },
    features.showCaseStudies && { label: 'Case Studies', href: '#case-studies' },
    { label: 'Skills', href: '#skills' },
    { label: 'FAQ', href: '#faq' },
].filter(Boolean);

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | error
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');

        // No form backend configured yet — fall back to a mailto draft so the
        // enquiry still reaches you, then continue to the thank-you page.
        if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
            const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
            window.location.href = `mailto:${personalInfo.email}?subject=New enquiry from portfolio&body=${body}`;
            navigate('/thank-you');
            return;
        }

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Submission failed');
            navigate('/thank-you');
        } catch (err) {
            setStatus('error');
            setError("Something went wrong sending that — try again, or email me directly.");
        }
    };

    return (
        <footer id="contact" className="section pb-12 pt-32 relative overflow-hidden">
            {/* Footer Gradients */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-indigo-200/30 to-transparent -z-10 pointer-events-none" />

            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">
                        Let's work <br /> <span className="gradient-text">together.</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <p className="text-sm font-semibold text-indigo-600 mb-12">
                        {responsePromise.headline} — {responsePromise.detail}
                    </p>
                </motion.div>

                {/* Contact form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="glass-card max-w-xl mx-auto p-8 mb-16 text-left"
                >
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Name</label>
                            <input
                                id="name" name="name" type="text" required
                                value={form.name} onChange={handleChange}
                                className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Email</label>
                            <input
                                id="email" name="email" type="email" required
                                value={form.email} onChange={handleChange}
                                className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Message</label>
                        <textarea
                            id="message" name="message" rows={4} required
                            value={form.message} onChange={handleChange}
                            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors resize-none"
                            placeholder="Tell me a bit about your project..."
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn btn-primary w-full justify-center disabled:opacity-60"
                    >
                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                </motion.form>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="btn btn-outline text-base px-8 py-4 inline-flex"
                    >
                        <Mail className="mr-3" /> Email Directly
                    </a>
                    <Link
                        to="/lets-cook"
                        className="btn btn-outline text-base px-8 py-4 inline-flex border-2 hover:bg-indigo-50"
                    >
                        <ChefHat className="mr-3" size={20} /> Let&apos;s Cook (bonus)
                    </Link>
                </div>

                <div className="flex justify-center gap-6 mb-16">
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-black/5 hover:bg-indigo-500 hover:text-white text-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
                        aria-label="LinkedIn profile"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="p-4 rounded-full bg-black/5 hover:bg-pink-500 hover:text-white text-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
                        aria-label="Send an email"
                    >
                        <Mail size={24} />
                    </a>
                </div>

                {/* Internal links / sitemap footer */}
                <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500 border-t border-black/10 pt-10 pb-6 max-w-4xl mx-auto">
                    {footerLinks.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-indigo-600 transition-colors">
                            {link.label}
                        </a>
                    ))}
                    <Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                </nav>

                <div className="text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
                    <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                    <p>{personalInfo.location}</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { personalInfo, responsePromise } from '../data/portfolio';
import { ArrowUpRight, BookOpen, ChefHat, Download, Github, Link as LinkIcon, Linkedin } from 'lucide-react';
import { Mail } from './icons/KoboyoIcons';
import { motion } from 'framer-motion';
import SectionIntro, { TEAL, CREAM, sectionGrid } from './SectionIntro';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const footerLinks = [
    { label: 'Projects', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Freelance', href: '/freelance', route: true },
    { label: 'Pokedex', href: '/pokedex', route: true },
];

const inputClass =
    'w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#14635a]';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-700';

const Contact = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | error
    const [error, setError] = useState('');
    const [studyGate, setStudyGate] = useState(false);
    const [studyPw, setStudyPw] = useState('');
    const [studyBad, setStudyBad] = useState(false);

    const unlockStudy = (e) => {
        e.preventDefault();
        if (studyPw !== '1234') {
            setStudyBad(true);
            return;
        }
        window.location.assign(`${import.meta.env.BASE_URL}study/index.html`);
    };

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

    const links = [
        { label: 'Email directly', href: `mailto:${personalInfo.email}`, Icon: Mail },
        { label: 'GitHub', href: personalInfo.github, Icon: Github, external: true },
        { label: 'LinkedIn', href: personalInfo.linkedin, Icon: Linkedin, external: true },
        { label: 'Download resume', href: `${import.meta.env.BASE_URL}resume.pdf`, Icon: Download, download: true },
    ];

    return (
        <footer className="py-10 md:py-14">
            <div className={sectionGrid}>
                <div className="xl:col-span-5">
                    <SectionIntro label="Contact" title={<>Available<br />for hire</>}>
                        {personalInfo.availability} Email {personalInfo.email}.
                    </SectionIntro>
                    <p className="mt-4 text-sm font-semibold" style={{ color: TEAL }}>
                        {responsePromise.headline}
                    </p>

                    <ul className="mt-8 border-t border-slate-900/10">
                        {links.map(({ label, href, Icon, external, download }) => (
                            <li key={label} className="border-b border-slate-900/10">
                                <a
                                    href={href}
                                    {...(download ? { download: true } : {})}
                                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                                    className="group flex items-center gap-4 py-4 font-semibold text-slate-800 transition-colors hover:text-[#14635a]"
                                >
                                    <Icon size={20} style={{ color: TEAL }} />
                                    <span className="flex-1">{label}</span>
                                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            </li>
                        ))}
                        <li className="border-b border-slate-900/10">
                            <Link
                                to="/lets-cook"
                                className="group flex items-center gap-4 py-4 font-semibold text-slate-800 transition-colors hover:text-[#14635a]"
                            >
                                <ChefHat size={20} style={{ color: TEAL }} />
                                <span className="flex-1">Let&apos;s Cook (bonus)</span>
                                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </li>
                        <li className="border-b border-slate-900/10">
                            {studyGate ? (
                                <form onSubmit={unlockStudy} className="flex items-center gap-2 py-3">
                                    <BookOpen size={20} style={{ color: TEAL }} />
                                    <input
                                        type="password"
                                        autoFocus
                                        value={studyPw}
                                        onChange={(e) => {
                                            setStudyPw(e.target.value);
                                            setStudyBad(false);
                                        }}
                                        placeholder="Password"
                                        aria-label="Study desk password"
                                        className="min-w-0 flex-1 rounded-lg border border-slate-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-[#14635a]"
                                    />
                                    <button type="submit" className="text-sm font-semibold" style={{ color: TEAL }}>
                                        Open
                                    </button>
                                    {studyBad && <span className="text-xs text-red-600">Wrong password</span>}
                                </form>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setStudyGate(true)}
                                    className="group flex w-full items-center gap-4 py-4 text-left font-semibold text-slate-800 transition-colors hover:text-[#14635a]"
                                >
                                    <BookOpen size={20} style={{ color: TEAL }} />
                                    <span className="flex-1">Study desk</span>
                                    <span className="sr-only">Private page, not for recruiters.</span>
                                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </button>
                            )}
                            <p className="pb-3 text-sm text-slate-700">Study desk is a private page and not for recruiters.</p>
                        </li>
                        <li className="border-b border-slate-900/10">
                            <Link
                                to="/links"
                                className="group flex items-center gap-4 py-4 font-semibold text-slate-800 transition-colors hover:text-[#14635a]"
                            >
                                <LinkIcon size={20} style={{ color: TEAL }} />
                                <span className="flex-1">All links</span>
                                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-fit rounded-3xl p-6 md:p-10 xl:col-span-7"
                    style={{ backgroundColor: CREAM }}
                >
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Send a note about a role</h3>
                    <p className="mt-1 text-sm text-gray-600">{responsePromise.detail}</p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className={labelClass}>Name</label>
                            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                        </div>
                        <div>
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="message" className={labelClass}>Message</label>
                        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="The role, the team, or a question." />
                    </div>
                    {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn btn-primary mt-6 w-full justify-center disabled:opacity-60 sm:w-auto"
                    >
                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                </motion.form>

                <div className="flex flex-col gap-4 border-t border-slate-900/10 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between xl:col-span-12">
                    <p>© {new Date().getFullYear()} {personalInfo.name} · {personalInfo.location}</p>
                    <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
                        {footerLinks.map((link) => (
                            link.route ? (
                                <Link key={link.href} to={link.href} className="transition-colors hover:text-[#14635a]">
                                    {link.label}
                                </Link>
                            ) : (
                                <a key={link.href} href={link.href} className="transition-colors hover:text-[#14635a]">
                                    {link.label}
                                </a>
                            )
                        ))}
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#14635a]">GitHub</a>
                        <Link to="/privacy-policy" className="transition-colors hover:text-[#14635a]">Privacy Policy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Contact;

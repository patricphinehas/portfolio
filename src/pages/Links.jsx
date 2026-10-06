import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, ChefHat, Instagram, Linkedin, MapPin, Mic2, Youtube } from 'lucide-react';
import Seo from '../components/Seo';
import { Mail } from '../components/icons/KoboyoIcons';
import linksData from '../data/links.json';
import { TEAL } from '../components/SectionIntro';

const icons = {
    mail: Mail,
    linkedin: Linkedin,
    chef: ChefHat,
    book: BookOpen,
    instagram: Instagram,
    youtube: Youtube,
    podcast: Mic2,
};

const linkClass =
    'group flex w-full items-center gap-4 rounded-2xl border border-slate-900/10 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#249D8F]/40 hover:shadow-lg';

const Links = () => {
    const [studyGate, setStudyGate] = useState(false);
    const [studyPw, setStudyPw] = useState('');
    const [studyBad, setStudyBad] = useState(false);

    const unlockStudy = (event) => {
        event.preventDefault();
        if (studyPw !== '1234') {
            setStudyBad(true);
            return;
        }
        window.location.assign(`${import.meta.env.BASE_URL}study/index.html`);
    };

    return (
        <div className="min-h-screen bg-[#FFFCF5] px-4 py-8 text-slate-800 sm:py-12">
            <Seo
                title="Links"
                description="Contact Patric Phinehas Raj by email or LinkedIn, and explore his portfolio projects and tools."
                path="/links"
            />

            <main className="mx-auto w-full max-w-xl">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#249D8F]">
                    <ArrowLeft size={16} />
                    Portfolio
                </Link>

                <header className="mb-8 mt-10 text-center">
                    <div
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white shadow-lg"
                        style={{ backgroundColor: TEAL }}
                    >
                        {linksData.profile.initials}
                    </div>
                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">{linksData.profile.name}</h1>
                    <p className="mt-1 font-medium" style={{ color: TEAL }}>{linksData.profile.role}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin size={14} />
                        {linksData.profile.location}
                    </p>
                </header>

                <ul className="space-y-3">
                    {linksData.links.map((item) => {
                        const Icon = icons[item.icon];
                        const content = (
                            <>
                                <Icon size={22} style={{ color: TEAL }} />
                                <span className="min-w-0 flex-1">
                                    <span className="block font-bold text-slate-900">{item.label}</span>
                                    <span className="block truncate text-sm text-slate-500">{item.detail}</span>
                                </span>
                            </>
                        );

                        if (item.action === 'study') {
                            return (
                                <li key={item.id}>
                                    {studyGate ? (
                                        <form onSubmit={unlockStudy} className={`${linkClass} flex-wrap`}>
                                            <Icon size={22} style={{ color: TEAL }} />
                                            <input
                                                type="password"
                                                autoFocus
                                                value={studyPw}
                                                onChange={(event) => {
                                                    setStudyPw(event.target.value);
                                                    setStudyBad(false);
                                                }}
                                                placeholder="Study desk password"
                                                aria-label="Study desk password"
                                                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                                            />
                                            <button type="submit" className="text-sm font-bold" style={{ color: TEAL }}>Open</button>
                                            {studyBad && <p className="w-full pl-10 text-xs text-red-600">Wrong password</p>}
                                        </form>
                                    ) : (
                                        <button type="button" onClick={() => setStudyGate(true)} className={linkClass}>
                                            {content}
                                            <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </button>
                                    )}
                                </li>
                            );
                        }

                        if (item.placeholder) {
                            return (
                                <li key={item.id}>
                                    <div className={`${linkClass} cursor-default opacity-60 hover:translate-y-0 hover:border-slate-900/10 hover:shadow-sm`}>
                                        {content}
                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">Soon</span>
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li key={item.id}>
                                {item.internal ? (
                                    <Link to={item.href} className={linkClass}>
                                        {content}
                                        <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                        className={linkClass}
                                    >
                                        {content}
                                        <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <p className="mt-8 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} {linksData.profile.name}
                </p>
            </main>
        </div>
    );
};

export default Links;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import PageSidebar from '../components/PageSidebar';
import StackCard, { useWheelSnap } from '../components/StackCard';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Education from '../components/Education';
import PortfolioGrid from '../components/PortfolioGrid';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import PersonJsonLd from '../components/PersonJsonLd';
import { positioning } from '../data/portfolio';

const sections = [
    { id: 'hero', Component: Hero },
    { id: 'portfolio', Component: PortfolioGrid },
    { id: 'skills', Component: Skills },
    { id: 'certifications', Component: Certifications },
    { id: 'experience', Component: Experience },
    { id: 'education', Component: Education },
    { id: 'faq', Component: FAQ },
    { id: 'contact', Component: Contact },
];

const sectionIds = sections.map(({ id }) => id);

const Home = () => {
    const { hash } = useLocation();
    useWheelSnap();

    useEffect(() => {
        const id = hash.replace(/^#/, '');
        if (!id) return undefined;
        const scroll = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
        const frame = requestAnimationFrame(scroll);
        const timer = setTimeout(scroll, 80);
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, [hash]);

    return (
        <div className="min-h-screen text-slate-800 selection:bg-[#14635a]/20">
            <Seo
                title={positioning}
                description={positioning}
                path="/"
                exactTitle
                imageAlt="Patric Phinehas Raj, senior frontend and full stack engineer"
            />
            <PersonJsonLd />

            <PageSidebar sectionIds={sectionIds} />
            <main className="relative transition-[margin] duration-300 lg:ml-[var(--sidebar-w,80px)]">
                {sections.map(({ id, Component }, index) => (
                    <StackCard key={id} id={id} index={index} isLast={index === sections.length - 1}>
                        <Component />
                    </StackCard>
                ))}
            </main>

            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
            />
        </div>
    );
};

export default Home;

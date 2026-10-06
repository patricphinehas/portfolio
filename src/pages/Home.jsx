import React, { Suspense, lazy } from 'react';
import Seo from '../components/Seo';
import PageSidebar from '../components/PageSidebar';
import StackCard from '../components/StackCard';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Education from '../components/Education';
import PortfolioGrid from '../components/PortfolioGrid';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import PersonJsonLd from '../components/PersonJsonLd';

// Loaded separately so the ~450-entry list and card code stay out of the first page load.
const PokeParade = lazy(() => import('../components/PokeParade'));
const Pokedex = lazy(() => import('../components/Pokedex'));
import { features } from '../config/features';

const sections = [
    { id: 'hero', Component: Hero },
    { id: 'skills', Component: Skills },
    { id: 'certifications', Component: Certifications },
    { id: 'experience', Component: Experience },
    { id: 'education', Component: Education },
    features.showSelectedWorks && { id: 'portfolio', Component: PortfolioGrid },
    features.showCaseStudies && { id: 'case-studies', Component: CaseStudies },
    features.showTestimonials && { id: 'testimonials', Component: Testimonials },
    { id: 'faq', Component: FAQ },
    { id: 'pokedex', Component: Pokedex },
    { id: 'contact', Component: Contact },
].filter(Boolean);

const sectionIds = sections.map(({ id }) => id);

const Home = () => {
    return (
        <div className="min-h-screen text-slate-800 selection:bg-[#249D8F]/20">
            <Seo
                title="Senior Fullstack Developer & Digital Consultant"
                description="Patric Phinehas Raj — Senior Fullstack Developer at Bosch and freelance digital consultant. I build fast, accessible web apps and lead product teams, from B2C marketplaces to healthcare dispatch systems and brand websites."
                path="/"
            />
            <PersonJsonLd />

            <PageSidebar sectionIds={sectionIds} />
            <main className="relative transition-[margin] duration-300 lg:ml-[var(--sidebar-w,80px)]">
                {sections.map(({ id, Component }, index) => (
                    <StackCard key={id} id={id} index={index} isLast={index === sections.length - 1}>
                        <Suspense fallback={<div className="min-h-[60vh]" />}>
                            <Component />
                        </Suspense>
                    </StackCard>
                ))}
            </main>
            <Suspense fallback={null}>
                <PokeParade />
            </Suspense>

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

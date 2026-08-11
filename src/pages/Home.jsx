import React from 'react';
import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import LocationMap from '../components/LocationMap';
import Contact from '../components/Contact';
import StickyMobileCta from '../components/StickyMobileCta';
import PersonJsonLd from '../components/PersonJsonLd';
import { features } from '../config/features';

const Home = () => {
    return (
        <div className="min-h-screen text-slate-800 selection:bg-indigo-500/20">
            <Seo
                title="Senior Frontend Engineer & Digital Consultant"
                description="Patric Phinehas Raj — Senior Frontend Engineer at Bosch and freelance digital consultant. I build fast, accessible web apps and lead product teams, from B2C marketplaces to healthcare dispatch systems and brand websites."
                path="/"
            />
            <PersonJsonLd />

            <Navbar />
            <Hero />
            <Skills />
            <Certifications />
            <Experience />
            {features.showSelectedWorks && <Projects />}
            {features.showCaseStudies && <CaseStudies />}
            {features.showTestimonials && <Testimonials />}
            <LocationMap />
            <FAQ />
            <Contact />
            <StickyMobileCta />

            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
            />
        </div>
    );
};

export default Home;

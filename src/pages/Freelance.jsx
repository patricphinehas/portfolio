import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { freelanceFaqs, personalInfo } from '../data/portfolio';
import { TEAL } from '../components/SectionIntro';

const Freelance = () => (
    <div className="min-h-screen bg-[#FDF0D5] px-5 py-10 text-slate-800 sm:px-10">
        <Seo
            title="Freelance"
            description="How Patric Phinehas Raj scopes and prices freelance work for small businesses, separate from the recruiter profile."
            path="/freelance"
        />
        <main className="mx-auto max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:underline">
                <ArrowLeft size={16} />
                Portfolio
            </Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: TEAL }}>
                Freelance
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Small-business work
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
                Pricing and scoping live here, off the recruiter homepage. {personalInfo.availability} Email {personalInfo.email}.
            </p>
            <dl className="mt-10 divide-y divide-slate-900/10 border-y border-slate-900/10">
                {freelanceFaqs.map((faq) => (
                    <div key={faq.question} className="py-6">
                        <dt className="text-lg font-bold text-slate-900">{faq.question}</dt>
                        <dd className="mt-2 leading-relaxed text-slate-700">{faq.answer}</dd>
                    </div>
                ))}
            </dl>
        </main>
    </div>
);

export default Freelance;

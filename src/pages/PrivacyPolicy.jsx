import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { personalInfo } from '../data/portfolio';

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
);

const PrivacyPolicy = () => {
    const lastUpdated = "August 12, 2026";

    return (
        <div className="min-h-screen text-slate-800 selection:bg-indigo-500/20">
            <Seo
                title="Privacy Policy"
                description="How Patric Phinehas Raj collects, uses, and protects information submitted through this website's contact form and analytics."
                path="/privacy-policy"
            />
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

            <main className="container mx-auto px-4 max-w-3xl py-10 md:py-16">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-12">Last updated: {lastUpdated}</p>

                <Section title="1. Overview">
                    <p>
                        This Privacy Policy explains how this website ("Site"), operated by {personalInfo.name}, collects,
                        uses, and protects information when you visit or submit an enquiry through the contact form.
                    </p>
                </Section>

                <Section title="2. Information We Collect">
                    <p>When you use the contact form, we collect the information you voluntarily provide, which may include:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Your name and email address</li>
                        <li>The content of your message or enquiry</li>
                    </ul>
                    <p>
                        We also use Google Analytics to collect anonymized usage data (pages visited, approximate
                        location, device/browser type) to understand how the Site is used. This data is aggregated
                        and does not directly identify you.
                    </p>
                </Section>

                <Section title="3. How We Use Your Information">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To respond to your enquiry (typically within 24 hours)</li>
                        <li>To improve the content and usability of the Site</li>
                        <li>We do not sell, rent, or share your personal information with third parties for marketing purposes</li>
                    </ul>
                </Section>

                <Section title="4. Cookies & Analytics">
                    <p>
                        This Site may use cookies via Google Analytics to measure traffic and site performance.
                        You can disable cookies in your browser settings or opt out of Google Analytics tracking
                        using the{' '}
                        <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline"
                        >
                            Google Analytics Opt-out Browser Add-on
                        </a>.
                    </p>
                </Section>

                <Section title="5. Data Retention">
                    <p>
                        Contact form submissions are retained only as long as necessary to respond to and resolve
                        your enquiry, after which they may be deleted.
                    </p>
                </Section>

                <Section title="6. Your Rights">
                    <p>
                        You may request access to, correction of, or deletion of any personal information you've
                        submitted by emailing{' '}
                        <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 hover:underline">
                            {personalInfo.email}
                        </a>.
                    </p>
                </Section>

                <Section title="7. Changes to This Policy">
                    <p>
                        This policy may be updated occasionally to reflect changes in practices or legal requirements.
                        The "Last updated" date above reflects the most recent revision.
                    </p>
                </Section>

                <Section title="8. Contact">
                    <p>
                        Questions about this policy can be directed to{' '}
                        <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 hover:underline">
                            {personalInfo.email}
                        </a>.
                    </p>
                </Section>

                <Link to="/" className="text-indigo-600 font-semibold hover:underline">
                    ← Back to homepage
                </Link>
            </main>
        </div>
    );
};

export default PrivacyPolicy;

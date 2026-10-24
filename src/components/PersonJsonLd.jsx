import React from 'react';
import { Helmet } from 'react-helmet-async';
import { education, personalInfo, positioning, skills } from '../data/portfolio';
import { SITE_NAME, SITE_URL } from './Seo';

/**
 * Person schema (schema.org) for rich results. This is a personal portfolio,
 * so Person is the correct type rather than LocalBusiness.
 */
const PersonJsonLd = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": `${SITE_URL}/`,
                "name": SITE_NAME,
                "description": positioning,
                "inLanguage": "en-IN",
            },
            {
                "@type": "ProfilePage",
                "@id": `${SITE_URL}/#profile`,
                "url": `${SITE_URL}/`,
                "name": `${SITE_NAME}, ${positioning}`,
                "isPartOf": { "@id": `${SITE_URL}/#website` },
                "mainEntity": { "@id": `${SITE_URL}/#person` },
                "inLanguage": "en-IN",
            },
            {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                "name": personalInfo.name,
                "jobTitle": positioning,
                "description": personalInfo.summary,
                "email": personalInfo.email,
                "url": `${SITE_URL}/`,
                "mainEntityOfPage": { "@id": `${SITE_URL}/#profile` },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Coimbatore",
                    "addressCountry": "IN",
                },
                "worksFor": {
                    "@type": "Organization",
                    "name": "Bosch Global Software Technologies",
                },
                "alumniOf": education.map((item) => ({
                    "@type": "CollegeOrUniversity",
                    "name": item.school,
                })),
                "sameAs": [personalInfo.linkedin, personalInfo.github],
                "knowsAbout": skills.flatMap((group) => group.items),
            },
        ],
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
};

export default PersonJsonLd;

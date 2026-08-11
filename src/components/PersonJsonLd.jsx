import React from 'react';
import { Helmet } from 'react-helmet-async';
import { personalInfo, skills } from '../data/portfolio';
import { SITE_URL } from './Seo';

/**
 * Person schema (schema.org) for rich results — this is a personal portfolio,
 * not a registered local business, so Person is the correct type rather than
 * LocalBusiness. Includes freelance "knowsAbout" + sameAs social profiles.
 */
const PersonJsonLd = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": personalInfo.name,
        "jobTitle": personalInfo.role,
        "description": personalInfo.summary,
        "email": personalInfo.email,
        "telephone": personalInfo.phone,
        "url": SITE_URL,
        "image": `${SITE_URL}/profile.jpg`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": personalInfo.location.split(',')[0]?.trim(),
            "addressCountry": "IN",
        },
        "sameAs": [personalInfo.linkedin],
        "knowsAbout": skills.flatMap((group) => group.items).slice(0, 20),
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
};

export default PersonJsonLd;

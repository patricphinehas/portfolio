import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = "Patric Phinehas Raj";
const SITE_URL = "https://patricphinehas.dev";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page SEO tags: unique title, meta description, canonical URL,
 * Open Graph / Twitter social share image.
 */
const Seo = ({
    title,
    description,
    path = '/',
    image = DEFAULT_IMAGE,
    noindex = false,
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Senior Frontend Engineer & Digital Consultant`;
    const canonical = `${SITE_URL}${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default Seo;
export { SITE_NAME, SITE_URL, DEFAULT_IMAGE };

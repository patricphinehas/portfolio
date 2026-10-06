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
    imageAlt,
    noindex = false,
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Senior Fullstack Developer & Digital Consultant`;
    const canonical = `${SITE_URL}${path}`;
    const robots = noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content={SITE_NAME} />
            <meta name="robots" content={robots} />
            <meta name="googlebot" content={robots} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={imageAlt || fullTitle} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={imageAlt || fullTitle} />
        </Helmet>
    );
};

export default Seo;
export { SITE_NAME, SITE_URL, DEFAULT_IMAGE };

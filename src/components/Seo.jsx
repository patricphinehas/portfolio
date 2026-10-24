import React from 'react';
import { Helmet } from 'react-helmet-async';
import { positioning } from '../data/portfolio';

const SITE_NAME = "Patric Phinehas Raj";

// patricthedev.in is not the site root. There is no CNAME, and the host 302s
// every path to https://patricphinehas.github.io/portfolio/. Vite `base` stays
// `/portfolio/` so asset URLs match GitHub project Pages. Canonical URLs use
// the same prefix on the requested host.
const SITE_URL = "https://patricthedev.in/portfolio";

// public/og-image.png is 1536x1024, not 1200x630. Width and height match the file.
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const IMAGE_WIDTH = "1536";
const IMAGE_HEIGHT = "1024";

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
    exactTitle = false,
}) => {
    const fullTitle = exactTitle
        ? title
        : title
            ? `${title} | ${SITE_NAME}`
            : positioning;
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
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

            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={imageAlt || fullTitle} />
            <meta property="og:image:width" content={IMAGE_WIDTH} />
            <meta property="og:image:height" content={IMAGE_HEIGHT} />
            <meta property="og:site_name" content={SITE_NAME} />

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

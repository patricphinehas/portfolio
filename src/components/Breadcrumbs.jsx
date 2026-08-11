import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from './icons/KoboyoIcons';
import { SITE_URL } from './Seo';

/**
 * items: [{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]
 * The last item is rendered as the current page (no link).
 * Also emits BreadcrumbList JSON-LD for rich snippets.
 */
const Breadcrumbs = ({ items = [] }) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            ...(item.href ? { "item": `${SITE_URL}${item.href}` } : {}),
        })),
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>
            <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-28 pb-2">
                <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-1.5">
                                {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
                                {isLast || !item.href ? (
                                    <span className="font-medium text-slate-700" aria-current={isLast ? 'page' : undefined}>
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link to={item.href} className="hover:text-indigo-600 transition-colors">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumbs;

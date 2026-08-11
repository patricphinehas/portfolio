import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Loads gtag.js only if a real GA4 Measurement ID is configured
 * (VITE_GA_MEASUREMENT_ID in .env), and tracks client-side route changes.
 * No-ops entirely if the env var is unset, so it's safe in dev/preview.
 */
const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (!GA_ID || GA_ID.includes('XXXX')) return;

        if (!window.dataLayer) {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script1);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(...args) {
                window.dataLayer.push(args);
            };
            window.gtag('js', new Date());
            window.gtag('config', GA_ID, { send_page_view: false });
        }
    }, []);

    useEffect(() => {
        if (!GA_ID || GA_ID.includes('XXXX') || !window.gtag) return;
        window.gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return null;
};

export default GoogleAnalytics;

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Keeps a column in view on xl screens while its neighbour scrolls inside the card.
export const PinnedInCard = ({ className = '', children }) => (
    <div className={`xl:sticky xl:top-14 xl:self-start ${className}`}>{children}</div>
);

// A wheel notch is far smaller than a screen, so native snapping always pulls the page back.
// Step one card per gesture instead, unless the card under the pointer can still scroll that way.
export const useWheelSnap = () => {
    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        let lockedUntil = 0;
        const canScroll = (node, dir) => {
            for (let el = node; el && el !== document.body; el = el.parentElement) {
                const { overflowY } = getComputedStyle(el);
                if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
                    if (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
                }
            }
            return false;
        };
        const onWheel = (e) => {
            if (e.ctrlKey || e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            const dir = Math.sign(e.deltaY);
            if (canScroll(e.target, dir)) return;
            const now = performance.now();
            const tops = [...document.querySelectorAll('.section-snap')].map((el) => el.getBoundingClientRect().top + scrollY);
            const target = dir > 0 ? tops.find((t) => t > scrollY + 2) : [...tops].reverse().find((t) => t < scrollY - 2);
            if (target === undefined) return;
            e.preventDefault();
            // Swallow the rest of the gesture, including trackpad inertia, until the wheel goes quiet.
            if (now > lockedUntil) scrollTo({ top: target, behavior: 'smooth' });
            lockedUntil = now + 600;
        };
        addEventListener('wheel', onWheel, { passive: false });
        return () => removeEventListener('wheel', onWheel);
    }, []);
};

const sectionLabel = {
    hero: 'Home',
    portfolio: 'Projects',
    skills: 'Skills',
    certifications: 'Certifications',
    experience: 'Experience',
    education: 'Education',
    faq: 'FAQ',
    contact: 'Contact',
};

const StackCard = ({ id, index, isLast, children }) => {
    const reduceMotion = useReducedMotion();
    const scrollerRef = useRef(null);
    const [scrollable, setScrollable] = useState(false);

    useLayoutEffect(() => {
        const el = scrollerRef.current;
        if (!el) return undefined;
        const update = () => setScrollable(el.scrollHeight > el.clientHeight + 1);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        if (el.firstElementChild) observer.observe(el.firstElementChild);
        return () => observer.disconnect();
    }, []);

    // Once this screen has finished, the next card slides straight over it.
    const endRef = useRef(null);
    const { scrollYProgress: coverProgress } = useScroll({ target: endRef, offset: ['end end', 'end start'] });
    const shade = useTransform(coverProgress, [0, 1], [0, isLast ? 0 : 0.35]);
    const scale = useTransform(coverProgress, [0, 1], [1, isLast ? 1 : 0.965]);

    return (
        <>
            <div id={id} className="section-snap" aria-hidden="true" />
            <div className="sticky top-0 h-[100svh]" style={{ zIndex: index + 1 }}>
                <motion.div
                    className="stack-card relative h-full w-full origin-top overflow-hidden"
                    style={{ scale: reduceMotion ? 1 : scale }}
                >
                    <div
                        ref={scrollerRef}
                        className="stack-scroll h-full overflow-y-auto pb-20 lg:pb-0"
                        tabIndex={scrollable ? 0 : undefined}
                        role={scrollable ? 'region' : undefined}
                        aria-label={scrollable ? sectionLabel[id] || id : undefined}
                    >
                        <div className="flex min-h-full flex-col" style={{ justifyContent: 'safe center' }}>
                            {children}
                        </div>
                    </div>
                    {!reduceMotion && (
                        <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-slate-900" />
                    )}
                </motion.div>
            </div>
            <div ref={endRef} aria-hidden="true" />
        </>
    );
};

export default StackCard;

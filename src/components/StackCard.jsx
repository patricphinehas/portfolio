import React, { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { motion, motionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const ContentYContext = createContext(motionValue(0));

// Cancels the card's content slide on xl screens, so a column stays put while its neighbour scrolls.
export const PinnedInCard = ({ className = '', children }) => {
    const contentY = useContext(ContentYContext);
    const pinY = useTransform(contentY, (v) => `${-v}px`);
    return (
        <motion.div style={{ '--pin-y': pinY }} className={`xl:translate-y-[var(--pin-y)] ${className}`}>
            {children}
        </motion.div>
    );
};

const StackCard = ({ id, index, isLast, children }) => {
    const viewportRef = useRef(null);
    const contentRef = useRef(null);
    const spacerRef = useRef(null);
    const [overflow, setOverflow] = useState(0);
    const reduceMotion = useReducedMotion();

    useLayoutEffect(() => {
        const measure = () =>
            setOverflow(Math.max(0, contentRef.current.offsetHeight - viewportRef.current.clientHeight));
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(contentRef.current);
        ro.observe(viewportRef.current);
        return () => ro.disconnect();
    }, []);

    // The spacer adds scroll distance equal to the hidden content, so the card stays pinned while its content slides.
    const { scrollYProgress: contentProgress } = useScroll({ target: spacerRef, offset: ['start end', 'end end'] });
    const contentY = useTransform(contentProgress, (p) => (overflow ? -p * overflow : 0));

    // Once the content has finished, the next card slides straight over this one.
    const endRef = useRef(null);
    const { scrollYProgress: coverProgress } = useScroll({ target: endRef, offset: ['end end', 'end start'] });
    const shade = useTransform(coverProgress, [0, 1], [0, isLast ? 0 : 0.35]);
    const scale = useTransform(coverProgress, [0, 1], [1, isLast ? 1 : 0.965]);

    return (
        <>
            <div id={id} aria-hidden="true" />
            <div className="sticky top-0 h-[100svh]" style={{ zIndex: index + 1 }}>
                <motion.div
                    className="stack-card relative h-full w-full origin-top overflow-hidden"
                    style={{ scale: reduceMotion ? 1 : scale }}
                >
                    <div ref={viewportRef} className="h-full overflow-hidden pb-20 lg:pb-0">
                        <motion.div
                            ref={contentRef}
                            style={{ y: contentY }}
                            className="flex min-h-full flex-col justify-center"
                        >
                            <ContentYContext.Provider value={contentY}>{children}</ContentYContext.Provider>
                        </motion.div>
                    </div>
                    {!reduceMotion && (
                        <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-slate-900" />
                    )}
                </motion.div>
            </div>
            <div ref={spacerRef} style={{ height: overflow }} aria-hidden="true" />
            <div ref={endRef} aria-hidden="true" />
        </>
    );
};

export default StackCard;

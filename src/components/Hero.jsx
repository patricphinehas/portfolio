import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useSpring,
    useTransform,
} from 'framer-motion';
import { Linkedin } from 'lucide-react';
import {
    SiReact, SiAngular, SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs,
    SiPython, SiVuedotjs, SiTailwindcss, SiExpress, SiFastapi, SiGraphql, SiMongodb, SiPostgresql, SiDocker, SiFigma,
    SiGit, SiGithub, SiAmazonwebservices, SiFirebase, SiRedis, SiMysql, SiTensorflow, SiPandas, SiThreedotjs,
    SiJest, SiCypress, SiVite, SiPostman, SiSass,
} from 'react-icons/si';
import { personalInfo } from '../data/portfolio';
import { ArrowRight } from './icons/KoboyoIcons';
import { features } from '../config/features';
import { TEAL, CORAL, sectionGrid } from './SectionIntro';

// radius is a fraction of the field's half-width; speed is radians per second (negative = counter-clockwise).
const RINGS = [
    {
        radius: 0.34, speed: 0.22, tile: 60, icon: 30,
        items: [
            { Icon: SiReact, color: '#61DAFB', name: 'React' },
            { Icon: SiAngular, color: '#DD0031', name: 'Angular' },
            { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
            { Icon: SiJavascript, color: '#E8C400', name: 'JavaScript' },
            { Icon: SiNextdotjs, color: '#111111', name: 'Next.js' },
            { Icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
        ],
    },
    {
        radius: 0.63, speed: -0.14, tile: 54, icon: 26,
        items: [
            { Icon: SiPython, color: '#3776AB', name: 'Python' },
            { Icon: SiVuedotjs, color: '#4FC08D', name: 'Vue.js' },
            { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
            { Icon: SiExpress, color: '#111111', name: 'Express' },
            { Icon: SiFastapi, color: '#009688', name: 'FastAPI' },
            { Icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
            { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
            { Icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
            { Icon: SiDocker, color: '#2496ED', name: 'Docker' },
            { Icon: SiFigma, color: '#F24E1E', name: 'Figma' },
        ],
    },
    {
        radius: 0.91, speed: 0.08, tile: 48, icon: 22,
        items: [
            { Icon: SiGit, color: '#F05032', name: 'Git' },
            { Icon: SiGithub, color: '#181717', name: 'GitHub' },
            { Icon: SiAmazonwebservices, color: '#FF9900', name: 'AWS' },
            { Icon: SiFirebase, color: '#DD2C00', name: 'Firebase' },
            { Icon: SiRedis, color: '#DC382D', name: 'Redis' },
            { Icon: SiMysql, color: '#4479A1', name: 'MySQL' },
            { Icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
            { Icon: SiPandas, color: '#150458', name: 'Pandas' },
            { Icon: SiThreedotjs, color: '#111111', name: 'Three.js' },
            { Icon: SiJest, color: '#C21325', name: 'Jest' },
            { Icon: SiCypress, color: '#17202C', name: 'Cypress' },
            { Icon: SiVite, color: '#646CFF', name: 'Vite' },
            { Icon: SiPostman, color: '#FF6C37', name: 'Postman' },
            { Icon: SiSass, color: '#CC6699', name: 'Sass' },
        ],
    },
];

const allTech = RINGS.flatMap((r) => r.items);

const REPEL_RADIUS = 150;
const REPEL_PUSH = 60;
const SPRING = { stiffness: 170, damping: 17, mass: 0.6 };

const OrbitTile = ({ tech, ring, slot, index, clock, mouseX, mouseY, sizeRef }) => {
    const base = (slot / ring.items.length) * Math.PI * 2;
    const phase = index * 2.399;

    // Orbit position plus a small per-icon wobble so the paths don't look mechanical.
    const orbit = (axis) => (t) => {
        const half = sizeRef.current / 2;
        const angle = base + t * ring.speed + Math.cos(t * 0.7 + phase) * 0.05;
        const r = ring.radius * half + Math.sin(t * 0.9 + phase) * 10;
        return half + r * (axis === 'x' ? Math.cos(angle) : Math.sin(angle));
    };
    const ox = useTransform(clock, orbit('x'));
    const oy = useTransform(clock, orbit('y'));

    const repel = (axis) => ([x, y, mx, my]) => {
        const dx = x - mx;
        const dy = y - my;
        const d = Math.hypot(dx, dy);
        if (!d || d > REPEL_RADIUS) return 0;
        return ((axis === 'x' ? dx : dy) / d) * (1 - d / REPEL_RADIUS) ** 2 * REPEL_PUSH;
    };
    const proximity = ([x, y, mx, my]) => {
        const d = Math.hypot(x - mx, y - my);
        return d > REPEL_RADIUS ? 1 : 1 + 0.4 * (1 - d / REPEL_RADIUS);
    };
    const inputs = [ox, oy, mouseX, mouseY];
    const rx = useSpring(useTransform(inputs, repel('x')), SPRING);
    const ry = useSpring(useTransform(inputs, repel('y')), SPRING);
    const scale = useSpring(useTransform(inputs, proximity), SPRING);

    const x = useTransform([ox, rx], ([a, b]) => a + b - ring.tile / 2);
    const y = useTransform([oy, ry], ([a, b]) => a + b - ring.tile / 2);

    return (
        <motion.div className="absolute left-0 top-0" style={{ x, y, scale }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.03, type: 'spring', stiffness: 260, damping: 18 }}
                className="group relative flex items-center justify-center rounded-2xl border border-slate-900/5 bg-white shadow-[0_8px_24px_rgba(36,80,72,0.14)]"
                style={{ width: ring.tile, height: ring.tile }}
            >
                <tech.Icon size={ring.icon} color={tech.color} />
                <span className="pointer-events-none absolute top-full z-10 mt-2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {tech.name}
                </span>
            </motion.div>
        </motion.div>
    );
};

const OrbitField = () => {
    const fieldRef = useRef(null);
    const sizeRef = useRef(1);
    const clock = useMotionValue(0);
    const speed = useSpring(1, { stiffness: 40, damping: 20 });
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);
    useLayoutEffect(() => {
        const measure = () => {
            sizeRef.current = fieldRef.current.offsetWidth;
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(fieldRef.current);
        return () => ro.disconnect();
    }, []);

    useAnimationFrame((_, delta) => {
        clock.set(clock.get() + (delta / 1000) * speed.get());
    });

    const onMove = (e) => {
        const rect = fieldRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };
    const onEnter = () => speed.set(0.2);
    const onLeave = () => {
        speed.set(1);
        mouseX.set(-9999);
        mouseY.set(-9999);
    };

    let index = 0;
    return (
        <div
            ref={fieldRef}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative mx-auto aspect-square w-full max-w-[640px]"
        >
            {RINGS.map((ring) => (
                <div
                    key={ring.radius}
                    className="absolute rounded-full border border-dashed border-[#249D8F]/25"
                    style={{ inset: `${(1 - ring.radius) * 50}%` }}
                />
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: TEAL }}
                    animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <div
                    className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full text-white shadow-[0_20px_50px_rgba(36,157,143,0.35)]"
                    style={{ backgroundColor: TEAL }}
                >
                    <span className="text-3xl font-extrabold leading-none">PR</span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">Fullstack</span>
                </div>
            </div>

            {RINGS.map((ring) =>
                ring.items.map((tech, slot) => (
                    <OrbitTile
                        key={tech.name}
                        tech={tech}
                        ring={ring}
                        slot={slot}
                        index={index++}
                        clock={clock}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        sizeRef={sizeRef}
                    />
                ))
            )}
        </div>
    );
};

const techByName = Object.fromEntries(allTech.map((t) => [t.name, t]));

// Smaller screens: no orbit, so the tiles keep swapping places instead.
const JuggleStrip = () => {
    const [order, setOrder] = useState(() => allTech.map((t) => t.name));
    const [hops, setHops] = useState({});
    const orderRef = useRef(order);

    useEffect(() => {
        const id = setInterval(() => {
            const next = [...orderRef.current];
            const moved = [];
            for (let k = 0; k < 2; k++) {
                const a = Math.floor(Math.random() * next.length);
                const b = Math.floor(Math.random() * next.length);
                [next[a], next[b]] = [next[b], next[a]];
                moved.push(next[a], next[b]);
            }
            orderRef.current = next;
            setOrder(next);
            setHops((h) => {
                const n = { ...h };
                moved.forEach((name) => (n[name] = (n[name] || 0) + 1));
                return n;
            });
        }, 1400);
        return () => clearInterval(id);
    }, []);

    return (
        <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Core stack">
            {order.map((name) => {
                const { Icon, color } = techByName[name];
                return (
                    <motion.li
                        key={name}
                        layout
                        transition={{ layout: { type: 'spring', stiffness: 260, damping: 16 } }}
                        title={name}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/5 bg-white shadow-sm"
                    >
                        <motion.span
                            key={hops[name] || 0}
                            className="flex"
                            animate={hops[name] ? { y: [0, -14, 0], rotate: [0, -14, 0] } : undefined}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <Icon size={22} color={color} />
                        </motion.span>
                    </motion.li>
                );
            })}
        </ul>
    );
};

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

const wordUp = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.8, ease: EASE } },
};

// The mask needs bottom padding so descenders (g) aren't clipped.
const MaskedWord = ({ children, className = '', style }) => (
    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span variants={wordUp} className={`inline-block ${className}`} style={style}>
            {children}
        </motion.span>
    </span>
);

const Hero = () => {
    const loop = (animation, transition) => ({ animate: animation, transition });

    return (
        <section className="py-12 sm:py-16">
            <div className={`${sectionGrid} items-center`}>
                <motion.div variants={stagger} initial="hidden" animate="show" className="min-w-0 xl:col-span-6">
                    <motion.p variants={rise} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        <motion.span
                            className="inline-block h-px w-10 origin-left"
                            style={{ backgroundColor: TEAL }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                        />
                        {personalInfo.name}
                    </motion.p>

                    <motion.h1
                        variants={stagger}
                        className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-6xl xl:text-7xl"
                    >
                        <MaskedWord>Building</MaskedWord>
                        <br />
                        <span className="relative inline-block">
                            <MaskedWord style={{ color: TEAL }}>Digital</MaskedWord>{' '}
                            <MaskedWord style={{ color: TEAL }}>Experiences</MaskedWord>
                            <motion.span
                                aria-hidden="true"
                                className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full"
                                style={{ backgroundColor: CORAL }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.9, ease: EASE }}
                            >
                                <motion.span
                                    className="block h-full w-full rounded-full"
                                    style={{ backgroundColor: CORAL }}
                                    {...loop({ opacity: [1, 0.45, 1] }, { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 })}
                                />
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-gray-600">
                        {personalInfo.role} focused on accessible, pixel-perfect interfaces.
                    </motion.p>

                    <motion.div variants={rise} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a href="#contact" className="btn btn-primary group relative justify-center">
                            <motion.span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-full border-2"
                                style={{ borderColor: TEAL }}
                                initial={{ opacity: 0 }}
                                {...loop(
                                    { scale: [1, 1.18], opacity: [0.7, 0] },
                                    { duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeOut', delay: 1.6 }
                                )}
                            />
                            Get in Touch
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        {features.showSelectedWorks && (
                            <a href="#portfolio" className="btn btn-outline justify-center">
                                View My Work
                            </a>
                        )}
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline justify-center">
                            <Linkedin size={18} /> LinkedIn
                        </a>
                    </motion.div>

                    <motion.p variants={rise} className="mt-8 flex items-center gap-2.5 text-sm text-slate-500">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: TEAL }} />
                            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: TEAL }} />
                        </span>
                        <span className="font-medium" style={{ color: TEAL }}>Available for hire</span>
                        <span aria-hidden="true">·</span>
                        {personalInfo.location}
                    </motion.p>

                    <motion.div variants={rise} className="xl:hidden">
                        <JuggleStrip />
                    </motion.div>
                </motion.div>

                <div className="hidden xl:col-span-6 xl:block">
                    <OrbitField />
                </div>
            </div>
        </section>
    );
};

export default Hero;

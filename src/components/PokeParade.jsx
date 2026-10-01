import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TEAL, CREAM, CORAL } from './SectionIntro';
import { POKEMON } from '../data/pokemon';

const SPRITE_BASE = 'https://play.pokemonshowdown.com/sprites/ani/';
const MAX_WALKERS = 3;
const LAUNCH_GAP_MS = [2000, 5000];

const TYPE_COLORS = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#D9B000', grass: '#5FAE3A', ice: '#58B5B0',
    fighting: '#C22E28', poison: '#A33EA1', ground: '#C9A33F', flying: '#8E7BD9', psychic: '#F95587', bug: '#8A9A1B',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', steel: '#8E8EA8', fairy: '#D685AD',
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

const Stat = ({ label, value }) => (
    <div className="rounded-2xl bg-white px-3 py-2.5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-0.5 font-bold text-slate-900">{value}</p>
    </div>
);

const PokeCard = ({ pokemon, src, onClose }) => {
    const closeRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${pokemon.name} card`}
        >
            <div style={{ perspective: 1400 }} onClick={(e) => e.stopPropagation()}>
                <motion.div
                    className="relative h-[31rem] w-[min(21rem,86vw)]"
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ rotateY: 180, scale: 0.4, opacity: 0 }}
                    animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                    exit={{ rotateY: -90, scale: 0.8, opacity: 0, transition: { duration: 0.25 } }}
                    transition={{
                        opacity: { duration: 0.2 },
                        scale: { type: 'spring', stiffness: 220, damping: 20 },
                        rotateY: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    }}
                >
                    {/* Back face: what you see first, before the card turns over. */}
                    <div
                        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl"
                        style={{ backgroundColor: TEAL, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-white/90" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-white/90" style={{ backgroundColor: TEAL }}>
                            <div className="h-8 w-8 rounded-full bg-white/90" />
                        </div>
                    </div>

                    {/* Front face */}
                    <div
                        className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl shadow-2xl"
                        style={{ backgroundColor: CREAM, backfaceVisibility: 'hidden' }}
                    >
                        <div className="flex items-center justify-between px-6 pt-5">
                            <span className="flex items-center gap-2 font-mono text-sm font-semibold" style={{ color: TEAL }}>
                                #{String(pokemon.dex).padStart(3, '0')}
                                {pokemon.legendary && (
                                    <span className="rounded-full px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: CORAL }}>
                                        Legendary
                                    </span>
                                )}
                            </span>
                            <button
                                ref={closeRef}
                                onClick={onClose}
                                aria-label="Close"
                                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mx-6 mt-2 flex h-44 items-center justify-center rounded-3xl bg-white">
                            <img
                                src={src}
                                alt={pokemon.name}
                                className="max-h-36 w-auto"
                                style={{ imageRendering: 'pixelated', minHeight: '6rem' }}
                            />
                        </div>

                        <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{pokemon.name}</h2>
                            <p className="mt-0.5 text-sm text-slate-500">{pokemon.genus}</p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {pokemon.types.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                                        style={{ backgroundColor: TYPE_COLORS[t] || TEAL }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <Stat label="Height" value={`${pokemon.height} m`} />
                                <Stat label="Weight" value={`${pokemon.weight} kg`} />
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                <span className="font-semibold text-slate-800">Abilities:</span> {pokemon.abilities.join(', ')}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const PokeParade = () => {
    const [walkers, setWalkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const countRef = useRef(0);
    const pausedRef = useRef(false);

    useEffect(() => {
        countRef.current = walkers.length;
    }, [walkers]);

    useEffect(() => {
        pausedRef.current = !!selected;
    }, [selected]);

    useEffect(() => {
        let timer;
        const schedule = (ms) => {
            timer = setTimeout(launch, ms);
        };
        function launch() {
            if (document.hidden || pausedRef.current || countRef.current >= MAX_WALKERS) {
                schedule(1500);
                return;
            }
            const pokemon = POKEMON[Math.floor(Math.random() * POKEMON.length)];
            const img = new Image();
            // Only start walking once the sprite has loaded, so nothing pops in half-drawn.
            img.onload = () =>
                setWalkers((list) => [
                    ...list,
                    {
                        id: `${Date.now()}-${pokemon.dex}`,
                        pokemon,
                        src: img.src,
                        from: -img.naturalWidth * 1.5 - 20,
                        to: window.innerWidth + 20,
                        duration: randomBetween(8, 14),
                        bottom: randomBetween(2, 14),
                    },
                ]);
            img.src = `${SPRITE_BASE}${pokemon.sprite}.gif`;
            schedule(randomBetween(...LAUNCH_GAP_MS));
        }
        schedule(2500);
        return () => clearTimeout(timer);
    }, []);

    const remove = (id) => setWalkers((list) => list.filter((w) => w.id !== id));
    const open = (walker) => {
        setSelected(walker);
        remove(walker.id);
    };
    const close = useCallback(() => setSelected(null), []);

    return (
        <>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
                <AnimatePresence>
                    {walkers.map((w) => (
                        <motion.button
                            key={w.id}
                            type="button"
                            onClick={() => open(w)}
                            aria-label={`Open ${w.pokemon.name} card`}
                            className="pointer-events-auto absolute left-0 cursor-pointer"
                            style={{ bottom: w.bottom }}
                            initial={{ x: w.from }}
                            animate={{ x: w.to }}
                            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                            whileHover={{ scale: 1.15 }}
                            transition={{
                                x: { duration: w.duration, ease: 'linear' },
                                scale: { type: 'spring', stiffness: 300, damping: 20 },
                            }}
                            onAnimationComplete={(def) => def?.x !== undefined && remove(w.id)}
                        >
                            <motion.img
                                src={w.src}
                                alt=""
                                className="block max-h-16 w-auto sm:max-h-24"
                                style={{ scaleX: -1, imageRendering: 'pixelated' }}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 0.45, repeat: Infinity, ease: 'easeOut' }}
                            />
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selected && <PokeCard key={selected.id} pokemon={selected.pokemon} src={selected.src} onClose={close} />}
            </AnimatePresence>
        </>
    );
};

export default PokeParade;

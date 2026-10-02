import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POKEMON } from '../data/pokemon';
import { markCaught } from '../lib/pokedex';
import PokeCard, { aniSprite } from './PokeCard';

const MAX_WALKERS = 3;
const LAUNCH_GAP_MS = [2000, 5000];

const randomBetween = (min, max) => min + Math.random() * (max - min);

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
            img.onload = () => {
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
            };
            img.src = aniSprite(pokemon);
            schedule(randomBetween(...LAUNCH_GAP_MS));
        }
        schedule(2500);
        return () => clearTimeout(timer);
    }, []);

    const remove = (id) => setWalkers((list) => list.filter((w) => w.id !== id));
    const open = (walker) => {
        markCaught(walker.pokemon.dex);
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
                            aria-label={`Catch ${w.pokemon.name}`}
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
                {selected && <PokeCard key={selected.id} pokemon={selected.pokemon} onClose={close} />}
            </AnimatePresence>
        </>
    );
};

export default PokeParade;

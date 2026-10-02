import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POKEMON } from '../data/pokemon';
import { usePokedex } from '../lib/pokedex';
import PokeCard, { staticSprite } from './PokeCard';
import SectionIntro, { TEAL, CREAM, sectionGrid } from './SectionIntro';

const dex3 = (n) => String(n).padStart(3, '0');

const REGIONS = [
    { id: 'kanto', label: 'Kanto', from: 1, to: 151 },
    { id: 'johto', label: 'Johto', from: 152, to: 251 },
    { id: 'hoenn', label: 'Hoenn', from: 252, to: 386 },
    { id: 'legends', label: 'Legends', from: 387, to: Infinity },
];
const inRegion = (r) => (p) => p.dex >= r.from && p.dex <= r.to;

// Not-yet-found Pokémon render as a white shape with a thin grey outline.
const OUTLINE = [
    'brightness(0) invert(1)',
    ...['1px 0', '-1px 0', '0 1px', '0 -1px'].map((o) => `drop-shadow(${o} 0 #94a3b8)`),
].join(' ');

const Pokedex = () => {
    const { caught } = usePokedex();
    const [regionId, setRegionId] = useState('kanto');
    const [selected, setSelected] = useState(null);
    const close = useCallback(() => setSelected(null), []);

    const region = REGIONS.find((r) => r.id === regionId);
    const list = POKEMON.filter(inRegion(region));
    const caughtCount = POKEMON.filter((p) => caught[p.dex]).length;

    return (
        <section className="py-10 md:py-14">
            <div className={sectionGrid}>
                <div className="xl:col-span-4">
                    <SectionIntro label="Pokédex" title={<>Pokémon<br />you&apos;ve caught</>}>
                        They wander along the bottom of the screen. Tap one as it walks by to catch it and add it here.
                    </SectionIntro>

                    <div className="mt-8 rounded-3xl p-5" style={{ backgroundColor: CREAM }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Caught</p>
                        <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                            {caughtCount}
                            <span className="text-base font-semibold text-slate-500"> / {POKEMON.length}</span>
                        </p>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ backgroundColor: CREAM }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: TEAL }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(caughtCount / POKEMON.length) * 100}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Saved in this browser only.</p>
                </div>

                <div className="min-w-0 xl:col-span-8">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Region">
                        {REGIONS.map((r) => {
                            const all = POKEMON.filter(inRegion(r));
                            const found = all.filter((p) => caught[p.dex]).length;
                            const active = r.id === regionId;
                            return (
                                <button
                                    key={r.id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setRegionId(r.id)}
                                    className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                                    style={
                                        active
                                            ? { backgroundColor: TEAL, borderColor: TEAL, color: '#fff' }
                                            : { borderColor: 'rgba(36, 157, 143, 0.25)', color: '#334155' }
                                    }
                                >
                                    {r.label} <span className={active ? 'opacity-80' : 'text-slate-500'}>{found}/{all.length}</span>
                                </button>
                            );
                        })}
                    </div>

                    <ul className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10" role="tabpanel">
                        {list.map((p) => {
                            return (
                                <li key={p.dex}>
                                    {caught[p.dex] ? (
                                        <motion.button
                                            onClick={() => setSelected(p)}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.94 }}
                                            title={`#${dex3(p.dex)} ${p.name}`}
                                            aria-label={p.name}
                                            className="flex aspect-square w-full items-center justify-center rounded-xl bg-white shadow-sm"
                                        >
                                            <img
                                                src={staticSprite(p)}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                                style={{ imageRendering: 'pixelated' }}
                                            />
                                        </motion.button>
                                    ) : (
                                        <div
                                            className="flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-slate-300"
                                            aria-label={`#${dex3(p.dex)} not caught yet`}
                                            role="img"
                                        >
                                            <img
                                                src={staticSprite(p)}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                                style={{ filter: OUTLINE, imageRendering: 'pixelated' }}
                                            />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                        <span className="h-3 w-3 rounded border border-dashed border-slate-300" /> not caught yet
                    </p>
                </div>
            </div>

            <AnimatePresence>{selected && <PokeCard key={selected.dex} pokemon={selected} onClose={close} />}</AnimatePresence>
        </section>
    );
};

export default Pokedex;

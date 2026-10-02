import { useEffect, useState } from 'react';

const KEY = 'portfolio-pokedex-v1';
const EVENT = 'pokedex-change';
const empty = () => ({ caught: {} });

// Storage can be unavailable (private mode, blocked site data), so every access is guarded.
export const loadDex = () => {
    try {
        const d = JSON.parse(localStorage.getItem(KEY));
        return d && d.caught ? { caught: d.caught } : empty();
    } catch {
        return empty();
    }
};

const save = (d) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(d));
    } catch {
        // Not persisted; the in-memory update below still refreshes the current page.
    }
    window.dispatchEvent(new CustomEvent(EVENT, { detail: d }));
};

export const markCaught = (dex) => {
    const d = loadDex();
    if (d.caught[dex]) return;
    d.caught[dex] = Date.now();
    save(d);
};

export const usePokedex = () => {
    const [dex, setDex] = useState(loadDex);
    useEffect(() => {
        const onLocal = (e) => setDex(e.detail);
        const onOtherTab = (e) => e.key === KEY && setDex(loadDex());
        window.addEventListener(EVENT, onLocal);
        window.addEventListener('storage', onOtherTab);
        return () => {
            window.removeEventListener(EVENT, onLocal);
            window.removeEventListener('storage', onOtherTab);
        };
    }, []);
    return dex;
};

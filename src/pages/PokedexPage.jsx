import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const PokeParade = lazy(() => import('../components/PokeParade'));
const Pokedex = lazy(() => import('../components/Pokedex'));

const PokedexPage = () => (
    <div className="min-h-screen bg-[#FDF0D5] text-slate-800">
        <Seo
            title="Pokedex"
            description="A personal Pokedex side project. It is not part of the professional profile."
            path="/pokedex"
        />
        <main>
            <p className="px-5 pt-8 text-sm font-semibold text-slate-700 sm:px-10">
                <Link to="/" className="hover:underline">Back to the portfolio</Link>
                <span aria-hidden="true"> · </span>
                A side project, separate from the professional profile.
            </p>
            <Suspense fallback={<p className="px-5 py-16 text-sm text-slate-700">Loading the Pokedex…</p>}>
                <Pokedex />
                <PokeParade />
            </Suspense>
        </main>
    </div>
);

export default PokedexPage;

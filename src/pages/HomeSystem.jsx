import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { Carousel, CarouselSlide } from '../components/ui/Carousel';

const REPO = 'https://github.com/patricphinehas/HomeSystem1_0';
const DOCS = `${REPO}/blob/main/docs/README.md`;
const asset = (file) => `${import.meta.env.BASE_URL}projects/home-system/${file}`;

const shots = [
    {
        file: 'dashboard.png',
        alt: 'Overview screen with stock counters, a buy-next list, and categories',
        caption: 'Overview: stock counters, the buy-next list, and categories',
    },
    {
        file: 'analytics.png',
        alt: 'Analytics screen with spend, inflation, and a category breakdown',
        caption: 'Analytics: spend, inflation, and category breakdown',
    },
    {
        file: 'calendar.png',
        alt: 'Family calendar with events and RSVPs',
        caption: 'Family calendar with events and RSVPs',
    },
    {
        file: 'inventory.png',
        alt: 'Inventory tabs and a buy-next checklist',
        caption: 'Inventory tabs and the buy-next checklist',
    },
    {
        file: 'upload.png',
        alt: 'Bill entry form and recent purchases',
        caption: 'Bill entry and recent purchases',
    },
];

const modules = [
    {
        name: 'Overview',
        detail: 'Stock counters and a Buy next list when items hit their minimum. An item is low when its quantity is at or below that minimum.',
    },
    {
        name: 'Inventory',
        detail: 'Category tabs, tags, and purchase history per item.',
    },
    {
        name: 'Bills',
        detail: 'Per-unit pricing (kg, litre, piece) with a comparison to past purchases.',
    },
    {
        name: 'Analytics',
        detail: 'Monthly spend, projections, deviations, and inflation.',
    },
    {
        name: 'Calendar',
        detail: 'Shared events, RSVPs, bookings, and comments.',
    },
    {
        name: 'MCP',
        detail: 'Household data as MCP tools, plus chat through Ollama, NVIDIA NIM, or OpenRouter.',
    },
    {
        name: 'Settings',
        detail: 'Profile, region, database, inference engine, and theme.',
    },
];

const licenseRows = [
    ['Self-host for personal or internal use', 'Allowed, free'],
    ['Commercial hosting or a competing product', 'Commercial terms'],
    ['Each release, after two years', 'Becomes Apache 2.0'],
];

const primaryBtn =
    'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#14635a] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,99,90,0.35)] transition hover:bg-[#0f4e47] active:scale-[0.98]';
const secondaryBtn =
    'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-[#FDF0D5] backdrop-blur-sm transition hover:border-[#249D8F] hover:bg-white/[0.1] active:scale-[0.98]';
const inlineCode =
    'rounded border border-[#249D8F]/30 bg-[#0b1f22]/90 px-1.5 py-0.5 text-[#E9C46A]';

const HomeSystem = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'Home System',
        description:
            'Self-hosted household operations: inventory, grocery bills, spend analytics, and a shared family calendar.',
        url: `${SITE_URL}/projects/home-system`,
        codeRepository: REPO,
        programmingLanguage: ['TypeScript', 'JavaScript'],
        runtimePlatform: 'Node.js',
        license: `${REPO}/blob/main/LICENSE`,
        author: {
            '@type': 'Person',
            name: 'Patric Phinehas Raj',
            url: `${SITE_URL}/`,
        },
    };

    return (
        <div className="home-system relative isolate min-h-screen bg-[#050b0d] text-slate-100 selection:bg-[#249D8F]/30">
            <div className="home-system-bg" aria-hidden="true">
                <div className="home-system-grid" />
                <div className="home-system-mesh" />
                <div className="home-system-circuits" />
                <span className="home-system-orbit home-system-orbit-a" />
                <span className="home-system-orbit home-system-orbit-b" />
                <span className="home-system-orbit home-system-orbit-c" />
                <span className="home-system-beam home-system-beam-a" />
                <span className="home-system-beam home-system-beam-b" />
                <span className="home-system-beam home-system-beam-c" />
                <div className="home-system-veil" />
            </div>
            <Seo
                title="Home System"
                description="Home System is Patric Phinehas Raj's source-available household app: inventory, grocery bills, spend analytics, and a shared family calendar. Next.js, Express, MongoDB or Postgres."
                path="/projects/home-system"
                imageAlt="Home System overview: stock counters and a buy-next list"
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                <Link
                    to={{ pathname: '/', hash: 'portfolio' }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-[#2dd4bf]"
                >
                    <ArrowLeft size={16} />
                    Selected works
                </Link>

                <header className="mt-8 max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#FDF0D5] md:text-6xl">Home System</h1>
                    <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-slate-300">
                        Self-hosted household operations for inventory, grocery bills, spend analytics, and a shared family calendar.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a className={primaryBtn} href={REPO} target="_blank" rel="noopener noreferrer">
                            <Github size={18} />
                            View on GitHub
                        </a>
                        <a className={secondaryBtn} href={DOCS} target="_blank" rel="noopener noreferrer">
                            Read the docs
                            <ArrowUpRight size={18} />
                        </a>
                    </div>
                </header>

                <section className="mt-14" aria-labelledby="shots-heading">
                    <h2 id="shots-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        Screenshots
                    </h2>
                    <div className="mt-6" role="region" aria-roledescription="carousel" aria-label="Screenshot carousel">
                        <Carousel dark>
                            {shots.map((shot) => (
                                <CarouselSlide key={shot.file} className="flex-[0_0_100%] min-w-0">
                                    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#249D8F]/25 bg-[#09181b]/85 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
                                        <div className="flex min-h-[220px] flex-1 items-center justify-center bg-[#061114]/90 px-3 py-4 sm:min-h-[380px] sm:px-6 sm:py-6">
                                            <img
                                                src={asset(shot.file)}
                                                alt={shot.alt}
                                                width={1280}
                                                height={800}
                                                loading="eager"
                                                className="h-auto max-h-[min(62vh,540px)] w-auto max-w-full rounded-lg object-contain"
                                            />
                                        </div>
                                        <figcaption className="border-t border-white/10 bg-[#0b1d21]/90 px-4 py-3 text-sm font-medium text-slate-200">
                                            {shot.caption}
                                        </figcaption>
                                    </figure>
                                </CarouselSlide>
                            ))}
                        </Carousel>
                    </div>
                    <p className="mt-4 text-sm text-slate-300">
                        Demo data. Run <code className={inlineCode}>pnpm seed</code> after setup to load the same sample household.
                    </p>
                </section>

                <section className="mt-16" aria-labelledby="modules-heading">
                    <h2 id="modules-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        What it covers
                    </h2>
                    <p className="mt-3 max-w-[65ch] text-slate-300">
                        Seven modules, from what is on the shelf to a calendar the household shares.
                    </p>
                    <div className="mt-6" role="region" aria-roledescription="carousel" aria-label="Module carousel">
                        <Carousel dark>
                            {modules.map((mod, index) => (
                                <CarouselSlide key={mod.name} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%]">
                                    <article className="flex h-full flex-col rounded-2xl border border-[#249D8F]/25 bg-[#0a1b1f]/80 p-5 shadow-lg backdrop-blur-md">
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E9C46A]">
                                            {String(index + 1).padStart(2, '0')}
                                        </p>
                                        <h3 className="mt-2 text-lg font-bold text-[#FDF0D5]">{mod.name}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{mod.detail}</p>
                                    </article>
                                </CarouselSlide>
                            ))}
                        </Carousel>
                    </div>
                </section>

                <section className="mt-16 max-w-3xl" aria-labelledby="stack-heading">
                    <h2 id="stack-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        How it is built
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-300">
                        Next.js 16 serves the pages. Express is the data API. <code className={inlineCode}>DB_SELECT</code> in <code className={inlineCode}>.env</code> chooses MongoDB or Postgres. Postgres can be a Supabase-compatible database through <code className={inlineCode}>DATABASE_URL</code>.
                    </p>
                    <p className="mt-3 leading-relaxed text-slate-300">
                        The browser talks only to Next.js on port 3000. Next rewrites <code className={inlineCode}>/api</code> to Express on port 4000, and Express is the only process that talks to the database. Nothing is read from or written to disk at runtime.
                    </p>
                    <p className="mt-3 leading-relaxed text-slate-300">
                        Architecture, the API, and the pricing maths are written up in the project docs.
                    </p>
                </section>

                <section className="mt-16 max-w-3xl" aria-labelledby="start-heading">
                    <h2 id="start-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        Run it locally
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-300">
                        Use mise, or install Node 24 and pnpm 12 yourself. You also need MongoDB or Postgres.
                    </p>
                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
                        <li>Copy <code className={inlineCode}>.env.example</code> to <code className={inlineCode}>.env</code>.</li>
                        <li>Set <code className={inlineCode}>DB_SELECT</code> to <code className={inlineCode}>mongodb</code> or <code className={inlineCode}>supabase</code> and fill in the matching connection settings.</li>
                        <li>Install, check, migrate, seed, and start the app.</li>
                    </ol>
                    <pre className="mt-4 overflow-x-auto rounded-2xl border border-[#249D8F]/25 bg-[#040a0c]/95 p-5 text-sm leading-relaxed text-slate-100">{`mise run setup      # toolchain + dependencies, creates .env if missing
mise run doctor     # check Node, pnpm, packages, the selected database, ports
mise run migrate    # Postgres schema, or Mongo indexes
mise run seed       # inventory, demo bills, subscriptions and calendar
mise run develop    # pages on :3000, data API on :4000`}</pre>
                    <p className="mt-4 text-slate-300">Without mise:</p>
                    <pre className="mt-2 overflow-x-auto rounded-2xl border border-[#249D8F]/25 bg-[#040a0c]/95 p-5 text-sm leading-relaxed text-slate-100">{`pnpm install
pnpm run doctor    # this project's checks, not pnpm's built-in doctor
pnpm migrate
pnpm seed
pnpm dev
pnpm check`}</pre>
                    <p className="mt-4 leading-relaxed text-slate-300">
                        The app needs a reachable database. Until you seed, an empty database shows an empty UI.
                    </p>
                </section>

                <section className="mt-16 max-w-3xl" aria-labelledby="license-heading">
                    <h2 id="license-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        License
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-300">
                        Source-available under the Functional Source License 1.1 (FSL-1.1-ALv2, Fair Source). FSL is not OSI open source. Use source-available or Fair Source when that distinction matters.
                    </p>
                    <dl className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-[#249D8F]/25 bg-[#0a1b1f]/80 backdrop-blur-md">
                        {licenseRows.map(([use, terms]) => (
                            <div key={use} className="grid gap-1 px-5 py-4 sm:grid-cols-[1.4fr_1fr] sm:items-baseline sm:gap-6">
                                <dt className="font-semibold text-[#FDF0D5]">{use}</dt>
                                <dd className="text-slate-300">{terms}</dd>
                            </div>
                        ))}
                    </dl>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">License</a></li>
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href={`${REPO}/blob/main/docs/licensing.md`} target="_blank" rel="noopener noreferrer">Commercial terms</a></li>
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache 2.0</a></li>
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href="https://fair.io/" target="_blank" rel="noopener noreferrer">Fair Source</a></li>
                    </ul>
                    <p className="mt-6 leading-relaxed text-slate-300">
                        Contributions are welcome. The repo includes a contributing guide, a code of conduct, and a security policy.
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href={`${REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">Contributing</a></li>
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href={`${REPO}/blob/main/CODE_OF_CONDUCT.md`} target="_blank" rel="noopener noreferrer">Code of conduct</a></li>
                        <li><a className="font-semibold text-[#2dd4bf] underline-offset-2 hover:underline" href={`${REPO}/blob/main/SECURITY.md`} target="_blank" rel="noopener noreferrer">Security</a></li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default HomeSystem;

import React, { useState } from 'react';
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
        alt: 'Analytics screen with a spend-weighted basket index, inflation, and a category breakdown',
        caption: 'Analytics: basket index, spend-weighted inflation, and category breakdown',
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
        detail: 'Today’s plans, what is coming up, stock counters, and a Buy next list when an item is at or below its minimum.',
    },
    {
        name: 'Analytics',
        detail: 'The household’s own price index and inflation rate, spend over time with a projection, where the money goes, and the biggest price moves. Every figure comes from bills entered here.',
    },
    {
        name: 'Inventory',
        detail: 'A tab per category, tags, and the purchase history for each item.',
    },
    {
        name: 'Bills',
        detail: 'Each line is priced per kg, litre, or piece and compared with what that item used to cost.',
    },
    {
        name: 'Subscriptions',
        detail: 'What renews, the monthly and yearly cost, and who holds or shares each one.',
    },
    {
        name: 'Calendar',
        detail: 'Shared events with the activity, venue, RSVPs, booking, and comments.',
    },
    {
        name: 'Smart home',
        detail: 'Air conditioning, hot water, pumps, and sensors through an edge controller on your own network. The app never talks to a device directly.',
    },
    {
        name: 'Activity',
        detail: 'Household activity in one place, plus the checks the app can make about the machine it runs on.',
    },
    {
        name: 'MCP',
        detail: 'Household data as MCP tools, plus chat through Ollama, NVIDIA NIM, or OpenRouter.',
    },
    {
        name: 'Settings',
        detail: 'Profile, family, region, database, inference engine, and theme.',
    },
];

const metricExamples = [
    {
        label: 'Same item, two sizes',
        figure: '₹120/kg vs ₹110/kg',
        detail: '500 g for ₹60 is ₹120 per kg. 1 kg for ₹110 is ₹110 per kg, so the heavier bag is the cheaper buy. Mass reduces to kilograms, volume to litres, and a countable to pieces. Pack, bottle, or strip stays its own base, so a price per bottle is never compared with a price per kilogram.',
    },
    {
        label: 'One item’s move',
        figure: '₹77 → ₹99 is +28.6%',
        detail: 'Per item, inflation is the first recorded price to the latest. A jar that goes from ₹77 to ₹99 has moved 28.6%. That figure is annualised only when the two prices are at least 30 days apart.',
    },
    {
        label: 'What moved the bill',
        figure: '8% on rice beats 40% on cardamom',
        detail: 'A plain average treats every item the same. The spend-weighted rate does not: forty percent on cardamom moves the household bill less than eight percent on rice, because rice is more of the spend.',
    },
    {
        label: 'The basket index',
        figure: 'First month = 100',
        detail: 'An item joins in the month of its first price. That price is carried forward through months it was not bought, so the index tracks what things cost rather than which week you happened to shop.',
    },
    {
        label: 'Demo seed',
        figure: 'Index 103.4 · +3.3%',
        detail: 'pnpm seed writes invented bills. On that sample, Analytics drew a basket index of 103.4 and +3.3% spend-weighted inflation across 22 items bought more than once. Those figures are demo data, not a real household.',
    },
];

const basketSeries = [
    { month: 'Apr', published: 100, yours: 100 },
    { month: 'May', published: 100.5, yours: 100.2 },
    { month: 'Jun', published: 101.1, yours: 100.2 },
    { month: 'Jul', published: 101.6, yours: 100.5 },
    { month: 'Aug', published: 102.2, yours: 101.2 },
    { month: 'Sep', published: 102.8, yours: 103.6 },
    { month: 'Oct', published: 103.5, yours: 105.2 },
    { month: 'Nov', published: 104.0, yours: 106.8 },
];

const CHART_W = 640;
const CHART_H = 280;
const CHART_PAD = { l: 42, r: 16, t: 20, b: 32 };
const Y_MIN = 99;
const Y_MAX = 108;
const Y_TICKS = [100, 102, 104, 106, 108];

const chartX = (index) => {
    const plotW = CHART_W - CHART_PAD.l - CHART_PAD.r;
    return CHART_PAD.l + (index / (basketSeries.length - 1)) * plotW;
};

const chartY = (value) => {
    const plotH = CHART_H - CHART_PAD.t - CHART_PAD.b;
    return CHART_PAD.t + (1 - (value - Y_MIN) / (Y_MAX - Y_MIN)) * plotH;
};

const seriesPath = (key) =>
    basketSeries
        .map((row, index) => `${index === 0 ? 'M' : 'L'}${chartX(index).toFixed(1)},${chartY(row[key]).toFixed(1)}`)
        .join(' ');

const gapPath = () => {
    const forward = basketSeries.map(
        (row, index) => `${index === 0 ? 'M' : 'L'}${chartX(index).toFixed(1)},${chartY(row.yours).toFixed(1)}`,
    );
    const back = [...basketSeries]
        .reverse()
        .map((row, index) => `L${chartX(basketSeries.length - 1 - index).toFixed(1)},${chartY(row.published).toFixed(1)}`);
    return `${forward.join(' ')} ${back.join(' ')} Z`;
};

const formatIndex = (value) => value.toFixed(1);
const formatMove = (value) => `${value - 100 >= 0 ? '+' : ''}${(value - 100).toFixed(1)}%`;

const BasketComparison = () => {
    const [active, setActive] = useState(basketSeries.length - 1);
    const row = basketSeries[active];
    const gap = row.yours - row.published;

    return (
        <figure className="rounded-2xl border border-[#249D8F]/25 bg-[#0a1b1f]/80 p-5 shadow-lg backdrop-blur-md sm:p-6">
            <figcaption className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E9C46A]">Illustration</p>
                    <p className="mt-2 text-lg font-bold text-[#FDF0D5]">Same months. Two baskets.</p>
                </div>
                <p className="text-sm text-slate-400">Sample extract.</p>
            </figcaption>

            <div className="mt-5 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
                <div
                    className="relative"
                    onMouseLeave={(event) => {
                        if (!event.currentTarget.contains(document.activeElement)) {
                            setActive(basketSeries.length - 1);
                        }
                    }}
                >
                    <svg
                        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                        className="h-auto w-full"
                        role="img"
                        aria-labelledby="basket-chart-title basket-chart-desc"
                    >
                        <title id="basket-chart-title">Someone else’s basket against your receipts</title>
                        <desc id="basket-chart-desc">
                            Both indexes start at 100 in April. By November, someone else’s basket is 104.0 and your receipts are 106.8.
                        </desc>
                        {Y_TICKS.map((tick) => (
                            <g key={tick}>
                                <line
                                    x1={CHART_PAD.l}
                                    x2={CHART_W - CHART_PAD.r}
                                    y1={chartY(tick)}
                                    y2={chartY(tick)}
                                    stroke={tick === 100 ? 'rgba(253,240,213,0.45)' : 'rgba(255,255,255,0.08)'}
                                    strokeDasharray={tick === 100 ? '4 4' : undefined}
                                />
                                <text
                                    x={CHART_PAD.l - 8}
                                    y={chartY(tick) + 4}
                                    textAnchor="end"
                                    fill="#94a3b8"
                                    fontSize="12"
                                >
                                    {tick}
                                </text>
                            </g>
                        ))}
                        <path d={gapPath()} fill="rgba(45,212,191,0.16)" />
                        <path d={seriesPath('published')} fill="none" stroke="#E9C46A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        <path d={seriesPath('yours')} fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        <line
                            x1={chartX(active)}
                            x2={chartX(active)}
                            y1={CHART_PAD.t}
                            y2={CHART_H - CHART_PAD.b}
                            stroke="rgba(253,240,213,0.35)"
                        />
                        <circle cx={chartX(active)} cy={chartY(row.published)} r="4.5" fill="#050b0d" stroke="#E9C46A" strokeWidth="2.5" />
                        <circle cx={chartX(active)} cy={chartY(row.yours)} r="4.5" fill="#050b0d" stroke="#2dd4bf" strokeWidth="2.5" />
                        {basketSeries.map((point, index) => (
                            <text
                                key={point.month}
                                x={chartX(index)}
                                y={CHART_H - 8}
                                textAnchor="middle"
                                fill={index === active ? '#FDF0D5' : '#94a3b8'}
                                fontSize="12"
                                fontWeight={index === active ? 700 : 500}
                            >
                                {point.month}
                            </text>
                        ))}
                    </svg>
                    <div
                        className="absolute flex"
                        style={{
                            left: `${(CHART_PAD.l / CHART_W) * 100}%`,
                            right: `${(CHART_PAD.r / CHART_W) * 100}%`,
                            top: `${(CHART_PAD.t / CHART_H) * 100}%`,
                            bottom: `${(CHART_PAD.b / CHART_H) * 100}%`,
                        }}
                    >
                        {basketSeries.map((point, index) => (
                            <button
                                key={point.month}
                                type="button"
                                className="h-full flex-1 cursor-crosshair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]"
                                aria-label={`${point.month}: someone else's basket ${formatIndex(point.published)}, your receipts ${formatIndex(point.yours)}`}
                                aria-pressed={index === active}
                                onMouseEnter={() => setActive(index)}
                                onFocus={() => setActive(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4" aria-live="polite">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{row.month}</p>
                    <div>
                        <p className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#E9C46A]" aria-hidden="true" />
                            Someone else’s basket
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-[#FDF0D5]">
                            {formatIndex(row.published)}
                            <span className="ml-2 text-base font-semibold text-[#E9C46A]">{formatMove(row.published)}</span>
                        </p>
                    </div>
                    <div>
                        <p className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]" aria-hidden="true" />
                            Your receipts
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-[#FDF0D5]">
                            {formatIndex(row.yours)}
                            <span className="ml-2 text-base font-semibold text-[#2dd4bf]">{formatMove(row.yours)}</span>
                        </p>
                    </div>
                    <p className="border-t border-white/10 pt-3 text-sm leading-relaxed text-slate-300">
                        {gap === 0
                            ? 'Both baskets are still at the base.'
                            : `Your receipts sit ${Math.abs(gap).toFixed(1)} points ${gap > 0 ? 'above' : 'below'} the published basket.`}
                    </p>
                </div>
            </div>

            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-slate-400">
                Both lines start at 100. The gold line is a basket somebody else chose, climbing steadily. The teal line follows what this house buys, so a jump in staples shows up here and barely there. Planning a year of supplies off the published figure would miss that gap.
            </p>
        </figure>
    );
};

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
            'A self-hosted household app that works out your own inflation rate from your receipts, then keeps inventory, bills, subscriptions, and a shared calendar around that number.',
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
                description="Home System works out a household's own inflation rate from its receipts: spend-weighted, carried forward through months an item was not bought, and traceable to the bills. Next.js, Express, SQLite, MongoDB, or Postgres."
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
                        Your own inflation rate, from your own receipts. A published figure averages a basket somebody else chose. This works out what your basket did: weighted by what you actually spend, carried forward through the months you did not buy something, and traceable line by line to the bills behind it.
                    </p>
                    <p className="mt-3 max-w-[65ch] leading-relaxed text-slate-400">
                        Inventory, bills, subscriptions, and the shared calendar feed that number or live off it. Air conditioning, hot water, and pumps, through an edge controller on your own network, plus chat over the same data, are there so one machine in the house can run the lot.
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
                        Overview and Analytics sit at the top, because the inflation rate is the point. Groceries feed that number. Smart home and chat come after, as extensions.
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

                <section className="mt-16" aria-labelledby="metrics-heading">
                    <h2 id="metrics-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        What the numbers look like
                    </h2>
                    <p className="mt-3 max-w-[65ch] text-slate-300">
                        The comparison the app exists to draw: a published basket against the one in your receipts. The chart is an illustration of that gap. The cards are how a figure is worked out, and the last card is the demo seed.
                    </p>
                    <div className="mt-6">
                        <BasketComparison />
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {metricExamples.map((example) => (
                            <article
                                key={example.label}
                                className={`rounded-2xl border border-[#249D8F]/25 bg-[#0a1b1f]/80 p-5 shadow-lg backdrop-blur-md${example.label === 'Demo seed' ? ' sm:col-span-2' : ''}`}
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E9C46A]">
                                    {example.label}
                                </p>
                                <p className="mt-2 text-lg font-bold text-[#FDF0D5]">{example.figure}</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">{example.detail}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-16 max-w-3xl" aria-labelledby="stack-heading">
                    <h2 id="stack-heading" className="text-2xl font-extrabold tracking-tight text-[#FDF0D5] md:text-3xl">
                        How it is built
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-300">
                        Next.js 16 serves the pages. Express is the data API. <code className={inlineCode}>DB_SELECT</code> in <code className={inlineCode}>.env</code> chooses SQLite, MongoDB, or Postgres. SQLite uses Node’s built-in <code className={inlineCode}>node:sqlite</code> and one file, <code className={inlineCode}>data/homesystem.db</code> by default, so nothing else has to be running. Postgres can be a Supabase-compatible database through <code className={inlineCode}>DATABASE_URL</code>. Switching databases does not copy data across.
                    </p>
                    <p className="mt-3 leading-relaxed text-slate-300">
                        The browser talks only to Next.js on port 3000. Next rewrites <code className={inlineCode}>/api</code> to Express on port 4000, and Express is the only process that talks to the database. With SQLite, that file is the household. Copy it and you have a backup.
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
                        The short path is SQLite: one file, no database service. Use mise, or install Node 24 and pnpm 12 yourself. MongoDB or Postgres are optional.
                    </p>
                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
                        <li>Copy <code className={inlineCode}>.env.example</code> to <code className={inlineCode}>.env</code>.</li>
                        <li>Set <code className={inlineCode}>DB_SELECT</code> to <code className={inlineCode}>sqlite</code>, <code className={inlineCode}>mongodb</code>, or <code className={inlineCode}>supabase</code> and fill in the matching connection settings. SQLite needs none.</li>
                        <li>Install, check, seed, and start the app. <code className={inlineCode}>pnpm edge</code> runs a simulated controller for the smart home page.</li>
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

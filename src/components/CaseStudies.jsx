import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, House } from 'lucide-react';
import { projects } from '../data/portfolio';
import {
    ArrowRight,
    Sprout,
    Ambulance,
    Sparkles,
    Warehouse,
    SolarPanel,
    Bot,
    LayoutDashboard,
    AudioLines,
    FolderFiles,
} from './icons/KoboyoIcons';
import SectionIntro, { TEAL, CORAL, CREAM, sectionGrid, pad } from './SectionIntro';

const iconMap = {
    home: House,
    vegroute: Sprout,
    ambulance: Ambulance,
    clinic: Sparkles,
    inventory: Warehouse,
    solar: SolarPanel,
    chatbot: Bot,
    dashboard: LayoutDashboard,
    audio: AudioLines,
};

function ProjectPanel({ project, index, total, isActive, selectedTag, onSelectTag }) {
    const Icon = iconMap[project.icon] || FolderFiles;

    return (
        <article
            aria-hidden={!isActive}
            inert={!isActive || undefined}
            className={`col-start-1 row-start-1 flex min-w-0 flex-col justify-between rounded-3xl border border-slate-900/10 p-6 sm:p-8 xl:min-h-[480px] xl:p-10 ${
                isActive ? 'z-10' : 'invisible pointer-events-none'
            }`}
            style={{ backgroundColor: CREAM }}
        >
            <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                            style={{ backgroundColor: TEAL }}
                        >
                            <Icon size={24} />
                        </div>
                        <div>
                            <p className="font-mono text-xs font-semibold" style={{ color: TEAL }}>
                                {pad(index + 1)} / {pad(total)} · {project.role}
                            </p>
                            {project.status && (
                                <span
                                    className="mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                                    style={{ backgroundColor: TEAL }}
                                >
                                    {project.status}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        {project.page && (
                            <Link
                                to={project.page}
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.98]"
                                style={{ backgroundColor: TEAL }}
                            >
                                Explore project
                                <ArrowRight size={14} />
                            </Link>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/15 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition hover:border-[#14635a] hover:text-[#14635a]"
                            >
                                <Github size={14} />
                                Source code
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {project.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-slate-700">
                    {project.description}
                </p>

                <div className="mt-6 grid min-w-0 gap-3.5 sm:grid-cols-3">
                    {project.problem && (
                        <div className="min-w-0 rounded-2xl border border-slate-900/5 bg-white/85 p-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                                Problem
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{project.problem}</p>
                        </div>
                    )}
                    {project.approach && (
                        <div className="min-w-0 rounded-2xl border border-slate-900/5 bg-white/85 p-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                                Architecture &amp; build
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{project.approach}</p>
                        </div>
                    )}
                    {project.outcome && (
                        <div className="min-w-0 rounded-2xl border border-slate-900/5 bg-white/85 p-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                                Scope &amp; outcome
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{project.outcome}</p>
                        </div>
                    )}
                </div>

                {project.diagram === 'home-system' && (
                    <div className="mt-5 rounded-2xl border border-slate-900/10 bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Architecture</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
                            <span className="rounded-lg border border-slate-900/10 px-3 py-2">Browser</span>
                            <span aria-hidden="true">→</span>
                            <span className="rounded-lg border border-slate-900/10 px-3 py-2">Next.js :3000</span>
                            <span aria-hidden="true">→</span>
                            <span className="rounded-lg border border-slate-900/10 px-3 py-2">Express :4000</span>
                            <span aria-hidden="true">→</span>
                            <span className="rounded-lg border border-slate-900/10 px-3 py-2">SQLite, MongoDB, or Postgres</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">No public live demo yet.</p>
                    </div>
                )}
                {project.diagram === 'digital-twin' && (
                    <div className="mt-5 rounded-2xl border border-slate-900/10 bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Architecture</p>
                        <div className="mt-3 grid min-w-0 gap-2 text-sm font-semibold text-slate-800 sm:grid-cols-2">
                            <span className="min-w-0 rounded-lg border border-slate-900/10 px-3 py-2">React and Angular UI, 3D views</span>
                            <span className="min-w-0 rounded-lg border border-slate-900/10 px-3 py-2">Map layer: ArcGIS, Leaflet, Mapbox, OpenLayers</span>
                            <span className="min-w-0 rounded-lg border border-slate-900/10 px-3 py-2">On-demand fetch for assets and geofences</span>
                            <span className="min-w-0 rounded-lg border border-slate-900/10 px-3 py-2">WebSockets only while live tracking is open</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">No public live demo. No public repository. This work is internal.</p>
                    </div>
                )}
                {project.tradeoffs && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">Trade-off. </span>{project.tradeoffs}</p>
                )}
                {project.results && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">Measured result. </span>{project.results}</p>
                )}

                {project.highlights?.length > 0 && (
                    <ul className="mt-5 grid gap-2 border-t border-slate-900/10 pt-5">
                        {project.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-slate-800">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: CORAL }} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-900/10 pt-5">
                <span className="text-xs font-semibold text-slate-500">Tags:</span>
                {project.tags.map((tag) => {
                    const isTagSelected = selectedTag === tag;
                    return (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => onSelectTag(isTagSelected ? 'All' : tag)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                isTagSelected
                                    ? 'text-white shadow-sm'
                                    : 'border border-slate-900/10 bg-white text-slate-800 hover:border-[#14635a] hover:text-[#14635a]'
                            }`}
                            style={isTagSelected ? { backgroundColor: TEAL } : undefined}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        </article>
    );
}

const CaseStudies = () => {
    const caseProjects = projects.filter((project) => project.featured);
    const [selectedTag, setSelectedTag] = useState('All');
    const [activeId, setActiveId] = useState(caseProjects[0]?.id);

    const allTags = ['All', ...new Set(caseProjects.flatMap((p) => p.tags))];
    const filteredProjects =
        selectedTag === 'All'
            ? caseProjects
            : caseProjects.filter((p) => p.tags.includes(selectedTag));

    useEffect(() => {
        if (!filteredProjects.some((p) => p.id === activeId)) {
            setActiveId(filteredProjects[0]?.id);
        }
    }, [selectedTag, activeId, filteredProjects]);

    const activeProject =
        filteredProjects.find((p) => p.id === activeId) ||
        filteredProjects[0] ||
        projects[0];
    return (
        <section className="py-10 md:py-14">
            <div className={sectionGrid}>
                {/* Left Column: Intro + Filter + Selectable Project Headings List */}
                <div className="min-w-0 xl:col-span-5">
                    <SectionIntro label="Projects" title={<>Selected<br />Works</>}>
                        Two case studies: a self-hosted household app, and an internal platform that monitors 180 IoT assets.
                    </SectionIntro>

                    {/* Retained Filter Bar */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-900/10 bg-[#FDF0D5]/60 px-4 py-2.5">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                                Case studies
                            </span>
                            <span
                                className="rounded-full px-2 py-0.5 font-mono text-xs font-semibold text-white"
                                style={{ backgroundColor: TEAL }}
                            >
                                {filteredProjects.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="portfolio-tag-select" className="text-xs font-semibold text-slate-600">
                                Filter:
                            </label>
                            <select
                                id="portfolio-tag-select"
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="rounded-full border border-slate-900/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-[#14635a]"
                            >
                                {allTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag === 'All' ? `All categories (${projects.length})` : tag}
                                    </option>
                                ))}
                            </select>
                            {selectedTag !== 'All' && (
                                <button
                                    type="button"
                                    onClick={() => setSelectedTag('All')}
                                    className="text-xs font-semibold underline"
                                    style={{ color: TEAL }}
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile / Tablet horizontal selector */}
                    <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-10 sm:px-10 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 xl:hidden">
                        {filteredProjects.map((project) => {
                            const isActive = project.id === activeProject?.id;
                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={(e) => {
                                        setActiveId(project.id);
                                        e.currentTarget.scrollIntoView({
                                            behavior: 'smooth',
                                            inline: 'center',
                                            block: 'nearest',
                                        });
                                    }}
                                    aria-pressed={isActive}
                                    className="shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                                    style={
                                        isActive
                                            ? { backgroundColor: TEAL, borderColor: TEAL, color: '#fff' }
                                            : { borderColor: 'rgba(20, 99, 90, 0.25)', color: '#334155' }
                                    }
                                >
                                    {project.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop Left List of Headings */}
                    <ul className="mt-5 hidden border-t border-slate-900/10 xl:block">
                        {filteredProjects.map((project, i) => {
                            const isActive = project.id === activeProject?.id;
                            const IconComponent = iconMap[project.icon] || FolderFiles;
                            return (
                                <li key={project.id}>
                                    <button
                                        type="button"
                                        onMouseEnter={() => setActiveId(project.id)}
                                        onFocus={() => setActiveId(project.id)}
                                        onClick={() => setActiveId(project.id)}
                                        aria-pressed={isActive}
                                        className="relative flex w-full items-center gap-3.5 border-b border-slate-900/10 py-3 pl-4 pr-2 text-left transition-colors"
                                    >
                                        <span
                                            className={`absolute inset-y-1.5 left-0 w-1 rounded-full ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                            style={{ backgroundColor: TEAL }}
                                        />
                                        <span className="font-mono text-xs text-slate-500">{pad(i + 1)}</span>
                                        <span
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                                isActive ? 'text-white' : 'bg-[#FDF0D5] text-slate-700'
                                            }`}
                                            style={isActive ? { backgroundColor: TEAL } : undefined}
                                        >
                                            <IconComponent size={15} />
                                        </span>
                                        <span
                                            className={`min-w-0 flex-1 truncate text-sm font-bold tracking-tight transition-colors ${
                                                isActive ? '' : 'text-slate-700 hover:text-slate-900'
                                            }`}
                                            style={isActive ? { color: TEAL } : undefined}
                                        >
                                            {project.title}
                                        </span>
                                        <span className="shrink-0 rounded-full bg-slate-900/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                                            {project.role}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right column stays one height so hovering a title does not shift the list. */}
                <div className="min-w-0 xl:col-span-7 xl:pt-6">
                    {filteredProjects.length > 0 && (
                        <div className="grid">
                            {filteredProjects.map((project, index) => (
                                <ProjectPanel
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    total={filteredProjects.length}
                                    isActive={project.id === activeProject?.id}
                                    selectedTag={selectedTag}
                                    onSelectTag={setSelectedTag}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;

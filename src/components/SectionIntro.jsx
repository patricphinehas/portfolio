import React from 'react';

export const TEAL = '#249D8F';
export const CORAL = '#E76F51';
export const CREAM = '#FDF0D5';
export const sectionGrid = 'grid w-full gap-10 px-5 sm:px-10 lg:px-16 xl:grid-cols-12 xl:gap-16 xl:px-24';
export const pad = (n) => String(n).padStart(2, '0');

const SectionIntro = ({ label, title, children }) => (
    <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: TEAL }}>
            {label}
        </p>
        <h2 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
            {title}
        </h2>
        {children && <p className="mt-4 max-w-md text-gray-600">{children}</p>}
    </div>
);

export default SectionIntro;

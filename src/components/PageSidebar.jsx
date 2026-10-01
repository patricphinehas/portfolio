import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, House, Code, Award, Briefcase, GraduationCap,
  LayoutGrid, FileText, Quote, CircleHelp, Mail, Menu, X,
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// Centre of the floating menu button (bottom-5 right-5, 56px tall), so the menu grows out of it.
const MENU_ORIGIN = 'calc(100% - 3.5rem) calc(100% - 3.5rem)';

const ALL_SECTIONS = [
  { id: 'hero', label: 'Home', icon: House },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid },
  { id: 'case-studies', label: 'Case Studies', icon: FileText },
  { id: 'testimonials', label: 'Testimonials', icon: Quote },
  { id: 'faq', label: 'FAQ', icon: CircleHelp },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const PageSidebar = ({ sectionIds }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMinimized, setIsMinimized] = useState(true);

  const sections = ALL_SECTIONS.filter((s) => sectionIds.includes(s.id));

  // Cards are pinned, so track the in-flow anchors instead of observing the cards themselves.
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds.join()]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-w', isMinimized ? '80px' : '224px');
  }, [isMinimized]);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const goTo = (sectionId) => {
    setMenuOpen(false);
    // Let the menu start closing before the page springs to the section.
    setTimeout(() => scrollToSection(sectionId), 250);
  };

  const scrollAnim = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const html = document.documentElement;
    const target = element.getBoundingClientRect().top + window.scrollY;

    scrollAnim.current?.stop();
    // CSS smooth scrolling would fight the spring, so switch it off while animating.
    html.style.scrollBehavior = 'auto';
    const stopOnUserInput = () => scrollAnim.current?.stop();
    const cleanup = () => {
      html.style.scrollBehavior = '';
      window.removeEventListener('wheel', stopOnUserInput);
      window.removeEventListener('touchstart', stopOnUserInput);
    };
    window.addEventListener('wheel', stopOnUserInput, { passive: true });
    window.addEventListener('touchstart', stopOnUserInput, { passive: true });

    scrollAnim.current = animate(window.scrollY, target, {
      type: 'spring',
      stiffness: 70,
      damping: 14,
      mass: 1,
      restDelta: 0.5,
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: cleanup,
      onStop: cleanup,
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:fixed lg:flex lg:flex-col left-0 top-0 h-screen pt-8 z-40"
        style={{
          width: isMinimized ? '80px' : '224px',
          backgroundColor: '#FDF0D5',
          borderRight: '2px solid rgba(36, 157, 143, 0.15)',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Header with Name and Minimize Button */}
        <div className="px-4 mb-12 flex items-center justify-between gap-2">
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p
                className="text-sm font-bold leading-tight"
                style={{ color: '#249D8F' }}
              >
                Patric
              </p>
              <p className="text-xs text-gray-600">Developer</p>
            </motion.div>
          )}
          <motion.button
            onClick={() => setIsMinimized(!isMinimized)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors ml-auto"
            style={{ color: '#249D8F' }}
          >
            {isMinimized ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </motion.button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 flex-1 px-3">
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                title={isMinimized ? section.label : undefined}
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative flex w-full items-center gap-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  isMinimized ? 'justify-center p-3' : 'px-4 py-3'
                } ${isActive ? 'text-white' : 'text-slate-600 hover:bg-[#249D8F]/10 hover:text-[#249D8F]'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl shadow-[0_6px_16px_rgba(36,157,143,0.28)]"
                    style={{ backgroundColor: '#249D8F' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={19} strokeWidth={1.75} className="relative shrink-0" />
                {!isMinimized && <span className="relative flex-1">{section.label}</span>}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Accent - Solid color */}
        {!isMinimized && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 mb-6 h-1 w-12"
            style={{
              backgroundColor: '#249D8F',
              transformOrigin: 'left',
            }}
          />
        )}
      </motion.div>

      {/* Mobile: floating menu button + full-screen menu */}
      <div className="lg:hidden">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto px-6 pb-28 pt-14"
              style={{ backgroundColor: '#FFFCF5' }}
              initial={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
              animate={{ clipPath: `circle(150% at ${MENU_ORIGIN})` }}
              exit={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span className="inline-block h-px w-10" style={{ backgroundColor: '#249D8F' }} />
                {personalInfo.name}
              </p>
              <nav className="mt-8 border-t border-slate-900/10">
                {sections.map((section, idx) => {
                  const isActive = activeSection === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => goTo(section.id)}
                      aria-current={isActive ? 'true' : undefined}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + idx * 0.04, duration: 0.35 }}
                      className="flex w-full items-baseline gap-4 border-b border-slate-900/10 py-4 text-left"
                    >
                      <span className="font-mono text-xs text-slate-400">{String(idx + 1).padStart(2, '0')}</span>
                      <span
                        className={`flex-1 text-2xl font-bold tracking-tight ${isActive ? '' : 'text-slate-900'}`}
                        style={isActive ? { color: '#249D8F' } : undefined}
                      >
                        {section.label}
                      </span>
                      {isActive && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#E76F51' }} />}
                    </motion.button>
                  );
                })}
              </nav>
              {sectionIds.includes('contact') && (
                <motion.button
                  onClick={() => goTo('contact')}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + sections.length * 0.04, duration: 0.35 }}
                  className="btn btn-primary mt-8 justify-center self-start"
                >
                  <Mail size={18} /> Get in Touch
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_rgba(36,157,143,0.4)]"
          style={{ backgroundColor: '#249D8F' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

export default PageSidebar;

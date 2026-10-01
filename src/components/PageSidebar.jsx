import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, House, Code, Award, Briefcase, GraduationCap,
  LayoutGrid, FileText, Quote, CircleHelp, Mail,
} from 'lucide-react';

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

      {/* Mobile Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{ backgroundColor: '#FDF0D5', borderTop: '2px solid rgba(36, 157, 143, 0.15)' }}
      >
        <div className="flex overflow-x-auto px-2 py-2 gap-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'text-white'
                  : 'text-gray-700 border border-gray-300'
              }`}
              style={
                activeSection === section.id
                  ? { backgroundColor: '#249D8F' }
                  : {}
              }
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default PageSidebar;

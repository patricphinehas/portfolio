import React, { useRef } from 'react';
import { personalInfo } from '../data/portfolio';
import { Mail, Linkedin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <footer id="contact" className="section pb-12 pt-32 relative overflow-hidden">
            {/* Footer Gradients */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-indigo-900/20 to-transparent -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">
                        Let's work <br /> <span className="gradient-text">together.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="btn btn-primary text-lg px-10 py-5 mb-20 inline-flex shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                    >
                        <Mail className="mr-3" /> Say Hello
                    </a>

                    <div className="flex justify-center gap-6 mb-16">
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-white/5 hover:bg-indigo-500 hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="p-4 rounded-full bg-white/5 hover:bg-pink-500 hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
                        >
                            <Mail size={24} />
                        </a>
                    </div>

                    <div className="text-gray-600 text-sm border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
                        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Contact;

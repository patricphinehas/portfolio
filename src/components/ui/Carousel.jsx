import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from '../icons/KoboyoIcons';

export const Carousel = ({ children, autoplay = false, delay = 5000, className = '' }) => {
    const plugins = autoplay ? [Autoplay({ delay, stopOnInteraction: true, stopOnMouseEnter: true })] : [];
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, plugins);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

    const onSelect = useCallback((api) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect(emblaApi);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden -mx-4 px-4 md:-mx-6 md:px-6" ref={emblaRef}>
                <div className="flex -ml-6">
                    {children}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
                <button
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                    className="p-3 rounded-full bg-white/80 border border-black/5 shadow-md hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all text-slate-700"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-black/15 hover:bg-black/25'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={scrollNext}
                    aria-label="Next slide"
                    className="p-3 rounded-full bg-white/80 border border-black/5 shadow-md hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all text-slate-700"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export const CarouselSlide = ({ children, className = '' }) => (
    <div className={`pl-6 shrink-0 ${className}`}>
        {children}
    </div>
);

export default Carousel;

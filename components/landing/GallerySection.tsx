
/**
 * @file components/landing/GallerySection.tsx
 * @purpose Renders a compact, dynamic, and animated photo gallery.
 *          Features a "Living Mosaic" for the summary view and horizontal sliders for categories.
 */
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { GalleryImage } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { useOnScreen } from '../../hooks/useOnScreen';

interface GallerySectionProps {
    galleryImages: GalleryImage[];
    content: typeof INITIAL_SITE_CONTENT['gallery'];
}

// --- Internal Component: Dynamic Tile ---
// Handles the cycling of images within a single grid slot
const DynamicTile: React.FC<{
    images: GalleryImage[];
    interval?: number;
    className?: string;
    onClick: (img: GalleryImage) => void;
    label: string;
}> = ({ images, interval = 4000, className = '', onClick, label }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setIsVisible(false); // Fade out
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsVisible(true); // Fade in
            }, 500); // Wait for fade out transition
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    const currentImage = images[currentIndex];

    if (!currentImage) return null;

    return (
        <div
            className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500 ${className}`}
            onClick={() => onClick(currentImage)}
        >
            <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Loading placeholder */}
            <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-white/90 text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm backdrop-blur-sm uppercase tracking-wider">
                    {label}
                </span>
            </div>
        </div>
    );
};

const GallerySection: React.FC<GallerySectionProps> = ({ galleryImages, content }) => {
    const categories = useMemo(() => ['Tutti', ...Array.from(new Set(galleryImages.map(img => img.category)))], [galleryImages]);
    const [activeCategory, setActiveCategory] = useState('Tutti');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // State to track which list of images is currently being viewed in the lightbox
    const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    // Helper to group images by category for the Mosaic
    const imagesByCategory = useMemo(() => {
        const grouped: Record<string, GalleryImage[]> = {};
        galleryImages.forEach(img => {
            if (!grouped[img.category]) grouped[img.category] = [];
            grouped[img.category].push(img);
        });
        return grouped;
    }, [galleryImages]);

    // Images for the active category view (Standard Grid/Slider)
    const activeCategoryImages = useMemo(() =>
        activeCategory === 'Tutti' ? galleryImages : galleryImages.filter(img => img.category === activeCategory),
        [activeCategory, galleryImages]
    );

    const openLightbox = (img: GalleryImage, currentList: GalleryImage[]) => {
        setLightboxImages(currentList);
        const index = currentList.findIndex(i => i.id === img.id);
        setLightboxIndex(index !== -1 ? index : 0);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % lightboxImages.length);
        }
    }, [lightboxIndex, lightboxImages]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length);
        }
    }, [lightboxIndex, lightboxImages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, nextImage, prevImage]);

    return (
        <section id="gallery" className="py-20 bg-white scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">{content.description}</p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeCategory === cat ? 'bg-teal-600 border-teal-600 text-white shadow-lg transform scale-105' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50'}`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- MODE 1: LIVING MOSAIC ("Tutti") --- */}
                {activeCategory === 'Tutti' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[600px] md:h-[500px]">

                        {/* Slot 1: Soggiorno (Big Hero) */}
                        <DynamicTile
                            images={imagesByCategory['soggiorno'] || []}
                            label="Soggiorno"
                            interval={5000}
                            className="col-span-2 row-span-2"
                            onClick={(img) => openLightbox(img, imagesByCategory['soggiorno'])}
                        />

                        {/* Slot 2: Camere (Tall) */}
                        <DynamicTile
                            images={imagesByCategory['camere'] || []}
                            label="Zona Notte"
                            interval={4000}
                            className="col-span-1 row-span-2"
                            onClick={(img) => openLightbox(img, imagesByCategory['camere'])}
                        />

                        {/* Slot 3: Cucina (Small) */}
                        <DynamicTile
                            images={imagesByCategory['cucina'] || []}
                            label="Cucina"
                            interval={3500}
                            className="col-span-1 row-span-1"
                            onClick={(img) => openLightbox(img, imagesByCategory['cucina'])}
                        />

                        {/* Slot 4: Veranda/Esterni (Small - cycling mix if needed) */}
                        <DynamicTile
                            images={[...(imagesByCategory['esterno'] || []), ...(imagesByCategory['bagni'] || [])]}
                            label="Esterni & Servizi"
                            interval={4500}
                            className="col-span-1 row-span-1"
                            onClick={(img) => openLightbox(img, [...(imagesByCategory['esterno'] || []), ...(imagesByCategory['bagni'] || [])])}
                        />
                    </div>
                )}

                {/* --- MODE 2: HORIZONTAL SLIDER (Specific Category) --- */}
                {activeCategory !== 'Tutti' && (
                    <div className="relative">
                        {/* Scrollable Container */}
                        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-4 scrollbar-hide">
                            {activeCategoryImages.map((img, index) => (
                                <div
                                    key={img.id}
                                    className="flex-shrink-0 w-80 md:w-96 aspect-[4/3] snap-center relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
                                    onClick={() => openLightbox(img, activeCategoryImages)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            {activeCategoryImages.length === 0 && (
                                <div className="w-full text-center py-12 text-slate-500 bg-slate-50 rounded-xl">
                                    Nessuna immagine in questa categoria.
                                </div>
                            )}
                        </div>
                        {/* Hint for scrolling */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center text-slate-400 text-sm gap-2 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            <span>Scorri per vedere altro</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                    </div>
                )}
            </div>

            {/* --- LIGHTBOX MODAL --- */}
            {lightboxIndex !== null && lightboxImages.length > 0 && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2 transition-colors"
                        onClick={closeLightbox}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Prev Button */}
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all hidden sm:block"
                        onClick={prevImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Image Container */}
                    <div className="relative max-w-7xl max-h-screen p-4 flex flex-col items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightboxImages[lightboxIndex].src}
                            alt={lightboxImages[lightboxIndex].alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-white text-xl font-medium tracking-wide">{lightboxImages[lightboxIndex].alt}</h3>
                            {lightboxImages[lightboxIndex].description && (
                                <p className="text-white/70 mt-2 text-sm max-w-2xl mx-auto font-light">{lightboxImages[lightboxIndex].description}</p>
                            )}
                            <p className="text-white/40 text-xs mt-3 uppercase tracking-widest">{lightboxIndex + 1} / {lightboxImages.length}</p>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all hidden sm:block"
                        onClick={nextImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default GallerySection;

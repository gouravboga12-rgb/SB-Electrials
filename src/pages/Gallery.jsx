import { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

import g9  from '../assets/images/gallery/gallery_9.png';
import g10 from '../assets/images/gallery/gallery_10.png';
import g11 from '../assets/images/gallery/gallery_11.png';
import g12 from '../assets/images/gallery/gallery_12.png';
import g13 from '../assets/images/gallery/gallery_13.png';
import g14 from '../assets/images/gallery/gallery_14.png';
import g15 from '../assets/images/gallery/gallery_15.png';
import g16 from '../assets/images/gallery/gallery_16.png';
import g18 from '../assets/images/gallery/gallery_18.png';
import g25 from '../assets/images/gallery/gallery_25.png';
import g26 from '../assets/images/gallery/gallery_26.png';
import g27 from '../assets/images/gallery/gallery_27.png';

const GALLERY_ITEMS = [
  { src: g9,  alt: 'Solar Panel Installation - Project 1' },
  { src: g10, alt: 'Rooftop Solar Setup - Project 2' },
  { src: g11, alt: 'Residential Solar Installation - Project 3' },
  { src: g12, alt: 'Commercial Solar Array - Project 4' },
  { src: g13, alt: 'Grid-Tied Solar System - Project 5' },
  { src: g14, alt: 'Solar Panel Mounting - Project 6' },
  { src: g15, alt: 'Industrial Solar Installation - Project 7' },
  { src: g16, alt: 'Solar Energy System - Project 8' },
  { src: g18, alt: 'Solar Maintenance Work - Project 9' },
  { src: g25, alt: 'Premium Solar Setup - Project 10' },
  { src: g26, alt: 'Solar Panel Array - Project 11' },
  { src: g27, alt: 'Completed Solar Project - Project 12' },
];

export default function Gallery() {
  useSEO(
    "Gallery | SB Electricals - Solar Installation Projects Bengaluru",
    "Browse our portfolio of completed solar panel installations across Bengaluru. Residential, commercial, and industrial solar projects by SB Electricals."
  );

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  const goNext = () => setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (lightboxIndex === null) return;
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div
      className="relative min-h-screen pt-32 lg:pt-36 bg-white"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* ── HEADER ── */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Our Projects
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Installation Gallery
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A showcase of solar panel installations we've completed across Bengaluru — from homes to large commercial rooftops.
          </p>
        </div>
      </section>

      {/* ── MASONRY / GRID ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 60, 400)}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <p className="text-white text-xs font-semibold leading-snug">{item.alt}</p>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-1.5">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-all duration-200 z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[lightboxIndex].src}
              alt={GALLERY_ITEMS[lightboxIndex].alt}
              className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 text-center py-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
              <p className="text-white text-sm font-semibold">{GALLERY_ITEMS[lightboxIndex].alt}</p>
              <p className="text-white/50 text-xs mt-0.5">{lightboxIndex + 1} / {GALLERY_ITEMS.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

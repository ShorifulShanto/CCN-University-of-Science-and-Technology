import React, { useState, useRef, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Layers,
  Compass,
  Search,
  Plus,
  Trash2,
  ImageIcon,
  Sparkles,
  ExternalLink,
  LayoutGrid,
  Columns2,
} from 'lucide-react';
import DepthCarousel from './DepthCarousel';
import { useCmsData } from '../lib/useCmsData';
import { SwissBadge, SwissCornerCross } from './designSystem/SwissPrimitives';

interface GalleryProps {
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export default function Gallery({ isAdmin = false, onOpenAdminPanel }: GalleryProps) {
  const { gallery, deleteGalleryItem } = useCmsData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'reel' | 'depth'>('grid');
  const [gridColumns, setGridColumns] = useState<'2' | '3'>('2');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filtered items based on category & deferred search query
  const filteredItems = useMemo(() => {
    const cleanSearch = deferredSearchQuery.trim().toLowerCase();
    return gallery.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        cleanSearch === '' ||
        item.title.toLowerCase().includes(cleanSearch) ||
        item.category.toLowerCase().includes(cleanSearch) ||
        (item.caption && item.caption.toLowerCase().includes(cleanSearch));
      return matchesCategory && matchesSearch;
    });
  }, [gallery, selectedCategory, deferredSearchQuery]);

  // Visible sliced items for grid performance
  const visibleGridItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: gallery.length };
    gallery.forEach((item) => {
      const cat = item.category.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [gallery]);

  // Map dynamic CMS gallery items to Depth Carousel format (top 14 highlights)
  const depthCarouselItems = useMemo(() => {
    return gallery.slice(0, 14).map((item) => ({
      image: item.imageUrl,
      alt: item.title,
      title: item.title,
      tag: item.category.toUpperCase().replace('_', ' '),
      caption: item.caption || item.title,
    }));
  }, [gallery]);

  // Map dynamic CMS gallery items to Reel format
  const reelItems = useMemo(() => {
    return gallery.slice(0, 24).map((item, idx) => ({
      id: item.id,
      number: String(idx + 1).padStart(2, '0'),
      label: item.title,
      category: item.category,
      image: item.imageUrl,
      caption: item.caption || item.title,
    }));
  }, [gallery]);

  // Check scroll bounds for Reel
  const checkScrollBounds = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 500 + 24;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveScrollIndex(Math.min(index, Math.max(0, reelItems.length - 1)));
  }, [reelItems.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollBounds, { passive: true });
      checkScrollBounds();
      return () => el.removeEventListener('scroll', checkScrollBounds);
    }
  }, [viewMode, checkScrollBounds]);

  const handleScrollPrev = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -520, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 520, behavior: 'smooth' });
  };

  const openLightboxByIndex = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
  }, [lightboxIndex, filteredItems.length]);

  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
      if (e.key === 'ArrowRight') handleLightboxNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleLightboxPrev, handleLightboxNext]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Image fallback helper
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, originalUrl: string) => {
    const target = e.currentTarget;
    if (originalUrl.includes('googleusercontent.com/d/')) {
      const match = originalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
      }
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F5] text-[#163A2D] relative overflow-hidden border-b-2 border-[#163A2D]">
      <span id="campus-gallery" className="absolute -top-24 pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-[#EAF2ED] border border-[#163A2D]/20 text-[#163A2D] font-mono text-[11px] font-bold tracking-wider px-3 py-1 uppercase">
                CURATED PHOTO ARCHIVE
              </span>
              <span className="font-mono text-xs text-[#4E7D68] flex items-center space-x-1">
                <span>// {gallery.length} HIGH-RES PHOTOGRAPHS</span>
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#163A2D] leading-none">
              CAMPUS LIFE & <span className="text-[#163A2D] underline decoration-[#FAD02C] decoration-4">GALLERY</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#4E7D68] mt-3 max-w-2xl leading-relaxed">
              High-resolution visual collection showcasing Kotbari campus architecture, high-performance engineering labs, student activities, wall art murals, and faculty milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <button
                onClick={onOpenAdminPanel}
                className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border border-[#163A2D] px-4 py-2 font-black text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#FAD02C]" />
                <span>Admin: Manage Photos ({gallery.length})</span>
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="flex items-center bg-white p-1 border-2 border-[#163A2D] shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#163A2D] text-[#FAD02C]'
                    : 'text-[#4E7D68] hover:text-[#163A2D]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Large Grid ({gallery.length})</span>
              </button>

              <button
                onClick={() => setViewMode('reel')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                  viewMode === 'reel'
                    ? 'bg-[#163A2D] text-[#FAD02C]'
                    : 'text-[#4E7D68] hover:text-[#163A2D]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cinematic Reel</span>
              </button>

              <button
                onClick={() => setViewMode('depth')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                  viewMode === 'depth'
                    ? 'bg-[#163A2D] text-[#FAD02C]'
                    : 'text-[#4E7D68] hover:text-[#163A2D]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>3D Carousel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: FULL FILTERABLE LARGE GRID */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'campus', label: 'Campus & Grounds' },
                { id: 'academic', label: 'Academic & Labs' },
                { id: 'events', label: 'Events & News' },
                { id: 'cultural', label: 'Art & Cultural' },
                { id: 'student_life', label: 'Student Life' },
                { id: 'sports', label: 'Sports & Athletics' },
              ].map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                if (cat.id !== 'all' && count === 0) return null;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setVisibleCount(24);
                    }}
                    className={`px-3.5 py-2 text-xs font-bold transition-all cursor-pointer border flex items-center space-x-2 font-mono uppercase tracking-wider ${
                      isSelected
                        ? 'bg-[#163A2D] text-[#FAD02C] border-2 border-[#163A2D]'
                        : 'bg-white text-[#4E7D68] border-[#D0E4DA] hover:border-[#163A2D] hover:text-[#163A2D]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 font-mono ${
                        isSelected
                          ? 'bg-white/20 text-[#FAD02C]'
                          : 'bg-[#FAF8F5] text-[#4E7D68]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Grid Density & Search Field */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Density Toggle */}
              <div className="hidden sm:flex items-center bg-white border border-[#D0E4DA] p-1">
                <button
                  onClick={() => setGridColumns('2')}
                  title="2-Column Large Cinematic View"
                  className={`p-1.5 px-2.5 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-mono font-bold ${
                    gridColumns === '2'
                      ? 'bg-[#163A2D] text-[#FAD02C]'
                      : 'text-[#4E7D68] hover:text-[#163A2D]'
                  }`}
                >
                  <Columns2 className="w-4 h-4" />
                  <span className="text-[11px]">Extra Large</span>
                </button>
                <button
                  onClick={() => setGridColumns('3')}
                  title="3-Column Standard View"
                  className={`p-1.5 px-2.5 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-mono font-bold ${
                    gridColumns === '3'
                      ? 'bg-[#163A2D] text-[#FAD02C]'
                      : 'text-[#4E7D68] hover:text-[#163A2D]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-[11px]">3-Col</span>
                </button>
              </div>

              {/* Keyword Search Field */}
              <div className="relative flex-1 lg:w-72">
                <Search className="w-4 h-4 text-[#4E7D68] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search photographs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(24);
                  }}
                  className="w-full pl-9 pr-8 py-2 bg-white border border-[#D0E4DA] text-[#163A2D] text-xs placeholder:text-[#4E7D68]/60 focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4E7D68] hover:text-[#163A2D]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result Count Info */}
          <div className="flex items-center justify-between text-xs font-mono text-[#4E7D68] mb-6 pb-3 border-b border-[#D0E4DA]">
            <div>
              Showing <strong className="text-[#163A2D]">{Math.min(visibleCount, filteredItems.length)}</strong> of{' '}
              <strong className="text-[#163A2D]">{filteredItems.length}</strong> photographs
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </div>
            <div className="flex items-center space-x-1.5 text-[#163A2D] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FAD02C]" />
              <span>Full-Size High Definition Imagery</span>
            </div>
          </div>

          {/* Grid Layout */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white border-2 border-[#163A2D] p-8 shadow-sm">
              <ImageIcon className="w-10 h-10 text-[#4E7D68] mx-auto mb-3 opacity-60" />
              <p className="text-sm text-[#4E7D68]">No photos match your current filter or query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border border-[#163A2D]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 sm:gap-8 ${
                gridColumns === '2'
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {visibleGridItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightboxByIndex(idx)}
                  className="group relative bg-white border-2 border-[#163A2D] overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* High-Resolution Large Image Container */}
                  <div
                    className={`relative overflow-hidden bg-[#FAF8F5] ${
                      gridColumns === '2'
                        ? 'h-80 sm:h-96 md:h-[420px]'
                        : 'h-72 sm:h-80'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => handleImageError(e, item.imageUrl)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-3.5 left-3.5 bg-[#163A2D] border border-[#FAD02C]/40 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-[#FAD02C]">
                      {item.category.replace('_', ' ')}
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border border-[#FAD02C]/40 px-2.5 py-1 text-xs font-mono flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="font-bold text-[11px] uppercase tracking-wider">Enlarge</span>
                    </div>

                    {isAdmin && (
                      confirmDeleteId === item.id ? (
                        <div
                          className="absolute top-3.5 right-3.5 z-20 flex items-center space-x-1 bg-white/95 border border-red-400 p-1 shadow-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteGalleryItem(item.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(null);
                            }}
                            className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-mono font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(item.id);
                          }}
                          className="absolute top-3.5 right-3.5 z-20 bg-red-600 hover:bg-red-700 text-white p-1.5 cursor-pointer shadow-md"
                          title="Admin Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    )}
                  </div>

                  {/* Card Information Panel */}
                  <div className="p-5 sm:p-6 bg-white border-t-2 border-[#163A2D]">
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#4E7D68] uppercase mb-1.5">
                      <span>PLATE {String(idx + 1).padStart(2, '0')} // {item.date || 'Aug 2026'}</span>
                      <span className="text-[#163A2D] font-bold tracking-wider">CCNUST ARCHIVE</span>
                    </div>

                    <h4
                      className={`font-sans font-black text-[#163A2D] group-hover:text-[#FAD02C] transition-colors leading-snug ${
                        gridColumns === '2' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#4E7D68] mt-2 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredItems.length && (
            <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="px-6 py-3 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border border-[#163A2D] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Load More Photographs (+24)
              </button>
              <button
                onClick={() => setVisibleCount(filteredItems.length)}
                className="px-6 py-3 bg-white hover:bg-[#FAF8F5] text-[#163A2D] border-2 border-[#163A2D] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Display All ({filteredItems.length} Photographs)
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: CINEMATIC HORIZONTAL REEL */}
      {viewMode === 'reel' && (
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 group/gallery">
          {/* Left Arrow Button */}
          <button
            onClick={handleScrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous gallery image"
            className={`absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border-2 border-[#FAD02C] flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
              canScrollLeft
                ? 'opacity-0 group-hover/gallery:opacity-100 hover:scale-110 active:scale-95'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleScrollNext}
            disabled={!canScrollRight}
            aria-label="Next gallery image"
            className={`absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border-2 border-[#FAD02C] flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
              canScrollRight
                ? 'opacity-0 group-hover/gallery:opacity-100 hover:scale-110 active:scale-95'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Scrollable Track Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-2 px-2 focus:outline-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {reelItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightboxByIndex(idx)}
                style={{ scrollSnapAlign: 'start' }}
                className="group relative shrink-0 w-[320px] sm:w-[460px] md:w-[540px] h-[500px] sm:h-[580px] bg-[#163A2D] border-2 border-[#163A2D] hover:border-[#FAD02C] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-end p-6 sm:p-8 select-none shadow-xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    onError={(e) => handleImageError(e, item.image)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#163A2D] via-[#163A2D]/60 to-transparent" />
                </div>

                {/* Admin quick delete */}
                {isAdmin && (
                  confirmDeleteId === item.id ? (
                    <div
                      className="absolute top-4 right-4 z-20 flex items-center space-x-1 bg-white/95 border border-red-400 p-1 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteGalleryItem(item.id);
                          setConfirmDeleteId(null);
                        }}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(null);
                        }}
                        className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-mono font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(item.id);
                      }}
                      className="absolute top-4 right-4 z-20 bg-red-600 hover:bg-red-700 text-white p-2 cursor-pointer transition-all shadow-md"
                      title="Admin Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )
                )}

                {/* Card Content */}
                <div className="relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sm sm:text-base font-black text-[#FAD02C] tracking-wider">
                      {item.number}
                    </span>
                    <span className="font-mono text-[11px] uppercase font-bold px-2.5 py-0.5 bg-[#163A2D]/80 border border-[#FAD02C]/40 text-[#FAD02C]">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#FAD02C] transition-colors">
                    {item.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FAF8F5]/80 mt-2 font-normal line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-mono text-[#FAD02C]">
                    <span className="font-bold">Click to Enlarge Fullscreen</span>
                    <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#4E7D68] border-t border-[#D0E4DA] pt-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FAD02C]" />
              <span>HOVER ON GALLERY TO REVEAL ARROWS • DRAG OR CLICK TO BROWSE</span>
            </div>

            <div className="text-xs text-[#4E7D68]">
              SHOWING HIGHLIGHTS OF <strong className="text-[#163A2D]">{gallery.length}</strong> PHOTOGRAPHS
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: DEPTH CAROUSEL 3D SHOWCASE */}
      {viewMode === 'depth' && (
        <div className="w-full relative z-10">
          <div className="text-center font-mono text-xs text-[#4E7D68] mb-6 flex items-center justify-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#FAD02C] animate-ping" />
            <span className="tracking-wider">DRAG HORIZONTALLY TO ROTATE 3D PERSPECTIVE CAROUSEL • CLICK ANY CARD TO EXPAND</span>
          </div>
          <DepthCarousel
            items={depthCarouselItems}
            cardWidth={420}
            cardHeight={540}
            spread={120}
            onSelect={(_, idx) => openLightboxByIndex(idx)}
          />
          <div className="text-center mt-8">
            <button
              onClick={() => setViewMode('grid')}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#163A2D] hover:text-[#FAD02C] hover:bg-[#163A2D] border-2 border-[#163A2D] px-5 py-2.5 bg-white transition-all cursor-pointer shadow-xs"
            >
              <Grid className="w-4 h-4" />
              <span>Switch to All-Photos Grid ({gallery.length} Photos) &rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal with Prev/Next Navigation */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md select-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 text-[#FAD02C] bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#163A2D] border border-[#FAD02C]/40 transition-colors z-50 cursor-pointer shadow-lg"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxPrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-[#FAD02C] bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#163A2D] border border-[#FAD02C]/40 transition-all z-50 cursor-pointer shadow-2xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-[#FAD02C] bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#163A2D] border border-[#FAD02C]/40 transition-all z-50 cursor-pointer shadow-2xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl w-full bg-[#163A2D] border-2 border-[#163A2D] p-4 sm:p-7 shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] overflow-hidden bg-black/40 flex items-center justify-center border border-[#163A2D]">
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                onError={(e) => handleImageError(e, currentLightboxItem.imageUrl)}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#FAD02C] uppercase tracking-wider">
                    CATEGORY: {currentLightboxItem.category.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs text-[#FAF8F5]/60">
                    • PHOTO {lightboxIndex !== null ? lightboxIndex + 1 : 1} OF {filteredItems.length}
                  </span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {currentLightboxItem.title}
                </h3>
                {currentLightboxItem.caption && (
                  <p className="text-xs sm:text-sm text-[#FAF8F5]/80 mt-1 max-w-3xl font-normal">
                    {currentLightboxItem.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleLightboxPrev}
                  className="px-3.5 py-2 bg-[#0D241C] hover:bg-[#163A2D] text-[#FAD02C] border border-[#FAD02C]/30 text-xs font-mono cursor-pointer transition-colors"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={handleLightboxNext}
                  className="px-3.5 py-2 bg-[#0D241C] hover:bg-[#163A2D] text-[#FAD02C] border border-[#FAD02C]/30 text-xs font-mono cursor-pointer transition-colors"
                >
                  Next &rarr;
                </button>
                <a
                  href={currentLightboxItem.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#0D241C] hover:bg-[#163A2D] text-[#FAD02C] border border-[#FAD02C]/30 text-xs font-mono flex items-center space-x-1 transition-colors"
                  title="Open High-Res Original"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>HD</span>
                </a>
                <button
                  onClick={closeLightbox}
                  className="px-5 py-2 bg-[#FAD02C] hover:bg-[#FAF8F5] text-[#163A2D] font-mono text-xs font-black uppercase cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

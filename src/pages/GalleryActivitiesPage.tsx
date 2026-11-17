import React, { useState, useMemo, useEffect } from 'react';
import {
  Image as ImageIcon,
  Calendar,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  FolderArchive,
  Building,
  GraduationCap,
  FlaskConical,
  Trophy,
  Palette,
} from 'lucide-react';
import { REAL_ACTIVITY_ALBUMS } from '../data/ccnustRealData';
import { useCmsData } from '../lib/useCmsData';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';

interface UnifiedPhoto {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  imageUrl: string;
  caption: string;
  date: string;
  source: 'drive' | 'album';
  albumName?: string;
}

export default function GalleryActivitiesPage() {
  const { gallery } = useCmsData();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeSource, setActiveSource] = useState<'ALL' | 'drive' | 'album'>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, activeSource]);

  // Normalize Live CMS Gallery items & Activity Albums into unified list
  const unifiedPhotos = useMemo<UnifiedPhoto[]>(() => {
    const list: UnifiedPhoto[] = [];

    // 1. Live CMS Campus & Drive Archives (deduplicated by media key)
    const seenMedia = new Set<string>();
    gallery.forEach((item) => {
      const m = item.imageUrl.match(/lh3\.googleusercontent\.com\/d\/([^=?&/]+)|thumbnail\?id=([^&]+)/);
      const mediaKey = m ? `drive:${m[1] || m[2]}` : item.imageUrl.trim();
      if (seenMedia.has(mediaKey)) return;
      seenMedia.add(mediaKey);

      let catLabel = 'Campus';
      let catColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';

      if (item.category === 'academic') {
        catLabel = 'Library & Academic';
        catColor = 'bg-blue-100 text-blue-800 border-blue-300';
      } else if (item.category === 'events' || item.category === 'seminar') {
        catLabel = 'Events & Seminars';
        catColor = 'bg-amber-100 text-amber-800 border-amber-300';
      } else if (item.category === 'cultural') {
        catLabel = 'Cultural & Murals';
        catColor = 'bg-rose-100 text-rose-800 border-rose-300';
      } else if (item.category === 'sports') {
        catLabel = 'Sports & Games';
        catColor = 'bg-purple-100 text-purple-800 border-purple-300';
      } else if (item.category === 'student_life') {
        catLabel = 'Transport & Student Life';
        catColor = 'bg-teal-100 text-teal-800 border-teal-300';
      }

      list.push({
        id: item.id,
        title: item.title,
        category: item.category,
        categoryLabel: catLabel,
        categoryColor: catColor,
        imageUrl: item.imageUrl,
        caption: item.caption || item.title,
        date: item.date || 'Aug 2026',
        source: 'drive',
        albumName: 'Kotbari Campus Photo Archives',
      });
    });

    // 2. Real Scraped Activity Albums
    REAL_ACTIVITY_ALBUMS.forEach((album) => {
      album.images.forEach((imgUrl, idx) => {
        list.push({
          id: `alb-${album.id}-${idx}`,
          title: `${album.title} — Photo ${idx + 1}`,
          category: 'events',
          categoryLabel: album.category || 'Official Events',
          categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          imageUrl: imgUrl,
          caption: album.description,
          date: album.date || 'Academic Session',
          source: 'album',
          albumName: album.title,
        });
      });
    });

    return list;
  }, [gallery]);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return unifiedPhotos.filter((item) => {
      const matchSource = activeSource === 'ALL' || item.source === activeSource;
      const matchCategory =
        activeCategory === 'ALL' ||
        item.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSource && matchCategory;
    });
  }, [unifiedPhotos, activeSource, activeCategory]);

  // Sliced for progressive rendering & instant initial paint
  const visiblePhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const categories = [
    { id: 'ALL', label: 'All Photos', icon: Layers },
    { id: 'campus', label: 'Campus & Architecture', icon: Building },
    { id: 'student_life', label: 'Transport & Student Life', icon: Sparkles },
    { id: 'academic', label: 'Library & Academic', icon: FlaskConical },
    { id: 'events', label: 'Events & Seminars', icon: GraduationCap },
    { id: 'cultural', label: 'Cultural & Murals', icon: Palette },
    { id: 'sports', label: 'Sports & Games', icon: Trophy },
  ];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Safe fallback for Drive / CDN images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, photo: UnifiedPhoto) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    // Extract drive file id if present
    const driveMatch = currentSrc.match(/lh3\.googleusercontent\.com\/d\/([^=]+)/);
    if (driveMatch && driveMatch[1]) {
      const driveId = driveMatch[1];
      if (!currentSrc.includes('thumbnail')) {
        target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`;
        return;
      }
    }
    // Final scenic campus fallback
    target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop';
  };

  const currentLightboxPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24">
      <SectionAtmosphere variant="light" showSakura={false} />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="Campus Gallery & Activities"
        category="Campus Life"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded-md">
            <ImageIcon className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Campus Photographic Archives & Drive Records</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            Campus Gallery & Activities
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            High-resolution photographic archives of CCNUST Kotbari main campus, high-spec labs, student activities, national ceremonies, and research symposiums.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs text-xs font-mono text-slate-600">
            <span><strong>{unifiedPhotos.length}</strong> Total Images</span>
            <span>•</span>
            <span className="text-[#163A2D] font-bold">{gallery.length} Kotbari Campus Archives</span>
            <span>•</span>
            <span>{REAL_ACTIVITY_ALBUMS.length} Official Activity Albums</span>
          </div>
        </div>

        {/* Source Filter Switcher (All / Drive Archives / Official Albums) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveSource('ALL')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border ${
              activeSource === 'ALL'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Archives ({unifiedPhotos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSource('drive')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-1.5 ${
              activeSource === 'drive'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Kotbari Campus Archives ({gallery.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSource('album')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border ${
              activeSource === 'album'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            University Activity Albums ({REAL_ACTIVITY_ALBUMS.length})
          </button>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-[#D0E4DA]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = unifiedPhotos.filter((p) => {
              const matchSource = activeSource === 'ALL' || p.source === activeSource;
              const matchCat = cat.id === 'ALL' || p.category.toLowerCase() === cat.id.toLowerCase();
              return matchSource && matchCat;
            }).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer border flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#21513F] text-white border-[#21513F] shadow-sm'
                    : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FAD02C]' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visiblePhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#163A2D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative h-52 sm:h-56 bg-slate-100 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleImageError(e, photo)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Pill Overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold rounded-md shadow-xs border ${photo.categoryColor}`}
                  >
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Drive Badge */}
                {photo.source === 'drive' && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="bg-[#163A2D]/90 text-[#FAD02C] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs">
                      DRIVE HD
                    </span>
                  </div>
                )}

                {/* Hover Maximize Overlay */}
                <div className="absolute inset-0 bg-[#0F281E]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-[#163A2D] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                <div>
                  <h3 className="font-sans font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#163A2D] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-sans mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="truncate max-w-[150px]">{photo.albumName}</span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <Calendar className="w-3 h-3 text-[#FAD02C]" />
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progressive Pagination Controls */}
        {visibleCount < filteredPhotos.length && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-6 py-3 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Load More Photos ({filteredPhotos.length - visibleCount} remaining)</span>
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredPhotos.length)}
              className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              Show All ({filteredPhotos.length})
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-sans font-bold text-slate-800 text-lg">No photos found</h3>
            <p className="text-slate-500 text-sm mt-1">Try switching categories or view All Archives.</p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setActiveSource('ALL');
              }}
              className="mt-4 px-4 py-2 bg-[#163A2D] text-[#FAD02C] text-xs font-mono font-bold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Fullscreen Interactive Lightbox Modal */}
        {currentLightboxPhoto && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-[#FAD02C] p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Navigation */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#FAD02C] p-3 bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Navigation */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#FAD02C] p-3 bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Main Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center max-h-[92vh]"
            >
              {/* Photo Display */}
              <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-2xl">
                <img
                  src={currentLightboxPhoto.imageUrl}
                  alt={currentLightboxPhoto.title}
                  onError={(e) => handleImageError(e, currentLightboxPhoto)}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {/* Caption & Metadata Bar */}
              <div className="w-full mt-3 bg-slate-900/90 border border-white/10 rounded-xl p-4 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 rounded">
                      {currentLightboxPhoto.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Photo {(lightboxIndex ?? 0) + 1} of {filteredPhotos.length}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-base text-white">
                    {currentLightboxPhoto.title}
                  </h4>
                  <p className="text-xs font-sans text-slate-300 leading-relaxed">
                    {currentLightboxPhoto.caption}
                  </p>
                </div>

                <div className="text-right shrink-0 font-mono text-xs text-slate-400 space-y-1">
                  <div className="text-[#FAD02C] font-bold">{currentLightboxPhoto.albumName}</div>
                  <div>{currentLightboxPhoto.date}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

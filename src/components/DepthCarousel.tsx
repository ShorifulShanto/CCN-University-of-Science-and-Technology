import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export interface DepthCarouselItem {
  image: string;
  alt?: string;
  title?: string;
  caption?: string;
  tag?: string;
}

export interface DepthCarouselProps {
  items: DepthCarouselItem[];
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: 'left' | 'right' | 'center';
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  autoplay?: boolean;
  loop?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  duration?: number;
  ease?: string;
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  onSelect?: (item: DepthCarouselItem, index: number) => void;
  className?: string;
}

export default function DepthCarousel({
  items,
  depth = 260,
  spread = 110,
  tilt = 20,
  tiltDirection = 'right',
  perspective = 1600,
  visibleCards = 4,
  falloff = 0.18,
  blur = 5,
  autoplay = false,
  loop = true,
  cardWidth = 380,
  cardHeight = 490,
  radius = 16,
  tint = '#163A2D',
  duration = 700,
  ease = 'power3.out',
  autoplayDelay = 3200,
  showControls = true,
  showIndicators = true,
  onSelect,
  className = '',
}: DepthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);

  const totalItems = items.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === 0) {
        return loop ? totalItems - 1 : 0;
      }
      return prev - 1;
    });
  }, [loop, totalItems]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === totalItems - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [loop, totalItems]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovered || isDragging) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, handleNext, isHovered, isDragging]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch / Pointer Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX.current > 40) {
      handlePrev();
    } else if (dragDeltaX.current < -40) {
      handleNext();
    }
    dragDeltaX.current = 0;
  };

  // Calculate position styles for card at index i
  const getCardStyle = (index: number) => {
    if (totalItems === 0) return {};

    let offset = index - activeIndex;

    if (loop) {
      if (offset > totalItems / 2) offset -= totalItems;
      if (offset < -totalItems / 2) offset += totalItems;
    }

    const absOffset = Math.abs(offset);
    const isVisible = absOffset <= visibleCards;

    if (!isVisible) {
      return {
        display: 'none',
      };
    }

    const translateX = offset * spread;
    const translateZ = -absOffset * depth;
    const scale = Math.max(0.2, 1 - absOffset * falloff);
    const blurAmount = absOffset * blur;
    const opacity = Math.max(0, 1 - absOffset * 0.18);
    const zIndex = 100 - absOffset * 10;

    let rotateY = 0;
    if (offset !== 0) {
      const dirMult = tiltDirection === 'right' ? 1 : tiltDirection === 'left' ? -1 : 0;
      rotateY = (offset > 0 ? -tilt : tilt) * dirMult;
    }

    const transitionEase = ease.includes('power3') ? 'cubic-bezier(0.215, 0.61, 0.355, 1)' : 'ease-out';

    return {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      borderRadius: `${radius}px`,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
      transition: isDragging
        ? 'none'
        : `transform ${duration}ms ${transitionEase}, opacity ${duration}ms ease, filter ${duration}ms ease`,
    };
  };

  return (
    <div
      id="depth-carousel-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden outline-none ${className}`}
      style={{ perspective: `${perspective}px`, touchAction: 'pan-y' }}
    >
      {/* 3D Cards Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          height: `${cardHeight + 40}px`,
        }}
      >
        {items.map((item, idx) => {
          const style = getCardStyle(idx);
          const isActive = idx === activeIndex;
          let offset = idx - activeIndex;
          if (loop) {
            if (offset > totalItems / 2) offset -= totalItems;
            if (offset < -totalItems / 2) offset += totalItems;
          }
          const absOffset = Math.abs(offset);

          return (
            <div
              key={idx}
              id={`depth-card-${idx}`}
              onClick={() => {
                if (isActive) {
                  onSelect?.(item, idx);
                } else {
                  setActiveIndex(idx);
                }
              }}
              style={style}
              className={`absolute top-0 flex flex-col overflow-hidden border-2 cursor-pointer shadow-2xl transition-all duration-300 ${
                isActive
                  ? 'border-[#FAD02C] shadow-[0_20px_45px_rgba(22,58,45,0.4)] ring-2 ring-[#FAD02C]'
                  : 'border-[#163A2D] hover:border-[#FAD02C] shadow-[0_10px_25px_rgba(22,58,45,0.2)]'
              }`}
            >
              {/* Card Image */}
              <img
                src={item.image}
                alt={item.alt || item.title || `Card ${idx + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (item.image.includes('googleusercontent.com/d/')) {
                    const match = item.image.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) {
                      target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
                    }
                  }
                }}
              />

              {/* Tint Overlay for depth perception */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  backgroundColor: tint,
                  opacity: isActive ? 0.08 : Math.min(0.7, 0.15 + absOffset * 0.15),
                }}
              />

              {/* Card Label / Title overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#163A2D] via-[#163A2D]/80 to-transparent p-4 text-white">
                {item.tag && (
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 mb-1.5">
                    {item.tag}
                  </span>
                )}
                {item.title && (
                  <h4 className="font-sans text-sm font-black uppercase tracking-tight text-white leading-tight line-clamp-1">
                    {item.title}
                  </h4>
                )}
                {item.caption && (
                  <p className="text-[11px] font-sans text-[#FAF8F5]/80 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.caption}
                  </p>
                )}
                {item.alt && !item.title && (
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {item.alt}
                  </div>
                )}
              </div>

              {/* Top indicator badge */}
              <div className="absolute top-3 left-3 bg-[#163A2D] text-[#FAD02C] font-mono text-[10px] font-bold px-2.5 py-0.5 border border-[#FAD02C]/40 shadow-xs">
                PLATE {String(idx + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls Overlay */}
      {showControls && (
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-[120]">
          <button
            type="button"
            id="depth-carousel-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#163A2D] hover:bg-[#163A2D] hover:text-[#FAD02C] border-2 border-[#163A2D] shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            id="depth-carousel-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#163A2D] hover:bg-[#163A2D] hover:text-[#FAD02C] border-2 border-[#163A2D] shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Indicators / Dots at bottom */}
      {showIndicators && (
        <div className="mt-6 flex items-center space-x-2 z-20">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              id={`depth-indicator-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'w-8 h-2 bg-[#163A2D] shadow-xs'
                  : 'w-2 h-2 bg-[#D0E4DA] hover:bg-[#4E7D68]'
              }`}
              aria-label={`Jump to plate ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from './sanityClient';

interface ProductGalleryProps {
  mainImage: any;
  gallery: any[];
  productName: string;
  fallbackImage: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ 
  mainImage, 
  gallery = [], 
  productName,
  fallbackImage 
}) => {
  // Combine main image with gallery
  const allImages = [mainImage, ...(gallery || [])].filter(Boolean);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const getImgSrc = (img: any, size = 800) => {
    if (!img) return fallbackImage;
    return getImageUrl(img, size) || fallbackImage;
  };

  const handlePrev = () => {
    setSelectedIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
    resetZoom();
  };

  const handleNext = () => {
    setSelectedIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
    resetZoom();
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 50, y: 50 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 50, y: 50 });
      return newZoom;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') { resetZoom(); setIsZoomed(false); }
  };

  return (
    <div className="flex flex-col gap-4" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image Container */}
      <div 
        className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden aspect-square group"
        onMouseMove={handleMouseMove}
      >
        {/* Main Image */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in"
          onClick={() => zoomLevel === 1 ? handleZoomIn() : resetZoom()}
        >
          <img
            src={getImgSrc(allImages[selectedIndex], 1200)}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${position.x}% ${position.y}%`
            }}
          />
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
            disabled={zoomLevel <= 1}
            className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ZoomOut className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
            disabled={zoomLevel >= 3}
            className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ZoomIn className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedIndex(idx); resetZoom(); }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                idx === selectedIndex 
                  ? 'border-slate-800 shadow-md' 
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img
                src={getImgSrc(img, 150)}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

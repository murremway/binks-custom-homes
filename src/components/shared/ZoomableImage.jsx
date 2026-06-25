import React, { useCallback, useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const MIN_SCALE = 1;
const DEFAULT_MAX_SCALE = 3;

export default function ZoomableImage({
  src,
  alt,
  imageKey,
  containerClassName = "h-[min(50vh,420px)]",
  maxScale = DEFAULT_MAX_SCALE,
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef(null);
  const pinchStart = useRef(null);

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageKey, src]);

  const clampScale = useCallback(
    (value) => Math.min(maxScale, Math.max(MIN_SCALE, value)),
    [maxScale],
  );

  const zoomIn = () => setScale((current) => clampScale(current + 0.25));
  const zoomOut = () => {
    setScale((current) => {
      const next = clampScale(current - 0.25);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (event) => {
    if (scale <= 1 && !event.ctrlKey && !event.metaKey) return;

    event.preventDefault();
    event.stopPropagation();

    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    setScale((current) => {
      const next = clampScale(current + delta);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (event) => {
    if (scale <= 1) return;
    event.preventDefault();
    setIsDragging(true);
    dragOrigin.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !dragOrigin.current) return;
    setPosition({
      x: event.clientX - dragOrigin.current.x,
      y: event.clientY - dragOrigin.current.y,
    });
  };

  const endDrag = () => {
    setIsDragging(false);
    dragOrigin.current = null;
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      resetZoom();
      return;
    }
    setScale(Math.min(2, maxScale));
  };

  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      pinchStart.current = {
        distance: getTouchDistance(event.touches),
        scale,
      };
      return;
    }

    if (event.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      dragOrigin.current = {
        x: event.touches[0].clientX - position.x,
        y: event.touches[0].clientY - position.y,
      };
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2 && pinchStart.current) {
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      const ratio = distance / pinchStart.current.distance;
      const next = clampScale(pinchStart.current.scale * ratio);
      setScale(next);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return;
    }

    if (event.touches.length === 1 && isDragging && dragOrigin.current) {
      event.preventDefault();
      setPosition({
        x: event.touches[0].clientX - dragOrigin.current.x,
        y: event.touches[0].clientY - dragOrigin.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    pinchStart.current = null;
    endDrag();
  };

  return (
    <div className={`relative w-full max-w-full min-w-0 ${containerClassName}`}>
      <div className="absolute right-2 top-2 z-20 flex gap-1">
        <button
          type="button"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          className="bg-white/90 p-2 text-[#1a1a2e] shadow-md transition-colors hover:bg-white disabled:opacity-40"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          disabled={scale >= maxScale}
          className="bg-white/90 p-2 text-[#1a1a2e] shadow-md transition-colors hover:bg-white disabled:opacity-40"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          disabled={scale === MIN_SCALE && position.x === 0 && position.y === 0}
          className="bg-white/90 p-2 text-[#1a1a2e] shadow-md transition-colors hover:bg-white disabled:opacity-40"
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div
        className={`flex h-full w-full items-center justify-center overflow-hidden ${
          scale > 1 ? "touch-none" : ""
        } ${scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="mx-auto block max-h-full max-w-full select-none object-contain"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease",
          }}
        />
      </div>

      <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 text-[10px] uppercase tracking-wider text-[#1a1a2e]/40 sm:block">
        Scroll to zoom · Pinch on mobile · Drag to pan · Double-click to reset
      </p>
    </div>
  );
}

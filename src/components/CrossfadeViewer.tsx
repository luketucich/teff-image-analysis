import { useCallback, useEffect, useRef, useState } from 'react';
import { findImage } from '../data/manifest';
import { ConditionSelector, type Condition } from './ConditionSelector';
import { DownloadButton } from './DownloadButton';

interface Props {
  conditionA: Condition;
  conditionB: Condition;
  onChangeA: (next: Condition) => void;
  onChangeB: (next: Condition) => void;
}

export function CrossfadeViewer({
  conditionA,
  conditionB,
  onChangeA,
  onChangeB,
}: Props) {
  const imageA = findImage(conditionA.tissue, conditionA.diet, conditionA.treatment);
  const imageB = findImage(conditionB.tissue, conditionB.diet, conditionB.treatment);

  // Position is the percent of the container width at which the divider sits.
  // The B image is revealed on the LEFT (0 → fully A, 100 → fully B).
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  // Keyboard fine-control on the divider button.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 5 : 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(100);
    }
  };

  // Reset when both images change (e.g. via preset).
  useEffect(() => {
    if (imageA.id === imageB.id) setPos(50);
  }, [imageA.id, imageB.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <ConditionSelector value={conditionA} onChange={onChangeA} label="Image A · revealed on right" />
          <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
            <span className="truncate">{imageA.label}</span>
            <DownloadButton image={imageA} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <ConditionSelector value={conditionB} onChange={onChangeB} label="Image B · revealed on left" />
          <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
            <span className="truncate">{imageB.label}</span>
            <DownloadButton image={imageB} />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-lg border border-slate-200 bg-slate-900 shadow-sm"
        style={{ aspectRatio: '1920 / 1200' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Base layer = Image A (full width) */}
        <img
          src={imageA.pngUrl}
          alt={imageA.label}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Top layer = Image B, clipped to the LEFT portion using clip-path */}
        <img
          src={imageB.pngUrl}
          alt={imageB.label}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        {/* Corner labels */}
        <span className="tag pointer-events-none absolute left-3 top-3 rounded bg-black/65 px-2 py-1 text-white">
          B · {imageB.posterPanel}
        </span>
        <span className="tag pointer-events-none absolute right-3 top-3 rounded bg-black/65 px-2 py-1 text-white">
          A · {imageA.posterPanel}
        </span>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
          style={{ left: `calc(${pos}% - 1px)` }}
        />

        {/* Drag handle (also the focusable element for keyboard control) */}
        <button
          type="button"
          aria-label="Crossfade divider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          role="slider"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full border border-slate-300 bg-white p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-(--color-poster-accent)"
          style={{ left: `${pos}%` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" transform="translate(15 0) scale(-1 1) translate(-15 0)" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Drag the divider to crossfade between images. Use ← / → arrows for fine control (Shift = ×5; Home / End = endpoints).
        Both images are H&E, 20× — scale bar burned into the image is 100 µm.
      </p>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { findImage } from '../data/manifest';
import { ImagePicker, type Condition } from './ImagePicker';
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

  // pos = % from the LEFT at which the divider sits.
  // A is on the LEFT, B is on the RIGHT.
  // pos=0 → all B; pos=100 → all A.
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

  useEffect(() => {
    if (imageA.id === imageB.id) setPos(50);
  }, [imageA.id, imageB.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ImagePicker value={conditionA} onChange={onChangeA} label="Left · A" />
          <DownloadButton image={imageA} prefix="A" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ImagePicker value={conditionB} onChange={onChangeB} label="Right · B" />
          <DownloadButton image={imageB} prefix="B" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-lg bg-zinc-950"
        style={{ aspectRatio: '1920 / 1200' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={imageB.pngUrl}
          alt={imageB.label}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={imageA.pngUrl}
          alt={imageA.label}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
          style={{ left: `${pos}%` }}
        />

        <button
          type="button"
          aria-label="Crossfade divider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          role="slider"
          onKeyDown={onKeyDown}
          className="group absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full border border-zinc-300 bg-white p-1.5 shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          style={{ left: `${pos}%` }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-700"
          >
            <polyline points="9 18 3 12 9 6" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Drag the divider · ← / → for fine control · Shift = ×5
      </p>
    </div>
  );
}

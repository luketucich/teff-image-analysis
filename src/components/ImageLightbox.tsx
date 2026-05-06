import { useEffect } from 'react';
import type { ImageEntry } from '../data/manifest';

interface Props {
  image: ImageEntry;
  onClose: () => void;
}

export function ImageLightbox({ image, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${image.label} (full resolution)`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 p-6"
    >
      <div
        className="relative flex max-h-full max-w-full flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 text-zinc-200">
          <div className="flex items-baseline gap-3">
            <span className="text-base font-medium">{image.label}</span>
            <span className="code text-zinc-500">{image.posterPanel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            Close · Esc
          </button>
        </div>
        <img
          src={image.pngUrl}
          alt={image.label}
          className="block max-h-[88vh] max-w-[96vw] rounded object-contain"
        />
      </div>
    </div>
  );
}

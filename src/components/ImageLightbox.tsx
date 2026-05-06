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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
    >
      <div
        className="relative flex max-h-full max-w-full flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-1 pb-2 text-white">
          <div className="flex flex-col">
            <span className="tag text-white/70">{image.posterPanel}</span>
            <span className="text-base font-medium">{image.label}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20"
          >
            Close (Esc)
          </button>
        </div>
        <img
          src={image.pngUrl}
          alt={image.label}
          className="block max-h-[88vh] max-w-[96vw] object-contain"
        />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import type { ImageEntry } from '../data/manifest';

interface Props {
  image: ImageEntry;
}

export function DownloadButton({ image }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-(--color-poster-accent)/30"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
        >
          <a
            role="menuitem"
            href={image.pngUrl}
            download={`${image.id}.png`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
          >
            <span>PNG (web)</span>
            <span className="tag text-slate-400">1920×1200</span>
          </a>
          <a
            role="menuitem"
            href={image.tifUrl}
            download={`${image.id}.tif`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-t border-slate-100 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
          >
            <span>TIF (original)</span>
            <span className="tag text-slate-400">~7 MB</span>
          </a>
        </div>
      )}
    </div>
  );
}

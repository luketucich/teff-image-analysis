import { useEffect, useRef, useState } from 'react';
import type { ImageEntry } from '../data/manifest';

interface Props {
  image: ImageEntry;
  /** Optional inline label to show before the icon (e.g. "A") */
  prefix?: string;
}

export function DownloadButton({ image, prefix }: Props) {
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
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-300"
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Download ${image.label}`}
      >
        {prefix && <span className="font-mono">{prefix}</span>}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg"
        >
          <a
            role="menuitem"
            href={image.pngUrl}
            download={`${image.id}.png`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
          >
            <span>PNG (web)</span>
            <span className="code">1920×1200</span>
          </a>
          <a
            role="menuitem"
            href={image.tifUrl}
            download={`${image.id}.tif`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-t border-zinc-100 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
          >
            <span>TIF (original)</span>
            <span className="code">~7 MB</span>
          </a>
        </div>
      )}
    </div>
  );
}

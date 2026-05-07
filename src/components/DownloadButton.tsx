import { useEffect, useRef, useState } from 'react';
import type { ImageEntry } from '../data/manifest';

interface Props {
  image: ImageEntry;
  /** Optional inline label (e.g. "A" or "B") */
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
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:ring-zinc-700"
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Download ${image.label}`}
      >
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
        <span>Download{prefix ? ` ${prefix}` : ''}</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <a
            role="menuitem"
            href={image.pngUrl}
            download={`${image.id}.png`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span>PNG (web)</span>
            <span className="code">1920×1200</span>
          </a>
          <a
            role="menuitem"
            href={image.tifUrl}
            download={`${image.id}.tif`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-t border-zinc-100 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span>TIF (original)</span>
            <span className="code">~7 MB</span>
          </a>
        </div>
      )}
    </div>
  );
}

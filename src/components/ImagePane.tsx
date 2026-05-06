import { useState } from 'react';
import { findImage } from '../data/manifest';
import { ConditionSelector, type Condition } from './ConditionSelector';
import { DownloadButton } from './DownloadButton';
import { ImageLightbox } from './ImageLightbox';

interface Props {
  condition: Condition;
  onChange: (next: Condition) => void;
  /** Optional label shown above the dropdowns (e.g. "Pane 1") */
  label?: string;
  /** When true, render the image larger / with no max-height clamp */
  large?: boolean;
}

export function ImagePane({ condition, onChange, label, large }: Props) {
  const image = findImage(condition.tissue, condition.diet, condition.treatment);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
      <ConditionSelector value={condition} onChange={onChange} label={label} />

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group relative block overflow-hidden rounded-md bg-slate-900 ring-0 ring-(--color-poster-accent)/40 transition focus:outline-none focus:ring-2"
        aria-label={`Zoom in on ${image.label}`}
      >
        <img
          src={image.pngUrl}
          alt={image.label}
          loading="lazy"
          className={`mx-auto block w-full object-contain ${large ? 'max-h-[58vh]' : 'max-h-[34vh]'}`}
        />
        <span className="tag pointer-events-none absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-white">
          {treatmentTag(condition)} · {dietTag(condition)}
        </span>
        <span className="tag pointer-events-none absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-white">
          {image.posterPanel}
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
          Click to zoom · 100 µm scale on image
        </span>
      </button>

      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-slate-600">{image.label}</span>
        <DownloadButton image={image} />
      </div>

      {zoomed && (
        <ImageLightbox image={image} onClose={() => setZoomed(false)} />
      )}
    </div>
  );
}

function treatmentTag(c: Condition) {
  return c.treatment === 'control'
    ? 'CONTROL'
    : c.treatment === 'brown-teff'
      ? 'BROWN TEFF'
      : 'IVORY TEFF';
}

function dietTag(c: Condition) {
  return c.diet === 'low-fat' ? 'LF 10%' : 'HF 60%';
}

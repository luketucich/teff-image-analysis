import { useState } from 'react';
import { findImage } from '../data/manifest';
import { ConditionSelector, type Condition } from './ConditionSelector';
import { DownloadButton } from './DownloadButton';
import { ImageLightbox } from './ImageLightbox';

interface Props {
  condition: Condition;
  onChange: (next: Condition) => void;
  /** Optional small label shown above the selector (e.g. "Pane 1") */
  label?: string;
  /** Hero size for Single mode */
  large?: boolean;
}

export function ImagePane({ condition, onChange, label, large }: Props) {
  const image = findImage(condition.tissue, condition.diet, condition.treatment);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          {label && (
            <span className="label self-end pb-2">{label}</span>
          )}
          <ConditionSelector value={condition} onChange={onChange} />
        </div>
        <div className="flex items-center gap-3 self-end pb-0.5">
          <span className="code">{image.posterPanel}</span>
          <DownloadButton image={image} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group block overflow-hidden rounded-lg bg-zinc-950 ring-zinc-900 transition focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:ring-zinc-200"
        aria-label={`Zoom in on ${image.label}`}
      >
        <img
          src={image.pngUrl}
          alt={image.label}
          loading="lazy"
          className={`mx-auto block w-full object-contain ${large ? 'max-h-[60vh]' : 'max-h-[34vh]'}`}
        />
      </button>

      {zoomed && (
        <ImageLightbox image={image} onClose={() => setZoomed(false)} />
      )}
    </div>
  );
}

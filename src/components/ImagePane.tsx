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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-3">
          {label && <span className="label">{label}</span>}
          <ConditionSelector value={condition} onChange={onChange} />
        </div>
        <div className="flex items-center gap-3">
          <span className="code">{image.posterPanel}</span>
          <DownloadButton image={image} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group block overflow-hidden rounded-lg bg-zinc-950 ring-zinc-900 transition focus:outline-none focus:ring-2"
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

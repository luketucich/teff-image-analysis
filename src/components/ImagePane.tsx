import { useState } from 'react';
import { findImage } from '../data/manifest';
import { ImagePicker, type Condition } from './ImagePicker';
import { DownloadButton } from './DownloadButton';
import { ImageLightbox } from './ImageLightbox';

interface Props {
  condition: Condition;
  onChange: (next: Condition) => void;
  /** Optional small label shown on the chip (e.g. "Pane 1") */
  label?: string;
  /** Hero size for Single mode */
  large?: boolean;
}

export function ImagePane({ condition, onChange, label, large }: Props) {
  const image = findImage(condition.tissue, condition.diet, condition.treatment);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ImagePicker value={condition} onChange={onChange} label={label} />
        <DownloadButton image={image} />
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

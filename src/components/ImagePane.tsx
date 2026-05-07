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
        aria-label={`Zoom in on ${image.label}`}
        className="group mx-auto block w-full cursor-zoom-in overflow-hidden rounded-lg bg-zinc-950 ring-0 ring-zinc-300 transition hover:ring-2 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:ring-zinc-700 dark:focus:ring-zinc-100"
        style={{
          aspectRatio: '1920 / 1200',
          maxWidth: large ? 'min(100%, calc(60vh * 1.6))' : '100%',
        }}
      >
        <img
          src={image.pngUrl}
          alt={image.label}
          loading="lazy"
          draggable={false}
          className="block h-full w-full object-cover"
        />
      </button>

      {zoomed && (
        <ImageLightbox image={image} onClose={() => setZoomed(false)} />
      )}
    </div>
  );
}

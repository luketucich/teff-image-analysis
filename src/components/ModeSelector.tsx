export type Mode = 'single' | 'side-by-side' | 'quad' | 'crossfade';

const OPTIONS: { value: Mode; label: string; description: string }[] = [
  { value: 'single', label: 'Single', description: 'One image, large.' },
  { value: 'side-by-side', label: 'Side-by-Side', description: 'Two images, easy compare.' },
  { value: 'quad', label: 'Quad', description: 'Four images, 2×2 grid.' },
  { value: 'crossfade', label: 'Crossfade', description: 'Drag a slider between two images.' },
];

interface Props {
  value: Mode;
  onChange: (next: Mode) => void;
}

export function ModeSelector({ value, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white p-1 shadow-sm">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.description}
            aria-pressed={active}
            className={
              'rounded-md px-3 py-1.5 text-sm font-medium transition ' +
              (active
                ? 'bg-(--color-poster-blue) text-white shadow'
                : 'text-slate-700 hover:bg-slate-100')
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

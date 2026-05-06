export type Mode = 'single' | 'side-by-side' | 'quad' | 'crossfade';

const OPTIONS: { value: Mode; label: string; hint: string }[] = [
  { value: 'single', label: 'Single', hint: 'One image, large.' },
  { value: 'side-by-side', label: 'Side-by-Side', hint: 'Two images, easy compare.' },
  { value: 'quad', label: 'Quad', hint: '2 × 2 grid.' },
  { value: 'crossfade', label: 'Crossfade', hint: 'Drag a slider between two images.' },
];

interface Props {
  value: Mode;
  onChange: (next: Mode) => void;
}

export function ModeSelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-6 text-sm">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.hint}
            aria-pressed={active}
            className={
              'relative pb-2 transition focus:outline-none ' +
              (active
                ? 'font-medium text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-900')
            }
          >
            {opt.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-px bg-zinc-900" />
            )}
          </button>
        );
      })}
    </div>
  );
}

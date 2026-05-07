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
    <div className="flex flex-wrap items-center gap-2">
      <span className="label mr-1">Display</span>
      <div className="inline-flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
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
                'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 ' +
                (active
                  ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100')
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import type { Condition } from './ConditionSelector';
import type { Mode } from './ModeSelector';

export interface Preset {
  id: string;
  label: string;
  description: string;
  mode: Mode;
  conditions: Condition[];
}

export const PRESETS: Preset[] = [
  {
    id: 'liver-hf-control-vs-brown',
    label: 'Liver: HF Control vs Brown Teff',
    description: 'Crossfade — does brown teff prevent steatosis on a high-fat diet?',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
    ],
  },
  {
    id: 'liver-hf-brown-vs-ivory',
    label: 'Liver: Brown vs Ivory Teff (HF)',
    description: 'Crossfade — does the teff variety matter on a high-fat diet?',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'ivory-teff' },
    ],
  },
  {
    id: 'liver-hf-row',
    label: 'Liver: 4-condition overview',
    description: 'Quad — LF Control as baseline + the three HF treatments.',
    mode: 'quad',
    conditions: [
      { tissue: 'liver', diet: 'low-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'ivory-teff' },
    ],
  },
  {
    id: 'kidney-hf-row',
    label: 'Kidney: 4-condition overview',
    description: 'Quad — kidney equivalent of the liver overview.',
    mode: 'quad',
    conditions: [
      { tissue: 'kidney', diet: 'low-fat', treatment: 'control' },
      { tissue: 'kidney', diet: 'high-fat', treatment: 'control' },
      { tissue: 'kidney', diet: 'high-fat', treatment: 'brown-teff' },
      { tissue: 'kidney', diet: 'high-fat', treatment: 'ivory-teff' },
    ],
  },
  {
    id: 'liver-diet-effect',
    label: 'Liver: LF vs HF Control',
    description: 'Crossfade — what does the high-fat diet do on its own (no teff)?',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'low-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
    ],
  },
];

interface Props {
  activeId: string | null;
  onApply: (preset: Preset) => void;
}

export function PresetBar({ activeId, onApply }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label mr-1">Presets</span>
      {PRESETS.map((preset) => {
        const active = preset.id === activeId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            title={preset.description}
            className={
              'rounded-full border px-3 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 ' +
              (active
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800')
            }
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

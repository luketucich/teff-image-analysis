import type { Condition } from './ConditionSelector';
import type { Mode } from './ModeSelector';

export interface Preset {
  id: string;
  label: string;
  description: string;
  mode: Mode;
  conditions: Condition[]; // Length must match the mode's pane count or 2 for crossfade
}

export const PRESETS: Preset[] = [
  {
    id: 'liver-hf-control-vs-brown',
    label: 'Brown teff rescue',
    description: 'Liver, HF Control vs HF Brown Teff — slide to see steatosis vanish.',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
    ],
  },
  {
    id: 'liver-hf-brown-vs-ivory',
    label: 'Brown vs Ivory',
    description: 'Liver, HF — compare the two teff varieties.',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'ivory-teff' },
    ],
  },
  {
    id: 'liver-hf-row',
    label: 'Liver overview',
    description: 'Quad: LF Control reference + all three HF treatments.',
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
    label: 'Kidney overview',
    description: 'Quad: LF Control reference + all three HF treatments (kidney).',
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
    label: 'Diet alone',
    description: 'Liver, LF vs HF Control — what high fat does by itself.',
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
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="tag mr-1 text-slate-400">Presets</span>
      {PRESETS.map((preset) => {
        const active = preset.id === activeId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            title={preset.description}
            className={
              'rounded-full border px-2.5 py-1 text-xs font-medium transition ' +
              (active
                ? 'border-(--color-poster-blue) bg-(--color-poster-blue) text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-(--color-poster-accent) hover:text-(--color-poster-accent)')
            }
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

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
    label: 'Headline finding: Brown teff rescues HF liver',
    description: 'HF Control vs HF Brown Teff (liver). Slide to see steatosis vanish.',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
    ],
  },
  {
    id: 'liver-hf-brown-vs-ivory',
    label: 'Variety effect: Brown vs Ivory teff (liver, HF)',
    description: 'Compare the two teff varieties on high-fat diet.',
    mode: 'crossfade',
    conditions: [
      { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
      { tissue: 'liver', diet: 'high-fat', treatment: 'ivory-teff' },
    ],
  },
  {
    id: 'liver-hf-row',
    label: 'Liver · High-Fat row',
    description: 'All three treatments on HF diet (liver). Quad mode w/ LF Control reference.',
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
    label: 'Kidney · High-Fat row',
    description: 'All three treatments on HF diet (kidney). Differences are subtler.',
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
    label: 'Diet effect: LF vs HF Control (liver)',
    description: 'Shows what high-fat alone does without any teff.',
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
    <div className="flex flex-col gap-2">
      <span className="tag text-slate-500">Quick comparisons</span>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const active = preset.id === activeId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApply(preset)}
              title={preset.description}
              className={
                'rounded-full border px-3 py-1.5 text-xs font-medium transition ' +
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
    </div>
  );
}

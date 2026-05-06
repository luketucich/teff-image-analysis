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
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
      <span className="label">Quick</span>
      {PRESETS.map((preset) => {
        const active = preset.id === activeId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            title={preset.description}
            className={
              'transition focus:outline-none ' +
              (active
                ? 'font-medium text-zinc-900 underline decoration-zinc-900 decoration-1 underline-offset-4'
                : 'text-zinc-500 hover:text-zinc-900')
            }
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

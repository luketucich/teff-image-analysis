import {
  DIETS,
  TISSUES,
  TREATMENTS,
  type Diet,
  type Tissue,
  type Treatment,
} from '../data/manifest';

export interface Condition {
  tissue: Tissue;
  diet: Diet;
  treatment: Treatment;
}

interface Props {
  value: Condition;
  onChange: (next: Condition) => void;
  /** Optional label shown above the selector (e.g. "Image A") */
  label?: string;
}

export function ConditionSelector({ value, onChange, label }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="tag text-slate-500">{label}</span>
      )}
      <div className="grid grid-cols-3 gap-2">
        <Select
          aria-label="Tissue"
          value={value.tissue}
          options={TISSUES}
          onChange={(tissue) => onChange({ ...value, tissue: tissue as Tissue })}
        />
        <Select
          aria-label="Diet"
          value={value.diet}
          options={DIETS}
          onChange={(diet) => onChange({ ...value, diet: diet as Diet })}
        />
        <Select
          aria-label="Treatment"
          value={value.treatment}
          options={TREATMENTS}
          onChange={(treatment) =>
            onChange({ ...value, treatment: treatment as Treatment })
          }
        />
      </div>
    </div>
  );
}

interface SelectProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => void;
  'aria-label': string;
}

function Select<T extends string>({
  value,
  options,
  onChange,
  'aria-label': ariaLabel,
}: SelectProps<T>) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 shadow-sm transition focus:border-(--color-poster-accent) focus:outline-none focus:ring-2 focus:ring-(--color-poster-accent)/30"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

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
}

export function ConditionSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Field label="Tissue">
        <Select
          aria-label="Tissue"
          value={value.tissue}
          options={TISSUES}
          onChange={(tissue) => onChange({ ...value, tissue: tissue as Tissue })}
        />
      </Field>
      <Field label="Diet">
        <Select
          aria-label="Diet"
          value={value.diet}
          options={DIETS}
          onChange={(diet) => onChange({ ...value, diet: diet as Diet })}
        />
      </Field>
      <Field label="Treatment">
        <Select
          aria-label="Treatment"
          value={value.treatment}
          options={TREATMENTS}
          onChange={(treatment) =>
            onChange({ ...value, treatment: treatment as Treatment })
          }
        />
      </Field>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="label">{label}</span>
      {children}
    </label>
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
    <span className="relative inline-flex items-center">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bare cursor-pointer rounded-md border border-zinc-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-700"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 text-zinc-500 dark:text-zinc-400"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}

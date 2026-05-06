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
  /** Optional alignment for compact contexts */
  align?: 'left' | 'right';
}

export function ConditionSelector({ value, onChange, align = 'left' }: Props) {
  return (
    <div
      className={
        'flex flex-wrap items-center gap-1 ' +
        (align === 'right' ? 'justify-end' : 'justify-start')
      }
    >
      <Select
        aria-label="Tissue"
        value={value.tissue}
        options={TISSUES}
        onChange={(tissue) => onChange({ ...value, tissue: tissue as Tissue })}
      />
      <Divider />
      <Select
        aria-label="Diet"
        value={value.diet}
        options={DIETS}
        onChange={(diet) => onChange({ ...value, diet: diet as Diet })}
      />
      <Divider />
      <Select
        aria-label="Treatment"
        value={value.treatment}
        options={TREATMENTS}
        onChange={(treatment) =>
          onChange({ ...value, treatment: treatment as Treatment })
        }
      />
    </div>
  );
}

function Divider() {
  return <span className="select-none text-zinc-300">·</span>;
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
        className="bare cursor-pointer rounded-md py-1 pl-2 pr-6 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-1.5 text-zinc-400"
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

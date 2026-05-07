import { useEffect, useRef, useState } from 'react';
import {
  DIETS,
  TISSUES,
  TREATMENTS,
  findImage,
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
  /** Small label shown on the chip (e.g. "Pane 1", "A") */
  label?: string;
}

function chipText(c: Condition): string {
  const tissue = c.tissue === 'liver' ? 'Liver' : 'Kidney';
  const diet = c.diet === 'low-fat' ? 'LF' : 'HF';
  const treat =
    c.treatment === 'control'
      ? 'Control'
      : c.treatment === 'brown-teff'
        ? 'Brown Teff'
        : 'Ivory Teff';
  return `${tissue} · ${diet} · ${treat}`;
}

export function ImagePicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = findImage(value.tissue, value.diet, value.treatment);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-700"
      >
        {label && <span className="label mr-1 hidden sm:inline">{label}</span>}
        <span>{chipText(value)}</span>
        <span className="code text-zinc-400 dark:text-zinc-500">{current.posterPanel.replace('Fig ', '')}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-500 dark:text-zinc-400"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <Popover
          value={value}
          onSelect={(c) => {
            onChange(c);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface PopoverProps {
  value: Condition;
  onSelect: (c: Condition) => void;
}

function Popover({ value, onSelect }: PopoverProps) {
  return (
    <div
      role="dialog"
      className="absolute left-0 top-full z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
    >
      {TISSUES.map((t, ti) => (
        <div
          key={t.value}
          className={
            ti > 0
              ? 'mt-3 border-t border-zinc-100 pt-3 dark:border-zinc-800'
              : ''
          }
        >
          <div className="label mb-2">{t.label}</div>
          {DIETS.map((d) => (
            <Row
              key={d.value}
              tissue={t.value}
              diet={d.value}
              dietLabel={d.value === 'low-fat' ? 'Low-Fat' : 'High-Fat'}
              value={value}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface RowProps {
  tissue: Tissue;
  diet: Diet;
  dietLabel: string;
  value: Condition;
  onSelect: (c: Condition) => void;
}

function Row({ tissue, diet, dietLabel, value, onSelect }: RowProps) {
  return (
    <div className="mt-1.5 flex items-center gap-2 first:mt-0">
      <span className="w-16 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {dietLabel}
      </span>
      <div className="flex flex-1 gap-1">
        {TREATMENTS.map((tr) => {
          const cond: Condition = { tissue, diet, treatment: tr.value as Treatment };
          const active =
            cond.tissue === value.tissue &&
            cond.diet === value.diet &&
            cond.treatment === value.treatment;
          const short =
            tr.value === 'control'
              ? 'Control'
              : tr.value === 'brown-teff'
                ? 'Brown'
                : 'Ivory';
          return (
            <button
              key={tr.value}
              type="button"
              onClick={() => onSelect(cond)}
              className={
                'flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 ' +
                (active
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800')
              }
            >
              {short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

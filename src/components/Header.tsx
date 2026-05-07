import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <h1 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Teff Histology Analyzer
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function Header() {
  return (
    <header className="border-b border-zinc-100">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-4 px-6 py-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[15px] font-semibold tracking-tight">Teff Histology</span>
          <span className="hidden text-xs text-zinc-400 sm:inline">/</span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            Jernigan et al. · UNCG · 2 × 3 × 2 · H&amp;E · 20×
          </span>
        </div>
        <span className="code hidden sm:inline">100&nbsp;µm scale</span>
      </div>
    </header>
  );
}

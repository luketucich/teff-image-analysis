export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-4 py-3 md:px-6 md:py-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="tag text-slate-500">UNCG · Biology · Jernigan et al.</p>
          <p className="tag hidden text-slate-400 sm:block">H&amp;E · 20× · 100 µm</p>
        </div>
        <h1 className="text-base font-semibold tracking-tight text-(--color-poster-blue) md:text-lg">
          Effects of teff (<em>Eragrostis tef</em>) supplementation on liver and kidney histomorphology in C57BL/6 mice
        </h1>
      </div>
    </header>
  );
}

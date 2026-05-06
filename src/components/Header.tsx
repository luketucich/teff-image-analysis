export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag text-slate-500">UNCG · Department of Biology · Undergraduate Research</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-(--color-poster-blue) md:text-2xl">
              Effects of teff (<em>Eragrostis tef</em>) supplementation on liver and kidney histomorphology in C57BL/6 mice
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Bertha Jernigan · Cardenas Vasquez · Stone · Omar · Darfour-Oduro · Allred · <span className="italic">mentors:</span> Fordahl · Osena · Jia
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-stone-50 px-3 py-2 text-xs text-slate-600 md:max-w-xs">
            <p>
              <strong className="text-slate-800">H&amp;E · 20× · scale bar 100&nbsp;µm</strong> burned into each image.
              Pick a quick comparison below or build your own with the dropdowns.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

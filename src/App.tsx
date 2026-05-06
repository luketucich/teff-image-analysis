import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { ModeSelector, type Mode } from './components/ModeSelector';
import { ImagePane } from './components/ImagePane';
import { CrossfadeViewer } from './components/CrossfadeViewer';
import { PresetBar, PRESETS, type Preset } from './components/PresetBar';
import type { Condition } from './components/ConditionSelector';

const DEFAULTS: Condition[] = [
  { tissue: 'liver', diet: 'high-fat', treatment: 'control' },
  { tissue: 'liver', diet: 'high-fat', treatment: 'brown-teff' },
  { tissue: 'liver', diet: 'high-fat', treatment: 'ivory-teff' },
  { tissue: 'liver', diet: 'low-fat', treatment: 'control' },
];

function App() {
  const [mode, setMode] = useState<Mode>('crossfade');
  // Always keep four slots; modes consume 1, 2, 4, or 2 (crossfade) of them.
  const [conditions, setConditions] = useState<Condition[]>(DEFAULTS);
  const [activePresetId, setActivePresetId] = useState<string | null>(
    PRESETS[0]?.id ?? null,
  );

  const visibleCount = useMemo(() => {
    switch (mode) {
      case 'single':
        return 1;
      case 'side-by-side':
      case 'crossfade':
        return 2;
      case 'quad':
        return 4;
    }
  }, [mode]);

  const update = (i: number, next: Condition) => {
    setConditions((prev) => prev.map((c, idx) => (idx === i ? next : c)));
    setActivePresetId(null);
  };

  const applyPreset = (preset: Preset) => {
    setMode(preset.mode);
    setConditions((prev) => {
      const merged = [...prev];
      preset.conditions.forEach((c, i) => {
        merged[i] = c;
      });
      return merged;
    });
    setActivePresetId(preset.id);
  };

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-5 px-4 py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <ModeSelector value={mode} onChange={(m) => { setMode(m); setActivePresetId(null); }} />
          <PresetBar activeId={activePresetId} onApply={applyPreset} />
        </div>

        {mode === 'single' && (
          <div className="grid grid-cols-1">
            <ImagePane condition={conditions[0]} onChange={(c) => update(0, c)} large />
          </div>
        )}

        {mode === 'side-by-side' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {conditions.slice(0, visibleCount).map((c, i) => (
              <ImagePane key={i} condition={c} onChange={(next) => update(i, next)} label={`Pane ${i + 1}`} />
            ))}
          </div>
        )}

        {mode === 'quad' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {conditions.slice(0, visibleCount).map((c, i) => (
              <ImagePane key={i} condition={c} onChange={(next) => update(i, next)} label={`Pane ${i + 1}`} />
            ))}
          </div>
        )}

        {mode === 'crossfade' && (
          <CrossfadeViewer
            conditionA={conditions[0]}
            conditionB={conditions[1]}
            onChangeA={(c) => update(0, c)}
            onChangeB={(c) => update(1, c)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-4 text-center text-xs text-slate-500">
        <p>
          Static viewer for the UNCG teff histology study. Built for internal lab use — for analysis, download the original TIF and open in ImageJ.
        </p>
      </footer>
    </div>
  );
}

export default App;

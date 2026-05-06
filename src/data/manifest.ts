export type Tissue = 'liver' | 'kidney';
export type Diet = 'low-fat' | 'high-fat';
export type Treatment = 'control' | 'brown-teff' | 'ivory-teff';

export interface ImageEntry {
  id: string;
  tissue: Tissue;
  diet: Diet;
  treatment: Treatment;
  pngUrl: string;
  tifUrl: string;
  /** Short label used in tags + dropdowns: e.g. "Liver · High-Fat · Brown Teff" */
  label: string;
  /** Cross-reference back to the conference poster (Fig 1A–F = liver, Fig 2A–F = kidney) */
  posterPanel: string;
}

export const TISSUES: { value: Tissue; label: string }[] = [
  { value: 'liver', label: 'Liver' },
  { value: 'kidney', label: 'Kidney' },
];

export const DIETS: { value: Diet; label: string }[] = [
  { value: 'low-fat', label: 'Low-Fat (10%)' },
  { value: 'high-fat', label: 'High-Fat (60%)' },
];

export const TREATMENTS: { value: Treatment; label: string }[] = [
  { value: 'control', label: 'Control' },
  { value: 'brown-teff', label: 'Brown Teff' },
  { value: 'ivory-teff', label: 'Ivory Teff' },
];

const TISSUE_LABEL: Record<Tissue, string> = { liver: 'Liver', kidney: 'Kidney' };
const DIET_LABEL: Record<Diet, string> = { 'low-fat': 'Low-Fat', 'high-fat': 'High-Fat' };
const TREATMENT_LABEL: Record<Treatment, string> = {
  control: 'Control',
  'brown-teff': 'Brown Teff',
  'ivory-teff': 'Ivory Teff',
};

// Poster panel mapping. Fig 1 = liver A-F (LF Control, LF Brown, LF Ivory, HF Control, HF Brown, HF Ivory).
// Fig 2 = kidney with the same ordering.
const POSTER: Record<string, string> = {
  'liver-low-fat-control': 'Fig 1A',
  'liver-low-fat-brown-teff': 'Fig 1B',
  'liver-low-fat-ivory-teff': 'Fig 1C',
  'liver-high-fat-control': 'Fig 1D',
  'liver-high-fat-brown-teff': 'Fig 1E',
  'liver-high-fat-ivory-teff': 'Fig 1F',
  'kidney-low-fat-control': 'Fig 2A',
  'kidney-low-fat-brown-teff': 'Fig 2B',
  'kidney-low-fat-ivory-teff': 'Fig 2C',
  'kidney-high-fat-control': 'Fig 2D',
  'kidney-high-fat-brown-teff': 'Fig 2E',
  'kidney-high-fat-ivory-teff': 'Fig 2F',
};

function makeEntry(tissue: Tissue, diet: Diet, treatment: Treatment): ImageEntry {
  const id = `${tissue}-${diet}-${treatment}`;
  const base = `${import.meta.env.BASE_URL}images`;
  return {
    id,
    tissue,
    diet,
    treatment,
    pngUrl: `${base}/png/${id}.png`,
    tifUrl: `${base}/tif/${id}.tif`,
    label: `${TISSUE_LABEL[tissue]} · ${DIET_LABEL[diet]} · ${TREATMENT_LABEL[treatment]}`,
    posterPanel: POSTER[id] ?? '',
  };
}

export const MANIFEST: ImageEntry[] = TISSUES.flatMap((t) =>
  DIETS.flatMap((d) =>
    TREATMENTS.map((tr) => makeEntry(t.value, d.value, tr.value)),
  ),
);

export function findImage(
  tissue: Tissue,
  diet: Diet,
  treatment: Treatment,
): ImageEntry {
  const found = MANIFEST.find(
    (e) => e.tissue === tissue && e.diet === diet && e.treatment === treatment,
  );
  if (!found) throw new Error(`No image for ${tissue}/${diet}/${treatment}`);
  return found;
}

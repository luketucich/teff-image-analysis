import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'light';
  // The synchronous script in index.html has already set this class.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {
      /* no-op */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}

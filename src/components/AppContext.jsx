import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppCtx = createContext(null);

const read = (k, fallback) => {
  try { return localStorage.getItem(`nexora:${k}`) ?? fallback; } catch { return fallback; }
};
const write = (k, v) => {
  try { localStorage.setItem(`nexora:${k}`, v); } catch { /* storage unavailable */ }
};

export const ACCENTS = {
  Indigo: '#635bff', Blue: '#4389e8', Teal: '#1fa6a0', Green: '#16a36a', Amber: '#e8a23b', Rose: '#e0527a', Violet: '#9b5de5',
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => read('theme', 'light'));
  const [accent, setAccent] = useState(() => read('accent', 'Indigo'));
  const [density, setDensity] = useState(() => read('density', 'comfortable'));
  const [collapsed, setCollapsed] = useState(() => read('collapsed', 'false') === 'true');
  const [reduceMotion, setReduceMotion] = useState(() => read('motion', 'false') === 'true');
  const [shortcutHints, setShortcutHints] = useState(true);
  const [overlay, setOverlay] = useState(null); // 'command' | 'create' | null
  const [unread, setUnread] = useState(3);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.dataset.theme = dark ? 'dark' : 'light';
    };
    apply();
    write('theme', theme);
    if (theme !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (accent === 'Indigo') {
      root.style.removeProperty('--accent-default');
      root.style.removeProperty('--accent-hover');
      root.style.removeProperty('--accent-text');
      root.style.removeProperty('--chart-1');
    } else {
      const c = ACCENTS[accent];
      root.style.setProperty('--accent-default', c);
      root.style.setProperty('--accent-hover', `color-mix(in srgb, ${c} 85%, black)`);
      root.style.setProperty('--accent-text', `color-mix(in srgb, ${c} 80%, var(--text-primary))`);
      root.style.setProperty('--chart-1', c);
    }
    write('accent', accent);
  }, [accent]);

  useEffect(() => { document.documentElement.dataset.density = density; write('density', density); }, [density]);
  useEffect(() => { write('collapsed', String(collapsed)); }, [collapsed]);
  useEffect(() => { document.documentElement.dataset.motion = reduceMotion ? 'reduced' : ''; write('motion', String(reduceMotion)); }, [reduceMotion]);

  // Global shortcuts: ⌘K / Ctrl+K command palette, [ toggles sidebar, C opens quick create
  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOverlay((o) => (o === 'command' ? null : 'command')); return; }
      if (typing) return;
      if (e.key === '[') setCollapsed((c) => !c);
      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) setOverlay('create');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(() => ({
    theme, setTheme, accent, setAccent, density, setDensity, collapsed, setCollapsed,
    reduceMotion, setReduceMotion, shortcutHints, setShortcutHints, overlay, setOverlay, unread, setUnread,
  }), [theme, accent, density, collapsed, reduceMotion, shortcutHints, overlay, unread]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppCtx);

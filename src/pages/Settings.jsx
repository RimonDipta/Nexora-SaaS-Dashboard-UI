import { useState } from 'react';
import { User, Sun, Bell, Settings as Cog, Shield, Plug, CreditCard, Check } from '../icons';
import { useApp, ACCENTS } from '../components/AppContext';

const NAV = [
  ['Account', [['Profile & security', User], ['Preferences', Sun], ['Notifications', Bell]]],
  ['Workspace', [['General', Cog], ['Members & roles', Shield], ['Integrations', Plug], ['Billing', CreditCard]]],
];

const LIGHT = { bg: '#f7f8fc', side: '#ffffff', card: '#ffffff', line: '#e6e8ef', bar: '#d5d8e2', ink: '#171923' };
const DARK = { bg: '#0b0d14', side: '#12141f', card: '#12141f', line: '#272a3c', bar: '#343850', ink: '#ecedf3' };

function MiniApp({ t }) {
  return (
    <svg width="100%" viewBox="0 0 240 140" preserveAspectRatio="xMinYMin slice" style={{ display: 'block' }} aria-hidden>
      <rect width="240" height="140" fill={t.bg} />
      <rect width="48" height="140" fill={t.side} /><rect x="48" width="1" height="140" fill={t.line} />
      <rect x="12" y="20" width="22" height="5" rx="2" fill="#635bff" />
      {[34, 46, 58].map((y) => <rect key={y} x="12" y={y} width="22" height="4" rx="2" fill={t.bar} />)}
      <rect x="62" y="16" width="48" height="44" rx="4" fill={t.card} stroke={t.line} />
      <rect x="70" y="26" width="24" height="5" rx="2" fill={t.bar} /><rect x="70" y="38" width="18" height="10" rx="2" fill={t.ink} />
      <rect x="120" y="16" width="48" height="44" rx="4" fill={t.card} stroke={t.line} />
      <rect x="62" y="70" width="100" height="58" rx="4" fill={t.card} stroke={t.line} />
      {[22, 18, 28, 20, 34, 26, 38, 30].map((h, i) => <rect key={i} x={70 + i * 11} y={120 - h} width="6" height={h} rx="1" fill="#635bff" />)}
    </svg>
  );
}

function ThemePreview({ mode }) {
  if (mode === 'System') {
    return (
      <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
        <MiniApp t={LIGHT} />
        <div style={{ position: 'absolute', inset: 0, clipPath: 'inset(0 0 0 50%)' }}><MiniApp t={DARK} /></div>
      </div>
    );
  }
  return <div style={{ borderRadius: 8, overflow: 'hidden' }}><MiniApp t={mode === 'Dark' ? DARK : LIGHT} /></div>;
}

function Toggle({ on, onChange, label }) {
  return <button className={`toggle ${on ? 'on' : ''}`} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} />;
}

function Preferences() {
  const { theme, setTheme, accent, setAccent, density, setDensity, collapsed, setCollapsed, reduceMotion, setReduceMotion, shortcutHints, setShortcutHints } = useApp();
  const themes = [['Light', 'light', 'Default · bright surfaces'], ['Dark', 'dark', 'Low glare · navy surfaces'], ['System', 'system', 'Follows macOS / Windows']];
  return (
    <div className="col">
      <h1 className="h-page">Preferences</h1>
      <p className="t-secondary" style={{ marginTop: 4 }}>Personalise how Nexora looks and behaves on this device. Changes apply instantly.</p>

      <div className="col gap-6" style={{ marginTop: 28 }}>
        <h2 className="medium body-md" style={{ fontWeight: 600 }}>Theme</h2>
        <p className="t-secondary" style={{ maxWidth: 560 }}>Pick a theme or follow your operating system. Every screen is built on semantic tokens, so both themes are equally complete.</p>
        <div className="row gap-12" style={{ marginTop: 10, flexWrap: 'wrap' }}>
          {themes.map(([label, val, sub]) => (
            <button key={val} className={`theme-card ${theme === val ? 'on' : ''}`} style={{ width: 244 }} onClick={() => setTheme(val)} aria-pressed={theme === val}>
              <ThemePreview mode={label} />
              <span className="row gap-10" style={{ padding: '0 4px' }}>
                <span className={`radio ${theme === val ? 'on' : ''}`} />
                <span className="col"><span className="medium">{label}</span><span className="caption t-secondary">{sub}</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="set-row" style={{ marginTop: 28 }}>
        <div className="col gap-6"><h2 className="medium" style={{ fontWeight: 600 }}>Accent colour</h2><p className="t-secondary" style={{ maxWidth: 240 }}>Used for primary actions, focus rings and selection. Contrast is checked against both themes.</p></div>
        <div className="row gap-10" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {Object.entries(ACCENTS).map(([name, c]) => (
            <button key={name} className={`accent-dot ${accent === name ? 'on' : ''}`} style={{ background: c, '--c': c }} aria-label={name} aria-pressed={accent === name} onClick={() => setAccent(name)}>
              {accent === name && <Check size={14} strokeWidth={3} />}
            </button>
          ))}
          <span className="t-secondary" style={{ lineHeight: '28px', marginLeft: 4 }}>{accent}{accent === 'Indigo' ? ' (default)' : ''}</span>
        </div>
      </div>

      <div className="set-row">
        <div className="col gap-6"><h2 className="medium" style={{ fontWeight: 600 }}>Density</h2><p className="t-secondary" style={{ maxWidth: 220 }}>Compact fits ~30% more rows in tables and boards.</p></div>
        <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
          {[['comfortable', 'Comfortable', '44px rows · default'], ['compact', 'Compact', '36px rows · power users']].map(([v, l, s]) => (
            <button key={v} className="row gap-12 grow" onClick={() => setDensity(v)} aria-pressed={density === v}
              style={{ padding: '12px 14px', borderRadius: 10, border: density === v ? '1px solid var(--accent-default)' : '1px solid var(--border-default)', background: density === v ? 'var(--bg-selected)' : 'var(--bg-surface)', textAlign: 'left' }}>
              <span className={`radio ${density === v ? 'on' : ''}`} />
              <span className="col grow"><span className="medium">{l}</span><span className="caption t-secondary">{s}</span></span>
              <span className="col" style={{ gap: v === 'compact' ? 3 : 5 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 40, height: 3, borderRadius: 2, background: density === v ? 'var(--chart-2)' : 'var(--border-strong)' }} />)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="set-row">
        <div className="col gap-6"><h2 className="medium" style={{ fontWeight: 600 }}>Behaviour</h2><p className="t-secondary" style={{ maxWidth: 220 }}>Small details that change how the workspace feels.</p></div>
        <div className="col gap-16">
          {[
            ['Collapse sidebar by default', 'Start every session with the 68px icon rail. Toggle anytime with the [ key.', collapsed, setCollapsed],
            ['Reduce motion', 'Replace slide and scale transitions with fades.', reduceMotion, setReduceMotion],
            ['Show keyboard shortcut hints', 'Display shortcuts in menus and tooltips.', shortcutHints, setShortcutHints],
          ].map(([l, s, v, set]) => (
            <div key={l} className="row gap-16">
              <div className="col grow"><span className="medium">{l}</span><span className="caption t-secondary">{s}</span></div>
              <Toggle on={v} onChange={set} label={l} />
            </div>
          ))}
        </div>
      </div>

      <div className="set-row">
        <div className="col gap-6"><h2 className="medium" style={{ fontWeight: 600 }}>Language &amp; region</h2><p className="t-secondary" style={{ maxWidth: 220 }}>Dates, numbers and the first day of the week.</p></div>
        <div className="row gap-12" style={{ flexWrap: 'wrap' }}>
          {[['Language', ['English (US)', 'English (UK)', 'Español', 'Português']], ['Date format', ['Nov 16, 2026', '16 Nov 2026', '2026-11-16']], ['Week starts on', ['Monday', 'Sunday']]].map(([l, opts]) => (
            <label key={l} className="col gap-6 grow" style={{ minWidth: 150 }}>
              <span className="caption t-secondary">{l}</span>
              <select className="select">{opts.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const [s, setS] = useState({ mentions: [true, true, true], assigned: [true, true, false], comments: [true, false, false], reminders: [true, true, true], status: [true, false, false], digest: [false, true, false] });
  const rows = [['mentions', 'Mentions', 'Someone @mentions you'], ['assigned', 'Assignments', 'A task is assigned to you'], ['comments', 'Comments', 'Replies on tasks you follow'], ['reminders', 'Due-date reminders', '24h before and on the day'], ['status', 'Status changes', 'Tasks you created change status'], ['digest', 'Weekly digest', 'Monday summary of your projects']];
  return (
    <div className="col">
      <h1 className="h-page">Notifications</h1>
      <p className="t-secondary" style={{ marginTop: 4 }}>Choose what reaches you and where.</p>
      <div className="card" style={{ marginTop: 24 }}>
        <div className="row caption t-secondary medium" style={{ padding: '10px 20px', borderBottom: '1px solid var(--border-default)' }}>
          <span className="grow">Event</span>{['In-app', 'Email', 'Slack'].map((c) => <span key={c} style={{ width: 72, textAlign: 'center' }}>{c}</span>)}
        </div>
        {rows.map(([k, l, d]) => (
          <div key={k} className="row" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span className="col grow"><span className="medium">{l}</span><span className="caption t-secondary">{d}</span></span>
            {s[k].map((on, i) => <span key={i} style={{ width: 72, display: 'flex', justifyContent: 'center' }}><Toggle on={on} label={`${l} ${i}`} onChange={(v) => setS((x) => ({ ...x, [k]: x[k].map((y, j) => (j === i ? v : y)) }))} /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [section, setSection] = useState('Preferences');
  return (
    <main className="settings">
      <nav className="settings-nav col gap-2" aria-label="Settings">
        {NAV.map(([h, items]) => (
          <div key={h} className="col gap-2" style={{ marginBottom: 14 }}>
            <span className="overline" style={{ padding: '4px 8px 6px' }}>{h}</span>
            {items.map(([l, I]) => (
              <button key={l} className={`nav-item ${section === l ? 'active' : ''}`} onClick={() => setSection(l)} style={section === l ? { color: 'var(--accent-text)' } : undefined}>
                <I size={16} strokeWidth={1.75} style={section === l ? { color: 'var(--accent-text)' } : undefined} />{l}
              </button>
            ))}
          </div>
        ))}
      </nav>
      {section === 'Preferences' ? <Preferences /> : section === 'Notifications' ? <Notifications /> : (
        <div className="col gap-8"><h1 className="h-page">{section}</h1><p className="t-secondary">This section isn’t part of the demo. Try Preferences or Notifications.</p></div>
      )}
    </main>
  );
}

import { useState } from 'react';
import { ChevronDown, Download } from '../icons';
import { people, workloadRows, heatmap } from '../data/demo';
import { Avatar, PageHeader, Segmented, useToast } from '../components/ui';

const SCALE = 50; // hours on x-axis

function heatStyle(v) {
  if (v == null) return { background: 'var(--bg-subtle)', color: 'var(--text-muted)' };
  if (v >= 9) return { background: 'var(--status-danger)', color: '#fff', opacity: 0.88 };
  const mix = Math.round(((v - 2) / 6) * 70) + 20;
  return { background: `color-mix(in srgb, var(--accent-default) ${mix}%, var(--bg-surface))`, color: mix > 55 ? '#fff' : 'var(--text-primary)' };
}

export default function Workload() {
  const [range, setRange] = useState('4 weeks');
  const [values, setValues] = useState(true);
  const [toast, showToast] = useToast();
  const kpis = [
    ['Capacity utilisation', '86%', '+4 pts', 'Healthy: 70–90%'],
    ['Tasks assigned', '142', null, 'across 5 projects'],
    ['Completed', '96', null, 'of assigned tasks'],
    ['Over-allocated', '2 people', null, 'Daniel and Priya · over 40h this week', true],
  ];
  return (
    <main className="content">
      <PageHeader title="Team workload" subtitle="Capacity vs. assigned work · Nov 16 – Dec 11 · 8 people · 40h/week (Nora 32h)">
        <button className="btn btn-secondary" style={{ minWidth: 150, justifyContent: 'space-between' }}>All teams <ChevronDown size={14} /></button>
        <Segmented options={['This week', '4 weeks', 'Quarter']} value={range} onChange={setRange} size="lg" />
        <button className="btn btn-secondary" onClick={() => showToast('workload-nov-16.csv exported')}><Download size={16} /> Export</button>
      </PageHeader>

      <div className="card stat-grid" style={{ gap: 0 }}>
        {kpis.map(([l, v, d, f, danger], i) => (
          <div key={l} className="col gap-6" style={{ padding: 20, borderLeft: i ? '1px solid var(--border-default)' : 0 }}>
            <span className="caption t-secondary" style={{ color: 'var(--text-primary)' }}>{l}</span>
            <span className="row gap-10"><span className="figure-md" style={{ color: danger ? 'var(--status-danger-text)' : undefined }}>{v}</span>{d && <span className="caption medium t-success">{d}</span>}</span>
            <span className="caption t-secondary">{f}</span>
          </div>
        ))}
      </div>

      <section className="card card-pad col gap-16">
        <div className="row gap-12" style={{ flexWrap: 'wrap' }}>
          <div className="col gap-2 grow"><h2 className="h-section">Workload distribution</h2><p className="t-secondary">Hours assigned this week by status · capacity line at 40h</p></div>
          <div className="row gap-16 caption t-secondary">
            <span className="row gap-6"><span className="swatch" style={{ background: 'var(--status-success)' }} />Completed</span>
            <span className="row gap-6"><span className="swatch" style={{ background: 'var(--accent-default)' }} />In progress</span>
            <span className="row gap-6"><span className="swatch" style={{ background: 'var(--chart-2)' }} />To do</span>
          </div>
        </div>
        <div className="col gap-10" style={{ marginTop: 4 }}>
          {workloadRows.map((r) => {
            const total = (r.done || 0) + (r.prog || 0) + (r.todo || 0);
            const over = total > r.cap;
            return (
              <div key={r.who} className="row gap-16">
                <span className="row gap-8" style={{ width: 146, flexShrink: 0 }}><Avatar id={r.who} size={20} />{people[r.who].name}</span>
                <div className="wl-bar">
                  {r.ooo ? <span className="caption t-secondary" style={{ padding: '2px 16px' }}>{r.ooo}</span> : (
                    <>
                      <span style={{ width: `${(r.done / SCALE) * 100}%`, background: 'var(--status-success)' }} title={`Completed ${r.done}h`} />
                      <span style={{ width: `${(r.prog / SCALE) * 100}%`, background: 'var(--accent-default)' }} title={`In progress ${r.prog}h`} />
                      <span style={{ width: `${(r.todo / SCALE) * 100}%`, background: 'var(--chart-2)' }} title={`To do ${r.todo}h`} />
                    </>
                  )}
                  <span style={{ position: 'absolute', left: `${(r.cap / SCALE) * 100}%`, top: -2, bottom: -2, width: 2, background: 'var(--text-primary)', borderRadius: 1 }} />
                </div>
                <span className="caption row gap-8" style={{ width: 124, flexShrink: 0, whiteSpace: 'nowrap', color: over ? 'var(--status-danger-text)' : 'var(--text-secondary)' }}>
                  {r.ooo ? '—' : `${total}h / ${r.cap}h`}
                  {over && <span className="badge danger" style={{ height: 20, borderRadius: 4, padding: '0 5px' }}>+{total - r.cap}h</span>}
                </span>
              </div>
            );
          })}
          <div className="row gap-16">
            <span style={{ width: 146, flexShrink: 0 }} />
            <div style={{ position: 'relative', flex: 1, height: 16 }}>
              {[0, 10, 20, 30, 40, 50].map((h) => <span key={h} className="caption t-muted" style={{ position: 'absolute', left: `${(h / SCALE) * 100}%`, transform: h ? 'translateX(-50%)' : 'none' }}>{h}h</span>)}
            </div>
            <span style={{ width: 124, flexShrink: 0 }} />
          </div>
        </div>
      </section>

      <section className="card card-pad col gap-16">
        <div className="row">
          <div className="col gap-2 grow"><h2 className="h-section">Workload heatmap</h2><p className="t-secondary">Scheduled hours per person per weekday · next 2 weeks</p></div>
          <label className="row gap-8 caption t-secondary" style={{ cursor: 'pointer' }}>
            <button className={`toggle ${values ? 'on' : ''}`} role="switch" aria-checked={values} onClick={() => setValues((v) => !v)} />Show values
          </label>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(5, minmax(56px, 1fr)) 28px repeat(5, minmax(56px, 1fr))', gap: '6px 8px', alignItems: 'center', minWidth: 860 }}>
            <span />
            {heatmap.weeks.map((w, wi) => (
              <span key={w.label} className="caption t-secondary" style={{ gridColumn: wi ? '8 / span 5' : '2 / span 5' }}>{w.label}</span>
            ))}
            <span />
            {heatmap.weeks.flatMap((w, wi) => [
              ...(wi ? [<span key="gap" />] : []),
              ...w.days.map((d) => <span key={d} className="caption" style={{ textAlign: 'center', color: d === 'M 16' ? 'var(--accent-text)' : 'var(--text-secondary)' }}>{d}</span>),
            ])}
            {heatmap.rows.map((r) => [
              <span key={r.who} className="row gap-8"><Avatar id={r.who} size={20} />{people[r.who].name}</span>,
              ...r.v.flatMap((v, i) => [
                ...(i === 5 ? [<span key={`${r.who}-gap`} />] : []),
                <span key={`${r.who}-${i}`} className="heat" style={heatStyle(v)} title={v == null ? 'Holiday' : `${v}h`}>{values ? (v ?? '—') : ''}</span>,
              ]),
            ])}
          </div>
        </div>
      </section>
      {toast}
    </main>
  );
}

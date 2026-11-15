import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Diamond, CircleCheck } from '../icons';
import { calendarEvents, calendarSpans, agendaToday, agendaUpcoming } from '../data/demo';
import { Segmented } from '../components/ui';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FILTERS = [['Banking', 'blue'], ['Website', 'indigo'], ['Q4 Campaign', 'amber'], ['Portal', 'green'], ['Design System', 'violet']];
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const isToday = (d) => d.getFullYear() === 2026 && d.getMonth() === 10 && d.getDate() === 16;
const COLOR_FILTER = { blue: 'Banking', indigo: 'Website', amber: 'Q4 Campaign', green: 'Portal', violet: 'Design System', rose: 'Q4 Campaign' };

function buildWeeks(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const last = new Date(year, month + 1, 0);
  const total = Math.ceil((offset + last.getDate()) / 7) * 7;
  return Array.from({ length: total / 7 }, (_, w) => Array.from({ length: 7 }, (__, d) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d)));
}

export default function Calendar() {
  const [ym, setYm] = useState([2026, 10]);
  const [hidden, setHidden] = useState({ 'Design System': true });
  const [view, setView] = useState('Month');
  const navigate = useNavigate();
  const weeks = useMemo(() => buildWeeks(ym[0], ym[1]), [ym]);
  const shift = (d) => setYm(([y, m]) => { const n = new Date(y, m + d, 1); return [n.getFullYear(), n.getMonth()]; });

  const visibleEvents = (d) => (calendarEvents[key(d)] || []).filter((e) => !hidden[COLOR_FILTER[e.color]]);

  return (
    <main className="content">
      <div className="row gap-12" style={{ flexWrap: 'wrap' }}>
        <h1 className="h-page" style={{ minWidth: 172 }}>{MONTHS[ym[1]]} {ym[0]}</h1>
        <button className="icon-btn bordered" aria-label="Previous month" onClick={() => shift(-1)}><ChevronLeft size={16} /></button>
        <button className="icon-btn bordered" aria-label="Next month" onClick={() => shift(1)}><ChevronRight size={16} /></button>
        <button className="btn btn-secondary btn-sm" style={{ height: 32 }} onClick={() => setYm([2026, 10])}>Today</button>
        <span className="spacer" />
        <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
          {FILTERS.map(([label, c]) => (
            <button key={label} className={`btn btn-secondary btn-sm c-${c}`} style={{ borderRadius: 999, color: hidden[label] ? 'var(--text-muted)' : undefined }} onClick={() => setHidden((h) => ({ ...h, [label]: !h[label] }))} aria-pressed={!hidden[label]}>
              <span className="swatch bg-c" style={{ opacity: hidden[label] ? 0.4 : 1 }} />{label}
            </button>
          ))}
        </div>
        <Segmented options={['Month', 'Week', 'Timeline']} value={view} onChange={(v) => (v === 'Timeline' ? navigate('/timeline') : setView(v))} size="lg" />
      </div>

      <div className="cal-layout">
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="cal-grid" style={{ borderBottom: '1px solid var(--border-default)' }}>
            {DAYS.map((d) => <div key={d} className="caption t-secondary medium" style={{ padding: '10px 10px' }}>{d}</div>)}
          </div>
          {(view === 'Week' ? weeks.filter((w) => w.some(isToday)) : weeks).map((w, wi) => {
            const span = calendarSpans.find((s) => w.some((d) => key(d) === s.start));
            const sIdx = span ? w.findIndex((d) => key(d) === span.start) : -1;
            const eIdx = span ? w.findIndex((d) => key(d) === span.end) : -1;
            return (
              <div key={wi} className="cal-grid" style={{ position: 'relative' }}>
                {w.map((d) => {
                  const out = d.getMonth() !== ym[1];
                  const evs = visibleEvents(d);
                  const shown = evs.slice(0, view === 'Week' ? 10 : 2);
                  return (
                    <div key={key(d)} className={`cal-cell ${out ? 'out' : ''}`} style={view === 'Week' ? { minHeight: 420 } : undefined}>
                      <span className="caption" style={{ height: 22, display: 'flex', alignItems: 'center', padding: '0 4px', color: out ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                        {isToday(d) ? <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--accent-default)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, marginLeft: -4 }}>{d.getDate()}</span>
                          : d.getDate() === 1 ? `${MONTHS[d.getMonth()].slice(0, 3)} 1` : d.getDate()}
                      </span>
                      {shown.map((e) => (
                        <button key={e.title} className={`cal-ev c-${e.color === 'neutral' ? 'neutral' : e.color} ${e.milestone ? 'ms' : ''} ${e.overdue ? 'overdue' : ''} ${e.muted ? 'muted' : ''}`} title={e.title}>
                          {e.milestone && <Diamond size={12} className="fg-c" style={{ flexShrink: 0 }} />}
                          <span>{e.title}</span>
                        </button>
                      ))}
                      {evs.length > shown.length && <span className="caption t-secondary" style={{ padding: '2px 6px' }}>+{evs.length - shown.length} more</span>}
                    </div>
                  );
                })}
                {span && sIdx >= 0 && (
                  <div className={`cal-ev c-${span.color}`} style={{ position: 'absolute', left: `calc(${(sIdx / 7) * 100}% + 6px)`, width: `calc(${(((eIdx < 0 ? 6 : eIdx) - sIdx + 1) / 7) * 100}% - 12px)`, top: 76, boxShadow: 'none' }}>
                    <CircleCheck size={13} className="fg-c" /><span>{span.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside className="card col" style={{ padding: 20 }}>
          <h2 className="h-section">Today · Mon, Nov 16</h2>
          <span className="t-secondary" style={{ marginBottom: 16 }}>2 events · 6 tasks due this week</span>
          <div className="col gap-16">
            {agendaToday.map((a) => (
              <div key={a.title} className={`agenda-item c-${a.color}`}>
                <span className="caption t-secondary">{a.time}</span><span className="medium">{a.title}</span><span className="caption t-secondary">{a.meta}</span>
              </div>
            ))}
          </div>
          <div className="divider" style={{ margin: '20px 0 16px' }} />
          <span className="overline" style={{ marginBottom: 12 }}>Coming up</span>
          <div className="col gap-16">
            {agendaUpcoming.map((a) => (
              <div key={a.title} className={`agenda-item c-${a.color}`}>
                <span className="row gap-6 caption t-secondary">{a.date}{a.milestone && <Diamond size={12} className="fg-c" />}</span>
                <span className="medium">{a.title}</span><span className="caption t-secondary">{a.meta}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

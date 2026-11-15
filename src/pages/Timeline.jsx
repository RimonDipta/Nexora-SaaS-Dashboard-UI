import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, Diamond, ArrowRight } from '../icons';
import { timelineRows } from '../data/demo';
import { Avatar, Segmented, StatusIcon } from '../components/ui';

// Axis: Oct 26, 2026 → Jan 24, 2027 (90 days). Today = Nov 16 = day 21.
const DAYS = 90;
const TODAY = 21;
const WEEKS = [['26', 0], ['2', 7], ['9', 14], ['16', 21], ['23', 28], ['30', 35], ['7', 42], ['14', 49], ['21', 56], ['28', 63], ['4', 70], ['11', 77], ['18', 84]];
const MONTHS = [['Nov 2026', 6], ['Dec 2026', 36], ['Jan 2027', 67]];
const pct = (d) => `${(d / DAYS) * 100}%`;
const healthColor = { 'At risk': 'var(--status-warning-text)', 'Off track': 'var(--status-danger-text)', 'On track': 'var(--text-secondary)' };

function Bar({ r }) {
  if (r.type === 'milestone') {
    return (
      <div style={{ position: 'absolute', left: pct(r.at), top: 10, display: 'flex', alignItems: 'center', gap: 6, transform: r.labelLeft ? 'translateX(-100%)' : 'translateX(-7px)', flexDirection: r.labelLeft ? 'row-reverse' : 'row' }}>
        <span className={`c-${r.color}`} style={{ width: 12, height: 12, transform: 'rotate(45deg)', background: 'var(--c)', borderRadius: 2, flexShrink: 0, marginTop: -6 }} />
        <span className="caption medium" style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{r.name}</span>
      </div>
    );
  }
  const isProj = r.type === 'project';
  const h = isProj ? 10 : 22;
  return (
    <>
      <div className={`c-${r.color}`} style={{ position: 'absolute', left: pct(r.start), width: pct(r.end - r.start), top: (40 - h) / 2, height: h, borderRadius: isProj ? 3 : 4, background: 'color-mix(in srgb, var(--c) 22%, var(--bg-surface))', overflow: 'hidden' }}>
        {r.progressEnd != null && <div style={{ width: `${((r.progressEnd - r.start) / (r.end - r.start)) * 100}%`, height: '100%', background: 'var(--c)' }} />}
        {r.inside && r.label && <span className="caption medium" style={{ position: 'absolute', left: 8, top: 3, color: '#fff', whiteSpace: 'nowrap', mixBlendMode: 'normal' }}>{r.label}</span>}
        {r.inside && !r.label && <span className="caption medium" style={{ position: 'absolute', left: 8, top: 3, whiteSpace: 'nowrap' }}>{r.name}</span>}
        {isProj && r.healthInside && <span className="caption medium" style={{ position: 'absolute', right: 10, top: -3, color: healthColor[r.health] }}>{r.health}</span>}
      </div>
      {isProj && !r.healthInside && <span className="caption" style={{ position: 'absolute', left: `calc(${pct(r.end)} + 8px)`, top: 12, color: healthColor[r.health], whiteSpace: 'nowrap' }}>{r.health}</span>}
      {!isProj && r.label && !r.inside && <span className="caption medium" style={{ position: 'absolute', left: `calc(${pct(r.end)} + 8px)`, top: 12, whiteSpace: 'nowrap' }}>{r.label}</span>}
    </>
  );
}

export default function Timeline() {
  const navigate = useNavigate();
  const [closed, setClosed] = useState({});
  const rows = timelineRows.filter((r, i) => {
    if (r.type === 'project') return true;
    const parent = timelineRows.slice(0, i).reverse().find((x) => x.type === 'project');
    return !closed[parent?.name];
  });

  return (
    <main className="content">
      <div className="row gap-12">
        <h1 className="h-page">Timeline</h1>
        <button className="icon-btn bordered" aria-label="Earlier"><ChevronLeft size={16} /></button>
        <button className="icon-btn bordered" aria-label="Later"><ChevronRight size={16} /></button>
        <button className="btn btn-secondary btn-sm" style={{ height: 32 }}>Today</button>
        <span className="spacer" />
        <Segmented options={['Month', 'Week', 'Timeline']} value="Timeline" onChange={(v) => v !== 'Timeline' && navigate('/calendar')} size="lg" />
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <div className="gantt" style={{ minWidth: 1000 }}>
          <div className="row caption t-secondary" style={{ height: 56, padding: '0 16px', borderBottom: '1px solid var(--border-default)', borderRight: '1px solid var(--border-default)' }}>Projects &amp; milestones</div>
          <div style={{ position: 'relative', height: 56, borderBottom: '1px solid var(--border-default)' }}>
            {MONTHS.map(([m, d]) => <span key={m} className="caption medium" style={{ position: 'absolute', left: `calc(${pct(d)} + 8px)`, top: 8 }}>{m}</span>)}
            {[6, 36, 67].map((d) => <span key={d} style={{ position: 'absolute', left: pct(d), top: 0, bottom: 0, width: 1, background: 'var(--border-default)' }} />)}
            {WEEKS.map(([l, d]) => <span key={d} className="caption t-muted" style={{ position: 'absolute', left: `calc(${pct(d)} + 6px)`, top: 32 }}>{l}</span>)}
            <span className="caption medium" style={{ position: 'absolute', left: pct(TODAY), top: 8, transform: 'translateX(-50%)', background: 'var(--accent-default)', color: '#fff', padding: '1px 6px', borderRadius: 4, zIndex: 2 }}>Today</span>
          </div>

          {rows.map((r, i) => {
            const isProj = r.type === 'project';
            return (
              <Fragment key={i}>
                <div className={`gantt-row ${isProj ? 'proj' : ''}`} style={{ padding: isProj ? '0 16px 0 12px' : '0 16px 0 44px', gap: 10, borderRight: '1px solid var(--border-default)' }}>
                  {isProj && (
                    <button className="icon-btn sq-sm" style={{ width: 20, height: 20 }} aria-label="Toggle" onClick={() => setClosed((c) => ({ ...c, [r.name]: !c[r.name] }))}>
                      <ChevronDown size={14} style={{ transform: closed[r.name] ? 'rotate(-90deg)' : 'none', transition: 'transform .15s' }} />
                    </button>
                  )}
                  {isProj ? <span className={`proj-sq bg-c c-${r.color}`} /> : r.type === 'milestone' ? <Diamond size={14} color="var(--project-blue)" /> : <StatusIcon status={r.state === 'progress' ? 'In Progress' : 'To Do'} />}
                  <span className={`grow truncate ${isProj ? 'medium' : ''}`}>{r.name}</span>
                  {isProj && <span className="caption t-secondary">{r.pct}%</span>}
                  {r.who && <Avatar id={r.who} size={20} />}
                  {r.type === 'milestone' && <span className="caption t-secondary">{r.date}</span>}
                </div>
                <div className={`gantt-row ${isProj ? 'proj' : ''}`} style={{ position: 'relative' }}>
                  {WEEKS.map(([, d]) => <span key={d} style={{ position: 'absolute', left: pct(d), top: 0, bottom: 0, width: 1, background: 'var(--border-subtle)' }} />)}
                  <Bar r={r} />
                  <span style={{ position: 'absolute', left: pct(TODAY), top: 0, bottom: 0, width: 2, marginLeft: -1, background: 'var(--accent-default)', zIndex: 1 }} />
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="row gap-24 caption t-secondary" style={{ flexWrap: 'wrap' }}>
        <span className="row gap-8"><span style={{ width: 20, height: 4, borderRadius: 2, background: 'var(--accent-default)' }} />Project span</span>
        <span className="row gap-8"><span style={{ width: 20, height: 10, borderRadius: 3, background: 'var(--accent-default)' }} />Task · filled part = progress</span>
        <span className="row gap-8"><span style={{ width: 9, height: 9, transform: 'rotate(45deg)', background: 'var(--text-secondary)' }} />Milestone</span>
        <span className="row gap-8"><ArrowRight size={14} />Dependency</span>
      </div>
    </main>
  );
}

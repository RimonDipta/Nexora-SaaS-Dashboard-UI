import { useEffect, useState } from 'react';
import {
  ChevronDown, ChevronRight, ChevronUp, Plus, Link2, ExternalLink, MoreHorizontal, X, CircleDot, User, Flag, Calendar,
  Star, Diamond, Clock, Image, FileText, Paperclip, Smile, SendHorizontal, MessageSquare, Check,
} from '../icons';
import { people, STATUSES, statusCounts, subtasks, comments, labelColors, projectByName } from '../data/demo';
import { Avatar, Checkbox, Priority, PriorityIcon, ProjectTag, StatusIcon, StatusPill, Popover, Tabs } from './ui';

export function LabelChip({ label }) {
  return <span className="label-chip"><span className={`legend-dot bg-c c-${labelColors[label] || 'neutral'}`} />{label}</span>;
}

function StatusMenu({ value, onPick, onClose, open }) {
  return (
    <Popover open={open} onClose={onClose} style={{ top: 30, left: 0, width: 180 }}>
      {STATUSES.map((s) => (
        <button key={s} className="menu-item" onClick={(e) => { e.stopPropagation(); onPick(s); onClose(); }}>
          <StatusIcon status={s} /> <span className="grow">{s}</span>{value === s && <Check size={14} color="var(--accent-text)" />}
        </button>
      ))}
    </Popover>
  );
}

/** Grouped-by-status task list, used on Tasks and Project › Tasks. */
export function TaskTable({ tasks, onOpen, selectedId, onStatusChange, sortAsc, onSort }) {
  const [collapsed, setCollapsed] = useState({ Backlog: true, Done: true });
  const [checked, setChecked] = useState({});
  const [menuFor, setMenuFor] = useState(null);
  const groups = STATUSES.map((s) => ({ status: s, items: tasks.filter((t) => t.status === s) }));
  const allChecked = tasks.length > 0 && tasks.every((t) => checked[t.id]);
  const nChecked = Object.values(checked).filter(Boolean).length;
  const dueKey = (d) => new Date(`${d} 2026`).getTime();

  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      {nChecked > 0 && (
        <div className="row gap-12" style={{ padding: '8px 12px', background: 'var(--bg-selected)', borderBottom: '1px solid var(--border-default)' }}>
          <span className="medium t-accent">{nChecked} selected</span>
          <button className="btn btn-secondary btn-xs">Change status</button>
          <button className="btn btn-secondary btn-xs">Assign</button>
          <button className="btn btn-ghost btn-xs" onClick={() => setChecked({})}>Clear</button>
        </div>
      )}
      <table className="task-table" style={{ minWidth: 980 }}>
        <colgroup>
          <col style={{ width: 44 }} /><col style={{ width: 84 }} /><col /><col style={{ width: 192 }} /><col style={{ width: 136 }} />
          <col style={{ width: 116 }} /><col style={{ width: 156 }} /><col style={{ width: 120 }} />
        </colgroup>
        <thead>
          <tr>
            <th style={{ paddingLeft: 12 }}><Checkbox checked={allChecked} label="Select all" onChange={(v) => setChecked(v ? Object.fromEntries(tasks.map((t) => [t.id, true])) : {})} /></th>
            <th>ID</th><th>Task</th><th>Project</th><th>Status</th><th>Priority</th><th>Assignee</th>
            <th><button className="row gap-4" onClick={onSort}>Due date {sortAsc !== false ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button></th>
          </tr>
        </thead>
        <tbody>
          {groups.map(({ status, items }) => {
            const isCol = collapsed[status];
            const sorted = sortAsc == null ? items : [...items].sort((a, b) => (sortAsc ? 1 : -1) * (dueKey(a.due) - dueKey(b.due)));
            const count = statusCounts[status] ?? items.length;
            return [
              <tr key={status} className="group-row">
                <td colSpan={8} style={{ padding: '0 12px' }}>
                  <div className="row gap-10">
                    <button className="icon-btn sq-sm" style={{ width: 20, height: 20 }} aria-label={isCol ? 'Expand' : 'Collapse'} onClick={() => setCollapsed((c) => ({ ...c, [status]: !c[status] }))}>
                      {isCol ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <StatusIcon status={status} />
                    <span className="medium body-md" style={{ fontSize: 13 }}>{status}</span>
                    <span className="t-secondary">{Math.max(count, items.length)}</span>
                    <span className="spacer" />
                    <button className="icon-btn sq-sm add" aria-label={`Add task to ${status}`}><Plus size={16} /></button>
                  </div>
                </td>
              </tr>,
              ...(isCol ? [] : sorted.map((t) => (
                <tr key={t.id} className={`trow ${selectedId === t.id ? 'sel' : ''}`} onClick={() => onOpen?.(t)}>
                  <td style={{ paddingLeft: 12 }}><Checkbox checked={!!checked[t.id]} label={`Select ${t.id}`} onChange={(v) => setChecked((c) => ({ ...c, [t.id]: v }))} /></td>
                  <td className="mono t-secondary">{t.id}</td>
                  <td className="medium" title={t.title}>{t.title}</td>
                  <td><ProjectTag name={t.project} /></td>
                  <td style={{ position: 'relative', overflow: 'visible' }}>
                    <StatusPill status={t.status} onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === t.id ? null : t.id); }} />
                    <StatusMenu open={menuFor === t.id} value={t.status} onClose={() => setMenuFor(null)} onPick={(s) => onStatusChange?.(t.id, s)} />
                  </td>
                  <td><Priority level={t.priority} /></td>
                  <td>{t.assignee ? <span className="row gap-8"><Avatar id={t.assignee} size={20} /><span className="truncate">{people[t.assignee].name}</span></span> : <span className="t-muted">Unassigned</span>}</td>
                  <td style={{ color: t.overdue ? 'var(--status-danger-text)' : 'var(--text-secondary)' }}>{t.due}</td>
                </tr>
              ))),
              ...(!isCol && status === 'In Review' ? [
                <tr key={`${status}-add`}><td colSpan={8} style={{ paddingLeft: 16 }}><button className="row gap-8 t-secondary"><Plus size={16} /> Add task to {status}</button></td></tr>,
              ] : []),
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}

function Field({ icon: Icon, label, children, hl }) {
  return (
    <div className="row" style={{ minHeight: 38, padding: '0 8px', borderRadius: 8, background: hl ? 'var(--bg-subtle)' : undefined }}>
      <span className="row gap-8 t-secondary" style={{ width: 140, flexShrink: 0 }}><Icon size={16} strokeWidth={1.75} />{label}</span>
      <div className="row gap-8 grow">{children}</div>
    </div>
  );
}

export function TaskDrawer({ task, onClose, onPrev, onNext, onStatusChange }) {
  const [subs, setSubs] = useState(subtasks);
  const [tab, setTab] = useState('Comments');
  const [statusOpen, setStatusOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState(comments);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!task) return null;
  const done = subs.filter((s) => s.done).length;
  const p = projectByName[task.project];
  const send = () => { if (!draft.trim()) return; setThread((t) => [...t, { who: 'AM', time: 'just now', text: draft }]); setDraft(''); };

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={task.title}>
        <div className="row gap-4" style={{ height: 56, padding: '0 16px 0 24px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <span className="row gap-6 grow t-secondary">
            <span className={`proj-sq bg-c c-${p?.color}`} />{task.project}<ChevronRight size={14} /><span className="mono">{task.id}</span>
          </span>
          <button className="icon-btn" aria-label="Previous task" onClick={onPrev}><ChevronUp size={16} /></button>
          <button className="icon-btn" aria-label="Next task" onClick={onNext}><ChevronDown size={16} /></button>
          <button className="icon-btn" aria-label="Copy link"><Link2 size={16} /></button>
          <button className="icon-btn" aria-label="Open full page"><ExternalLink size={16} /></button>
          <button className="icon-btn" aria-label="More"><MoreHorizontal size={16} /></button>
          <button className="icon-btn" aria-label="Close" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '24px 24px 16px' }}>
          <h2 style={{ fontSize: 22, lineHeight: '30px', fontWeight: 600, letterSpacing: -0.5, marginBottom: 20 }}>{task.title}</h2>
          <div className="col gap-2">
            <Field icon={CircleDot} label="Status" hl>
              <span style={{ position: 'relative' }} className="grow row">
                <button className="row grow" onClick={() => setStatusOpen((o) => !o)}>
                  <StatusPill status={task.status} /><span className="spacer" /><ChevronDown size={16} color="var(--text-secondary)" />
                </button>
                <StatusMenu open={statusOpen} value={task.status} onClose={() => setStatusOpen(false)} onPick={(s) => onStatusChange?.(task.id, s)} />
              </span>
            </Field>
            <Field icon={User} label="Assignee">{task.assignee ? <><Avatar id={task.assignee} size={20} />{people[task.assignee].name}</> : <span className="t-muted">Unassigned</span>}</Field>
            <Field icon={Flag} label="Priority"><Priority level={task.priority} /></Field>
            <Field icon={Calendar} label="Due date">Wed, {task.due} <span className="t-muted">· in 2 days</span></Field>
            <Field icon={Star} label="Labels">{(task.labels || []).map((l) => <LabelChip key={l} label={l} />)}<button className="icon-btn sq-sm" aria-label="Add label" style={{ width: 22, height: 22 }}><Plus size={14} /></button></Field>
            <Field icon={Diamond} label="Milestone">Biometric onboarding</Field>
            <Field icon={Clock} label="Estimate">5 points · 9h 30m logged</Field>
          </div>

          <div className="divider" style={{ margin: '20px 0' }} />
          <h3 className="medium body-md" style={{ fontWeight: 600, marginBottom: 8 }}>Description</h3>
          <p className="t-secondary">Build the 3-step checkout for mobile web: cart review, address + delivery slot, and payment with Apple Pay / Google Pay. Must reuse the new Input and Button components and pass the a11y checklist (focus order, 44px targets).</p>

          <div className="row gap-10" style={{ margin: '24px 0 8px' }}>
            <h3 className="body-md" style={{ fontWeight: 600 }}>Subtasks</h3>
            <span className="t-secondary">{done} / {subs.length}</span>
            <div className="progress success" style={{ flex: '0 0 80px', height: 4 }}><span style={{ width: `${(done / subs.length) * 100}%` }} /></div>
            <span className="spacer" />
            <button className="btn btn-ghost btn-sm"><Plus size={14} /> Add</button>
          </div>
          <div className="col">
            {subs.map((s, i) => (
              <div key={s.title} className="row gap-10" style={{ height: 38, padding: '0 8px' }}>
                <Checkbox checked={s.done} label={s.title} onChange={(v) => setSubs((x) => x.map((y, j) => (j === i ? { ...y, done: v } : y)))} />
                <span className="grow" style={{ color: s.done ? 'var(--text-secondary)' : undefined }}>{s.title}</span>
                <Avatar id={s.who} size={20} />
              </div>
            ))}
          </div>

          <div className="row gap-12" style={{ margin: '16px 0 24px', flexWrap: 'wrap' }}>
            {[[Image, 'checkout-flow-v3.fig', '4.1 MB', 'var(--accent-default)'], [FileText, 'payment-edge-cases.pdf', '820 KB', 'var(--status-danger)']].map(([I, n, s, c]) => (
              <div key={n} className="card row gap-12" style={{ padding: '10px 14px', borderRadius: 8 }}>
                <I size={18} color={c} /><div className="col"><span className="medium caption" style={{ fontSize: 12.5 }}>{n}</span><span className="caption t-secondary">{s}</span></div>
              </div>
            ))}
          </div>

          <Tabs value={tab} onChange={setTab} tabs={[{ value: 'Comments', label: 'Comments', count: thread.length }, { value: 'Activity', label: 'Activity' }, { value: 'Time log', label: 'Time log' }]} />
          <div className="col gap-16" style={{ paddingTop: 16 }}>
            {tab === 'Comments' && thread.map((c, i) => (
              <div key={i} className="row gap-10" style={{ alignItems: 'flex-start' }}>
                <Avatar id={c.who} size={24} />
                <div className="col gap-2"><span><b className="medium">{people[c.who].name}</b> <span className="caption t-muted">{c.time}</span></span><span>{c.text}</span></div>
              </div>
            ))}
            {tab === 'Activity' && [['DK', 'moved this to In Progress', '34m ago'], ['AM', 'set priority to High', 'Yesterday'], ['AM', 'created this task', 'Nov 9']].map(([w, t, time]) => (
              <div key={t} className="row gap-10 t-secondary"><Avatar id={w} size={20} /><span><b className="medium" style={{ color: 'var(--text-primary)' }}>{people[w].name}</b> {t} · {time}</span></div>
            ))}
            {tab === 'Time log' && [['DK', 'Mon, Nov 16', '2h 30m'], ['DK', 'Fri, Nov 13', '4h'], ['MB', 'Thu, Nov 12', '3h']].map(([w, d, h]) => (
              <div key={d} className="row gap-10"><Avatar id={w} size={20} /><span className="grow">{people[w].name}</span><span className="t-secondary">{d}</span><b className="medium" style={{ width: 60, textAlign: 'right' }}>{h}</b></div>
            ))}
          </div>
        </div>

        <div className="row gap-12" style={{ padding: '12px 16px', borderTop: '1px solid var(--border-default)', flexShrink: 0 }}>
          <Avatar id="AM" size={24} />
          <label className="input grow" style={{ paddingRight: 6 }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Write a comment… type @ to mention" />
            <Paperclip size={16} /><Smile size={16} />
            <button type="button" className="icon-btn primary sq-sm" aria-label="Send comment" onClick={send}><SendHorizontal size={14} /></button>
          </label>
        </div>
      </aside>
    </>
  );
}

export function KanbanCard({ c, onDragStart, onDragEnd, dragging }) {
  return (
    <div className={`kcard ${dragging ? 'dragging' : ''}`} draggable onDragStart={(e) => onDragStart(e, c)} onDragEnd={onDragEnd}>
      <div className="row"><span className="mono t-secondary grow">{c.id}</span>{c.priority === 'None' ? <MoreHorizontal size={14} color="var(--text-muted)" /> : <PriorityIcon level={c.priority} />}</div>
      <span className="medium" style={{ lineHeight: '18px' }}>{c.title}</span>
      <div className="row gap-6" style={{ flexWrap: 'wrap' }}>{c.labels.map((l) => <LabelChip key={l} label={l} />)}</div>
      <div className="row gap-12 caption t-secondary">
        <span className="row gap-4"><Calendar size={13} />{c.due}</span>
        {c.comments > 0 && <span className="row gap-4"><MessageSquare size={13} />{c.comments}</span>}
        {c.files > 0 && <span className="row gap-4"><Paperclip size={13} />{c.files}</span>}
        <span className="spacer" />
        {c.who && <Avatar id={c.who} size={20} />}
      </div>
    </div>
  );
}

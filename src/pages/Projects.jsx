import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, Plus, Search, ListFilter, ArrowUpDown, LayoutGrid, List, X, MoreHorizontal, SquareCheck, Calendar, Check,
} from '../icons';
import { projects, people } from '../data/demo';
import {
  AvatarStack, HealthBadge, PageHeader, Progress, ProjectTile, Segmented, Tabs, Popover, useToast,
} from '../components/ui';

const tone = (p) => (p.health === 'At risk' ? 'warning' : p.health === 'Off track' ? 'danger' : '');
const DUE_ORDER = { 'Dec 5': 1, 'Dec 12': 2, 'Dec 19': 3, 'Jan 8': 4, 'Jan 20': 5, 'Feb 14': 6 };

function CardMenu({ onClose, open }) {
  return (
    <Popover open={open} onClose={onClose} style={{ right: 0, top: 30 }}>
      {['Open project', 'Edit details', 'Copy link', 'Archive'].map((l) => (
        <button key={l} className="menu-item" onClick={(e) => { e.stopPropagation(); onClose(); }} style={l === 'Archive' ? { color: 'var(--status-danger-text)' } : undefined}>{l}</button>
      ))}
    </Popover>
  );
}

function ProjectCard({ p }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  return (
    <article className="card proj-card" onClick={() => navigate(`/projects/${p.id}`)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}>
      <div className="row gap-8">
        <ProjectTile project={p} size={36} />
        <span className="spacer" />
        <HealthBadge health={p.health} />
        <span style={{ position: 'relative' }}>
          <button className="icon-btn sq-sm" aria-label="Project actions" onClick={(e) => { e.stopPropagation(); setMenu((m) => !m); }}><MoreHorizontal size={16} /></button>
          <CardMenu open={menu} onClose={() => setMenu(false)} />
        </span>
      </div>
      <div className="col gap-6" style={{ marginTop: 6 }}>
        <h3 className="h-section">{p.name}</h3>
        <p className="t-secondary clamp-2" style={{ minHeight: 36 }}>{p.description}</p>
      </div>
      <div className="col gap-8">
        <div className="row t-secondary"><span className="grow">Progress</span><span className="medium" style={{ color: 'var(--text-primary)' }}>{p.progress}%</span></div>
        <Progress value={p.progress} tone={tone(p)} />
      </div>
      <div className="divider" style={{ marginTop: 4 }} />
      <div className="row gap-16">
        <AvatarStack ids={p.members} extra={p.extra} />
        <span className="spacer" />
        <span className="row gap-6 t-secondary"><SquareCheck size={14} />{p.tasksDone}/{p.tasksTotal}</span>
        <span className="row gap-6 t-secondary"><Calendar size={14} />{p.due}</span>
      </div>
    </article>
  );
}

function ProjectRows({ list }) {
  const navigate = useNavigate();
  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table className="table" style={{ minWidth: 820 }}>
        <thead><tr><th style={{ paddingLeft: 20 }}>Project</th><th>Status</th><th>Owner</th><th>Progress</th><th>Tasks</th><th>Team</th><th>Due</th></tr></thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/projects/${p.id}`)}>
              <td style={{ paddingLeft: 20 }}><div className="row gap-12"><ProjectTile project={p} size={32} /><div className="col"><span className="medium">{p.name}</span><span className="caption t-secondary">{p.team}</span></div></div></td>
              <td><HealthBadge health={p.health} /></td>
              <td className="t-secondary">{people[p.owner].name}</td>
              <td style={{ width: 160 }}><div className="row gap-10"><Progress value={p.progress} tone={tone(p)} /><span className="caption medium">{p.progress}%</span></div></td>
              <td className="t-secondary">{p.tasksDone}/{p.tasksTotal}</td>
              <td><AvatarStack ids={p.members} extra={p.extra} /></td>
              <td>{p.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Projects() {
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');
  const [view, setView] = useState('grid');
  const [dueFilter, setDueFilter] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState('Due date');
  const [toast, showToast] = useToast();

  const list = useMemo(() => {
    let l = projects;
    if (tab === 'Active') l = l.filter((p) => p.state === 'Active');
    if (tab === 'Planning') l = l.filter((p) => p.state === 'Planning');
    if (tab === 'Completed' || tab === 'Archived') l = [];
    if (q) l = l.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    const s = [...l];
    if (sort === 'Due date') s.sort((a, b) => DUE_ORDER[a.due] - DUE_ORDER[b.due]);
    if (sort === 'Progress') s.sort((a, b) => b.progress - a.progress);
    if (sort === 'Name') s.sort((a, b) => a.name.localeCompare(b.name));
    return sort === 'Due date' && !q && tab === 'All' ? l : s;
  }, [tab, q, sort]);

  return (
    <main className="content">
      <PageHeader title="Projects" subtitle="Every initiative across Nexora Studio — 12 active, 5 planning, 7 completed · 3 archived (hidden from All).">
        <button className="btn btn-secondary" onClick={() => showToast('Import from CSV, Jira or Asana — coming soon')}><Download size={16} /> Import</button>
        <button className="btn btn-primary"><Plus size={16} /> New project</button>
      </PageHeader>

      <div className="row gap-8" style={{ borderBottom: '1px solid var(--border-default)', flexWrap: 'wrap' }}>
        <Tabs
          className="grow"
          style={{ borderBottom: 0 }}
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'All', label: 'All', count: 24 }, { value: 'Active', label: 'Active', count: 12 }, { value: 'Planning', label: 'Planning', count: 5 },
            { value: 'Completed', label: 'Completed', count: 7 }, { value: 'Archived', label: 'Archived', count: 3 },
          ]}
        />
        <div className="row gap-8" style={{ paddingBottom: 6 }}>
          <label className="input" style={{ width: 220 }}><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter projects…" /></label>
          <span style={{ position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => setFilterOpen((o) => !o)}><ListFilter size={16} /> Filter {dueFilter && <span className="count accent">1</span>}</button>
            <Popover open={filterOpen} onClose={() => setFilterOpen(false)} style={{ top: 42, left: 0, width: 240 }}>
              <div className="overline" style={{ padding: '4px 8px' }}>Due date</div>
              <button className="menu-item" onClick={() => setDueFilter(!dueFilter)}>
                <span className="grow">Due in next 90 days</span>{dueFilter && <Check size={14} color="var(--accent-text)" />}
              </button>
              <div className="menu-sep" />
              <div className="overline" style={{ padding: '4px 8px' }}>Health</div>
              {['On track', 'At risk', 'Off track'].map((h) => <button key={h} className="menu-item"><HealthBadge health={h} /></button>)}
            </Popover>
          </span>
          <span style={{ position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => setSortOpen((o) => !o)}><ArrowUpDown size={16} /> {sort}</button>
            <Popover open={sortOpen} onClose={() => setSortOpen(false)} style={{ top: 42, right: 0, width: 180 }}>
              {['Due date', 'Progress', 'Name'].map((s) => (
                <button key={s} className="menu-item" onClick={() => { setSort(s); setSortOpen(false); }}><span className="grow">{s}</span>{sort === s && <Check size={14} color="var(--accent-text)" />}</button>
              ))}
            </Popover>
          </span>
          <Segmented value={view} onChange={setView} options={[{ value: 'grid', label: '', icon: LayoutGrid }, { value: 'list', label: '', icon: List }]} />
        </div>
      </div>

      <div className="row gap-16" style={{ marginTop: -4 }}>
        {dueFilter && (
          <span className="chip-filter">Due in next 90 days <button aria-label="Remove filter" onClick={() => setDueFilter(false)} className="row"><X size={14} /></button></span>
        )}
        {dueFilter && <button className="t-secondary medium" onClick={() => setDueFilter(false)}>Clear all</button>}
        <span className="t-muted">Showing {list.length} of 24 projects</span>
      </div>

      {list.length === 0 ? (
        <div className="card empty">No {tab.toLowerCase()} projects in the demo workspace.</div>
      ) : view === 'grid' ? (
        <div className="proj-grid">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      ) : (
        <ProjectRows list={list} />
      )}
      {toast}
    </main>
  );
}

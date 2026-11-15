import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Star, Link2, Plus, MoreHorizontal, Calendar, LayoutDashboard, List, Columns3, AlignLeft, FileText, MessageSquare,
  CircleAlert, ArrowUpRight, SquareCheck, Search, ListFilter, Layers, ChevronDown, User, Diamond, GanttChart,
} from '../icons';
import {
  projectById, people, breakdown, milestones, projectTeam, board as boardSeed, tasks as allTasks,
} from '../data/demo';
import { Avatar, AvatarStack, HealthBadge, ProjectTile, StatusIcon, Tabs, useToast } from '../components/ui';
import { KanbanCard, TaskDrawer, TaskTable } from '../components/TaskViews';

function Donut({ pct }) {
  const r = 58; const c = 2 * Math.PI * r;
  return (
    <svg width="136" height="136" viewBox="0 0 136 136" role="img" aria-label={`${pct}% complete`}>
      <circle cx="68" cy="68" r={r} fill="none" stroke="var(--bg-subtle)" strokeWidth="10" />
      <circle cx="68" cy="68" r={r} fill="none" stroke="var(--accent-default)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 68 68)" />
      <text x="68" y="70" textAnchor="middle" fontSize="28" fontWeight="600" fill="var(--text-primary)" letterSpacing="-1">{pct}%</text>
      <text x="68" y="90" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">complete</text>
    </svg>
  );
}

function Overview({ p, setTab }) {
  return (
    <div className="pd-grid">
      <div className="col gap-20">
        <div className="callout warning" style={{ padding: '12px 16px', alignItems: 'flex-start' }}>
          <CircleAlert size={16} style={{ marginTop: 2 }} />
          <div className="col gap-2 grow"><span className="medium">Beta release is at risk</span><span>QA capacity is 30% below plan for Nov 24. 12 regression tasks are unassigned.</span></div>
          <button className="btn btn-secondary btn-sm" onClick={() => setTab('tasks')}>Review tasks</button>
        </div>

        <div className="card row gap-24" style={{ padding: 24, flexWrap: 'wrap' }}>
          <Donut pct={p.progress} />
          <div className="col gap-16 grow" style={{ minWidth: 280 }}>
            <div className="row">
              <div className="col gap-2 grow"><h2 className="h-section">Task breakdown</h2><span className="t-secondary">{p.tasksTotal} tasks · 18 added this week</span></div>
              <span className="row gap-4 t-success medium"><ArrowUpRight size={14} /> +9 done this week</span>
            </div>
            <div className="row gap-2" style={{ height: 10 }}>
              {breakdown.map((b) => <span key={b.label} style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: 2 }} title={`${b.label}: ${b.count}`} />)}
            </div>
            <div className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
              {breakdown.map((b) => (
                <div key={b.label} className="col gap-4" style={{ flex: 1, minWidth: 80 }}>
                  <span className="row gap-6 caption t-secondary"><span className="swatch" style={{ background: b.color }} />{b.label}</span>
                  <span><b className="figure-md" style={{ fontSize: 16 }}>{b.count}</b> <span className="caption t-muted">{b.pct}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-pad col gap-16">
          <div className="row">
            <h2 className="h-section grow">Key milestones</h2>
            <Link to="/timeline" className="btn btn-ghost btn-sm"><AlignLeft size={14} /> Open timeline</Link>
          </div>
          <div className="col">
            {milestones.map((m, i) => {
              const done = m.state === 'Completed';
              const last = i === milestones.length - 1;
              return (
                <div key={m.title} className="row gap-16" style={{ alignItems: 'stretch' }}>
                  <div className="col" style={{ alignItems: 'center', width: 20 }}>
                    <span style={{ marginTop: 2 }}>
                      {done ? <StatusIcon status="Done" size={17} /> : m.current ? <StatusIcon status="Current" size={18} />
                        : <Diamond size={14} color={m.state === 'At risk' ? 'var(--status-warning)' : 'var(--text-secondary)'} style={{ margin: 2 }} />}
                    </span>
                    {!last && <span style={{ flex: 1, width: 2, background: done ? 'var(--status-success)' : 'var(--border-default)', margin: '4px 0' }} />}
                  </div>
                  <div className="col gap-4 grow" style={{ paddingBottom: last ? 0 : 20 }}>
                    <div className="row"><span className="medium grow body-md" style={{ fontSize: 13.5 }}>{m.title}</span><HealthBadge health={m.state} /></div>
                    <span className="caption t-secondary">{m.date}</span>
                    {m.progress && <div className="progress" style={{ maxWidth: 240, height: 4, marginTop: 4 }}><span style={{ width: `${m.progress}%` }} /></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="col gap-20">
        <div className="card col gap-16" style={{ padding: 24 }}>
          <div className="row"><h2 className="h-section grow">Team · 7</h2><button className="btn btn-ghost btn-sm"><Plus size={14} /> Invite</button></div>
          {projectTeam.map((m) => (
            <div key={m.who} className="row gap-12">
              <Avatar id={m.who} size={32} presence />
              <div className="col grow"><span className="medium">{people[m.who].name}</span><span className="caption t-secondary">{m.role}</span></div>
              <span className="row gap-4 caption t-secondary"><SquareCheck size={14} />{m.tasks}</span>
            </div>
          ))}
          <span className="caption t-muted">+2 more · Lucas Silva, Nora Williams</span>
        </div>
        <div className="card col gap-16" style={{ padding: 24 }}>
          <h2 className="h-section">Recent activity</h2>
          {[['PP', 'logged 3 regression bugs on', 'Card freeze', '25m ago'], ['DK', 'moved NX-142 to In Progress', '', '34m ago'], ['SC', 'uploaded Onboarding v3.fig', '', '2h ago']].map(([w, v, t, time]) => (
            <div key={v} className="row gap-10" style={{ alignItems: 'flex-start' }}>
              <Avatar id={w} size={24} />
              <div className="col gap-2"><span><b className="medium">{people[w].name}</b> <span className="t-secondary">{v}</span> {t}</span><span className="caption t-muted">{time}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Board() {
  const [cols, setCols] = useState(boardSeed);
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const [toast, showToast] = useToast();

  const onDrop = (status) => {
    if (!drag) return;
    setCols((cs) => {
      const from = cs.find((c) => c.cards.some((x) => x.id === drag.id));
      if (!from || from.status === status) return cs;
      return cs.map((c) => {
        if (c.status === from.status) return { ...c, count: c.count - 1, cards: c.cards.filter((x) => x.id !== drag.id) };
        if (c.status === status) return { ...c, count: c.count + 1, cards: [...c.cards, drag] };
        return c;
      });
    });
    showToast(`${drag.id} moved to ${status}`);
    setDrag(null); setOver(null);
  };

  return (
    <>
      <div className="row gap-8" style={{ padding: '16px 32px', flexWrap: 'wrap' }}>
        <label className="input" style={{ width: 180, height: 32 }}><Search size={16} /><input placeholder="Search cards…" /></label>
        <button className="btn btn-secondary" style={{ height: 32 }}><ListFilter size={16} /> Filter</button>
        <button className="btn btn-secondary" style={{ height: 32 }}><Layers size={16} /> Group by: Status <ChevronDown size={14} /></button>
        <button className="btn btn-secondary" style={{ height: 32 }}><User size={16} /> Assignee <ChevronDown size={14} /></button>
        <button className="btn btn-secondary btn-sm" style={{ borderRadius: 999 }}>My cards</button>
        <button className="btn btn-secondary btn-sm" style={{ borderRadius: 999 }}>Due this week</button>
      </div>
      <div className="board">
        {cols.map((col) => (
          <section key={col.status} className="board-col" aria-label={col.status}>
            <div className="row gap-8" style={{ height: 32, padding: '0 6px' }}>
              <StatusIcon status={col.status} />
              <span className="medium">{col.status}</span>
              <span className="t-secondary">{col.count}</span>
              {col.wip && <span className="badge warning" style={{ height: 20, borderRadius: 4, padding: '0 6px' }}>WIP {col.count}/20</span>}
              <span className="spacer" />
              <button className="icon-btn sq-sm" aria-label={`Add card to ${col.status}`}><Plus size={16} /></button>
              <button className="icon-btn sq-sm" aria-label="Column options"><MoreHorizontal size={16} /></button>
            </div>
            <div
              className={`board-list ${over === col.status ? 'over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOver(col.status); }}
              onDragLeave={() => setOver((o) => (o === col.status ? null : o))}
              onDrop={() => onDrop(col.status)}
            >
              {col.cards.map((c) => (
                <KanbanCard key={c.id} c={c} dragging={drag?.id === c.id}
                  onDragStart={(e, card) => { e.dataTransfer.effectAllowed = 'move'; setDrag(card); }}
                  onDragEnd={() => { setDrag(null); setOver(null); }} />
              ))}
              <button className="row gap-8 t-secondary" style={{ padding: '8px 10px' }}><Plus size={16} /> Add card</button>
            </div>
          </section>
        ))}
      </div>
      {toast}
    </>
  );
}

function ProjectTasks({ p }) {
  const [list, setList] = useState(() => allTasks.filter((t) => t.project === p.name));
  const [openId, setOpenId] = useState(null);
  const open = list.find((t) => t.id === openId);
  const change = (id, s) => setList((l) => l.map((t) => (t.id === id ? { ...t, status: s } : t)));
  return (
    <div className="content" style={{ paddingTop: 20 }}>
      <TaskTable tasks={list} onOpen={(t) => setOpenId(t.id)} selectedId={openId} onStatusChange={change} sortAsc={null} onSort={() => {}} />
      {open && <TaskDrawer task={open} onClose={() => setOpenId(null)} onStatusChange={change} />}
    </div>
  );
}

export default function ProjectDetail() {
  const { id, tab: routeTab } = useParams();
  const navigate = useNavigate();
  const p = projectById[id] ?? projectById['mobile-banking-app'];
  const tab = routeTab ?? 'overview';
  const setTab = (t) => navigate(t === 'overview' ? `/projects/${p.id}` : `/projects/${p.id}/${t}`);
  const [starred, setStarred] = useState(false);
  const [toast, showToast] = useToast();
  const compact = tab === 'board';

  const tabs = useMemo(() => [
    { value: 'overview', label: 'Overview', icon: LayoutDashboard },
    { value: 'tasks', label: 'Tasks', icon: List, count: p.tasksTotal },
    { value: 'board', label: 'Board', icon: Columns3 },
    { value: 'timeline', label: 'Timeline', icon: AlignLeft },
    { value: 'files', label: 'Files', icon: FileText, count: 24 },
    { value: 'discussions', label: 'Discussions', icon: MessageSquare, count: 8 },
  ], [p.tasksTotal]);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)', padding: compact ? '16px 32px 0' : '24px 32px 0' }}>
        <div className="row gap-16" style={{ alignItems: 'flex-start' }}>
          <ProjectTile project={p} size={compact ? 32 : 44} />
          <div className="col gap-4 grow">
            <div className="row gap-10" style={{ flexWrap: 'wrap' }}>
              <h1 className="h-page" style={compact ? { fontSize: 17, lineHeight: '32px', letterSpacing: -0.3 } : undefined}>{p.name}</h1>
              {compact ? <HealthBadge health={p.health} /> : (
                <>
                  <button aria-label={starred ? 'Unstar' : 'Star'} onClick={() => setStarred((s) => !s)}><Star size={18} color="var(--status-warning)" fill={starred ? 'var(--status-warning)' : 'none'} strokeWidth={1.75} /></button>
                  <span className="caption t-secondary">{p.key} · {p.client ?? p.team}</span>
                </>
              )}
            </div>
            {!compact && <p className="t-secondary" style={{ maxWidth: 620 }}>{p.description}</p>}
          </div>
          <AvatarStack ids={p.members} extra={p.extra} />
          <button className="btn btn-secondary" onClick={() => showToast('Project link copied')}><Link2 size={16} /> Share</button>
          <button className="btn btn-primary"><Plus size={16} /> New task</button>
          {!compact && <button className="icon-btn bordered" style={{ width: 36, height: 36 }} aria-label="More"><MoreHorizontal size={16} /></button>}
        </div>

        {!compact && (
          <div className="row" style={{ marginTop: 20, flexWrap: 'wrap', rowGap: 12 }}>
            <div className="meta-cell"><span className="caption t-secondary">Status</span><HealthBadge health={p.health} /></div>
            <div className="meta-cell"><span className="caption t-secondary">Owner</span><span className="row gap-8 medium"><Avatar id={p.owner} size={20} />{people[p.owner].name}</span></div>
            <div className="meta-cell"><span className="caption t-secondary">Timeline</span><span className="row gap-8 medium"><Calendar size={14} />{p.timeline ?? `Oct 1 → ${p.due}`}</span></div>
            <div className="meta-cell"><span className="caption t-secondary">Client</span><span className="medium">{p.client ?? 'Internal'}</span></div>
          </div>
        )}
        <Tabs value={tab} onChange={setTab} tabs={tabs} style={{ borderBottom: 0, marginTop: compact ? 12 : 20, gap: 24 }} />
      </div>

      {tab === 'overview' && <div className="content"><Overview p={p} setTab={setTab} /></div>}
      {tab === 'board' && <Board />}
      {tab === 'tasks' && <ProjectTasks p={p} />}
      {['timeline', 'files', 'discussions'].includes(tab) && (
        <div className="content">
          <div className="card empty col gap-12" style={{ alignItems: 'center' }}>
            <span className="icon-tile" style={{ width: 40, height: 40 }}>{tab === 'timeline' ? <GanttChart size={20} /> : tab === 'files' ? <FileText size={20} /> : <MessageSquare size={20} />}</span>
            <span className="medium" style={{ color: 'var(--text-primary)' }}>{tab === 'timeline' ? 'Timeline lives in the workspace view' : tab === 'files' ? '24 files' : '8 discussions'}</span>
            {tab === 'timeline' ? <Link className="btn btn-secondary" to="/timeline">Open timeline</Link> : <span>Not included in the demo data.</span>}
          </div>
        </div>
      )}
      {toast}
    </main>
  );
}

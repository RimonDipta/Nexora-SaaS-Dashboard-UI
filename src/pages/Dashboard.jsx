import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Upload, MoreHorizontal, CircleAlert, ArrowRight, ListFilter } from '../icons';
import { kpis, productivity, myTasks, activity, projects, people } from '../data/demo';
import {
  Avatar, AvatarStack, Checkbox, HealthBadge, PageHeader, Priority, Progress, ProjectTag, ProjectTile, Segmented, Tabs, PROJECT_ICONS, useToast, Popover,
} from '../components/ui';

function Kpi({ k }) {
  const Icon = PROJECT_ICONS[k.icon];
  const Arrow = k.trend === 'up' ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="card kpi">
      <div className="row gap-8">
        <span className="grow medium t-secondary">{k.label}</span>
        <span className="icon-tile"><Icon size={16} strokeWidth={1.75} /></span>
      </div>
      <div className="row gap-8">
        <span className="figure-lg">{k.value}</span>
        <span className="row gap-2 caption medium t-success"><Arrow size={12} strokeWidth={2.25} />{k.delta}</span>
      </div>
      {k.legend ? (
        <div className="row gap-12 caption t-secondary" style={{ flexWrap: 'wrap' }}>
          {k.legend.map(([c, l]) => <span key={l} className="row gap-6"><span className={`legend-dot bg-c c-${c}`} />{l}</span>)}
        </div>
      ) : <span className="caption t-secondary">{k.foot}</span>}
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card" style={{ padding: '8px 10px', boxShadow: 'var(--shadow-md)' }}>
      <div className="caption medium" style={{ marginBottom: 4 }}>Week of {label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="row gap-6 caption t-secondary">
          <span className="swatch" style={{ background: p.fill }} />
          <span className="grow" style={{ textTransform: 'capitalize' }}>{p.dataKey}</span>
          <b className="medium" style={{ color: 'var(--text-primary)', marginLeft: 12 }}>{p.value}</b>
        </div>
      ))}
    </div>
  );
}

function Productivity({ range }) {
  const data = productivity[range];
  const [menu, setMenu] = useState(false);
  const sub = { Week: 'this week', Month: 'last 8 weeks', Quarter: 'last 6 months' }[range];
  const max = Math.ceil(Math.max(...data.map((d) => d.created)) / 10) * 10;
  return (
    <div className="card card-pad col gap-20 grow" style={{ minWidth: 0 }}>
      <div className="row gap-12">
        <div className="col gap-2 grow">
          <h2 className="h-section">Productivity</h2>
          <p className="t-secondary">Tasks completed vs. created · {sub}</p>
        </div>
        <div className="row gap-16 caption t-secondary hide-mobile">
          <span className="row gap-6"><span className="swatch" style={{ background: 'var(--chart-1)' }} />Completed</span>
          <span className="row gap-6"><span className="swatch" style={{ background: 'var(--chart-2)' }} />Created</span>
        </div>
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" aria-label="Chart options" onClick={() => setMenu((m) => !m)}><MoreHorizontal size={16} /></button>
          <Popover open={menu} onClose={() => setMenu(false)} style={{ right: 0, top: 36 }}>
            <button className="menu-item" onClick={() => setMenu(false)}>Download PNG</button>
            <button className="menu-item" onClick={() => setMenu(false)}>Export CSV</button>
            <button className="menu-item" onClick={() => setMenu(false)}>Open in Reports</button>
          </Popover>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 300, marginLeft: -12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} barCategoryGap="34%" margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
            <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: 'var(--border-default)' }} tick={({ x, y, payload, index }) => (
              <text x={x} y={y + 14} textAnchor="middle" fontSize={12} fill={index === data.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)'}>{payload.value}</text>
            )} />
            <YAxis tickLine={false} axisLine={false} width={34} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} domain={[0, max]} tickCount={6} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
            <Bar dataKey="completed" fill="var(--chart-1)" radius={[3, 3, 0, 0]} maxBarSize={14} animationDuration={500} />
            <Bar dataKey="created" fill="var(--chart-2)" radius={[3, 3, 0, 0]} maxBarSize={14} animationDuration={500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MyTasksCard() {
  const [tab, setTab] = useState('Today');
  const [state, setState] = useState(() => Object.fromEntries(Object.values(myTasks).flat().map((t) => [t.id, t.done])));
  const list = myTasks[tab];
  return (
    <div className="card col" style={{ width: 372, flexShrink: 0, maxWidth: '100%' }}>
      <div className="row gap-8" style={{ padding: '20px 20px 0' }}>
        <h2 className="h-section grow">My tasks</h2>
        <Link to="/tasks" className="btn btn-ghost btn-sm">View all</Link>
      </div>
      <Tabs
        style={{ padding: '4px 20px 0' }}
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'Today', label: 'Today', count: myTasks.Today.length },
          { value: 'Upcoming', label: 'Upcoming', count: myTasks.Upcoming.length },
          { value: 'Overdue', label: 'Overdue', count: myTasks.Overdue.length },
        ]}
      />
      <div className="col" style={{ padding: '4px 20px 0', flex: 1, maxHeight: 352, overflowY: 'auto' }}>
        {list.map((t, i) => (
          <div key={t.id} className="row gap-12" style={{ alignItems: 'flex-start', padding: '14px 0', borderBottom: i < list.length - 1 ? '1px solid var(--border-default)' : 0 }}>
            <span style={{ paddingTop: 1 }}><Checkbox checked={state[t.id]} onChange={(v) => setState((s) => ({ ...s, [t.id]: v }))} label={t.title} /></span>
            <div className="col gap-4 grow">
              <span style={{ textDecoration: state[t.id] ? 'line-through' : 'none', color: state[t.id] ? 'var(--text-secondary)' : undefined, fontWeight: state[t.id] ? 400 : 500 }}>{t.title}</span>
              <span className="row gap-6 caption t-secondary">
                <ProjectTag name={t.project} muted /> · <Priority level={t.priority} />
              </span>
            </div>
            <span className="caption t-secondary" style={{ color: tab === 'Overdue' ? 'var(--status-danger-text)' : undefined }}>{t.time}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <button className="callout danger" style={{ width: '100%' }} onClick={() => setTab('Overdue')}>
          <CircleAlert size={16} />
          <span className="grow medium" style={{ textAlign: 'left' }}>2 tasks are overdue — oldest by 3 days</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ProjectProgress() {
  const navigate = useNavigate();
  const list = projects.slice(0, 5);
  return (
    <div className="card col grow" style={{ minWidth: 0, overflow: 'hidden' }}>
      <div className="row gap-12" style={{ padding: '24px 24px 16px' }}>
        <div className="col gap-2 grow">
          <h2 className="h-section">Project progress</h2>
          <p className="t-secondary">Your 5 projects · 2 need attention</p>
        </div>
        <Link to="/projects" className="btn btn-secondary btn-sm">All projects</Link>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ minWidth: 640 }}>
          <thead>
            <tr><th style={{ paddingLeft: 24 }}>Project</th><th>Status</th><th>Progress</th><th>Team</th><th>Due</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: 'pointer' }}>
                <td style={{ paddingLeft: 24 }}>
                  <div className="row gap-12">
                    <ProjectTile project={p} size={32} />
                    <div className="col">
                      <span className="medium">{p.name}</span>
                      <span className="caption t-secondary">{p.team} · {people[p.owner].name}</span>
                    </div>
                  </div>
                </td>
                <td><HealthBadge health={p.health} /></td>
                <td style={{ width: 170 }}>
                  <div className="row gap-12">
                    <Progress value={p.progress} tone={p.health === 'At risk' ? 'warning' : p.health === 'Off track' ? 'danger' : ''} />
                    <span className="caption medium" style={{ width: 30 }}>{p.progress}%</span>
                  </div>
                </td>
                <td><AvatarStack ids={p.members} extra={p.extra} /></td>
                <td style={{ color: p.health === 'Off track' ? 'var(--status-danger-text)' : undefined }}>{p.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="card col" style={{ width: 372, flexShrink: 0, maxWidth: '100%', padding: '24px 20px 20px' }}>
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 className="h-section grow">Recent activity</h2>
        <button className="icon-btn" aria-label="Filter activity"><ListFilter size={16} /></button>
      </div>
      <div className="col gap-16">
        {activity.map((a, i) => (
          <div key={i} className="row gap-12" style={{ alignItems: 'flex-start' }}>
            <Avatar id={a.who} size={24} />
            <div className="col gap-4 grow">
              <span>
                <span className="medium">{people[a.who].name}</span>{' '}
                <span className="t-secondary">{a.verb}</span>{' '}
                <span className={a.plainTarget ? 't-secondary' : 'medium'}>{a.target}</span>
              </span>
              <span className="caption t-muted">{a.time} · {a.project}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [range, setRange] = useState('Month');
  const [toast, showToast] = useToast();
  return (
    <main className="content">
      <PageHeader title="Good morning, Alex" subtitle="Monday, November 16 · 6 tasks due this week, 2 need your attention.">
        <Segmented options={['Week', 'Month', 'Quarter']} value={range} onChange={setRange} />
        <button className="btn btn-secondary" onClick={() => showToast('Report link copied to clipboard')}><Upload size={16} /> Share report</button>
      </PageHeader>

      <section className="dash-kpis">
        {kpis.map((k) => <Kpi key={k.label} k={k} />)}
      </section>

      <section className="dash-row">
        <Productivity range={range} />
        <MyTasksCard />
      </section>

      <section className="dash-row">
        <ProjectProgress />
        <RecentActivity />
      </section>
      {toast}
    </main>
  );
}

import { useState } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, SquareCheck, Inbox as InboxIcon, Calendar, Folder, Users, User, Target, ChartColumn, Activity,
  Clock, Settings, CircleHelp, PanelLeft, ChevronsUpDown, Search, Plus, Bell, ChevronRight, MoreHorizontal,
  LogOut, Moon, Sun, Check, FileText, FolderPlus, UserPlus, X, CornerDownLeft,
} from '../icons';
import { useApp } from './AppContext';
import { Avatar, Kbd, Popover, ProjectTag } from './ui';
import { notifications, projects, tasks, people } from '../data/demo';

const NAV = [
  { section: 'Workspace', items: [
    { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/tasks', label: 'My Tasks', icon: SquareCheck, count: 6 },
    { to: '/inbox', label: 'Inbox', icon: InboxIcon, countKey: 'unread' },
    { to: '/calendar', label: 'Calendar', icon: Calendar, match: ['/calendar', '/timeline'] },
  ] },
  { section: 'Manage', items: [
    { to: '/projects', label: 'Projects', icon: Folder },
    { to: '/teams', label: 'Teams', icon: Users },
    { to: '/members', label: 'Members', icon: User },
    { to: '/goals', label: 'Goals', icon: Target },
  ] },
  { section: 'Analytics', items: [
    { to: '/reports', label: 'Reports', icon: ChartColumn },
    { to: '/workload', label: 'Workload', icon: Activity },
    { to: '/time-tracking', label: 'Time Tracking', icon: Clock },
  ] },
  { section: 'Admin', items: [{ to: '/settings', label: 'Settings', icon: Settings }] },
];

function Sidebar({ mobileOpen }) {
  const { collapsed, setCollapsed, setOverlay, unread } = useApp();
  const { pathname } = useLocation();
  const [wsOpen, setWsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, setTheme } = useApp();
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${collapsed && !mobileOpen ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Primary">
      <div style={{ position: 'relative' }}>
        <button className="ws-switch" onClick={() => setWsOpen((o) => !o)} aria-haspopup="menu">
          <img src="/logo-mark.svg" alt="Nexora" className="logo" width={28} height={28} />
          <span className="col grow hide-collapsed">
            <span className="medium">Nexora Studio</span>
            <span className="caption t-secondary">Pro plan · 24 members</span>
          </span>
          <ChevronsUpDown size={16} className="hide-collapsed" color="var(--text-secondary)" />
        </button>
        <Popover open={wsOpen} onClose={() => setWsOpen(false)} style={{ top: 44, left: 0, width: 240 }}>
          <div className="overline" style={{ padding: '4px 8px' }}>Workspaces</div>
          <button className="menu-item hl" onClick={() => setWsOpen(false)}>
            <img src="/logo-mark.svg" alt="" width={20} height={20} /> <span className="grow">Nexora Studio</span><Check size={14} color="var(--accent-text)" />
          </button>
          <button className="menu-item" onClick={() => setWsOpen(false)}>
            <span className="avatar bg-c c-teal" style={{ width: 20, height: 20, fontSize: 9, borderRadius: 6 }}>A</span> <span className="grow">Atlas Bank (guest)</span>
          </button>
          <div className="menu-sep" />
          <button className="menu-item" onClick={() => { setWsOpen(false); navigate('/settings'); }}><Settings size={16} /> Workspace settings</button>
          <button className="menu-item" onClick={() => setWsOpen(false)}><Plus size={16} /> Create workspace</button>
        </Popover>
      </div>

      <div className="side-search">
        <button className="search-trigger hide-collapsed" onClick={() => setOverlay('command')}>
          <Search size={16} />
          <span className="grow">Search</span>
          <Kbd>⌘K</Kbd>
        </button>
        <button className="icon-btn primary" aria-label="Quick create" onClick={() => setOverlay('create')} style={collapsed ? { margin: '0 auto' } : undefined}>
          <Plus size={16} />
        </button>
      </div>

      {NAV.map((s) => (
        <nav key={s.section} className="nav-section" aria-label={s.section}>
          <div className="overline hide-collapsed">{s.section}</div>
          {s.items.map((it) => {
            const Icon = it.icon;
            const active = it.match ? it.match.some((m) => pathname.startsWith(m)) : it.end ? pathname === it.to : pathname.startsWith(it.to);
            const count = it.countKey === 'unread' ? unread : it.count;
            return (
              <NavLink key={it.to} to={it.to} className={`nav-item ${active ? 'active' : ''}`} title={collapsed ? it.label : undefined}>
                <Icon size={16} strokeWidth={1.75} />
                <span className="grow hide-collapsed">{it.label}</span>
                {count > 0 && <span className={`count hide-collapsed ${it.countKey === 'unread' || active ? 'accent' : ''}`}>{count}</span>}
              </NavLink>
            );
          })}
        </nav>
      ))}

      <div className="spacer" />
      <button className="nav-item" title="Help & support"><CircleHelp size={16} strokeWidth={1.75} /><span className="hide-collapsed">Help &amp; support</span></button>
      <button className="nav-item" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand sidebar  [' : 'Collapse sidebar  ['}>
        <PanelLeft size={16} strokeWidth={1.75} /><span className="hide-collapsed">Collapse sidebar</span>
      </button>
      <div className="profile" style={{ position: 'relative', ...(collapsed ? { padding: '10px 0 2px', justifyContent: 'center' } : {}) }}>
        <Avatar id="AM" size={32} presence />
        <span className="col grow hide-collapsed">
          <span className="medium">Alex Morgan</span>
          <span className="caption t-secondary">Product Manager</span>
        </span>
        <button className="icon-btn sq-sm hide-collapsed" aria-label="Profile menu" onClick={() => setProfileOpen((o) => !o)}><MoreHorizontal size={16} /></button>
        <Popover open={profileOpen} onClose={() => setProfileOpen(false)} style={{ bottom: 48, left: 0, width: 232 }}>
          <div className="row gap-10" style={{ padding: '6px 8px 8px' }}>
            <Avatar id="AM" size={32} presence />
            <div className="col"><span className="medium">Alex Morgan</span><span className="caption t-secondary">alex@nexora.studio</span></div>
          </div>
          <div className="menu-sep" />
          <button className="menu-item" onClick={() => { setProfileOpen(false); navigate('/settings'); }}><User size={16} /> Profile &amp; security</button>
          <button className="menu-item" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="menu-sep" />
          <button className="menu-item" style={{ color: 'var(--status-danger-text)' }} onClick={() => setProfileOpen(false)}><LogOut size={16} /> Log out</button>
        </Popover>
      </div>
    </aside>
  );
}

function useCrumbs() {
  const { pathname } = useLocation();
  const seg = pathname.split('/').filter(Boolean);
  const map = {
    '': ['Nexora Studio', 'Overview'], tasks: ['Nexora Studio', 'Tasks'], inbox: ['Nexora Studio', 'Inbox'],
    calendar: ['Nexora Studio', 'Calendar'], timeline: ['Nexora Studio', 'Timeline'], projects: ['Nexora Studio', 'Projects'],
    teams: ['Nexora Studio', 'Teams'], members: ['Nexora Studio', 'Members'], goals: ['Nexora Studio', 'Goals'],
    reports: ['Analytics', 'Reports'], workload: ['Analytics', 'Workload'], 'time-tracking': ['Analytics', 'Time Tracking'],
    settings: ['Settings', 'Preferences'],
  };
  if (seg[0] === 'projects' && seg[1]) {
    const p = projects.find((x) => x.id === seg[1]);
    return [{ label: 'Projects', to: '/projects' }, { label: p?.name ?? 'Project' }];
  }
  const [a, b] = map[seg[0] ?? ''] ?? ['Nexora Studio', 'Page'];
  return [{ label: a, to: a === 'Nexora Studio' ? '/' : undefined }, { label: b }];
}

function NotificationsMenu({ onClose }) {
  const navigate = useNavigate();
  const { setUnread } = useApp();
  return (
    <div style={{ width: 380 }}>
      <div className="row" style={{ padding: '8px 10px 10px' }}>
        <span className="h-section grow" style={{ fontSize: 15 }}>Notifications</span>
        <button className="btn btn-ghost btn-xs" onClick={() => setUnread(0)}><Check size={14} /> Mark all as read</button>
      </div>
      <div className="col">
        {notifications.map((n) => (
          <button key={n.id} className="menu-item" style={{ height: 'auto', padding: '10px 8px', alignItems: 'flex-start' }} onClick={() => { onClose(); navigate('/inbox'); }}>
            {n.who ? <Avatar id={n.who} size={28} /> : <span className="icon-tile" style={{ borderRadius: 999 }}><Bell size={14} /></span>}
            <span className="col gap-4 grow" style={{ fontWeight: 400 }}>
              <span>{n.html.map(([k, t], i) => (k === 'b' ? <b key={i} className="medium">{t}</b> : <span key={i} className="t-secondary">{t}</span>))}</span>
              <span className="caption t-muted">{n.project} · {n.time}</span>
            </span>
            {n.unread && <span className="legend-dot" style={{ background: 'var(--accent-default)', marginTop: 6 }} />}
          </button>
        ))}
      </div>
      <div className="menu-sep" />
      <button className="menu-item" style={{ justifyContent: 'center', color: 'var(--accent-text)' }} onClick={() => { onClose(); navigate('/inbox'); }}>Open inbox</button>
    </div>
  );
}

function Topbar({ onMobileMenu }) {
  const crumbs = useCrumbs();
  const { setCollapsed, setOverlay, unread } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Toggle sidebar" onClick={() => (window.innerWidth <= 760 ? onMobileMenu() : setCollapsed((c) => !c))}><PanelLeft size={16} /></button>
      <nav className="crumbs" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={i} className="row gap-6">
            {i > 0 && <ChevronRight size={14} />}
            {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span className={i === crumbs.length - 1 ? 'current' : ''}>{c.label}</span>}
          </span>
        ))}
      </nav>
      <button className="search-field" onClick={() => setOverlay('command')}>
        <Search size={16} />
        <span className="grow truncate">Search tasks, projects, people…</span>
        <Kbd>⌘K</Kbd>
      </button>
      <div style={{ position: 'relative' }}>
        <button className="icon-btn" aria-label="Notifications" onClick={() => setNotifOpen((o) => !o)}>
          <Bell size={16} />
          {unread > 0 && <span className="notif-dot" />}
        </button>
        <Popover open={notifOpen} onClose={() => setNotifOpen(false)} style={{ right: -8, top: 40 }}>
          <NotificationsMenu onClose={() => setNotifOpen(false)} />
        </Popover>
      </div>
      <button className="icon-btn hide-mobile" aria-label="Help"><CircleHelp size={16} /></button>
      <span className="vdivider hide-mobile" />
      <button className="btn btn-primary" onClick={() => setOverlay('create')}><Plus size={16} /> Create</button>
    </header>
  );
}

function CommandPalette({ onClose }) {
  const [q, setQ] = useState('');
  const [hl, setHl] = useState(0);
  const navigate = useNavigate();
  const ql = q.trim().toLowerCase();
  const items = [
    ...projects.map((p) => ({ kind: 'Projects', label: p.name, sub: `${p.team} · ${p.progress}%`, to: `/projects/${p.id}`, icon: <Folder size={16} /> })),
    ...tasks.slice(0, 14).map((t) => ({ kind: 'Tasks', label: t.title, sub: t.id, to: '/tasks', icon: <SquareCheck size={16} /> })),
    ...Object.values(people).map((p) => ({ kind: 'People', label: p.name, sub: p.role, to: '/members', icon: <Avatar id={p.id} size={20} /> })),
    ...NAV.flatMap((s) => s.items).map((n) => ({ kind: 'Go to', label: n.label, sub: '', to: n.to, icon: <n.icon size={16} /> })),
  ].filter((i) => !ql || i.label.toLowerCase().includes(ql) || i.sub.toLowerCase().includes(ql));
  const shown = ql ? items.slice(0, 12) : items.filter((i) => i.kind === 'Projects' || i.kind === 'Go to').slice(0, 10);

  const go = (it) => { navigate(it.to); onClose(); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHl((h) => Math.min(h + 1, shown.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && shown[hl]) go(shown[hl]);
    if (e.key === 'Escape') onClose();
  };
  let lastKind = null;
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="modal" role="dialog" aria-label="Command palette">
        <div className="row gap-10" style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-default)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setHl(0); }} onKeyDown={onKey}
            placeholder="Search or jump to…" style={{ border: 0, outline: 0, background: 'none', flex: 1, fontSize: 15 }} />
          <Kbd>Esc</Kbd>
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto', padding: 6 }}>
          {shown.length === 0 && <div className="empty" style={{ padding: 32 }}>No results for “{q}”</div>}
          {shown.map((it, i) => {
            const head = it.kind !== lastKind ? (lastKind = it.kind) : null;
            return (
              <div key={`${it.kind}-${it.label}`}>
                {head && <div className="overline" style={{ padding: '8px 10px 4px' }}>{head}</div>}
                <button className={`menu-item ${i === hl ? 'hl' : ''}`} onMouseEnter={() => setHl(i)} onClick={() => go(it)} style={{ height: 36 }}>
                  <span className="t-secondary row">{it.icon}</span>
                  <span className="grow truncate">{it.label}</span>
                  <span className="caption t-muted" style={{ fontWeight: 400 }}>{it.sub}</span>
                  {i === hl && <CornerDownLeft size={14} color="var(--text-muted)" />}
                </button>
              </div>
            );
          })}
        </div>
        <div className="row gap-16 caption t-muted" style={{ padding: '10px 16px', borderTop: '1px solid var(--border-default)' }}>
          <span className="row gap-6"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span className="row gap-6"><Kbd>↵</Kbd> open</span>
          <span className="row gap-6"><Kbd>[</Kbd> toggle sidebar</span>
        </div>
      </div>
    </>
  );
}

function QuickCreate({ onClose }) {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState(projects[1].name);
  const [done, setDone] = useState(false);
  const opts = [
    { icon: SquareCheck, label: 'Task', kbd: 'T' }, { icon: FolderPlus, label: 'Project', kbd: 'P' },
    { icon: FileText, label: 'Doc', kbd: 'D' }, { icon: UserPlus, label: 'Invite', kbd: 'I' },
  ];
  const [kind, setKind] = useState('Task');
  const submit = (e) => { e.preventDefault(); if (!title.trim()) return; setDone(true); setTimeout(onClose, 900); };
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <form className="modal" role="dialog" aria-label="Create" onSubmit={submit} style={{ width: 'min(560px, calc(100vw - 32px))' }}>
        <div className="row" style={{ padding: '16px 20px 12px' }}>
          <span className="h-section grow">Create</span>
          <button type="button" className="icon-btn sq-sm" aria-label="Close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="row gap-8" style={{ padding: '0 20px 16px' }}>
          {opts.map((o) => (
            <button type="button" key={o.label} onClick={() => setKind(o.label)} className={`btn btn-sm ${kind === o.label ? 'btn-secondary' : 'btn-ghost'}`}
              style={kind === o.label ? { borderColor: 'var(--accent-default)', color: 'var(--accent-text)', background: 'var(--bg-selected)' } : undefined}>
              <o.icon size={14} /> {o.label}
            </button>
          ))}
        </div>
        <div className="col gap-12" style={{ padding: '0 20px 20px' }}>
          <label className="col gap-6">
            <span className="caption medium t-secondary">{kind === 'Invite' ? 'Email address' : `${kind} name`}</span>
            <div className="input"><input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === 'Invite' ? 'name@company.com' : kind === 'Project' ? 'e.g. Partner API v2' : 'e.g. Write release notes for v2.5'} /></div>
          </label>
          {kind !== 'Invite' && kind !== 'Project' && (
            <label className="col gap-6">
              <span className="caption medium t-secondary">Project</span>
              <select className="select" value={project} onChange={(e) => setProject(e.target.value)}>
                {projects.map((p) => <option key={p.id}>{p.name}</option>)}
              </select>
            </label>
          )}
        </div>
        <div className="row gap-8" style={{ padding: '12px 20px', borderTop: '1px solid var(--border-default)' }}>
          {done ? <span className="row gap-6 t-success medium grow"><Check size={16} /> {kind} created{kind === 'Task' ? <> in&nbsp;<ProjectTag name={project} /></> : ''}</span> : <span className="caption t-muted grow">Press <Kbd>↵</Kbd> to create</span>}
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={!title.trim()} style={{ opacity: title.trim() ? 1 : 0.5 }}>Create {kind.toLowerCase()}</button>
        </div>
      </form>
    </>
  );
}

export default function Layout() {
  const { overlay, setOverlay } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setMobileOpen(false); }
  return (
    <div className="app">
      <Sidebar mobileOpen={mobileOpen} />
      {mobileOpen && <div className="scrim" style={{ zIndex: 69 }} onClick={() => setMobileOpen(false)} />}
      <div className="main">
        <Topbar onMobileMenu={() => setMobileOpen(true)} />
        <Outlet />
      </div>
      {overlay === 'command' && <CommandPalette onClose={() => setOverlay(null)} />}
      {overlay === 'create' && <QuickCreate onClose={() => setOverlay(null)} />}
    </div>
  );
}

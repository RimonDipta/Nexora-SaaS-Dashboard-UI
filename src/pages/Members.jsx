import { useMemo, useState } from 'react';
import { Shield, Plus, Search, ChevronDown, List, LayoutGrid, Mail, Check } from '../icons';
import { people, membersRows, membersStats } from '../data/demo';
import { Avatar, PageHeader, Segmented, Tabs, Popover, useToast } from '../components/ui';

const AVAIL = { green: 'var(--status-success)', amber: 'var(--status-warning)', red: 'var(--status-danger)', neutral: 'var(--text-muted)' };

function RoleSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative' }}>
      <button className={`role-btn ${value === 'Admin' ? 'admin' : ''}`} onClick={() => setOpen((o) => !o)}>{value} <ChevronDown size={13} /></button>
      <Popover open={open} onClose={() => setOpen(false)} style={{ top: 32, left: 0, width: 240 }}>
        {[['Admin', 'Full access, billing & members'], ['Member', 'Create and edit work'], ['Guest', 'Only shared projects']].map(([r, d]) => (
          <button key={r} className="menu-item" style={{ height: 'auto', padding: '8px', alignItems: 'flex-start' }} onClick={() => { onChange(r); setOpen(false); }}>
            <span className="col grow"><span>{r}</span><span className="caption t-secondary" style={{ fontWeight: 400 }}>{d}</span></span>
            {value === r && <Check size={14} color="var(--accent-text)" />}
          </button>
        ))}
      </Popover>
    </span>
  );
}

export default function Members() {
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');
  const [view, setView] = useState('list');
  const [roles, setRoles] = useState(() => Object.fromEntries(membersRows.map((r) => [r.who, people[r.who].access])));
  const [invite, setInvite] = useState('pending');
  const [toast, showToast] = useToast();

  const rows = useMemo(() => membersRows.filter((r) => {
    const p = people[r.who];
    if (tab !== 'All' && tab !== 'Pending' && p.team !== tab) return false;
    if (tab === 'Pending') return false;
    return !q || `${p.name} ${p.email}`.toLowerCase().includes(q.toLowerCase());
  }), [tab, q]);

  return (
    <main className="content">
      <PageHeader title="Members" subtitle="24 people across 5 teams. Manage roles, availability and who’s working on what.">
        <button className="btn btn-secondary"><Shield size={16} /> Manage roles</button>
        <button className="btn btn-primary"><Plus size={16} /> Invite members</button>
      </PageHeader>

      <div className="stat-grid">
        {membersStats.map((s) => (
          <div key={s.label} className="card col gap-8" style={{ padding: '20px 20px 18px' }}>
            <span className="row gap-8 t-secondary medium" style={{ color: 'var(--text-primary)', fontWeight: 400 }}>{s.dot && <span className="legend-dot" style={{ background: AVAIL[s.dot] }} />}{s.label}</span>
            <span className="row gap-10"><span className="figure-md">{s.value}</span><span className="caption t-secondary">{s.foot}</span></span>
          </div>
        ))}
      </div>

      <div className="row gap-8" style={{ borderBottom: '1px solid var(--border-default)', flexWrap: 'wrap' }}>
        <Tabs className="grow" style={{ borderBottom: 0 }} value={tab} onChange={setTab} tabs={[
          { value: 'All', label: 'All', count: 24 }, { value: 'Product', label: 'Product', count: 5 }, { value: 'Design', label: 'Design', count: 4 },
          { value: 'Engineering', label: 'Engineering', count: 7 }, { value: 'Growth', label: 'Growth', count: 6 }, { value: 'Platform', label: 'Platform', count: 2 },
          { value: 'Pending', label: 'Pending', count: 2 },
        ]} />
        <div className="row gap-8" style={{ paddingBottom: 6 }}>
          <label className="input" style={{ width: 240 }}><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email" /></label>
          <button className="btn btn-secondary">Role: Any <ChevronDown size={14} /></button>
          <Segmented value={view} onChange={setView} options={[{ value: 'list', label: '', icon: List }, { value: 'grid', label: '', icon: LayoutGrid }]} />
        </div>
      </div>

      {view === 'grid' ? (
        <div className="proj-grid">
          {rows.map((r) => {
            const p = people[r.who];
            return (
              <div key={r.who} className="card col gap-12" style={{ padding: 20 }}>
                <div className="row gap-12"><Avatar id={r.who} size={40} presence /><div className="col grow"><span className="medium">{p.name}</span><span className="caption t-secondary">{p.role}</span></div><RoleSelect value={roles[r.who]} onChange={(v) => setRoles((x) => ({ ...x, [r.who]: v }))} /></div>
                <div className="row gap-8 caption t-secondary"><span className="legend-dot" style={{ background: AVAIL[r.avail] }} />{r.availability}<span className="spacer" />{r.hours}h / {r.cap}h</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="table" style={{ minWidth: 1060 }}>
            <thead><tr><th style={{ paddingLeft: 16 }}>Member</th><th>Role</th><th>Team</th><th>Active projects</th><th>Workload (this week)</th><th>Availability</th><th>Last active</th></tr></thead>
            <tbody>
              {rows.map((r) => {
                const p = people[r.who];
                const over = r.hours > r.cap;
                const tone = over ? 'var(--status-danger)' : r.hours / r.cap >= 0.85 ? 'var(--status-warning)' : 'var(--accent-default)';
                return (
                  <tr key={r.who}>
                    <td style={{ paddingLeft: 16, height: 55 }}><div className="row gap-12"><Avatar id={r.who} size={32} presence /><div className="col"><span className="medium">{p.name}</span><span className="caption t-secondary">{p.email}</span></div></div></td>
                    <td><RoleSelect value={roles[r.who]} onChange={(v) => { setRoles((x) => ({ ...x, [r.who]: v })); showToast(`${p.name} is now ${v}`); }} /></td>
                    <td className="t-secondary">{p.team}</td>
                    <td><span className="row gap-4">{r.projects.map((c, i) => <span key={i} className={`bg-c c-${c}`} style={{ width: 10, height: 10, borderRadius: 2 }} />)}<span style={{ marginLeft: 6 }}>{r.projects.length}</span></span></td>
                    <td style={{ width: 200 }}><div className="row gap-10"><div className="progress" style={{ height: 4, maxWidth: 88 }}><span style={{ width: `${Math.max(2, Math.min(100, (r.hours / r.cap) * 100))}%`, background: tone }} /></div><span className="caption" style={{ color: over ? 'var(--status-danger-text)' : 'var(--text-secondary)' }}>{r.hours}h / {r.cap}h</span></div></td>
                    <td><span className="row gap-8 caption" style={{ fontSize: 12.5 }}><span className="legend-dot" style={{ background: AVAIL[r.avail] }} />{r.availability}</span></td>
                    <td className="caption t-secondary" style={{ fontSize: 12.5 }}>{r.active}</td>
                  </tr>
                );
              })}
              {(tab === 'All' || tab === 'Pending') && invite === 'pending' && (
                <tr>
                  <td colSpan={4} style={{ paddingLeft: 16, background: 'var(--bg-canvas)' }}><div className="row gap-12"><span className="avatar" style={{ width: 32, height: 32, border: '1px dashed var(--border-strong)', color: 'var(--text-secondary)' }}><Mail size={15} /></span><div className="col"><span className="medium">maya.rao@atlasbank.com</span><span className="caption t-secondary">Invited by Alex Morgan · 2 days ago</span></div></div></td>
                  <td style={{ background: 'var(--bg-canvas)', textAlign: 'right' }} className="t-secondary">Guest</td>
                  <td colSpan={2} style={{ background: 'var(--bg-canvas)' }}><div className="row gap-8" style={{ justifyContent: 'flex-end' }}>
                    <span className="badge neutral">Pending</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => showToast('Invite resent to maya.rao@atlasbank.com')}>Resend</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setInvite('revoked'); showToast('Invite revoked'); }}>Revoke</button>
                  </div></td>
                </tr>
              )}
            </tbody>
          </table>
          {rows.length === 0 && tab !== 'Pending' && <div className="empty">No members match “{q}”.</div>}
        </div>
      )}
      {toast}
    </main>
  );
}

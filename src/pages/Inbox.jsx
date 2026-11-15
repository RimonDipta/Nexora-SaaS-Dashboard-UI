import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, ListFilter, Settings, ChevronRight, Clock, ExternalLink, AtSign, UserRound, MessageSquare, Bell, ArrowRightLeft,
  CircleAlert, Diamond, FileText, SendHorizontal, Inbox as InboxIcon,
} from '../icons';
import { inbox, people, projectByName } from '../data/demo';
import { Avatar, StatusPill, Priority, Tabs, useToast } from '../components/ui';
import { useApp } from '../components/AppContext';

const BADGE = {
  mention: [AtSign, 'var(--accent-default)'], assign: [UserRound, 'var(--project-blue)'], comment: [MessageSquare, 'var(--text-secondary)'],
  reminder: [Clock, 'var(--status-warning)'], status: [ArrowRightLeft, 'var(--status-success)'], health: [CircleAlert, 'var(--status-danger)'],
  milestone: [Diamond, 'var(--project-teal)'],
};

function Item({ n, selected, onSelect, onAccept }) {
  const [Icon, color] = BADGE[n.badge];
  return (
    <button className={`inbox-item ${selected ? 'sel' : ''}`} onClick={onSelect}>
      {n.unread && <span className="udot" />}
      <span style={{ position: 'relative', flexShrink: 0 }}>
        {n.who ? <Avatar id={n.who} size={32} /> : <span className="avatar" style={{ width: 32, height: 32, background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}><Bell size={15} /></span>}
        <span className="inbox-badge"><Icon size={10} color={color} strokeWidth={2.5} /></span>
      </span>
      <span className="col gap-6 grow" style={{ minWidth: 0 }}>
        <span>{n.html.map(([k, t], i) => (k === 'b' ? <span key={i} className="medium">{t}</span> : <span key={i} className="t-secondary">{t}</span>))}</span>
        {n.quote && <span className="t-secondary" style={{ background: 'var(--bg-subtle)', borderRadius: 6, padding: '6px 10px' }}>{n.quote}</span>}
        <span className="row gap-6 caption t-secondary"><span className={`proj-sq bg-c c-${projectByName[n.project]?.color}`} />{n.project} · {n.time}</span>
        {n.actions && (
          <span className="row gap-8" style={{ marginTop: 4 }}>
            <span role="button" tabIndex={0} className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); onAccept(); }}>Accept</span>
            <span role="button" tabIndex={0} className="btn btn-ghost btn-sm">Open task</span>
          </span>
        )}
      </span>
    </button>
  );
}

export default function Inbox() {
  const [items, setItems] = useState(inbox);
  const [tab, setTab] = useState('All');
  const [sel, setSel] = useState('n1');
  const [reply, setReply] = useState('Looks great — approving. Can we add an example 429 response?');
  const [sent, setSent] = useState([]);
  const [toast, showToast] = useToast();
  const { setUnread } = useApp();
  const navigate = useNavigate();

  const unreadCount = items.filter((i) => i.unread).length;
  const sync = (next) => { setItems(next); setUnread(next.filter((i) => i.unread).length); };
  const markAll = () => { sync(items.map((i) => ({ ...i, unread: false }))); showToast('All caught up'); };
  const select = (id) => { setSel(id); };

  const filtered = items.filter((i) => tab === 'All' || (tab === 'Unread' ? i.unread : i.kind === tab));
  const groups = ['Today', 'Yesterday', 'Earlier this week'].map((g) => [g, filtered.filter((i) => i.group === g)]).filter(([, l]) => l.length);
  const current = items.find((i) => i.id === sel);

  return (
    <main className="inbox" style={{ height: 'calc(100vh - 56px)' }}>
      <section className="inbox-list">
        <div className="row gap-8" style={{ padding: '20px 16px 8px 24px' }}>
          <h1 className="h-page">Inbox</h1>
          {unreadCount > 0 && <span className="count accent" style={{ height: 20, minWidth: 20 }}>{unreadCount}</span>}
          <span className="spacer" />
          <button className="btn btn-ghost btn-sm" onClick={markAll}><Check size={14} /> Mark all as read</button>
          <button className="icon-btn" aria-label="Filter"><ListFilter size={16} /></button>
          <button className="icon-btn" aria-label="Notification settings" onClick={() => navigate('/settings')}><Settings size={16} /></button>
        </div>
        <Tabs style={{ padding: '0 24px', gap: 18 }} value={tab} onChange={setTab} tabs={[
          { value: 'All', label: 'All', count: 12 }, { value: 'Unread', label: 'Unread', count: unreadCount },
          { value: 'Mentions', label: 'Mentions', count: 2 }, { value: 'Assigned', label: 'Assigned', count: 4 }, { value: 'Reminders', label: 'Reminders', count: 2 },
        ]} />
        {groups.length === 0 && (
          <div className="empty col gap-8" style={{ alignItems: 'center' }}><InboxIcon size={28} /><span className="medium" style={{ color: 'var(--text-primary)' }}>You’re all caught up</span><span>New mentions and assignments will show up here.</span></div>
        )}
        {groups.map(([g, list]) => (
          <div key={g}>
            <div className="overline" style={{ padding: '18px 24px 6px' }}>{g}</div>
            {list.map((n) => (
              <Item key={n.id} n={n} selected={sel === n.id} onSelect={() => select(n.id)}
                onAccept={() => { sync(items.map((i) => (i.id === n.id ? { ...i, unread: false, actions: false } : i))); showToast('Task accepted'); }} />
            ))}
          </div>
        ))}
      </section>

      <section className="inbox-detail" style={{ overflowY: 'auto' }}>
        <div className="row gap-8" style={{ height: 56, padding: '0 24px 0 32px', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
          <span className="row gap-6 grow t-secondary"><span className="proj-sq bg-c c-green" />Customer Portal <ChevronRight size={14} /> <span className="mono">NX-152</span></span>
          <button className="btn btn-secondary btn-sm" style={{ height: 30 }} onClick={() => { sync(items.map((i) => (i.id === sel ? { ...i, unread: false } : i))); }}><Check size={14} /> Mark as read</button>
          <button className="btn btn-secondary btn-sm" style={{ height: 30 }} onClick={() => showToast('Snoozed until tomorrow 09:00')}><Clock size={14} /> Snooze</button>
          <button className="btn btn-primary btn-sm" style={{ height: 30 }} onClick={() => navigate('/tasks')}><ExternalLink size={14} /> Open task</button>
        </div>
        <div className="col gap-20" style={{ padding: '28px 32px' }}>
          <div className="col gap-10">
            <h2 className="h-page">Document API rate limits for enterprise tier</h2>
            <div className="row gap-8 t-secondary">
              <StatusPill status="In Review" /> <Priority level="Medium" /> · <Avatar id="MB" size={20} /> <span style={{ color: 'var(--text-primary)' }}>Michael Brown</span> · Due Nov 20
            </div>
          </div>
          <div className="card col gap-16" style={{ padding: 20 }}>
            <span className="medium" style={{ fontSize: 14, fontWeight: 600 }}>Thread · {3 + sent.length} comments</span>
            {[['PP', 'Yesterday', 'Load test results are in: we hit 429s at ~1,200 req/min on the invoices endpoint.'], ['LS', 'Yesterday', 'Gateway is set to 1,000 req/min per key. Happy to raise it for enterprise if we document it.']].map(([w, t, txt]) => (
              <div key={w} className="row gap-12" style={{ alignItems: 'flex-start' }}>
                <Avatar id={w} size={32} />
                <div className="col gap-2"><span><b className="medium">{people[w].name}</b> <span className="caption t-muted">{t}</span></span><span>{txt}</span></div>
              </div>
            ))}
            <div className="row gap-12" style={{ alignItems: 'flex-start', background: 'var(--bg-selected)', borderRadius: 10, padding: 12, margin: '0 -4px' }}>
              <Avatar id="MB" size={32} />
              <div className="col gap-6">
                <span className="row gap-8"><b className="medium">Michael Brown</b> <span className="caption t-muted">2h ago</span>{current?.badge === 'mention' && <span className="badge" style={{ background: 'var(--accent-default)', color: '#fff', height: 20, borderRadius: 4 }}>Mentions you</span>}</span>
                <span><span className="t-accent medium">@Alex</span> the rate-limit doc is ready for review. It covers per-key limits, burst allowance and the new Retry-After header.</span>
                <span className="card row gap-10" style={{ padding: '8px 14px 8px 10px', alignSelf: 'flex-start', borderRadius: 8 }}>
                  <FileText size={18} color="var(--text-secondary)" /><span className="col"><span className="medium caption" style={{ fontSize: 12.5 }}>rate-limits-enterprise.md</span><span className="caption t-secondary">Updated 2h ago · 4 min read</span></span>
                </span>
              </div>
            </div>
            {sent.map((s, i) => (
              <div key={i} className="row gap-12" style={{ alignItems: 'flex-start' }}><Avatar id="AM" size={32} /><div className="col gap-2"><span><b className="medium">Alex Morgan</b> <span className="caption t-muted">just now</span></span><span>{s}</span></div></div>
            ))}
            <form className="row gap-12" onSubmit={(e) => { e.preventDefault(); if (reply.trim()) { setSent((x) => [...x, reply]); setReply(''); } }}
              style={{ border: '1px solid var(--accent-default)', borderRadius: 10, padding: '8px 8px 8px 14px', boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent-default) 14%, transparent)' }}>
              <Avatar id="AM" size={22} />
              <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply…" style={{ border: 0, outline: 0, background: 'none', flex: 1, fontSize: 13 }} />
              <button className="btn btn-primary btn-sm" type="submit"><SendHorizontal size={14} /> Reply</button>
            </form>
          </div>
          <div className="row gap-12" style={{ flexWrap: 'wrap' }}>
            {[['Project', 'Customer Portal', 'Off track · 37%'], ['Milestone', 'Enterprise beta', 'Dec 19'], ['Linked tasks', '3', 'NX-149, NX-155, NX-160']].map(([l, v, s]) => (
              <div key={l} className="card col gap-4 grow" style={{ padding: '14px 16px', minWidth: 160 }}>
                <span className="caption t-secondary">{l}</span><span className="medium">{v}</span><span className="caption t-secondary">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {toast}
    </main>
  );
}

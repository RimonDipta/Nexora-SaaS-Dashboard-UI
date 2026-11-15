import { useEffect, useRef, useState } from 'react';
import {
  Check, Globe, Zap, Send, Layers, LayoutGrid, Link2, Folder, CircleCheck, CircleAlert, CircleDot, Diamond,
} from '../icons';
import { people, projectByName } from '../data/demo';

export const PROJECT_ICONS = { globe: Globe, zap: Zap, send: Send, layers: Layers, grid: LayoutGrid, link: Link2, folder: Folder, check: CircleCheck, alert: CircleAlert };

export function Avatar({ id, size = 24, presence = false, title }) {
  const p = people[id];
  if (!p) return null;
  const fs = size <= 20 ? 8 : size <= 24 ? 9 : size <= 28 ? 10 : size <= 32 ? 12 : 14;
  const presenceColor = { online: 'var(--status-success)', busy: 'var(--status-warning)', dnd: 'var(--status-danger)', offline: 'var(--text-muted)' }[p.presence];
  return (
    <span className={`avatar bg-c c-${p.color}`} style={{ width: size, height: size, fontSize: fs }} title={title ?? p.name}>
      {p.id}
      {presence && <span className="presence" style={{ background: presenceColor }} />}
    </span>
  );
}

export function AvatarStack({ ids, extra = 0, size = 24 }) {
  return (
    <span className="avatar-stack">
      {ids.map((id) => <Avatar key={id} id={id} size={size} />)}
      {extra > 0 && <span className="avatar avatar-more" style={{ width: size, height: size, fontSize: 11 }}>+{extra}</span>}
    </span>
  );
}

const HEALTH = { 'On track': 'success', 'At risk': 'warning', 'Off track': 'danger', Planning: 'neutral', Completed: 'accent' };
export function HealthBadge({ health }) {
  return <span className={`badge ${HEALTH[health] || 'neutral'}`}><span className="legend-dot" />{health}</span>;
}

export function ProjectTile({ project, size = 36 }) {
  const Icon = PROJECT_ICONS[project.icon] || Folder;
  return (
    <span className={`tint-c c-${project.color}`} style={{ width: size, height: size, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={size > 40 ? 22 : 18} strokeWidth={1.75} />
    </span>
  );
}

export function ProjectTag({ name, muted }) {
  const p = projectByName[name];
  return (
    <span className="row gap-8 truncate" style={{ color: muted ? 'var(--text-secondary)' : undefined }}>
      <span className={`proj-sq bg-c c-${p?.color || 'neutral'}`} />
      <span className="truncate">{name}</span>
    </span>
  );
}

export function PriorityIcon({ level }) {
  if (level === 'Urgent') {
    return (
      <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--status-danger)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: 1 }}>!</span>
    );
  }
  if (level === 'None') {
    return (
      <span style={{ width: 16, height: 16, display: 'inline-flex', alignItems: 'center', gap: 1.5, paddingLeft: 2 }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 3, height: 1.5, borderRadius: 1, background: 'var(--text-muted)' }} />)}
      </span>
    );
  }
  const filled = { High: 3, Medium: 2, Low: 1 }[level] || 0;
  return (
    <span style={{ width: 16, height: 16, position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      {[[2, 8, 6], [6.5, 5, 9], [11, 2, 12]].map(([l, t, h], i) => (
        <span key={i} style={{ position: 'absolute', left: l, top: t, width: 3, height: h, borderRadius: 1, background: i < filled ? 'var(--text-secondary)' : 'var(--border-strong)' }} />
      ))}
    </span>
  );
}

export function Priority({ level, short }) {
  return (
    <span className="row gap-6 caption medium" style={{ color: level === 'Urgent' ? 'var(--status-danger-text)' : 'var(--text-secondary)' }}>
      <PriorityIcon level={level} />
      {!short && (level === 'None' ? 'No priority' : level)}
    </span>
  );
}

// Status glyphs — geometry from the Figma "Status icon" component (7:60), colours from tokens.
export function StatusIcon({ status, size = 14 }) {
  const box = { width: size, height: size, viewBox: '0 0 14 14', 'aria-hidden': true, style: { flexShrink: 0, display: 'block' } };
  switch (status) {
    case 'In Progress':
      return (
        <svg {...box} fill="none">
          <circle cx="7" cy="7" r="5.25" strokeWidth="1.5" stroke="var(--status-warning)" />
          <path d="M7 4a3 3 0 0 1 0 6V4Z" fill="var(--status-warning)" />
        </svg>
      );
    case 'In Review':
      return (
        <svg {...box} fill="none">
          <circle cx="7" cy="7" r="5.25" strokeWidth="1.5" stroke="var(--accent-default)" />
          <path d="M7 4a3 3 0 1 1-3 3h3V4Z" fill="var(--accent-default)" />
        </svg>
      );
    case 'Done':
      return (
        <svg {...box} fill="none">
          <circle cx="7" cy="7" r="6" fill="var(--status-success)" />
          <path d="M10.3333 4.5L5.75 9.08333L3.66667 7" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" stroke="#fff" />
        </svg>
      );
    case 'Backlog':
      return (
        <span style={{ width: size, height: size, position: 'relative', flexShrink: 0, display: 'block' }} aria-hidden>
          <img src="/status-backlog.png" alt="" width={(size * 12) / 14} height={(size * 12) / 14} style={{ position: 'absolute', left: size / 14, top: size / 14 }} />
        </span>
      );
    case 'Milestone':
      return <Diamond size={size} color="var(--project-blue)" />;
    case 'Current':
      return <CircleDot size={size + 4} color="var(--accent-default)" />;
    default:
      return (
        <svg {...box} fill="none">
          <circle cx="7" cy="7" r="5.25" strokeWidth="1.5" stroke="var(--text-secondary)" />
        </svg>
      );
  }
}

export function StatusPill({ status, onClick }) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag className="status-pill" onClick={onClick}>
      <StatusIcon status={status} size={13} />
      {status}
    </Tag>
  );
}

export function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={`checkbox ${checked ? 'on' : ''}`}
      onClick={(e) => { e.stopPropagation(); onChange?.(!checked); }}
    >
      {checked && <Check size={12} strokeWidth={3} />}
    </button>
  );
}

export function Segmented({ options, value, onChange, size }) {
  return (
    <div className={`segmented ${size === 'lg' ? 'lg' : ''}`} role="tablist">
      {options.map((o) => {
        const key = typeof o === 'string' ? o : o.value;
        const Icon = typeof o === 'string' ? null : o.icon;
        return (
          <button key={key} role="tab" aria-selected={value === key} className={value === key ? 'on' : ''} onClick={() => onChange(key)}>
            {Icon && <Icon size={14} />}
            {typeof o === 'string' ? o : o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Tabs({ tabs, value, onChange, className = '', style }) {
  return (
    <div className={`tabs ${className}`} role="tablist" style={style}>
      {tabs.map((t) => {
        const Icon = t.icon;
        return (
          <button key={t.value} role="tab" aria-selected={value === t.value} className={`tab ${value === t.value ? 'on' : ''}`} onClick={() => onChange(t.value)}>
            {Icon && <Icon size={16} strokeWidth={1.75} />}
            {t.label}
            {t.count != null && <span className={`count ${t.countAccent ? 'accent' : ''}`}>{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function Progress({ value, tone }) {
  return <div className={`progress ${tone || ''}`}><span style={{ width: `${value}%` }} /></div>;
}

export function Kbd({ children }) {
  return <span className="kbd">{children}</span>;
}

/** Click-away popover anchored to a relatively positioned wrapper. */
export function Popover({ open, onClose, children, style, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const t = setTimeout(() => document.addEventListener('mousedown', onDown));
    document.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return <div ref={ref} className={`popover ${className}`} style={style}>{children}</div>;
}

export function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return undefined;
    const t = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(t);
  }, [msg]);
  const node = msg ? <div className="toast" role="status"><Check size={16} />{msg}</div> : null;
  return [node, setMsg];
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="row gap-16 page-head" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div className="col gap-4 grow">
        <h1 className="h-page">{title}</h1>
        {subtitle && <p className="t-secondary">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

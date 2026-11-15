import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ListFilter, Layers, ChevronDown, ArrowUpDown, List, Columns3, Calendar, Settings2 } from '../icons';
import { tasks as seed } from '../data/demo';
import { PageHeader, Segmented, useToast } from '../components/ui';
import { TaskDrawer, TaskTable } from '../components/TaskViews';
import { useApp } from '../components/AppContext';

export default function Tasks() {
  const [scope, setScope] = useState('Team');
  const [q, setQ] = useState('');
  const [list, setList] = useState(seed);
  const [openId, setOpenId] = useState(null);
  const [sortAsc, setSortAsc] = useState(null); // null = Figma order
  const [toast, showToast] = useToast();
  const navigate = useNavigate();
  const { setOverlay } = useApp();

  const visible = useMemo(() => {
    let l = list;
    if (scope === 'Assigned to me') l = l.filter((t) => t.assignee === 'AM' || ['NX-142', 'NX-163', 'NX-118', 'NX-122', 'NX-137', 'NX-170'].includes(t.id));
    if (scope === 'Created by me') l = l.filter((t) => ['Mobile Banking App', 'Partner Onboarding Hub'].includes(t.project));
    if (q) l = l.filter((t) => `${t.id} ${t.title} ${t.project}`.toLowerCase().includes(q.toLowerCase()));
    return l;
  }, [list, scope, q]);

  const open = list.find((t) => t.id === openId);
  const flat = visible.filter((t) => !['Backlog', 'Done'].includes(t.status));
  const step = (d) => {
    const i = flat.findIndex((t) => t.id === openId);
    const n = flat[(i + d + flat.length) % flat.length];
    if (n) setOpenId(n.id);
  };
  const changeStatus = useCallback((id, status) => {
    setList((l) => l.map((t) => (t.id === id ? { ...t, status } : t)));
    showToast(`${id} moved to ${status}`);
  }, [showToast]);

  return (
    <main className="content">
      <PageHeader title="Tasks" subtitle="Everything your team is working on across 5 projects.">
        <Segmented options={['Assigned to me', 'Team', 'Created by me']} value={scope} onChange={setScope} size="lg" />
        <button className="btn btn-primary" onClick={() => setOverlay('create')}><Plus size={16} /> Add task</button>
      </PageHeader>

      <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
        <label className="input" style={{ width: 260 }}><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 186 tasks…" /></label>
        <button className="btn btn-secondary"><ListFilter size={16} /> Filter <span className="count">1</span></button>
        <button className="btn btn-secondary"><Layers size={16} /> Group: Status <ChevronDown size={14} /></button>
        <button className="btn btn-secondary" onClick={() => setSortAsc((s) => !s)}><ArrowUpDown size={16} /> Sort: Due date <ChevronDown size={14} /></button>
        <span className="spacer" />
        <Segmented
          value="list"
          onChange={(v) => v === 'board' ? navigate('/projects/mobile-banking-app/board') : v === 'calendar' && navigate('/calendar')}
          options={[{ value: 'list', label: 'List', icon: List }, { value: 'board', label: 'Board', icon: Columns3 }, { value: 'calendar', label: 'Calendar', icon: Calendar }]}
        />
        <button className="icon-btn bordered" aria-label="View settings"><Settings2 size={16} /></button>
      </div>

      <TaskTable tasks={visible} onOpen={(t) => setOpenId(t.id)} selectedId={openId} onStatusChange={changeStatus} sortAsc={sortAsc} onSort={() => setSortAsc((s) => (s === null ? false : !s))} />
      {open && <TaskDrawer task={open} onClose={() => setOpenId(null)} onPrev={() => step(-1)} onNext={() => step(1)} onStatusChange={changeStatus} />}
      {toast}
    </main>
  );
}

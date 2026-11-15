import { Link } from 'react-router-dom';
import { Users, Target, ChartColumn, Clock, Compass } from '../icons';
import { PageHeader, AvatarStack } from '../components/ui';

const TEAMS = [
  { name: 'Product', members: ['AM', 'JL'], count: 5, lead: 'Alex Morgan', projects: 2 },
  { name: 'Design', members: ['SC'], count: 4, lead: 'Sarah Chen', projects: 3 },
  { name: 'Engineering', members: ['DK', 'MB', 'PP'], count: 7, lead: 'Daniel Kim', projects: 4 },
  { name: 'Growth', members: ['ED', 'NW'], count: 6, lead: 'Emily Davis', projects: 1 },
  { name: 'Platform', members: ['LS'], count: 2, lead: 'Lucas Silva', projects: 2 },
];

const COPY = {
  goals: { icon: Target, title: 'Goals', text: 'Set quarterly outcomes and link projects to them. Goals arrive in the next release.' },
  reports: { icon: ChartColumn, title: 'Reports', text: 'Saved reports and scheduled exports will live here. For now, see Workload for capacity data.' },
  time: { icon: Clock, title: 'Time Tracking', text: 'Log hours against tasks and see estimates vs. actuals. Coming soon.' },
  404: { icon: Compass, title: 'Page not found', text: 'This page doesn’t exist in the demo workspace.' },
};

export default function Placeholder({ kind }) {
  if (kind === 'teams') {
    return (
      <main className="content">
        <PageHeader title="Teams" subtitle="5 teams · 24 people. Teams group members for workload and permissions." />
        <div className="proj-grid">
          {TEAMS.map((t) => (
            <div key={t.name} className="card proj-card" style={{ cursor: 'default' }}>
              <div className="row gap-12">
                <span className="icon-tile" style={{ width: 36, height: 36 }}><Users size={18} /></span>
                <div className="col grow"><span className="h-section">{t.name}</span><span className="caption t-secondary">Lead · {t.lead}</span></div>
              </div>
              <div className="divider" />
              <div className="row">
                <AvatarStack ids={t.members} extra={Math.max(0, t.count - t.members.length)} />
                <span className="spacer" />
                <span className="caption t-secondary">{t.count} members · {t.projects} projects</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  const c = COPY[kind];
  const Icon = c.icon;
  return (
    <main className="content">
      <div className="card empty col gap-12" style={{ alignItems: 'center', marginTop: 24 }}>
        <span className="icon-tile" style={{ width: 44, height: 44 }}><Icon size={22} /></span>
        <h1 className="h-section" style={{ color: 'var(--text-primary)' }}>{c.title}</h1>
        <p style={{ maxWidth: 380 }}>{c.text}</p>
        <Link to="/" className="btn btn-secondary">Back to overview</Link>
      </div>
    </main>
  );
}

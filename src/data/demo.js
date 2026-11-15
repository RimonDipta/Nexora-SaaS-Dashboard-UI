// Demo data for the Nexora workspace. Mirrors the canonical data used in the Figma file.
// "Today" in the demo is Monday, November 16, 2026.

export const TODAY = new Date(2026, 10, 16);

export const people = {
  AM: { id: 'AM', name: 'Alex Morgan', role: 'Product Manager', team: 'Product', color: 'indigo', email: 'alex@nexora.studio', access: 'Admin', presence: 'online' },
  SC: { id: 'SC', name: 'Sarah Chen', role: 'UI/UX Designer', team: 'Design', color: 'rose', email: 'sarah@nexora.studio', access: 'Member', presence: 'busy' },
  DK: { id: 'DK', name: 'Daniel Kim', role: 'Frontend Developer', team: 'Engineering', color: 'blue', email: 'daniel@nexora.studio', access: 'Member', presence: 'online' },
  MB: { id: 'MB', name: 'Michael Brown', role: 'Backend Developer', team: 'Engineering', color: 'teal', email: 'michael@nexora.studio', access: 'Member', presence: 'dnd' },
  ED: { id: 'ED', name: 'Emily Davis', role: 'Growth Lead', team: 'Growth', color: 'amber', email: 'emily@nexora.studio', access: 'Admin', presence: 'online' },
  PP: { id: 'PP', name: 'Priya Patel', role: 'QA Engineer', team: 'Engineering', color: 'violet', email: 'priya@nexora.studio', access: 'Member', presence: 'busy' },
  LS: { id: 'LS', name: 'Lucas Silva', role: 'Platform Engineer', team: 'Platform', color: 'green', email: 'lucas@nexora.studio', access: 'Member', presence: 'offline' },
  NW: { id: 'NW', name: 'Nora Williams', role: 'Content Strategist', team: 'Growth', color: 'blue', email: 'nora@nexora.studio', access: 'Member', presence: 'online' },
  JL: { id: 'JL', name: 'James Lee', role: 'Client · Atlas Bank', team: 'Atlas Bank', color: 'indigo', email: 'james@atlasbank.com', access: 'Guest', presence: 'offline' },
};

export const projects = [
  {
    id: 'website-redesign', key: 'WR', name: 'Website Redesign', color: 'indigo', icon: 'globe',
    team: 'Design', owner: 'SC', health: 'On track', state: 'Active', progress: 68,
    members: ['SC', 'DK', 'AM'], extra: 0, due: 'Dec 12', tasksDone: 42, tasksTotal: 62,
    description: 'Rebuild nexora.studio on the new design system — faster pages, clearer pricing and a self-serve demo.',
  },
  {
    id: 'mobile-banking-app', key: 'NX', name: 'Mobile Banking App', color: 'blue', icon: 'zap',
    team: 'Product squad', owner: 'AM', health: 'At risk', state: 'Active', progress: 54,
    members: ['DK', 'MB', 'PP'], extra: 4, due: 'Jan 20', tasksDone: 71, tasksTotal: 131, client: 'Atlas Bank',
    timeline: 'Sep 1 → Jan 20',
    description: 'Biometric onboarding, instant card freeze and spending insights for the Atlas Bank iOS and Android apps.',
  },
  {
    id: 'marketing-campaign-q4', key: 'MC', name: 'Marketing Campaign Q4', color: 'amber', icon: 'send',
    team: 'Growth', owner: 'ED', health: 'On track', state: 'Active', progress: 81,
    members: ['ED', 'NW'], extra: 0, due: 'Dec 5', tasksDone: 38, tasksTotal: 47,
    description: 'Year-end “Clarity” campaign across paid social, lifecycle email and the launch webinar.',
  },
  {
    id: 'customer-portal', key: 'CP', name: 'Customer Portal', color: 'green', icon: 'layers',
    team: 'Platform', owner: 'MB', health: 'Off track', state: 'Active', progress: 37,
    members: ['MB', 'LS', 'DK'], extra: 0, due: 'Dec 19', tasksDone: 29, tasksTotal: 78,
    description: 'Self-serve invoices, SLAs and support tickets for enterprise customers.',
  },
  {
    id: 'design-system-2', key: 'DS', name: 'Design System 2.0', color: 'violet', icon: 'grid',
    team: 'Design ops', owner: 'SC', health: 'On track', state: 'Active', progress: 72,
    members: ['SC', 'DK'], extra: 0, due: 'Jan 8', tasksDone: 57, tasksTotal: 79,
    description: 'Token-based theming, dark mode and 40 audited components shared by web and mobile.',
  },
  {
    id: 'partner-onboarding-hub', key: 'PH', name: 'Partner Onboarding Hub', color: 'teal', icon: 'link',
    team: 'Platform', owner: 'AM', health: 'Planning', state: 'Planning', progress: 12,
    members: ['AM', 'LS'], extra: 0, due: 'Feb 14', tasksDone: 4, tasksTotal: 34,
    description: 'Guided setup, API keys and sandbox data so integration partners go live in a day.',
  },
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
export const projectByName = Object.fromEntries(projects.map((p) => [p.name, p]));

export const kpis = [
  { label: 'Total projects', value: '24', delta: '+3', trend: 'up', icon: 'folder', legend: [['indigo', '12 active'], ['chart2', '5 planning'], ['green', '7 done']] },
  { label: 'Active projects', value: '12', delta: '+20%', trend: 'up', icon: 'zap', foot: 'vs 10 last month' },
  { label: 'Completed tasks', value: '186', delta: '+14%', trend: 'up', icon: 'check', foot: 'vs 163 last month' },
  { label: 'Overdue tasks', value: '7', delta: '−3', trend: 'down', icon: 'alert', foot: 'vs 10 last month' },
];

export const productivity = {
  Week: [
    { label: 'Mon', completed: 6, created: 8 }, { label: 'Tue', completed: 9, created: 10 },
    { label: 'Wed', completed: 7, created: 7 }, { label: 'Thu', completed: 11, created: 9 },
    { label: 'Fri', completed: 8, created: 11 }, { label: 'Sat', completed: 2, created: 1 },
    { label: 'Sun', completed: 1, created: 2 },
  ],
  Month: [
    { label: 'Sep 21', completed: 31, created: 38 }, { label: 'Sep 28', completed: 36, created: 42 },
    { label: 'Oct 5', completed: 33, created: 35 }, { label: 'Oct 12', completed: 39, created: 44 },
    { label: 'Oct 19', completed: 37, created: 40 }, { label: 'Oct 26', completed: 41, created: 47 },
    { label: 'Nov 2', completed: 42, created: 43 }, { label: 'Nov 9', completed: 46, created: 49 },
  ],
  Quarter: [
    { label: 'Jun', completed: 118, created: 131 }, { label: 'Jul', completed: 126, created: 140 },
    { label: 'Aug', completed: 121, created: 129 }, { label: 'Sep', completed: 139, created: 151 },
    { label: 'Oct', completed: 158, created: 166 }, { label: 'Nov', completed: 186, created: 179 },
  ],
};

export const myTasks = {
  Today: [
    { id: 't1', title: 'Review onboarding wireframes', project: 'Mobile Banking App', priority: 'High', time: '10:30', done: false },
    { id: 't2', title: 'Approve Q4 campaign budget', project: 'Marketing Campaign Q4', priority: 'Urgent', time: '12:00', done: false },
    { id: 't3', title: 'Write release notes for v2.4', project: 'Customer Portal', priority: 'Medium', time: '15:00', done: false },
    { id: 't4', title: 'Align token naming with Sarah', project: 'Design System 2.0', priority: 'Low', time: '16:30', done: false },
    { id: 't5', title: 'Post stand-up summary', project: 'Website Redesign', priority: 'None', time: '09:15', done: true },
  ],
  Upcoming: [
    { id: 'u1', title: 'Biometric login API sign-off', project: 'Mobile Banking App', priority: 'Urgent', time: 'Tue', done: false },
    { id: 'u2', title: 'Checkout flow design review', project: 'Mobile Banking App', priority: 'High', time: 'Wed', done: false },
    { id: 'u3', title: 'Webinar run-of-show', project: 'Marketing Campaign Q4', priority: 'Medium', time: 'Thu', done: false },
    { id: 'u4', title: 'Hero motion feedback', project: 'Website Redesign', priority: 'Low', time: 'Fri', done: false },
    { id: 'u5', title: 'Plan Sprint 25', project: 'Mobile Banking App', priority: 'Medium', time: 'Fri', done: false },
    { id: 'u6', title: 'Enterprise beta checklist', project: 'Customer Portal', priority: 'High', time: 'Nov 23', done: false },
    { id: 'u7', title: 'Chart token QA', project: 'Design System 2.0', priority: 'Low', time: 'Nov 28', done: false },
    { id: 'u8', title: 'Partner hub kickoff deck', project: 'Partner Onboarding Hub', priority: 'Medium', time: 'Dec 1', done: false },
  ],
  Overdue: [
    { id: 'o1', title: 'Paid social creative — round 2', project: 'Marketing Campaign Q4', priority: 'High', time: 'Nov 14', done: false },
    { id: 'o2', title: 'SLA copy for enterprise tier', project: 'Customer Portal', priority: 'Medium', time: 'Nov 13', done: false },
  ],
};

export const activity = [
  { who: 'SC', verb: 'commented on', target: 'Card freeze flow', time: '12m', project: 'Mobile Banking App' },
  { who: 'DK', verb: 'moved NX-142 to', target: 'In Progress', time: '34m', project: 'Mobile Banking App', plainTarget: true },
  { who: 'ED', verb: 'assigned you', target: 'Approve Q4 campaign budget', time: '1h', project: 'Marketing Campaign Q4' },
  { who: 'MB', verb: 'mentioned you in', target: 'API rate limits', time: '2h', project: 'Customer Portal' },
  { who: 'PP', verb: 'uploaded', target: 'regression-report-v2.4.pdf', time: '3h', project: 'Customer Portal' },
];

export const STATUSES = ['In Progress', 'To Do', 'In Review', 'Backlog', 'Done'];

export const tasks = [
  { id: 'NX-142', title: 'Build checkout flow for mobile web', project: 'Mobile Banking App', status: 'In Progress', priority: 'High', assignee: 'DK', due: 'Nov 18', labels: ['Frontend', 'Mobile'] },
  { id: 'NX-156', title: 'Biometric login API integration', project: 'Mobile Banking App', status: 'In Progress', priority: 'Urgent', assignee: 'MB', due: 'Nov 17', labels: ['Backend'] },
  { id: 'NX-131', title: 'Hero section motion prototype', project: 'Website Redesign', status: 'In Progress', priority: 'Medium', assignee: 'SC', due: 'Nov 20', labels: ['Design'] },
  { id: 'NX-118', title: 'Draft webinar landing page copy', project: 'Marketing Campaign Q4', status: 'In Progress', priority: 'Medium', assignee: 'NW', due: 'Nov 19', labels: ['Content'] },
  { id: 'NX-163', title: 'Regression suite for card freeze', project: 'Mobile Banking App', status: 'To Do', priority: 'High', assignee: 'PP', due: 'Nov 21', labels: ['QA'] },
  { id: 'NX-149', title: 'Invoice PDF export', project: 'Customer Portal', status: 'To Do', priority: 'Medium', assignee: 'MB', due: 'Nov 25', labels: ['Backend'] },
  { id: 'NX-170', title: 'Dark-mode tokens for charts', project: 'Design System 2.0', status: 'To Do', priority: 'Low', assignee: 'SC', due: 'Nov 28', labels: ['Design'] },
  { id: 'NX-122', title: 'Paid social creative — round 2', project: 'Marketing Campaign Q4', status: 'To Do', priority: 'High', assignee: 'ED', due: 'Nov 14', overdue: true, labels: ['Content'] },
  { id: 'NX-137', title: 'SLA dashboard empty states', project: 'Customer Portal', status: 'In Review', priority: 'Medium', assignee: 'SC', due: 'Nov 18', labels: ['Design'] },
  { id: 'NX-128', title: 'Staging CDN cache rules', project: 'Website Redesign', status: 'In Review', priority: 'Low', assignee: 'LS', due: 'Nov 17', labels: ['Platform'] },
  { id: 'NX-181', title: 'Spending insights — category rules', project: 'Mobile Banking App', status: 'Backlog', priority: 'Low', assignee: 'MB', due: 'Dec 2', labels: ['Backend'] },
  { id: 'NX-184', title: 'Home-screen widget for balance at a glance', project: 'Mobile Banking App', status: 'Backlog', priority: 'None', assignee: null, due: 'Dec 9', labels: ['Mobile'] },
  { id: 'NX-190', title: 'Localise onboarding for ES and PT', project: 'Mobile Banking App', status: 'Backlog', priority: 'Low', assignee: 'NW', due: 'Dec 10', labels: ['Content'] },
  { id: 'NX-152', title: 'Document API rate limits for enterprise tier', project: 'Customer Portal', status: 'Backlog', priority: 'Medium', assignee: 'MB', due: 'Nov 20', labels: ['Backend'] },
  { id: 'NX-160', title: 'Enterprise SSO settings page', project: 'Customer Portal', status: 'Backlog', priority: 'High', assignee: 'DK', due: 'Dec 4', labels: ['Frontend'] },
  { id: 'NX-108', title: 'Pricing page comparison table', project: 'Website Redesign', status: 'Backlog', priority: 'Medium', assignee: 'SC', due: 'Dec 8', labels: ['Design'] },
  { id: 'NX-174', title: 'Lifecycle email — week 2 nudge', project: 'Marketing Campaign Q4', status: 'Backlog', priority: 'Low', assignee: 'NW', due: 'Dec 1', labels: ['Content'] },
  { id: 'NX-177', title: 'Button focus-ring audit', project: 'Design System 2.0', status: 'Backlog', priority: 'Low', assignee: 'SC', due: 'Dec 11', labels: ['Design'] },
  { id: 'NX-179', title: 'Partner sandbox seed data', project: 'Partner Onboarding Hub', status: 'Backlog', priority: 'Medium', assignee: 'LS', due: 'Jan 6', labels: ['Platform'] },
  { id: 'NX-101', title: 'Discovery interviews synthesis', project: 'Mobile Banking App', status: 'Done', priority: 'Medium', assignee: 'AM', due: 'Sep 24', labels: ['Research'] },
  { id: 'NX-110', title: 'Onboarding flow v3 wireframes', project: 'Mobile Banking App', status: 'Done', priority: 'High', assignee: 'SC', due: 'Oct 9', labels: ['Design'] },
  { id: 'NX-115', title: 'Card freeze API contract', project: 'Mobile Banking App', status: 'Done', priority: 'High', assignee: 'MB', due: 'Oct 21', labels: ['Backend'] },
  { id: 'NX-120', title: 'Migrate blog to new CMS', project: 'Website Redesign', status: 'Done', priority: 'Medium', assignee: 'NW', due: 'Oct 30', labels: ['Content'] },
];

export const statusCounts = { 'In Progress': 4, 'To Do': 4, 'In Review': 2, Backlog: 9, Done: 34 };

export const subtasks = [
  { title: 'Cart review screen', done: true, who: 'DK' },
  { title: 'Address + delivery slot picker', done: true, who: 'DK' },
  { title: 'Apple Pay / Google Pay sheet', done: true, who: 'MB' },
  { title: 'Error & retry states', done: false, who: 'DK' },
  { title: 'Analytics events', done: false, who: 'MB' },
];

export const comments = [
  { who: 'SC', time: '2h ago', text: 'Updated the payment sheet in Figma — the Pay button now sits above the fold on 375px screens.' },
  { who: 'DK', time: '1h ago', text: 'Nice. I’ll wire the new sheet today; error states still need copy.' },
  { who: 'NW', time: '48m ago', text: 'Copy for the declined-card and timeout states is in the doc, tagged for review.' },
  { who: 'AM', time: '20m ago', text: 'Looks good — let’s demo this at Wednesday’s review.' },
];

// Kanban board for Mobile Banking App
export const board = [
  {
    status: 'Backlog', count: 12,
    cards: [
      { id: 'NX-181', title: 'Spending insights — category rules', labels: ['Backend'], due: 'Dec 2', comments: 1, priority: 'Low', who: 'MB' },
      { id: 'NX-184', title: 'Home-screen widget for balance at a glance', labels: ['Mobile'], due: 'Dec 9', priority: 'None' },
      { id: 'NX-190', title: 'Localise onboarding for ES and PT', labels: ['Content'], due: 'Dec 10', comments: 2, priority: 'Low', who: 'NW' },
    ],
  },
  {
    status: 'To Do', count: 21,
    cards: [
      { id: 'NX-171', title: 'Offline state for card freeze', labels: ['Mobile'], due: 'Nov 21', priority: 'High', who: 'DK' },
      { id: 'NX-163', title: 'Regression suite for card freeze', labels: ['QA'], due: 'Nov 21', comments: 3, files: 1, priority: 'High', who: 'PP' },
      { id: 'NX-165', title: 'Push notification copy for card events', labels: ['Content'], due: 'Nov 24', priority: 'Medium', who: 'NW' },
      { id: 'NX-176', title: 'Rate-limit biometric retries', labels: ['Backend', 'Security'], due: 'Nov 26', comments: 1, priority: 'High', who: 'MB' },
    ],
  },
  {
    status: 'In Progress', count: 18, wip: '18/20',
    cards: [
      { id: 'NX-142', title: 'Build checkout flow for mobile web', labels: ['Frontend', 'Mobile'], due: 'Nov 18', comments: 4, files: 2, priority: 'High', who: 'DK' },
      { id: 'NX-156', title: 'Biometric login API integration', labels: ['Backend'], due: 'Nov 17', comments: 6, files: 1, priority: 'Urgent', who: 'MB' },
      { id: 'NX-158', title: 'Face ID fallback screens', labels: ['Design'], due: 'Nov 19', comments: 2, files: 3, priority: 'Medium', who: 'SC' },
    ],
  },
  {
    status: 'In Review', count: 9,
    cards: [
      { id: 'NX-144', title: 'KYC document upload', labels: ['Backend'], due: 'Nov 18', comments: 5, priority: 'High', who: 'MB' },
      { id: 'NX-139', title: 'Card-freeze toggle animation', labels: ['Design', 'Mobile'], due: 'Nov 17', comments: 3, files: 1, priority: 'Low', who: 'SC' },
    ],
  },
  {
    status: 'Done', count: 71,
    cards: [
      { id: 'NX-127', title: 'Onboarding — identity check copy', labels: ['Design'], due: 'Nov 12', priority: 'Medium', who: 'SC' },
      { id: 'NX-121', title: 'Biometric enrolment spike', labels: ['Backend'], due: 'Nov 10', comments: 2, priority: 'High', who: 'MB' },
    ],
  },
];

export const labelColors = {
  Backend: 'teal', Frontend: 'blue', Mobile: 'violet', QA: 'indigo', Content: 'amber', Design: 'rose',
  Security: 'indigo', Platform: 'green', Research: 'blue',
};

export const milestones = [
  { title: 'Discovery & research', date: 'Sep 1 – Sep 26', state: 'Completed' },
  { title: 'UX & visual design', date: 'Sep 29 – Oct 31', state: 'Completed' },
  { title: 'Biometric onboarding', date: 'Nov 3 – Nov 21 · 14 of 20 tasks done', state: 'On track', current: true, progress: 70 },
  { title: 'Beta release (TestFlight)', date: 'Nov 24 · blocked by QA capacity', state: 'At risk', milestone: true },
  { title: 'App Store & Play launch', date: 'Jan 20', state: 'Planning', milestone: true },
];

export const projectTeam = [
  { who: 'AM', role: 'Product Manager · Owner', tasks: 12 },
  { who: 'DK', role: 'Frontend Developer', tasks: 24 },
  { who: 'MB', role: 'Backend Developer', tasks: 19 },
  { who: 'PP', role: 'QA Engineer', tasks: 15 },
  { who: 'SC', role: 'UI/UX Designer', tasks: 9 },
];

export const breakdown = [
  { label: 'Done', count: 71, pct: 54, color: 'var(--status-success)' },
  { label: 'In Review', count: 9, pct: 7, color: 'var(--accent-default)' },
  { label: 'In Progress', count: 18, pct: 14, color: 'var(--status-warning)' },
  { label: 'To Do', count: 21, pct: 16, color: 'var(--text-secondary)' },
  { label: 'Backlog', count: 12, pct: 9, color: 'var(--border-strong)' },
];

// Calendar — November 2026 (keys are "YYYY-MM-DD")
export const calendarEvents = {
  '2026-11-02': [{ title: 'Sprint 23 planning', color: 'blue' }],
  '2026-11-04': [{ title: 'Atlas Bank sync', color: 'blue' }],
  '2026-11-06': [{ title: 'Onboarding workshop', color: 'blue', muted: true }],
  '2026-11-10': [{ title: 'Design review', color: 'indigo' }, { title: 'Enrollment API', color: 'blue', muted: true }],
  '2026-11-12': [{ title: 'Creative due', color: 'amber' }],
  '2026-11-14': [{ title: 'Paid social r2', color: 'rose', overdue: true }],
  '2026-11-16': [{ title: 'Sprint 24 kickoff', color: 'blue' }, { title: 'Wireframe review', color: 'blue' }],
  '2026-11-17': [{ title: 'Biometric API', color: 'blue' }, { title: 'CDN cache rules', color: 'indigo' }],
  '2026-11-18': [{ title: 'Checkout flow', color: 'blue' }, { title: 'SLA empty states', color: 'green' }, { title: 'KYC upload', color: 'blue' }, { title: 'Design crit', color: 'violet' }],
  '2026-11-19': [{ title: 'Webinar copy', color: 'amber' }],
  '2026-11-20': [{ title: 'Hero motion', color: 'indigo' }],
  '2026-11-21': [{ title: 'Biometric onboarding', color: 'blue', milestone: true }, { title: 'Regression suite', color: 'blue' }],
  '2026-11-24': [{ title: 'Beta release', color: 'blue', milestone: true }],
  '2026-11-25': [{ title: 'Invoice export', color: 'green' }],
  '2026-11-26': [{ title: 'Office closed — Thanksgiving', color: 'neutral' }],
  '2026-11-28': [{ title: 'Chart tokens', color: 'violet' }],
  '2026-12-01': [{ title: 'Campaign launch', color: 'amber', milestone: true }],
  '2026-12-02': [{ title: 'Spending insights', color: 'blue' }],
  '2026-12-05': [{ title: 'Q4 wrap-up', color: 'amber' }],
};

export const calendarSpans = [
  { title: 'QA regression window · Priya Patel', start: '2026-11-23', end: '2026-11-28', color: 'violet' },
];

export const agendaToday = [
  { time: '09:30 – 10:00', title: 'Sprint 24 kickoff', meta: 'Product squad · Zoom', color: 'blue' },
  { time: '14:00 – 14:45', title: 'Wireframe review', meta: 'Mobile Banking App · with Sarah', color: 'blue' },
];

export const agendaUpcoming = [
  { date: 'Tue, Nov 17', title: 'Biometric login API', meta: 'Due · Michael Brown', color: 'blue' },
  { date: 'Wed, Nov 18', title: 'Checkout flow for mobile web', meta: 'Due · Daniel Kim', color: 'blue' },
  { date: 'Sat, Nov 21', title: 'Biometric onboarding', meta: 'Milestone · Mobile Banking App', color: 'blue', milestone: true },
  { date: 'Tue, Nov 24', title: 'Beta release (TestFlight)', meta: 'Milestone · at risk', color: 'blue', milestone: true },
  { date: 'Tue, Dec 1', title: 'Campaign launch', meta: 'Milestone · Marketing Campaign Q4', color: 'amber', milestone: true },
];

// Timeline (Gantt). Dates are day offsets from Oct 26, 2026; 1 week = 7 units.
export const timelineRows = [
  { type: 'project', name: 'Mobile Banking App', color: 'blue', pct: 54, start: 0, end: 86, progressEnd: 21, health: 'At risk', healthInside: true },
  { type: 'task', name: 'Biometric onboarding', state: 'progress', who: 'DK', start: 8, end: 26, progressEnd: 21, color: 'blue' },
  { type: 'task', name: 'QA regression window', state: 'todo', who: 'PP', start: 28, end: 39, color: 'blue', label: 'QA regression window', dependsOn: true },
  { type: 'milestone', name: 'Beta release', date: 'Nov 24', at: 29, color: 'blue' },
  { type: 'task', name: 'Store submission & review', state: 'todo', who: 'AM', start: 42, end: 81, color: 'blue', inside: true },
  { type: 'milestone', name: 'Public launch', date: 'Jan 20', at: 86, color: 'blue', labelLeft: true },
  { type: 'project', name: 'Website Redesign', color: 'indigo', pct: 68, start: 0, end: 47, progressEnd: 24, health: 'On track' },
  { type: 'task', name: 'Content migration', state: 'progress', who: 'NW', start: 0, end: 25, progressEnd: 20, color: 'indigo', inside: true, label: 'Content migration · 80%' },
  { type: 'task', name: 'Build & QA', state: 'progress', who: 'DK', start: 21, end: 44, progressEnd: 27, color: 'indigo', inside: true, label: 'Build & QA · 25%', dependsOn: true },
  { type: 'milestone', name: 'Go-live', date: 'Dec 12', at: 47, color: 'indigo' },
  { type: 'project', name: 'Marketing Campaign Q4', color: 'amber', pct: 81, start: 0, end: 40, progressEnd: 30, health: 'On track' },
  { type: 'milestone', name: 'Campaign launch', date: 'Dec 1', at: 36, color: 'amber' },
  { type: 'project', name: 'Customer Portal', color: 'green', pct: 37, start: 0, end: 54, progressEnd: 16, health: 'Off track' },
  { type: 'project', name: 'Design System 2.0', color: 'violet', pct: 72, start: 0, end: 74, progressEnd: 47, health: 'On track' },
];

export const membersStats = [
  { label: 'Members', value: 24, foot: '+3 this month' },
  { label: 'Available now', value: 16, foot: '67% of the team', dot: 'green' },
  { label: 'Away or OOO', value: 3, foot: 'Lucas back Nov 23', dot: 'amber' },
  { label: 'Pending invites', value: 2, foot: 'Expire in 5 days', dot: 'neutral' },
];

export const membersRows = [
  { who: 'AM', projects: ['blue', 'indigo', 'green'], hours: 32, cap: 40, availability: 'Available', avail: 'green', active: 'Now' },
  { who: 'SC', projects: ['blue', 'violet', 'green'], hours: 30, cap: 40, availability: 'In a meeting · until 14:45', avail: 'amber', active: 'Now' },
  { who: 'DK', projects: ['blue', 'indigo', 'green'], hours: 46, cap: 40, availability: 'Available', avail: 'green', active: 'Now' },
  { who: 'MB', projects: ['blue', 'green'], hours: 38, cap: 40, availability: 'Focus time', avail: 'red', active: '12m ago' },
  { who: 'ED', projects: ['amber'], hours: 28, cap: 40, availability: 'Available', avail: 'green', active: 'Now' },
  { who: 'PP', projects: ['blue', 'green'], hours: 35, cap: 40, availability: 'Away', avail: 'amber', active: '1h ago' },
  { who: 'LS', projects: ['green', 'teal'], hours: 0, cap: 40, availability: 'OOO · back Nov 23', avail: 'neutral', active: '3d ago' },
  { who: 'NW', projects: ['amber', 'blue'], hours: 24, cap: 32, availability: 'Available', avail: 'green', active: 'Now' },
  { who: 'JL', projects: ['blue'], hours: 6, cap: 16, availability: 'Offline', avail: 'neutral', active: 'Yesterday' },
];

export const workloadRows = [
  { who: 'DK', done: 14, prog: 18, todo: 14, cap: 40 },
  { who: 'MB', done: 12, prog: 16, todo: 10, cap: 40 },
  { who: 'PP', done: 10, prog: 14, todo: 11, cap: 40 },
  { who: 'AM', done: 12, prog: 10, todo: 10, cap: 40 },
  { who: 'SC', done: 11, prog: 10, todo: 9, cap: 40 },
  { who: 'ED', done: 12, prog: 8, todo: 8, cap: 40 },
  { who: 'NW', done: 8, prog: 8, todo: 8, cap: 32 },
  { who: 'LS', ooo: 'Out of office until Nov 20', cap: 40 },
];

export const heatmap = {
  weeks: [
    { label: 'Week of Nov 16', days: ['M 16', 'T 17', 'W 18', 'T 19', 'F 20'] },
    { label: 'Week of Nov 23', days: ['M 23', 'T 24', 'W 25', 'T 26', 'F 27'] },
  ],
  rows: [
    { who: 'AM', v: [7, 8, 6, 7, 4, 6, 7, 7, null, 3] },
    { who: 'SC', v: [6, 7, 6, 8, 3, 7, 6, 8, null, 4] },
    { who: 'DK', v: [9, 10, 11, 8, 8, 8, 9, 8, null, 6] },
    { who: 'MB', v: [8, 8, 8, 7, 7, 9, 8, 8, null, 5] },
    { who: 'PP', v: [7, 7, 6, 8, 7, 9, 9, 10, null, 8] },
    { who: 'ED', v: [5, 6, 7, 5, 5, 6, 8, 9, null, 4] },
    { who: 'NW', v: [5, 4, 6, 5, 4, 5, 6, 5, null, 3] },
  ],
};

export const inbox = [
  {
    id: 'n1', group: 'Today', unread: true, who: 'MB', badge: 'mention', kind: 'Mentions',
    html: [['b', 'Michael Brown'], ['t', ' mentioned you in '], ['b', 'API rate limits']],
    quote: '“@Alex the rate-limit doc is ready for review.”', project: 'Customer Portal', time: '2h ago', taskId: 'NX-152',
  },
  {
    id: 'n2', group: 'Today', unread: true, who: 'ED', badge: 'assign', kind: 'Assigned',
    html: [['b', 'Emily Davis'], ['t', ' assigned you '], ['b', 'Approve Q4 campaign budget']],
    project: 'Marketing Campaign Q4', time: '1h ago', actions: true,
  },
  {
    id: 'n3', group: 'Today', unread: true, who: 'SC', badge: 'comment', kind: 'Mentions',
    html: [['b', 'Sarah Chen'], ['t', ' commented on '], ['b', 'Card freeze flow']],
    quote: '“Keep the confirm step — people freeze cards in a panic.”', project: 'Mobile Banking App', time: '12m ago',
  },
  {
    id: 'n4', group: 'Today', who: null, badge: 'reminder', kind: 'Reminders',
    html: [['b', 'NX-156'], ['t', ' Biometric login API integration is due tomorrow']],
    project: 'Mobile Banking App', time: '09:00',
  },
  {
    id: 'n5', group: 'Today', who: 'DK', badge: 'status', kind: 'Assigned',
    html: [['b', 'Daniel Kim'], ['t', ' moved NX-142 to In Progress']], project: 'Mobile Banking App', time: '34m ago',
  },
  {
    id: 'n6', group: 'Yesterday', who: 'MB', badge: 'health', kind: 'All',
    html: [['b', 'Customer Portal'], ['t', ' health changed to '], ['b', 'Off track']], project: 'Customer Portal', time: 'Sun 16:40',
  },
  {
    id: 'n7', group: 'Yesterday', who: null, badge: 'reminder', kind: 'Reminders',
    html: [['b', 'NX-122'], ['t', ' Paid social creative — round 2 is 1 day overdue']], project: 'Marketing Campaign Q4', time: 'Sun 09:00',
  },
  {
    id: 'n8', group: 'Earlier this week', who: 'LS', badge: 'milestone', kind: 'All',
    html: [['b', 'Lucas Silva'], ['t', ' completed milestone '], ['b', 'Staging environment ready']], project: 'Customer Portal', time: 'Thu',
  },
];

export const notifications = inbox.slice(0, 5);

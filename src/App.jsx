import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import './styles/pages.css';

const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Members = lazy(() => import('./pages/Members'));
const Workload = lazy(() => import('./pages/Workload'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Settings = lazy(() => import('./pages/Settings'));
const Placeholder = lazy(() => import('./pages/Placeholder'));

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="projects/:id/:tab" element={<ProjectDetail />} />
              <Route path="members" element={<Members />} />
              <Route path="workload" element={<Workload />} />
              <Route path="settings" element={<Settings />} />
              <Route path="teams" element={<Placeholder kind="teams" />} />
              <Route path="goals" element={<Placeholder kind="goals" />} />
              <Route path="reports" element={<Placeholder kind="reports" />} />
              <Route path="time-tracking" element={<Placeholder kind="time" />} />
              <Route path="*" element={<Placeholder kind="404" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}

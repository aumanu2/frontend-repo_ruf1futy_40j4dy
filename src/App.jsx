import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import KanbanBoard from './components/KanbanBoard';
import { sampleTasks } from './components/DummyData';

function App() {
  const [search, setSearch] = useState('');
  const [compact, setCompact] = useState(false);
  const [filters, setFilters] = useState({ project: '', priority: '', status: '' });

  const tasks = useMemo(() => {
    return sampleTasks.filter((t) => {
      const matchesSearch = [
        t.objective,
        t.project,
        t.subProject,
        t.assignedBy,
        t.assignedTo,
        t.skill,
        t.role,
        t.taskType,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesProject = filters.project ? t.project === filters.project : true;
      const matchesPriority = filters.priority ? t.priority === filters.priority : true;
      const matchesStatus = filters.status ? t.status === filters.status : true;
      return matchesSearch && matchesProject && matchesPriority && matchesStatus;
    });
  }, [search, filters]);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'kanban_tasks.json');
    a.click();
  };

  const clearFilters = () => setFilters({ project: '', priority: '', status: '' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900">
      <Header search={search} setSearch={setSearch} compact={compact} setCompact={setCompact} onExport={handleExport} />
      <Filters state={filters} setState={setFilters} clearAll={clearFilters} />

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KanbanBoard tasks={tasks} compact={compact} />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500">Premium Kanban UI • Responsive • Enterprise Grade</footer>
    </div>
  );
}

export default App;

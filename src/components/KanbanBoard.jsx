import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const columns = [
  { key: 'Backlog', title: 'Backlog' },
  { key: 'To Do', title: 'To Do' },
  { key: 'In Progress', title: 'In Progress' },
  { key: 'Under Review', title: 'Under Review' },
  { key: 'Completed', title: 'Completed' },
];

const ColumnHeader = ({ title, count, accent }) => (
  <div className="px-3 pt-3 pb-2">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700 tracking-wide">{title}</h3>
      <span className={`text-xs px-2 py-0.5 rounded-full bg-${accent}-100 text-${accent}-700`}>{count}</span>
    </div>
  </div>
);

const accentFor = (key) => {
  switch (key) {
    case 'Backlog':
      return 'slate';
    case 'To Do':
      return 'sky';
    case 'In Progress':
      return 'amber';
    case 'Under Review':
      return 'violet';
    case 'Completed':
      return 'emerald';
    default:
      return 'slate';
  }
};

const KanbanBoard = ({ tasks, compact, onMove }) => {
  const grouped = useMemo(() => {
    const g = { 'Backlog': [], 'To Do': [], 'In Progress': [], 'Under Review': [], 'Completed': [] };
    tasks.forEach((t) => {
      if (g[t.status]) g[t.status].push(t);
      else g['Backlog'].push(t);
    });
    return g;
  }, [tasks]);

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 max-w-7xl mx-auto">
        {columns.map((col) => (
          <div key={col.key} className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[60vh]">
            <ColumnHeader title={col.title} count={grouped[col.key]?.length || 0} accent={accentFor(col.key)} />
            <div className="px-3 pb-3 space-y-3 flex-1 overflow-auto">
              {grouped[col.key]?.map((task) => (
                <TaskCard key={task.id} task={task} compact={compact} />
              ))}
              {grouped[col.key]?.length === 0 && (
                <div className="h-24 rounded-lg border border-dashed border-slate-200 text-slate-400 text-sm grid place-items-center">
                  Empty
                </div>
              )}
            </div>
            <button className="m-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm">
              <Plus size={16} /> Add task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

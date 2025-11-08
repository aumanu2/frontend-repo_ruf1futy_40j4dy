import React from 'react';
import { ChevronDown, X } from 'lucide-react';

const Badge = ({ children, color = 'slate' }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-${color}-100 text-${color}-700`}>{children}</span>
);

const Select = ({ label, value, onChange, options }) => {
  return (
    <div className="min-w-[180px]">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

const Filters = ({ state, setState, clearAll }) => {
  return (
    <div className="w-full bg-white/70 supports-[backdrop-filter]:bg-white/60 backdrop-blur py-3 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 flex-wrap">
        <Select label="Project" value={state.project} onChange={(v) => setState((s) => ({ ...s, project: v }))} options={[
          { label: 'All', value: '' },
          { label: 'Apollo', value: 'Apollo' },
          { label: 'Hermes', value: 'Hermes' },
          { label: 'Zephyr', value: 'Zephyr' },
        ]} />
        <Select label="Priority" value={state.priority} onChange={(v) => setState((s) => ({ ...s, priority: v }))} options={[
          { label: 'All', value: '' },
          { label: 'High', value: 'High' },
          { label: 'Medium', value: 'Medium' },
          { label: 'Low', value: 'Low' },
        ]} />
        <Select label="Status" value={state.status} onChange={(v) => setState((s) => ({ ...s, status: v }))} options={[
          { label: 'All', value: '' },
          { label: 'Backlog', value: 'Backlog' },
          { label: 'To Do', value: 'To Do' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Under Review', value: 'Under Review' },
          { label: 'Completed', value: 'Completed' },
        ]} />

        <div className="flex-1" />

        <button onClick={clearAll} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <X size={16} /> Clear filters
        </button>
      </div>
    </div>
  );
};

export default Filters;

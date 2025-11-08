import React from 'react';
import { Search, Filter, Download, Rocket } from 'lucide-react';

const Header = ({ search, setSearch, compact, setCompact, onExport }) => {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-white grid place-items-center shadow-lg shadow-indigo-500/20">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">Enterprise Kanban</h1>
            <p className="text-xs sm:text-sm text-slate-500">Task Management System</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3 w-full max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, people, projects..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
            />
          </div>

          <button
            onClick={() => setCompact((v) => !v)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm text-slate-700"
          >
            <Filter size={16} />
            {compact ? 'Expanded' : 'Compact'} View
          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
          >
            <Download size={16} /> Export JSON
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

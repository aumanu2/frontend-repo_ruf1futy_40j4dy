import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Flag, Bot, Link, User, Timer, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

const priorityMap = {
  High: { bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Low: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const statusColor = (status) => {
  switch (status) {
    case 'Not Started':
    case 'Backlog':
      return 'text-slate-600';
    case 'In Progress':
      return 'text-amber-700';
    case 'Review':
    case 'Under Review':
      return 'text-violet-700';
    case 'Completed':
      return 'text-emerald-700';
    case 'Blocked':
      return 'text-rose-700';
    default:
      return 'text-slate-600';
  }
};

const Tag = ({ label }) => (
  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">{label}</span>
);

const Progress = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-sky-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
    <span className="text-xs text-slate-600 tabular-nums">{value}%</span>
  </div>
);

const Row = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <div className="flex items-center gap-2 text-slate-500 min-w-[160px]">
      {Icon && <Icon size={14} className="shrink-0" />}
      <span className="whitespace-nowrap">{label}</span>
    </div>
    <div className="text-slate-800 font-medium text-right break-words">{value || '-'}</div>
  </div>
);

const TaskCard = ({ task, compact = false }) => {
  const [expanded, setExpanded] = useState(!compact);

  const pri = priorityMap[task.priority] || priorityMap.Medium;
  const isAI = task.ai === 'Yes' || task.ai === true;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${pri.bg} ${pri.text} text-xs font-semibold`}> 
            <span className={`h-2 w-2 rounded-full ${pri.dot}`} />
            {task.priority || 'Medium'}
          </div>
          {isAI && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-semibold">
              <Bot size={14} /> AI
            </span>
          )}
          <div className="ml-auto flex items-center gap-2 text-slate-500">
            <span className={`text-xs font-medium ${statusColor(task.status)}`}>{task.status}</span>
            <button onClick={() => setExpanded((v) => !v)} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <div className="text-base font-semibold text-slate-900">{task.objective}</div>
          <div className="text-sm text-slate-500">{task.project}{task.subProject ? ` • ${task.subProject}` : ''}</div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {task.skill && <Tag label={task.skill} />}
          {task.role && <Tag label={task.role} />}
          {task.taskType && <Tag label={task.taskType} />}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Row label="Assigned By" value={task.assignedBy} icon={User} />
          <Row label="Task Assigned" value={task.assignedTo} icon={User} />
          <Row label="A. Date" value={task.assignedDate} icon={Calendar} />
          <Row label="Deadline" value={task.deadline} icon={Clock} />
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            <Row label="Parent Task" value={task.parentTask} />
            <Row label="Task Profile" value={task.taskProfile} />
            <Row label="Working Date" value={task.workingDate} />
            <Row label="Estimated Time" value={task.estimatedTime} icon={Timer} />
            <Row label="Start Time" value={task.startTime} icon={Clock} />
            <Row label="End Time" value={task.endTime} icon={Clock} />
            <Row label="Time Taken" value={task.timeTaken} icon={Timer} />
            <Row label="Report Link / Notes" value={task.reportLink || task.notes} icon={Link} />
            <Row label="Review Status" value={task.reviewStatus} icon={CheckCircle2} />
            <Row label="Resource Utilised" value={task.resourceUtilised} />
            <Row label="Feedback Implemented" value={task.feedbackImplemented ? 'Yes' : 'No'} />
            <Row label="Start Date" value={task.startDate} />
            <Row label="Submitted Date" value={task.submittedDate} />
            <Row label="Reviewed Date" value={task.reviewedDate} />
            <Row label="Reviewed By" value={task.reviewedBy} />
            <Row label="Review Notes" value={task.reviewNotes} />
            <Row label="Skills Achieved" value={task.skillsAchieved} />
          </div>
        )}

        <div className="mt-4">
          <Progress value={task.completion || 0} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

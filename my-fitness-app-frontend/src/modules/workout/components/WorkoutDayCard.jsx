import React from 'react';
import { Dumbbell, Moon } from 'lucide-react';

export const WorkoutDayCard = ({ day, workoutName, restDay, onChange, error }) => {
  return (
    <div className={`p-4 rounded-xl border transition-all ${restDay ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm hover:border-indigo-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-700 flex items-center gap-2">
          {restDay ? <Moon className="w-4 h-4 text-gray-400" /> : <Dumbbell className="w-4 h-4 text-indigo-600" />}
          {day}
        </span>
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={restDay}
            onChange={(e) => onChange('restDay', e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          Rest Day
        </label>
      </div>

      <input
        type="text"
        placeholder={restDay ? 'Rest & Recovery' : 'e.g., Push Day (Bench, OHP)'}
        disabled={restDay}
        value={workoutName}
        onChange={(e) => onChange('workoutName', e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
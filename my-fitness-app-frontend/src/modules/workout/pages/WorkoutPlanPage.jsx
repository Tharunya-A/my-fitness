import React, { useState } from 'react';
import { useFormErrors } from '../../../shared/hooks/useFormErrors';
import { axiosClient } from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../config/api.config';

const DAYS_OF_WEEK = [
  { label: 'Monday', value: 'mon' },
  { label: 'Tuesday', value: 'tue' },
  { label: 'Wednesday', value: 'wed' },
  { label: 'Thursday', value: 'thu' },
  { label: 'Friday', value: 'fri' },
  { label: 'Saturday', value: 'sat' },
  { label: 'Sunday', value: 'sun' },
];

export const WorkoutPlanPage = () => {
  const { fieldErrors, globalError, handleError, clearAllErrors } = useFormErrors();
  const [loading, setLoading] = useState(false);

  const [routine, setRoutine] = useState({
    name: '',
    weekStartDate: new Date().toISOString().split('T')[0],
    days: DAYS_OF_WEEK.map((d) => ({
      dayOfWeek: d.value,
      exercises: '',
    })),
  });

  const handleDayChange = (index, value) => {
    const updatedDays = [...routine.days];
    updatedDays[index].exercises = value;
    setRoutine({ ...routine, days: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();
    setLoading(true);

    // Convert HTML date (YYYY-MM-DD) to ISO datetime string
    const formattedDate = routine.weekStartDate 
        ? new Date(routine.weekStartDate).toISOString() 
        : new Date().toISOString();
    // Format payload strictly to meet backend schema requirements
    const payload = {
      name: routine.name,
      weekStartDate: formattedDate,
      days: routine.days.map((d) => ({
        dayOfWeek: d.dayOfWeek,
        exercises: d.exercises ? d.exercises.split(',').map((e) => e.trim()) : [],
      })),
    };

    try {
      await axiosClient.post(API_ENDPOINTS.WORKOUT.PLANS, payload);
      alert('Routine saved successfully!');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Workout Routine</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Global & Field Error Display */}
        {globalError && (
          <div className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200 space-y-2">
            <p className="font-semibold">{globalError}</p>
            {Object.keys(fieldErrors).length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(fieldErrors).map(([field, msg]) => (
                  <li key={field}>
                    <span className="font-medium capitalize">{field}</span>: {msg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Routine Header Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Routine Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Push Pull Legs"
              value={routine.name}
              onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Week Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={routine.weekStartDate}
              onChange={(e) => setRoutine({ ...routine, weekStartDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Weekly Day Inputs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Schedule</h2>
          {DAYS_OF_WEEK.map((day, idx) => (
            <div key={day.value} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <span className="w-28 font-medium text-gray-700">{day.label}</span>
              <input
                type="text"
                placeholder="Exercises (comma separated, e.g. Bench Press, Pushups)"
                value={routine.days[idx].exercises}
                onChange={(e) => handleDayChange(idx, e.target.value)}
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving Routine...' : 'Save Routine'}
        </button>
      </form>
    </div>
  );
};
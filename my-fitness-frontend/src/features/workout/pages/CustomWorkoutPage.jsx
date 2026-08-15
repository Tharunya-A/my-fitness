import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutPlan } from '../hooks/useWorkoutPlan.js';
import { Input } from '../../../shared/components/ui/Input.jsx';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { ExerciseCard } from '../components/ExerciseCard.jsx';
import { Plus, Trash2, ArrowLeft, Dumbbell, Save, AlertCircle } from 'lucide-react';

export const CustomWorkoutPage = () => {
  const navigate = useNavigate();
  const { savePlan, isLoading, error } = useWorkoutPlan();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([
    { id: Date.now(), name: 'Barbell Bench Press', muscleGroup: 'Chest', sets: 4, reps: '8-10', restSeconds: 90 },
  ]);

  const handleAddExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: Date.now(), name: '', muscleGroup: 'Chest', sets: 3, reps: '10-12', restSeconds: 60 },
    ]);
  };

  const handleUpdateExercise = (id, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleRemoveExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a workout title.');
      return;
    }

    try {
      await savePlan({ title, description, exercises });
      navigate('/workouts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <button
          onClick={() => navigate('/workouts')}
          className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Workouts
        </button>
        <span className="text-xs font-black uppercase text-brand-red bg-red-50 border border-red-100 px-3 py-1 rounded-full">
          Routine Builder
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-brand-red text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Basic Info Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-black uppercase text-gray-900 tracking-wide flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-red" /> Routine Information
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Workout Title
              </label>
              <Input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Heavy Push Day - Hypertrophy"
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Description (Optional)
              </label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Focusing on upper chest and triceps."
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Exercise List Builder */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide">
              Exercises ({exercises.length})
            </h3>
            <button
              type="button"
              onClick={handleAddExercise}
              className="px-3 py-1.5 bg-red-50 text-brand-red hover:bg-red-100 text-xs font-bold uppercase rounded-xl border border-red-100 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Exercise
            </button>
          </div>

          <div className="space-y-4">
            {exercises.map((ex, index) => (
              <div
                key={ex.id}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-brand-red">
                    Exercise #{index + 1}
                  </span>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(ex.id)}
                      className="text-gray-400 hover:text-brand-red transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="lg:col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                      Exercise Name
                    </label>
                    <Input
                      type="text"
                      required
                      value={ex.name}
                      onChange={(e) => handleUpdateExercise(ex.id, 'name', e.target.value)}
                      placeholder="e.g., Incline Dumbbell Press"
                      className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                      Sets
                    </label>
                    <Input
                      type="number"
                      required
                      value={ex.sets}
                      onChange={(e) => handleUpdateExercise(ex.id, 'sets', Number(e.target.value))}
                      className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                      Reps
                    </label>
                    <Input
                      type="text"
                      required
                      value={ex.reps}
                      onChange={(e) => handleUpdateExercise(ex.id, 'reps', e.target.value)}
                      placeholder="8-12"
                      className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                      Rest (sec)
                    </label>
                    <Input
                      type="number"
                      required
                      value={ex.restSeconds}
                      onChange={(e) => handleUpdateExercise(ex.id, 'restSeconds', Number(e.target.value))}
                      className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> {isLoading ? 'Saving Program...' : 'Save Routine'}
        </Button>
      </form>
    </div>
  );
};
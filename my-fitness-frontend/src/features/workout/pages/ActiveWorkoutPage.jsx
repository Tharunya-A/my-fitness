import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetRepLogger } from '../components/SetRepLogger.jsx';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { ArrowLeft, CheckCircle2, Flame, StopCircle } from 'lucide-react';

export const ActiveWorkoutPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    workoutTitle: 'Push Day - Hypertrophy',
    startTime: new Date(),
    exercises: [
      { id: 1, name: 'Barbell Bench Press', sets: [{ reps: 10, weight: 70, completed: true }] },
      { id: 2, name: 'Incline Dumbbell Press', sets: [{ reps: 12, weight: 24, completed: false }] },
    ],
  });

  const handleFinishSession = () => {
    alert('Workout session saved!');
    navigate('/workouts');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <button
          onClick={() => navigate('/workouts')}
          className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Session
        </button>
        <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase bg-red-50 text-brand-red px-3 py-1 rounded-full border border-red-100">
          <Flame className="w-4 h-4 animate-pulse" /> Workout In Progress
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-black uppercase text-gray-900">{session.workoutTitle}</h1>
        <p className="text-xs font-semibold text-gray-500">Track your sets, reps, and weights in real-time.</p>

        {session.exercises.map((exercise) => (
          <div key={exercise.id} className="pt-4 border-t border-gray-100 space-y-3">
            <h3 className="text-sm font-bold uppercase text-gray-800">{exercise.name}</h3>
            <SetRepLogger initialSets={exercise.sets} />
          </div>
        ))}

        <div className="pt-6 flex gap-3">
          <Button
            onClick={handleFinishSession}
            className="w-full bg-brand-red hover:bg-brand-red-hover text-white py-3 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Finish & Log Workout
          </Button>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { WeeklyCalendar } from '../components/WeeklyCalendar.jsx';
import { SetRepLogger } from '../components/SetRepLogger.jsx';
import { Dumbbell, Plus, Flame, CheckCircle2 } from 'lucide-react';

export const WorkoutsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'custom'

  // Default workout session form state
  const [exercises, setExercises] = useState([
    {
      name: 'Barbell Bench Press',
      sets: [
        { reps: 10, weight: 60, completed: true },
        { reps: 8, weight: 70, completed: false },
      ],
    },
    {
      name: 'Incline Dumbbell Press',
      sets: [
        { reps: 12, weight: 24, completed: false },
      ],
    },
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSession = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
            WORKOUT <span className="text-brand-red">LOGGER</span>
          </h1>
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mt-1">
            Track sets, reps & backdated sessions
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-brand-card border border-brand-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
              activeTab === 'planner'
                ? 'bg-brand-red text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
              activeTab === 'custom'
                ? 'bg-brand-red text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Custom Workout
          </button>
        </div>
      </div>

      {activeTab === 'planner' ? (
        <>
          {/* Weekly Interactive Calendar */}
          <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          {/* Session Banner */}
          <div className="flex items-center justify-between bg-brand-card border border-brand-border rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-white">
                  Session for {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                </h3>
                <p className="text-xs text-neutral-400">Chest & Triceps Hypertrophy</p>
              </div>
            </div>
            <button
              onClick={handleSaveSession}
              className="px-4 py-2 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase rounded-xl transition-all shadow-lg shadow-red-950/40 flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </>
              ) : (
                'Save Session'
              )}
            </button>
          </div>

          {/* Dynamic Set/Rep Logger */}
          <SetRepLogger exercises={exercises} onUpdateExercises={setExercises} />
        </>
      ) : (
        /* Custom Workout Creator Form */
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-red" />
            Create Custom Exercise
          </h3>
          <p className="text-xs text-neutral-400">Add unique movements with video guides and target muscle groups.</p>

          <form className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                Exercise Name
              </label>
              <input
                type="text"
                placeholder="e.g., Bulgarian Split Squat"
                className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white placeholder-neutral-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Target Muscle Group
                </label>
                <input
                  type="text"
                  placeholder="e.g., Quads, Glutes"
                  className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white placeholder-neutral-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white">
                  <option>Strength</option>
                  <option>Hypertrophy</option>
                  <option>Cardio</option>
                  <option>Flexibility</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                Instruction GIF/Video URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/demo.gif"
                className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white placeholder-neutral-600"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Save Custom Exercise
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
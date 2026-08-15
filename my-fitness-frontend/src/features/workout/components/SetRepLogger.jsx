import { Plus, Minus, Check, Trash2 } from 'lucide-react';

export const SetRepLogger = ({ exercises, onUpdateExercises }) => {
  const addSet = (exerciseIndex) => {
    const updated = [...exercises];
    const lastSet = updated[exerciseIndex].sets[updated[exerciseIndex].sets.length - 1] || { reps: 10, weight: 20 };
    updated[exerciseIndex].sets.push({
      reps: lastSet.reps,
      weight: lastSet.weight,
      completed: false,
    });
    onUpdateExercises(updated);
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    onUpdateExercises(updated);
  };

  const updateSetVal = (exerciseIndex, setIndex, field, delta) => {
    const updated = [...exercises];
    const set = updated[exerciseIndex].sets[setIndex];
    const newVal = Math.max(0, (set[field] || 0) + delta);
    set[field] = newVal;
    onUpdateExercises(updated);
  };

  const toggleSetComplete = (exerciseIndex, setIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex].completed = !updated[exerciseIndex].sets[setIndex].completed;
    onUpdateExercises(updated);
  };

  return (
    <div className="space-y-6">
      {exercises.map((exercise, exIdx) => (
        <div key={exIdx} className="bg-brand-card border border-brand-border rounded-2xl p-4 shadow-xl">
          <h4 className="text-base font-black uppercase text-white mb-3 flex items-center justify-between">
            <span>{exercise.name}</span>
            <span className="text-xs text-brand-red font-bold uppercase">
              {exercise.sets.filter((s) => s.completed).length}/{exercise.sets.length} DONE
            </span>
          </h4>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-neutral-500 mb-2 px-1">
            <span className="col-span-2">SET</span>
            <span className="col-span-4 text-center">WEIGHT (KG)</span>
            <span className="col-span-4 text-center">REPS</span>
            <span className="col-span-2 text-right">STATUS</span>
          </div>

          {/* Sets Row */}
          <div className="space-y-2">
            {exercise.sets.map((set, setIdx) => (
              <div
                key={setIdx}
                className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                  set.completed
                    ? 'bg-brand-red/10 border-brand-red/30 text-white'
                    : 'bg-brand-dark border-brand-border text-neutral-300'
                }`}
              >
                {/* Set Number */}
                <span className="col-span-2 text-xs font-black text-neutral-400">
                  #{setIdx + 1}
                </span>

                {/* Weight Stepper */}
                <div className="col-span-4 flex items-center justify-center gap-1 bg-brand-card border border-brand-border rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => updateSetVal(exIdx, setIdx, 'weight', -2.5)}
                    className="p-1 text-neutral-400 hover:text-brand-red"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-10 text-center">{set.weight}</span>
                  <button
                    type="button"
                    onClick={() => updateSetVal(exIdx, setIdx, 'weight', 2.5)}
                    className="p-1 text-neutral-400 hover:text-brand-red"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Reps Stepper */}
                <div className="col-span-4 flex items-center justify-center gap-1 bg-brand-card border border-brand-border rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => updateSetVal(exIdx, setIdx, 'reps', -1)}
                    className="p-1 text-neutral-400 hover:text-brand-red"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-8 text-center">{set.reps}</span>
                  <button
                    type="button"
                    onClick={() => updateSetVal(exIdx, setIdx, 'reps', 1)}
                    className="p-1 text-neutral-400 hover:text-brand-red"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Completion Checkmark */}
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => toggleSetComplete(exIdx, setIdx)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      set.completed
                        ? 'bg-brand-red border-brand-red text-white'
                        : 'bg-brand-card border-brand-border text-neutral-500 hover:text-white'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSet(exIdx, setIdx)}
                      className="p-1 text-neutral-600 hover:text-brand-red"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Set Button */}
          <button
            type="button"
            onClick={() => addSet(exIdx)}
            className="w-full mt-3 py-2 bg-brand-dark border border-dashed border-brand-border hover:border-brand-red text-xs font-bold uppercase text-neutral-400 hover:text-brand-red rounded-xl transition-all flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Set
          </button>
        </div>
      ))}
    </div>
  );
};
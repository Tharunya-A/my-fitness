import { Dumbbell, Clock, Flame, ChevronRight } from 'lucide-react';

export const ExerciseCard = ({
  exercise,
  onSelect,
  isSelectable = false,
  isSelected = false,
}) => {
  const { name, category, muscleGroup, sets, reps, restSeconds } = exercise || {};

  return (
    <div
      onClick={() => isSelectable && onSelect && onSelect(exercise)}
      className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
        isSelectable ? 'cursor-pointer hover:shadow-md' : ''
      } ${
        isSelected
          ? 'border-brand-red ring-2 ring-red-500/10 bg-red-50/20'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase text-gray-900 tracking-wide">
              {name || 'Exercise Name'}
            </h4>
            <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
              {muscleGroup || category || 'General'}
            </span>
          </div>
        </div>

        {isSelectable && (
          <div className="text-gray-400">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Target Details Grid */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center">
        <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
          <span className="block text-[9px] font-bold uppercase text-gray-400">Sets</span>
          <span className="text-xs font-black text-gray-900">{sets || 3}</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
          <span className="block text-[9px] font-bold uppercase text-gray-400">Reps</span>
          <span className="text-xs font-black text-gray-900">{reps || '8-12'}</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-[9px] font-bold uppercase text-gray-400 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> Rest
          </span>
          <span className="text-xs font-black text-gray-900">{restSeconds ? `${restSeconds}s` : '60s'}</span>
        </div>
      </div>
    </div>
  );
};
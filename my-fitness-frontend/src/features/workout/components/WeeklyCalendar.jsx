import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const WeeklyCalendar = ({ selectedDate, onSelectDate }) => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  // Calculate dates for current week
  const getCurrentWeekDates = () => {
    const curr = new Date(selectedDate);
    const first = curr.getDate() - (curr.getDay() === 0 ? 6 : curr.getDay() - 1);
    
    return days.map((day, idx) => {
      const d = new Date(curr);
      d.setDate(first + idx);
      return {
        dayName: day,
        dateNumber: d.getDate(),
        fullDate: d,
        isToday: new Date().toDateString() === d.toDateString(),
        isSelected: selectedDate.toDateString() === d.toDateString(),
      };
    });
  };

  const weekDates = getCurrentWeekDates();

  const handlePrevWeek = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    onSelectDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    onSelectDate(next);
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-4 shadow-xl">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-brand-red" />
          <h3 className="font-black uppercase tracking-wider text-sm text-white">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevWeek}
            className="p-1.5 rounded-lg bg-brand-dark border border-brand-border hover:border-brand-red text-neutral-400 hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectDate(new Date())}
            className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-brand-dark border border-brand-border hover:border-brand-red text-neutral-300"
          >
            Today
          </button>
          <button
            onClick={handleNextWeek}
            className="p-1.5 rounded-lg bg-brand-dark border border-brand-border hover:border-brand-red text-neutral-400 hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day Horizontal Strip */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekDates.map((item) => (
          <button
            key={item.dayName}
            onClick={() => onSelectDate(item.fullDate)}
            className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all border ${
              item.isSelected
                ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-red-950/50'
                : item.isToday
                ? 'bg-brand-dark border-brand-red/50 text-brand-red'
                : 'bg-brand-dark border-brand-border text-neutral-400 hover:border-neutral-700'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.dayName}</span>
            <span className="text-base font-black mt-0.5">{item.dateNumber}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
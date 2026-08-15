import { TrendingUp } from 'lucide-react';

export const MetricChart = ({ title = 'Biomarker Trend', data = [], unit = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-2">
        <TrendingUp className="w-8 h-8 text-gray-300 mx-auto" />
        <p className="text-xs font-bold uppercase text-gray-400">No trend data available for {title}</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value || 0)) || 1;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black uppercase text-gray-900 tracking-wide flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-red" /> {title}
        </h4>
        <span className="text-xs font-bold text-gray-500 uppercase">{unit}</span>
      </div>

      <div className="h-40 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-gray-100">
        {data.map((item, idx) => {
          const heightPercent = Math.round(((item.value || 0) / maxValue) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </span>
              <div
                style={{ height: `${Math.max(heightPercent, 10)}%` }}
                className="w-full max-w-[28px] bg-red-100 group-hover:bg-brand-red rounded-t-md transition-colors"
              />
              <span className="text-[9px] font-semibold text-gray-400 truncate w-full text-center">
                {item.date ? new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
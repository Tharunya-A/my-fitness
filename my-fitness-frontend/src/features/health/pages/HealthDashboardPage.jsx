import { useHealthMetrics } from '../hooks/useHealthMetrics.js';
import { BiomarkerForm } from '../components/BiomarkerForm.jsx';
import { MetricChart } from '../components/MetricChart.jsx';
import { Activity, Heart, ShieldAlert } from 'lucide-react';

export const HealthDashboardPage = () => {
  const { metrics, isLoading, error, addMetric } = useHealthMetrics();

  const testosteroneData = metrics.filter((m) => m.name === 'Testosterone');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-red" /> HEALTH <span className="text-brand-red">METRICS</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Track vital biomarkers, hormone levels, and internal health trends over time.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Form */}
        <div className="lg:col-span-1">
          <BiomarkerForm onSubmit={addMetric} isLoading={isLoading} error={error} />
        </div>

        {/* Right Dashboard / Charts */}
        <div className="lg:col-span-2 space-y-6">
          <MetricChart title="Testosterone Trend" data={testosteroneData} unit="ng/dL" />

          {/* Metric History List */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-red" /> Recent Biomarker Logs
            </h3>

            {metrics.length === 0 ? (
              <p className="text-xs text-gray-400 font-semibold py-4 text-center">No logged biomarkers yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {metrics.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs font-semibold">
                    <div>
                      <p className="text-gray-900 font-bold uppercase">{item.name}</p>
                      <p className="text-gray-400 text-[10px]">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-brand-red font-black text-sm">
                        {item.value} <span className="text-[10px] text-gray-500 font-normal">{item.unit}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
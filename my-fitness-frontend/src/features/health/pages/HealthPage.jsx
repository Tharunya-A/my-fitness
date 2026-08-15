import { useState } from 'react';
import { HeartPulse, Upload, FileText, Scale, Moon, Flame, Droplets, CheckCircle2, Sparkles } from 'lucide-react';

export const HealthPage = () => {
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'vault'
  const [metrics, setMetrics] = useState({
    weight: '75',
    sleepHours: '7.5',
    calories: '2400',
    waterMl: '3000',
  });
  const [file, setFile] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Mock upload history for UI display
  const [pdfHistory, setPdfHistory] = useState([
    { id: 1, name: 'Blood_Report_Aug2026.pdf', date: '2026-08-10', status: 'Analyzed', summary: 'All vitals normal. Cholesterol within optimal range.' },
  ]);

  const handleMetricChange = (e) => {
    setMetrics({ ...metrics, [e.target.name]: e.target.value });
  };

  const handleSaveMetrics = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      setPdfHistory([
        {
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          status: 'Analyzed',
          summary: 'AI Analysis complete. Haemoglobin level: 14.2 g/dL.',
        },
        ...pdfHistory,
      ]);
      setFile(null);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
            HEALTH <span className="text-brand-red">VAULT</span>
          </h1>
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mt-1">
            Log Vitals & AI Blood Report Summaries
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-brand-card border border-brand-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
              activeTab === 'metrics' ? 'bg-brand-red text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Daily Vitals
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
              activeTab === 'vault' ? 'bg-brand-red text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Medical Reports
          </button>
        </div>
      </div>

      {activeTab === 'metrics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Card */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-brand-red" /> Log Daily Metrics
            </h3>

            <form onSubmit={handleSaveMetrics} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Weight (KG)
                </label>
                <div className="relative">
                  <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={metrics.weight}
                    onChange={handleMetricChange}
                    className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Sleep Duration (Hours)
                </label>
                <div className="relative">
                  <Moon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="number"
                    step="0.5"
                    name="sleepHours"
                    value={metrics.sleepHours}
                    onChange={handleMetricChange}
                    className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Calorie Intake (KCAL)
                </label>
                <div className="relative">
                  <Flame className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="number"
                    name="calories"
                    value={metrics.calories}
                    onChange={handleMetricChange}
                    className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Water Intake (ML)
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="number"
                    step="100"
                    name="waterMl"
                    value={metrics.waterMl}
                    onChange={handleMetricChange}
                    className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2"
              >
                {isSaved ? <CheckCircle2 className="w-5 h-5" /> : 'Log Vitals'}
              </button>
            </form>
          </div>

          {/* Metric Overview Widgets */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-card border border-brand-border p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-brand-red" /> Weight
                </span>
                <p className="text-2xl font-black text-white mt-2">{metrics.weight} <span className="text-xs text-neutral-500 font-normal">kg</span></p>
              </div>

              <div className="bg-brand-card border border-brand-border p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-brand-red" /> Sleep
                </span>
                <p className="text-2xl font-black text-white mt-2">{metrics.sleepHours} <span className="text-xs text-neutral-500 font-normal">hrs</span></p>
              </div>

              <div className="bg-brand-card border border-brand-border p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-brand-red" /> Calories
                </span>
                <p className="text-2xl font-black text-white mt-2">{metrics.calories} <span className="text-xs text-neutral-500 font-normal">kcal</span></p>
              </div>

              <div className="bg-brand-card border border-brand-border p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-brand-red" /> Hydration
                </span>
                <p className="text-2xl font-black text-white mt-2">{metrics.waterMl} <span className="text-xs text-neutral-500 font-normal">ml</span></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PDF Medical Report Uploader & Analyzer */
        <div className="space-y-6">
          <form onSubmit={handleFileUpload} className="bg-brand-card border border-dashed border-brand-border hover:border-brand-red rounded-2xl p-8 text-center transition-all">
            <div className="inline-flex p-4 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red mb-3">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Upload Medical Report (PDF)</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Our AI parser will extract blood markers, lipid levels, and vitals automatically.
            </p>

            <input
              type="file"
              accept=".pdf"
              id="pdf-upload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer px-5 py-2.5 bg-brand-dark border border-brand-border hover:border-brand-red text-xs font-bold uppercase text-white rounded-xl transition-all"
              >
                {file ? file.name : 'Choose PDF File'}
              </label>

              {file && (
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> {isUploading ? 'Analyzing...' : 'Analyze PDF'}
                </button>
              )}
            </div>
          </form>

          {/* Upload History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Analyzed Reports</h4>
            {pdfHistory.map((item) => (
              <div key={item.id} className="bg-brand-card border border-brand-border p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-red" />
                    <span className="text-sm font-bold text-white">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-brand-dark border border-brand-border text-neutral-400">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 bg-brand-dark p-3 rounded-xl border border-brand-border/50">
                  <strong className="text-brand-red">AI Summary:</strong> {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { Input } from '../../../shared/components/ui/Input.jsx';
import { Activity, Plus, AlertCircle } from 'lucide-react';

export const BiomarkerForm = ({ onSubmit, isLoading = false, error = null }) => {
  const [formData, setFormData] = useState({
    name: 'Testosterone',
    value: '',
    unit: 'ng/dL',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Activity className="w-5 h-5 text-brand-red" />
        <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide">Log Biomarker</h3>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-brand-red text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
            Biomarker Name
          </label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
          >
            <option value="Testosterone">Testosterone</option>
            <option value="Vitamin D">Vitamin D</option>
            <option value="HbA1c">HbA1c</option>
            <option value="Cholesterol">Cholesterol</option>
            <option value="Cortisol">Cortisol</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
            Value
          </label>
          <Input
            type="number"
            name="value"
            required
            step="any"
            value={formData.value}
            onChange={handleChange}
            placeholder="650"
            className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
            Unit
          </label>
          <Input
            type="text"
            name="unit"
            required
            value={formData.unit}
            onChange={handleChange}
            placeholder="ng/dL, mg/dL, etc."
            className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
            Date
          </label>
          <Input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-md shadow-red-500/20 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> {isLoading ? 'Saving...' : 'Add Entry'}
      </Button>
    </form>
  );
};
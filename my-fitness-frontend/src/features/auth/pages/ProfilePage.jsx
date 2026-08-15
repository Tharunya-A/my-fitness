import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { User, Mail, Shield, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfileState } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    age: user?.profile?.age || '25',
    gender: user?.profile?.gender || 'Male',
    height: user?.profile?.height || '178',
    targetWeight: user?.profile?.targetWeight || '72',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileState({ ...user, profile: formData });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wider text-white">
          ATHLETE <span className="text-brand-red">PROFILE</span>
        </h1>
        <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mt-1">
          Manage fitness targets and account settings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-brand-card border border-brand-border rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="username"
                disabled
                value={formData.username}
                className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl text-sm text-neutral-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                name="email"
                disabled
                value={formData.email}
                className="w-full pl-11 pr-4 py-3 bg-brand-dark border border-brand-border rounded-xl text-sm text-neutral-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Goal (kg)
            </label>
            <input
              type="number"
              name="targetWeight"
              value={formData.targetWeight}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-red text-sm text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 mt-4"
        >
          {isSaved ? <CheckCircle2 className="w-5 h-5" /> : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};
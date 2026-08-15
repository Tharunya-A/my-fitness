import { useState } from 'react';
import { User, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { Input } from '../../../shared/components/ui/Input.jsx';

export const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-brand-red text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="username"
            required
            value={credentials.username}
            onChange={handleChange}
            placeholder="athlete123"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-red text-sm text-gray-900 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-red text-sm text-gray-900 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold tracking-wider uppercase rounded-xl shadow-lg shadow-red-500/20 transition-all duration-200 mt-2 disabled:opacity-50 active:scale-[0.98]"
      >
        {isLoading ? 'Authenticating...' : 'Sign In'}
      </Button>
    </form>
  );
};
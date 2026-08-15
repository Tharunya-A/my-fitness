import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useFormErrors } from '../../../shared/hooks/useFormErrors';
import { AuthCard } from '../components/AuthCard';
import { Input } from '../../../shared/components/ui/Input';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { fieldErrors, globalError, handleError, clearAllErrors } = useFormErrors();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();

    try {
      await login(formData);
      navigate('/workouts', { replace: true });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Log in to access your dashboard">
      {globalError && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
        />

        <button
          type="submit"
          className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
};
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { useAuth } from '../../../shared/context/AuthContext';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useFormErrors } from '../../../shared/hooks/useFormErrors';
import { AuthCard } from '../components/AuthCard';
import { Input } from '../../../shared/components/ui/Input';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { fieldErrors, globalError, handleError, clearAllErrors } = useFormErrors();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();

    try {
      await register(formData);
      navigate('/workouts');
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AuthCard title="Create Account" subtitle="Get started with your fitness journey">
      {globalError && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
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
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
};
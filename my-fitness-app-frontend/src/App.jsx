import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/useAuth';
import { ProtectedRoute } from './shared/components/layout/ProtectedRoute';
import { MainLayout } from './shared/components/layout/MainLayout';

// Pages
import { RegisterPage, LoginPage } from './modules/auth';
import { WorkoutPlanPage } from './modules/workout/pages/WorkoutPlanPage';
import { HealthDashboardPage } from './modules/health/pages/HealthDashboardPage';
import { BillingPage } from './modules/billing/pages/BillingPage';

const RootRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/workouts" replace /> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes Wrapped in MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/workouts" element={<WorkoutPlanPage />} />
              <Route path="/health" element={<HealthDashboardPage />} />
              <Route path="/billing" element={<BillingPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
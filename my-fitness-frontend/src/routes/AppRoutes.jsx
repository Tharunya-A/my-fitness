import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../shared/components/ProtectedRoute.jsx';
import { Navbar } from '../shared/components/layout/Navbar.jsx';
import { BottomNav } from '../shared/components/layout/BottomNav.jsx';
import { Sidebar } from '../shared/components/layout/Sidebar.jsx';

import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { ProfilePage } from '../features/auth/pages/ProfilePage.jsx';
import { WorkoutsPage } from '../features/workout/pages/WorkoutsPage.jsx';
import { CustomWorkoutPage } from '../features/workout/pages/CustomWorkoutPage.jsx';
import { ActiveWorkoutPage } from '../features/workout/pages/ActiveWorkoutPage.jsx';
import { HealthPage } from '../features/health/pages/HealthPage.jsx';
import { HealthDashboardPage } from '../features/health/pages/HealthDashboardPage.jsx';
import { MedicalReportsPage } from '../features/health/pages/MedicalReportsPage.jsx';
import { BillingPage } from '../features/billing/pages/BillingPage.jsx';
import { SubscriptionPage } from '../features/billing/pages/SubscriptionPage.jsx';

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 mb-16 md:mb-0 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AppShell><HealthDashboardPage /></AppShell>} />
        <Route path="/workouts" element={<AppShell><WorkoutsPage /></AppShell>} />
        <Route path="/workouts/custom" element={<AppShell><CustomWorkoutPage /></AppShell>} />
        <Route path="/workouts/active" element={<AppShell><ActiveWorkoutPage /></AppShell>} />
        <Route path="/health" element={<AppShell><HealthPage /></AppShell>} />
        <Route path="/health/reports" element={<AppShell><MedicalReportsPage /></AppShell>} />
        <Route path="/billing" element={<AppShell><BillingPage /></AppShell>} />
        <Route path="/subscription" element={<AppShell><SubscriptionPage /></AppShell>} />
        <Route path="/profile" element={<AppShell><ProfilePage /></AppShell>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
import type { ReactNode } from 'react';
import { createHashRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { LoginPage } from './components/LoginPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { MatchesPage } from './components/MatchesPageReal';
import { StatsPage } from './components/StatsPage';
import { isAuthenticated } from './utils/api';

// Защищённый маршрут
function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export const router = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <LeaderboardPage />,
      },
      {
        path: 'matches',
        element: <MatchesPage />,
      },
      {
        path: 'stats',
        element: <StatsPage />,
      },
      {
        path: 'profile',
        element: <StatsPage />,
      },
    ],
  },
]);

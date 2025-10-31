import RegisterPage from '@/pages/RegisterPage';
import '@/styles/index.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';

const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to='/register' replace /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'profile',
        element: (
          <Suspense fallback={null}>
            <ProfilePage />
          </Suspense>
        ),
      },
    ],
  },
]);
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

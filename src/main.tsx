import RegisterPage from '@/pages/RegisterPage';
import '@/styles/index.css';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App';

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
    <RouterProvider router={router} />
  </StrictMode>
);

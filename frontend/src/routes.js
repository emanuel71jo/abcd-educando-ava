import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import Classes from './pages/Classes';
import Modules from './pages/Modules';
import Exams from './pages/Exams';
import Students from './pages/Students';
import Profile from './pages/Profile';

// hooks
import { useAuth } from './hooks/useAuth';

export default function Router() {
  const { auth } = useAuth();

  return useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'classes', element: <Classes /> },
        { path: 'modules', element: <Modules /> },
        { path: 'exam', element: <Exams /> },
        { path: 'students', element: <Students /> },
        { path: 'profile', element: <Profile /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: auth ? <Navigate to="/dashboard/app" replace /> : <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

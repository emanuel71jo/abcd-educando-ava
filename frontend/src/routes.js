import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import ClassesList from './pages/ClassesList';
import ClassesCreate from './pages/ClassesCreate';
import ModulesList from './pages/ModulesList';
import ModulesCreate from './pages/ModulesCreate';
import Exams from './pages/Exams';
import ExamsCreate from './pages/ExamsCreate';
import StudentsList from './pages/StudentsList';
import Profile from './pages/Profile';

// hooks
import { useAuth } from './hooks/useAuth';

export default function Router() {
  const { auth } = useAuth();

  return useRoutes([
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
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'classes', element: <ClassesList /> },
        { path: 'classes/create', element: <ClassesCreate /> },
        { path: 'modules', element: <ModulesList /> },
        { path: 'modules/create', element: <ModulesCreate /> },
        { path: 'exam', element: <Exams /> },
        { path: 'exam/create', element: <ExamsCreate /> },
        { path: 'students', element: <StudentsList /> },
        { path: 'profile', element: <Profile /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

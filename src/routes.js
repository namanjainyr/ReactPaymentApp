import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Message from './pages/Message';
import Wallet from './pages/Wallet';
import authorization from './utils/authorisation';

const login = authorization();
const routes = [
  {
    path: 'home',
    element: login ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'profile', element: <Account /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'message', element: <Message /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'settings', element: <Settings /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !login ? <MainLayout /> : <Navigate to="/home/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

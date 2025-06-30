import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/Loadable';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Loader from '../components/loaders/FullScreenLoader'
import BlankLayout from '../layouts/blank/BlankLayout';
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// Pages
const Dashboard = Loadable(lazy(() => import('../pages/admin/Dashboard')));
const Admissions = Loadable(lazy(() => import('../pages/admin/Admissions')));
const Bookings = Loadable(lazy(() => import('../pages/admin/Bookings')));
const Contacts = Loadable(lazy(() => import('../pages/admin/Contact')));

const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const ErrorPage = Loadable(lazy(() => import('../pages/error/Error')));

const Router = [
    {
        path: '/admin',
        element: <ProtectedRoute />, 
        children: [
            {
                path: '',
                element: <FullLayout />,
                children: [
                    { path: '', element: <Navigate to="/admin/dashboard" /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'admissions', element: <Admissions /> },
                    { path: 'bookings', element: <Bookings /> },
                    { path: 'contacts', element: <Contacts /> },
                ],
            },
        ],
    },
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '', element: <Login /> },
            { path: 'error/404', element: <ErrorPage /> },
            { path: '*', element: <Navigate to="/error/404" /> },
        ],
    },
];

export default Router;

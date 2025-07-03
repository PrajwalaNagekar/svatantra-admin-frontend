import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/Loadable';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Loader from '../components/loaders/FullScreenLoader'
import BlankLayout from '../layouts/blank/BlankLayout';
import Gallery from '../pages/admin/Gallery';
import Events from '../pages/admin/Events';
// Import 
import Enquiries from '../pages/admin/Enquiries';
import TeacherApplications from '../pages/admin/TeacherApplications';
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// Pages
const Dashboard = Loadable(lazy(() => import('../pages/admin/Dashboard')));
const Admissions = Loadable(lazy(() => import('../pages/admin/Applications')));
const Bookings = Loadable(lazy(() => import('../pages/admin/Visits')));
const Contacts = Loadable(lazy(() => import('../pages/admin/Enquiries')));

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
                    { path: 'applications', element: <Admissions /> },
                    { path: 'teacher-applications', element: <TeacherApplications /> },

                    { path: 'visits', element: <Bookings /> },
                    { path: 'enquiries', element: <Enquiries /> },
                    { path: 'gallery', element: <Gallery /> },
                    { path: 'events', element: <Events /> },


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

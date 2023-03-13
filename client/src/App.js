import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Email from './components/Email';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import StudentsList from './components/Student/StudentsList';
import PageNotFound from './components/PageNotFound';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import StudentProfile from './components/Student/StudentProfile';

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Email></Email>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/students',
        element : <StudentsList></StudentsList>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

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
import StudentsEdit from './components/Student/StudentsEdit';
import ParentsList from './components/Parents/ParentsList';
import ParentEidt from './components/Parents/ParentEdit';
import TeacherEdit from './components/Teachers/TeachersEdit';
import TeachersList from './components/Teachers/TeachersList';
import PageNotFound from './components/PageNotFound';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

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
        path : '/students/:id/edit',
        element : <StudentsEdit></StudentsEdit>
    },
    {
        path : '/parents',
        element : <ParentsList></ParentsList>
    },
    {
        path : '/parent/:id/edit',
        element : <ParentEidt></ParentEidt>
    },
    {
        path : '/teachers',
        element : <TeachersList></TeachersList>
    },
    {
        path : '/teacher/:id/edit',
        element : <TeacherEdit></TeacherEdit>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
]);

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

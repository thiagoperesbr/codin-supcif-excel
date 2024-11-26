import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Files } from './pages/app/files/files'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/emails', element: <Files /> },
    ],
  },

  /*   {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <SignIn /> },
      { path: '/register', element: <SignUp /> },
    ],
  }, */
])

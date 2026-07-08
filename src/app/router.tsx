import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { GuestRoute, LoginPage, RequireAuth } from '@/features/auth'
import { RootLayout } from '@/layouts/RootLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DashboardPage } from '@/features/dashboard/DashboardPage'


export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [{ path: ROUTES.login, element: <LoginPage /> }],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <DashboardLayout />,
            children: [{ path: ROUTES.dashboard, element: <DashboardPage /> }],
          },
        ],
      },
    ],
  },
])

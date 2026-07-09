import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { GuestRoute, LoginPage, RequireAuth } from '@/features/auth'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { RootLayout } from '@/layouts/RootLayout'

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
            children: [
              {
                path: ROUTES.dashboard,
                // Code-split: the dashboard drags in Recharts, which the
                // login screen shouldn't have to download
                lazy: async () => ({
                  Component: (await import('@/features/dashboard'))
                    .DashboardPage,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
])

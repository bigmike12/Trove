import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { GuestRoute, LoginPage, RequireAuth } from '@/features/auth'
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
            path: ROUTES.dashboard,
            element: <div>hello</div>,
          },
        ],
      },
    ],
  },
])

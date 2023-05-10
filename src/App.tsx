import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './plugins/react-query';
import { Toaster } from 'react-hot-toast';

import ErrorPage from './error-page'
import RootLayout from './pages/root'
import About from './pages/about';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot';
import ResetPassword from './pages/auth/reset';
import Dashboard from './pages/dashboard';
import Requests from './components/dashboard/Requests';
import VerifyEmail from './components/VerifyEmail';
import HomePage from './pages/home';
import DisplayHotels from './pages/hotels';
import HotelsMap from './pages/map/map';
import Settings from './pages/settings/settings';
import Users from './pages/users/users';
import Rooms from './pages/rooms/rooms';

function App() {

  const DashBoardRoutes = [
    {
      path: '',
      element: <Dashboard />
    },
    {
      path: 'requests',
      element: <Requests />
    },
    {
      path: 'hotels',
      element: <DisplayHotels />
    },
    {
      path: 'map',
      element: <HotelsMap />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'rooms',
      element: <Rooms />
    },
    {
      path: 'Settings',
      element: <Settings />
    }
  ]

  const AuthRoutes = [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />
    },
    {
      path: 'verify/:token',
      element: <VerifyEmail />
    },
  ]

  const UnothorizedViewPages = [
    {
      path: '',
      element: <HomePage />
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: 'contact',
      element: <div>Contact</div>
    },
    {
      path: 'services',
      element: <div>services</div>
    },
    {
      path: 'auth',
      children: AuthRoutes,
      // accessed via {hostname}/auth/{routename}
    },
  ]

  const router = createBrowserRouter([
    {
      children: [
        {
          path: '',
          element: <RootLayout />,
          errorElement: <ErrorPage />,
          children: UnothorizedViewPages,
          // accessed via {hostname}/{routename}
        },
        {
          path: 'dashboard',
          children: DashBoardRoutes
          // accessed via {hostname}/dashboard/{routename}
        },
        {
          path: 'services',
          element: <div>services</div>
        },
        {
          path: 'hotels',
          element: <DisplayHotels />
        },
        {
          path: 'map',
          element: <HotelsMap />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        },
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },
            {
              path: 'forgot-password',
              element: <ForgotPassword />
            }
          ]
        }
      ],
    }
  ]);

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App;
